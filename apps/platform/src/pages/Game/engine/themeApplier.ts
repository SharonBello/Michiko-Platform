import * as BABYLON from '@babylonjs/core';

export interface ThemeConfig {
  skyColor:      BABYLON.Color3;
  groundColor:   BABYLON.Color3;
  ambientColor:  BABYLON.Color3;
  npcColor:      BABYLON.Color3;
  fogColor:      BABYLON.Color4;
  fogDensity:    number;
}

const THEMES: Record<string, ThemeConfig> = {
  EduVerse: {
    skyColor:     new BABYLON.Color3(0.02, 0.05, 0.15),
    groundColor:  new BABYLON.Color3(0.04, 0.08, 0.12),
    ambientColor: new BABYLON.Color3(0.0, 0.78, 0.88),
    npcColor:     new BABYLON.Color3(0.0, 0.78, 0.88),
    fogColor:     new BABYLON.Color4(0.02, 0.05, 0.15, 1),
    fogDensity:   0.012,
  },
  ChronoWorld: {
    skyColor:     new BABYLON.Color3(0.08, 0.05, 0.02),
    groundColor:  new BABYLON.Color3(0.12, 0.08, 0.03),
    ambientColor: new BABYLON.Color3(0.9, 0.65, 0.1),
    npcColor:     new BABYLON.Color3(0.9, 0.65, 0.1),
    fogColor:     new BABYLON.Color4(0.08, 0.05, 0.02, 1),
    fogDensity:   0.015,
  },
  NexusAcademy: {
    skyColor:     new BABYLON.Color3(0.04, 0.02, 0.1),
    groundColor:  new BABYLON.Color3(0.06, 0.03, 0.12),
    ambientColor: new BABYLON.Color3(0.48, 0.2, 0.83),
    npcColor:     new BABYLON.Color3(0.48, 0.2, 0.83),
    fogColor:     new BABYLON.Color4(0.04, 0.02, 0.1, 1),
    fogDensity:   0.01,
  },
};

export function getTheme(theme: string): ThemeConfig {
  return THEMES[theme] ?? THEMES.EduVerse;
}

export function applyTheme(scene: BABYLON.Scene, theme: string): ThemeConfig {
  const cfg = getTheme(theme);
  scene.clearColor  = cfg.fogColor;
  scene.ambientColor = cfg.ambientColor;
  scene.fogMode     = BABYLON.Scene.FOGMODE_EXP;
  scene.fogDensity  = cfg.fogDensity;
  scene.fogColor    = new BABYLON.Color3(cfg.fogColor.r, cfg.fogColor.g, cfg.fogColor.b);
  return cfg;
}