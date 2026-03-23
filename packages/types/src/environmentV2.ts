/**
 * Michiko VR Environment System v2
 * 
 * This replaces the colors-only ThemePalette with a full geometry system:
 * - HDR skyboxes or procedural skies
 * - Terrain with heightmaps and PBR materials
 * - Props with GLB models and randomized placement
 * - Rich lighting with shadows
 * - Particle systems for atmosphere
 * - Post-processing effects
 */

// ══════════════════════════════════════════════════════════════════════════════
// SKYBOX CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

export interface ProceduralSkyConfig {
    /** Atmospheric scattering turbidity (2-10, higher = hazier) */
    turbidity: number;
    /** Rayleigh scattering coefficient (affects blue tint) */
    rayleigh: number;
    /** Mie scattering coefficient (affects sun glow) */
    mieCoefficient: number;
    /** Mie directional scattering (0.7-0.999) */
    mieDirectionalG: number;
    /** Sun position as normalized direction vector */
    sunPosition: { x: number; y: number; z: number };
}

export interface SkyboxConfig {
    /** 'hdri' = load from URL, 'procedural' = Babylon.js SkyMaterial, 'cubemap' = 6-face cubemap */
    type: 'hdri' | 'procedural' | 'cubemap' | 'color';

    /** URL to HDR/EXR file (for 'hdri' type) */
    hdriUrl?: string;

    /** URLs for 6 faces: [px, nx, py, ny, pz, nz] (for 'cubemap' type) */
    cubemapUrls?: string[];

    /** Procedural sky settings (for 'procedural' type) */
    proceduralConfig?: ProceduralSkyConfig;

    /** Fallback solid color hex (for 'color' type or loading fallback) */
    colorHex?: string;

    /** Rotation offset in radians (useful for aligning sun with lighting) */
    rotationY?: number;

    /** Exposure adjustment for HDR (default 1.0) */
    exposure?: number;
}

// ══════════════════════════════════════════════════════════════════════════════
// TERRAIN CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

export interface TerrainMaterialConfig {
    /** Diffuse/albedo texture URL */
    diffuseUrl?: string;
    /** Normal map URL for surface detail */
    normalUrl?: string;
    /** Ambient occlusion map URL */
    aoUrl?: string;
    /** Roughness map URL (for PBR) */
    roughnessUrl?: string;
    /** UV scale (how many times texture repeats) */
    uvScale: number;
    /** Fallback color if textures fail to load */
    fallbackColorHex: string;
}

export interface HeightmapConfig {
    /** URL to grayscale heightmap image */
    url: string;
    /** Maximum height displacement */
    maxHeight: number;
    /** Subdivisions for terrain mesh (higher = more detail, more performance cost) */
    subdivisions: number;
}

export interface RoomConfig {
    /** URL to GLB file containing the room geometry */
    glbUrl: string;
    /** Scale multiplier */
    scale: number;
    /** Offset position */
    offset: { x: number; y: number; z: number };
}

export interface TerrainConfig {
    /** 'flat' = simple plane, 'heightmap' = displaced terrain, 'room' = enclosed GLB space */
    type: 'flat' | 'heightmap' | 'room';

    /** Size of terrain (width x depth) */
    size: number;

    /** Heightmap settings (for 'heightmap' type) */
    heightmap?: HeightmapConfig;

    /** Room GLB settings (for 'room' type) */
    room?: RoomConfig;

    /** Material/texture settings */
    material: TerrainMaterialConfig;

    /** Enable collision detection on terrain */
    collisions: boolean;

    /** Receive shadows from directional light */
    receiveShadows: boolean;
}

// ══════════════════════════════════════════════════════════════════════════════
// PROP CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

export interface PropPlacementRandom {
    /** Number of instances to spawn */
    count: number;
    /** Rectangular area bounds: { minX, maxX, minZ, maxZ } */
    area: { minX: number; maxX: number; minZ: number; maxZ: number };
    /** Random scale variance (0.1 = ±10%) */
    scaleVariance?: number;
    /** Random Y rotation (true = 0-360°, false = fixed) */
    randomRotationY?: boolean;
    /** Minimum distance between instances */
    minSpacing?: number;
}

