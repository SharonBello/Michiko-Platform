import * as BABYLON from '@babylonjs/core';
import type { SceneLayout } from '@michiko/types';
import { hex } from './helpers';

export function buildJungleProps(scene: BABYLON.Scene, layout: SceneLayout) {
    const stone = hex(scene, '#3a4a2a');
    const moss = hex(scene, '#2a4a1a');
    const wood = hex(scene, '#5a3a1a');
    const glow = hex(scene, layout.accentColor, 0.6);

    // Temple structure at back
    buildTemple(scene, stone, moss);

    // Trees
    [[-12, 6], [-8, 10], [8, 10], [12, 6], [-14, -2], [14, -2]].forEach(([x, z], i) => {
        buildTree(scene, x!, z!, wood, moss, i);
    });

    // Vines
    [[-4, 8], [4, 8], [0, 12]].forEach(([x, z], i) => {
        buildVine(scene, x!, z!, moss, i);
    });

    // Glowing plants
    [[-6, 4], [6, 4], [-3, -3], [3, -3]].forEach(([x, z], i) => {
        buildGlowPlant(scene, x!, z!, glow, i);
    });

    // Mist particles
    const mist = new BABYLON.ParticleSystem('mist', 50, scene);
    mist.emitter = new BABYLON.Vector3(0, 0.5, 0);
    mist.minEmitBox = new BABYLON.Vector3(-15, 0, -15);
    mist.maxEmitBox = new BABYLON.Vector3(15, 1, 15);
    mist.color1 = new BABYLON.Color4(0.7, 1, 0.7, 0.15);
    mist.color2 = new BABYLON.Color4(0.5, 0.8, 0.5, 0.0);
    mist.minSize = 0.8; mist.maxSize = 2;
    mist.minLifeTime = 4; mist.maxLifeTime = 8;
    mist.emitRate = 6;
    mist.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    mist.gravity = new BABYLON.Vector3(0, 0.05, 0);
    mist.minEmitPower = 0.1; mist.maxEmitPower = 0.3;
    mist.start();
}

function buildTemple(scene: BABYLON.Scene, stone: BABYLON.StandardMaterial, moss: BABYLON.StandardMaterial) {
    // Base platform tiers
    [5, 3, 1].forEach((w, i) => {
        const tier = BABYLON.MeshBuilder.CreateBox(`tier_${i}`,
            { width: w * 3, height: 1, depth: w * 3 }, scene);
        tier.position = new BABYLON.Vector3(0, i * 1.0, 10 - i * 0.5);
        tier.material = i % 2 === 0 ? stone : moss;
    });

    // Temple door
    const door = BABYLON.MeshBuilder.CreateBox('door',
        { width: 1.5, height: 2.5, depth: 0.5 }, scene);
    door.position = new BABYLON.Vector3(0, 1.25, 9.5);
    door.material = moss;

    // Side pillars
    [-3, 3].forEach((x, i) => {
        const pillar = BABYLON.MeshBuilder.CreateCylinder(`temple_pillar_${i}`,
            { height: 4, diameterTop: 0.5, diameterBottom: 0.6, tessellation: 8 }, scene);
        pillar.position = new BABYLON.Vector3(x, 3, 9);
        pillar.material = stone;
    });
}

function buildTree(
    scene: BABYLON.Scene, x: number, z: number,
    wood: BABYLON.StandardMaterial, leaves: BABYLON.StandardMaterial,
    idx: number
) {
    const trunk = BABYLON.MeshBuilder.CreateCylinder(`trunk_${idx}`,
        { height: 5 + idx * 0.3, diameterTop: 0.3, diameterBottom: 0.6, tessellation: 7 }, scene);
    trunk.position = new BABYLON.Vector3(x, (5 + idx * 0.3) / 2, z);
    trunk.material = wood;

    const canopy = BABYLON.MeshBuilder.CreateSphere(`canopy_${idx}`,
        { diameter: 3 + (idx % 2), segments: 5 }, scene);
    canopy.position = new BABYLON.Vector3(x, 5.5 + idx * 0.3, z);
    canopy.scaling.y = 0.7;
    canopy.material = leaves;
    canopy.isPickable = false;
}

function buildVine(
    scene: BABYLON.Scene, x: number, z: number,
    mat: BABYLON.StandardMaterial, idx: number
) {
    for (let i = 0; i < 4; i++) {
        const seg = BABYLON.MeshBuilder.CreateCylinder(`vine_${idx}_${i}`,
            { height: 1, diameter: 0.08, tessellation: 5 }, scene);
        seg.position = new BABYLON.Vector3(x + i * 0.15, 4.5 - i * 1.0, z);
        seg.rotation.z = i * 0.2;
        seg.material = mat;
        seg.isPickable = false;
    }
}

function buildGlowPlant(
    scene: BABYLON.Scene, x: number, z: number,
    mat: BABYLON.StandardMaterial, idx: number
) {
    for (let i = 0; i < 3; i++) {
        const leaf = BABYLON.MeshBuilder.CreatePlane(`glow_leaf_${idx}_${i}`,
            { width: 0.4, height: 0.7 }, scene);
        leaf.position = new BABYLON.Vector3(x + i * 0.2, 0.5, z + i * 0.1);
        leaf.rotation.y = i * (Math.PI / 3);
        leaf.material = mat;
        leaf.isPickable = false;
    }

    const light = new BABYLON.PointLight(`plant_light_${idx}`,
        new BABYLON.Vector3(x, 0.8, z), scene);
    light.diffuse = BABYLON.Color3.FromHexString(mat.emissiveColor.toHexString());
    light.intensity = 0.4;
    light.range = 4;
}