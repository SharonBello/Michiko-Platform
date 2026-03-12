import * as BABYLON from '@babylonjs/core';
import type { SceneLayout } from '@michiko/types';
import { hex, spinAnim } from './helpers';

export function buildSpaceProps(scene: BABYLON.Scene, layout: SceneLayout) {
    const metal = hex(scene, '#1a2a3a');
    const panel = hex(scene, '#0d1a2a');
    const glow = hex(scene, layout.accentColor, 0.7);

    // Station floor panels
    for (let x = -3; x <= 3; x++) {
        for (let z = -3; z <= 3; z++) {
            const tile = BABYLON.MeshBuilder.CreateBox(`tile_${x}_${z}`,
                { width: 1.9, height: 0.1, depth: 1.9 }, scene);
            tile.position = new BABYLON.Vector3(x * 2, 0.05, z * 2);
            tile.material = (x + z) % 2 === 0 ? metal : panel;
            tile.isPickable = false;
        }
    }

    // Control panels on sides
    [[-10, 4], [10, 4], [-10, -2], [10, -2]].forEach(([x, z], i) => {
        const panel_ = BABYLON.MeshBuilder.CreateBox(`cpanel_${i}`,
            { width: 3, height: 2, depth: 0.4 }, scene);
        panel_.position = new BABYLON.Vector3(x!, 1.2, z!);
        panel_.rotation.y = x! < 0 ? Math.PI / 2 : -Math.PI / 2;
        panel_.material = metal;

        // Screen glow
        const screen = BABYLON.MeshBuilder.CreateBox(`screen_${i}`,
            { width: 2.4, height: 1.4, depth: 0.05 }, scene);
        screen.position = new BABYLON.Vector3(x!, 1.4, z! + (x! < 0 ? 0.2 : -0.2));
        screen.rotation.y = x! < 0 ? Math.PI / 2 : -Math.PI / 2;
        screen.material = glow;

        const light = new BABYLON.PointLight(`screen_light_${i}`,
            new BABYLON.Vector3(x!, 1.5, z!), scene);
        light.diffuse = BABYLON.Color3.FromHexString(layout.accentColor);
        light.intensity = 0.8;
        light.range = 6;
    });

    // Rotating satellite dish
    buildSatellite(scene, glow, metal);

    // Stars particle field
    const stars = new BABYLON.ParticleSystem('stars', 200, scene);
    stars.emitter = new BABYLON.Vector3(0, 10, 0);
    stars.minEmitBox = new BABYLON.Vector3(-30, -10, -30);
    stars.maxEmitBox = new BABYLON.Vector3(30, 10, 30);
    stars.color1 = new BABYLON.Color4(1, 1, 1, 0.8);
    stars.color2 = new BABYLON.Color4(0.8, 0.9, 1, 0.4);
    stars.minSize = 0.03; stars.maxSize = 0.08;
    stars.minLifeTime = 999; stars.maxLifeTime = 999;
    stars.emitRate = 200;
    stars.gravity = BABYLON.Vector3.Zero();
    stars.minEmitPower = 0; stars.maxEmitPower = 0;
    stars.start();

    // Window portals showing stars
    [[-0.1, 12], [0.1, 12]].forEach(([rx, z], i) => {
        const window_ = BABYLON.MeshBuilder.CreateBox(`window_${i}`,
            { width: 4, height: 3, depth: 0.2 }, scene);
        window_.position = new BABYLON.Vector3(i === 0 ? -4 : 4, 3, z!);
        window_.material = glow;
        window_.isPickable = false;
    });
}

function buildSatellite(scene: BABYLON.Scene, glow: BABYLON.StandardMaterial, metal: BABYLON.StandardMaterial) {
    const root = new BABYLON.TransformNode('satellite', scene);
    root.position = new BABYLON.Vector3(0, 6, 8);

    const body = BABYLON.MeshBuilder.CreateBox('sat_body',
        { width: 1, height: 0.6, depth: 0.6 }, scene);
    body.parent = root;
    body.material = metal;

    const panel1 = BABYLON.MeshBuilder.CreateBox('sat_panel1',
        { width: 2.5, height: 0.05, depth: 0.8 }, scene);
    panel1.parent = root;
    panel1.position = new BABYLON.Vector3(-1.5, 0, 0);
    panel1.material = glow;

    const panel2 = panel1.clone('sat_panel2');
    panel2.parent = root;
    panel2.position = new BABYLON.Vector3(1.5, 0, 0);

    spinAnim(scene, root as unknown as BABYLON.AbstractMesh, 300, 'satellite');
}