import * as BABYLON from '@babylonjs/core';

// Babylon ParticleSystem REQUIRES a texture — without it particles are invisible.
// We create a tiny 8x8 white circle texture procedurally so no file is needed.
function makeParticleTex(scene: BABYLON.Scene, name: string): BABYLON.DynamicTexture {
    const tex = new BABYLON.DynamicTexture(name, { width: 32, height: 32 }, scene, false);
    const ctx = tex.getContext() as unknown as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 32, 32);
    ctx.beginPath();
    ctx.arc(16, 16, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    tex.update();
    tex.hasAlpha = true;
    return tex;
}

export function burstCorrect(
    scene: BABYLON.Scene,
    position: BABYLON.Vector3,
    _theme?: string
): void {
    const tex = makeParticleTex(scene, 'ptex_correct_' + Date.now());
    const ps = new BABYLON.ParticleSystem('burst_correct_' + Date.now(), 30, scene);

    ps.particleTexture = tex;
    ps.emitter = position.clone();
    ps.minEmitBox = new BABYLON.Vector3(-0.15, 0, -0.15);
    ps.maxEmitBox = new BABYLON.Vector3(0.15, 0, 0.15);

    ps.color1 = new BABYLON.Color4(1.0, 0.88, 0.2, 0.8);  // gold, softer
    ps.color2 = new BABYLON.Color4(1.0, 0.65, 0.0, 0.6);
    ps.colorDead = new BABYLON.Color4(1.0, 1.0, 0.5, 0.0);

    ps.minSize = 0.05; ps.maxSize = 0.14;
    ps.minLifeTime = 0.8; ps.maxLifeTime = 1.8;
    ps.emitRate = 0;
    ps.manualEmitCount = 30;

    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    ps.direction1 = new BABYLON.Vector3(-1.5, 3, -1.5);
    ps.direction2 = new BABYLON.Vector3(1.5, 5, 1.5);
    ps.gravity = new BABYLON.Vector3(0, -2, 0);
    ps.minEmitPower = 0.8; ps.maxEmitPower = 2;
    ps.updateSpeed = 0.016;

    ps.start();
    setTimeout(() => {
        ps.stop();
        setTimeout(() => { ps.dispose(); tex.dispose(); }, 2000);
    }, 100);
}

export function burstWrong(
    scene: BABYLON.Scene,
    position: BABYLON.Vector3
): void {
    const tex = makeParticleTex(scene, 'ptex_wrong_' + Date.now());
    const ps = new BABYLON.ParticleSystem('burst_wrong_' + Date.now(), 20, scene);

    ps.particleTexture = tex;
    ps.emitter = position.clone();
    ps.minEmitBox = new BABYLON.Vector3(-0.1, 0, -0.1);
    ps.maxEmitBox = new BABYLON.Vector3(0.1, 0, 0.1);

    ps.color1 = new BABYLON.Color4(1.0, 0.1, 0.1, 1.0);  // red
    ps.color2 = new BABYLON.Color4(0.8, 0.0, 0.0, 1.0);
    ps.colorDead = new BABYLON.Color4(0.5, 0.0, 0.0, 0.0);

    ps.minSize = 0.04; ps.maxSize = 0.10;
    ps.minLifeTime = 0.5; ps.maxLifeTime = 1.0;
    ps.emitRate = 0;
    ps.manualEmitCount = 20;

    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    ps.direction1 = new BABYLON.Vector3(-2, 2, -2);
    ps.direction2 = new BABYLON.Vector3(2, 4, 2);
    ps.gravity = new BABYLON.Vector3(0, -3, 0);
    ps.minEmitPower = 0.5; ps.maxEmitPower = 1.5;
    ps.updateSpeed = 0.016;

    ps.start();
    setTimeout(() => {
        ps.stop();
        setTimeout(() => { ps.dispose(); tex.dispose(); }, 1500);
    }, 100);
}