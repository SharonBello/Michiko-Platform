import * as BABYLON from '@babylonjs/core';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import '@babylonjs/loaders/glTF';
import type { NPC, SceneLayout } from '@michiko/types';
import { pickCharacter, type CharacterDef } from './characterManifest';

const POSITIONS = [
    new BABYLON.Vector3(-5, 0, 5),
    new BABYLON.Vector3(5, 0, 5),
    new BABYLON.Vector3(-5, 0, -3),
    new BABYLON.Vector3(5, 0, -3),
    new BABYLON.Vector3(0, 0, 7),
    new BABYLON.Vector3(0, 0, -5),
];

/**
 * Raycast straight down from (x, 10, z) to find the actual floor Y.
 * Falls back to y=0 if nothing is hit (e.g. outside the mesh).
 */
function snapToGround(scene: BABYLON.Scene, x: number, z: number): number {
    const origin = new BABYLON.Vector3(x, 20, z);
    const direction = new BABYLON.Vector3(0, -1, 0);
    const ray = new BABYLON.Ray(origin, direction, 40);
    const hit = scene.pickWithRay(ray, m =>
        m.isPickable && m.isVisible && m.name !== '__root__' && !m.name.startsWith('hitbox')
    );
    return hit?.pickedPoint ? hit.pickedPoint.y : 0;
}

// Proximity distances (metres)
const DIST_WAVE = 5.0;   // NPC waves as player approaches
const DIST_DIALOGUE = 4.0;   // Auto-open dialogue
const DIALOGUE_COOLDOWN_MS = 12000; // Don't re-trigger for 12s after dismissal

interface NPCInstance {
    npc: NPC;
    root: BABYLON.TransformNode;
    animGroups: BABYLON.AnimationGroup[];
    currentAnim: string;
    proximityState: string;
    lastDialogueTime: number;
    charDef: CharacterDef;
}

export interface AnimRule { anim: string; loop: boolean; }
export interface NPCController {
    triggerEvent: (event: string, npcId: string, rule: AnimRule) => void;
    setDialogueClosed: (npcId: string) => void;  // call when player dismisses dialogue
    dispose: () => void;
}

export async function placeNPCs(
    scene: BABYLON.Scene,
    npcs: NPC[],
    layout: SceneLayout,
    onNPCProximity: (npc: NPC) => void,
    onNPCLeave?: (npc: NPC) => void,
    subject?: string,
    theme?: string,
): Promise<NPCController> {

    const instances = new Map<string, NPCInstance>();

    const usedCharIds: string[] = [];

    for (let i = 0; i < npcs.length; i++) {
        const npc = npcs[i]!;
        const basePos = POSITIONS[i % POSITIONS.length]!;
        const groundY = snapToGround(scene, basePos.x, basePos.z);
        const pos = new BABYLON.Vector3(basePos.x, groundY, basePos.z);
        const charDef = pickCharacter(layout.environment, npc.role, usedCharIds, subject, theme);
        usedCharIds.push(charDef.id);

        const result = await SceneLoader.ImportMeshAsync('', '/npcs/', charDef.file, scene);

        result.animationGroups.forEach(ag => ag.stop());
        result.meshes.forEach(m => { m.isVisible = false; });

        const root = new BABYLON.TransformNode(`npc_root_${npc.id}`, scene);
        root.position = pos.clone();
        root.scaling = new BABYLON.Vector3(charDef.scale, charDef.scale, charDef.scale);
        const [rx, ry, rz] = charDef.rotationFix;
        const faceY = Math.atan2(pos.x, pos.z) + Math.PI;
        root.rotation = new BABYLON.Vector3(rx, (ry ?? 0) + faceY, rz ?? 0);

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
            animGroups: result.animationGroups,
            currentAnim: charDef.animations.idle,
            proximityState: 'far',
            lastDialogueTime: 0,
            charDef,
        };
        instances.set(npc.id, instance);

        playAnim(instance, charDef.animations.idle, true);
        buildNameLabel(scene, npc.name, npc.role, root, charDef.scale);

        // Keep click as fallback (for desktop testing)
        const hitbox = BABYLON.MeshBuilder.CreateCylinder(`whb_${npc.id}`, {
            height: 1.8, diameter: 0.7, tessellation: 8
        }, scene);
        hitbox.position = pos.clone();
        hitbox.position.y = groundY + 0.9;
        hitbox.isPickable = true;
        hitbox.visibility = 0;
        hitbox.actionManager = new BABYLON.ActionManager(scene);
        hitbox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger, () => {
                const inst = instances.get(npc.id);
                if (!inst || inst.proximityState === 'dialogue') return;
                const camera = scene.activeCamera;
                if (!camera) return;
                const dist = BABYLON.Vector3.Distance(camera.position, inst.root.position);
                if (dist > DIST_DIALOGUE * 2) return;
                triggerDialogue(inst);
            }
        ));
    }

    function triggerDialogue(inst: NPCInstance) {
        const now = Date.now();
        if (now - inst.lastDialogueTime < DIALOGUE_COOLDOWN_MS) return;
        inst.proximityState = 'dialogue';
        playAnim(inst, inst.charDef.animations.talking, true);
        onNPCProximity(inst.npc);
    }

    // ── Proximity loop ────────────────────────────────────────────
    scene.registerBeforeRender(() => {
        const camera = scene.activeCamera;
        if (!camera) return;
        const now = Date.now();

        instances.forEach(inst => {
            const dist = BABYLON.Vector3.Distance(camera.position, inst.root.position);

            if (inst.proximityState === 'dialogue') {
                // Player walked away mid-dialogue → close it
                if (dist > DIST_DIALOGUE * 2) {
                    inst.proximityState = 'far';
                    inst.lastDialogueTime = now;
                    playAnim(inst, inst.charDef.animations.idle, true);
                    onNPCLeave?.(inst.npc);
                }
                return;
            }

            if (dist < DIST_DIALOGUE) {
                // Close enough to auto-trigger dialogue
                if (inst.proximityState !== 'dialogue') {
                    triggerDialogue(inst);
                }
            } else if (dist < DIST_WAVE) {
                // Wave zone — only wave once per approach
                if (inst.proximityState === 'far' &&
                    inst.currentAnim === inst.charDef.animations.idle &&
                    now - inst.lastDialogueTime > DIALOGUE_COOLDOWN_MS) {
                    inst.proximityState = 'wave';
                    playAnim(inst, inst.charDef.animations.wave, false, () => {
                        if (inst.proximityState === 'wave') {
                            inst.proximityState = 'far';
                            playAnim(inst, inst.charDef.animations.idle, true);
                        }
                    });
                }
            } else {
                // Player moved away — reset wave state
                if (inst.proximityState === 'wave') {
                    inst.proximityState = 'far';
                }
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
        setDialogueClosed: (npcId) => {
            const inst = instances.get(npcId);
            if (!inst) return;
            inst.proximityState = 'far';
            inst.lastDialogueTime = Date.now();
            playAnim(inst, inst.charDef.animations.idle, true);
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

function playAnim(inst: NPCInstance, animName: string, loop: boolean, onEnd?: () => void): void {
    inst.animGroups.forEach(ag => ag.stop());
    const ag = inst.animGroups.find(a => a.name === animName);
    if (!ag) {
        console.warn(`Anim not found: "${animName}".`);
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