export interface PropConfig {
    /** Unique identifier for this prop type */
    id: string;
    /** Display name */
    name: string;
    /** URL to GLB model */
    glbUrl: string;
    /** Base scale */
    scale: number;
    /** Fixed placement position (mutually exclusive with randomPlacement) */
    position?: { x: number; y: number; z: number };
    /** Fixed rotation in degrees */
    rotation?: { x: number; y: number; z: number };
    /** Random placement config (mutually exclusive with position) */
    randomPlacement?: PropPlacementRandom;
    /** Enable collision on this prop */
    collisions?: boolean;
    /** Cast shadows */
    castShadows?: boolean;
    /** Receive shadows */
    receiveShadows?: boolean;
    /** Optional animation name to auto-play from GLB */
    animation?: string;
}

// ══════════════════════════════════════════════════════════════════════════════
// LIGHTING CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

export interface DirectionalLightConfig {
    /** Direction vector (will be normalized) */
    direction: { x: number; y: number; z: number };
    /** Light color hex */
    colorHex: string;
    /** Intensity (0-2 typical) */
    intensity: number;
    /** Enable shadow casting */
    shadows: boolean;
    /** Shadow map resolution (512, 1024, 2048) */
    shadowMapSize?: number;
    /** Shadow darkness (0 = invisible, 1 = pure black) */
    shadowDarkness?: number;
}

export interface PointLightConfig {
    /** Position in world space */
    position: { x: number; y: number; z: number };
    /** Light color hex */
    colorHex: string;
    /** Intensity */
    intensity: number;
    /** Falloff range */
    range: number;
    /** Optional: attach to a prop by ID (light follows prop) */
    attachToProp?: string;
}

export interface LightingConfig {
    /** Ambient/hemisphere light color */
    ambientColorHex: string;
    /** Ambient intensity (0-1) */
    ambientIntensity: number;
    /** Ground color for hemisphere light */
    groundColorHex: string;
    /** Main directional light (sun/moon) */
    directional?: DirectionalLightConfig;
    /** Additional point lights (torches, lamps, etc.) */
    pointLights?: PointLightConfig[];
}

// ══════════════════════════════════════════════════════════════════════════════
// PARTICLE CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

export type ParticlePreset =
    | 'dust'        // Floating dust motes
    | 'fireflies'   // Glowing moving particles
    | 'leaves'      // Falling leaves
    | 'sparks'      // Fire sparks rising
    | 'snow'        // Falling snow
    | 'rain'        // Rain drops
    | 'fog_wisps'   // Low-lying fog tendrils
    | 'bubbles'     // Underwater bubbles
    | 'embers'      // Volcanic embers
    | 'stars';      // Twinkling star field

export interface ParticleConfig {
    /** Particle system ID */
    id: string;
    /** Preset type (uses predefined settings) */
    preset: ParticlePreset;
    /** Emitter position */
    emitterPosition: { x: number; y: number; z: number };
    /** Emitter box size */
    emitterSize: { x: number; y: number; z: number };
    /** Override emit rate (particles/second) */
    emitRate?: number;
    /** Override particle color (hex with alpha: #RRGGBBAA) */
    colorHex?: string;
    /** Override particle size range */
    sizeRange?: { min: number; max: number };
    /** Override lifetime range */
    lifetimeRange?: { min: number; max: number };
}

// ══════════════════════════════════════════════════════════════════════════════
// POST-PROCESSING CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

export interface BloomConfig {
    /** Enable bloom */
    enabled: boolean;
    /** Bloom intensity (0-2) */
    intensity: number;
    /** Luminance threshold (0-1) */
    threshold: number;
    /** Blur kernel size */
    blurKernelSize: number;
}

export interface ColorGradingConfig {
    /** Enable color grading */
    enabled: boolean;
    /** URL to LUT (Look-Up Table) image */
    lutUrl?: string;
    /** Simple adjustments if no LUT */
    saturation?: number;  // 0-2, 1 = normal
    contrast?: number;    // 0-2, 1 = normal
    exposure?: number;    // 0-2, 1 = normal
    /** Color temperature shift (-100 to 100) */
    temperature?: number;
}

