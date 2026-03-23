import type { EnvironmentConfigV2 } from '@michiko/types';

export const scienceLabV2: EnvironmentConfigV2 = {
  // ── Identity ──────────────────────────────────────────────────────────────
  id: 'science_lab',
  name: 'Science Laboratory',
  description: 'A futuristic science laboratory with holographic displays and glowing equipment',

  // ── Matching ──────────────────────────────────────────────────────────────
  topicKeywords: [
    'science', 'laboratory', 'chemistry', 'biology', 'physics', 'experiment',
    'research', 'scientist', 'molecule', 'atom', 'cell', 'dna', 'genetics',
    'medicine', 'technology', 'innovation', 'discovery', 'hypothesis', 'lab'
  ],
  tags: ['indoor', 'futuristic', 'clean', 'scientific', 'modern', 'tech'],

  // ── NPCs ──────────────────────────────────────────────────────────────────
  npcs: [
    {
      archetype: 'scientist',
      role: 'guide',
      names: ['Dr. Nova', 'Professor Chen', 'Dr. Einstein Jr.'],
      dialogueStyle: 'Enthusiastic about discovery, uses scientific terminology with clear explanations',
    },
    {
      archetype: 'assistant',
      role: 'neutral',
      names: ['Lab Assistant Max', 'Intern Riley', 'Research Fellow Sam'],
      dialogueStyle: 'Helpful and curious, asks clarifying questions',
    },
    {
      archetype: 'rival',
      role: 'villain',
      names: ['Dr. Chaos', 'The Mad Scientist', 'Professor Doom'],
      dialogueStyle: 'Competitive and dismissive, challenges scientific claims',
    },
  ],

  // ── Skybox ────────────────────────────────────────────────────────────────
  skybox: {
    type: 'hdri',
    hdriUrl: '/assets/skyboxes/lab_indoor.hdr',
    rotationY: 0,
    exposure: 1.0,
    colorHex: '#e8f4f8', // Fallback light blue-white
  },

  // ── Terrain ───────────────────────────────────────────────────────────────
  terrain: {
    type: 'flat',
    size: 50,
    material: {
      diffuseUrl: '/assets/textures/lab/metal_plate_diff_1k.jpg',
      normalUrl: '/assets/textures/lab/metal_plate_nor_gl_1k.jpg',
      uvScale: 8,
      fallbackColorHex: '#c0c0c0',
    },
    collisions: true,
    receiveShadows: true,
  },

  // ── Fog ───────────────────────────────────────────────────────────────────
  fog: {
    mode: 'exp2',
    colorHex: '#e0f0ff',
    density: 0.005,
  },

  // ── Lighting ──────────────────────────────────────────────────────────────
  lighting: {
    ambientColorHex: '#d0e8ff',
    ambientIntensity: 0.6,
    groundColorHex: '#a0b0c0',
    directional: {
      direction: { x: 0, y: -1, z: 0.3 },
      colorHex: '#ffffff',
      intensity: 0.8,
      shadows: true,
      shadowMapSize: 1024,
      shadowDarkness: 0.3,
    },
    pointLights: [
      // Overhead lab lights
      { position: { x: -8, y: 4, z: -8 }, colorHex: '#e0f0ff', intensity: 0.7, range: 12 },
      { position: { x: 8, y: 4, z: -8 }, colorHex: '#e0f0ff', intensity: 0.7, range: 12 },
      { position: { x: -8, y: 4, z: 8 }, colorHex: '#e0f0ff', intensity: 0.7, range: 12 },
      { position: { x: 8, y: 4, z: 8 }, colorHex: '#e0f0ff', intensity: 0.7, range: 12 },
      // Holographic display glows
      { position: { x: 0, y: 2, z: 0 }, colorHex: '#00aaff', intensity: 0.5, range: 8 },
      { position: { x: -6, y: 1.5, z: 5 }, colorHex: '#00ff88', intensity: 0.4, range: 6 },
      // Equipment accent lights
      { position: { x: 8, y: 1, z: -3 }, colorHex: '#ff6600', intensity: 0.3, range: 4 },
    ],
  },

  // ── Props ─────────────────────────────────────────────────────────────────
  props: [
    // Central holographic display
    {
      id: 'holo_main',
      name: 'Holographic Display',
      glbUrl: '/assets/props/lab/holographic_display.glb',
      scale: 1.2,
      position: { x: 0, y: 0, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    // Computer terminals
    {
      id: 'terminal_1',
      name: 'Computer Terminal',
      glbUrl: '/assets/props/lab/computer_terminal.glb',
      scale: 1.0,
      position: { x: -8, y: 0, z: -5 },
      rotation: { x: 0, y: 45, z: 0 },
      castShadows: true,
      receiveShadows: true,
      collisions: true,
    },
    {
      id: 'terminal_2',
      name: 'Computer Terminal',
      glbUrl: '/assets/props/lab/computer_terminal.glb',
      scale: 1.0,
      position: { x: 8, y: 0, z: -5 },
      rotation: { x: 0, y: -45, z: 0 },
      castShadows: true,
      receiveShadows: true,
      collisions: true,
    },
    {
      id: 'terminal_3',
      name: 'Computer Terminal',
      glbUrl: '/assets/props/lab/computer_terminal.glb',
      scale: 1.0,
      position: { x: -8, y: 0, z: 5 },
      rotation: { x: 0, y: 135, z: 0 },
      castShadows: true,
      receiveShadows: true,
      collisions: true,
    },
    // Microscope station
    {
      id: 'microscope',
      name: 'Microscope',
      glbUrl: '/assets/props/lab/microscope.glb',
      scale: 0.8,
      position: { x: 6, y: 0.9, z: 3 },
      castShadows: true,
    },
    // Lab flasks
    {
      id: 'flask_1',
      name: 'Lab Flask',
      glbUrl: '/assets/props/lab/lab_glass_flask.glb',
      scale: 0.6,
      position: { x: -6, y: 0.9, z: 5 },
      castShadows: true,
    },
    {
      id: 'flask_2',
      name: 'Lab Flask',
      glbUrl: '/assets/props/lab/lab_glass_flask.glb',
      scale: 0.5,
      position: { x: -5.5, y: 0.9, z: 5.3 },
      rotation: { x: 0, y: 30, z: 0 },
      castShadows: true,
    },
    {
      id: 'flask_3',
      name: 'Lab Flask',
      glbUrl: '/assets/props/lab/lab_glass_flask.glb',
      scale: 0.7,
      position: { x: -6.5, y: 0.9, z: 4.7 },
      rotation: { x: 0, y: -20, z: 0 },
      castShadows: true,
    },
    // Additional holographic displays around the room
    {
      id: 'holo_side_1',
      name: 'Side Display',
      glbUrl: '/assets/props/lab/holographic_display.glb',
      scale: 0.7,
      position: { x: -10, y: 0, z: 0 },
      rotation: { x: 0, y: 90, z: 0 },
      castShadows: true,
    },
    {
      id: 'holo_side_2',
      name: 'Side Display',
      glbUrl: '/assets/props/lab/holographic_display.glb',
      scale: 0.7,
      position: { x: 10, y: 0, z: 0 },
      rotation: { x: 0, y: -90, z: 0 },
      castShadows: true,
    },
  ],

  // ── Particles ─────────────────────────────────────────────────────────────
  particles: [
    {
      id: 'hologram_particles',
      preset: 'dust',
      emitterPosition: { x: 0, y: 2, z: 0 },
      emitterSize: { x: 3, y: 2, z: 3 },
      emitRate: 20,
      colorHex: '#00aaff44',
      sizeRange: { min: 0.01, max: 0.03 },
    },
    {
      id: 'ambient_particles',
      preset: 'dust',
      emitterPosition: { x: 0, y: 3, z: 0 },
      emitterSize: { x: 30, y: 4, z: 30 },
      emitRate: 3,
      colorHex: '#ffffff22',
    },
    {
      id: 'flask_bubbles',
      preset: 'bubbles',
      emitterPosition: { x: -6, y: 1.2, z: 5 },
      emitterSize: { x: 0.3, y: 0.3, z: 0.3 },
      emitRate: 8,
      colorHex: '#00ff8866',
      sizeRange: { min: 0.02, max: 0.05 },
    },
  ],

  // ── Post Processing ───────────────────────────────────────────────────────
  postProcess: {
    bloom: {
      enabled: true,
      intensity: 0.4,
      threshold: 0.6,
      blurKernelSize: 32,
    },
    colorGrading: {
      enabled: true,
      saturation: 1.0,
      contrast: 1.05,
      exposure: 1.05,
      temperature: -10, // Slight cool tint
    },
    vignette: {
      enabled: true,
      strength: 0.2,
      colorHex: '#001020',
    },
    fxaa: true,
    toneMapping: true,
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    ambientUrl: '/assets/music/lab_ambient.mp3',
    ambientVolume: 0.25,
    ambientLoop: true,
    spatialSounds: [
      {
        id: 'lab_hum',
        url: '/assets/sfx/lab_hum.mp3',
        position: { x: 0, y: 2, z: 0 },
        volume: 0.2,
        maxDistance: 25,
        loop: true,
      },
    ],
  },

  // ── Spawn Points ──────────────────────────────────────────────────────────
  spawnPoints: [
    { id: 'player_start', type: 'player', position: { x: 0, y: 1.7, z: -12 } },
    { id: 'npc_scientist', type: 'npc', position: { x: -3, y: 0, z: 2 }, npcArchetype: 'scientist' },
    { id: 'npc_assistant', type: 'npc', position: { x: 5, y: 0, z: 3 }, npcArchetype: 'assistant' },
    { id: 'npc_rival', type: 'npc', position: { x: 0, y: 0, z: 8 }, npcArchetype: 'rival' },
    { id: 'question_1', type: 'question', position: { x: 0, y: 1.5, z: 0 } },
    { id: 'question_2', type: 'question', position: { x: -7, y: 1.5, z: 4 } },
    { id: 'question_3', type: 'question', position: { x: 7, y: 1.5, z: -4 } },
  ],

  // ── Legacy Palette ────────────────────────────────────────────────────────
  palette: {
    skyColor: '#e8f4f8',
    fogColor: '#e0f0ff',
    fogDensity: 0.005,
    groundColor: '#c0c0c0',
    lightColor: '#ffffff',
    ambientColor: '#d0e8ff',
    accentColor: '#00aaff',
  },
};

export default scienceLabV2;
