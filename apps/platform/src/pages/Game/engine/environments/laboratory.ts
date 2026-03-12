import * as BABYLON from '@babylonjs/core';
import type { SceneLayout } from '@michiko/types';
import { hex, spinAnim } from './helpers';

export function buildLaboratoryProps(scene: BABYLON.Scene, layout: SceneLayout) {
    const metal = hex(scene, '#1a2a2a');
    const white_ = hex(scene, '#c8d8d8');
    const glow = hex(scene, layout.accentColor, 0.8);

    // Lab benches
    [[-6, 4], [6, 4], [-6, -2], [6, -2]].forEach(([x, z], i) => {
        buildBench(scene, x!, z!, metal, white_, i);
    });

    // Flasks and beakers
    [[-5, 5], [5, 5], [-5, -1], [5, -1], [0, 6]].forEach(([x, z], i) => {
        buildFlask(scene, x!, z!, glow, metal, i);
    });

    // Spinning molecule model in center
    buildMolecule(scene, glow, metal);

    // Lab screens on walls
    [[-11, 4], [11, 4]].forEach(([x, z], i) => {
        const screen = BABYLON.MeshBuilder.CreateBox(`lab_screen_${i}`,
            { width: 4, height: 2.5, depth: 0.15 }, scene);
        screen.position = new BABYLON.Vector3(x!, 2.5, z!);
        screen.rotation.y = x! < 0 ? Math.PI / 2 : -Math.PI / 2;
        screen.material = glow;

        const light = new BABYLON.PointLight(`screen_light_${i}`,
            new BABYLON.Vector3(x!, 2.5, z!), scene);
        light.diffuse = BABYLON.Color3.FromHexString(layout.accentColor);
        light.intensity = 0.6;
        light.range = 7;
    });

    // Bubbles rising from flasks
    buildBubbles(scene, layout.accentColor);
}

function buildBench(
    scene: BABYLON.Scene, x: number, z: number,
    metal: BABYLON.StandardMaterial, top: BABYLON.StandardMaterial,
    idx: number
) {
    const surface = BABYLON.MeshBuilder.CreateBox(`bench_${idx}`,
        { width: 3.5, height: 0.12, depth: 1.2 }, scene);
    surface.position = new BABYLON.Vector3(x, 0.95, z);
    surface.material = top;

    [[-1.5, -0.5], [-1.5, 0.5], [1.5, -0.5], [1.5, 0.5]].forEach(([dx, dz], li) => {
        const leg = BABYLON.MeshBuilder.CreateBox(`bench_leg_${idx}_${li}`,
            { width: 0.1, height: 0.95, depth: 0.1 }, scene);
        leg.position = new BABYLON.Vector3(x + dx!, 0.475, z + dz!);
        leg.material = metal;
    });
}

function buildFlask(
    scene: BABYLON.Scene, x: number, z: number,
    glow: BABYLON.StandardMaterial, metal: BABYLON.StandardMaterial,
    idx: number
) {
    const body = BABYLON.MeshBuilder.CreateSphere(`flask_${idx}`,
        { diameter: 0.4, segments: 6 }, scene);
    body.position = new BABYLON.Vector3(x, 1.28, z);
    body.scaling.y = 0.8;
    body.material = glow;

    const neck = BABYLON.MeshBuilder.CreateCylinder(`flask_neck_${idx}`,
        { height: 0.3, diameterTop: 0.1, diameterBottom: 0.15, tessellation: 8 }, scene);
    neck.position = new BABYLON.Vector3(x, 1.55, z);
    neck.material = metal;

    const light = new BABYLON.PointLight(`flask_light_${idx}`,
        new BABYLON.Vector3(x, 1.2, z), scene);
    light.diffuse = BABYLON.Color3.FromHexString(glow.emissiveColor.toHexString());
    light.intensity = 0.5;
    light.range = 3;
}

function buildMolecule(
    scene: BABYLON.Scene,
    glow: BABYLON.StandardMaterial,
    metal: BABYLON.StandardMaterial
) {
    const root = new BABYLON.TransformNode('molecule', scene);
    root.position = new BABYLON.Vector3(0, 2.5, 4);

    const core = BABYLON.MeshBuilder.CreateSphere('mol_core',
        { diameter: 0.5, segments: 8 }, scene);
    core.parent = root;
    core.material = glow;

    const offsets = [
        new BABYLON.Vector3(1, 0, 0), new BABYLON.Vector3(-1, 0, 0),
        new BABYLON.Vector3(0, 1, 0), new BABYLON.Vector3(0, -1, 0),
    ];

    offsets.forEach((off, i) => {
        const atom = BABYLON.MeshBuilder.CreateSphere(`atom_${i}`,
            { diameter: 0.3, segments: 6 }, scene);
        atom.parent = root;
        atom.position = off;
        atom.material = glow;

        const bond = BABYLON.MeshBuilder.CreateCylinder(`bond_${i}`,
            { height: 0.95, diameter: 0.06, tessellation: 6 }, scene);
        bond.parent = root;
        bond.position = off.scale(0.5);
        bond.rotation = off.x !== 0
            ? new BABYLON.Vector3(0, 0, Math.PI / 2)
            : BABYLON.Vector3.Zero();
        bond.material = metal;
    });

    spinAnim(scene, root as unknown as BABYLON.AbstractMesh, 180, 'molecule');
}

function buildBubbles(scene: BABYLON.Scene, accentHex: string) {
    const r = parseInt(accentHex.slice(1, 3), 16) / 255;
    const g = parseInt(accentHex.slice(3, 5), 16) / 255;
    const b = parseInt(accentHex.slice(5, 7), 16) / 255;

    const ps = new BABYLON.ParticleSystem('bubbles', 40, scene);
    ps.emitter = new BABYLON.Vector3(0, 1, 3);
    ps.minEmitBox = new BABYLON.Vector3(-5, 0, -2);
    ps.maxEmitBox = new BABYLON.Vector3(5, 0, 2);
    ps.color1 = new BABYLON.Color4(r, g, b, 0.6);
    ps.color2 = new BABYLON.Color4(r, g, b, 0.2);
    ps.colorDead = new BABYLON.Color4(r, g, b, 0);
    ps.minSize = 0.05; ps.maxSize = 0.18;
    ps.minLifeTime = 2; ps.maxLifeTime = 4;
    ps.emitRate = 10;
    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    ps.gravity = new BABYLON.Vector3(0, 1.5, 0);
    ps.direction1 = new BABYLON.Vector3(-0.1, 1, -0.1);
    ps.direction2 = new BABYLON.Vector3(0.1, 2, 0.1);
    ps.minEmitPower = 0.2; ps.maxEmitPower = 0.5;
    ps.start();
}