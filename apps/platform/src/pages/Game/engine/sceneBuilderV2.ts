/**
 * Michiko VR Scene Builder v2 - With Working Gradient Skybox
 */

import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import type {
  SceneLayoutV2,
  PropConfig,
  ParticlePreset,
  ProceduralSkyConfig,
} from '@michiko/types';

// ══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════════

export function hexToColor3(hex: string): BABYLON.Color3 {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return new BABYLON.Color3(r, g, b);
}

export function hexToColor4(hex: string, defaultAlpha = 1): BABYLON.Color4 {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const a = clean.length === 8 ? parseInt(clean.slice(6, 8), 16) / 255 : defaultAlpha;
  return new BABYLON.Color4(r, g, b, a);
}

function splitUrl(url: string): { rootUrl: string; filename: string } {
  const lastSlash = url.lastIndexOf('/');
  if (lastSlash === -1) {
    return { rootUrl: '', filename: url };
  }
  return {
    rootUrl: url.substring(0, lastSlash + 1),
    filename: url.substring(lastSlash + 1),
  };
}

// ══════════════════════════════════════════════════════════════════════════════
// PARTICLE PRESETS
// ══════════════════════════════════════════════════════════════════════════════

interface ParticlePresetConfig {
  minSize: number;
  maxSize: number;
  minLifeTime: number;
  maxLifeTime: number;
  emitRate: number;
  gravity: { x: number; y: number; z: number };
  direction1?: { x: number; y: number; z: number };
  direction2?: { x: number; y: number; z: number };
  minEmitPower: number;
  maxEmitPower: number;
  blendMode: number;
}

