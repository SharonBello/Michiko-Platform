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
function randFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

// Maps EnvironmentType values → category strings used in CharacterDef.environments
const ENV_CATEGORY: Record<string, string> = {
  roman_colosseum: 'ancient', ancient_egypt: 'ancient', greek_temple: 'ancient',
  aztec_temple: 'ancient', ancient_china: 'ancient', moorish_palace: 'ancient',
  mesopotamia: 'ancient', persian_palace: 'ancient', samurai_japan: 'ancient',
  viking_village: 'medieval', medieval_castle: 'medieval', medieval_market: 'medieval',
  crusader_fortress: 'medieval', plague_village: 'medieval', monastery: 'medieval',
  jousting_arena: 'medieval',
  pirate_ship: 'exploration', desert_ruins: 'exploration', jungle_temple: 'exploration',
  cave: 'exploration', arctic: 'exploration', underwater: 'exploration',
  volcano: 'exploration', island_paradise: 'exploration', coral_reef: 'exploration',
  rainforest_canopy: 'exploration', desert_oasis: 'exploration',
  victorian_london: 'industry', industrial_factory: 'industry', wild_west: 'industry',
  steam_workshop: 'industry', silk_road: 'industry',
  war_trenches: 'war', underground_bunker: 'war', ancient_battlefield: 'war',
  naval_warship: 'war', cold_war_base: 'war', resistance_hideout: 'war',
  civil_rights_street: 'civil', suffragette_march: 'civil', revolutionary_paris: 'civil',
  colonial_america: 'civil', immigrant_ship: 'civil', freedom_trail: 'civil',
  laboratory: 'science', space_station: 'science', observatory: 'science',
  deep_sea_lab: 'science', dinosaur_era: 'science', prehistoric_savanna: 'science',
  fossil_dig: 'science', particle_accelerator: 'science',
  renaissance_workshop: 'art', impressionist_garden: 'art', baroque_palace: 'art',
  abstract_art_studio: 'art', surrealist_dreamscape: 'art', graffiti_district: 'art',
  pottery_workshop: 'art',
  library: 'literature', theater_stage: 'literature', poetry_cafe: 'literature',
  music_hall: 'literature', opera_house: 'literature', printing_press: 'literature',
  storytellers_fire: 'literature',
  contemporary_city: 'contemporary', futuristic_city: 'contemporary', space_colony: 'contemporary',
  cyberpunk_alley: 'contemporary', eco_village: 'contemporary', news_room: 'contemporary',
  enchanted_forest: 'fantasy', dragon_lair: 'fantasy', olympus: 'fantasy',
  underworld: 'fantasy', fairy_ring: 'fantasy', crystal_cave: 'fantasy',
  marketplace: 'contemporary', sports_arena: 'contemporary', default: '',
};

// Maps subject keywords → preferred character IDs (ordered by fit)
const SUBJECT_CHARS: Record<string, string[]> = {
  // Science
  science: ['doctor', 'scientist_mouse', 'young_student', 'teen_boy'],
  biology: ['doctor', 'scientist_mouse'],
  chemistry: ['doctor', 'scientist_mouse'],
  physics: ['scientist_mouse', 'doctor'],
  math: ['scientist_mouse', 'doctor', 'young_student'],
  geography: ['explorer', 'ancient_elder'],
  health: ['doctor', 'sporty_granny'],
  // History — general
  history: ['ancient_elder', 'explorer', 'peasant_man', 'peasant_girl'],
  ancient: ['ancient_elder', 'peasant_man', 'peasant_girl', 'explorer'],
  medieval: ['castle_guard', 'medieval_knight', 'peasant_man', 'ancient_elder'],
  // War — soldier always first
  war: ['soldier', 'swat', 'explorer', 'medieval_knight'],
  wwi: ['soldier', 'explorer'],
  wwii: ['soldier', 'swat', 'explorer'],
  'world war': ['soldier', 'swat', 'explorer'],
  military: ['soldier', 'swat', 'medieval_knight'],
  conflict: ['soldier', 'medieval_knight', 'explorer'],
  resistance: ['soldier', 'swat', 'explorer'],
  nazi: ['soldier', 'swat'],
  holocaust: ['soldier', 'young_student'],
  // Civil / social
  social: ['suit_man', 'young_student', 'sporty_granny'],
  economics: ['suit_man', 'the_boss'],
  contemporary: ['suit_man', 'young_student', 'teen_boy', 'pop_girl'],
  // Arts
  literature: ['ancient_elder', 'pop_girl', 'young_student'],
  art: ['pop_girl', 'young_student', 'suit_man'],
  music: ['pop_girl', 'teen_boy', 'timmy_boy'],
  language: ['young_student', 'ancient_elder', 'pop_girl'],
  // Other
  fantasy: ['ancient_elder', 'medieval_knight', 'timmy_boy', 'silly_cartoon'],
  sports: ['sporty_granny', 'teen_boy', 'timmy_boy'],
};

