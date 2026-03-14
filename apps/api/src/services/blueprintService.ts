import Anthropic from '@anthropic-ai/sdk';
import type { Blueprint, SceneLayout, EnvironmentConfig, NPCArchetype } from '@michiko/types';
import { db } from '../lib/firestore';

const client = new Anthropic();

interface BlueprintInput {
  title: string;
  subject: string;
  topic: string;
  ageGroup: string;
  mechanic: string;
  theme: string;
  questionCount: number;
  questionTypes: string[];
  gameId: string;
  ownerId: string;
}

// ── Fetch all environment configs from Firestore ──────────────────
async function loadEnvironments(): Promise<EnvironmentConfig[]> {
  const snap = await db.collection('environments').get();
  return snap.docs.map(d => d.data() as EnvironmentConfig);
}

// ── Theme → environment tag hints ────────────────────────────────
const THEME_ENV_TAGS: Record<string, string[]> = {
  mystery: ['cave', 'underground', 'library', 'monastery', 'surrealist'],
  adventure: ['jungle', 'pirate', 'desert', 'arctic', 'volcano', 'exploration'],
  horror: ['plague', 'underground_bunker', 'dragon_lair', 'underworld', 'cave'],
  comedy: ['marketplace', 'fairy_ring', 'sports_arena', 'graffiti'],
  romance: ['impressionist', 'baroque', 'poetry_cafe', 'island_paradise'],
  war: ['war_trenches', 'naval_warship', 'ancient_battlefield', 'resistance'],
  magic: ['enchanted_forest', 'crystal_cave', 'olympus', 'fairy_ring', 'wizard'],
  survival: ['arctic', 'volcano', 'cave', 'jungle', 'desert'],
  discovery: ['observatory', 'fossil_dig', 'deep_sea', 'space_station', 'jungle'],
  rebellion: ['resistance_hideout', 'civil_rights', 'revolutionary_paris', 'suffragette'],
  leadership: ['roman_colosseum', 'medieval_castle', 'baroque_palace', 'contemporary_city'],
  friendship: ['contemporary_city', 'school', 'marketplace', 'eco_village'],
};