const PARTICLE_PRESETS: Record<ParticlePreset, ParticlePresetConfig> = {
  dust: {
    minSize: 0.02,
    maxSize: 0.08,
    minLifeTime: 4,
    maxLifeTime: 8,
    emitRate: 10,
    gravity: { x: 0, y: 0.02, z: 0 },
    minEmitPower: 0.05,
    maxEmitPower: 0.1,
    blendMode: BABYLON.ParticleSystem.BLENDMODE_ADD,
  },
  fireflies: {
    minSize: 0.03,
    maxSize: 0.06,
    minLifeTime: 5,
    maxLifeTime: 10,
    emitRate: 8,
    gravity: { x: 0, y: 0, z: 0 },
    minEmitPower: 0.1,
    maxEmitPower: 0.3,
    blendMode: BABYLON.ParticleSystem.BLENDMODE_ADD,
  },
  leaves: {
    minSize: 0.1,
    maxSize: 0.3,
    minLifeTime: 6,
    maxLifeTime: 12,
    emitRate: 5,
    gravity: { x: 0.05, y: -0.3, z: 0 },
    minEmitPower: 0.1,
    maxEmitPower: 0.2,
    blendMode: BABYLON.ParticleSystem.BLENDMODE_STANDARD,
  },
  sparks: {
    minSize: 0.02,
    maxSize: 0.05,
    minLifeTime: 1,
    maxLifeTime: 2,
    emitRate: 30,
    gravity: { x: 0, y: 0.5, z: 0 },
    minEmitPower: 0.5,
    maxEmitPower: 1.5,
    blendMode: BABYLON.ParticleSystem.BLENDMODE_ADD,
  },
  snow: {
    minSize: 0.03,
    maxSize: 0.08,
    minLifeTime: 8,
    maxLifeTime: 15,
    emitRate: 50,
    gravity: { x: 0, y: -0.2, z: 0 },
    minEmitPower: 0.02,
    maxEmitPower: 0.05,
    blendMode: BABYLON.ParticleSystem.BLENDMODE_STANDARD,
  },
  rain: {
    minSize: 0.01,
    maxSize: 0.02,
    minLifeTime: 1,
    maxLifeTime: 2,
    emitRate: 200,
    gravity: { x: 0, y: -5, z: 0 },
    direction1: { x: -0.1, y: -1, z: -0.1 },
    direction2: { x: 0.1, y: -1, z: 0.1 },
    minEmitPower: 2,
    maxEmitPower: 3,
    blendMode: BABYLON.ParticleSystem.BLENDMODE_ADD,
  },
  fog_wisps: {
    minSize: 0.5,
    maxSize: 2,
    minLifeTime: 10,
    maxLifeTime: 20,
    emitRate: 3,
    gravity: { x: 0.01, y: 0, z: 0 },
    minEmitPower: 0.02,
    maxEmitPower: 0.05,
    blendMode: BABYLON.ParticleSystem.BLENDMODE_ADD,
  },
  bubbles: {
    minSize: 0.05,
    maxSize: 0.15,
    minLifeTime: 4,
    maxLifeTime: 8,
    emitRate: 15,
    gravity: { x: 0, y: 0.3, z: 0 },
    minEmitPower: 0.1,
    maxEmitPower: 0.3,
    blendMode: BABYLON.ParticleSystem.BLENDMODE_ADD,
  },
  embers: {
    minSize: 0.02,
    maxSize: 0.04,
    minLifeTime: 2,
    maxLifeTime: 4,
    emitRate: 20,
    gravity: { x: 0, y: 0.8, z: 0 },
    minEmitPower: 0.3,
    maxEmitPower: 0.8,
    blendMode: BABYLON.ParticleSystem.BLENDMODE_ADD,
  },
  stars: {
    minSize: 0.01,
    maxSize: 0.02,
    minLifeTime: 2,
    maxLifeTime: 5,
    emitRate: 2,
    gravity: { x: 0, y: 0, z: 0 },
    minEmitPower: 0,
    maxEmitPower: 0,
    blendMode: BABYLON.ParticleSystem.BLENDMODE_ADD,
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// MAIN SCENE BUILDER
// ══════════════════════════════════════════════════════════════════════════════

export async function buildSceneV2(
  scene: BABYLON.Scene,
  layout: SceneLayoutV2,
  onProgress?: (stage: string, percent: number) => void
): Promise<void> {
  const report = (stage: string, percent: number) => {
    onProgress?.(stage, percent);
    console.log(`[SceneBuilder] ${stage}: ${percent}%`);
  };

  report('Initializing', 0);

  // ── 1. Fog ────────────────────────────────────────────────────────────────
  buildFog(scene, layout);
  report('Fog configured', 5);

  // ── 2. Skybox ─────────────────────────────────────────────────────────────
  await buildSkybox(scene, layout);
  report('Skybox loaded', 20);

  // ── 3. Lighting ───────────────────────────────────────────────────────────
  const shadowGenerator = buildLighting(scene, layout);
  report('Lighting configured', 30);

  // ── 4. Terrain ────────────────────────────────────────────────────────────
  await buildTerrain(scene, layout, shadowGenerator);
  report('Terrain loaded', 50);

  // ── 5. Props ──────────────────────────────────────────────────────────────
  await buildProps(scene, layout, shadowGenerator);
  report('Props loaded', 75);

  // ── 6. Particles ──────────────────────────────────────────────────────────
  buildParticles(scene, layout);
  report('Particles configured', 85);

  // ── 7. Post-processing ────────────────────────────────────────────────────
  buildPostProcessing(scene, layout);
  report('Post-processing configured', 95);

  // ── 8. Audio ──────────────────────────────────────────────────────────────
  buildAudio(scene, layout);
  report('Audio configured', 100);
}

// ══════════════════════════════════════════════════════════════════════════════
// FOG
// ══════════════════════════════════════════════════════════════════════════════

function buildFog(scene: BABYLON.Scene, layout: SceneLayoutV2): void {
  const { fog } = layout;

  switch (fog.mode) {
    case 'none':
      scene.fogMode = BABYLON.Scene.FOGMODE_NONE;
      break;
    case 'linear':
      scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
      scene.fogStart = fog.start ?? 20;
      scene.fogEnd = fog.end ?? 100;
      break;
    case 'exp':
      scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
      scene.fogDensity = fog.density ?? 0.01;
      break;
    case 'exp2':
      scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
      scene.fogDensity = fog.density ?? 0.01;
      break;
  }

  scene.fogColor = hexToColor3(fog.colorHex);
}

// ══════════════════════════════════════════════════════════════════════════════
// SKYBOX - Using Shader Material for Gradient (100% works)
// ══════════════════════════════════════════════════════════════════════════════

async function buildSkybox(scene: BABYLON.Scene, layout: SceneLayoutV2): Promise<void> {
  const { skybox } = layout;
  
  // Get base color from config
  const baseColorHex = skybox.colorHex ?? '#d4a574';
  
  // Determine if this is a warm (sunset) or cool (night) scene
  const baseColor = hexToColor3(baseColorHex);
  const isWarm = baseColor.r > baseColor.b;
  
  console.log('[Skybox] Building gradient skybox, isWarm:', isWarm);
  
  // Create gradient skybox using shader
  buildShaderGradientSkybox(scene, baseColorHex, isWarm);
  
  // Set clear color to match horizon
  scene.clearColor = hexToColor4(baseColorHex);
}

function buildShaderGradientSkybox(scene: BABYLON.Scene, baseColorHex: string, isWarm: boolean): void {
  // Create a large sphere for the sky
  const skybox = BABYLON.MeshBuilder.CreateSphere(
    'gradientSkybox',
    { diameter: 1000, segments: 32, sideOrientation: BABYLON.Mesh.BACKSIDE },
    scene
  );
  skybox.infiniteDistance = true;
  skybox.renderingGroupId = 0;

  // Define shader for gradient
  const vertexShader = `
    precision highp float;
    attribute vec3 position;
    uniform mat4 worldViewProjection;
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = worldViewProjection * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;
    varying vec3 vPosition;
    uniform vec3 topColor;
    uniform vec3 horizonColor;
    uniform vec3 bottomColor;
    
    void main() {
      // Normalize Y position (-1 to 1)
      float y = normalize(vPosition).y;
      
      vec3 color;
      if (y > 0.0) {
        // Above horizon: blend horizon to top
        float t = pow(y, 0.7); // Adjust curve
        color = mix(horizonColor, topColor, t);
      } else {
        // Below horizon: blend horizon to bottom (ground reflection)
        float t = pow(-y, 0.5);
        color = mix(horizonColor, bottomColor, t);
      }
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Create shader material
  BABYLON.Effect.ShadersStore['gradientSkyVertexShader'] = vertexShader;
  BABYLON.Effect.ShadersStore['gradientSkyFragmentShader'] = fragmentShader;

  const shaderMaterial = new BABYLON.ShaderMaterial(
    'gradientSkyShader',
    scene,
    { vertex: 'gradientSky', fragment: 'gradientSky' },
    {
      attributes: ['position'],
      uniforms: ['worldViewProjection', 'topColor', 'horizonColor', 'bottomColor'],
    }
  );

  // Set colors based on warm/cool
  const baseColor = hexToColor3(baseColorHex);
  
  let topColor: BABYLON.Color3;
  let horizonColor: BABYLON.Color3;
  let bottomColor: BABYLON.Color3;

  if (isWarm) {
    // Warm sunset: orange horizon → blue-purple top → dark brown bottom
    horizonColor = new BABYLON.Color3(
      Math.min(baseColor.r * 1.3, 1),
      baseColor.g * 0.9,
      baseColor.b * 0.6
    );
    topColor = new BABYLON.Color3(0.4, 0.5, 0.7); // Dusty blue
    bottomColor = new BABYLON.Color3(
      baseColor.r * 0.4,
      baseColor.g * 0.3,
      baseColor.b * 0.2
    );
  } else {
    // Cool night: dark blue top → purple horizon → dark bottom
    topColor = new BABYLON.Color3(0.05, 0.05, 0.15);
    horizonColor = new BABYLON.Color3(0.2, 0.15, 0.3);
    bottomColor = new BABYLON.Color3(0.02, 0.02, 0.05);
  }

  shaderMaterial.setColor3('topColor', topColor);
  shaderMaterial.setColor3('horizonColor', horizonColor);
  shaderMaterial.setColor3('bottomColor', bottomColor);
  shaderMaterial.backFaceCulling = false;
  shaderMaterial.disableDepthWrite = true;

  skybox.material = shaderMaterial;

  console.log('[Skybox] Gradient shader skybox created');
}

// ══════════════════════════════════════════════════════════════════════════════
// LIGHTING
// ══════════════════════════════════════════════════════════════════════════════

function buildLighting(
  scene: BABYLON.Scene,
  layout: SceneLayoutV2
): BABYLON.ShadowGenerator | null {
  const { lighting } = layout;
  let shadowGenerator: BABYLON.ShadowGenerator | null = null;

  const ambient = new BABYLON.HemisphericLight(
    'ambient',
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  ambient.diffuse = hexToColor3(lighting.ambientColorHex);
  ambient.groundColor = hexToColor3(lighting.groundColorHex);
  ambient.intensity = lighting.ambientIntensity;

  if (lighting.directional) {
    const dir = lighting.directional;
    const sun = new BABYLON.DirectionalLight(
      'sun',
      new BABYLON.Vector3(dir.direction.x, dir.direction.y, dir.direction.z).normalize(),
      scene
    );
    sun.diffuse = hexToColor3(dir.colorHex);
    sun.intensity = dir.intensity;

    sun.position = new BABYLON.Vector3(
      -dir.direction.x * 50,
      -dir.direction.y * 50,
      -dir.direction.z * 50
    );

    if (dir.shadows) {
      shadowGenerator = new BABYLON.ShadowGenerator(dir.shadowMapSize ?? 1024, sun);
      shadowGenerator.useBlurExponentialShadowMap = true;
      shadowGenerator.blurKernel = 32;
      shadowGenerator.darkness = dir.shadowDarkness ?? 0.5;
    }
  }

  if (lighting.pointLights) {
    lighting.pointLights.forEach((pl, i) => {
      const pointLight = new BABYLON.PointLight(
        `pointLight_${i}`,
        new BABYLON.Vector3(pl.position.x, pl.position.y, pl.position.z),
        scene
      );
      pointLight.diffuse = hexToColor3(pl.colorHex);
      pointLight.intensity = pl.intensity;
      pointLight.range = pl.range;
    });
  }

  return shadowGenerator;
}

// ══════════════════════════════════════════════════════════════════════════════
// TERRAIN
// ══════════════════════════════════════════════════════════════════════════════

async function buildTerrain(
  scene: BABYLON.Scene,
  layout: SceneLayoutV2,
  shadowGenerator: BABYLON.ShadowGenerator | null
): Promise<void> {
  const { terrain } = layout;

  switch (terrain.type) {
    case 'heightmap':
      await buildHeightmapTerrain(scene, terrain, shadowGenerator);
      break;

    case 'room':
      await buildRoomTerrain(scene, terrain, shadowGenerator);
      break;

    case 'flat':
    default:
      buildFlatTerrain(scene, terrain, shadowGenerator);
      break;
  }
}

function buildFlatTerrain(
  scene: BABYLON.Scene,
  terrain: SceneLayoutV2['terrain'],
  _shadowGenerator: BABYLON.ShadowGenerator | null
): void {
  const ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: terrain.size, height: terrain.size, subdivisions: 4 },
    scene
  );
  ground.checkCollisions = terrain.collisions;
  ground.receiveShadows = terrain.receiveShadows;

  const material = new BABYLON.StandardMaterial('groundMat', scene);

  if (terrain.material.diffuseUrl) {
    const diffuseTex = new BABYLON.Texture(terrain.material.diffuseUrl, scene);
    diffuseTex.uScale = terrain.material.uvScale;
    diffuseTex.vScale = terrain.material.uvScale;
    material.diffuseTexture = diffuseTex;
  } else {
    material.diffuseColor = hexToColor3(terrain.material.fallbackColorHex);
  }

  if (terrain.material.normalUrl) {
    const normalTex = new BABYLON.Texture(terrain.material.normalUrl, scene);
    normalTex.uScale = terrain.material.uvScale;
    normalTex.vScale = terrain.material.uvScale;
    material.bumpTexture = normalTex;
  }

  material.specularColor = BABYLON.Color3.Black();
  ground.material = material;
}

async function buildHeightmapTerrain(
  scene: BABYLON.Scene,
  terrain: SceneLayoutV2['terrain'],
  _shadowGenerator: BABYLON.ShadowGenerator | null
): Promise<void> {
  if (!terrain.heightmap) {
    console.warn('[Terrain] Heightmap config missing, falling back to flat');
    buildFlatTerrain(scene, terrain, _shadowGenerator);
    return;
  }

  const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
    'ground',
    terrain.heightmap.url,
    {
      width: terrain.size,
      height: terrain.size,
      subdivisions: terrain.heightmap.subdivisions,
      maxHeight: terrain.heightmap.maxHeight,
      minHeight: 0,
    },
    scene
  );

  await new Promise<void>((resolve) => {
    ground.onMeshReadyObservable.addOnce(() => resolve());
  });

  ground.checkCollisions = terrain.collisions;
  ground.receiveShadows = terrain.receiveShadows;

  const material = new BABYLON.StandardMaterial('groundMat', scene);

  if (terrain.material.diffuseUrl) {
    const diffuseTex = new BABYLON.Texture(terrain.material.diffuseUrl, scene);
    diffuseTex.uScale = terrain.material.uvScale;
    diffuseTex.vScale = terrain.material.uvScale;
    material.diffuseTexture = diffuseTex;
  } else {
    material.diffuseColor = hexToColor3(terrain.material.fallbackColorHex);
  }

  material.specularColor = BABYLON.Color3.Black();
  ground.material = material;
}

async function buildRoomTerrain(
  scene: BABYLON.Scene,
  terrain: SceneLayoutV2['terrain'],
  _shadowGenerator: BABYLON.ShadowGenerator | null
): Promise<void> {
  if (!terrain.room) {
    console.warn('[Terrain] Room config missing, falling back to flat');
    buildFlatTerrain(scene, terrain, _shadowGenerator);
    return;
  }

  try {
    const { rootUrl, filename } = splitUrl(terrain.room.glbUrl);
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
      '',
      rootUrl,
      filename,
      scene
    );

    result.meshes.forEach((mesh) => {
      mesh.scaling = new BABYLON.Vector3(
        terrain.room!.scale,
        terrain.room!.scale,
        terrain.room!.scale
      );
      mesh.position = new BABYLON.Vector3(
        terrain.room!.offset.x,
        terrain.room!.offset.y,
        terrain.room!.offset.z
      );
      mesh.checkCollisions = terrain.collisions;
      mesh.receiveShadows = terrain.receiveShadows;
    });

    console.log('[Terrain] Room loaded:', terrain.room.glbUrl);
  } catch (err) {
    console.warn('[Terrain] Room load failed:', err);
    buildFlatTerrain(scene, terrain, _shadowGenerator);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// PROPS
// ══════════════════════════════════════════════════════════════════════════════

async function buildProps(
  scene: BABYLON.Scene,
  layout: SceneLayoutV2,
  shadowGenerator: BABYLON.ShadowGenerator | null
): Promise<void> {
  const { props } = layout;

  const loadPromises = props.map((prop) => 
    loadProp(scene, prop, shadowGenerator).catch(err => {
      console.warn(`[Props] Failed to load ${prop.id}:`, err);
    })
  );
  await Promise.all(loadPromises);
}

async function loadProp(
  scene: BABYLON.Scene,
  prop: PropConfig,
  shadowGenerator: BABYLON.ShadowGenerator | null
): Promise<void> {
  try {
    const { rootUrl, filename } = splitUrl(prop.glbUrl);
    
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
      '',
      rootUrl,
      filename,
      scene
    );

    const rootMesh = result.meshes.find((m): m is BABYLON.Mesh => m instanceof BABYLON.Mesh);

    if (prop.randomPlacement && rootMesh) {
      placePropsRandomly(scene, rootMesh, prop, shadowGenerator);
      rootMesh.setEnabled(false);
    } else {
      result.meshes.forEach((mesh) => {
        mesh.scaling = new BABYLON.Vector3(prop.scale, prop.scale, prop.scale);

        if (prop.position) {
          mesh.position = new BABYLON.Vector3(
            prop.position.x,
            prop.position.y,
            prop.position.z
          );
        }

        if (prop.rotation) {
          mesh.rotation = new BABYLON.Vector3(
            BABYLON.Tools.ToRadians(prop.rotation.x),
            BABYLON.Tools.ToRadians(prop.rotation.y),
            BABYLON.Tools.ToRadians(prop.rotation.z)
          );
        }

        mesh.checkCollisions = prop.collisions ?? false;
        mesh.receiveShadows = prop.receiveShadows ?? true;

        if (prop.castShadows && shadowGenerator && mesh instanceof BABYLON.Mesh) {
          shadowGenerator.addShadowCaster(mesh);
        }
      });
    }

    if (prop.animation && result.animationGroups.length > 0) {
      const anim = result.animationGroups.find((g) => g.name === prop.animation);
      if (anim) {
        anim.start(true);
      }
    }

    console.log('[Props] Loaded:', prop.id);
  } catch (err) {
    console.warn('[Props] Failed to load:', prop.id, err);
  }
}

function placePropsRandomly(
  scene: BABYLON.Scene,
  sourceMesh: BABYLON.Mesh,
  prop: PropConfig,
  shadowGenerator: BABYLON.ShadowGenerator | null
): void {
  if (!prop.randomPlacement) return;

  const {
    count,
    area,
    scaleVariance = 0,
    randomRotationY = true,
    minSpacing = 0,
  } = prop.randomPlacement;

  const positions: BABYLON.Vector3[] = [];

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let pos: BABYLON.Vector3 | null = null;

    while (attempts < 50) {
      const x = area.minX + Math.random() * (area.maxX - area.minX);
      const z = area.minZ + Math.random() * (area.maxZ - area.minZ);
      const candidate = new BABYLON.Vector3(x, 0, z);

      const tooClose = positions.some(
        (p) => BABYLON.Vector3.Distance(p, candidate) < minSpacing
      );
      if (!tooClose) {
        pos = candidate;
        break;
      }
      attempts++;
    }

    if (!pos) continue;
    positions.push(pos);

    const instance = sourceMesh.createInstance(`${prop.id}_${i}`);

    const scale = prop.scale * (1 + (Math.random() * 2 - 1) * scaleVariance);
    instance.scaling = new BABYLON.Vector3(scale, scale, scale);

    instance.position = pos;

    if (randomRotationY) {
      instance.rotation.y = Math.random() * Math.PI * 2;
    }

    instance.checkCollisions = prop.collisions ?? false;
    instance.receiveShadows = prop.receiveShadows ?? true;

    if (prop.castShadows && shadowGenerator) {
      shadowGenerator.addShadowCaster(instance);
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// PARTICLES
// ══════════════════════════════════════════════════════════════════════════════

function buildParticles(scene: BABYLON.Scene, layout: SceneLayoutV2): void {
  layout.particles.forEach((config) => {
    const preset = PARTICLE_PRESETS[config.preset];
    if (!preset) {
      console.warn('[Particles] Unknown preset:', config.preset);
      return;
    }

    const ps = new BABYLON.ParticleSystem(config.id, 2000, scene);

    ps.emitter = new BABYLON.Vector3(
      config.emitterPosition.x,
      config.emitterPosition.y,
      config.emitterPosition.z
    );
    ps.minEmitBox = new BABYLON.Vector3(
      -config.emitterSize.x / 2,
      -config.emitterSize.y / 2,
      -config.emitterSize.z / 2
    );
    ps.maxEmitBox = new BABYLON.Vector3(
      config.emitterSize.x / 2,
      config.emitterSize.y / 2,
      config.emitterSize.z / 2
    );

    ps.minSize = config.sizeRange?.min ?? preset.minSize;
    ps.maxSize = config.sizeRange?.max ?? preset.maxSize;

    ps.minLifeTime = config.lifetimeRange?.min ?? preset.minLifeTime;
    ps.maxLifeTime = config.lifetimeRange?.max ?? preset.maxLifeTime;

    ps.emitRate = config.emitRate ?? preset.emitRate;

    const color = config.colorHex
      ? hexToColor4(config.colorHex)
      : new BABYLON.Color4(1, 1, 1, 0.4);
    ps.color1 = color;
    ps.color2 = new BABYLON.Color4(color.r, color.g, color.b, 0);
    ps.colorDead = new BABYLON.Color4(color.r, color.g, color.b, 0);

    const g = preset.gravity;
    ps.gravity = new BABYLON.Vector3(g.x, g.y, g.z);

    ps.minEmitPower = preset.minEmitPower;
    ps.maxEmitPower = preset.maxEmitPower;

    if (preset.direction1 && preset.direction2) {
      ps.direction1 = new BABYLON.Vector3(
        preset.direction1.x,
        preset.direction1.y,
        preset.direction1.z
      );
      ps.direction2 = new BABYLON.Vector3(
        preset.direction2.x,
        preset.direction2.y,
        preset.direction2.z
      );
    }

    ps.blendMode = preset.blendMode;

    ps.updateSpeed = 0.01;
    ps.start();

    console.log('[Particles] Started:', config.id, config.preset);
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// POST-PROCESSING
// ══════════════════════════════════════════════════════════════════════════════

function buildPostProcessing(scene: BABYLON.Scene, layout: SceneLayoutV2): void {
  const { postProcess } = layout;
  const camera = scene.activeCamera;
  if (!camera) {
    console.warn('[PostProcess] No active camera, skipping');
    return;
  }

  const pipeline = new BABYLON.DefaultRenderingPipeline(
    'defaultPipeline',
    true,
    scene,
    [camera]
  );

  if (postProcess.bloom?.enabled) {
    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = postProcess.bloom.threshold;
    pipeline.bloomWeight = postProcess.bloom.intensity;
    pipeline.bloomKernel = postProcess.bloom.blurKernelSize;
  }

  if (postProcess.fxaa) {
    pipeline.fxaaEnabled = true;
  }

  if (postProcess.toneMapping) {
    pipeline.imageProcessingEnabled = true;
    pipeline.imageProcessing.toneMappingEnabled = true;
  }

  if (postProcess.vignette?.enabled) {
    pipeline.imageProcessingEnabled = true;
    pipeline.imageProcessing.vignetteEnabled = true;
    pipeline.imageProcessing.vignetteWeight = postProcess.vignette.strength * 2;
    pipeline.imageProcessing.vignetteColor = hexToColor4(postProcess.vignette.colorHex);
  }

  if (postProcess.colorGrading?.enabled) {
    pipeline.imageProcessingEnabled = true;

    if (postProcess.colorGrading.exposure !== undefined) {
      pipeline.imageProcessing.exposure = postProcess.colorGrading.exposure;
    }

    if (postProcess.colorGrading.contrast !== undefined) {
      pipeline.imageProcessing.contrast = postProcess.colorGrading.contrast;
    }
  }

  if (postProcess.depthOfField?.enabled) {
    pipeline.depthOfFieldEnabled = true;
    pipeline.depthOfField.focalLength = postProcess.depthOfField.focalDistance;
    pipeline.depthOfFieldBlurLevel =
      postProcess.depthOfField.blurLevel as BABYLON.DepthOfFieldEffectBlurLevel;
  }

  console.log('[PostProcess] Configured');
}

// ══════════════════════════════════════════════════════════════════════════════
// AUDIO
// ══════════════════════════════════════════════════════════════════════════════

function buildAudio(scene: BABYLON.Scene, layout: SceneLayoutV2): void {
  const { audio } = layout;

  if (audio.ambientUrl) {
    new BABYLON.Sound('ambient', audio.ambientUrl, scene, null, {
      loop: audio.ambientLoop,
      autoplay: true,
      volume: audio.ambientVolume,
    });
    console.log('[Audio] Ambient loaded:', audio.ambientUrl);
  }

  if (audio.spatialSounds) {
    audio.spatialSounds.forEach((ss) => {
      const sound = new BABYLON.Sound(ss.id, ss.url, scene, null, {
        loop: ss.loop,
        autoplay: true,
        volume: ss.volume,
        spatialSound: true,
        maxDistance: ss.maxDistance,
      });
      sound.setPosition(
        new BABYLON.Vector3(ss.position.x, ss.position.y, ss.position.z)
      );
    });
  }
}