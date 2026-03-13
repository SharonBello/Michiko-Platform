import * as BABYLON from '@babylonjs/core';

/**
 * Gold star burst on correct answer — fires from NPC position
 */
export function burstCorrect(
    scene: BABYLON.Scene,
    position: BABYLON.Vector3,
    _theme?: string
): void {
    const ps = new BABYLON.ParticleSystem('burst_correct', 60, scene);
    ps.emitter = position.clone();
    ps.minEmitBox = new BABYLON.Vector3(-0.2, 0, -0.2);
    ps.maxEmitBox = new BABYLON.Vector3(0.2, 0, 0.2);

    ps.color1 = new BABYLON.Color4(1.0, 0.9, 0.1, 1.0);   // gold
    ps.color2 = new BABYLON.Color4(1.0, 0.6, 0.0, 1.0);   // amber
    ps.colorDead = new BABYLON.Color4(1.0, 1.0, 1.0, 0.0);

    ps.minSize = 0.06; ps.maxSize = 0.18;
    ps.minLifeTime = 0.6; ps.maxLifeTime = 1.2;
    ps.emitRate = 120;
    ps.manualEmitCount = 60;
    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    ps.direction1 = new BABYLON.Vector3(-2, 6, -2);
    ps.direction2 = new BABYLON.Vector3(2, 8, 2);
    ps.gravity = new BABYLON.Vector3(0, -4, 0);
    ps.minEmitPower = 1; ps.maxEmitPower = 3;
    ps.updateSpeed = 0.02;

    ps.start();
    setTimeout(() => { ps.stop(); setTimeout(() => ps.dispose(), 2000); }, 300);
}

/**
 * Red spark burst on wrong answer
 */
export function burstWrong(
    scene: BABYLON.Scene,
    position: BABYLON.Vector3
): void {
    const ps = new BABYLON.ParticleSystem('burst_wrong', 40, scene);
    ps.emitter = position.clone();
    ps.minEmitBox = new BABYLON.Vector3(-0.1, 0, -0.1);
    ps.maxEmitBox = new BABYLON.Vector3(0.1, 0, 0.1);

    ps.color1 = new BABYLON.Color4(1.0, 0.1, 0.1, 1.0);  // red
    ps.color2 = new BABYLON.Color4(0.8, 0.0, 0.0, 1.0);
    ps.colorDead = new BABYLON.Color4(0.5, 0.0, 0.0, 0.0);

    ps.minSize = 0.04; ps.maxSize = 0.12;
    ps.minLifeTime = 0.4; ps.maxLifeTime = 0.8;
    ps.emitRate = 80;
    ps.manualEmitCount = 40;
    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    ps.direction1 = new BABYLON.Vector3(-3, 4, -3);
    ps.direction2 = new BABYLON.Vector3(3, 6, 3);
    ps.gravity = new BABYLON.Vector3(0, -6, 0);
    ps.minEmitPower = 1; ps.maxEmitPower = 2;
    ps.updateSpeed = 0.02;

    ps.start();
    setTimeout(() => { ps.stop(); setTimeout(() => ps.dispose(), 1500); }, 200);
}