import * as BABYLON from '@babylonjs/core';

/**
 * Spawns a floating score popup above a position in 3D space.
 * Text rises and fades out over ~1.5s then self-destructs.
 */
export function showScorePopup(
    scene: BABYLON.Scene,
    position: BABYLON.Vector3,
    points: number,
    multiplier: number = 1
): void {
    const label = multiplier > 1 ? `+${points} ×${multiplier}!` : `+${points}`;
    const color = multiplier >= 3 ? '#ffcc00' : multiplier === 2 ? '#00e8ff' : '#ffffff';

    // Floating billboard plane
    const plane = BABYLON.MeshBuilder.CreatePlane(
        'score_popup_' + Date.now(),
        { width: 1.2, height: 0.4 },
        scene
    );
    plane.position = position.clone();
    plane.position.y += 2.2;
    plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    plane.isPickable = false;

    // Dynamic texture with score text
    const tex = new BABYLON.DynamicTexture('score_tex_' + Date.now(), { width: 256, height: 80 }, scene);
    tex.hasAlpha = true;
    const ctx = tex.getContext() as unknown as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 256, 80);
    ctx.font = 'bold 52px Arial';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 6;
    ctx.fillText(label, 128, 58);
    tex.update();

    const mat = new BABYLON.StandardMaterial('score_mat_' + Date.now(), scene);
    mat.diffuseTexture = tex;
    mat.emissiveTexture = tex;
    mat.opacityTexture = tex;
    mat.backFaceCulling = false;
    mat.disableLighting = true;
    plane.material = mat;

    // Animate: rise + fade out
    const startY = plane.position.y;
    const startT = performance.now();
    const DURATION = 1400;

    const obs = scene.onBeforeRenderObservable.add(() => {
        const t = (performance.now() - startT) / DURATION;
        if (t >= 1) {
            scene.onBeforeRenderObservable.remove(obs);
            plane.dispose();
            tex.dispose();
            mat.dispose();
            return;
        }
        plane.position.y = startY + t * 1.2;
        plane.visibility = t < 0.6 ? 1 : 1 - ((t - 0.6) / 0.4);
    });
}