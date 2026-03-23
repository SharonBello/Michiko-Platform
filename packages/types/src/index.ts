export type { User, UserRole } from './user';
export type { Game, GameStatus, AgeGroup, SubjectDomain, GameMechanic, GameResult } from './game';
export type {
    Blueprint,
    GameScene,
    Question,
    QuestionType,
    NPC,
    EnvironmentType,
    EnvironmentPalette,
    NPCArchetype,
    EnvironmentConfig,
    SceneLayout,
} from './blueprint';

export type {
    // Skybox
    ProceduralSkyConfig,
    SkyboxConfig,

    // Terrain
    TerrainMaterialConfig,
    HeightmapConfig,
    RoomConfig,
    TerrainConfig,

    // Props
    PropPlacementRandom,
    PropConfig,

    // Lighting
    DirectionalLightConfig,
    PointLightConfig,
    LightingConfig,

    // Particles
    ParticlePreset,
    ParticleConfig,

    // Post-processing
    BloomConfig,
    ColorGradingConfig,
    VignetteConfig,
    DepthOfFieldConfig,
    PostProcessConfig,

    // Audio
    SpatialSoundConfig,
    AudioConfig,

    // Spawn points
    SpawnPoint,

    // Fog
    FogConfig,

    // NPC
    NPCArchetypeConfig,

    // Legacy
    LegacyPalette,
    LegacyEnvironmentConfig,

    // Main configs
    EnvironmentConfigV2,
    SceneLayoutV2,
} from './environmentV2';
