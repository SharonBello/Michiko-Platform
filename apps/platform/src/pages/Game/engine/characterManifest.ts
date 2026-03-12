// characterManifest.ts
// Define every character model available in the game.
// Add new characters here — no other code needs to change.

export type CharacterSource = 'mixamo' | 'quaternius' | 'sketchfab' | 'custom';

export interface AnimationMap {
  idle: string;
  talking: string;
  thinking: string;
  wave: string;
  correct: string;       // correct answer celebration
  correctAlt?: string;       // optional alternate correct
  wrong: string;
  shrug?: string;
  point?: string;
  nodYes?: string;
  shakeNo?: string;
  bow?: string;
  salute?: string;
  clap?: string;
  victory?: string;
  happy?: string;
  dance?: string;
  cry?: string;
  cheer?: string;
  run?: string;
  walk?: string;
}

export interface CharacterDef {
  id: string;          // unique key e.g. 'xbot_default'
  file: string;          // path under /npcs/ e.g. 'X_Bot.glb'
  source: CharacterSource;
  displayName: string;
  rotationFix: [number, number, number]; // euler XYZ in radians to fix orientation
  scale: number;                   // uniform scale to reach ~1.75m height
  animations: AnimationMap;            // maps standard event names → actual anim names in GLB
  environments?: string[];               // if set, only use for these environments
  ageGroups?: string[];                // if set, only use for these age groups
  roles?: Array<'guide' | 'villain' | 'neutral'>; // if set, only use for these roles
}

// ── Character definitions ─────────────────────────────────────
export const CHARACTERS: CharacterDef[] = [

  // ── Mixamo X-Bot (your current character) ───────────────────
  {
    id: 'xbot_default',
    file: 'X_Bot.glb',
    source: 'mixamo',
    displayName: 'X-Bot',
    rotationFix: [Math.PI / 2, 0, 0],  // Start at 0 — adjust if lying flat
    scale: 0.011,
    animations: {
      idle: 'anim_idle',
      talking: 'anim_talking',
      thinking: 'anim_thinking',
      wave: 'anim_standing_greeting',
      correct: 'anim_victory',
      correctAlt: 'anime_happy',
      wrong: 'anim_disappointed',
      shrug: 'anim_shrugging',
      point: 'anim_pointing',
      nodYes: 'anim_head_nod_yes',
      shakeNo: 'anim_shaking_head_no',
      bow: 'anim_quick_formal_bow',
      salute: 'anim_salute',
      clap: 'anim_standing_clap',
      victory: 'anim_victory',
      happy: 'anime_happy',
      dance: 'anim_hip_hop_dancing',
      cry: 'anim_crying',
      cheer: 'anim_cheering',
      run: 'anim_running',
      walk: 'anim_walking',
    },
  },

  // ── Example: Quaternius character (when you add one) ────────
  // {
  //   id:          'quaternius_soldier',
  //   file:        'soldier.glb',
  //   source:      'quaternius',
  //   displayName: 'Soldier',
  //   rotationFix: [0, 0, 0],   // Quaternius exports upright
  //   scale:       1.0,
  //   environments: ['war_trenches','ancient_battlefield','medieval_castle'],
  //   animations: {
  //     idle:     'Idle',
  //     talking:  'Talk',
  //     thinking: 'Idle',       // no thinking anim → fall back to idle
  //     wave:     'Wave',
  //     correct:  'Victory',
  //     wrong:    'Death',      // dramatic!
  //     salute:   'Salute',
  //     walk:     'Walk',
  //     run:      'Run',
  //   },
  // },

  // ── Example: Sketchfab character (when you add one) ─────────
  // {
  //   id:          'sketchfab_roman',
  //   file:        'roman_senator.glb',
  //   source:      'sketchfab',
  //   displayName: 'Roman Senator',
  //   rotationFix: [0, Math.PI, 0],  // this one faces backwards, flip Y
  //   scale:       0.8,
  //   environments: ['roman_colosseum','ancient_battlefield','greek_temple'],
  //   animations: {
  //     idle:     'Standing Idle',
  //     talking:  'Talking',
  //     thinking: 'Standing Idle',
  //     wave:     'Waving',
  //     correct:  'Cheering',
  //     wrong:    'Sad Idle',
  //   },
  // },

];

// ── Pick the best character for a given context ───────────────
export function selectCharacter(
  environment: string,
  ageGroup: string,
  role: 'guide' | 'villain' | 'neutral'
): CharacterDef {

  // 1. Try to find an exact match for environment + role
  const exactMatch = CHARACTERS.find(c =>
    c.environments?.includes(environment) &&
    c.roles?.includes(role)
  );
  if (exactMatch) return exactMatch;

  // 2. Try environment match only
  const envMatch = CHARACTERS.find(c =>
    c.environments?.includes(environment)
  );
  if (envMatch) return envMatch;

  // 3. Try age group match
  const ageMatch = CHARACTERS.find(c =>
    c.ageGroups?.includes(ageGroup)
  );
  if (ageMatch) return ageMatch;

  // 4. Fall back to first character (X-Bot)
  return CHARACTERS[0]!;
}

// ── Resolve animation name for a standard event ───────────────
export function resolveAnim(
  char: CharacterDef,
  animKey: keyof AnimationMap
): string {
  // Use the mapped name, fall back to idle if not defined
  return char.animations[animKey] ?? char.animations.idle;
}