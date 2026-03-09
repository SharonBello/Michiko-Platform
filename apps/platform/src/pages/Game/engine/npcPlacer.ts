import * as BABYLON from '@babylonjs/core';
import type { ThemeConfig } from './themeApplier';

export interface NPCMesh {
    id: string;
    name: string;
    mesh: BABYLON.Mesh;
    position: BABYLON.Vector3;
}

const NPC_POSITIONS = [
    new BABYLON.Vector3(-8, 0, -8),
    new BABYLON.Vector3(8, 0, -8),
    new BABYLON.Vector3(0, 0, 10),
];

export function placeNPCs(
    scene: BABYLON.Scene,
    npcs: Array<{ id: string; name: string; role: string }>,
    theme: ThemeConfig
): NPCMesh[] {
    return npcs.map((npc, i) => {
        const pos = NPC_POSITIONS[i % NPC_POSITIONS.length];
        const mesh = buildNPCMesh(scene, npc, pos, theme, i);
        return { id: npc.id, name: npc.name, mesh, position: pos };
    });
}
function buildNPCMesh(
    scene: BABYLON.Scene,
    npc: { id: string; name: string; role: string },
    pos: BABYLON.Vector3,
    theme: ThemeConfig,
    i: number
): BABYLON.Mesh {
    const root = new BABYLON.Mesh(`npc-root-${npc.id}`, scene);
    root.position = pos.clone();

    // Body — cylinder
    const body = BABYLON.MeshBuilder.CreateCylinder(`npc-body-${npc.id}`, {
        height: 1.2, diameterTop: 0.5, diameterBottom: 0.5, tessellation: 16
    }, scene);
    body.position.y = 0.6;
    body.parent = root;

    // Head — sphere
    const head = BABYLON.MeshBuilder.CreateSphere(`npc-head-${npc.id}`, { diameter: 0.55 }, scene);
    head.position.y = 1.5;
    head.parent = root;

    // Glow ring at feet
    const glow = BABYLON.MeshBuilder.CreateTorus(`npc-glow-${npc.id}`, {
        diameter: 0.9, thickness: 0.04, tessellation: 24
    }, scene);
    glow.position.y = 0.02;
    glow.rotation.x = Math.PI / 2;
    glow.parent = root;

    // Materials
    const bodyMat = new BABYLON.StandardMaterial(`npc-body-mat-${npc.id}`, scene);
    bodyMat.diffuseColor = theme.npcColor;
    bodyMat.emissiveColor = theme.npcColor.scale(0.3);
    body.material = bodyMat;
    head.material = bodyMat;

    const glowMat = new BABYLON.StandardMaterial(`npc-glow-mat-${npc.id}`, scene);
    glowMat.diffuseColor = theme.ambientColor;
    glowMat.emissiveColor = theme.ambientColor.scale(0.8);
    glow.material = glowMat;

    // Floating animation
    let t = i * 1.2;
    scene.registerBeforeRender(() => {
        t += 0.02;
        root.position.y = Math.sin(t) * 0.12;
    });

    return root as unknown as BABYLON.Mesh;
}