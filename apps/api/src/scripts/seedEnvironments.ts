import * as admin from 'firebase-admin';
import * as path from 'path';
import type { EnvironmentConfig } from '@michiko/types';

admin.initializeApp({
    credential: admin.credential.cert(
        path.resolve(__dirname, '../../service-account.json')
    ),
});

const db = admin.firestore();

const environments: EnvironmentConfig[] = [

    // ═══════════════════════════════════════════════
    // ANCIENT HISTORY
    // ═══════════════════════════════════════════════
    {
        id: 'roman_colosseum',
        name: 'Roman Colosseum',
        description: 'The grand arena of ancient Rome, surrounded by columns, torches and cheering crowds.',
        builderKey: 'roman_colosseum',
        topicKeywords: ['rome', 'roman', 'ancient rome', 'gladiator', 'latin', 'julius caesar', 'colosseum', 'republic', 'empire', 'senate'],
        tags: ['history', 'ancient', 'architecture'],
        palette: {
            skyColor: '#1a0800', fogColor: '#2d1200', fogDensity: 0.014,
            groundColor: '#3d2200', lightColor: '#ffaa44', ambientColor: '#5a3000', accentColor: '#e6a020',
        },
        npcs: [
            { archetype: 'roman_senator', role: 'guide', names: ['Marcus', 'Julius', 'Titus', 'Cicero', 'Seneca'], dialogueStyle: 'wise and formal, speaks in proclamations' },
            { archetype: 'roman_soldier', role: 'neutral', names: ['Brutus', 'Maximus', 'Cassius', 'Flavius', 'Lucius'], dialogueStyle: 'direct and military, loyal to Rome' },
            { archetype: 'roman_villain', role: 'villain', names: ['Nero', 'Commodus', 'Caracalla'], dialogueStyle: 'arrogant and cruel, craves power' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/roman_colosseum.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'ancient_egypt',
        name: 'Ancient Egypt',
        description: 'Sandy desert beneath the great pyramids, with hieroglyph-covered walls and golden torchlight.',
        builderKey: 'ancient_egypt',
        topicKeywords: ['egypt', 'pharaoh', 'pyramid', 'hieroglyphs', 'nile', 'cleopatra', 'tutankhamun', 'mummy', 'sphinx', 'cairo'],
        tags: ['history', 'ancient', 'africa'],
        palette: {
            skyColor: '#1a0e00', fogColor: '#2d1a00', fogDensity: 0.012,
            groundColor: '#c4a040', lightColor: '#ffdd88', ambientColor: '#8b6020', accentColor: '#ffd700',
        },
        npcs: [
            { archetype: 'pharaoh', role: 'guide', names: ['Ramesses', 'Thutmose', 'Amenhotep', 'Akhenaten'], dialogueStyle: 'regal and divine, speaks as a god-king' },
            { archetype: 'egyptian_priest', role: 'neutral', names: ['Imhotep', 'Kha', 'Ani', 'Nebwenenef'], dialogueStyle: 'mysterious and spiritual, guardian of secrets' },
            { archetype: 'tomb_robber', role: 'villain', names: ['Set', 'Apep', 'Sobek'], dialogueStyle: 'cunning and greedy, desecrates the sacred' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/ancient_egypt.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'greek_temple',
        name: 'Greek Temple',
        description: 'White marble columns under a Mediterranean sky, with olive trees and the sound of the agora.',
        builderKey: 'greek_temple',
        topicKeywords: ['greece', 'ancient greece', 'philosophy', 'socrates', 'plato', 'aristotle', 'olympics', 'mythology', 'athens', 'sparta', 'democracy'],
        tags: ['history', 'ancient', 'philosophy'],
        palette: {
            skyColor: '#0a1a2a', fogColor: '#0d2240', fogDensity: 0.010,
            groundColor: '#d4c8a0', lightColor: '#ffffff', ambientColor: '#4a6080', accentColor: '#80c0ff',
        },
        npcs: [
            { archetype: 'greek_philosopher', role: 'guide', names: ['Socrates', 'Plato', 'Aristotle', 'Diogenes', 'Pythagoras'], dialogueStyle: 'questioning and thoughtful, answers with questions' },
            { archetype: 'greek_warrior', role: 'neutral', names: ['Leonidas', 'Achilles', 'Hector', 'Odysseus', 'Ajax'], dialogueStyle: 'brave and honorable, speaks of glory' },
            { archetype: 'greek_god', role: 'villain', names: ['Ares', 'Hades', 'Medusa', 'Cyclops'], dialogueStyle: 'powerful and capricious, tests mortals' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/greek_temple.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'aztec_temple',
        name: 'Aztec Temple',
        description: 'Towering stepped pyramid deep in the jungle, with jade carvings and ceremonial fire.',
        builderKey: 'aztec_temple',
        topicKeywords: ['aztec', 'mexico', 'mesoamerica', 'maya', 'inca', 'pyramid', 'conquistador', 'montezuma', 'tenochtitlan', 'chocolate'],
        tags: ['history', 'ancient', 'americas'],
        palette: {
            skyColor: '#0a1500', fogColor: '#0d2000', fogDensity: 0.016,
            groundColor: '#2a4010', lightColor: '#ffaa00', ambientColor: '#1a3000', accentColor: '#ff6600',
        },
        npcs: [
            { archetype: 'aztec_priest', role: 'guide', names: ['Quetzalcoatl', 'Tlaloc', 'Huitzilopochtli', 'Coatl'], dialogueStyle: 'ceremonial and reverent, speaks of the gods' },
            { archetype: 'aztec_warrior', role: 'neutral', names: ['Cuauhtémoc', 'Itzcoatl', 'Chimalli', 'Tezca'], dialogueStyle: 'fierce and proud, defender of the empire' },
            { archetype: 'conquistador', role: 'villain', names: ['Cortés', 'Alvarado', 'Narváez'], dialogueStyle: 'greedy and ruthless, seeks gold and conquest' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/aztec_temple.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'ancient_china',
        name: 'Ancient China',
        description: 'Imperial palace courtyard with pagodas, lanterns and the Great Wall in the distance.',
        builderKey: 'ancient_china',
        topicKeywords: ['china', 'chinese history', 'dynasty', 'confucius', 'silk road', 'great wall', 'terra cotta', 'ming', 'tang', 'han'],
        tags: ['history', 'ancient', 'asia'],
        palette: {
            skyColor: '#0a0a1a', fogColor: '#1a1020', fogDensity: 0.012,
            groundColor: '#1a1a0a', lightColor: '#ffcc88', ambientColor: '#2a2020', accentColor: '#ff4444',
        },
        npcs: [
            { archetype: 'chinese_emperor', role: 'guide', names: ['Qin Shi Huang', 'Kublai Khan', 'Yongle', 'Xuanzong'], dialogueStyle: 'imperial and wise, speaks with authority' },
            { archetype: 'confucian_scholar', role: 'neutral', names: ['Confucius', 'Laozi', 'Sun Tzu', 'Mencius'], dialogueStyle: 'philosophical and calm, quotes ancient wisdom' },
            { archetype: 'warlord', role: 'villain', names: ['Dong Zhuo', 'Cao Cao', 'Lu Bu'], dialogueStyle: 'ambitious and ruthless, seeks domination' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/ancient_china.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'moorish_palace',
        name: 'Moorish Palace',
        description: 'Ornate arches and geometric tilework in a palace of the Islamic golden age.',
        builderKey: 'moorish_palace',
        topicKeywords: ['islam', 'islamic golden age', 'alhambra', 'moorish', 'algebra', 'astronomy', 'baghdad', 'caliphate', 'ibn battuta'],
        tags: ['history', 'medieval', 'islam', 'architecture'],
        palette: {
            skyColor: '#0a0520', fogColor: '#150a30', fogDensity: 0.010,
            groundColor: '#1a1020', lightColor: '#ffdd88', ambientColor: '#2a1040', accentColor: '#aa44ff',
        },
        npcs: [
            { archetype: 'islamic_scholar', role: 'guide', names: ['Ibn Rushd', 'Al-Kindi', 'Ibn Sina', 'Al-Biruni', 'Omar Khayyam'], dialogueStyle: 'learned and generous, shares knowledge freely' },
            { archetype: 'palace_vizier', role: 'neutral', names: ['Hassan', 'Yusuf', 'Tariq', 'Saladin'], dialogueStyle: 'diplomatic and cultured, advisor to the caliph' },
            { archetype: 'palace_guard', role: 'villain', names: ['Yazid', 'Marwan', 'Hajjaj'], dialogueStyle: 'stern and suspicious, questions all visitors' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/moorish_palace.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'mesopotamia',
        name: 'Ancient Mesopotamia',
        description: 'The cradle of civilization — ziggurat towers rise above the banks of the Tigris.',
        builderKey: 'mesopotamia',
        topicKeywords: ['mesopotamia', 'sumer', 'babylon', 'hammurabi', 'gilgamesh', 'tigris', 'euphrates', 'cuneiform', 'ziggurat', 'akkad'],
        tags: ['history', 'ancient', 'middle east'],
        palette: {
            skyColor: '#1a1000', fogColor: '#2d2000', fogDensity: 0.014,
            groundColor: '#8b6020', lightColor: '#ffcc66', ambientColor: '#4a3010', accentColor: '#d4a020',
        },
        npcs: [
            { archetype: 'sumerian_king', role: 'guide', names: ['Gilgamesh', 'Hammurabi', 'Sargon', 'Nebuchadnezzar'], dialogueStyle: 'ancient and powerful, speaks of laws and gods' },
            { archetype: 'scribe', role: 'neutral', names: ['Enkidu', 'Utnapishtim', 'Ninsun', 'Shulgi'], dialogueStyle: 'meticulous and learned, keeper of records' },
            { archetype: 'invader', role: 'villain', names: ['Cyrus', 'Ashurbanipal', 'Tiglath'], dialogueStyle: 'conquering and ruthless, destroyer of cities' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/mesopotamia.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'persian_palace',
        name: 'Persian Palace',
        description: 'The opulent halls of Persepolis with carved reliefs and the Persian royal court.',
        builderKey: 'persian_palace',
        topicKeywords: ['persia', 'persian empire', 'darius', 'xerxes', 'cyrus', 'achaemenid', 'zoroastrianism', 'persepolis'],
        tags: ['history', 'ancient', 'middle east'],
        palette: {
            skyColor: '#0a0a20', fogColor: '#100a30', fogDensity: 0.010,
            groundColor: '#2a2040', lightColor: '#ffaa66', ambientColor: '#201040', accentColor: '#6644ff',
        },
        npcs: [
            { archetype: 'persian_king', role: 'guide', names: ['Darius', 'Xerxes', 'Cyrus', 'Artaxerxes'], dialogueStyle: 'magnificent and commanding, king of kings' },
            { archetype: 'persian_magi', role: 'neutral', names: ['Zarathustra', 'Magus', 'Ahura', 'Mithra'], dialogueStyle: 'mystical and wise, follower of the flame' },
            { archetype: 'greek_spy', role: 'villain', names: ['Themistocles', 'Pausanias', 'Aristagoras'], dialogueStyle: 'treacherous and cunning, plays both sides' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/persian_palace.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'viking_village',
        name: 'Viking Village',
        description: 'A Norse longhouse settlement on a foggy fjord, with longships and rune stones.',
        builderKey: 'viking_village',
        topicKeywords: ['vikings', 'norse', 'scandinavia', 'odin', 'thor', 'valhalla', 'longship', 'ragnar', 'leif erikson', 'runes'],
        tags: ['history', 'medieval', 'scandinavia'],
        palette: {
            skyColor: '#080a14', fogColor: '#101420', fogDensity: 0.020,
            groundColor: '#1a2010', lightColor: '#88aaff', ambientColor: '#101828', accentColor: '#4488ff',
        },
        npcs: [
            { archetype: 'viking_chieftain', role: 'guide', names: ['Ragnar', 'Bjorn', 'Leif', 'Harald', 'Sigurd'], dialogueStyle: 'bold and adventurous, speaks of raids and glory' },
            { archetype: 'norse_skald', role: 'neutral', names: ['Bragi', 'Snorri', 'Egil', 'Thorvald'], dialogueStyle: 'poetic and dramatic, tells tales of the gods' },
            { archetype: 'jotun', role: 'villain', names: ['Loki', 'Fenrir', 'Jormungandr', 'Surtr'], dialogueStyle: 'cunning and destructive, enemy of the gods' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/viking_village.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'samurai_japan',
        name: 'Feudal Japan',
        description: 'Cherry blossom courtyard of a Japanese castle with bamboo groves and paper lanterns.',
        builderKey: 'samurai_japan',
        topicKeywords: ['japan', 'samurai', 'shogun', 'feudal japan', 'bushido', 'katana', 'meiji', 'edo', 'kabuki', 'haiku', 'tokugawa'],
        tags: ['history', 'medieval', 'asia'],
        palette: {
            skyColor: '#0a0510', fogColor: '#140a20', fogDensity: 0.016,
            groundColor: '#0a1405', lightColor: '#ffccaa', ambientColor: '#1a0a20', accentColor: '#ff6688',
        },
        npcs: [
            { archetype: 'samurai', role: 'guide', names: ['Musashi', 'Nobunaga', 'Hideyoshi', 'Tokugawa', 'Takeda'], dialogueStyle: 'disciplined and honorable, follows the bushido' },
            { archetype: 'zen_monk', role: 'neutral', names: ['Dogen', 'Basho', 'Ikkyu', 'Ryokan'], dialogueStyle: 'calm and meditative, speaks in haiku and koan' },
            { archetype: 'ninja', role: 'villain', names: ['Koga', 'Iga', 'Hanzo', 'Fuma'], dialogueStyle: 'silent and deadly, lurks in shadows' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/samurai_japan.mp3',
        musicVolume: 0.4,
    },

    // ═══════════════════════════════════════════════
    // MEDIEVAL
    // ═══════════════════════════════════════════════
    {
        id: 'medieval_castle',
        name: 'Medieval Castle',
        description: 'Stone battlements and a great hall lit by torchlight in a medieval fortress.',
        builderKey: 'medieval_castle',
        topicKeywords: ['medieval', 'middle ages', 'knights', 'crusades', 'feudalism', 'castle', 'black death', 'magna carta', 'hundred years war'],
        tags: ['history', 'medieval', 'europe'],
        palette: {
            skyColor: '#100820', fogColor: '#180a30', fogDensity: 0.018,
            groundColor: '#2a2030', lightColor: '#ffaa44', ambientColor: '#201030', accentColor: '#8060ff',
        },
        npcs: [
            { archetype: 'knight', role: 'guide', names: ['Sir Roland', 'Sir Gawain', 'Sir Lancelot', 'Sir Percival'], dialogueStyle: 'chivalrous and brave, protector of the realm' },
            { archetype: 'court_jester', role: 'neutral', names: ['Fool', 'Patch', 'Motley', 'Trinculo'], dialogueStyle: 'witty and playful, hides wisdom in jokes' },
            { archetype: 'dark_sorcerer', role: 'villain', names: ['Mordred', 'Maleagant', 'Morgan', 'Vortigern'], dialogueStyle: 'sinister and manipulative, schemes in secret' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/medieval_castle.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'medieval_market',
        name: 'Medieval Market',
        description: 'A bustling town square with merchant stalls, guild signs and a cathedral in the background.',
        builderKey: 'medieval_market',
        topicKeywords: ['guilds', 'trade', 'merchants', 'medieval economy', 'towns', 'plague', 'pilgrimage', 'chaucer'],
        tags: ['history', 'medieval', 'society'],
        palette: {
            skyColor: '#0a1020', fogColor: '#102030', fogDensity: 0.012,
            groundColor: '#3a2a10', lightColor: '#ffdd88', ambientColor: '#202830', accentColor: '#d4a020',
        },
        npcs: [
            { archetype: 'merchant', role: 'guide', names: ['Geoffrey', 'Edmund', 'Walter', 'Hugh', 'Thomas'], dialogueStyle: 'shrewd but friendly, always making deals' },
            { archetype: 'guild_master', role: 'neutral', names: ['Master William', 'Master John', 'Master Robert'], dialogueStyle: 'proud of craft, upholds guild traditions' },
            { archetype: 'pickpocket', role: 'villain', names: ['Reynard', 'Scapin', 'Crispin'], dialogueStyle: 'slippery and deceptive, blends into the crowd' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/medieval_market.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'crusader_fortress',
        name: 'Crusader Fortress',
        description: 'A sandstone fortress in the Holy Land where East meets West in conflict and trade.',
        builderKey: 'crusader_fortress',
        topicKeywords: ['crusades', 'holy land', 'jerusalem', 'crusaders', 'saladin', 'templars', 'richard', 'byzantine'],
        tags: ['history', 'medieval', 'conflict'],
        palette: {
            skyColor: '#1a1000', fogColor: '#2a1800', fogDensity: 0.012,
            groundColor: '#c4a060', lightColor: '#ffdd88', ambientColor: '#6a4020', accentColor: '#ff4444',
        },
        npcs: [
            { archetype: 'templar_knight', role: 'guide', names: ['Baldwin', 'Godfrey', 'Raymond', 'Tancred'], dialogueStyle: 'devout and militant, fights for God and glory' },
            { archetype: 'arab_merchant', role: 'neutral', names: ['Khalid', 'Omar', 'Salah', 'Tariq'], dialogueStyle: 'wise and cosmopolitan, bridge between worlds' },
            { archetype: 'assassin', role: 'villain', names: ['Hassan', 'Sinan', 'Rashid'], dialogueStyle: 'cold and calculating, strikes without warning' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/crusader_fortress.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'plague_village',
        name: 'Plague Village',
        description: 'A grim medieval village during the Black Death with abandoned carts and eerie silence.',
        builderKey: 'plague_village',
        topicKeywords: ['black death', 'plague', 'medieval medicine', 'bubonic plague', 'flagellants', 'rats', 'epidemic'],
        tags: ['history', 'medieval', 'disease'],
        palette: {
            skyColor: '#050508', fogColor: '#0a0a10', fogDensity: 0.025,
            groundColor: '#1a1a10', lightColor: '#88aa88', ambientColor: '#0a100a', accentColor: '#44aa44',
        },
        npcs: [
            { archetype: 'plague_doctor', role: 'guide', names: ['Dr. Nostradamus', 'Dr. Ficino', 'Dr. Benivieni'], dialogueStyle: 'clinical and cautious, masked behind a beak' },
            { archetype: 'monk', role: 'neutral', names: ['Brother Thomas', 'Brother Francis', 'Brother Jerome'], dialogueStyle: 'compassionate and prayerful, caring for the sick' },
            { archetype: 'plague_rat', role: 'villain', names: ['Pestis', 'Mors', 'Flagellum'], dialogueStyle: 'chaotic and spreading, carrier of death' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/plague_village.mp3',
        musicVolume: 0.3,
    },

    {
        id: 'monastery',
        name: 'Medieval Monastery',
        description: 'A quiet stone cloister with candlelit scriptorium and monks illuminating manuscripts.',
        builderKey: 'monastery',
        topicKeywords: ['monastery', 'monks', 'illuminated manuscripts', 'christianity', 'bible', 'scholasticism', 'thomas aquinas', 'benedictine'],
        tags: ['history', 'medieval', 'religion'],
        palette: {
            skyColor: '#080808', fogColor: '#101010', fogDensity: 0.014,
            groundColor: '#1a1a14', lightColor: '#ffeeaa', ambientColor: '#1a1808', accentColor: '#ffdd66',
        },
        npcs: [
            { archetype: 'abbot', role: 'guide', names: ['Abbot Benedict', 'Abbot Anselm', 'Abbot Bernard'], dialogueStyle: 'serene and wise, speaks of scripture and learning' },
            { archetype: 'illuminator', role: 'neutral', names: ['Brother Aldric', 'Brother Eadwine', 'Brother Hugo'], dialogueStyle: 'focused and artistic, devoted to the beautiful word' },
            { archetype: 'heretic', role: 'villain', names: ['Arius', 'Wycliffe', 'Hus'], dialogueStyle: 'rebellious and questioning, challenges authority' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/monastery.mp3',
        musicVolume: 0.3,
    },

    {
        id: 'jousting_arena',
        name: 'Jousting Arena',
        description: 'Colourful tournament grounds with banners, stands and the clash of lances.',
        builderKey: 'jousting_arena',
        topicKeywords: ['chivalry', 'tournament', 'jousting', 'heraldry', 'coat of arms', 'knighthood', 'courtly love'],
        tags: ['history', 'medieval', 'sport'],
        palette: {
            skyColor: '#0a1428', fogColor: '#102040', fogDensity: 0.008,
            groundColor: '#2a4010', lightColor: '#ffffff', ambientColor: '#1a2840', accentColor: '#ff4444',
        },
        npcs: [
            { archetype: 'champion_knight', role: 'guide', names: ['Sir William Marshal', 'Sir Edward', 'Sir Henry'], dialogueStyle: 'gallant and competitive, lives for honour' },
            { archetype: 'herald', role: 'neutral', names: ['Herald Thomas', 'Herald James', 'Herald Philip'], dialogueStyle: 'formal and announcing, keeper of heraldry' },
            { archetype: 'challenger', role: 'villain', names: ['Black Knight', 'Iron Duke', 'Dark Rider'], dialogueStyle: 'menacing and boastful, seeks to humiliate' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/jousting_arena.mp3',
        musicVolume: 0.4,
    },

    // ═══════════════════════════════════════════════
    // EXPLORATION & NATURE
    // ═══════════════════════════════════════════════
    {
        id: 'pirate_ship',
        name: 'Pirate Ship',
        description: 'A weathered galleon on the high seas with creaking rigging and treasure maps.',
        builderKey: 'pirate_ship',
        topicKeywords: ['pirates', 'exploration', 'age of sail', 'navigation', 'trade routes', 'caribbean', 'columbus', 'magellan', 'sea routes'],
        tags: ['history', 'exploration', 'adventure'],
        palette: {
            skyColor: '#040a14', fogColor: '#081828', fogDensity: 0.014,
            groundColor: '#0a1428', lightColor: '#ffdd88', ambientColor: '#0a1420', accentColor: '#d4a020',
        },
        npcs: [
            { archetype: 'pirate_captain', role: 'guide', names: ['Captain Jack', 'Captain Flint', 'Captain Blackbeard', 'Captain Drake'], dialogueStyle: 'bold and roguish, loves treasure and freedom' },
            { archetype: 'navigator', role: 'neutral', names: ['Navigator Will', 'First Mate Anne', 'Quartermaster Sam'], dialogueStyle: 'practical and skilled, knows the stars' },
            { archetype: 'sea_monster', role: 'villain', names: ['Kraken', 'Davy Jones', 'The Leviathan'], dialogueStyle: 'ancient and terrifying, ruler of the deep' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/pirate_ship.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'desert_ruins',
        name: 'Desert Ruins',
        description: 'Ancient crumbling ruins half-buried in sand dunes under a blazing sun.',
        builderKey: 'desert_ruins',
        topicKeywords: ['archaeology', 'ruins', 'desert', 'ancient civilization', 'excavation', 'artifacts', 'lost city'],
        tags: ['history', 'archaeology', 'nature'],
        palette: {
            skyColor: '#1a0e00', fogColor: '#2d1a00', fogDensity: 0.010,
            groundColor: '#c4a040', lightColor: '#ffdd88', ambientColor: '#8b6020', accentColor: '#ffaa22',
        },
        npcs: [
            { archetype: 'archaeologist', role: 'guide', names: ['Dr. Jones', 'Dr. Carter', 'Dr. Evans', 'Prof. Lawrence'], dialogueStyle: 'curious and excited, loves discovery' },
            { archetype: 'desert_nomad', role: 'neutral', names: ['Malik', 'Tariq', 'Yusuf', 'Aziz'], dialogueStyle: 'stoic and knowledgeable, guardian of the desert' },
            { archetype: 'tomb_guardian', role: 'villain', names: ['Anubis', 'Sekhmet', 'Ammit'], dialogueStyle: 'relentless and ancient, protects the dead' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/desert_ruins.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'jungle_temple',
        name: 'Jungle Temple',
        description: 'A moss-covered temple deep in a tropical jungle with glowing plants and jungle sounds.',
        builderKey: 'jungle_temple',
        topicKeywords: ['jungle', 'rainforest', 'biodiversity', 'ecosystems', 'tropical', 'wildlife', 'plants', 'deforestation', 'amazon'],
        tags: ['nature', 'biology', 'geography'],
        palette: {
            skyColor: '#0a1a00', fogColor: '#0d2000', fogDensity: 0.018,
            groundColor: '#1a3005', lightColor: '#aaff88', ambientColor: '#0a2000', accentColor: '#40c040',
        },
        npcs: [
            { archetype: 'jungle_guide', role: 'guide', names: ['Maya', 'Kaya', 'Tama', 'Zara', 'Luca'], dialogueStyle: 'energetic and knowledgeable, loves nature' },
            { archetype: 'shaman', role: 'neutral', names: ['Elder Roots', 'Wise Leaf', 'Spirit Walker'], dialogueStyle: 'mystical and connected, speaks for the forest' },
            { archetype: 'poacher', role: 'villain', names: ['Slash', 'Greed', 'Cutter'], dialogueStyle: 'greedy and destructive, disrespects nature' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/jungle_temple.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'cave',
        name: 'Ancient Cave',
        description: 'A deep cave with stalactites, cave paintings and glowing crystal formations.',
        builderKey: 'cave',
        topicKeywords: ['cave', 'geology', 'stalactites', 'prehistoric', 'cave paintings', 'minerals', 'crystals', 'spelunking'],
        tags: ['science', 'geology', 'prehistory'],
        palette: {
            skyColor: '#020208', fogColor: '#040410', fogDensity: 0.025,
            groundColor: '#101018', lightColor: '#8888ff', ambientColor: '#080810', accentColor: '#6666ff',
        },
        npcs: [
            { archetype: 'cave_explorer', role: 'guide', names: ['Rocky', 'Crystal', 'Flint', 'Gem'], dialogueStyle: 'adventurous and careful, knows cave safety' },
            { archetype: 'prehistoric_human', role: 'neutral', names: ['Ugh', 'Grak', 'Mara', 'Tuk'], dialogueStyle: 'simple and expressive, communicates through gesture' },
            { archetype: 'cave_creature', role: 'villain', names: ['Shadow Bat', 'Cave Bear', 'Stone Troll'], dialogueStyle: 'territorial and aggressive, guards its home' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/cave.mp3',
        musicVolume: 0.3,
    },

    {
        id: 'arctic',
        name: 'Arctic Tundra',
        description: 'A frozen landscape of ice and snow under the aurora borealis.',
        builderKey: 'arctic',
        topicKeywords: ['arctic', 'antarctica', 'climate change', 'polar bears', 'ice caps', 'global warming', 'tundra', 'aurora', 'inuit', 'glaciers'],
        tags: ['science', 'geography', 'climate'],
        palette: {
            skyColor: '#020a14', fogColor: '#040e1a', fogDensity: 0.016,
            groundColor: '#c8dde8', lightColor: '#aaddff', ambientColor: '#082030', accentColor: '#00ffcc',
        },
        npcs: [
            { archetype: 'climate_scientist', role: 'guide', names: ['Dr. Snow', 'Dr. Frost', 'Dr. Polar'], dialogueStyle: 'concerned and urgent, shares climate data' },
            { archetype: 'inuit_elder', role: 'neutral', names: ['Nanuq', 'Siku', 'Aklaq', 'Pakak'], dialogueStyle: 'wise and grounded, connected to the ice' },
            { archetype: 'pollution', role: 'villain', names: ['Carbon', 'Smog', 'Melt'], dialogueStyle: 'slow and inexorable, threatens everything' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/arctic.mp3',
        musicVolume: 0.3,
    },

    {
        id: 'underwater',
        name: 'Underwater World',
        description: 'A deep ocean environment with coral reefs, bioluminescent creatures and shipwrecks.',
        builderKey: 'underwater',
        topicKeywords: ['ocean', 'marine biology', 'coral reef', 'deep sea', 'fish', 'whales', 'sharks', 'oceanography', 'tides', 'underwater'],
        tags: ['science', 'biology', 'nature'],
        palette: {
            skyColor: '#000a20', fogColor: '#000e28', fogDensity: 0.022,
            groundColor: '#0a1a30', lightColor: '#0088ff', ambientColor: '#000a18', accentColor: '#00ccff',
        },
        npcs: [
            { archetype: 'marine_biologist', role: 'guide', names: ['Dr. Coral', 'Dr. Marina', 'Dr. Reef', 'Dr. Finley'], dialogueStyle: 'passionate and bubbly, loves sea creatures' },
            { archetype: 'mermaid', role: 'neutral', names: ['Pearl', 'Coral', 'Marina', 'Oceana'], dialogueStyle: 'mysterious and flowing, guardian of the sea' },
            { archetype: 'deep_sea_creature', role: 'villain', names: ['Anglerfish', 'Giant Squid', 'The Abyss'], dialogueStyle: 'alien and terrifying, from the darkness below' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/underwater.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'volcano',
        name: 'Active Volcano',
        description: 'A dramatic volcanic landscape with lava flows, ash clouds and glowing magma.',
        builderKey: 'volcano',
        topicKeywords: ['volcano', 'geology', 'tectonic plates', 'lava', 'magma', 'eruption', 'pompeii', 'earth science', 'igneous rock'],
        tags: ['science', 'geology', 'geography'],
        palette: {
            skyColor: '#1a0200', fogColor: '#2a0500', fogDensity: 0.020,
            groundColor: '#2a0800', lightColor: '#ff4400', ambientColor: '#3a0a00', accentColor: '#ff4000',
        },
        npcs: [
            { archetype: 'volcanologist', role: 'guide', names: ['Dr. Blaze', 'Dr. Ember', 'Dr. Ash', 'Dr. Lava'], dialogueStyle: 'excited and cautious, monitors the eruption' },
            { archetype: 'fire_spirit', role: 'neutral', names: ['Pele', 'Vulcan', 'Hephaestus', 'Ignis'], dialogueStyle: 'powerful and elemental, speaks of creation and destruction' },
            { archetype: 'lava_beast', role: 'villain', names: ['Magmar', 'Inferno', 'Pyroclast'], dialogueStyle: 'destructive and unstoppable, consumed by fire' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/volcano.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'island_paradise',
        name: 'Tropical Island',
        description: 'A lush tropical island with palm trees, crystal water and hidden coves.',
        builderKey: 'island_paradise',
        topicKeywords: ['islands', 'geography', 'pacific', 'polynesia', 'coral', 'biodiversity', 'ecosystems', 'colonization', 'trade winds'],
        tags: ['geography', 'nature', 'culture'],
        palette: {
            skyColor: '#040a18', fogColor: '#060c20', fogDensity: 0.008,
            groundColor: '#d4c080', lightColor: '#ffeeaa', ambientColor: '#0a1830', accentColor: '#00ddff',
        },
        npcs: [
            { archetype: 'island_navigator', role: 'guide', names: ['Moana', 'Tane', 'Hina', 'Maui', 'Kupe'], dialogueStyle: 'free-spirited and wise, reads stars and waves' },
            { archetype: 'island_elder', role: 'neutral', names: ['Elder Tama', 'Elder Rongo', 'Elder Haumia'], dialogueStyle: 'traditional and protective, keeper of oral history' },
            { archetype: 'colonizer', role: 'villain', names: ['Captain Cook', 'De Gama', 'Coronado'], dialogueStyle: 'imposing and entitled, claims what is not his' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/island_paradise.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'coral_reef',
        name: 'Coral Reef',
        description: 'A vibrant shallow reef teeming with colourful fish and intricate coral structures.',
        builderKey: 'coral_reef',
        topicKeywords: ['coral reef', 'marine biology', 'ocean', 'fish', 'symbiosis', 'bleaching', 'biodiversity', 'great barrier reef'],
        tags: ['science', 'biology', 'nature'],
        palette: {
            skyColor: '#000820', fogColor: '#000a28', fogDensity: 0.018,
            groundColor: '#0a1820', lightColor: '#44aaff', ambientColor: '#000810', accentColor: '#ff6688',
        },
        npcs: [
            { archetype: 'reef_guide', role: 'guide', names: ['Nemo', 'Dori', 'Ray', 'Gill'], dialogueStyle: 'cheerful and informative, knows every creature' },
            { archetype: 'turtle', role: 'neutral', names: ['Crush', 'Elder Shell', 'Old Tide'], dialogueStyle: 'slow and ancient, speaks of the ocean cycles' },
            { archetype: 'pollution_cloud', role: 'villain', names: ['Bleach', 'Acid', 'Plastic'], dialogueStyle: 'insidious and spreading, destroys the reef' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/coral_reef.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'rainforest_canopy',
        name: 'Rainforest Canopy',
        description: 'High above the forest floor in the treetops, with monkeys, birds and filtered sunlight.',
        builderKey: 'rainforest_canopy',
        topicKeywords: ['rainforest', 'canopy', 'biodiversity', 'photosynthesis', 'food chain', 'amazon', 'deforestation', 'plants', 'ecology'],
        tags: ['science', 'biology', 'geography'],
        palette: {
            skyColor: '#051005', fogColor: '#081408', fogDensity: 0.020,
            groundColor: '#0a1a05', lightColor: '#aaffaa', ambientColor: '#051005', accentColor: '#88ff44',
        },
        npcs: [
            { archetype: 'botanist', role: 'guide', names: ['Dr. Fern', 'Dr. Vine', 'Dr. Leaf', 'Dr. Root'], dialogueStyle: 'enthusiastic and detailed, names every plant' },
            { archetype: 'howler_monkey', role: 'neutral', names: ['Coco', 'Banzi', 'Rojo', 'Chico'], dialogueStyle: 'noisy and playful, territorial but friendly' },
            { archetype: 'logger', role: 'villain', names: ['Chain', 'Stump', 'Clearcut'], dialogueStyle: 'indifferent to nature, only sees profit' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/rainforest_canopy.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'desert_oasis',
        name: 'Desert Oasis',
        description: 'A lush oasis of palms and pools in the middle of a vast desert.',
        builderKey: 'desert_oasis',
        topicKeywords: ['desert', 'oasis', 'trade routes', 'sahara', 'silk road', 'water cycle', 'nomads', 'bedouin', 'caravan'],
        tags: ['geography', 'history', 'nature'],
        palette: {
            skyColor: '#1a1000', fogColor: '#2a1800', fogDensity: 0.010,
            groundColor: '#c4a040', lightColor: '#ffdd88', ambientColor: '#8b6020', accentColor: '#44ddaa',
        },
        npcs: [
            { archetype: 'caravan_leader', role: 'guide', names: ['Ibn Battuta', 'Al-Masudi', 'Sinbad', 'Harun'], dialogueStyle: 'experienced and generous, shares travel wisdom' },
            { archetype: 'water_keeper', role: 'neutral', names: ['Aqua', 'Nile', 'Spring', 'Bloom'], dialogueStyle: 'precious and protective, guards the water source' },
            { archetype: 'sand_thief', role: 'villain', names: ['Mirage', 'Dune', 'Simoom'], dialogueStyle: 'deceptive and dangerous, leads travelers astray' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/desert_oasis.mp3',
        musicVolume: 0.4,
    },

    // ═══════════════════════════════════════════════
    // REVOLUTION & INDUSTRY
    // ═══════════════════════════════════════════════
    {
        id: 'victorian_london',
        name: 'Victorian London',
        description: 'Fog-shrouded cobblestone streets of 19th century London with gas lamps and top hats.',
        builderKey: 'victorian_london',
        topicKeywords: ['victorian', '19th century', 'industrial revolution', 'london', 'charles dickens', 'darwin', 'empire', 'class system', '18th century england', 'british history'],
        tags: ['history', 'modern', 'europe'],
        palette: {
            skyColor: '#080808', fogColor: '#101010', fogDensity: 0.025,
            groundColor: '#1a1810', lightColor: '#ffdd88', ambientColor: '#101008', accentColor: '#ffcc44',
        },
        npcs: [
            { archetype: 'victorian_gentleman', role: 'guide', names: ['Mr. Holmes', 'Mr. Darwin', 'Mr. Dickens', 'Mr. Brunel'], dialogueStyle: 'eloquent and measured, speaks of progress and empire' },
            { archetype: 'street_urchin', role: 'neutral', names: ['Oliver', 'Twist', 'Pip', 'Artful'], dialogueStyle: 'cheeky and street-smart, survives on wits' },
            { archetype: 'industrialist', role: 'villain', names: ['Mr. Gradgrind', 'Lord Scrooge', 'Baron Coal'], dialogueStyle: 'cold and calculating, values profit over people' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/victorian_london.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'industrial_factory',
        name: 'Industrial Factory',
        description: 'A steam-powered factory floor with grinding gears, furnaces and child workers.',
        builderKey: 'industrial_factory',
        topicKeywords: ['industrial revolution', 'factories', 'steam engine', 'coal', 'child labour', 'trade unions', 'marx', 'capitalism', 'working class'],
        tags: ['history', 'industry', 'social'],
        palette: {
            skyColor: '#080808', fogColor: '#0a0a0a', fogDensity: 0.025,
            groundColor: '#1a1a14', lightColor: '#ff8800', ambientColor: '#101010', accentColor: '#ff6600',
        },
        npcs: [
            { archetype: 'factory_worker', role: 'guide', names: ['Thomas', 'Mary', 'James', 'Annie', 'George'], dialogueStyle: 'weary but resilient, speaks of hard conditions' },
            { archetype: 'union_organizer', role: 'neutral', names: ['Engels', 'Paine', 'Ludd', 'Hardie'], dialogueStyle: 'passionate and persuasive, fights for workers rights' },
            { archetype: 'factory_owner', role: 'villain', names: ['Mr. Bounderby', 'Sir Coal', 'Lord Mill'], dialogueStyle: 'exploitative and dismissive, sees workers as machines' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/industrial_factory.mp3',
        musicVolume: 0.3,
    },

    {
        id: 'wild_west',
        name: 'Wild West',
        description: 'A dusty frontier town with saloons, wanted posters and the open prairie beyond.',
        builderKey: 'wild_west',
        topicKeywords: ['wild west', 'american frontier', 'cowboys', 'native americans', 'manifest destiny', 'gold rush', 'railroads', 'buffalo', 'civil war aftermath'],
        tags: ['history', 'american', 'frontier'],
        palette: {
            skyColor: '#1a0e00', fogColor: '#2a1800', fogDensity: 0.010,
            groundColor: '#c4a040', lightColor: '#ffdd88', ambientColor: '#8b6020', accentColor: '#ff8800',
        },
        npcs: [
            { archetype: 'sheriff', role: 'guide', names: ['Sheriff Wyatt', 'Marshal Pat', 'Deputy Doc'], dialogueStyle: 'laconic and just, upholds the law' },
            { archetype: 'native_elder', role: 'neutral', names: ['Sitting Bull', 'Crazy Horse', 'Chief Joseph', 'Red Cloud'], dialogueStyle: 'dignified and wise, speaks of stolen lands' },
            { archetype: 'outlaw', role: 'villain', names: ['Billy the Kid', 'Jesse James', 'Doc Holliday'], dialogueStyle: 'reckless and dangerous, lives outside the law' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/wild_west.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'steam_workshop',
        name: 'Steam Workshop',
        description: 'An inventor\'s workshop full of steam-powered contraptions, blueprints and brass gears.',
        builderKey: 'steam_workshop',
        topicKeywords: ['steam engine', 'invention', 'watt', 'brunel', 'tesla', 'edison', 'technology history', 'patents', 'industrial'],
        tags: ['history', 'science', 'technology'],
        palette: {
            skyColor: '#0a0808', fogColor: '#141010', fogDensity: 0.018,
            groundColor: '#1a1410', lightColor: '#ffcc88', ambientColor: '#141008', accentColor: '#d4a020',
        },
        npcs: [
            { archetype: 'inventor', role: 'guide', names: ['Watt', 'Brunel', 'Tesla', 'Babbage', 'Lovelace'], dialogueStyle: 'brilliant and eccentric, always has a new idea' },
            { archetype: 'apprentice', role: 'neutral', names: ['Young Ada', 'Young Charles', 'Young George'], dialogueStyle: 'eager and curious, learning from the master' },
            { archetype: 'patent_thief', role: 'villain', names: ['Edison', 'Rival', 'Copycat'], dialogueStyle: 'cunning and unscrupulous, steals credit' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/steam_workshop.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'silk_road',
        name: 'Silk Road',
        description: 'A bustling trading post on the ancient Silk Road connecting East and West.',
        builderKey: 'silk_road',
        topicKeywords: ['silk road', 'trade', 'spices', 'china', 'rome', 'exchange', 'globalization', 'ibn battuta', 'marco polo', 'caravansary'],
        tags: ['history', 'geography', 'trade'],
        palette: {
            skyColor: '#0a0808', fogColor: '#141010', fogDensity: 0.014,
            groundColor: '#a08040', lightColor: '#ffdd88', ambientColor: '#5a3010', accentColor: '#cc8844',
        },
        npcs: [
            { archetype: 'silk_merchant', role: 'guide', names: ['Marco Polo', 'Ibn Battuta', 'Zheng He', 'Xuanzang'], dialogueStyle: 'cosmopolitan and curious, collects stories and goods' },
            { archetype: 'silk_weaver', role: 'neutral', names: ['Mei', 'Lin', 'Jade', 'Pearl'], dialogueStyle: 'skilled and proud, guardian of the silk secret' },
            { archetype: 'bandit', role: 'villain', names: ['Robber Khan', 'Desert Thief', 'Road Raider'], dialogueStyle: 'opportunistic and ruthless, preys on caravans' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/silk_road.mp3',
        musicVolume: 0.4,
    },

    // ═══════════════════════════════════════════════
    // WAR & CONFLICT
    // ═══════════════════════════════════════════════
    {
        id: 'war_trenches',
        name: 'WWI Trenches',
        description: 'The muddy trenches of World War I with barbed wire, dugouts and no man\'s land beyond.',
        builderKey: 'war_trenches',
        topicKeywords: ['world war 1', 'wwi', 'trenches', 'western front', 'somme', 'verdun', 'gas attack', 'armistice', 'propaganda', 'shell shock'],
        tags: ['history', 'war', 'modern'],
        palette: {
            skyColor: '#080808', fogColor: '#0d0d0d', fogDensity: 0.022,
            groundColor: '#1a1408', lightColor: '#888866', ambientColor: '#0a0a08', accentColor: '#886644',
        },
        npcs: [
            { archetype: 'soldier', role: 'guide', names: ['Tommy', 'Fritz', 'Poilu', 'Private Jack', 'Sergeant Will'], dialogueStyle: 'tired and traumatized, longs for home' },
            { archetype: 'medic', role: 'neutral', names: ['Nurse Edith', 'Doc Collins', 'Padre Green'], dialogueStyle: 'compassionate and calm under fire, saves lives' },
            { archetype: 'general', role: 'villain', names: ['General Haig', 'Colonel Brass', 'The High Command'], dialogueStyle: 'distant and strategic, sends men to die' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/war_trenches.mp3',
        musicVolume: 0.3,
    },

    {
        id: 'underground_bunker',
        name: 'Cold War Bunker',
        description: 'A secret underground bunker from the Cold War with radar screens and fallout maps.',
        builderKey: 'underground_bunker',
        topicKeywords: ['cold war', 'nuclear', 'bunker', 'spy', 'cia', 'kgb', 'cuban missile crisis', 'berlin wall', 'arms race', 'nato', 'soviet union'],
        tags: ['history', 'war', 'modern'],
        palette: {
            skyColor: '#020208', fogColor: '#040410', fogDensity: 0.020,
            groundColor: '#101018', lightColor: '#44ff44', ambientColor: '#080810', accentColor: '#44ff44',
        },
        npcs: [
            { archetype: 'spy', role: 'guide', names: ['Agent X', 'Colonel Mustard', 'Handler Kate', 'Control'], dialogueStyle: 'cryptic and careful, speaks in euphemisms' },
            { archetype: 'defector', role: 'neutral', names: ['Ivan', 'Boris', 'Natasha', 'Viktor'], dialogueStyle: 'conflicted and scared, caught between two worlds' },
            { archetype: 'double_agent', role: 'villain', names: ['Mole', 'Traitor', 'Phantom', 'Kim Philby'], dialogueStyle: 'smooth and deceptive, loyal to no one' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/underground_bunker.mp3',
        musicVolume: 0.3,
    },

    {
        id: 'ancient_battlefield',
        name: 'Ancient Battlefield',
        description: 'A smoke-covered battlefield from antiquity with formations, shields and fallen banners.',
        builderKey: 'ancient_battlefield',
        topicKeywords: ['battle', 'warfare', 'strategy', 'alexander the great', 'napoleon', 'marathon', 'thermopylae', 'tactics', 'military history'],
        tags: ['history', 'war', 'ancient'],
        palette: {
            skyColor: '#0a0808', fogColor: '#141010', fogDensity: 0.022,
            groundColor: '#2a2010', lightColor: '#ffaa44', ambientColor: '#141008', accentColor: '#ff4422',
        },
        npcs: [
            { archetype: 'general', role: 'guide', names: ['Alexander', 'Hannibal', 'Caesar', 'Napoleon', 'Sun Tzu'], dialogueStyle: 'brilliant and decisive, master of strategy' },
            { archetype: 'foot_soldier', role: 'neutral', names: ['Leonidas', 'Hoplite', 'Legionary', 'Centurion'], dialogueStyle: 'brave and loyal, follows orders without question' },
            { archetype: 'enemy_commander', role: 'villain', names: ['Darius', 'Pompey', 'Vercingetorix'], dialogueStyle: 'formidable and proud, worthy adversary' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/ancient_battlefield.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'naval_warship',
        name: 'Naval Warship',
        description: 'The gun deck of an 18th century warship in the heat of a sea battle.',
        builderKey: 'naval_warship',
        topicKeywords: ['naval warfare', 'trafalgar', 'nelson', 'age of sail', 'cannons', 'naval history', 'british navy', 'pirates', 'sea battles'],
        tags: ['history', 'war', 'exploration'],
        palette: {
            skyColor: '#040a14', fogColor: '#060e1a', fogDensity: 0.016,
            groundColor: '#2a1808', lightColor: '#ffaa44', ambientColor: '#0a1018', accentColor: '#ffaa22',
        },
        npcs: [
            { archetype: 'admiral', role: 'guide', names: ['Admiral Nelson', 'Admiral Drake', 'Captain Hornblower'], dialogueStyle: 'commanding and courageous, expects victory' },
            { archetype: 'sailor', role: 'neutral', names: ['Jack Tar', 'Old Salt', 'Bosun Brown', 'Midshipman Jones'], dialogueStyle: 'rough and practical, superstitious about the sea' },
            { archetype: 'enemy_captain', role: 'villain', names: ['Villeneuve', 'De Grasse', 'Tromp'], dialogueStyle: 'proud and defiant, fights to the last' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/naval_warship.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'cold_war_base',
        name: 'Space Race Base',
        description: 'A secret NASA/Soviet launch facility during the height of the space race.',
        builderKey: 'cold_war_base',
        topicKeywords: ['space race', 'nasa', 'sputnik', 'apollo', 'gagarin', 'armstrong', 'cold war', 'rocket', 'moon landing'],
        tags: ['history', 'science', 'war'],
        palette: {
            skyColor: '#020208', fogColor: '#040410', fogDensity: 0.014,
            groundColor: '#101828', lightColor: '#ffffff', ambientColor: '#080818', accentColor: '#00aaff',
        },
        npcs: [
            { archetype: 'nasa_engineer', role: 'guide', names: ['Von Braun', 'Glenn', 'Armstrong', 'Collins', 'Aldrin'], dialogueStyle: 'technical and inspired, dreams of the stars' },
            { archetype: 'cosmonaut', role: 'neutral', names: ['Gagarin', 'Tereshkova', 'Leonov', 'Korolev'], dialogueStyle: 'brave and idealistic, pioneer of space' },
            { archetype: 'soviet_spy', role: 'villain', names: ['Rosenberg', 'Rudolf', 'Vasili'], dialogueStyle: 'calculating and patient, steals secrets' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/cold_war_base.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'resistance_hideout',
        name: 'Resistance Hideout',
        description: 'A secret hideout of WWII resistance fighters with coded messages and hidden radio.',
        builderKey: 'resistance_hideout',
        topicKeywords: ['wwii', 'resistance', 'holocaust', 'occupation', 'partisan', 'anne frank', 'd-day', 'liberation', 'nazi', 'underground'],
        tags: ['history', 'war', 'social'],
        palette: {
            skyColor: '#040404', fogColor: '#080808', fogDensity: 0.020,
            groundColor: '#141414', lightColor: '#ffcc88', ambientColor: '#0a0a0a', accentColor: '#cc4444',
        },
        npcs: [
            { archetype: 'resistance_leader', role: 'guide', names: ['Jean Moulin', 'Violette', 'Raoul', 'Sophie'], dialogueStyle: 'brave and secretive, fighting for freedom' },
            { archetype: 'radio_operator', role: 'neutral', names: ['Marie', 'Henri', 'Claude', 'Emile'], dialogueStyle: 'focused and tense, transmits vital intelligence' },
            { archetype: 'informant', role: 'villain', names: ['Traitor', 'Collaborator', 'The Rat'], dialogueStyle: 'cowardly and self-serving, betrays for safety' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/resistance_hideout.mp3',
        musicVolume: 0.3,
    },

    // ═══════════════════════════════════════════════
    // CIVIL & SOCIAL
    // ═══════════════════════════════════════════════
    {
        id: 'civil_rights_street',
        name: 'Civil Rights March',
        description: 'A historic American street during the Civil Rights Movement with marchers and signs.',
        builderKey: 'civil_rights_street',
        topicKeywords: ['civil rights', 'martin luther king', 'rosa parks', 'segregation', 'march on washington', 'montgomery', 'selma', 'naacp', 'malcolm x', 'jim crow'],
        tags: ['history', 'social justice', 'american'],
        palette: {
            skyColor: '#060810', fogColor: '#080a14', fogDensity: 0.010,
            groundColor: '#1a1808', lightColor: '#ffdd88', ambientColor: '#0a0c10', accentColor: '#ff4444',
        },
        npcs: [
            { archetype: 'civil_rights_leader', role: 'guide', names: ['Dr. King', 'Rosa', 'John Lewis', 'Medgar', 'Thurgood'], dialogueStyle: 'inspiring and courageous, speaks of justice and dignity' },
            { archetype: 'marcher', role: 'neutral', names: ['James', 'Dorothy', 'Ernest', 'Diane', 'Bernard'], dialogueStyle: 'determined and peaceful, walks with purpose' },
            { archetype: 'oppressor', role: 'villain', names: ['Bull Connor', 'George Wallace', 'The System'], dialogueStyle: 'hostile and unjust, enforces segregation' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/civil_rights_street.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'suffragette_march',
        name: 'Suffragette March',
        description: 'Edwardian streets filled with women marching for the right to vote.',
        builderKey: 'suffragette_march',
        topicKeywords: ['suffrage', 'votes for women', 'emmeline pankhurst', 'feminism', '19th amendment', 'equal rights', 'womens rights', 'edwardian'],
        tags: ['history', 'social justice', 'gender'],
        palette: {
            skyColor: '#060808', fogColor: '#0a0c10', fogDensity: 0.014,
            groundColor: '#1a1808', lightColor: '#ffcc88', ambientColor: '#0a0c0a', accentColor: '#aa44aa',
        },
        npcs: [
            { archetype: 'suffragette', role: 'guide', names: ['Emmeline', 'Sylvia', 'Christabel', 'Emily', 'Alice Paul'], dialogueStyle: 'passionate and defiant, demands equality' },
            { archetype: 'journalist', role: 'neutral', names: ['Nellie Bly', 'Dorothy', 'Margaret', 'Helen'], dialogueStyle: 'observant and tenacious, reports the truth' },
            { archetype: 'anti_suffrage', role: 'villain', names: ['Lord Asquith', 'Sir Humphrey', 'The Establishment'], dialogueStyle: 'patronising and dismissive, refuses change' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/suffragette_march.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'revolutionary_paris',
        name: 'Revolutionary Paris',
        description: 'The cobblestone streets of Paris during the French Revolution with barricades and tricolour flags.',
        builderKey: 'revolutionary_paris',
        topicKeywords: ['french revolution', 'paris', 'bastille', 'robespierre', 'napoleon', 'liberty', 'guillotine', 'enlightenment', 'rousseau', 'voltaire'],
        tags: ['history', 'revolution', 'europe'],
        palette: {
            skyColor: '#080810', fogColor: '#0a0a14', fogDensity: 0.016,
            groundColor: '#1a1610', lightColor: '#ffdd88', ambientColor: '#0c0c10', accentColor: '#4444ff',
        },
        npcs: [
            { archetype: 'revolutionary', role: 'guide', names: ['Robespierre', 'Danton', 'Marat', 'Saint-Just'], dialogueStyle: 'idealistic and fervent, speaks of liberty and equality' },
            { archetype: 'philosophe', role: 'neutral', names: ['Voltaire', 'Rousseau', 'Diderot', 'Montesquieu'], dialogueStyle: 'rational and eloquent, questions all authority' },
            { archetype: 'aristocrat', role: 'villain', names: ['Louis XVI', 'Marie Antoinette', 'The Ancien Régime'], dialogueStyle: 'oblivious and privileged, out of touch with the people' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/revolutionary_paris.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'colonial_america',
        name: 'Colonial America',
        description: 'A colonial American town with printing presses, taverns and town hall meetings.',
        builderKey: 'colonial_america',
        topicKeywords: ['american revolution', 'colonial america', 'benjamin franklin', 'george washington', 'declaration of independence', 'boston tea party', 'patriots', 'loyalists'],
        tags: ['history', 'american', 'revolution'],
        palette: {
            skyColor: '#04080c', fogColor: '#060c10', fogDensity: 0.012,
            groundColor: '#1a1808', lightColor: '#ffcc88', ambientColor: '#080c08', accentColor: '#cc4422',
        },
        npcs: [
            { archetype: 'founding_father', role: 'guide', names: ['Franklin', 'Washington', 'Jefferson', 'Adams', 'Hamilton'], dialogueStyle: 'eloquent and principled, founding a new nation' },
            { archetype: 'colonial_printer', role: 'neutral', names: ['Printer Paul', 'Pamphleteer Tom', 'Publisher Sam'], dialogueStyle: 'opinionated and brave, spreads revolutionary ideas' },
            { archetype: 'british_officer', role: 'villain', names: ['Colonel Redcoat', 'Major Cornwallis', 'Captain Gage'], dialogueStyle: 'imperious and dismissive, loyal to the Crown' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/colonial_america.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'immigrant_ship',
        name: 'Immigrant Ship',
        description: 'The steerage deck of a ship crossing the Atlantic filled with immigrants heading to America.',
        builderKey: 'immigrant_ship',
        topicKeywords: ['immigration', 'ellis island', 'new world', 'american dream', 'diaspora', 'ireland', 'italy', 'eastern europe', 'statue of liberty', 'melting pot'],
        tags: ['history', 'social', 'american'],
        palette: {
            skyColor: '#040810', fogColor: '#060a14', fogDensity: 0.018,
            groundColor: '#1a1408', lightColor: '#ffcc88', ambientColor: '#080810', accentColor: '#4488cc',
        },
        npcs: [
            { archetype: 'immigrant', role: 'guide', names: ['Bridget', 'Antonio', 'Miriam', 'Stanislaw', 'Yetta'], dialogueStyle: 'hopeful and scared, dreams of a better life' },
            { archetype: 'ship_doctor', role: 'neutral', names: ['Dr. Ellis', 'Dr. Hope', 'Dr. Cross'], dialogueStyle: 'overworked and compassionate, checks for disease' },
            { archetype: 'nativist', role: 'villain', names: ['Inspector Quota', 'Nativist Guard', 'Know-Nothing'], dialogueStyle: 'hostile and prejudiced, wants to turn them back' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/immigrant_ship.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'freedom_trail',
        name: 'Freedom Trail',
        description: 'The path of freedom through historical sites of struggle and liberation.',
        builderKey: 'freedom_trail',
        topicKeywords: ['abolition', 'underground railroad', 'harriet tubman', 'slavery', 'emancipation', 'reconstruction', 'civil war', 'frederick douglass'],
        tags: ['history', 'social justice', 'american'],
        palette: {
            skyColor: '#040408', fogColor: '#060608', fogDensity: 0.016,
            groundColor: '#100c08', lightColor: '#ffcc88', ambientColor: '#080808', accentColor: '#ffaa44',
        },
        npcs: [
            { archetype: 'abolitionist', role: 'guide', names: ['Harriet Tubman', 'Frederick Douglass', 'Sojourner Truth', 'William Lloyd Garrison'], dialogueStyle: 'brave and determined, fights for freedom at all costs' },
            { archetype: 'conductor', role: 'neutral', names: ['Moses', 'Quaker John', 'Station Master Ruth'], dialogueStyle: 'secretive and selfless, risks everything to help' },
            { archetype: 'slave_catcher', role: 'villain', names: ['Patroller', 'Bounty Hunter', 'The Overseer'], dialogueStyle: 'ruthless and relentless, hunts the freedom-seekers' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/freedom_trail.mp3',
        musicVolume: 0.4,
    },

    // ═══════════════════════════════════════════════
    // SCIENCE
    // ═══════════════════════════════════════════════
    {
        id: 'laboratory',
        name: 'Science Laboratory',
        description: 'A modern science lab with glowing flasks, spinning molecules and holographic screens.',
        builderKey: 'laboratory',
        topicKeywords: ['chemistry', 'science', 'experiments', 'periodic table', 'reactions', 'molecules', 'atoms', 'biology', 'physics', 'lab'],
        tags: ['science', 'education'],
        palette: {
            skyColor: '#040c10', fogColor: '#060e14', fogDensity: 0.012,
            groundColor: '#101818', lightColor: '#aaddff', ambientColor: '#080e10', accentColor: '#40e0ff',
        },
        npcs: [
            { archetype: 'scientist', role: 'guide', names: ['Dr. Curie', 'Dr. Einstein', 'Dr. Newton', 'Dr. Hawking'], dialogueStyle: 'precise and enthusiastic, explains with examples' },
            { archetype: 'lab_assistant', role: 'neutral', names: ['Lab Tech Sam', 'Assistant Alex', 'Intern Jo'], dialogueStyle: 'eager and helpful, always taking notes' },
            { archetype: 'rogue_experiment', role: 'villain', names: ['Mutation', 'Anomaly', 'Error 404'], dialogueStyle: 'unpredictable and dangerous, breaks the rules of science' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/laboratory.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'space_station',
        name: 'Space Station',
        description: 'A futuristic space station orbiting Earth with control panels and observation windows.',
        builderKey: 'space_station',
        topicKeywords: ['space', 'astronomy', 'planets', 'solar system', 'gravity', 'stars', 'nasa', 'black holes', 'telescope', 'iss'],
        tags: ['science', 'space'],
        palette: {
            skyColor: '#000820', fogColor: '#000a28', fogDensity: 0.008,
            groundColor: '#0d1a2a', lightColor: '#ffffff', ambientColor: '#000818', accentColor: '#00c8e0',
        },
        npcs: [
            { archetype: 'astronaut', role: 'guide', names: ['Commander Vega', 'Dr. Orbit', 'Captain Nova', 'Lt. Stellar'], dialogueStyle: 'calm and professional, trained for the unknown' },
            { archetype: 'ai_assistant', role: 'neutral', names: ['HAL', 'ARIA', 'NOVA', 'SAGE'], dialogueStyle: 'logical and helpful, occasionally cryptic' },
            { archetype: 'rogue_ai', role: 'villain', names: ['MALUS', 'CHAOS', 'ZERO'], dialogueStyle: 'cold and calculating, prioritizes mission over crew' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/space_station.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'observatory',
        name: 'Observatory',
        description: 'A domed observatory on a mountaintop with telescopes, star maps and the Milky Way overhead.',
        builderKey: 'observatory',
        topicKeywords: ['astronomy', 'stars', 'constellations', 'telescope', 'galileo', 'copernicus', 'hubble', 'universe', 'light years', 'nebula'],
        tags: ['science', 'astronomy'],
        palette: {
            skyColor: '#020408', fogColor: '#030608', fogDensity: 0.008,
            groundColor: '#080808', lightColor: '#aaaaff', ambientColor: '#040408', accentColor: '#8888ff',
        },
        npcs: [
            { archetype: 'astronomer', role: 'guide', names: ['Galileo', 'Copernicus', 'Hubble', 'Herschel', 'Sagan'], dialogueStyle: 'awestruck and precise, speaks of cosmic scale' },
            { archetype: 'student_astronomer', role: 'neutral', names: ['Young Carl', 'Young Edwin', 'Young Vera'], dialogueStyle: 'curious and passionate, asks great questions' },
            { archetype: 'inquisitor', role: 'villain', names: ['Cardinal Bellarmine', 'The Inquisition', 'Flat Earther'], dialogueStyle: 'dogmatic and threatening, denies evidence' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/observatory.mp3',
        musicVolume: 0.3,
    },

    {
        id: 'deep_sea_lab',
        name: 'Deep Sea Research Station',
        description: 'An underwater research station in the deep ocean trench with pressure windows and sonar.',
        builderKey: 'deep_sea_lab',
        topicKeywords: ['deep sea', 'oceanography', 'pressure', 'hydrothermal vents', 'bioluminescence', 'trench', 'submarine', 'sea floor', 'marine science'],
        tags: ['science', 'ocean', 'technology'],
        palette: {
            skyColor: '#000408', fogColor: '#00060c', fogDensity: 0.028,
            groundColor: '#040c14', lightColor: '#0044ff', ambientColor: '#000408', accentColor: '#0088ff',
        },
        npcs: [
            { archetype: 'deep_sea_researcher', role: 'guide', names: ['Dr. Abyss', 'Dr. Pelagic', 'Dr. Vent', 'Dr. Trench'], dialogueStyle: 'excited by the unknown, methodical and careful' },
            { archetype: 'submarine_pilot', role: 'neutral', names: ['Pilot Nemo', 'Pilot Cousteau', 'Navigator Deep'], dialogueStyle: 'focused and precise, keeps crew safe under pressure' },
            { archetype: 'unknown_creature', role: 'villain', names: ['The Leviathan', 'Abyssal Horror', 'The Unknown'], dialogueStyle: 'alien and incomprehensible, beyond human understanding' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/deep_sea_lab.mp3',
        musicVolume: 0.3,
    },

    {
        id: 'dinosaur_era',
        name: 'Dinosaur Era',
        description: 'The Jurassic/Cretaceous period with towering dinosaurs, fern forests and volcanic activity.',
        builderKey: 'dinosaur_era',
        topicKeywords: ['dinosaurs', 'jurassic', 'cretaceous', 'paleontology', 'fossils', 'tyrannosaurus', 'brachiosaurus', 'extinction', 'prehistoric', 'evolution'],
        tags: ['science', 'prehistory', 'biology'],
        palette: {
            skyColor: '#0a1400', fogColor: '#0d1a00', fogDensity: 0.014,
            groundColor: '#1a2a00', lightColor: '#aaff88', ambientColor: '#0a1400', accentColor: '#88ff44',
        },
        npcs: [
            { archetype: 'paleontologist', role: 'guide', names: ['Dr. Grant', 'Dr. Malcolm', 'Dr. Sattler', 'Dr. Horner'], dialogueStyle: 'fascinated and careful, studies dinosaur behavior' },
            { archetype: 'baby_dinosaur', role: 'neutral', names: ['Rex Jr.', 'Tri', 'Brachi', 'Stego'], dialogueStyle: 'curious and playful, just hatched' },
            { archetype: 'apex_predator', role: 'villain', names: ['T-Rex', 'Spinosaurus', 'Allosaurus', 'Velociraptor'], dialogueStyle: 'primal and territorial, hunts everything' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/dinosaur_era.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'prehistoric_savanna',
        name: 'Prehistoric Savanna',
        description: 'The African savanna of early human history with mammoths, cave lions and early hominin camps.',
        builderKey: 'prehistoric_savanna',
        topicKeywords: ['prehistoric', 'early humans', 'evolution', 'homo sapiens', 'neanderthal', 'stone age', 'hunter gatherer', 'migration', 'africa', 'anthropology'],
        tags: ['science', 'prehistory', 'anthropology'],
        palette: {
            skyColor: '#1a0e00', fogColor: '#2a1800', fogDensity: 0.010,
            groundColor: '#a08040', lightColor: '#ffdd88', ambientColor: '#6a4010', accentColor: '#ff8800',
        },
        npcs: [
            { archetype: 'homo_sapiens', role: 'guide', names: ['Cro-Magnon', 'Wise One', 'Elder Hunter', 'Fire Keeper'], dialogueStyle: 'resourceful and inventive, learning to survive' },
            { archetype: 'neanderthal', role: 'neutral', names: ['Thok', 'Gruk', 'Mara', 'Brak'], dialogueStyle: 'strong and cautious, a different kind of human' },
            { archetype: 'megafauna', role: 'villain', names: ['Mammoth', 'Cave Bear', 'Saber Tooth', 'Cave Lion'], dialogueStyle: 'massive and territorial, rules the prehistoric world' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/prehistoric_savanna.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'fossil_dig',
        name: 'Fossil Excavation Site',
        description: 'An active fossil dig in a canyon with scaffolding, brushes and ancient bones emerging from rock.',
        builderKey: 'fossil_dig',
        topicKeywords: ['fossils', 'paleontology', 'excavation', 'stratigraphy', 'geological time', 'bones', 'dinosaurs', 'evolution', 'rock layers'],
        tags: ['science', 'geology', 'prehistory'],
        palette: {
            skyColor: '#1a1000', fogColor: '#2a1800', fogDensity: 0.010,
            groundColor: '#c4a040', lightColor: '#ffdd88', ambientColor: '#8b6020', accentColor: '#ffcc44',
        },
        npcs: [
            { archetype: 'lead_paleontologist', role: 'guide', names: ['Dr. Bones', 'Prof. Strata', 'Dr. Fossil', 'Dr. Layer'], dialogueStyle: 'meticulous and excited, dates every layer precisely' },
            { archetype: 'field_student', role: 'neutral', names: ['Student Sam', 'Digger Dana', 'Field Worker Fred'], dialogueStyle: 'eager and careful, brushing every detail' },
            { archetype: 'fossil_poacher', role: 'villain', names: ['Black Market Barry', 'Looter Larry', 'The Collector'], dialogueStyle: 'mercenary and impatient, destroys context for profit' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/fossil_dig.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'particle_accelerator',
        name: 'Particle Accelerator',
        description: 'The underground ring of CERN with massive detectors, cooling pipes and particle collision events.',
        builderKey: 'particle_accelerator',
        topicKeywords: ['physics', 'particle physics', 'cern', 'higgs boson', 'protons', 'electrons', 'quantum mechanics', 'standard model', 'dark matter', 'string theory'],
        tags: ['science', 'physics', 'technology'],
        palette: {
            skyColor: '#020408', fogColor: '#040608', fogDensity: 0.018,
            groundColor: '#080c10', lightColor: '#aaddff', ambientColor: '#040608', accentColor: '#00aaff',
        },
        npcs: [
            { archetype: 'physicist', role: 'guide', names: ['Dr. Higgs', 'Dr. Bohr', 'Dr. Feynman', 'Dr. Curie'], dialogueStyle: 'abstract and brilliant, explains the invisible world' },
            { archetype: 'engineer', role: 'neutral', names: ['Engineer Eva', 'Tech Tom', 'Systems Sara'], dialogueStyle: 'practical and precise, keeps the machine running' },
            { archetype: 'anomaly', role: 'villain', names: ['Singularity', 'Dark Matter', 'The Unknown Particle'], dialogueStyle: 'inexplicable and destabilizing, breaks current models' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/particle_accelerator.mp3',
        musicVolume: 0.3,
    },

    // ═══════════════════════════════════════════════
    // ART & CULTURE
    // ═══════════════════════════════════════════════
    {
        id: 'renaissance_workshop',
        name: 'Renaissance Workshop',
        description: 'An Italian Renaissance artist\'s workshop with canvases, sculptures and the smell of oil paint.',
        builderKey: 'renaissance_workshop',
        topicKeywords: ['renaissance', 'da vinci', 'michelangelo', 'raphael', 'florence', 'painting', 'sculpture', 'humanism', 'perspective', 'italy', 'art history'],
        tags: ['art', 'history', 'culture'],
        palette: {
            skyColor: '#0a0800', fogColor: '#141008', fogDensity: 0.012,
            groundColor: '#2a1e10', lightColor: '#ffdd88', ambientColor: '#1a1408', accentColor: '#d4a020',
        },
        npcs: [
            { archetype: 'renaissance_master', role: 'guide', names: ['Leonardo', 'Michelangelo', 'Raphael', 'Botticelli', 'Donatello'], dialogueStyle: 'visionary and meticulous, sees beauty in everything' },
            { archetype: 'medici_patron', role: 'neutral', names: ['Lorenzo de Medici', 'Francesco Sforza', 'Pope Julius'], dialogueStyle: 'wealthy and discerning, commissions great works' },
            { archetype: 'rival_artist', role: 'villain', names: ['Torrigiani', 'Perugino the Jealous', 'The Forger'], dialogueStyle: 'envious and petty, undermines genius' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/renaissance_workshop.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'impressionist_garden',
        name: 'Impressionist Garden',
        description: 'A sun-dappled garden straight from a Monet painting with water lilies and dappled light.',
        builderKey: 'impressionist_garden',
        topicKeywords: ['impressionism', 'monet', 'renoir', 'degas', 'pissarro', 'paris', 'light', 'color', 'plein air', 'post impressionism', 'van gogh', 'seurat'],
        tags: ['art', 'culture', 'history'],
        palette: {
            skyColor: '#080a18', fogColor: '#0c0e20', fogDensity: 0.008,
            groundColor: '#0a1a05', lightColor: '#ffeeaa', ambientColor: '#080e08', accentColor: '#aaffaa',
        },
        npcs: [
            { archetype: 'impressionist_painter', role: 'guide', names: ['Monet', 'Renoir', 'Degas', 'Pissarro', 'Berthe Morisot'], dialogueStyle: 'lyrical and sensitive, captures fleeting moments' },
            { archetype: 'art_critic', role: 'neutral', names: ['Critic Durand', 'Monsieur Rivière', 'Mademoiselle Cassatt'], dialogueStyle: 'opinionated but fair, defines movements with words' },
            { archetype: 'academic_painter', role: 'villain', names: ['Academic Cabanel', 'Salon Jury', 'Traditionalist'], dialogueStyle: 'rigid and dismissive, rejects innovation' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/impressionist_garden.mp3',
        musicVolume: 0.35,
    },

    {
        id: 'baroque_palace',
        name: 'Baroque Palace',
        description: 'The opulent gilded halls of a Baroque palace with dramatic paintings and harpsichord music.',
        builderKey: 'baroque_palace',
        topicKeywords: ['baroque', 'rembrandt', 'caravaggio', 'versailles', 'louis xiv', 'rubens', '17th century', 'chiaroscuro', 'absolutism', 'dutch golden age'],
        tags: ['art', 'history', 'culture'],
        palette: {
            skyColor: '#080400', fogColor: '#100800', fogDensity: 0.014,
            groundColor: '#1a1400', lightColor: '#ffcc66', ambientColor: '#100800', accentColor: '#d4a020',
        },
        npcs: [
            { archetype: 'baroque_master', role: 'guide', names: ['Rembrandt', 'Caravaggio', 'Rubens', 'Velázquez', 'Vermeer'], dialogueStyle: 'dramatic and intense, master of light and shadow' },
            { archetype: 'court_musician', role: 'neutral', names: ['Bach', 'Handel', 'Vivaldi', 'Purcell'], dialogueStyle: 'precise and passionate, creates mathematical beauty' },
            { archetype: 'absolute_monarch', role: 'villain', names: ['Louis XIV', 'Philip IV', 'Charles II'], dialogueStyle: 'vain and extravagant, demands total adulation' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/baroque_palace.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'abstract_art_studio',
        name: 'Abstract Art Studio',
        description: 'A New York loft studio of a mid-century abstract expressionist with drip paintings and bold canvases.',
        builderKey: 'abstract_art_studio',
        topicKeywords: ['abstract art', 'modern art', 'pollock', 'kandinsky', 'mondrian', 'bauhaus', 'abstract expressionism', 'cubism', 'picasso', 'contemporary art'],
        tags: ['art', 'modern', 'culture'],
        palette: {
            skyColor: '#080808', fogColor: '#0a0a0a', fogDensity: 0.010,
            groundColor: '#101010', lightColor: '#ffffff', ambientColor: '#080808', accentColor: '#ff4444',
        },
        npcs: [
            { archetype: 'abstract_artist', role: 'guide', names: ['Pollock', 'Rothko', 'de Kooning', 'Kline', 'Frankenthaler'], dialogueStyle: 'emotional and expressive, paints from the unconscious' },
            { archetype: 'art_dealer', role: 'neutral', names: ['Peggy Guggenheim', 'Leo Castelli', 'Betty Parsons'], dialogueStyle: 'shrewd and visionary, spots genius early' },
            { archetype: 'philistine', role: 'villain', names: ['My Kid Could Do That', 'The Skeptic', 'Senator Dondero'], dialogueStyle: 'dismissive and anti-intellectual, fears the new' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/abstract_art_studio.mp3',
        musicVolume: 0.35,
    },

    {
        id: 'surrealist_dreamscape',
        name: 'Surrealist Dreamscape',
        description: 'A melting, impossible landscape straight from a Dalí painting — clocks drip, elephants float.',
        builderKey: 'surrealist_dreamscape',
        topicKeywords: ['surrealism', 'dali', 'magritte', 'freud', 'unconscious', 'dreamscape', 'surrealist', 'rene magritte', 'salvador dali', 'frida kahlo'],
        tags: ['art', 'modern', 'psychology'],
        palette: {
            skyColor: '#080a1a', fogColor: '#0c0e20', fogDensity: 0.012,
            groundColor: '#1a1028', lightColor: '#ffaaff', ambientColor: '#0c0818', accentColor: '#ff88ff',
        },
        npcs: [
            { archetype: 'surrealist_artist', role: 'guide', names: ['Dalí', 'Magritte', 'Ernst', 'de Chirico', 'Frida'], dialogueStyle: 'poetic and irrational, blends dream with reality' },
            { archetype: 'analyst', role: 'neutral', names: ['Dr. Freud', 'Dr. Jung', 'Dr. Dream'], dialogueStyle: 'analytical and probing, interprets the unconscious' },
            { archetype: 'nightmare', role: 'villain', names: ['The Shadow', 'Anima', 'The Id'], dialogueStyle: 'threatening and symbolic, embodies repressed fears' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/surrealist_dreamscape.mp3',
        musicVolume: 0.35,
    },

    {
        id: 'graffiti_district',
        name: 'Graffiti District',
        description: 'A vibrant urban neighbourhood covered in murals, street art and the sounds of hip-hop.',
        builderKey: 'graffiti_district',
        topicKeywords: ['street art', 'graffiti', 'banksy', 'hip hop', 'urban culture', 'basquiat', 'kaws', 'contemporary art', 'protest art'],
        tags: ['art', 'contemporary', 'culture'],
        palette: {
            skyColor: '#040408', fogColor: '#060608', fogDensity: 0.010,
            groundColor: '#101010', lightColor: '#ffffff', ambientColor: '#080808', accentColor: '#ff4422',
        },
        npcs: [
            { archetype: 'street_artist', role: 'guide', names: ['Banksy', 'Basquiat', 'Shepard', 'Os Gemeos', 'Invader'], dialogueStyle: 'provocative and witty, art is protest' },
            { archetype: 'local_kid', role: 'neutral', names: ['Tag', 'Spraycan', 'Marker', 'Stencil'], dialogueStyle: 'energetic and creative, learning from the masters' },
            { archetype: 'authority', role: 'villain', names: ['Council Worker', 'The Developer', 'Gentrifier'], dialogueStyle: 'bureaucratic and philistine, paints over murals' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/graffiti_district.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'pottery_workshop',
        name: 'Pottery Workshop',
        description: 'A clay-covered workshop with spinning wheels, kilns and glazed ceramics drying on shelves.',
        builderKey: 'pottery_workshop',
        topicKeywords: ['pottery', 'ceramics', 'clay', 'craft', 'japanese pottery', 'greek pottery', 'art', 'making', 'creation', 'sculpture'],
        tags: ['art', 'craft', 'culture'],
        palette: {
            skyColor: '#080400', fogColor: '#100800', fogDensity: 0.014,
            groundColor: '#2a1800', lightColor: '#ffdd88', ambientColor: '#141008', accentColor: '#cc6622',
        },
        npcs: [
            { archetype: 'master_potter', role: 'guide', names: ['Hamada', 'Bernard Leach', 'Lucie Rie', 'Hans Coper'], dialogueStyle: 'patient and meditative, finds beauty in imperfection' },
            { archetype: 'apprentice', role: 'neutral', names: ['Clay Hand', 'Young Wheel', 'Glaze Student'], dialogueStyle: 'clumsy but passionate, learning through feel' },
            { archetype: 'critic', role: 'villain', names: ['The Traditionalist', 'Museum Snob', 'Commercial Buyer'], dialogueStyle: 'prescriptive and limiting, judges by rigid standards' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/pottery_workshop.mp3',
        musicVolume: 0.3,
    },

    // ═══════════════════════════════════════════════
    // LITERATURE & PERFORMANCE
    // ═══════════════════════════════════════════════
    {
        id: 'library',
        name: 'Grand Library',
        description: 'A cathedral-like library with towering shelves, reading tables and candlelit alcoves.',
        builderKey: 'library',
        topicKeywords: ['literature', 'reading', 'books', 'writing', 'authors', 'library', 'novel', 'poetry', 'grammar', 'language', 'literacy'],
        tags: ['literature', 'education'],
        palette: {
            skyColor: '#0a0800', fogColor: '#141008', fogDensity: 0.014,
            groundColor: '#2a1a00', lightColor: '#ffdd88', ambientColor: '#1a1008', accentColor: '#d4a020',
        },
        npcs: [
            { archetype: 'librarian', role: 'guide', names: ['Librarian Rose', 'Keeper of Books', 'Archivist Miles'], dialogueStyle: 'helpful and knowledgeable, a guide through knowledge' },
            { archetype: 'author', role: 'neutral', names: ['Shakespeare', 'Austen', 'Dickens', 'Tolstoy', 'Woolf'], dialogueStyle: 'observant and eloquent, sees the human condition' },
            { archetype: 'book_burner', role: 'villain', names: ['The Censor', 'Fahrenheit', 'The Inquisitor'], dialogueStyle: 'fearful and destructive, destroys what it cannot control' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/library.mp3',
        musicVolume: 0.3,
    },

    {
        id: 'theater_stage',
        name: 'Elizabethan Theatre',
        description: 'The Globe Theatre stage with wooden galleries, trapdoors and theatrical magic.',
        builderKey: 'theater_stage',
        topicKeywords: ['shakespeare', 'drama', 'theatre', 'hamlet', 'romeo and juliet', 'macbeth', 'elizabethan', 'tragedy', 'comedy', 'acting', 'performance'],
        tags: ['literature', 'performance', 'history'],
        palette: {
            skyColor: '#060408', fogColor: '#0a080c', fogDensity: 0.014,
            groundColor: '#1a1408', lightColor: '#ffcc88', ambientColor: '#0c0808', accentColor: '#cc4422',
        },
        npcs: [
            { archetype: 'playwright', role: 'guide', names: ['Shakespeare', 'Marlowe', 'Jonson', 'Webster'], dialogueStyle: 'eloquent and dramatic, speaks in verse and metaphor' },
            { archetype: 'lead_actor', role: 'neutral', names: ['Richard Burbage', 'Edward Alleyn', 'Will Kempe'], dialogueStyle: 'theatrical and larger than life, always performing' },
            { archetype: 'villain_character', role: 'villain', names: ['Iago', 'Richard III', 'Macbeth', 'Shylock'], dialogueStyle: 'scheming and eloquent, the best lines go to villains' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/theater_stage.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'poetry_cafe',
        name: 'Beat Poetry Café',
        description: 'A dimly lit 1950s Beat Generation café in San Francisco with bongo drums and spoken word.',
        builderKey: 'poetry_cafe',
        topicKeywords: ['poetry', 'beat generation', 'kerouac', 'ginsberg', 'sylvia plath', 'spoken word', 'contemporary poetry', 'creative writing', 'metaphor', 'imagery'],
        tags: ['literature', 'contemporary', 'culture'],
        palette: {
            skyColor: '#040404', fogColor: '#060606', fogDensity: 0.016,
            groundColor: '#0a0808', lightColor: '#ffcc88', ambientColor: '#080606', accentColor: '#cc8844',
        },
        npcs: [
            { archetype: 'beat_poet', role: 'guide', names: ['Kerouac', 'Ginsberg', 'Ferlinghetti', 'di Prima', 'Baraka'], dialogueStyle: 'spontaneous and raw, poetry as jazz improvisation' },
            { archetype: 'jazz_musician', role: 'neutral', names: ['Miles', 'Coltrane', 'Bird', 'Monk', 'Dizzy'], dialogueStyle: 'cool and non-verbal, speaks through music' },
            { archetype: 'conformist', role: 'villain', names: ['The Squares', 'McCarthyism', 'The Establishment'], dialogueStyle: 'repressive and suspicious, fears creativity' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/poetry_cafe.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'music_hall',
        name: 'Concert Hall',
        description: 'A grand concert hall across different eras — from classical to jazz to rock.',
        builderKey: 'music_hall',
        topicKeywords: ['music', 'classical music', 'beethoven', 'mozart', 'jazz', 'rock', 'music history', 'orchestra', 'rhythm', 'harmony', 'music theory'],
        tags: ['music', 'culture', 'history'],
        palette: {
            skyColor: '#040408', fogColor: '#06060c', fogDensity: 0.012,
            groundColor: '#100c08', lightColor: '#ffcc88', ambientColor: '#080608', accentColor: '#cc8844',
        },
        npcs: [
            { archetype: 'composer', role: 'guide', names: ['Beethoven', 'Mozart', 'Bach', 'Chopin', 'Brahms'], dialogueStyle: 'passionate and tormented, hears music in everything' },
            { archetype: 'conductor', role: 'neutral', names: ['Maestro', 'Conductor Clara', 'Director Anton'], dialogueStyle: 'precise and expressive, shapes the sound of many' },
            { archetype: 'music_critic', role: 'villain', names: ['Hanslick', 'The Bad Review', 'Tone Deaf'], dialogueStyle: 'harsh and dismissive, misses the emotional point' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/music_hall.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'opera_house',
        name: 'Opera House',
        description: 'A lavish 19th century opera house with red velvet, chandeliers and dramatic arias.',
        builderKey: 'opera_house',
        topicKeywords: ['opera', 'verdi', 'puccini', 'wagner', 'performance', 'theater', 'italy', 'music', 'soprano', 'tenor', 'aria'],
        tags: ['music', 'art', 'history'],
        palette: {
            skyColor: '#040208', fogColor: '#06030c', fogDensity: 0.012,
            groundColor: '#100808', lightColor: '#ffcc66', ambientColor: '#080408', accentColor: '#cc2244',
        },
        npcs: [
            { archetype: 'opera_singer', role: 'guide', names: ['Caruso', 'Callas', 'Pavarotti', 'Sutherland'], dialogueStyle: 'dramatic and expressive, everything is heightened emotion' },
            { archetype: 'prompter', role: 'neutral', names: ['Prompter Luigi', 'Souffleur Jean', 'Cue Master'], dialogueStyle: 'whispered and urgent, the invisible helper' },
            { archetype: 'phantom', role: 'villain', names: ['The Phantom', 'Erik', 'The Shadow Tenor'], dialogueStyle: 'obsessive and brilliant, lurks in the darkness' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/opera_house.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'printing_press',
        name: 'Gutenberg Press Room',
        description: 'A 15th century print shop with movable type, ink-stained workers and fresh pamphlets.',
        builderKey: 'printing_press',
        topicKeywords: ['gutenberg', 'printing press', 'reformation', 'martin luther', 'information revolution', 'books', 'literacy', 'renaissance', 'media', 'communication'],
        tags: ['history', 'technology', 'literature'],
        palette: {
            skyColor: '#080400', fogColor: '#100800', fogDensity: 0.016,
            groundColor: '#1a1000', lightColor: '#ffcc88', ambientColor: '#100800', accentColor: '#cc8822',
        },
        npcs: [
            { archetype: 'printer', role: 'guide', names: ['Gutenberg', 'Caxton', 'Aldus Manutius', 'Fust'], dialogueStyle: 'precise and revolutionary, changes the world one page at a time' },
            { archetype: 'reformer', role: 'neutral', names: ['Luther', 'Erasmus', 'Calvin', 'Tyndale'], dialogueStyle: 'urgent and brave, uses the press as a weapon of truth' },
            { archetype: 'censor', role: 'villain', names: ['The Inquisitor', 'Index Librorum', 'The Bishop'], dialogueStyle: 'fearful and controlling, burns what it cannot ban' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/printing_press.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'storytellers_fire',
        name: 'Storyteller\'s Fire',
        description: 'An ancient circle of storytellers around a fire, passing oral traditions through the generations.',
        builderKey: 'storytellers_fire',
        topicKeywords: ['oral tradition', 'folklore', 'mythology', 'storytelling', 'aboriginal', 'african stories', 'native american', 'fairy tales', 'fables', 'griots'],
        tags: ['literature', 'culture', 'history'],
        palette: {
            skyColor: '#040204', fogColor: '#060304', fogDensity: 0.016,
            groundColor: '#101008', lightColor: '#ff8822', ambientColor: '#080604', accentColor: '#ff6622',
        },
        npcs: [
            { archetype: 'griot', role: 'guide', names: ['Elder Song', 'Memory Keeper', 'Voice of Ancestors', 'Griot Kouyaté'], dialogueStyle: 'rhythmic and wise, carries the history of generations' },
            { archetype: 'young_listener', role: 'neutral', names: ['Young Ears', 'First Child', 'Apprentice Memory'], dialogueStyle: 'wide-eyed and attentive, learning the old ways' },
            { archetype: 'forgetting', role: 'villain', names: ['Silence', 'The Written Word Killer', 'Colonial Tongue'], dialogueStyle: 'erasing and silencing, destroys oral tradition' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/storytellers_fire.mp3',
        musicVolume: 0.4,
    },

    // ═══════════════════════════════════════════════
    // CONTEMPORARY
    // ═══════════════════════════════════════════════
    {
        id: 'contemporary_city',
        name: 'Contemporary City',
        description: 'A modern urban environment with glass towers, busy streets and digital billboards.',
        builderKey: 'contemporary_city',
        topicKeywords: ['modern history', 'current events', 'globalization', 'urbanization', 'social media', 'democracy', 'climate policy', 'economics', 'politics'],
        tags: ['contemporary', 'social', 'geography'],
        palette: {
            skyColor: '#040810', fogColor: '#060a14', fogDensity: 0.010,
            groundColor: '#101014', lightColor: '#aaddff', ambientColor: '#060808', accentColor: '#00aaff',
        },
        npcs: [
            { archetype: 'journalist', role: 'guide', names: ['Reporter Sam', 'Anchor Maya', 'Investigator Jo'], dialogueStyle: 'objective and inquisitive, follows the facts' },
            { archetype: 'activist', role: 'neutral', names: ['Greta', 'Malala', 'Climate Alex', 'Justice Maya'], dialogueStyle: 'passionate and urgent, demands change now' },
            { archetype: 'politician', role: 'villain', names: ['Spin Doctor', 'The Lobby', 'Corporate Voice'], dialogueStyle: 'evasive and polished, says much but means little' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/contemporary_city.mp3',
        musicVolume: 0.35,
    },

    {
        id: 'futuristic_city',
        name: 'Futuristic City',
        description: 'A neon-lit megacity of the future with flying vehicles, AI assistants and holographic displays.',
        builderKey: 'futuristic_city',
        topicKeywords: ['technology', 'ai', 'coding', 'future', 'automation', 'robotics', 'machine learning', 'internet', 'cybersecurity', 'innovation'],
        tags: ['technology', 'contemporary', 'science'],
        palette: {
            skyColor: '#020408', fogColor: '#040608', fogDensity: 0.010,
            groundColor: '#080c10', lightColor: '#00ccff', ambientColor: '#040608', accentColor: '#00c8e0',
        },
        npcs: [
            { archetype: 'tech_genius', role: 'guide', names: ['Dr. Neural', 'Engineer Aria', 'Coder Max', 'Dev Priya'], dialogueStyle: 'fast-talking and visionary, thinks in systems' },
            { archetype: 'ai_companion', role: 'neutral', names: ['ARIA', 'NOVA', 'SAGE', 'IRIS'], dialogueStyle: 'helpful and curious, learning what it means to exist' },
            { archetype: 'hacker', role: 'villain', names: ['Zero Day', 'Blackhat', 'The Ghost', 'Exploit'], dialogueStyle: 'anarchic and brilliant, breaks systems for power' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/futuristic_city.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'space_colony',
        name: 'Space Colony',
        description: 'A colony dome on Mars or the Moon with hydroponic farms, airlocks and Earth visible outside.',
        builderKey: 'space_colony',
        topicKeywords: ['space colonization', 'mars', 'moon', 'elon musk', 'spacex', 'nasa', 'terraforming', 'future', 'habitat', 'astronaut'],
        tags: ['science', 'future', 'technology'],
        palette: {
            skyColor: '#020204', fogColor: '#040408', fogDensity: 0.014,
            groundColor: '#2a1a10', lightColor: '#ffeecc', ambientColor: '#0a0808', accentColor: '#ff8844',
        },
        npcs: [
            { archetype: 'colony_commander', role: 'guide', names: ['Commander Vega', 'Director Mars', 'Chief Aldrin'], dialogueStyle: 'pragmatic and brave, building civilization from scratch' },
            { archetype: 'terraformer', role: 'neutral', names: ['Botanist Bloom', 'Atmo Engineer', 'Bio System Sara'], dialogueStyle: 'patient and methodical, making a dead world live' },
            { archetype: 'earth_corporation', role: 'villain', names: ['MegaCorp', 'The Investor', 'Profit Motive'], dialogueStyle: 'exploitative and short-sighted, treats the colony as a mine' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/space_colony.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'cyberpunk_alley',
        name: 'Cyberpunk Alley',
        description: 'A rain-soaked neon alley in a cyberpunk megacity with hackers, androids and corporate surveillance.',
        builderKey: 'cyberpunk_alley',
        topicKeywords: ['cyberpunk', 'dystopia', 'surveillance', 'corporations', 'hacking', 'privacy', 'social media', 'identity', 'technology ethics', 'philip k dick'],
        tags: ['technology', 'culture', 'contemporary'],
        palette: {
            skyColor: '#020208', fogColor: '#040410', fogDensity: 0.020,
            groundColor: '#080810', lightColor: '#ff44aa', ambientColor: '#040408', accentColor: '#ff00aa',
        },
        npcs: [
            { archetype: 'street_hacker', role: 'guide', names: ['Ghost', 'Cipher', 'Pixel', 'Neon', 'Glitch'], dialogueStyle: 'paranoid and brilliant, trusts no one and no system' },
            { archetype: 'android', role: 'neutral', names: ['Unit 7', 'Replicant 3', 'Nexus 6', 'Blade'], dialogueStyle: 'eerily calm and logical, questions its own existence' },
            { archetype: 'megacorp_agent', role: 'villain', names: ['Agent Smith', 'Overseer', 'The Algorithm'], dialogueStyle: 'efficient and ruthless, corporate interests above all' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/cyberpunk_alley.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'eco_village',
        name: 'Eco Village',
        description: 'A sustainable off-grid community with solar panels, permaculture gardens and wind turbines.',
        builderKey: 'eco_village',
        topicKeywords: ['sustainability', 'environment', 'renewable energy', 'climate change', 'permaculture', 'ecology', 'carbon footprint', 'green energy', 'biodiversity'],
        tags: ['science', 'contemporary', 'geography'],
        palette: {
            skyColor: '#040c08', fogColor: '#060e0a', fogDensity: 0.008,
            groundColor: '#1a2a10', lightColor: '#aaff88', ambientColor: '#060e06', accentColor: '#44dd44',
        },
        npcs: [
            { archetype: 'environmentalist', role: 'guide', names: ['Dr. Green', 'Eco Maya', 'Ranger Sam', 'Permaculture Pete'], dialogueStyle: 'passionate and practical, lives the values' },
            { archetype: 'community_farmer', role: 'neutral', names: ['Farmer Sol', 'Grower Grace', 'Seed Keeper'], dialogueStyle: 'grounded and patient, works with nature not against it' },
            { archetype: 'developer', role: 'villain', names: ['Bulldozer Bill', 'Oil Lobby', 'The Driller'], dialogueStyle: 'short-sighted and profit-driven, destroys ecosystems' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/eco_village.mp3',
        musicVolume: 0.35,
    },

    {
        id: 'news_room',
        name: 'News Room',
        description: 'A busy modern newsroom with multiple screens, breaking news banners and journalists on deadline.',
        builderKey: 'news_room',
        topicKeywords: ['media', 'journalism', 'news', 'press freedom', 'fake news', 'social media', 'propaganda', 'first amendment', 'democracy', 'communications'],
        tags: ['contemporary', 'social', 'communications'],
        palette: {
            skyColor: '#040408', fogColor: '#060608', fogDensity: 0.010,
            groundColor: '#0a0a0c', lightColor: '#ffffff', ambientColor: '#060608', accentColor: '#4444ff',
        },
        npcs: [
            { archetype: 'editor', role: 'guide', names: ['Editor Chief', 'Managing Director', 'Bureau Head'], dialogueStyle: 'decisive and principled, deadline is everything' },
            { archetype: 'investigative_journalist', role: 'neutral', names: ['Woodward', 'Bernstein', 'Murrow', 'Amanpour'], dialogueStyle: 'tenacious and ethical, truth at any cost' },
            { archetype: 'propaganda_machine', role: 'villain', names: ['Fake News', 'The Spin', 'Disinformation'], dialogueStyle: 'persuasive and deceptive, weaponizes information' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/news_room.mp3',
        musicVolume: 0.35,
    },

    // ═══════════════════════════════════════════════
    // FANTASY & MYTHOLOGY
    // ═══════════════════════════════════════════════
    {
        id: 'enchanted_forest',
        name: 'Enchanted Forest',
        description: 'A magical glowing forest with talking trees, fairy lights and ancient mystical energy.',
        builderKey: 'enchanted_forest',
        topicKeywords: ['mythology', 'fantasy', 'fairy tales', 'folklore', 'magic', 'legend', 'tolkien', 'fairy', 'wizard', 'enchantment'],
        tags: ['fantasy', 'literature', 'culture'],
        palette: {
            skyColor: '#040a04', fogColor: '#060e06', fogDensity: 0.018,
            groundColor: '#0a1a05', lightColor: '#aaffaa', ambientColor: '#060c06', accentColor: '#88ff88',
        },
        npcs: [
            { archetype: 'forest_wizard', role: 'guide', names: ['Merlin', 'Gandalf', 'Radagast', 'Sylvanus'], dialogueStyle: 'wise and whimsical, speaks in riddles and wonder' },
            { archetype: 'forest_fairy', role: 'neutral', names: ['Titania', 'Puck', 'Tinker', 'Ariel', 'Oberon'], dialogueStyle: 'mischievous and magical, bends the rules of nature' },
            { archetype: 'dark_witch', role: 'villain', names: ['Morgana', 'Maleficent', 'Baba Yaga', 'The Crone'], dialogueStyle: 'cunning and ancient, twists magic for dark ends' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/enchanted_forest.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'dragon_lair',
        name: 'Dragon\'s Lair',
        description: 'A cavernous mountain lair filled with dragon treasure, ancient bones and billowing smoke.',
        builderKey: 'dragon_lair',
        topicKeywords: ['dragons', 'mythology', 'fantasy', 'medieval', 'legend', 'gold', 'fire', 'dungeons and dragons', 'heraldry'],
        tags: ['fantasy', 'mythology'],
        palette: {
            skyColor: '#0a0200', fogColor: '#140400', fogDensity: 0.022,
            groundColor: '#1a0800', lightColor: '#ff4400', ambientColor: '#0e0400', accentColor: '#ff4400',
        },
        npcs: [
            { archetype: 'ancient_dragon', role: 'guide', names: ['Smaug', 'Ancalagon', 'Fafnir', 'Tiamat', 'Nidhogg'], dialogueStyle: 'ancient and proud, speaks in riddles and boasts of hoard' },
            { archetype: 'dragon_knight', role: 'neutral', names: ['Dragonrider Kira', 'Scale Guard', 'Wyrmborn'], dialogueStyle: 'bonded and fearless, guardian of dragon secrets' },
            { archetype: 'dragon_slayer', role: 'villain', names: ['Saint George', 'Sigurd', 'Beowulf', 'The Hunter'], dialogueStyle: 'glory-seeking and dangerous, threatens the natural order' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/dragon_lair.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'olympus',
        name: 'Mount Olympus',
        description: 'The cloud-wreathed home of the Greek gods with marble temples and divine drama.',
        builderKey: 'olympus',
        topicKeywords: ['greek mythology', 'zeus', 'athena', 'apollo', 'hercules', 'olympus', 'gods', 'titans', 'myth', 'heroes'],
        tags: ['mythology', 'history', 'fantasy'],
        palette: {
            skyColor: '#040814', fogColor: '#060a18', fogDensity: 0.008,
            groundColor: '#c8c8c0', lightColor: '#ffffff', ambientColor: '#080c18', accentColor: '#ffdd44',
        },
        npcs: [
            { archetype: 'olympian_god', role: 'guide', names: ['Zeus', 'Athena', 'Apollo', 'Hermes', 'Artemis'], dialogueStyle: 'divine and capricious, all-powerful but deeply flawed' },
            { archetype: 'hero', role: 'neutral', names: ['Hercules', 'Perseus', 'Odysseus', 'Theseus', 'Achilles'], dialogueStyle: 'brave and determined, mortal among immortals' },
            { archetype: 'titan', role: 'villain', names: ['Kronos', 'Atlas', 'Prometheus', 'Typhon'], dialogueStyle: 'ancient and powerful, predates the gods themselves' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/olympus.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'underworld',
        name: 'The Underworld',
        description: 'The realm of the dead from multiple mythologies — Hades, the River Styx and the judges of souls.',
        builderKey: 'underworld',
        topicKeywords: ['mythology', 'afterlife', 'death', 'hades', 'persephone', 'dante', 'inferno', 'egyptian afterlife', 'norse hel', 'underworld myths'],
        tags: ['mythology', 'literature', 'culture'],
        palette: {
            skyColor: '#020204', fogColor: '#040408', fogDensity: 0.025,
            groundColor: '#080808', lightColor: '#4444ff', ambientColor: '#040408', accentColor: '#4444ff',
        },
        npcs: [
            { archetype: 'death_deity', role: 'guide', names: ['Hades', 'Osiris', 'Anubis', 'Mictlantecuhtli', 'Hel'], dialogueStyle: 'cold and impartial, judges all souls equally' },
            { archetype: 'ferryman', role: 'neutral', names: ['Charon', 'Hermes Psychopomp', 'The Guide'], dialogueStyle: 'ancient and silent, carries souls across the river' },
            { archetype: 'monster', role: 'villain', names: ['Cerberus', 'Medusa', 'Hydra', 'The Furies'], dialogueStyle: 'terrifying and loyal, guards the borders of death' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/underworld.mp3',
        musicVolume: 0.3,
    },

    {
        id: 'fairy_ring',
        name: 'Fairy Ring',
        description: 'A moonlit meadow with a ring of glowing mushrooms and dancing fairies.',
        builderKey: 'fairy_ring',
        topicKeywords: ['fairy tales', 'folklore', 'celtic mythology', 'fae', 'nature spirits', 'irish mythology', 'midsummer', 'magic', 'enchantment'],
        tags: ['fantasy', 'folklore', 'literature'],
        palette: {
            skyColor: '#020408', fogColor: '#030608', fogDensity: 0.016,
            groundColor: '#0a1a05', lightColor: '#aaffcc', ambientColor: '#040808', accentColor: '#88ffaa',
        },
        npcs: [
            { archetype: 'fairy_queen', role: 'guide', names: ['Titania', 'Mab', 'Áine', 'Nuala', 'Cliodhna'], dialogueStyle: 'ethereal and capricious, enchanting and dangerous' },
            { archetype: 'nature_sprite', role: 'neutral', names: ['Will-o-Wisp', 'Foxfire', 'Dewdrop', 'Petal'], dialogueStyle: 'playful and curious, innocent but mischievous' },
            { archetype: 'goblin', role: 'villain', names: ['Redcap', 'Boggart', 'Pooka', 'Hobgoblin'], dialogueStyle: 'greedy and tricksy, causes chaos for fun' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/fairy_ring.mp3',
        musicVolume: 0.35,
    },

    {
        id: 'crystal_cave',
        name: 'Crystal Cave',
        description: 'A breathtaking cave of giant crystal formations with magical resonance and ancient power.',
        builderKey: 'crystal_cave',
        topicKeywords: ['crystals', 'minerals', 'geology', 'magic', 'mythology', 'earth science', 'gemstones', 'caves', 'underground'],
        tags: ['science', 'fantasy', 'geology'],
        palette: {
            skyColor: '#020208', fogColor: '#040410', fogDensity: 0.020,
            groundColor: '#080c14', lightColor: '#aaaaff', ambientColor: '#040408', accentColor: '#8888ff',
        },
        npcs: [
            { archetype: 'crystal_sage', role: 'guide', names: ['Amethyst', 'Crystal Keeper', 'Gem Oracle', 'Quartz'], dialogueStyle: 'resonant and ancient, wisdom vibrates in every word' },
            { archetype: 'cave_explorer', role: 'neutral', names: ['Spelunker Sam', 'Crystal Clara', 'Geologist Jake'], dialogueStyle: 'scientific and awed, measures and marvels equally' },
            { archetype: 'crystal_thief', role: 'villain', names: ['Black Market Miner', 'The Extractor', 'Greed'], dialogueStyle: 'covetous and destructive, harvests what should be left alone' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/crystal_cave.mp3',
        musicVolume: 0.35,
    },

    // ═══════════════════════════════════════════════
    // OTHER
    // ═══════════════════════════════════════════════
    {
        id: 'marketplace',
        name: 'Global Marketplace',
        description: 'A vibrant global market where cultures trade goods, ideas and stories.',
        builderKey: 'marketplace',
        topicKeywords: ['economics', 'trade', 'supply and demand', 'globalization', 'markets', 'money', 'commerce', 'business', 'entrepreneurship'],
        tags: ['economics', 'social', 'geography'],
        palette: {
            skyColor: '#080c10', fogColor: '#0a0e14', fogDensity: 0.010,
            groundColor: '#2a2010', lightColor: '#ffdd88', ambientColor: '#0c0c10', accentColor: '#d4a020',
        },
        npcs: [
            { archetype: 'merchant', role: 'guide', names: ['Trader Rosa', 'Merchant Khan', 'Dealer Li', 'Vendor Amara'], dialogueStyle: 'persuasive and worldly, knows the value of everything' },
            { archetype: 'craftsperson', role: 'neutral', names: ['Weaver', 'Potter', 'Blacksmith', 'Spice Trader'], dialogueStyle: 'skilled and proud, quality is everything' },
            { archetype: 'monopolist', role: 'villain', names: ['The Trust', 'Big Corp', 'The Cartel'], dialogueStyle: 'controlling and greedy, corners every market' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/marketplace.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'sports_arena',
        name: 'Sports Arena',
        description: 'A modern sports arena spanning multiple Olympic disciplines and sports history.',
        builderKey: 'sports_arena',
        topicKeywords: ['sports', 'olympics', 'athletics', 'history of sport', 'physical education', 'teamwork', 'competition', 'world cup', 'champion', 'records'],
        tags: ['sports', 'contemporary', 'history'],
        palette: {
            skyColor: '#040810', fogColor: '#060a14', fogDensity: 0.008,
            groundColor: '#1a2800', lightColor: '#ffffff', ambientColor: '#060c08', accentColor: '#00cc44',
        },
        npcs: [
            { archetype: 'champion_athlete', role: 'guide', names: ['Jesse Owens', 'Usain Bolt', 'Muhammad Ali', 'Serena', 'Pelé'], dialogueStyle: 'confident and inspiring, defies limits' },
            { archetype: 'coach', role: 'neutral', names: ['Coach Vince', 'Trainer Pat', 'Manager Phil'], dialogueStyle: 'tough and caring, sees potential in everyone' },
            { archetype: 'cheater', role: 'villain', names: ['Doper Dan', 'Fixer Sam', 'Lance'], dialogueStyle: 'deceptive and rationalizing, wins at any cost' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/sports_arena.mp3',
        musicVolume: 0.4,
    },

    {
        id: 'default',
        name: 'Default Environment',
        description: 'A clean neutral environment suitable for any topic.',
        builderKey: 'default',
        topicKeywords: [],
        tags: ['general'],
        palette: {
            skyColor: '#080808', fogColor: '#0a0a0a', fogDensity: 0.014,
            groundColor: '#101010', lightColor: '#ffffff', ambientColor: '#080808', accentColor: '#00C8E0',
        },
        npcs: [
            { archetype: 'guide', role: 'guide', names: ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan'], dialogueStyle: 'friendly and helpful, here to assist' },
            { archetype: 'companion', role: 'neutral', names: ['Chris', 'Dana', 'Riley', 'Avery', 'Quinn'], dialogueStyle: 'curious and engaged, asks good questions' },
            { archetype: 'challenger', role: 'villain', names: ['The Doubt', 'The Wrong Answer', 'The Distractor'], dialogueStyle: 'misleading and testing, challenges your knowledge' },
        ],
        musicUrl: 'https://storage.googleapis.com/michiko-vr.appspot.com/music/default.mp3',
        musicVolume: 0.35,
    },
];

// ── Seed function ─────────────────────────────────────────────
async function seed() {
    console.log(`Seeding ${environments.length} environments...`);
    const batch = db.batch();

    for (const env of environments) {
        const ref = db.collection('environments').doc(env.id);
        batch.set(ref, env);
    }

    await batch.commit();
    console.log(`✓ Seeded ${environments.length} environments to Firestore.`);
    process.exit(0);
}

seed().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});