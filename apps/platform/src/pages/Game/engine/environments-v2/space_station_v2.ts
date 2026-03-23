import type { EnvironmentConfigV2 } from '@michiko/types';

export const spaceStationV2: EnvironmentConfigV2 = {
  // ── Identity ──────────────────────────────────────────────────────────────
  id: 'space_station',
  name: 'Space Station',
  description: 'A futuristic space station with starfield views and advanced technology',

  // ── Matching ──────────────────────────────────────────────────────────────
  topicKeywords: [
    'space', 'astronomy', 'planets', 'stars', 'galaxy', 'universe', 'nasa',
    'rocket', 'astronaut', 'moon', 'mars', 'solar system', 'gravity',
    'orbit', 'spacecraft', 'cosmos', 'satellite', 'telescope', 'alien'
  ],
  tags: ['indoor', 'futuristic', 'sci-fi', 'space', 'technology', 'dark'],

  // ── NPCs ──────────────────────────────────────────────────────────────────
  npcs: [
    {
      archetype: 'commander',
      role: 'guide',
      names: ['Commander Stella', 'Captain Orion', 'Admiral Nova'],
      dialogueStyle: 'Authoritative but encouraging, uses space terminology',
    },
    {
      archetype: 'crew',
      role: 'neutral',
      names: ['Ensign Luna', 'Engineer Cosmo', 'Navigator Atlas'],
      dialogueStyle: 'Friendly and supportive, shares fun space facts',
    },
    {
      archetype: 'ai',
      role: 'villain',
      names: ['NEXUS-7', 'The Anomaly', 'Rogue AI'],
      dialogueStyle: 'Cold and logical, questions human knowledge',
    },
  ],

  // ── Skybox ────────────────────────────────────────────────────────────────
  skybox: {
    type: 'hdri',
    hdriUrl: '/assets/skyboxes/space_stars.hdr',
    rotationY: 0,
    exposure: 0.6,
    colorHex: '#000008', // Fallback deep space
  },

  // ── Terrain ───────────────────────────────────────────────────────────────
  terrain: {
    type: 'flat',
    size: 50,
    material: {
      diffuseUrl: '/assets/textures/space/metal_plate_02_diff_1k.jpg',
      normalUrl: '/assets/textures/space/metal_plate_02_nor_gl_1k.jpg',
      uvScale: 6,
      fallbackColorHex: '#2a2a3a',
    },
    collisions: true,
    receiveShadows: true,
  },

  // ── Fog ───────────────────────────────────────────────────────────────────
  fog: {
    mode: 'exp2',
    colorHex: '#0a0a15',
    density: 0.012,
  },

  // ── Lighting ──────────────────────────────────────────────────────────────
  lighting: {
    ambientColorHex: '#1a1a2e',
    ambientIntensity: 0.3,
    groundColorHex: '#0a0a15',
    directional: {
      direction: { x: 0.5, y: -0.8, z: 0.3 },
      colorHex: '#aaccff', // Starlight
      intensity: 0.5,
      shadows: true,
      shadowMapSize: 1024,
      shadowDarkness: 0.6,
    },
    pointLights: [
      // Control panel glows
      { position: { x: 0, y: 1.5, z: 5 }, colorHex: '#00aaff', intensity: 0.6, range: 8 },
      { position: { x: -8, y: 1.5, z: 0 }, colorHex: '#ff6600', intensity: 0.5, range: 6 },
      { position: { x: 8, y: 1.5, z: 0 }, colorHex: '#00ff88', intensity: 0.5, range: 6 },
      // Ceiling lights
      { position: { x: 0, y: 4, z: 0 }, colorHex: '#4466aa', intensity: 0.4, range: 15 },
      { position: { x: -10, y: 4, z: -10 }, colorHex: '#3355aa', intensity: 0.3, range: 10 },
      { position: { x: 10, y: 4, z: -10 }, colorHex: '#3355aa', intensity: 0.3, range: 10 },
      // Window glow (starlight coming through)
      { position: { x: 0, y: 2, z: -15 }, colorHex: '#6688cc', intensity: 0.4, range: 12 },
    ],
  },

  // ── Props ─────────────────────────────────────────────────────────────────
  props: [
    // Main control console
    {
      id: 'control_main',
      name: 'Control Console',
      glbUrl: '/assets/props/space/futuristic_control.glb',
      scale: 1.2,
      position: { x: 0, y: 0, z: 5 },
      rotation: { x: 0, y: 180, z: 0 },
      castShadows: true,
      receiveShadows: true,
      collisions: true,
    },
    // Side control stations
    {
      id: 'control_left',
      name: 'Side Console',
      glbUrl: '/assets/props/space/futuristic_control.glb',
      scale: 0.9,
      position: { x: -10, y: 0, z: 0 },
      rotation: { x: 0, y: 90, z: 0 },
      castShadows: true,
      receiveShadows: true,
      collisions: true,
    },
    {
      id: 'control_right',
      name: 'Side Console',
      glbUrl: '/assets/props/space/futuristic_control.glb',
      scale: 0.9,
      position: { x: 10, y: 0, z: 0 },
      rotation: { x: 0, y: -90, z: 0 },
      castShadows: true,
      receiveShadows: true,
      collisions: true,
    },
    // Holographic interface
    {
      id: 'holo_interface',
      name: 'Holographic Interface',
      glbUrl: '/assets/props/space/holocase_Interface.glb',
      scale: 1.0,
      position: { x: 0, y: 0, z: 0 },
      castShadows: true,
    },
    // Space station window
    {
      id: 'window_main',
      name: 'Observation Window',
      glbUrl: '/assets/props/space/space_station_window.glb',
      scale: 1.5,
      position: { x: 0, y: 0, z: -15 },
      rotation: { x: 0, y: 0, z: 0 },
      castShadows: false,
      receiveShadows: true,
    },
    // Airlock
    {
      id: 'airlock',
      name: 'Airlock Door',
      glbUrl: '/assets/props/space/spaceship_airlock.glb',
      scale: 1.2,
      position: { x: -15, y: 0, z: -8 },
      rotation: { x: 0, y: 90, z: 0 },
      castShadows: true,
      receiveShadows: true,
      collisions: true,
    },
    // Seating
    {
      id: 'chair_captain',
      name: 'Captain Chair',
      glbUrl: '/assets/props/space/futuristic_chair.glb',
      scale: 1.0,
      position: { x: 0, y: 0, z: -5 },
      rotation: { x: 0, y: 0, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    {
      id: 'chair_crew_1',
      name: 'Crew Chair',
      glbUrl: '/assets/props/space/futuristic_chair.glb',
      scale: 0.9,
      position: { x: -4, y: 0, z: -3 },
      rotation: { x: 0, y: 30, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    {
      id: 'chair_crew_2',
      name: 'Crew Chair',
      glbUrl: '/assets/props/space/futuristic_chair.glb',
      scale: 0.9,
      position: { x: 4, y: 0, z: -3 },
      rotation: { x: 0, y: -30, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    // Couch
    {
      id: 'lounge_couch',
      name: 'Lounge Couch',
      glbUrl: '/assets/props/space/futuristic_couch.glb',
      scale: 1.0,
      position: { x: 8, y: 0, z: 8 },
      rotation: { x: 0, y: -135, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    // Storage / cargo
    {
      id: 'nebula_chest',
      name: 'Storage Container',
      glbUrl: '/assets/props/space/nebula_chest.glb',
      scale: 0.8,
      position: { x: -12, y: 0, z: 5 },
      rotation: { x: 0, y: 20, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    {
      id: 'nebula_chest_2',
      name: 'Storage Container',
      glbUrl: '/assets/props/space/nebula_chest.glb',
      scale: 0.7,
      position: { x: -11, y: 0, z: 7 },
      rotation: { x: 0, y: -10, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
  ],

  // ── Particles ─────────────────────────────────────────────────────────────
  particles: [
    {
      id: 'hologram_particles',
      preset: 'dust',
      emitterPosition: { x: 0, y: 1.5, z: 0 },
      emitterSize: { x: 2, y: 2, z: 2 },
      emitRate: 15,
      colorHex: '#00aaff33',
      sizeRange: { min: 0.01, max: 0.02 },
    },
    {
      id: 'console_particles',
      preset: 'dust',
      emitterPosition: { x: 0, y: 1, z: 5 },
      emitterSize: { x: 3, y: 1, z: 1 },
      emitRate: 10,
      colorHex: '#00ff8833',
      sizeRange: { min: 0.005, max: 0.015 },
    },
    {
      id: 'ambient_stars',
      preset: 'stars',
      emitterPosition: { x: 0, y: 3, z: -15 },
      emitterSize: { x: 20, y: 5, z: 2 },
      emitRate: 2,
      colorHex: '#ffffff66',
    },
    {
      id: 'dust_ambient',
      preset: 'dust',
      emitterPosition: { x: 0, y: 2, z: 0 },
      emitterSize: { x: 25, y: 4, z: 25 },
      emitRate: 3,
      colorHex: '#4466aa22',
    },
  ],

  // ── Post Processing ───────────────────────────────────────────────────────
  postProcess: {
    bloom: {
      enabled: true,
      intensity: 0.6,
      threshold: 0.4,
      blurKernelSize: 32,
    },
    colorGrading: {
      enabled: true,
      saturation: 1.1,
      contrast: 1.2,
      exposure: 0.95,
      temperature: -20, // Cool space feel
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
    ambientUrl: '/assets/music/space_ambient.mp3',
    ambientVolume: 0.3,
    ambientLoop: true,
    spatialSounds: [
      {
        id: 'spaceship_drone',
        url: '/assets/sfx/spaceship_drone.mp3',
        position: { x: 0, y: 0, z: 0 },
        volume: 0.25,
        maxDistance: 30,
        loop: true,
      },
    ],
  },

  // ── Spawn Points ──────────────────────────────────────────────────────────
  spawnPoints: [
    { id: 'player_start', type: 'player', position: { x: 0, y: 1.7, z: -10 } },
    { id: 'npc_commander', type: 'npc', position: { x: -3, y: 0, z: 2 }, npcArchetype: 'commander' },
    { id: 'npc_crew', type: 'npc', position: { x: 4, y: 0, z: 0 }, npcArchetype: 'crew' },
    { id: 'npc_ai', type: 'npc', position: { x: 0, y: 0, z: 6 }, npcArchetype: 'ai' },
    { id: 'question_1', type: 'question', position: { x: 0, y: 1.5, z: 0 } },
    { id: 'question_2', type: 'question', position: { x: -8, y: 1.5, z: 3 } },
    { id: 'question_3', type: 'question', position: { x: 8, y: 1.5, z: -3 } },
  ],

  // ── Legacy Palette ────────────────────────────────────────────────────────
  palette: {
    skyColor: '#000008',
    fogColor: '#0a0a15',
    fogDensity: 0.012,
    groundColor: '#2a2a3a',
    lightColor: '#aaccff',
    ambientColor: '#1a1a2e',
    accentColor: '#00aaff',
  },
};

export default spaceStationV2;
