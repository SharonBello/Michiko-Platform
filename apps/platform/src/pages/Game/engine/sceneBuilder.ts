import * as BABYLON from '@babylonjs/core';
import type { SceneLayout } from '@michiko/types';
import { hexToColor3, hexToColor4 } from './themeApplier';

import { buildDefaultProps } from './environments/default';
import { buildSpaceProps } from './environments/space';
import { buildLibraryProps } from './environments/library';
import { buildJungleProps } from './environments/jungle';
import { buildMedievalProps } from './environments/medieval';
import { buildLaboratoryProps } from './environments/laboratory';
import { buildRomeProps } from './environments/rome';

// ── Builder aliases — map all 81 environments to nearest existing builder ──
// Ancient history → rome feel
const ancientBuilder = buildRomeProps;
// Medieval → medieval castle
const medievalBuilder = buildMedievalProps;
// Science / space → lab or space
const scienceBuilder = buildLaboratoryProps;
const spaceBuilder = buildSpaceProps;
// Nature / exploration → jungle
const natureBuilder = buildJungleProps;
// Literature / art / performance → library
const libraryBuilder = buildLibraryProps;

const BUILDERS: Record<string, (scene: BABYLON.Scene, layout: SceneLayout) => void> = {
  // ── Ancient ──────────────────────────────────────────────────
  roman_colosseum: buildRomeProps,
  ancient_egypt: ancientBuilder,
  greek_temple: ancientBuilder,
  aztec_temple: ancientBuilder,
  ancient_china: ancientBuilder,
  moorish_palace: ancientBuilder,
  mesopotamia: ancientBuilder,
  persian_palace: ancientBuilder,
  viking_village: medievalBuilder,
  samurai_japan: ancientBuilder,

  // ── Medieval ─────────────────────────────────────────────────
  medieval_castle: buildMedievalProps,
  medieval_market: medievalBuilder,
  crusader_fortress: medievalBuilder,
  plague_village: medievalBuilder,
  monastery: libraryBuilder,
  jousting_arena: medievalBuilder,

  // ── Exploration & Nature ─────────────────────────────────────
  pirate_ship: natureBuilder,
  desert_ruins: ancientBuilder,
  jungle_temple: buildJungleProps,
  cave: natureBuilder,
  arctic: natureBuilder,
  underwater: natureBuilder,
  volcano: natureBuilder,
  island_paradise: natureBuilder,
  coral_reef: natureBuilder,
  rainforest_canopy: natureBuilder,
  desert_oasis: ancientBuilder,

  // ── Industry & Revolution ────────────────────────────────────
  victorian_london: libraryBuilder,
  industrial_factory: scienceBuilder,
  wild_west: natureBuilder,
  steam_workshop: scienceBuilder,
  silk_road: ancientBuilder,

  // ── War & Conflict ───────────────────────────────────────────
  war_trenches: medievalBuilder,
  underground_bunker: scienceBuilder,
  ancient_battlefield: ancientBuilder,
  naval_warship: natureBuilder,
  cold_war_base: scienceBuilder,
  resistance_hideout: medievalBuilder,

  // ── Civil & Social ───────────────────────────────────────────
  civil_rights_street: buildDefaultProps,
  suffragette_march: buildDefaultProps,
  revolutionary_paris: ancientBuilder,
  colonial_america: libraryBuilder,
  immigrant_ship: natureBuilder,
  freedom_trail: buildDefaultProps,

  // ── Science ──────────────────────────────────────────────────
  laboratory: buildLaboratoryProps,
  space_station: buildSpaceProps,
  observatory: spaceBuilder,
  deep_sea_lab: natureBuilder,
  dinosaur_era: natureBuilder,
  prehistoric_savanna: natureBuilder,
  fossil_dig: natureBuilder,
  particle_accelerator: scienceBuilder,

  // ── Art & Culture ────────────────────────────────────────────
  renaissance_workshop: libraryBuilder,
  impressionist_garden: natureBuilder,
  baroque_palace: ancientBuilder,
  abstract_art_studio: buildDefaultProps,
  surrealist_dreamscape: buildDefaultProps,
  graffiti_district: buildDefaultProps,
  pottery_workshop: libraryBuilder,

  // ── Literature & Performance ─────────────────────────────────
  library: buildLibraryProps,
  theater_stage: libraryBuilder,
  poetry_cafe: libraryBuilder,
  music_hall: libraryBuilder,
  opera_house: libraryBuilder,
  printing_press: libraryBuilder,
  storytellers_fire: natureBuilder,

  // ── Contemporary ─────────────────────────────────────────────
  contemporary_city: buildDefaultProps,
  futuristic_city: spaceBuilder,
  space_colony: spaceBuilder,
  cyberpunk_alley: scienceBuilder,
  eco_village: natureBuilder,
  news_room: buildDefaultProps,

  // ── Fantasy & Mythology ──────────────────────────────────────
  enchanted_forest: natureBuilder,
  dragon_lair: medievalBuilder,
  olympus: ancientBuilder,
  underworld: medievalBuilder,
  fairy_ring: natureBuilder,
  crystal_cave: natureBuilder,

  // ── Other ────────────────────────────────────────────────────
  marketplace: ancientBuilder,
  sports_arena: buildRomeProps,
  default: buildDefaultProps,
};

