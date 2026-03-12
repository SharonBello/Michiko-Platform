import * as BABYLON from '@babylonjs/core';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import '@babylonjs/loaders/glTF';
import type { NPC, SceneLayout } from '@michiko/types';
import { selectCharacter, type CharacterDef } from './characterManifest';

const POSITIONS = [
    new BABYLON.Vector3(-5, 0, 5),
    new BABYLON.Vector3(5, 0, 5),
    new BABYLON.Vector3(-5, 0, -3),
    new BABYLON.Vector3(5, 0, -3),
    new BABYLON.Vector3(0, 0, 7),
    new BABYLON.Vector3(0, 0, -5),
];

interface NPCInstance {
    npc: NPC;
    root: BABYLON.TransformNode;
    animGroups: BABYLON.AnimationGroup[]; // original groups — shared skeleton drives clones
    currentAnim: string;
    isProximity: boolean;
    charDef: CharacterDef;
}

export interface AnimRule { anim: string; loop: boolean; }
export interface NPCController {
    triggerEvent: (event: string, npcId: string, rule: AnimRule) => void;
    dispose: () => void;
}

export async function placeNPCs(
    scene: BABYLON.Scene,
    npcs: NPC[],
    layout: SceneLayout,
    onNPCClick: (npc: NPC) => void
): Promise<NPCController> {

    const instances = new Map<string, NPCInstance>();

    for (let i = 0; i < npcs.length; i++) {
        const npc = npcs[i]!;
        const pos = POSITIONS[i % POSITIONS.length]!;
        const charDef = selectCharacter(layout.environment, '', npc.role);

        const result = await SceneLoader.ImportMeshAsync('', '/npcs/', charDef.file, scene);

        // Hide source meshes — we'll show clones below
        result.animationGroups.forEach(ag => ag.stop());
        result.meshes.forEach(m => { m.isVisible = false; });

        // Root transform node — position, rotation, scale go here
        const root = new BABYLON.TransformNode(`npc_root_${npc.id}`, scene);
        root.position = pos.clone();
        root.scaling = new BABYLON.Vector3(charDef.scale, charDef.scale, charDef.scale);
        const [rx, ry, rz] = charDef.rotationFix;
        const faceY = Math.atan2(pos.x, pos.z) + Math.PI;
        root.rotation = new BABYLON.Vector3(rx, (ry ?? 0) + faceY, rz ?? 0);

        // Clone meshes (skip __root__), parent to our root
        // Clones share the original skeleton — original anim groups drive them automatically
        result.meshes.forEach(src => {
            if (src.name === '__root__') return;
            const clone = src.clone(`${src.name}_${npc.id}`, root);
            if (clone) {
                clone.isVisible = true;
                clone.isPickable = false;
                clone.alwaysSelectAsActiveMesh = true;
            }
        });

        const instance: NPCInstance = {
            npc, root,
            animGroups: result.animationGroups, // originals — they drive the shared skeleton
            currentAnim: charDef.animations.idle,
            isProximity: false,
            charDef,
        };
        instances.set(npc.id, instance);

        // Start idle immediately
        playAnim(instance, charDef.animations.idle, true);

        buildNameLabel(scene, npc.name, npc.role, root, charDef.scale);

        // Invisible click hitbox
        const hitbox = BABYLON.MeshBuilder.CreateCylinder(`whb_${npc.id}`, {
            height: 1.8, diameter: 0.7, tessellation: 8
        }, scene);
        hitbox.position = pos.clone();
        hitbox.position.y = 0.9;
        hitbox.isPickable = true;
        hitbox.visibility = 0;
        hitbox.actionManager = new BABYLON.ActionManager(scene);
        hitbox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger, () => onNPCClick(npc)
        ));
    }

    // Proximity wave
    scene.registerBeforeRender(() => {
        const camera = scene.activeCamera;
        if (!camera) return;
        instances.forEach(inst => {
            const dist = BABYLON.Vector3.Distance(camera.position, inst.root.position);
            if (dist < 4 && !inst.isProximity && inst.currentAnim === inst.charDef.animations.idle) {
                inst.isProximity = true;
                playAnim(inst, inst.charDef.animations.wave, false, () => {
                    playAnim(inst, inst.charDef.animations.idle, true);
                    inst.isProximity = false;
                });
            }
        });
    });

    return {
        triggerEvent: (_event, npcId, rule) => {
            const inst = instances.get(npcId);
            console.log(`triggerEvent: ${_event} → npcId="${npcId}" anim="${rule.anim}" found=${!!inst}`);
            if (!inst) return;
            playAnim(inst, rule.anim, rule.loop, () => {
                if (!rule.loop) playAnim(inst, inst.charDef.animations.idle, true);
            });
        },
        dispose: () => {
            instances.forEach(inst => {
                inst.animGroups.forEach(ag => { ag.stop(); ag.dispose(); });
                inst.root.dispose();
            });
            instances.clear();
        },
    };
}

// Uses ORIGINAL anim group names — no suffix, no remapping
function playAnim(inst: NPCInstance, animName: string, loop: boolean, onEnd?: () => void): void {
    inst.animGroups.forEach(ag => ag.stop());
    const ag = inst.animGroups.find(a => a.name === animName);
    if (!ag) {
        console.warn(`Anim not found: "${animName}". Have:`, inst.animGroups.map(a => a.name).slice(0, 5));
        inst.animGroups.find(a => a.name === inst.charDef.animations.idle)?.play(true);
        return;
    }
    inst.currentAnim = animName;
    ag.play(loop);
    if (onEnd && !loop) ag.onAnimationGroupEndObservable.addOnce(() => onEnd());
}

function buildNameLabel(
    scene: BABYLON.Scene,
    name: string,
    role: string,
    parent: BABYLON.TransformNode,
    scale: number
): void {
    const labelY = 1.9 / scale;
    const plane = BABYLON.MeshBuilder.CreatePlane(`label_${name}`, { width: 1.8 / scale, height: 0.35 / scale }, scene);
    plane.parent = parent;
    plane.position.y = labelY;
    plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    plane.isPickable = false;
    plane.alwaysSelectAsActiveMesh = true;

    const tex = new BABYLON.DynamicTexture(`ltex_${name}`, { width: 512, height: 96 }, scene);
    tex.hasAlpha = true;
    const ctx = tex.getContext() as unknown as CanvasRenderingContext2D;
    ctx.fillStyle = role === 'villain' ? 'rgba(80,0,0,0.82)'
        : role === 'guide' ? 'rgba(0,30,80,0.82)'
            : 'rgba(0,0,0,0.70)';
    ctx.beginPath();
    ctx.moveTo(20, 6); ctx.lineTo(492, 6); ctx.quadraticCurveTo(506, 6, 506, 20);
    ctx.lineTo(506, 76); ctx.quadraticCurveTo(506, 90, 492, 90);
    ctx.lineTo(20, 90); ctx.quadraticCurveTo(6, 90, 6, 76);
    ctx.lineTo(6, 20); ctx.quadraticCurveTo(6, 6, 20, 6); ctx.closePath(); ctx.fill();
    const color = role === 'villain' ? '#ff9999' : role === 'guide' ? '#aaddff' : '#ffffff';
    tex.drawText(name, null, 60, 'bold 34px Arial', color, 'transparent', true);

    const m = new BABYLON.StandardMaterial(`lmat_${name}`, scene);
    m.diffuseTexture = m.emissiveTexture = m.opacityTexture = tex;
    m.backFaceCulling = false;
    m.disableLighting = true;
    plane.material = m;
}