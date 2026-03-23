import type { EnvironmentConfigV2 } from '@michiko/types';

export const libraryEnvironmentV2: EnvironmentConfigV2 = {
  // ── Identity ──────────────────────────────────────────────────────────────
  id: 'library',
  name: 'Victorian Library',
  description: 'A warm, cozy Victorian library with mahogany bookshelves and soft lighting',

  // ── Matching ──────────────────────────────────────────────────────────────
  topicKeywords: [
    'literature', 'books', 'reading', 'writing', 'poetry', 'shakespeare',
    'history', 'philosophy', 'education', 'language', 'grammar', 'vocabulary',
    'library', 'study', 'research', 'novels', 'fiction', 'classics'
  ],
  tags: ['indoor', 'warm', 'cozy', 'victorian', 'educational', 'quiet'],

  // ── NPCs ──────────────────────────────────────────────────────────────────
  npcs: [
    {
      archetype: 'librarian',
      role: 'guide',
      names: ['Ms. Thornberry', 'Professor Reed', 'Dr. Whitmore'],
      dialogueStyle: 'Speaks in hushed, knowledgeable tones with literary references',
    },
    {
      archetype: 'student',
      role: 'neutral',
      names: ['Emma', 'Oliver', 'Charlotte'],
      dialogueStyle: 'Curious and eager to learn, asks thoughtful questions',
    },
    {
      archetype: 'critic',
      role: 'villain',
      names: ['Mr. Blackwood', 'Cornelius Snide'],
      dialogueStyle: 'Dismissive and condescending, challenges knowledge',
    },
  ],

  // ── Skybox ────────────────────────────────────────────────────────────────
  skybox: {
    type: 'hdri',
    hdriUrl: '/assets/skyboxes/warm_indoor.hdr',
    rotationY: 0,
    exposure: 1.0,
    colorHex: '#2a1f1a', // Fallback warm brown
  },

  // ── Terrain ───────────────────────────────────────────────────────────────
  terrain: {
    type: 'flat',
    size: 40,
    material: {
      diffuseUrl: '/assets/textures/library/wood_floor_diff_1k.jpg',
      normalUrl: '/assets/textures/library/wood_floor_nor_gl_1k.jpg',
      uvScale: 6,
      fallbackColorHex: '#4a3728',
    },
    collisions: true,
    receiveShadows: true,
  },

  // ── Fog ───────────────────────────────────────────────────────────────────
  fog: {
    mode: 'exp2',
    colorHex: '#1a1510',
    density: 0.015,
  },

  // ── Lighting ──────────────────────────────────────────────────────────────
  lighting: {
    ambientColorHex: '#ffd9a0',
    ambientIntensity: 0.4,
    groundColorHex: '#3d2817',
    directional: {
      direction: { x: -0.5, y: -1, z: -0.3 },
      colorHex: '#ffe4c4',
      intensity: 0.6,
      shadows: true,
      shadowMapSize: 1024,
      shadowDarkness: 0.4,
    },
    pointLights: [
      // Desk lamps
      { position: { x: -5, y: 2, z: 3 }, colorHex: '#ffcc66', intensity: 0.8, range: 8 },
      { position: { x: 5, y: 2, z: -3 }, colorHex: '#ffcc66', intensity: 0.8, range: 8 },
      // Ceiling lights
      { position: { x: 0, y: 4, z: 0 }, colorHex: '#fff0d0', intensity: 0.5, range: 15 },
      // Reading nook
      { position: { x: -8, y: 1.5, z: -5 }, colorHex: '#ffaa44', intensity: 0.6, range: 6 },
    ],
  },

  // ── Props ─────────────────────────────────────────────────────────────────
  props: [
    // Bookshelves along walls
    {
      id: 'bookshelf_1',
      name: 'Bookshelf',
      glbUrl: '/assets/props/library/bookshelf.glb',
      scale: 1.2,
      position: { x: -12, y: 0, z: 0 },
      rotation: { x: 0, y: 90, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    {
      id: 'bookshelf_2',
      name: 'Bookshelf',
      glbUrl: '/assets/props/library/bookshelf.glb',
      scale: 1.2,
      position: { x: -12, y: 0, z: 5 },
      rotation: { x: 0, y: 90, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    {
      id: 'bookshelf_3',
      name: 'Bookshelf',
      glbUrl: '/assets/props/library/bookshelf.glb',
      scale: 1.2,
      position: { x: -12, y: 0, z: -5 },
      rotation: { x: 0, y: 90, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    {
      id: 'bookshelf_4',
      name: 'Bookshelf',
      glbUrl: '/assets/props/library/bookshelf.glb',
      scale: 1.2,
      position: { x: 12, y: 0, z: 0 },
      rotation: { x: 0, y: -90, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    // Central desk
    {
      id: 'desk_main',
      name: 'Study Desk',
      glbUrl: '/assets/props/library/desk.glb',
      scale: 1.0,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      castShadows: true,
      receiveShadows: true,
      collisions: true,
    },
    // Desk lamp
    {
      id: 'lamp_desk',
      name: 'Desk Lamp',
      glbUrl: '/assets/props/library/lamp.glb',
      scale: 0.8,
      position: { x: -0.5, y: 0.8, z: 0 },
      castShadows: true,
    },
    // Globe
    {
      id: 'globe',
      name: 'Antique Globe',
      glbUrl: '/assets/props/library/globe.glb',
      scale: 0.7,
      position: { x: 1, y: 0.8, z: 0.3 },
      castShadows: true,
    },
    // Reading area
    {
      id: 'armchair_1',
      name: 'Armchair',
      glbUrl: '/assets/props/library/armchair.glb',
      scale: 1.0,
      position: { x: -6, y: 0, z: -4 },
      rotation: { x: 0, y: 45, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    {
      id: 'armchair_2',
      name: 'Armchair',
      glbUrl: '/assets/props/library/armchair.glb',
      scale: 1.0,
      position: { x: -8, y: 0, z: -6 },
      rotation: { x: 0, y: -30, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    // Couch
    {
      id: 'couch',
      name: 'Library Couch',
      glbUrl: '/assets/props/library/couch.glb',
      scale: 1.0,
      position: { x: 6, y: 0, z: 5 },
      rotation: { x: 0, y: 180, z: 0 },
      castShadows: true,
      receiveShadows: true,
    },
    // Scattered book stacks
    {
      id: 'books_1',
      name: 'Book Stack',
      glbUrl: '/assets/props/library/books_stack.glb',
      scale: 0.6,
      position: { x: 0.8, y: 0.8, z: -0.3 },
    },
    {
      id: 'books_2',
      name: 'Book Stack',
      glbUrl: '/assets/props/library/books_stack.glb',
      scale: 0.5,
      position: { x: -7, y: 0.5, z: -5 },
      rotation: { x: 0, y: 30, z: 0 },
    },
    // Additional lamps
    {
      id: 'lamp_reading',
      name: 'Reading Lamp',
      glbUrl: '/assets/props/library/lamp.glb',
      scale: 0.9,
      position: { x: -7, y: 0.8, z: -4.5 },
    },
  ],

  // ── Particles ─────────────────────────────────────────────────────────────
  particles: [
    {
      id: 'dust_motes',
      preset: 'dust',
      emitterPosition: { x: 0, y: 3, z: 0 },
      emitterSize: { x: 20, y: 4, z: 20 },
      emitRate: 5,
      colorHex: '#ffd9a066',
    },
  ],

  // ── Post Processing ───────────────────────────────────────────────────────
  postProcess: {
    bloom: {
      enabled: true,
      intensity: 0.3,
      threshold: 0.7,
      blurKernelSize: 32,
    },
    colorGrading: {
      enabled: true,
      saturation: 0.9,
      contrast: 1.1,
      exposure: 1.0,
      temperature: 20, // Warm
    },
    vignette: {
      enabled: true,
      strength: 0.4,
      colorHex: '#1a0f05',
    },
    fxaa: true,
    toneMapping: true,
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    ambientUrl: '/assets/music/library_calm.mp3',
    ambientVolume: 0.3,
    ambientLoop: true,
    spatialSounds: [
      {
        id: 'page_turn_ambient',
        url: '/assets/sfx/page_turn.mp3',
        position: { x: 0, y: 1, z: 0 },
        volume: 0.1,
        maxDistance: 15,
        loop: true,
      },
      {
        id: 'fire_crackle',
        url: '/assets/sfx/fire_crackle.mp3',
        position: { x: -8, y: 0.5, z: -5 },
        volume: 0.2,
        maxDistance: 10,
        loop: true,
      },
    ],
  },

  // ── Spawn Points ──────────────────────────────────────────────────────────
  spawnPoints: [
    { id: 'player_start', type: 'player', position: { x: 0, y: 1.7, z: -8 } },
    { id: 'npc_librarian', type: 'npc', position: { x: -3, y: 0, z: 2 }, npcArchetype: 'librarian' },
    { id: 'npc_student', type: 'npc', position: { x: 4, y: 0, z: 3 }, npcArchetype: 'student' },
    { id: 'npc_critic', type: 'npc', position: { x: 6, y: 0, z: -2 }, npcArchetype: 'critic' },
    { id: 'question_1', type: 'question', position: { x: 0, y: 1.5, z: 0 } },
    { id: 'question_2', type: 'question', position: { x: -6, y: 1.5, z: -4 } },
    { id: 'question_3', type: 'question', position: { x: 5, y: 1.5, z: 4 } },
  ],

  // ── Legacy Palette (backwards compatibility) ──────────────────────────────
  palette: {
    skyColor: '#2a1f1a',
    fogColor: '#1a1510',
    fogDensity: 0.015,
    groundColor: '#4a3728',
    lightColor: '#ffe4c4',
    ambientColor: '#ffd9a0',
    accentColor: '#ffcc66',
  },
};

export default libraryEnvironmentV2;