// Maps theme keywords → bonus character IDs
const THEME_CHARS: Record<string, string[]> = {
  mystery: ['antagonist', 'ancient_elder', 'villain'],
  adventure: ['explorer', 'medieval_knight', 'teen_boy'],
  horror: ['antagonist', 'villain', 'the_boss'],
  comedy: ['sporty_granny', 'timmy_boy', 'silly_cartoon'],
  romance: ['pop_girl', 'young_student', 'peasant_girl'],
  war: ['soldier', 'medieval_knight', 'swat'],
  magic: ['ancient_elder', 'scientist_mouse', 'timmy_boy'],
  survival: ['explorer', 'soldier', 'swat'],
  discovery: ['explorer', 'scientist_mouse', 'young_student'],
  rebellion: ['antagonist', 'explorer', 'teen_boy'],
  leadership: ['suit_man', 'the_boss', 'medieval_knight'],
  friendship: ['young_student', 'teen_boy', 'pop_girl', 'girl'],
};

// NPC role (guide/villain/neutral) → preferred CharacterRoles
const ROLE_MAP: Record<string, CharacterRole[]> = {
  guide: ['guide', 'hero', 'neutral'],
  villain: ['villain'],
  neutral: ['neutral', 'hero', 'comic', 'guide'],
};

export interface PickContext {
  environment: string;
  subject?: string;
  theme?: string;
  npcRole?: 'guide' | 'villain' | 'neutral';
  exclude?: string[];
}

/**
 * Score-based character picker.
 * Uses environment category, subject, theme, and NPC role to find the best fit.
 * Among equal-score candidates, picks randomly for variety.
 */
export function pickCharacter(
  environment: string,
  npcRole: 'guide' | 'villain' | 'neutral' = 'neutral',
  exclude: string[] = [],
  subject?: string,
  theme?: string,
): CharacterDef {
  const category = ENV_CATEGORY[environment] ?? '';
  const preferredRoles = ROLE_MAP[npcRole] ?? ['neutral'];

  // Build subject + theme preference lists (lowercased keywords)
  const subjectKey = Object.keys(SUBJECT_CHARS).find(k =>
    subject?.toLowerCase().includes(k)
  );
  const themeKey = Object.keys(THEME_CHARS).find(k =>
    theme?.toLowerCase().includes(k)
  );
  const subjectPref = subjectKey ? SUBJECT_CHARS[subjectKey]! : [];
  const themePref = themeKey ? THEME_CHARS[themeKey]! : [];

  const available = CHARACTERS.filter(c => !(exclude ?? []).includes(c.id));

  // Score each character
  const scored = available.map(c => {
    let score = 0;

    // Role match (highest weight)
    const roleRank = preferredRoles.indexOf(c.role);
    if (roleRank === 0) score += 40;
    else if (roleRank === 1) score += 20;
    else if (roleRank === 2) score += 10;
    else score -= 10; // wrong role

    // Environment category match
    if (c.environments.length === 0) {
      score += 5; // universal — small bonus
    } else if (c.environments.includes(category)) {
      score += 30;
    }

    // Subject preference
    const subjectRank = subjectPref.indexOf(c.id);
    if (subjectRank === 0) score += 25;
    else if (subjectRank === 1) score += 18;
    else if (subjectRank <= 3) score += 10;

    // Theme preference
    const themeRank = themePref.indexOf(c.id);
    if (themeRank === 0) score += 15;
    else if (themeRank <= 2) score += 8;

    // Small random tiebreaker so same-score candidates vary
    score += Math.random() * 5;

    return { c, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Pick randomly from the top tier (within 8 points of best)
  const best = scored[0]?.score ?? 0;
  const topTier = scored.filter(s => s.score >= best - 8);
  const picked = randFrom(topTier);

  return picked?.c ?? CHARACTERS.find(c => c.id === 'xbot')!;
}