const SUBJECT_ENV_HINTS: Record<string, string[]> = {

  // ── Ancient History ──────────────────────────────────────────
  'rome': ['roman_colosseum', 'ancient_battlefield'],
  'roman': ['roman_colosseum', 'ancient_battlefield'],
  'ancient rome': ['roman_colosseum'],
  'gladiator': ['roman_colosseum', 'sports_arena'],
  'julius caesar': ['roman_colosseum', 'ancient_battlefield'],
  'colosseum': ['roman_colosseum'],
  'senate': ['roman_colosseum', 'colonial_america'],
  'latin': ['roman_colosseum', 'monastery'],
  'republic': ['roman_colosseum', 'colonial_america'],

  'egypt': ['ancient_egypt', 'desert_ruins', 'desert_oasis'],
  'pharaoh': ['ancient_egypt'],
  'pyramid': ['ancient_egypt', 'aztec_temple'],
  'hieroglyphs': ['ancient_egypt'],
  'nile': ['ancient_egypt'],
  'cleopatra': ['ancient_egypt'],
  'tutankhamun': ['ancient_egypt'],
  'mummy': ['ancient_egypt', 'desert_ruins'],
  'sphinx': ['ancient_egypt'],
  'cairo': ['ancient_egypt'],

  'greece': ['greek_temple', 'olympus'],
  'ancient greece': ['greek_temple', 'olympus'],
  'philosophy': ['greek_temple', 'moorish_palace', 'library'],
  'socrates': ['greek_temple'],
  'plato': ['greek_temple', 'library'],
  'aristotle': ['greek_temple', 'library'],
  'athens': ['greek_temple', 'olympus'],
  'sparta': ['greek_temple', 'ancient_battlefield'],
  'democracy': ['greek_temple', 'colonial_america', 'contemporary_city'],
  'mythology': ['greek_temple', 'olympus', 'enchanted_forest', 'underworld'],

  'aztec': ['aztec_temple', 'jungle_temple'],
  'mexico': ['aztec_temple'],
  'mesoamerica': ['aztec_temple', 'jungle_temple'],
  'maya': ['aztec_temple', 'jungle_temple'],
  'inca': ['aztec_temple'],
  'montezuma': ['aztec_temple'],
  'tenochtitlan': ['aztec_temple'],
  'conquistador': ['aztec_temple', 'pirate_ship'],
  'chocolate': ['aztec_temple', 'jungle_temple'],

  'china': ['ancient_china', 'silk_road'],
  'chinese history': ['ancient_china'],
  'dynasty': ['ancient_china', 'samurai_japan'],
  'confucius': ['ancient_china'],
  'great wall': ['ancient_china'],
  'terra cotta': ['ancient_egypt', 'ancient_china'],
  'silk road': ['silk_road', 'ancient_china', 'desert_oasis'],
  'marco polo': ['silk_road'],

  'islam': ['moorish_palace', 'crusader_fortress', 'desert_oasis'],
  'islamic golden age': ['moorish_palace'],
  'alhambra': ['moorish_palace'],
  'algebra': ['moorish_palace', 'laboratory'],
  'baghdad': ['moorish_palace', 'mesopotamia'],
  'caliphate': ['moorish_palace'],
  'ibn battuta': ['silk_road', 'desert_oasis'],

  'mesopotamia': ['mesopotamia'],
  'sumer': ['mesopotamia'],
  'babylon': ['mesopotamia'],
  'hammurabi': ['mesopotamia'],
  'gilgamesh': ['mesopotamia'],
  'cuneiform': ['mesopotamia', 'printing_press'],
  'ziggurat': ['mesopotamia'],

  'persia': ['persian_palace', 'ancient_battlefield'],
  'persian empire': ['persian_palace'],
  'darius': ['persian_palace', 'ancient_battlefield'],
  'xerxes': ['persian_palace', 'ancient_battlefield'],
  'cyrus': ['persian_palace'],
  'zoroastrianism': ['persian_palace'],
  'persepolis': ['persian_palace'],

  'vikings': ['viking_village', 'naval_warship'],
  'norse': ['viking_village', 'enchanted_forest'],
  'scandinavia': ['viking_village'],
  'odin': ['viking_village'],
  'thor': ['viking_village'],
  'valhalla': ['viking_village'],
  'longship': ['viking_village', 'pirate_ship'],
  'runes': ['viking_village', 'enchanted_forest'],
  'leif erikson': ['viking_village', 'pirate_ship'],

  'japan': ['samurai_japan'],
  'samurai': ['samurai_japan'],
  'shogun': ['samurai_japan'],
  'bushido': ['samurai_japan'],
  'katana': ['samurai_japan'],
  'edo': ['samurai_japan'],
  'haiku': ['samurai_japan', 'poetry_cafe'],
  'tokugawa': ['samurai_japan'],

  // ── Medieval ─────────────────────────────────────────────────
  'medieval': ['medieval_castle', 'medieval_market', 'monastery'],
  'middle ages': ['medieval_castle', 'medieval_market'],
  'knights': ['medieval_castle', 'jousting_arena', 'crusader_fortress'],
  'crusades': ['crusader_fortress', 'medieval_castle'],
  'feudalism': ['medieval_castle', 'medieval_market'],
  'castle': ['medieval_castle'],
  'black death': ['plague_village'],
  'bubonic plague': ['plague_village'],
  'plague': ['plague_village'],
  'magna carta': ['medieval_castle'],
  'chivalry': ['jousting_arena', 'medieval_castle'],
  'heraldry': ['jousting_arena', 'medieval_castle'],
  'tournament': ['jousting_arena'],
  'jousting': ['jousting_arena'],
  'guilds': ['medieval_market'],
  'pilgrimage': ['medieval_market', 'monastery', 'crusader_fortress'],
  'monastery': ['monastery', 'library'],
  'monks': ['monastery'],
  'illuminated manuscripts': ['monastery', 'library'],
  'scholasticism': ['monastery', 'greek_temple'],
  'thomas aquinas': ['monastery', 'greek_temple'],
  'christianity': ['monastery', 'crusader_fortress'],
  'jerusalem': ['crusader_fortress'],
  'templars': ['crusader_fortress'],
  'saladin': ['crusader_fortress', 'moorish_palace'],

  // ── Exploration & Nature ─────────────────────────────────────
  'pirates': ['pirate_ship', 'naval_warship'],
  'exploration': ['pirate_ship', 'desert_ruins', 'jungle_temple'],
  'age of sail': ['pirate_ship', 'naval_warship'],
  'navigation': ['pirate_ship', 'island_paradise'],
  'columbus': ['pirate_ship'],
  'magellan': ['pirate_ship'],
  'caribbean': ['pirate_ship', 'island_paradise'],

  'jungle': ['jungle_temple', 'rainforest_canopy'],
  'rainforest': ['rainforest_canopy', 'jungle_temple'],
  'biodiversity': ['jungle_temple', 'rainforest_canopy', 'coral_reef'],
  'ecosystems': ['jungle_temple', 'coral_reef', 'eco_village'],
  'tropical': ['jungle_temple', 'island_paradise', 'rainforest_canopy'],
  'deforestation': ['rainforest_canopy', 'jungle_temple', 'eco_village'],
  'amazon': ['rainforest_canopy', 'jungle_temple'],
  'photosynthesis': ['rainforest_canopy', 'laboratory'],
  'food chain': ['rainforest_canopy', 'jungle_temple'],

  'archaeology': ['desert_ruins', 'fossil_dig', 'ancient_egypt'],
  'ruins': ['desert_ruins', 'ancient_egypt'],
  'excavation': ['desert_ruins', 'fossil_dig'],
  'artifacts': ['desert_ruins', 'ancient_egypt'],
  'lost city': ['desert_ruins', 'aztec_temple'],

  'geology': ['volcano', 'cave', 'fossil_dig', 'crystal_cave'],
  'stalactites': ['cave', 'crystal_cave'],
  'cave paintings': ['cave'],
  'minerals': ['cave', 'crystal_cave'],
  'crystals': ['crystal_cave'],
  'spelunking': ['cave'],

  'arctic': ['arctic'],
  'antarctica': ['arctic'],
  'climate change': ['arctic', 'eco_village', 'contemporary_city'],
  'polar bears': ['arctic'],
  'ice caps': ['arctic'],
  'global warming': ['arctic', 'eco_village'],
  'aurora': ['arctic'],
  'glaciers': ['arctic'],
  'inuit': ['arctic'],
  'tundra': ['arctic'],

  'ocean': ['underwater', 'coral_reef', 'deep_sea_lab'],
  'marine biology': ['underwater', 'coral_reef', 'deep_sea_lab'],
  'coral reef': ['coral_reef', 'underwater'],
  'whales': ['underwater', 'coral_reef'],
  'sharks': ['underwater', 'coral_reef'],
  'oceanography': ['deep_sea_lab', 'underwater'],
  'great barrier reef': ['coral_reef'],
  'bioluminescence': ['underwater', 'deep_sea_lab'],

  'volcano': ['volcano'],
  'tectonic plates': ['volcano', 'cave'],
  'lava': ['volcano'],
  'magma': ['volcano'],
  'pompeii': ['volcano', 'roman_colosseum'],
  'earth science': ['volcano', 'cave', 'fossil_dig'],
  'igneous rock': ['volcano'],

  'islands': ['island_paradise'],
  'pacific': ['island_paradise', 'coral_reef'],
  'polynesia': ['island_paradise'],

  'desert': ['desert_ruins', 'desert_oasis', 'prehistoric_savanna'],
  'oasis': ['desert_oasis'],
  'sahara': ['desert_oasis', 'desert_ruins'],
  'bedouin': ['desert_oasis'],
  'caravan': ['silk_road', 'desert_oasis'],
  'nomads': ['desert_oasis', 'silk_road'],

  // ── Revolution & Industry ────────────────────────────────────
  'victorian': ['victorian_london'],
  '19th century': ['victorian_london', 'industrial_factory', 'suffragette_march'],
  'industrial revolution': ['industrial_factory', 'victorian_london', 'steam_workshop'],
  'london': ['victorian_london'],
  'charles dickens': ['victorian_london', 'library'],
  'darwin': ['victorian_london', 'dinosaur_era', 'prehistoric_savanna'],
  'class system': ['victorian_london', 'industrial_factory'],
  'steam engine': ['steam_workshop', 'industrial_factory'],
  'coal': ['industrial_factory'],
  'child labour': ['industrial_factory'],
  'trade unions': ['industrial_factory'],
  'marx': ['industrial_factory', 'revolutionary_paris'],
  'capitalism': ['industrial_factory', 'marketplace'],
  'factories': ['industrial_factory'],
  'invention': ['steam_workshop', 'laboratory'],
  'watt': ['steam_workshop'],
  'tesla': ['steam_workshop', 'laboratory'],
  'edison': ['steam_workshop'],

  'wild west': ['wild_west'],
  'american frontier': ['wild_west', 'colonial_america'],
  'cowboys': ['wild_west'],
  'native americans': ['wild_west', 'storytellers_fire'],
  'manifest destiny': ['wild_west', 'colonial_america'],
  'gold rush': ['wild_west'],
  'railroads': ['wild_west', 'industrial_factory'],

  // ── War & Conflict ───────────────────────────────────────────
  'world war 1': ['war_trenches'],
  'wwi': ['war_trenches'],
  'trenches': ['war_trenches'],
  'western front': ['war_trenches'],
  'armistice': ['war_trenches'],
  'shell shock': ['war_trenches'],
  'propaganda': ['war_trenches', 'news_room', 'resistance_hideout'],

  'ww2': ['resistance_hideout', 'underground_bunker'],
  'wwii': ['resistance_hideout', 'underground_bunker'],
  'world war ii': ['resistance_hideout', 'underground_bunker', 'war_trenches'],
  'second world war': ['resistance_hideout', 'underground_bunker'],
  'world war 2': ['resistance_hideout', 'underground_bunker'],
  'holocaust': ['resistance_hideout'],
  'resistance': ['resistance_hideout'],
  'anne frank': ['resistance_hideout'],
  'd-day': ['resistance_hideout', 'war_trenches'],
  'nazi': ['resistance_hideout'],

  'cold war': ['underground_bunker', 'cold_war_base'],
  'nuclear': ['underground_bunker', 'cold_war_base'],
  'spy': ['underground_bunker'],
  'cia': ['underground_bunker'],
  'kgb': ['underground_bunker'],
  'cuban missile crisis': ['underground_bunker', 'cold_war_base'],
  'berlin wall': ['underground_bunker', 'cold_war_base'],
  'arms race': ['underground_bunker', 'cold_war_base'],
  'soviet union': ['underground_bunker', 'cold_war_base'],

  'battle': ['ancient_battlefield', 'war_trenches'],
  'warfare': ['ancient_battlefield', 'war_trenches', 'medieval_castle'],
  'alexander the great': ['ancient_battlefield', 'greek_temple'],
  'napoleon': ['ancient_battlefield', 'revolutionary_paris'],
  'thermopylae': ['ancient_battlefield', 'greek_temple'],
  'military history': ['ancient_battlefield', 'war_trenches'],

  'naval warfare': ['naval_warship', 'pirate_ship'],
  'trafalgar': ['naval_warship'],
  'nelson': ['naval_warship'],
  'cannons': ['naval_warship', 'medieval_castle'],

  // ── Civil & Social ───────────────────────────────────────────
  'civil rights': ['civil_rights_street', 'freedom_trail'],
  'martin luther king': ['civil_rights_street'],
  'rosa parks': ['civil_rights_street'],
  'segregation': ['civil_rights_street', 'freedom_trail'],
  'march on washington': ['civil_rights_street'],
  'malcolm x': ['civil_rights_street'],

  'suffrage': ['suffragette_march'],
  'votes for women': ['suffragette_march'],
  'emmeline pankhurst': ['suffragette_march'],
  'feminism': ['suffragette_march', 'civil_rights_street'],
  'womens rights': ['suffragette_march', 'civil_rights_street'],
  '19th amendment': ['suffragette_march'],

  'french revolution': ['revolutionary_paris'],
  'bastille': ['revolutionary_paris'],
  'robespierre': ['revolutionary_paris'],
  'enlightenment': ['revolutionary_paris', 'moorish_palace', 'library'],
  'rousseau': ['revolutionary_paris', 'library'],
  'voltaire': ['revolutionary_paris', 'library'],

  'american revolution': ['colonial_america'],
  'colonial america': ['colonial_america'],
  'benjamin franklin': ['colonial_america', 'steam_workshop'],
  'george washington': ['colonial_america'],
  'declaration of independence': ['colonial_america'],
  'boston tea party': ['colonial_america'],

  'immigration': ['immigrant_ship'],
  'ellis island': ['immigrant_ship'],
  'american dream': ['immigrant_ship', 'civil_rights_street'],
  'diaspora': ['immigrant_ship', 'storytellers_fire'],
  'statue of liberty': ['immigrant_ship', 'freedom_trail'],

  'abolition': ['freedom_trail'],
  'underground railroad': ['freedom_trail'],
  'harriet tubman': ['freedom_trail'],
  'slavery': ['freedom_trail', 'civil_rights_street'],
  'emancipation': ['freedom_trail'],
  'frederick douglass': ['freedom_trail'],

  // ── Science ──────────────────────────────────────────────────
  'science': ['laboratory', 'space_station', 'observatory'],
  'chemistry': ['laboratory', 'particle_accelerator'],
  'biology': ['laboratory', 'rainforest_canopy', 'deep_sea_lab'],
  'experiments': ['laboratory'],
  'periodic table': ['laboratory'],
  'molecules': ['laboratory', 'particle_accelerator'],
  'atoms': ['laboratory', 'particle_accelerator'],
  'physics': ['particle_accelerator', 'laboratory', 'observatory'],
  'lab': ['laboratory'],

  'space': ['space_station', 'observatory', 'cold_war_base'],
  'astronomy': ['observatory', 'space_station'],
  'planets': ['space_station', 'observatory'],
  'solar system': ['space_station', 'observatory'],
  'gravity': ['space_station', 'laboratory'],
  'stars': ['observatory', 'space_station'],
  'nasa': ['space_station', 'cold_war_base'],
  'black holes': ['observatory', 'space_station'],
  'telescope': ['observatory'],
  'iss': ['space_station'],
  'constellations': ['observatory'],
  'galileo': ['observatory'],
  'copernicus': ['observatory'],
  'hubble': ['observatory', 'space_station'],
  'nebula': ['observatory', 'space_station'],

  'space race': ['cold_war_base', 'space_station'],
  'sputnik': ['cold_war_base', 'space_station'],
  'apollo': ['space_station', 'cold_war_base', 'greek_temple', 'olympus'],
  'gagarin': ['cold_war_base', 'space_station'],
  'armstrong': ['cold_war_base', 'space_station'],
  'moon landing': ['cold_war_base', 'space_station'],

  'deep sea': ['deep_sea_lab', 'underwater'],
  'hydrothermal vents': ['deep_sea_lab', 'volcano'],
  'trench': ['deep_sea_lab', 'underwater'],
  'submarine': ['deep_sea_lab', 'underwater'],

  'dinosaurs': ['dinosaur_era', 'fossil_dig'],
  'jurassic': ['dinosaur_era'],
  'cretaceous': ['dinosaur_era'],
  'paleontology': ['fossil_dig', 'dinosaur_era'],
  'fossils': ['fossil_dig', 'dinosaur_era'],
  'extinction': ['dinosaur_era', 'fossil_dig'],
  'prehistoric': ['prehistoric_savanna', 'dinosaur_era', 'cave'],
  'evolution': ['prehistoric_savanna', 'dinosaur_era', 'laboratory'],
  'stratigraphy': ['fossil_dig'],
  'rock layers': ['fossil_dig', 'cave'],

  'early humans': ['prehistoric_savanna'],
  'homo sapiens': ['prehistoric_savanna'],
  'neanderthal': ['prehistoric_savanna', 'cave'],
  'stone age': ['prehistoric_savanna', 'cave'],
  'hunter gatherer': ['prehistoric_savanna'],
  'anthropology': ['prehistoric_savanna', 'storytellers_fire'],

  'particle physics': ['particle_accelerator'],
  'cern': ['particle_accelerator'],
  'higgs boson': ['particle_accelerator'],
  'quantum mechanics': ['particle_accelerator', 'laboratory'],
  'dark matter': ['particle_accelerator', 'observatory'],
  'string theory': ['particle_accelerator'],

  // ── Art & Culture ────────────────────────────────────────────
  'renaissance': ['renaissance_workshop', 'baroque_palace'],
  'da vinci': ['renaissance_workshop'],
  'michelangelo': ['renaissance_workshop'],
  'raphael': ['renaissance_workshop'],
  'florence': ['renaissance_workshop'],
  'painting': ['renaissance_workshop', 'impressionist_garden'],
  'sculpture': ['renaissance_workshop', 'greek_temple'],
  'humanism': ['renaissance_workshop', 'greek_temple'],
  'perspective': ['renaissance_workshop'],
  'art history': ['renaissance_workshop', 'impressionist_garden', 'baroque_palace'],
  'italy': ['renaissance_workshop', 'baroque_palace', 'roman_colosseum'],

  'impressionism': ['impressionist_garden'],
  'monet': ['impressionist_garden'],
  'renoir': ['impressionist_garden'],
  'van gogh': ['impressionist_garden'],
  'paris': ['impressionist_garden', 'revolutionary_paris'],
  'plein air': ['impressionist_garden'],
  'post impressionism': ['impressionist_garden'],

  'baroque': ['baroque_palace'],
  'rembrandt': ['baroque_palace'],
  'caravaggio': ['baroque_palace'],
  'versailles': ['baroque_palace'],
  'louis xiv': ['baroque_palace'],
  'dutch golden age': ['baroque_palace'],
  'chiaroscuro': ['baroque_palace'],

  'abstract art': ['abstract_art_studio'],
  'modern art': ['abstract_art_studio', 'graffiti_district'],
  'pollock': ['abstract_art_studio'],
  'cubism': ['abstract_art_studio'],
  'picasso': ['abstract_art_studio'],
  'bauhaus': ['abstract_art_studio'],

  'surrealism': ['surrealist_dreamscape'],
  'dali': ['surrealist_dreamscape'],
  'magritte': ['surrealist_dreamscape'],
  'freud': ['surrealist_dreamscape'],
  'frida kahlo': ['surrealist_dreamscape', 'impressionist_garden'],

  'street art': ['graffiti_district'],
  'graffiti': ['graffiti_district'],
  'banksy': ['graffiti_district'],
  'hip hop': ['graffiti_district', 'poetry_cafe'],
  'basquiat': ['graffiti_district', 'abstract_art_studio'],

  'pottery': ['pottery_workshop'],
  'ceramics': ['pottery_workshop'],
  'clay': ['pottery_workshop'],
  'craft': ['pottery_workshop', 'medieval_market'],

  // ── Literature & Performance ─────────────────────────────────
  'literature': ['library', 'theater_stage', 'poetry_cafe'],
  'reading': ['library'],
  'books': ['library', 'monastery'],
  'writing': ['library', 'printing_press'],
  'authors': ['library', 'theater_stage'],
  'novel': ['library'],
  'poetry': ['poetry_cafe', 'library'],
  'grammar': ['library'],
  'language': ['library', 'storytellers_fire'],
  'literacy': ['library', 'printing_press'],

  'shakespeare': ['theater_stage'],
  'drama': ['theater_stage', 'opera_house'],
  'theatre': ['theater_stage', 'opera_house'],
  'hamlet': ['theater_stage'],
  'romeo and juliet': ['theater_stage'],
  'macbeth': ['theater_stage'],
  'elizabethan': ['theater_stage'],

  'beat generation': ['poetry_cafe'],
  'kerouac': ['poetry_cafe'],
  'ginsberg': ['poetry_cafe'],
  'spoken word': ['poetry_cafe', 'storytellers_fire'],
  'creative writing': ['poetry_cafe', 'library'],

  'music': ['music_hall', 'opera_house', 'baroque_palace'],
  'classical music': ['music_hall', 'baroque_palace'],
  'beethoven': ['music_hall'],
  'mozart': ['music_hall'],
  'bach': ['baroque_palace', 'music_hall'],
  'jazz': ['poetry_cafe', 'music_hall'],
  'orchestra': ['music_hall', 'opera_house'],
  'music theory': ['music_hall'],
  'music history': ['music_hall', 'baroque_palace'],

  'opera': ['opera_house'],
  'verdi': ['opera_house'],
  'puccini': ['opera_house'],
  'tenor': ['opera_house'],
  'aria': ['opera_house'],

  'gutenberg': ['printing_press'],
  'printing press': ['printing_press'],
  'reformation': ['printing_press', 'monastery'],
  'martin luther': ['printing_press', 'monastery'],
  'media': ['printing_press', 'news_room'],
  'communication': ['printing_press', 'news_room'],

  'oral tradition': ['storytellers_fire'],
  'folklore': ['storytellers_fire', 'enchanted_forest'],
  'fairy tales': ['enchanted_forest', 'fairy_ring'],
  'fables': ['storytellers_fire', 'library'],
  'griots': ['storytellers_fire'],
  'aboriginal': ['storytellers_fire'],

  // ── Contemporary ─────────────────────────────────────────────
  'globalization': ['contemporary_city', 'marketplace', 'silk_road'],
  'urbanization': ['contemporary_city'],
  'social media': ['contemporary_city', 'news_room', 'cyberpunk_alley'],
  'politics': ['contemporary_city', 'news_room'],
  'economics': ['marketplace', 'contemporary_city', 'industrial_factory'],
  'current events': ['contemporary_city', 'news_room'],

  'technology': ['futuristic_city', 'laboratory', 'cyberpunk_alley'],
  'ai': ['futuristic_city', 'space_station', 'cyberpunk_alley'],
  'coding': ['futuristic_city', 'cyberpunk_alley'],
  'robotics': ['futuristic_city', 'laboratory'],
  'machine learning': ['futuristic_city'],
  'internet': ['futuristic_city', 'news_room'],
  'cybersecurity': ['cyberpunk_alley', 'underground_bunker'],
  'innovation': ['futuristic_city', 'steam_workshop', 'laboratory'],

  'space colonization': ['space_colony'],
  'mars': ['space_colony', 'space_station'],
  'terraforming': ['space_colony'],
  'spacex': ['space_colony', 'cold_war_base'],

  'cyberpunk': ['cyberpunk_alley'],
  'dystopia': ['cyberpunk_alley', 'underground_bunker'],
  'surveillance': ['cyberpunk_alley', 'news_room'],
  'privacy': ['cyberpunk_alley', 'news_room'],
  'hacking': ['cyberpunk_alley', 'futuristic_city'],
  'identity': ['cyberpunk_alley'],

  'sustainability': ['eco_village'],
  'environment': ['eco_village', 'arctic', 'jungle_temple'],
  'renewable energy': ['eco_village'],
  'permaculture': ['eco_village'],
  'carbon footprint': ['eco_village', 'arctic'],
  'green energy': ['eco_village'],
  'ecology': ['eco_village', 'jungle_temple', 'rainforest_canopy'],

  'journalism': ['news_room'],
  'press freedom': ['news_room', 'printing_press'],
  'fake news': ['news_room'],
  'first amendment': ['news_room', 'colonial_america'],

  // ── Fantasy & Mythology ──────────────────────────────────────
  'fantasy': ['enchanted_forest', 'dragon_lair', 'fairy_ring'],
  'wizard': ['enchanted_forest'],
  'magic': ['enchanted_forest', 'fairy_ring', 'crystal_cave'],
  'tolkien': ['enchanted_forest', 'dragon_lair'],
  'fairy': ['fairy_ring', 'enchanted_forest'],
  'enchantment': ['enchanted_forest', 'fairy_ring'],
  'legend': ['enchanted_forest', 'dragon_lair'],

  'dragons': ['dragon_lair'],
  'gold': ['dragon_lair', 'aztec_temple'],
  'dungeons and dragons': ['dragon_lair', 'medieval_castle'],

  'greek mythology': ['olympus', 'greek_temple', 'underworld'],
  'zeus': ['olympus'],
  'athena': ['olympus', 'greek_temple'],
  'hercules': ['olympus', 'greek_temple'],
  'titans': ['olympus'],
  'heroes': ['olympus', 'greek_temple', 'ancient_battlefield'],

  'afterlife': ['underworld', 'ancient_egypt'],
  'death': ['underworld', 'plague_village'],
  'hades': ['underworld'],
  'persephone': ['underworld'],
  'dante': ['underworld', 'library'],
  'inferno': ['underworld'],
  'norse hel': ['underworld', 'viking_village'],

  'celtic mythology': ['fairy_ring', 'enchanted_forest'],
  'fae': ['fairy_ring'],
  'irish mythology': ['fairy_ring'],
  'midsummer': ['fairy_ring', 'enchanted_forest'],

  'gemstones': ['crystal_cave'],
  'underground': ['crystal_cave', 'cave', 'underground_bunker'],

  // ── Other ────────────────────────────────────────────────────
  'trade': ['marketplace', 'silk_road', 'medieval_market'],
  'supply and demand': ['marketplace'],
  'business': ['marketplace', 'contemporary_city'],
  'entrepreneurship': ['marketplace', 'futuristic_city'],
  'money': ['marketplace', 'medieval_market'],
  'commerce': ['marketplace', 'silk_road'],

  'sports': ['sports_arena'],
  'olympics': ['sports_arena', 'greek_temple'],
  'athletics': ['sports_arena'],
  'physical education': ['sports_arena'],
  'teamwork': ['sports_arena'],
  'world cup': ['sports_arena'],
  'champion': ['sports_arena'],

  'social justice': ['civil_rights_street', 'freedom_trail', 'suffragette_march'],
  'inequality': ['civil_rights_street', 'industrial_factory'],
  'human rights': ['civil_rights_street', 'freedom_trail'],
  'colonialism': ['island_paradise', 'wild_west', 'aztec_temple'],
  'imperialism': ['roman_colosseum', 'victorian_london', 'aztec_temple'],
};

