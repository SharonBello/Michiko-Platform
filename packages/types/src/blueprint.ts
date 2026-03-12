export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'True-False'
  | 'fill-blank'
  | 'voice'
  | 'match';

export type EnvironmentType =
  // Ancient History
  | 'roman_colosseum' | 'ancient_egypt' | 'greek_temple'
  | 'aztec_temple' | 'ancient_china' | 'moorish_palace'
  | 'mesopotamia' | 'persian_palace' | 'viking_village'
  | 'samurai_japan'
  // Medieval
  | 'medieval_castle' | 'medieval_market' | 'crusader_fortress'
  | 'plague_village' | 'monastery' | 'jousting_arena'
  // Exploration & Nature
  | 'pirate_ship' | 'desert_ruins' | 'jungle_temple'
  | 'cave' | 'arctic' | 'underwater'
  | 'volcano' | 'island_paradise' | 'coral_reef'
  | 'rainforest_canopy' | 'desert_oasis'
  // Revolution & Industry
  | 'victorian_london' | 'industrial_factory' | 'wild_west'
  | 'steam_workshop' | 'silk_road'
  // War & Conflict
  | 'war_trenches' | 'underground_bunker' | 'ancient_battlefield'
  | 'naval_warship' | 'cold_war_base' | 'resistance_hideout'
  // Civil & Social
  | 'civil_rights_street' | 'suffragette_march' | 'revolutionary_paris'
  | 'colonial_america' | 'immigrant_ship' | 'freedom_trail'
  // Science
  | 'laboratory' | 'space_station' | 'observatory'
  | 'deep_sea_lab' | 'dinosaur_era' | 'prehistoric_savanna'
  | 'fossil_dig' | 'particle_accelerator'
  // Art & Culture
  | 'renaissance_workshop' | 'impressionist_garden' | 'baroque_palace'
  | 'abstract_art_studio' | 'surrealist_dreamscape' | 'graffiti_district'
  | 'pottery_workshop'
  // Literature & Performance
  | 'library' | 'theater_stage' | 'poetry_cafe'
  | 'music_hall' | 'opera_house' | 'printing_press'
  | 'storytellers_fire'
  // Contemporary
  | 'contemporary_city' | 'futuristic_city' | 'space_colony'
  | 'cyberpunk_alley' | 'eco_village' | 'news_room'
  // Fantasy & Mythology
  | 'enchanted_forest' | 'dragon_lair' | 'olympus'
  | 'underworld' | 'fairy_ring' | 'crystal_cave'
  // Other
  | 'marketplace' | 'sports_arena' | 'default';

export interface EnvironmentPalette {
  skyColor: string;
  fogColor: string;
  fogDensity: number;
  groundColor: string;
  lightColor: string;
  ambientColor: string;
  accentColor: string;
}

export interface NPCArchetype {
  archetype: string;
  role: 'guide' | 'villain' | 'neutral';
  names: string[];
  dialogueStyle: string;
}

export interface EnvironmentConfig {
  id: EnvironmentType;
  name: string;
  description: string;
  builderKey: string;
  topicKeywords: string[];
  tags: string[];
  palette: EnvironmentPalette;
  npcs: NPCArchetype[];
  musicUrl: string;
  musicVolume: number;
}

export interface SceneLayout {
  environment: EnvironmentType;
  skyColor: string;
  fogColor: string;
  fogDensity: number;
  groundColor: string;
  lightColor: string;
  ambientColor: string;
  accentColor: string;
}

export interface NPC {
  id: string;
  name: string;
  role: 'guide' | 'villain' | 'neutral';
  dialogue: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  answer: string;
  explanation?: string;
  points: number;
}

export interface GameScene {
  id: string;
  name: string;
  description: string;
  npcs: NPC[];
  questions: Question[];
}

export interface Blueprint {
  id?: string;
  gameId: string;
  ownerId: string;
  title: string;
  subject: string;
  ageGroup: string;
  mechanic: string;
  theme: string;
  sceneLayout: SceneLayout;
  scenes: GameScene[];
  totalQuestions: number;
  estimatedDuration: number;
  status: 'pending' | 'approved';
  createdAt: string;
  updatedAt: string;
}