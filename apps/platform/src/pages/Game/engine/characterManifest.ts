export type CharacterRole = 'hero' | 'villain' | 'guide' | 'neutral' | 'comic';

export interface CharacterDef {
  id: string;
  file: string;
  source: 'mixamo';
  /** Euler XYZ rotation to stand upright after clone (compensates for missing __root__ quaternion) */
  rotationFix: [number, number, number];
  scale: number;
  role: CharacterRole;
  /** Environments this character fits well in (empty = fits anywhere) */
  environments: string[];
  animations: {
    idle: string;
    talking: string;
    thinking: string;
    wave: string;
    correct: string;
    wrong: string;
    victory: string;
    defeated: string;
    pointing: string;
    shrug: string;
    bow: string;
    cheer: string;
    clap: string;
    angry: string;
    agree: string;
    disagree: string;
    sneak: string;
    dance: string;
  };
}

/** All animations map to the same Mixamo skeleton — shared across all characters */
const STANDARD_ANIMATIONS: CharacterDef['animations'] = {
  idle: 'anim_idle',
  talking: 'anim_talking',
  thinking: 'anim_thinking',
  wave: 'anim_standing_greeting',
  correct: 'anim_victory',
  wrong: 'anim_disappointed',
  victory: 'anim_cheering',
  defeated: 'anim_defeated',
  pointing: 'anim_pointing_forward',
  shrug: 'anim_shrug',
  bow: 'anim_quick_informal_bow',
  cheer: 'anim_cheering',
  clap: 'anim_clapping',
  angry: 'anim_angry',
  agree: 'anim_agreeing',
  disagree: 'anim_disagreeing',
  sneak: 'anim_sneaking',
  dance: 'anim_dance',
};

export const CHARACTERS: CharacterDef[] = [
  {
    id: 'xbot',
    file: 'X_Bot.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'neutral',
    environments: [],  // fits anywhere — default fallback
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'ybot',
    file: 'Y_Bot.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'neutral',
    environments: [],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'ancient_elder',
    file: 'Ancient_Elder.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'guide',
    environments: ['ancient', 'medieval', 'fantasy', 'literature'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'antagonist',
    file: 'Antagonist.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'villain',
    environments: [],  // villain fits any environment
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'villain',
    file: 'Villain.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'villain',
    environments: [],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'castle_guard',
    file: 'Castle_Guard.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'neutral',
    environments: ['medieval', 'fantasy', 'ancient'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'medieval_knight',
    file: 'Medieval_Knight.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'hero',
    environments: ['medieval', 'fantasy', 'war'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'doctor',
    file: 'Doctor.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'guide',
    environments: ['science', 'contemporary', 'industry'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'scientist_mouse',
    file: 'Scientist_Mouse.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'guide',
    environments: ['science', 'contemporary', 'fantasy'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'explorer',
    file: 'Explorer.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'hero',
    environments: ['exploration', 'ancient', 'civil', 'war'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'soldier',
    file: 'Soldier.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'neutral',
    environments: ['war', 'civil', 'industry', 'contemporary'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'swat',
    file: 'Swat.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'neutral',
    environments: ['contemporary', 'civil', 'war'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'suit_man',
    file: 'Suit_Man.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'neutral',
    environments: ['contemporary', 'civil', 'industry', 'art'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'the_boss',
    file: 'The_Boss.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'villain',
    environments: ['contemporary', 'industry', 'civil'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'man',
    file: 'Man.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'neutral',
    environments: [],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'peasant_man',
    file: 'Peasant_Man.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'neutral',
    environments: ['medieval', 'ancient', 'exploration'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'girl',
    file: 'Girl.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'neutral',
    environments: [],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'peasant_girl',
    file: 'Peasant_Girl.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'neutral',
    environments: ['medieval', 'ancient', 'exploration'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'pop_girl',
    file: 'Pop_Girl.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'hero',
    environments: ['contemporary', 'art', 'literature'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'young_student',
    file: 'Young_student.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'hero',
    environments: ['contemporary', 'science', 'art', 'literature'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'teen_boy',
    file: 'Teen_Boy.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'hero',
    environments: ['contemporary', 'science', 'art', 'literature'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'timmy_boy',
    file: 'Timmy_Boy.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'comic',
    environments: ['fantasy', 'contemporary', 'art'],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'sporty_granny',
    file: 'Sporty_Granny.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'comic',
    environments: [],
    animations: STANDARD_ANIMATIONS,
  },
  {
    id: 'silly_cartoon',
    file: 'Silly_Cartoon.glb',
    source: 'mixamo',
    rotationFix: [Math.PI / 2, 0, 0],
    scale: 0.011,
    role: 'comic',
    environments: ['fantasy', 'contemporary'],
    animations: STANDARD_ANIMATIONS,
  },
];

/** Look up a character definition by id */
export function getCharacter(id: string): CharacterDef | undefined {
  return CHARACTERS.find(c => c.id === id);
}

/**
 * Pick the best character for a given environment and role.
 * Falls back to xbot if nothing matches.
 */
export function pickCharacter(
  environment: string,
  role: CharacterRole,
  exclude: string[] = []
): CharacterDef {
  // Exact match: right role + fits this environment
  const exact = CHARACTERS.find(c =>
    c.role === role &&
    (c.environments.length === 0 || c.environments.includes(environment)) &&
    !exclude.includes(c.id)
  );
  if (exact) return exact;

  // Relax: any role that fits the environment
  const envMatch = CHARACTERS.find(c =>
    (c.environments.length === 0 || c.environments.includes(environment)) &&
    !exclude.includes(c.id)
  );
  if (envMatch) return envMatch;

  // Final fallback
  return CHARACTERS.find(c => c.id === 'xbot')!;
}