// ── Score environments by subject + topic + theme ─────────────────
function matchEnvironment(
  envs: EnvironmentConfig[],
  subject: string,
  topic: string,
  theme: string,
): EnvironmentConfig {
  const needle = `${subject} ${topic}`.toLowerCase();
  const themeKey = Object.keys(THEME_ENV_TAGS).find(k => theme.toLowerCase().includes(k));
  const themeTags = themeKey ? THEME_ENV_TAGS[themeKey]! : [];

  // Build preferred env IDs from subject hints
  const preferredIds: string[] = [];
  for (const [key, ids] of Object.entries(SUBJECT_ENV_HINTS)) {
    if (needle.includes(key)) {
      preferredIds.push(...ids);
    }
  }

  const scored = envs.map(env => {
    let score = 0;

    // Direct env ID preference (strongest signal)
    const prefRank = preferredIds.indexOf(env.id);
    if (prefRank === 0) score += 50;
    else if (prefRank <= 2) score += 35;
    else if (prefRank <= 5) score += 20;
    else if (prefRank > 0) score += 10;

    // Topic/subject keyword match from Firestore
    for (const kw of env.topicKeywords) {
      if (needle.includes(kw.toLowerCase())) score += 3;
    }

    // Tag match
    if (env.tags) {
      for (const tag of env.tags) {
        if (needle.includes(tag.toLowerCase())) score += 2;
      }
    }

    // Env name/description contains topic words
    const envText = `${env.name} ${env.description ?? ''}`.toLowerCase();
    const topicWords = topic.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    for (const word of topicWords) {
      if (envText.includes(word)) score += 4;
    }

    // Theme bonus
    for (const hint of themeTags) {
      if (env.id.includes(hint) || env.name.toLowerCase().includes(hint)) score += 2;
    }

    // Random tiebreaker for variety among equal candidates
    score += Math.random() * 3;

    return { env, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Pick from top tier for variety
  const best = scored[0]?.score ?? 0;
  const topTier = scored.filter(s => s.score >= best - 5 && s.score > 2);

  if (topTier.length > 0) {
    return topTier[Math.floor(Math.random() * topTier.length)]!.env;
  }

  return envs.find(e => e.id === 'default') ?? envs[0]!;
}

// ── Format NPC archetypes for the prompt ──────────────────────────
function formatArchetypes(npcs: NPCArchetype[]): string {
  return npcs.map(n =>
    `- Role: ${n.role} | Style: ${n.dialogueStyle} | Suggested names: ${n.names.slice(0, 3).join(', ')}`
  ).join('\n');
}

export async function generateBlueprint(input: BlueprintInput): Promise<Blueprint> {
  const envs = await loadEnvironments();
  const envConfig = matchEnvironment(envs, input.subject, input.topic, input.theme);
  const prompt = buildPrompt(input, envConfig);

  const message = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = message.content
    .filter(b => b.type === 'text')
    .map(b => (b as { type: 'text'; text: string }).text)
    .join('');

  return parseBlueprint(text, input, envConfig);
}

function buildPrompt(input: BlueprintInput, env: EnvironmentConfig): string {
  return `You are an educational game designer. Create a detailed game blueprint as a single JSON object.

Topic: "${input.topic}"
Subject: ${input.subject}
Age group: ${input.ageGroup} year olds
Game mechanic: ${input.mechanic}
Theme: ${input.theme}
Total questions: ${input.questionCount}
Question types to use: ${input.questionTypes.join(', ')}

ENVIRONMENT (already selected for you — do not change it):
- id: "${env.id}"
- name: "${env.name}"
- description: "${env.description}"

SCENE LAYOUT (use these exact values):
- environment: "${env.id}"
- skyColor: "${env.palette.skyColor}"
- fogColor: "${env.palette.fogColor}"
- fogDensity: ${env.palette.fogDensity}
- groundColor: "${env.palette.groundColor}"
- lightColor: "${env.palette.lightColor}"
- ambientColor: "${env.palette.ambientColor}"
- accentColor: "${env.palette.accentColor}"

NPC ARCHETYPES FOR THIS ENVIRONMENT — use these to create NPCs that fit the world:
${formatArchetypes(env.npcs)}

Return ONLY a valid JSON object with this exact structure:
{
  "title": "engaging game title",
  "estimatedDuration": 15,
  "sceneLayout": {
    "environment": "${env.id}",
    "skyColor": "${env.palette.skyColor}",
    "fogColor": "${env.palette.fogColor}",
    "fogDensity": ${env.palette.fogDensity},
    "groundColor": "${env.palette.groundColor}",
    "lightColor": "${env.palette.lightColor}",
    "ambientColor": "${env.palette.ambientColor}",
    "accentColor": "${env.palette.accentColor}"
  },
  "scenes": [
    {
      "id": "scene-1",
      "name": "scene name that fits ${env.name}",
      "description": "scene description",
      "npcs": [
        {
          "id": "npc-1",
          "name": "pick a name from the archetype suggestions above",
          "role": "guide",
          "dialogue": "dialogue matching the archetype style, hinting at the questions"
        }
      ],
      "questions": [
        {
          "id": "q-1",
          "type": "multiple-choice",
          "text": "question text",
          "options": ["A", "B", "C", "D"],
          "answer": "A",
          "explanation": "why this is correct",
          "points": 10
        }
      ]
    }
  ]
}

Rules:
- Create exactly 3 scenes
- Distribute ${input.questionCount} questions across the 3 scenes
- Each scene must have 1-2 NPCs
- Use names and dialogue styles from the archetypes provided
- Make questions age-appropriate for ${input.ageGroup} year olds
- Questions must be specifically about "${input.topic}"
- For "match" type: options MUST use pipe format ["Left|Right", "Term|Definition"]
- For "true-false" type: options must be ["True", "False"], answer must be "True" or "False"
- For "fill-blank" type: no options needed, answer is the exact word/phrase to fill in
- For "multiple-choice" type: provide exactly 4 options
- Return ONLY the JSON object, no other text`;
}

function parseBlueprint(text: string, input: BlueprintInput, env: EnvironmentConfig): Blueprint {
  const clean = text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  let parsed: any;
  try {
    parsed = JSON.parse(clean);
  } catch {
    const match = clean.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No valid JSON found in AI response');
    parsed = JSON.parse(match[0]);
  }

  const now = new Date().toISOString();

  // Always use Firestore palette — never trust AI to invent colors
  const sceneLayout: SceneLayout = {
    environment: env.id,
    skyColor: env.palette.skyColor,
    fogColor: env.palette.fogColor,
    fogDensity: env.palette.fogDensity,
    groundColor: env.palette.groundColor,
    lightColor: env.palette.lightColor,
    ambientColor: env.palette.ambientColor,
    accentColor: env.palette.accentColor,
  };

  return {
    gameId: input.gameId,
    ownerId: input.ownerId,
    title: parsed.title ?? input.title,
    subject: input.subject,
    ageGroup: input.ageGroup,
    mechanic: input.mechanic,
    theme: input.theme,
    sceneLayout,
    scenes: parsed.scenes ?? [],
    totalQuestions: parsed.scenes?.reduce(
      (n: number, s: any) => n + (s.questions?.length ?? 0), 0
    ) ?? 0,
    estimatedDuration: parsed.estimatedDuration ?? 15,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
}