export interface VignetteConfig {
    /** Enable vignette */
    enabled: boolean;
    /** Vignette strength (0-1) */
    strength: number;
    /** Vignette color hex */
    colorHex: string;
}

export interface DepthOfFieldConfig {
    /** Enable DoF */
    enabled: boolean;
    /** Focus distance from camera */
    focalDistance: number;
    /** Depth range in focus */
    focalRange: number;
    /** Blur amount */
    blurLevel: number;
}

export interface PostProcessConfig {
    bloom?: BloomConfig;
    colorGrading?: ColorGradingConfig;
    vignette?: VignetteConfig;
    depthOfField?: DepthOfFieldConfig;
    /** Enable FXAA anti-aliasing */
    fxaa?: boolean;
    /** Enable tone mapping for HDR */
    toneMapping?: boolean;
}

// ══════════════════════════════════════════════════════════════════════════════
// AUDIO CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

export interface SpatialSoundConfig {
    id: string;
    url: string;
    position: { x: number; y: number; z: number };
    volume: number;
    maxDistance: number;
    loop: boolean;
}

export interface AudioConfig {
    /** Ambient music track URL */
    ambientUrl: string;
    /** Ambient volume (0-1) */
    ambientVolume: number;
    /** Loop the ambient track */
    ambientLoop: boolean;
    /** Spatial sound effects attached to positions */
    spatialSounds?: SpatialSoundConfig[];
}

// ══════════════════════════════════════════════════════════════════════════════
// SPAWN POINTS
// ══════════════════════════════════════════════════════════════════════════════

export interface SpawnPoint {
    id: string;
    type: 'player' | 'npc' | 'prop' | 'question';
    position: { x: number; y: number; z: number };
    rotation?: { x: number; y: number; z: number };
    /** For NPC spawn points: which archetype spawns here */
    npcArchetype?: string;
}

// ══════════════════════════════════════════════════════════════════════════════
// FOG CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

export interface FogConfig {
    /** Fog mode */
    mode: 'none' | 'linear' | 'exp' | 'exp2';
    /** Fog color hex */
    colorHex: string;
    /** For linear: start distance */
    start?: number;
    /** For linear: end distance */
    end?: number;
    /** For exp/exp2: density (0.001 - 0.1 typical) */
    density?: number;
}

// ══════════════════════════════════════════════════════════════════════════════
// NPC ARCHETYPE (from your existing system)
// ══════════════════════════════════════════════════════════════════════════════

export interface NPCArchetypeConfig {
    archetype: string;
    role: 'guide' | 'villain' | 'neutral';
    names: string[];
    dialogueStyle: string;
}

// ══════════════════════════════════════════════════════════════════════════════
// LEGACY PALETTE (for backwards compatibility)
// ══════════════════════════════════════════════════════════════════════════════

export interface LegacyPalette {
    skyColor: string;
    fogColor: string;
    fogDensity: number;
    groundColor: string;
    lightColor: string;
    ambientColor: string;
    accentColor: string;
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPLETE ENVIRONMENT CONFIGURATION (replaces old EnvironmentConfig)
// ══════════════════════════════════════════════════════════════════════════════

export interface EnvironmentConfigV2 {
    // ── Identity ──────────────────────────────────────────────────────────────
    id: string;
    name: string;
    description: string;

    // ── Matching (unchanged from your current system) ─────────────────────────
    topicKeywords: string[];
    tags: string[];

    // ── NPC archetypes (unchanged) ────────────────────────────────────────────
    npcs: NPCArchetypeConfig[];

    // ── Visual Configuration (NEW) ────────────────────────────────────────────
    skybox: SkyboxConfig;
    terrain: TerrainConfig;
    fog: FogConfig;
    lighting: LightingConfig;
    props: PropConfig[];
    particles: ParticleConfig[];
    postProcess: PostProcessConfig;

    // ── Audio ─────────────────────────────────────────────────────────────────
    audio: AudioConfig;

    // ── Spawn points ──────────────────────────────────────────────────────────
    spawnPoints: SpawnPoint[];

