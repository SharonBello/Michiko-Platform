import * as BABYLON from '@babylonjs/core';

export function hex(scene: BABYLON.Scene, color: string, emissive = 0): BABYLON.StandardMaterial {
    const mat = new BABYLON.StandardMaterial(`mat_${color}_${Math.random()}`, scene);
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;
    mat.diffuseColor = new BABYLON.Color3(r, g, b);
    mat.emissiveColor = new BABYLON.Color3(r * emissive, g * emissive, b * emissive);
    mat.specularColor = BABYLON.Color3.Black();
    return mat;
}

export function addFlicker(scene: BABYLON.Scene, light: BABYLON.PointLight, tag: string) {
    const anim = new BABYLON.Animation(
        `flicker_${tag}`, 'intensity', 30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    anim.setKeys([
        { frame: 0, value: light.intensity },
        { frame: 5, value: light.intensity * 1.25 },
        { frame: 10, value: light.intensity * 0.85 },
        { frame: 15, value: light.intensity * 1.15 },
        { frame: 20, value: light.intensity },
    ]);
    light.animations = [anim];
    scene.beginAnimation(light, 0, 20, true);
}

export function fire(scene: BABYLON.Scene, pos: BABYLON.Vector3, tag: string) {
    const ps = new BABYLON.ParticleSystem(`fire_${tag}`, 30, scene);
    ps.emitter = pos.clone();
    ps.minEmitBox = new BABYLON.Vector3(-0.05, 0, -0.05);
    ps.maxEmitBox = new BABYLON.Vector3(0.05, 0, 0.05);
    ps.color1 = new BABYLON.Color4(1, 0.6, 0.1, 1);
    ps.color2 = new BABYLON.Color4(1, 0.2, 0.0, 0.5);
    ps.colorDead = new BABYLON.Color4(0.2, 0.1, 0, 0);
    ps.minSize = 0.05; ps.maxSize = 0.2;
    ps.minLifeTime = 0.2; ps.maxLifeTime = 0.5;
    ps.emitRate = 30;
    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    ps.gravity = new BABYLON.Vector3(0, 3, 0);
    ps.direction1 = new BABYLON.Vector3(-0.1, 1, -0.1);
    ps.direction2 = new BABYLON.Vector3(0.1, 2, 0.1);
    ps.minEmitPower = 0.3; ps.maxEmitPower = 0.8;
    ps.updateSpeed = 0.02;
    ps.start();
}

export function torch(scene: BABYLON.Scene, x: number, z: number, accentColor: string, tag: string) {
    const poleMat = hex(scene, '#5a3a10', 0.05);
    const pole = BABYLON.MeshBuilder.CreateCylinder(`torch_pole_${tag}`,
        { height: 3, diameter: 0.12, tessellation: 6 }, scene);
    pole.position = new BABYLON.Vector3(x, 1.5, z);
    pole.material = poleMat;

    const bowl = BABYLON.MeshBuilder.CreateCylinder(`torch_bowl_${tag}`,
        { height: 0.3, diameterTop: 0.4, diameterBottom: 0.2, tessellation: 8 }, scene);
    bowl.position = new BABYLON.Vector3(x, 3.15, z);
    bowl.material = poleMat;

    const r = parseInt(accentColor.slice(1, 3), 16) / 255;
    const g = parseInt(accentColor.slice(3, 5), 16) / 255;
    const b = parseInt(accentColor.slice(5, 7), 16) / 255;

    const light = new BABYLON.PointLight(`torch_light_${tag}`,
        new BABYLON.Vector3(x, 3.5, z), scene);
    light.diffuse = new BABYLON.Color3(r, g, b);
    light.intensity = 1.8;
    light.range = 10;
    addFlicker(scene, light, tag);
    fire(scene, new BABYLON.Vector3(x, 3.3, z), tag);
}

export function spinAnim(scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh, frames: number, tag: string) {
    const anim = new BABYLON.Animation(
        `spin_${tag}`, 'rotation.y', 30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    anim.setKeys([{ frame: 0, value: 0 }, { frame: frames, value: Math.PI * 2 }]);
    mesh.animations = [anim];
    scene.beginAnimation(mesh, 0, frames, true);
}