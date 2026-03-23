import type { EnvironmentConfigV2 } from '@michiko/types';

export const romanColosseumV2: EnvironmentConfigV2 = {
  id: 'roman_colosseum',
  name: 'Roman Forum',
  description: 'A grand Roman forum',

  topicKeywords: ['rome', 'roman', 'ancient', 'gladiator', 'caesar'],
  tags: ['outdoor', 'ancient', 'warm', 'historical'],

  npcs: [
    {
      archetype: 'senator',
      role: 'guide',
      names: ['Senator Marcus'],
      dialogueStyle: 'Speaks with authority',
    },
  ],

  skybox: {
    type: 'color',
    colorHex: '#e8b87a',
  },

  terrain: {
    type: 'flat',
    size: 100,  // -50 to +50
    material: {
      diffuseUrl: '/assets/textures/roman/cobblestone_diff.jpg',
      normalUrl: '/assets/textures/roman/cobblestone_nor.jpg',
      uvScale: 12,
      fallbackColorHex: '#8b7355',
    },
    collisions: true,
    receiveShadows: true,
  },

  fog: {
    mode: 'exp2',
    colorHex: '#d4c4a8',
    density: 0.025,  // Very thick - hides edges
  },

  lighting: {
    ambientColorHex: '#ffe8d0',
    ambientIntensity: 1.0,
    groundColorHex: '#8b7355',
    directional: {
      direction: { x: -0.5, y: -1.0, z: -0.3 },
      colorHex: '#fff5e6',
      intensity: 1.4,
      shadows: true,
      shadowMapSize: 1024,
      shadowDarkness: 0.3,
    },
    pointLights: [
      { position: { x: -8, y: 3, z: 12 }, colorHex: '#ff6622', intensity: 0.5, range: 10 },
      { position: { x: 8, y: 3, z: 12 }, colorHex: '#ff6622', intensity: 0.5, range: 10 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALL PROPS WITHIN -35 to +35 (terrain is -50 to +50)
  // Fog hides anything beyond ~30
  // ═══════════════════════════════════════════════════════════════════════════
  props: [
    // ─────────────────────────────────────────────────────────────────────────
    // MAIN BACKDROP (z = 28-32)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'colosseum',
      name: 'Colosseum',
      glbUrl: '/assets/props/roman/colosseum_wall.glb',
      scale: 2.5,
      position: { x: 0, y: 0, z: 32 },
      castShadows: false,
    },
    {
      id: 'triumphal_arch',
      name: 'Triumphal Arch',
      glbUrl: '/assets/props/roman/triumphal_arch.glb',
      scale: 2.2,
      position: { x: 0, y: 0, z: 26 },
      castShadows: true,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // COLUMNS - LEFT (x = -5)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'col_l1',
      name: 'Column',
      glbUrl: '/assets/props/roman/roman_column.glb',
      scale: 1.8,
      position: { x: -5, y: 0, z: 3 },
      castShadows: true,
    },
    {
      id: 'col_l2',
      name: 'Column',
      glbUrl: '/assets/props/roman/roman_column.glb',
      scale: 1.8,
      position: { x: -5, y: 0, z: 10 },
      castShadows: true,
    },
    {
      id: 'col_l3',
      name: 'Column',
      glbUrl: '/assets/props/roman/roman_column.glb',
      scale: 1.8,
      position: { x: -5, y: 0, z: 17 },
      castShadows: true,
    },
    {
      id: 'col_l4',
      name: 'Column',
      glbUrl: '/assets/props/roman/roman_column.glb',
      scale: 1.8,
      position: { x: -5, y: 0, z: 24 },
      castShadows: true,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // COLUMNS - RIGHT (x = 5)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'col_r1',
      name: 'Column',
      glbUrl: '/assets/props/roman/roman_column.glb',
      scale: 1.8,
      position: { x: 5, y: 0, z: 3 },
      castShadows: true,
    },
    {
      id: 'col_r2',
      name: 'Column',
      glbUrl: '/assets/props/roman/roman_column.glb',
      scale: 1.8,
      position: { x: 5, y: 0, z: 10 },
      castShadows: true,
    },
    {
      id: 'col_r3',
      name: 'Column',
      glbUrl: '/assets/props/roman/roman_column.glb',
      scale: 1.8,
      position: { x: 5, y: 0, z: 17 },
      castShadows: true,
    },
    {
      id: 'col_r4',
      name: 'Column',
      glbUrl: '/assets/props/roman/roman_column.glb',
      scale: 1.8,
      position: { x: 5, y: 0, z: 24 },
      castShadows: true,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // FOUNTAIN (center)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'fountain',
      name: 'Fountain',
      glbUrl: '/assets/props/roman/fountain.glb',
      scale: 1.2,
      position: { x: 0, y: 0, z: 12 },
      castShadows: true,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // STATUES
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'eagle',
      name: 'Eagle',
      glbUrl: '/assets/props/roman/eagle_statue.glb',
      scale: 1.5,
      position: { x: 0, y: 0, z: 42 },
      rotation: { x: 0, y: 180, z: 0 },
      castShadows: true,
    },
    {
      id: 'emperor',
      name: 'Emperor',
      glbUrl: '/assets/props/roman/emperor_statue.glb',
      scale: 2.0,
      position: { x: 15, y: 0, z: 20 },
      rotation: { x: 0, y: 180, z: 0 },
      castShadows: true,
    },
    {
      id: 'lion_1',
      name: 'Lion',
      glbUrl: '/assets/props/roman/lion_statue.glb',
      scale: 1.2,
      position: { x: -7, y: 0, z: 1 },
      rotation: { x: 0, y: 45, z: 0 },
      castShadows: true,
    },
    {
      id: 'lion_2',
      name: 'Lion',
      glbUrl: '/assets/props/roman/lion_statue.glb',
      scale: 1.2,
      position: { x: 7, y: 0, z: 1 },
      rotation: { x: 0, y: -45, z: 0 },
      castShadows: true,
    },
    // {
    //   id: 'lion_3',
    //   name: 'Lion',
    //   glbUrl: '/assets/props/roman/lion_statue.glb',
    //   scale: 1.2,
    //   position: { x: -7, y: 0, z: 22 },
    //   rotation: { x: 0, y: 135, z: 0 },
    //   castShadows: true,
    // },
    // {
    //   id: 'lion_4',
    //   name: 'Lion',
    //   glbUrl: '/assets/props/roman/lion_statue.glb',
    //   scale: 1.2,
    //   position: { x: 7, y: 0, z: 22 },
    //   rotation: { x: 0, y: -135, z: 0 },
    //   castShadows: true,
    // },
    // {
    //   id: 'bust_1',
    //   name: 'Bust',
    //   glbUrl: '/assets/props/roman/marble_bust.glb',
    //   scale: 1.0,
    //   position: { x: -9, y: 0, z: 14 },
    //   rotation: { x: 0, y: 30, z: 0 },
    //   castShadows: true,
    // },
    // {
    //   id: 'bust_2',
    //   name: 'Bust',
    //   glbUrl: '/assets/props/roman/marble_bust.glb',
    //   scale: 1.0,
    //   position: { x: 9, y: 0, z: 14 },
    //   rotation: { x: 0, y: -30, z: 0 },
    //   castShadows: true,
    // },

    // ─────────────────────────────────────────────────────────────────────────
    // BANNERS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'banner_1',
      name: 'Banner',
      glbUrl: '/assets/props/roman/red_banner.glb',
      scale: 1.6,
      position: { x: -3, y: 0, z: 22 },
      castShadows: true,
    },
    {
      id: 'banner_2',
      name: 'Banner',
      glbUrl: '/assets/props/roman/red_banner.glb',
      scale: 1.6,
      position: { x: 3, y: 0, z: 22 },
      castShadows: true,
    },
    // {
    //   id: 'banner_3',
    //   name: 'Banner',
    //   glbUrl: '/assets/props/roman/red_banner.glb',
    //   scale: 1.4,
    //   position: { x: -3, y: 0, z: 6 },
    //   castShadows: true,
    // },
    // {
    //   id: 'banner_4',
    //   name: 'Banner',
    //   glbUrl: '/assets/props/roman/red_banner.glb',
    //   scale: 1.4,
    //   position: { x: 3, y: 0, z: 6 },
    //   castShadows: true,
    // },

    // ─────────────────────────────────────────────────────────────────────────
    // BRAZIERS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'brazier_1',
      name: 'Brazier',
      glbUrl: '/assets/props/roman/fire_brazier.glb',
      scale: 0.9,
      position: { x: -32, y: 0, z: 16 },
      castShadows: true,
    },
    {
      id: 'brazier_2',
      name: 'Brazier',
      glbUrl: '/assets/props/roman/fire_brazier.glb',
      scale: 0.9,
      position: { x: 32, y: 0, z: 16 },
      castShadows: true,
    },
    // {
    //   id: 'brazier_3',
    //   name: 'Brazier',
    //   glbUrl: '/assets/props/roman/fire_brazier.glb',
    //   scale: 0.9,
    //   position: { x: -8, y: 0, z: 18 },
    //   castShadows: true,
    // },
    // {
    //   id: 'brazier_4',
    //   name: 'Brazier',
    //   glbUrl: '/assets/props/roman/fire_brazier.glb',
    //   scale: 0.9,
    //   position: { x: 8, y: 0, z: 18 },
    //   castShadows: true,
    // },

    // ─────────────────────────────────────────────────────────────────────────
    // BENCHES
    // ─────────────────────────────────────────────────────────────────────────
    // {
    //   id: 'bench_1',
    //   name: 'Bench',
    //   glbUrl: '/assets/props/roman/stone_bench.glb',
    //   scale: 0.7,
    //   position: { x: -10, y: 0, z: 10 },
    //   rotation: { x: 0, y: 90, z: 0 },
    //   collisions: true,
    //   castShadows: true,
    // },
    // {
    //   id: 'bench_2',
    //   name: 'Bench',
    //   glbUrl: '/assets/props/roman/stone_bench.glb',
    //   scale: 0.7,
    //   position: { x: 10, y: 0, z: 10 },
    //   rotation: { x: 0, y: -90, z: 0 },
    //   collisions: true,
    //   castShadows: true,
    // },
    // {
    //   id: 'bench_3',
    //   name: 'Bench',
    //   glbUrl: '/assets/props/roman/stone_bench.glb',
    //   scale: 0.7,
    //   position: { x: -10, y: 0, z: 20 },
    //   rotation: { x: 0, y: 90, z: 0 },
    //   collisions: true,
    //   castShadows: true,
    // },
    // {
    //   id: 'bench_4',
    //   name: 'Bench',
    //   glbUrl: '/assets/props/roman/stone_bench.glb',
    //   scale: 0.7,
    //   position: { x: 10, y: 0, z: 20 },
    //   rotation: { x: 0, y: -90, z: 0 },
    //   collisions: true,
    //   castShadows: true,
    // },

    // ─────────────────────────────────────────────────────────────────────────
    // TREES - LEFT (x = -15 to -18)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'tree_l1',
      name: 'Pine',
      glbUrl: '/assets/props/roman/pine_tree.glb',
      scale: 2.0,
      position: { x: -16, y: 0, z: 5 },
      castShadows: true,
    },
    {
      id: 'tree_l2',
      name: 'Palm',
      glbUrl: '/assets/props/roman/palm_tree.glb',
      scale: 2.8,
      position: { x: -18, y: 0, z: 14 },
      castShadows: true,
    },
    {
      id: 'tree_l3',
      name: 'Cypress',
      glbUrl: '/assets/props/roman/mediterranean_cypress.glb',
      scale: 1.8,
      position: { x: -16, y: 0, z: 22 },
      castShadows: true,
    },
    {
      id: 'tree_l4',
      name: 'Olive Tree',
      glbUrl: '/assets/props/roman/olive_tree.glb',
      scale: 3,
      position: { x: -5, y: 0, z: 18 },
      rotation: { x: 0, y: 20, z: 0 },
      castShadows: true,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TREES - RIGHT (x = 15 to 18)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'tree_r1',
      name: 'Pine',
      glbUrl: '/assets/props/roman/pine_tree_2.glb',
      scale: 2.0,
      position: { x: 16, y: 0, z: 5 },
      castShadows: true,
    },
    {
      id: 'tree_r2',
      name: 'Palm',
      glbUrl: '/assets/props/roman/palm_tree_2.glb',
      scale: 2.4,
      position: { x: 18, y: 0, z: 14 },
      castShadows: true,
    },
    {
      id: 'tree_r3',
      name: 'Cypress',
      glbUrl: '/assets/props/roman/mediterranean_cypress.glb',
      scale: 2.8,
      position: { x: 16, y: 0, z: 22 },
      castShadows: true,
    },
    {
      id: 'tree_r4',
      name: 'Olive Tree',
      glbUrl: '/assets/props/roman/olive_tree.glb',
      scale: 3,
      position: { x: -10, y: 0, z: 0 },
      rotation: { x: 0, y: 20, z: 0 },
      castShadows: true,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // MARKET AREA - LEFT
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'cart',
      name: 'Cart',
      glbUrl: '/assets/props/roman/merchant_cart.glb',
      scale: 2.0,
      position: { x: -13, y: 0, z: 6 },
      rotation: { x: 0, y: 25, z: 0 },
      castShadows: true,
    },
    // {
    //   id: 'crates',
    //   name: 'Crates',
    //   glbUrl: '/assets/props/roman/crates.glb',
    //   scale: 1.5,
    //   position: { x: -11, y: 0, z: 18 },
    //   castShadows: true,
    // },
    {
      id: 'amphora',
      name: 'Amphora',
      glbUrl: '/assets/props/roman/roman_amphora.glb',
      scale: 1,
      position: { x: -12, y: 0, z: 14 },
      castShadows: true,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TRAINING AREA - RIGHT
    // ─────────────────────────────────────────────────────────────────────────
    // {
    //   id: 'dummy_1',
    //   name: 'Dummy',
    //   glbUrl: '/assets/props/roman/training_dummy.glb',
    //   scale: 1.0,
    //   position: { x: 13, y: 0, z: 16 },
    //   rotation: { x: 0, y: -25, z: 0 },
    //   castShadows: true,
    // },
    // {
    //   id: 'dummy_2',
    //   name: 'Dummy',
    //   glbUrl: '/assets/props/roman/training_dummy.glb',
    //   scale: 1.0,
    //   position: { x: 15, y: 0, z: 18 },
    //   rotation: { x: 0, y: -50, z: 0 },
    //   castShadows: true,
    // },
    // {
    //   id: 'weapons',
    //   name: 'Weapons',
    //   glbUrl: '/assets/props/roman/weapons_rack.glb',
    //   scale: 1.0,
    //   position: { x: 11, y: 0, z: 17 },
    //   rotation: { x: 0, y: -40, z: 0 },
    //   castShadows: true,
    // },

    // ─────────────────────────────────────────────────────────────────────────
    // ENTRY ARCH (behind player)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'entry_arch',
      name: 'Entry Arch',
      glbUrl: '/assets/props/roman/roman_arch.glb',
      scale: 2.8,
      position: { x: 0, y: 0, z: -5 },
      castShadows: true,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TORCHES
    // ─────────────────────────────────────────────────────────────────────────
    // {
    //   id: 'torch_1',
    //   name: 'Torch',
    //   glbUrl: '/assets/props/roman/torch.glb',
    //   scale: 0.9,
    //   position: { x: -3, y: 0, z: -2 },
    //   castShadows: true,
    // },
    // {
    //   id: 'torch_2',
    //   name: 'Torch',
    //   glbUrl: '/assets/props/roman/torch.glb',
    //   scale: 0.9,
    //   position: { x: 3, y: 0, z: -2 },
    //   castShadows: true,
    // },
  ],

  particles: [
    {
      id: 'dust',
      preset: 'dust',
      emitterPosition: { x: 0, y: 2, z: 12 },
      emitterSize: { x: 30, y: 4, z: 35 },
      emitRate: 4,
      colorHex: '#c9a57425',
    },
  ],

  postProcess: {
    bloom: {
      enabled: true,
      intensity: 0.35,
      threshold: 0.65,
      blurKernelSize: 32,
    },
    colorGrading: {
      enabled: true,
      saturation: 1.12,
      contrast: 1.08,
      exposure: 1.0,
      temperature: 12,
    },
    vignette: {
      enabled: true,
      strength: 0.2,
      colorHex: '#1a0800',
    },
    fxaa: true,
    toneMapping: true,
  },

  audio: {
    ambientUrl: '/assets/music/roman_epic.mp3',
    ambientVolume: 0.25,
    ambientLoop: true,
    spatialSounds: [],
  },

  // Player at z = 0
  spawnPoints: [
    { id: 'player_start', type: 'player', position: { x: 0, y: 1.7, z: 0 } },
    { id: 'npc_senator', type: 'npc', position: { x: 3, y: 0, z: 8 }, npcArchetype: 'senator' },
    { id: 'question_1', type: 'question', position: { x: 0, y: 1.5, z: 8 } },
    { id: 'question_2', type: 'question', position: { x: -4, y: 1.5, z: 16 } },
    { id: 'question_3', type: 'question', position: { x: 4, y: 1.5, z: 22 } },
  ],

  palette: {
    skyColor: '#e8b87a',
    fogColor: '#d4c4a8',
    fogDensity: 0.025,
    groundColor: '#8b7355',
    lightColor: '#fff5e6',
    ambientColor: '#ffe8d0',
    accentColor: '#ff6622',
  },
};

export default romanColosseumV2;