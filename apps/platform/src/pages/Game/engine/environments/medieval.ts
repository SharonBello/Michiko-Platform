import * as BABYLON from '@babylonjs/core';
import type { SceneLayout } from '@michiko/types';
import { hex, torch } from './helpers';

export function buildMedievalProps(scene: BABYLON.Scene, layout: SceneLayout) {
    const stone = hex(scene, '#4a4a5a');
    const dark = hex(scene, '#2a2a3a');
    const wood = hex(scene, '#5a3a1a');

    buildCastleWall(scene, stone, dark);
    buildTowers(scene, stone, dark);

    // Torches on walls
    [[-6, 8], [6, 8], [-6, 2], [6, 2]].forEach(([x, z], i) => {
        torch(scene, x!, z!, layout.accentColor, `med_${i}`);
    });

    // Stone floor with cracks
    const floor = BABYLON.MeshBuilder.CreateGround('castle_floor',
        { width: 24, height: 20 }, scene);
    floor.position.y = 0.02;
    floor.material = dark;

    // Wooden gate
    buildGate(scene, wood, stone);

    // Banners
    [[-5, 10], [5, 10]].forEach(([x, z], i) => {
        const banner = BABYLON.MeshBuilder.CreatePlane(`banner_${i}`,
            { width: 1, height: 2.5 }, scene);
        banner.position = new BABYLON.Vector3(x!, 4, z!);
        banner.material = hex(scene, layout.accentColor, 0.5);
        banner.isPickable = false;
    });
}

function buildCastleWall(
    scene: BABYLON.Scene,
    stone: BABYLON.StandardMaterial,
    dark: BABYLON.StandardMaterial
) {
    // Back wall
    const wall = BABYLON.MeshBuilder.CreateBox('castle_wall',
        { width: 24, height: 8, depth: 1.5 }, scene);
    wall.position = new BABYLON.Vector3(0, 4, 12);
    wall.material = stone;

    // Battlements
    for (let i = -5; i <= 5; i++) {
        const merlon = BABYLON.MeshBuilder.CreateBox(`merlon_${i}`,
            { width: 1, height: 1.5, depth: 1.6 }, scene);
        merlon.position = new BABYLON.Vector3(i * 2, 8.75, 12);
        merlon.material = dark;
    }

    // Side walls
    [-12, 12].forEach((x, i) => {
        const sideWall = BABYLON.MeshBuilder.CreateBox(`side_wall_${i}`,
            { width: 1.5, height: 8, depth: 20 }, scene);
        sideWall.position = new BABYLON.Vector3(x, 4, 2);
        sideWall.material = stone;
    });
}

function buildTowers(
    scene: BABYLON.Scene,
    stone: BABYLON.StandardMaterial,
    dark: BABYLON.StandardMaterial
) {
    [[-12, 12], [12, 12]].forEach(([x, z], i) => {
        const tower = BABYLON.MeshBuilder.CreateCylinder(`tower_${i}`,
            { height: 11, diameter: 4, tessellation: 10 }, scene);
        tower.position = new BABYLON.Vector3(x!, 5.5, z!);
        tower.material = stone;

        const cap = BABYLON.MeshBuilder.CreateCylinder(`tower_cap_${i}`,
            { height: 2.5, diameterTop: 0, diameterBottom: 4.5, tessellation: 10 }, scene);
        cap.position = new BABYLON.Vector3(x!, 11.25, z!);
        cap.material = dark;
    });
}

function buildGate(
    scene: BABYLON.Scene,
    wood: BABYLON.StandardMaterial,
    stone: BABYLON.StandardMaterial
) {
    const arch = BABYLON.MeshBuilder.CreateBox('gate_arch',
        { width: 5, height: 6, depth: 1.6 }, scene);
    arch.position = new BABYLON.Vector3(0, 3, 12);
    arch.material = stone;

    const gate = BABYLON.MeshBuilder.CreateBox('gate_door',
        { width: 3.5, height: 5, depth: 0.3 }, scene);
    gate.position = new BABYLON.Vector3(0, 2.5, 11.5);
    gate.material = wood;
}