export function buildScene(scene: BABYLON.Scene, layout: SceneLayout): void {
  scene.clearColor = hexToColor4(layout.skyColor);
  scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
  scene.fogColor = hexToColor3(layout.fogColor);
  scene.fogDensity = layout.fogDensity;

  // Lighting
  const ambient = new BABYLON.HemisphericLight('ambient', new BABYLON.Vector3(0, 1, 0), scene);
  ambient.diffuse = hexToColor3(layout.accentColor);
  ambient.groundColor = hexToColor3(layout.ambientColor);
  ambient.intensity = 0.7;

  const sun = new BABYLON.DirectionalLight('sun', new BABYLON.Vector3(-1, -2, -1), scene);
  sun.diffuse = BABYLON.Color3.White();
  sun.intensity = 1.2;

  // Ground — checkCollisions MUST be true so camera gravity works
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 60, height: 60, subdivisions: 4 }, scene);
  ground.checkCollisions = true;
  ground.receiveShadows = true;
  const groundMat = new BABYLON.StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = hexToColor3(layout.groundColor);
  groundMat.specularColor = BABYLON.Color3.Black();
  ground.material = groundMat;

  buildGridOverlay(scene, layout.accentColor, 60);
  buildSkydome(scene, layout.skyColor);
  buildAtmosphere(scene, layout.accentColor);

  const builder = BUILDERS[layout.environment] ?? buildDefaultProps;
  builder(scene, layout);
}

function buildGridOverlay(scene: BABYLON.Scene, accentHex: string, size: number) {
  const accent = hexToColor3(accentHex);
  const step = 8, half = size / 2;
  for (let x = -half; x <= half; x += step) {
    const line = BABYLON.MeshBuilder.CreateLines(`gridX_${x}`, {
      points: [new BABYLON.Vector3(x, 0.01, -half), new BABYLON.Vector3(x, 0.01, half)]
    }, scene);
    line.color = accent; line.alpha = 0.15;
  }
  for (let z = -half; z <= half; z += step) {
    const line = BABYLON.MeshBuilder.CreateLines(`gridZ_${z}`, {
      points: [new BABYLON.Vector3(-half, 0.01, z), new BABYLON.Vector3(half, 0.01, z)]
    }, scene);
    line.color = accent; line.alpha = 0.15;
  }
}

function buildSkydome(scene: BABYLON.Scene, skyHex: string) {
  const dome = BABYLON.MeshBuilder.CreateSphere('skydome',
    { diameter: 150, sideOrientation: BABYLON.Mesh.BACKSIDE }, scene);
  dome.position.y = 20;
  const mat = new BABYLON.StandardMaterial('skydomeMat', scene);
  mat.diffuseColor = hexToColor3(skyHex);
  mat.emissiveColor = hexToColor3(skyHex);
  mat.backFaceCulling = false;
  mat.disableLighting = true;
  dome.material = mat;
}

function buildAtmosphere(scene: BABYLON.Scene, accentHex: string) {
  const accent = hexToColor3(accentHex);
  const ps = new BABYLON.ParticleSystem('atmosphere', 60, scene);
  ps.emitter = new BABYLON.Vector3(0, 5, 0);
  ps.minEmitBox = new BABYLON.Vector3(-20, 0, -20);
  ps.maxEmitBox = new BABYLON.Vector3(20, 10, 20);
  ps.color1 = new BABYLON.Color4(accent.r, accent.g, accent.b, 0.4);
  ps.color2 = new BABYLON.Color4(accent.r, accent.g, accent.b, 0.0);
  ps.minSize = 0.04; ps.maxSize = 0.12;
  ps.minLifeTime = 4; ps.maxLifeTime = 8;
  ps.emitRate = 8;
  ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
  ps.gravity = new BABYLON.Vector3(0, 0.02, 0);
  ps.minEmitPower = 0.1; ps.maxEmitPower = 0.3;
  ps.updateSpeed = 0.01;
  ps.start();
}