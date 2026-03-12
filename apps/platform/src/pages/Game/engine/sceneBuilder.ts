import * as BABYLON from '@babylonjs/core';
import type { SceneLayout } from '@michiko/types';
import { hexToColor3, hexToColor4 } from './themeApplier';

// Environment builders
import { buildDefaultProps } from './environments/default';
import { buildSpaceProps } from './environments/space';
import { buildLibraryProps } from './environments/library';
import { buildJungleProps } from './environments/jungle';
import { buildMedievalProps } from './environments/medieval';
import { buildLaboratoryProps } from './environments/laboratory';
import { buildRomeProps } from './environments/rome';

const BUILDERS: Record<string, (scene: BABYLON.Scene, layout: SceneLayout) => void> = {
  roman_colosseum: buildRomeProps,
  space_station: buildSpaceProps,
  library: buildLibraryProps,
  jungle_temple: buildJungleProps,
  medieval_castle: buildMedievalProps,
  laboratory: buildLaboratoryProps,
};

export function buildScene(scene: BABYLON.Scene, layout: SceneLayout): void {
  // ── Background / fog ──────────────────────────────────────
  scene.clearColor = hexToColor4(layout.skyColor);
  scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
  scene.fogColor = hexToColor3(layout.fogColor);
  scene.fogDensity = layout.fogDensity;

  // ── Lighting ──────────────────────────────────────────────
  const ambient = new BABYLON.HemisphericLight('ambient', new BABYLON.Vector3(0, 1, 0), scene);
  ambient.diffuse = hexToColor3(layout.accentColor);
  ambient.groundColor = hexToColor3(layout.ambientColor);
  ambient.intensity = 0.7;

  const sun = new BABYLON.DirectionalLight('sun', new BABYLON.Vector3(-1, -2, -1), scene);
  sun.diffuse = BABYLON.Color3.White();
  sun.intensity = 1.2;

  // ── Ground ────────────────────────────────────────────────
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 60, height: 60, subdivisions: 4 }, scene);
  const groundMat = new BABYLON.StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = hexToColor3(layout.groundColor);
  groundMat.specularColor = BABYLON.Color3.Black();
  ground.material = groundMat;
  ground.receiveShadows = true;

  // ── Grid overlay ──────────────────────────────────────────
  buildGridOverlay(scene, layout.accentColor, 60);

  // ── Skydome ───────────────────────────────────────────────
  buildSkydome(scene, layout.skyColor);

  // ── Atmosphere particles ──────────────────────────────────
  buildAtmosphere(scene, layout.accentColor);

  // ── Environment-specific props ────────────────────────────
  const builder = BUILDERS[layout.environment] ?? buildDefaultProps;
  builder(scene, layout);
}

// ── Helpers ───────────────────────────────────────────────────

function buildGridOverlay(scene: BABYLON.Scene, accentHex: string, size: number) {
  const accent = hexToColor3(accentHex);
  const step = 8;
  const half = size / 2;

  for (let x = -half; x <= half; x += step) {
    const line = BABYLON.MeshBuilder.CreateLines(`gridX_${x}`, {
      points: [new BABYLON.Vector3(x, 0.01, -half), new BABYLON.Vector3(x, 0.01, half)]
    }, scene);
    line.color = accent;
    line.alpha = 0.15;
  }
  for (let z = -half; z <= half; z += step) {
    const line = BABYLON.MeshBuilder.CreateLines(`gridZ_${z}`, {
      points: [new BABYLON.Vector3(-half, 0.01, z), new BABYLON.Vector3(half, 0.01, z)]
    }, scene);
    line.color = accent;
    line.alpha = 0.15;
  }
}

function buildSkydome(scene: BABYLON.Scene, skyHex: string) {
  const dome = BABYLON.MeshBuilder.CreateSphere('skydome',
    { diameter: 150, sideOrientation: BABYLON.Mesh.BACKSIDE }, scene);
  dome.position.y = 20;

  const mat = new BABYLON.StandardMaterial('skydomeMat', scene);
  mat.diffuseColor = hexToColor3(skyHex);
  mat.emissiveColor = hexToColor3(skyHex);
  mat.backFaceCulling = false;
  mat.disableLighting = true;
  dome.material = mat;
}

function buildAtmosphere(scene: BABYLON.Scene, accentHex: string) {
  const accent = hexToColor3(accentHex);
  const ps = new BABYLON.ParticleSystem('atmosphere', 60, scene);
  ps.emitter = new BABYLON.Vector3(0, 5, 0);
  ps.minEmitBox = new BABYLON.Vector3(-20, 0, -20);
  ps.maxEmitBox = new BABYLON.Vector3(20, 10, 20);
  ps.color1 = new BABYLON.Color4(accent.r, accent.g, accent.b, 0.4);
  ps.color2 = new BABYLON.Color4(accent.r, accent.g, accent.b, 0.0);
  ps.minSize = 0.04; ps.maxSize = 0.12;
  ps.minLifeTime = 4; ps.maxLifeTime = 8;
  ps.emitRate = 8;
  ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
  ps.gravity = new BABYLON.Vector3(0, 0.02, 0);
  ps.minEmitPower = 0.1; ps.maxEmitPower = 0.3;
  ps.updateSpeed = 0.01;
  ps.start();
}