    // ── Legacy palette (kept for backwards compatibility during migration) ───
    palette?: LegacyPalette;
}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE LAYOUT (runtime config passed to buildScene)
// This is the "flattened" version derived from EnvironmentConfigV2
// ══════════════════════════════════════════════════════════════════════════════

export interface SceneLayoutV2 {
    // ── Identity ──────────────────────────────────────────────────────────────
    environment: string;  // EnvironmentConfigV2.id

    // ── Resolved visual config ────────────────────────────────────────────────
    skybox: SkyboxConfig;
    terrain: TerrainConfig;
    fog: FogConfig;
    lighting: LightingConfig;
    props: PropConfig[];
    particles: ParticleConfig[];
    postProcess: PostProcessConfig;
    audio: AudioConfig;
    spawnPoints: SpawnPoint[];

    // ── Legacy fields (for gradual migration) ─────────────────────────────────
    /** @deprecated Use fog.colorHex */
    fogColor?: string;
    /** @deprecated Use fog.density */
    fogDensity?: number;
    /** @deprecated Use skybox.colorHex */
    skyColor?: string;
    /** @deprecated Use terrain.material.fallbackColorHex */
    groundColor?: string;
    /** @deprecated Use lighting.ambientColorHex */
    ambientColor?: string;
    /** @deprecated Use lighting.directional.colorHex */
    lightColor?: string;
    /** @deprecated */
    accentColor?: string;
}

// ══════════════════════════════════════════════════════════════════════════════
// HELPER: Convert legacy EnvironmentConfig to V2
// ══════════════════════════════════════════════════════════════════════════════

export interface LegacyEnvironmentConfig {
    id: string;
    name: string;
    description: string;
    builderKey: string;
    topicKeywords: string[];
    tags: string[];
    palette: LegacyPalette;
    npcs: NPCArchetypeConfig[];
    musicUrl: string;
    musicVolume: number;
}

export function migrateEnvironmentConfig(
    legacy: LegacyEnvironmentConfig
): EnvironmentConfigV2 {
    return {
        id: legacy.id,
        name: legacy.name,
        description: legacy.description,
        topicKeywords: legacy.topicKeywords,
        tags: legacy.tags,
        npcs: legacy.npcs,

        // Convert palette to structured config
        skybox: {
            type: 'color',
            colorHex: legacy.palette.skyColor,
        },
        terrain: {
            type: 'flat',
            size: 60,
            material: {
                uvScale: 10,
                fallbackColorHex: legacy.palette.groundColor,
            },
            collisions: true,
            receiveShadows: true,
        },
        fog: {
            mode: 'exp2',
            colorHex: legacy.palette.fogColor,
            density: legacy.palette.fogDensity,
        },
        lighting: {
            ambientColorHex: legacy.palette.ambientColor,
            ambientIntensity: 0.7,
            groundColorHex: legacy.palette.groundColor,
            directional: {
                direction: { x: -1, y: -2, z: -1 },
                colorHex: legacy.palette.lightColor,
                intensity: 1.2,
                shadows: true,
                shadowMapSize: 1024,
            },
        },
        props: [],
        particles: [
            {
                id: 'atmosphere',
                preset: 'dust',
                emitterPosition: { x: 0, y: 5, z: 0 },
                emitterSize: { x: 40, y: 10, z: 40 },
                colorHex: legacy.palette.accentColor + '66', // 40% opacity
            },
        ],
        postProcess: {
            bloom: { enabled: false, intensity: 0.3, threshold: 0.8, blurKernelSize: 32 },
            vignette: { enabled: true, strength: 0.3, colorHex: '#000000' },
            fxaa: true,
        },
        audio: {
            ambientUrl: legacy.musicUrl,
            ambientVolume: legacy.musicVolume,
            ambientLoop: true,
        },
        spawnPoints: [
            { id: 'player_start', type: 'player', position: { x: 0, y: 1.7, z: -12 } },
            { id: 'npc_guide', type: 'npc', position: { x: -2, y: 0, z: 0 }, npcArchetype: 'guide' },
            { id: 'npc_neutral', type: 'npc', position: { x: 2, y: 0, z: 0 }, npcArchetype: 'neutral' },
            { id: 'npc_villain', type: 'npc', position: { x: 0, y: 0, z: 4 }, npcArchetype: 'villain' },
        ],

        // Keep legacy for backwards compat
        palette: legacy.palette,
    };
}