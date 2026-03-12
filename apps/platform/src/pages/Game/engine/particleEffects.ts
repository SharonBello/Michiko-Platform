import * as BABYLON from '@babylonjs/core';
import { hexToColor3, getTheme } from './themeApplier';

export function burstCorrect(scene: BABYLON.Scene, position: BABYLON.Vector3, theme: string): void {
    burst(scene, position, getTheme(theme).accent, 80);
}

export function burstWrong(scene: BABYLON.Scene, position: BABYLON.Vector3): void {
    burst(scene, position, '#E63946', 40);
}

function burst(scene: BABYLON.Scene, pos: BABYLON.Vector3, hex: string, count: number): void {
    const ps = new BABYLON.ParticleSystem('burst', count, scene);
    ps.emitter = pos.clone();
    ps.minEmitBox = BABYLON.Vector3.Zero();
    ps.maxEmitBox = BABYLON.Vector3.Zero();

    const c = hexToColor3(hex);
    ps.color1 = new BABYLON.Color4(c.r, c.g, c.b, 1);
    ps.color2 = new BABYLON.Color4(c.r, c.g, c.b, 0.5);
    ps.colorDead = new BABYLON.Color4(0, 0, 0, 0);

    ps.minSize = 0.05;
    ps.maxSize = 0.2;
    ps.minLifeTime = 0.4;
    ps.maxLifeTime = 0.9;
    ps.emitRate = count * 10;
    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    ps.gravity = new BABYLON.Vector3(0, -4, 0);
    ps.minEmitPower = 3;
    ps.maxEmitPower = 7;
    ps.direction1 = new BABYLON.Vector3(-1, 2, -1);
    ps.direction2 = new BABYLON.Vector3(1, 4, 1);
    ps.updateSpeed = 0.02;

    ps.start();
    setTimeout(() => { ps.stop(); setTimeout(() => ps.dispose(), 1000); }, 150);
}