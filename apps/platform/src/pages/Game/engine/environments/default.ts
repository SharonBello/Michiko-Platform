import * as BABYLON from '@babylonjs/core';
import type { SceneLayout } from '@michiko/types';
import { hex } from './helpers';

export function buildDefaultProps(scene: BABYLON.Scene, layout: SceneLayout) {
    const mat = hex(scene, layout.accentColor, 0.3);
    const dark = hex(scene, layout.groundColor);

    // Simple obelisks
    [[-8, 6], [8, 6], [-8, -4], [8, -4]].forEach(([x, z], i) => {
        const obelisk = BABYLON.MeshBuilder.CreateCylinder(`ob_${i}`,
            { height: 4, diameterTop: 0, diameterBottom: 0.8, tessellation: 4 }, scene);
        obelisk.position = new BABYLON.Vector3(x!, 2, z!);
        obelisk.material = mat;
    });

    // Rings
    [4, 8].forEach((d, i) => {
        const ring = BABYLON.MeshBuilder.CreateTorus(`ring_${i}`,
            { diameter: d * 2, thickness: 0.07, tessellation: 40 }, scene);
        ring.position.y = 0.1;
        ring.material = mat;
        ring.isPickable = false;
    });
}