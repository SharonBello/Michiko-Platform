import type { EnvironmentConfigV2 } from '@michiko/types';

export const medievalCastleV2: EnvironmentConfigV2 = {
  // ── Identity ──────────────────────────────────────────────────────────────
  id: 'medieval_castle',
  name: 'Medieval Castle',
  description: 'A moonlit medieval castle courtyard with torches and stone walls',

  // ── Matching ──────────────────────────────────────────────────────────────
  topicKeywords: [
    'medieval', 'castle', 'knight', 'kingdom', 'king', 'queen', 'dragon',
    'feudal', 'crusade', 'sword', 'armor', 'siege', 'throne', 'lord',
    'middle ages', 'renaissance', 'chivalry', 'jousting', 'heraldry'
  ],
  tags: ['outdoor', 'night', 'moody', 'fantasy', 'historical', 'castle'],

  // ── NPCs ──────────────────────────────────────────────────────────────────
  npcs: [
    {
      archetype: 'knight',
      role: 'guide',
      names: ['Sir Galahad', 'Sir Percival', 'Dame Eleanor'],
      dialogueStyle: 'Speaks with honor and chivalry, uses "thee" and "thy"',
    },
    {
      archetype: 'peasant',
      role: 'neutral',
      names: ['Thomas', 'Agnes', 'William'],
      dialogueStyle: 'Humble and helpful, shares local knowledge',
    },
    {
      archetype: 'sorcerer',
      role: 'villain',
      names: ['Mordred', 'The Dark Wizard', 'Morgana'],
      dialogueStyle: 'Mysterious and menacing, speaks in riddles',
    },
  ],

  // ── Skybox ────────────────────────────────────────────────────────────────
  skybox: {
    type: 'hdri',
    hdriUrl: '/assets/skyboxes/medieval_night.hdr',
    rotationY: 0,
    exposure: 0.8,
    colorHex: '#0a0a1a', // Fallback dark blue
  },

  // ── Terrain ───────────────────────────────────────────────────────────────
  terrain: {
    type: 'flat',
    size: 60,
    material: {
      diffuseUrl: '/assets/textures/medieval/castle_brick_02_red_diff_1k.jpg',
      normalUrl: '/assets/textures/medieval/castle_brick_02_red_nor_gl_1k.jpg',
      uvScale: 10,
      fallbackColorHex: '#3d3d3d',
    },
    collisions: true,
    receiveShadows: true,
  },

  // ── Fog ───────────────────────────────────────────────────────────────────
  fog: {
    mode: 'exp2',
    colorHex: '#1a1a2e',
    density: 0.02,
  },

  // ── Lighting ──────────────────────────────────────────────────────────────
  lighting: {
    ambientColorHex: '#3344aa',
    ambientIntensity: 0.25,
    groundColorHex: '#1a1a2e',
    directional: {
      direction: { x: 0.3, y: -1, z: 0.5 },
      colorHex: '#aabbff', // Moonlight
      intensity: 0.4,
      shadows: true,
      shadowMapSize: 2048,
      shadowDarkness: 0.7,
    },
    pointLights: [
      // Wall torches
      { position: { x: -10, y: 3, z: -10 }, colorHex: '#ff6622', intensity: 1.2, range: 12 },
      { position: { x: 10, y: 3, z: -10 }, colorHex: '#ff6622', intensity: 1.2, range: 12 },
      { position: { x: -10, y: 3, z: 10 }, colorHex: '#ff6622', intensity: 1.2, range: 12 },
      { position: { x: 10, y: 3, z: 10 }, colorHex: '#ff6622', intensity: 1.2, range: 12 },
      { position: { x: 0, y: 3, z: -15 }, colorHex: '#ff6622', intensity: 1.0, range: 10 },
      { position: { x: 0, y: 3, z: 15 }, colorHex: '#ff6622', intensity: 1.0, range: 10 },
    ],
  },

  // ── Props ─────────────────────────────────────────────────────────────────
  props: [
    // Wall torches
    {
      id: 'wall_torch_1',
      name: 'Wall Torch',
      glbUrl: '/assets/props/medieval/wall_torch.glb',
      scale: 1.0,
      position: { x: -10, y: 2, z: -10 },
      rotation: { x: 0, y: 45, z: 0 },
      castShadows: true,
    },
    {
      id: 'wall_torch_2',
      name: 'Wall Torch',
      glbUrl: '/assets/props/medieval/wall_torch.glb',
      scale: 1.0,
      position: { x: 10, y: 2, z: -10 },
      rotation: { x: 0, y: -45, z: 0 },
      castShadows: true,
    },
    {
      id: 'wall_torch_3',
      name: 'Wall Torch',
      glbUrl: '/assets/props/medieval/wall_torch.glb',
      scale: 1.0,
      position: { x: -10, y: 2, z: 10 },
      rotation: { x: 0, y: 135, z: 0 },
      castShadows: true,
    },
    {
      id: 'wall_torch_4',
      name: 'Wall Torch',
      glbUrl: '/assets/props/medieval/wall_torch.glb',
      scale: 1.0,
      position: { x: 10, y: 2, z: 10 },
      rotation: { x: 0, y: -135, z: 0 },
      castShadows: true,
    },
    // Standing torches
    {
      id: 'torch_center_1',
      name: 'Torch',
      glbUrl: '/assets/props/medieval/torch.glb',
      scale: 1.0,
      position: { x: 0, y: 0, z: -15 },
      castShadows: true,
    },
    {
      id: 'torch_center_2',
      name: 'Torch',
      glbUrl: '/assets/props/medieval/torch.glb',
      scale: 1.0,
      position: { x: 0, y: 0, z: 15 },
      castShadows: true,
    },
    // Kingdom banners
    {
      id: 'banner_1',
      name: 'Kingdom Banner',
      glbUrl: '/assets/props/medieval/kingdom_banner.glb',
      scale: 1.3,
      position: { x: -12, y: 0, z: 0 },
      rotation: { x: 0, y: 90, z: 0 },
      castShadows: true,
    },
    {
      id: 'banner_2',
      name: 'Kingdom Banner',
      glbUrl: '/assets/props/medieval/kingdom_banner.glb',
      scale: 1.3,
      position: { x: 12, y: 0, z: 0 },
      rotation: { x: 0, y: -90, z: 0 },
      castShadows: true,
    },
    // Armor stand
    {
      id: 'armor_1',
      name: 'Armor Stand',
      glbUrl: '/assets/props/medieval/armor_stand.glb',
      scale: 1.0,
      position: { x: -8, y: 0, z: -8 },
      rotation: { x: 0, y: 45, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    {
      id: 'armor_2',
      name: 'Armor Stand',
      glbUrl: '/assets/props/medieval/armor_stand.glb',
      scale: 1.0,
      position: { x: 8, y: 0, z: -8 },
      rotation: { x: 0, y: -45, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    // Tables
    {
      id: 'table_1',
      name: 'Medieval Table',
      glbUrl: '/assets/props/medieval/medieval_table.glb',
      scale: 1.0,
      position: { x: -5, y: 0, z: 5 },
      collisions: true,
      castShadows: true,
      receiveShadows: true,
    },
    {
      id: 'wooden_table',
      name: 'Wooden Table',
      glbUrl: '/assets/props/medieval/wooden_table.glb',
      scale: 1.0,
      position: { x: 5, y: 0, z: 5 },
      collisions: true,
      castShadows: true,
      receiveShadows: true,
    },
    // Barrels
    {
      id: 'barrels',
      name: 'Barrels',
      glbUrl: '/assets/props/medieval/barrel.glb',
      scale: 0.9,
      randomPlacement: {
        count: 5,
        area: { minX: -15, maxX: 15, minZ: -15, maxZ: 15 },
        scaleVariance: 0.15,
        randomRotationY: true,
        minSpacing: 4,
      },
      castShadows: true,
    },
    {
      id: 'broken_barrel',
      name: 'Broken Barrel',
      glbUrl: '/assets/props/medieval/broken_barrel.glb',
      scale: 0.9,
      position: { x: 7, y: 0, z: -5 },
      rotation: { x: 0, y: 30, z: 0 },
      castShadows: true,
    },
    // Treasure chest
    {
      id: 'treasure',
      name: 'Treasure Chest',
      glbUrl: '/assets/props/medieval/treasure_chest.glb',
      scale: 0.8,
      position: { x: 0, y: 0, z: 8 },
      castShadows: true,
      receiveShadows: true,
    },
  ],

  // ── Particles ─────────────────────────────────────────────────────────────
  particles: [
    {
      id: 'fog_wisps',
      preset: 'fog_wisps',
      emitterPosition: { x: 0, y: 0.5, z: 0 },
      emitterSize: { x: 40, y: 1, z: 40 },
      emitRate: 3,
      colorHex: '#4466aa44',
    },
    {
      id: 'torch_sparks_1',
      preset: 'sparks',
      emitterPosition: { x: -10, y: 3.5, z: -10 },
      emitterSize: { x: 0.3, y: 0.3, z: 0.3 },
      emitRate: 15,
      colorHex: '#ff4400',
    },
    {
      id: 'torch_sparks_2',
      preset: 'sparks',
      emitterPosition: { x: 10, y: 3.5, z: -10 },
      emitterSize: { x: 0.3, y: 0.3, z: 0.3 },
      emitRate: 15,
      colorHex: '#ff4400',
    },
    {
      id: 'torch_sparks_3',
      preset: 'sparks',
      emitterPosition: { x: -10, y: 3.5, z: 10 },
      emitterSize: { x: 0.3, y: 0.3, z: 0.3 },
      emitRate: 15,
      colorHex: '#ff4400',
    },
    {
      id: 'torch_sparks_4',
      preset: 'sparks',
      emitterPosition: { x: 10, y: 3.5, z: 10 },
      emitterSize: { x: 0.3, y: 0.3, z: 0.3 },
      emitRate: 15,
      colorHex: '#ff4400',
    },
    {
      id: 'fireflies',
      preset: 'fireflies',
      emitterPosition: { x: 0, y: 2, z: 0 },
      emitterSize: { x: 30, y: 4, z: 30 },
      emitRate: 5,
      colorHex: '#88ff8866',
    },
  ],

  // ── Post Processing ───────────────────────────────────────────────────────
  postProcess: {
    bloom: {
      enabled: true,
      intensity: 0.5,
      threshold: 0.5,
      blurKernelSize: 32,
    },
    colorGrading: {
      enabled: true,
      saturation: 0.85,
      contrast: 1.2,
      exposure: 0.9,
      temperature: -15, // Cool moonlight
    },
    vignette: {
      enabled: true,
      strength: 0.5,
      colorHex: '#000010',
    },
    fxaa: true,
    toneMapping: true,
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    ambientUrl: '/assets/music/medieval_fantasy.mp3',
    ambientVolume: 0.3,
    ambientLoop: true,
    spatialSounds: [
      {
        id: 'torch_crackle_1',
        url: '/assets/sfx/torch_crackle.mp3',
        position: { x: -10, y: 2, z: -10 },
        volume: 0.25,
        maxDistance: 10,
        loop: true,
      },
      {
        id: 'torch_crackle_2',
        url: '/assets/sfx/torch_crackle.mp3',
        position: { x: 10, y: 2, z: 10 },
        volume: 0.25,
        maxDistance: 10,
        loop: true,
      },
      {
        id: 'wind',
        url: '/assets/sfx/wind_ambient.mp3',
        position: { x: 0, y: 5, z: 0 },
        volume: 0.2,
        maxDistance: 40,
        loop: true,
      },
    ],
  },

  // ── Spawn Points ──────────────────────────────────────────────────────────
  spawnPoints: [
    { id: 'player_start', type: 'player', position: { x: 0, y: 1.7, z: -15 } },
    { id: 'npc_knight', type: 'npc', position: { x: -4, y: 0, z: 0 }, npcArchetype: 'knight' },
    { id: 'npc_peasant', type: 'npc', position: { x: 4, y: 0, z: 3 }, npcArchetype: 'peasant' },
    { id: 'npc_sorcerer', type: 'npc', position: { x: 0, y: 0, z: 10 }, npcArchetype: 'sorcerer' },
    { id: 'question_1', type: 'question', position: { x: 0, y: 1.5, z: 0 } },
    { id: 'question_2', type: 'question', position: { x: -8, y: 1.5, z: 6 } },
    { id: 'question_3', type: 'question', position: { x: 8, y: 1.5, z: -6 } },
  ],

  // ── Legacy Palette ────────────────────────────────────────────────────────
  palette: {
    skyColor: '#0a0a1a',
    fogColor: '#1a1a2e',
    fogDensity: 0.02,
    groundColor: '#3d3d3d',
    lightColor: '#aabbff',
    ambientColor: '#3344aa',
    accentColor: '#ff6622',
  },
};

export default medievalCastleV2;
