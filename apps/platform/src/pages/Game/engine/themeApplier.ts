import * as BABYLON from '@babylonjs/core';

export interface ThemePalette {
  sky: string;   // hex
  fog: string;
  ground: string;
  ambient: string;
  accent: string;
  npcBody: string;
  npcHead: string;
  fogDensity: number;
  groundScale: number;
}

export const THEMES: Record<string, ThemePalette> = {
  EduVerse: {
    sky: '#0a1628',
    fog: '#0a1628',
    ground: '#0d2137',
    ambient: '#1a3a5c',
    accent: '#00C8E0',
    npcBody: '#0066aa',
    npcHead: '#ffcc88',
    fogDensity: 0.018,
    groundScale: 80,
  },
  ChronoWorld: {
    sky: '#1a0a00',
    fog: '#2a1200',
    ground: '#2d1a00',
    ambient: '#4a2800',
    accent: '#E63946',
    npcBody: '#8b4513',
    npcHead: '#dda060',
    fogDensity: 0.022,
    groundScale: 80,
  },
  NexusAcademy: {
    sky: '#0d0020',
    fog: '#120030',
    ground: '#1a0040',
    ambient: '#2d0060',
    accent: '#7B35D4',
    npcBody: '#4a008a',
    npcHead: '#cc88ff',
    fogDensity: 0.015,
    groundScale: 80,
  },
};

export function getTheme(theme: string): ThemePalette {
  return THEMES[theme] ?? THEMES['EduVerse'];
}

export function hexToColor3(hex: string): BABYLON.Color3 {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return new BABYLON.Color3(r, g, b);
}

export function hexToColor4(hex: string, a = 1): BABYLON.Color4 {
  const c = hexToColor3(hex);
  return new BABYLON.Color4(c.r, c.g, c.b, a);
}