import * as BABYLON from '@babylonjs/core';
import { applyTheme, type ThemeConfig } from './themeApplier';

export interface BuiltScene {
  theme: ThemeConfig;
}

export function buildScene(scene: BABYLON.Scene, themeName: string): BuiltScene {
  const theme = applyTheme(scene, themeName);

  // Hemisphere light
  const hemi = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), scene);
  hemi.intensity   = 0.6;
  hemi.diffuse     = theme.ambientColor;
  hemi.groundColor = theme.groundColor;

  // Point light for drama
  const point = new BABYLON.PointLight('point', new BABYLON.Vector3(0, 8, 0), scene);
  point.intensity = 0.8;
  point.diffuse   = theme.ambientColor;

  // Ground
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 60, height: 60 }, scene);
  const groundMat = new BABYLON.StandardMaterial('groundMat', scene);
  groundMat.diffuseColor  = theme.groundColor;
  groundMat.specularColor = BABYLON.Color3.Black();
  ground.material = groundMat;

  // Grid lines on ground (NexusAcademy style, subtle for all themes)
  buildGridDecoration(scene, theme);

  // Floating platform rings
  buildPlatformRings(scene, theme);

  return { theme };
}

function buildGridDecoration(scene: BABYLON.Scene, theme: ThemeConfig) {
  for (let i = -5; i <= 5; i++) {
    const line = BABYLON.MeshBuilder.CreateBox(`gridX${i}`, { width: 60, height: 0.01, depth: 0.05 }, scene);
    line.position.z = i * 3;
    const mat = new BABYLON.StandardMaterial(`gridXMat${i}`, scene);
    mat.diffuseColor = theme.ambientColor.scale(0.15);
    mat.emissiveColor = theme.ambientColor.scale(0.1);
    line.material = mat;

    const line2 = line.clone(`gridZ${i}`);
    line2.rotation.y = Math.PI / 2;
  }
}

function buildPlatformRings(scene: BABYLON.Scene, theme: ThemeConfig) {
  const positions = [
    new BABYLON.Vector3(-8, 0.1, -8),
    new BABYLON.Vector3(8, 0.1, -8),
    new BABYLON.Vector3(0, 0.1, 10),
  ];

  positions.forEach((pos, i) => {
    const ring = BABYLON.MeshBuilder.CreateTorus(`ring${i}`, { diameter: 3, thickness: 0.08, tessellation: 32 }, scene);
    ring.position = pos.clone();
    ring.position.y = 0.05;
    ring.rotation.x = Math.PI / 2;
    const mat = new BABYLON.StandardMaterial(`ringMat${i}`, scene);
    mat.diffuseColor  = theme.ambientColor;
    mat.emissiveColor = theme.ambientColor.scale(0.4);
    ring.material = mat;
  });
}