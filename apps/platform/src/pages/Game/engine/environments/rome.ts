import * as BABYLON from '@babylonjs/core';
import type { SceneLayout } from '@michiko/types';
import { hex, torch } from './helpers';

const SEGS = 36; // segments around the oval

// Ellipse helper
function ellipsePos(i: number, total: number, A: number, B: number) {
    const t = (i / total) * Math.PI * 2;
    return { x: Math.cos(t) * A, z: Math.sin(t) * B, t };
}

export function buildRomeProps(scene: BABYLON.Scene, layout: SceneLayout) {
    const stone = hex(scene, '#9b8262');
    const dark = hex(scene, '#3a2e1e');
    const sand = hex(scene, '#d4b870');
    const marble = hex(scene, '#cbbea0');
    const travertine = hex(scene, '#b09870');

    buildArenaFloor(scene, sand);
    buildHypogeum(scene, dark, sand);
    buildPodiumWall(scene, stone, dark, layout.accentColor);
    buildColosseumOval(scene, stone, dark, marble, travertine);
    buildTorchRing(scene, layout.accentColor);
    buildArenaProps(scene, stone, dark, sand);
}

// ── 1. Sandy oval arena floor ────────────────────────────────
function buildArenaFloor(scene: BABYLON.Scene, sand: BABYLON.StandardMaterial) {
    // Oval floor using a scaled disc
    const disc = BABYLON.MeshBuilder.CreateDisc('arena_floor', { radius: 19, tessellation: 64 }, scene);
    disc.rotation.x = Math.PI / 2;
    disc.scaling.z = 0.7; // 19 x 13.3 oval
    disc.position.y = 0.02;
    disc.material = sand;

    // Sand texture suggestion — concentric oval rings scratched in
    [8, 13, 17].forEach((r, i) => {
        const ring = BABYLON.MeshBuilder.CreateTorus(`sand_ring_${i}`, {
            diameter: r * 2,
            thickness: 0.06,
            tessellation: 48,
        }, scene);
        ring.scaling.z = 0.7;
        ring.position.y = 0.04;
        ring.material = sand;
        ring.isPickable = false;
    });
}

// ── 2. Underground hypogeum — visible through trapdoors ───────
function buildHypogeum(
    scene: BABYLON.Scene,
    dark: BABYLON.StandardMaterial,
    sand: BABYLON.StandardMaterial
) {
    // Pit below arena
    const pit = BABYLON.MeshBuilder.CreateBox('hypogeum', { width: 36, height: 4, depth: 25 }, scene);
    pit.position = new BABYLON.Vector3(0, -2.2, 0);
    pit.material = dark;
    pit.isPickable = false;

    // Grate openings on arena floor (suggest tunnel entrances)
    const positions: [number, number][] = [[-8, 0], [8, 0], [0, -5], [0, 5], [-4, -3], [4, 3]];
    positions.forEach(([x, z], i) => {
        const grate = BABYLON.MeshBuilder.CreateBox(`grate_${i}`, { width: 1.8, height: 0.08, depth: 1.2 }, scene);
        grate.position = new BABYLON.Vector3(x, 0.03, z);
        grate.material = dark;
        grate.isPickable = false;
    });

    // North/South gladiator tunnel entrances
    [-1, 1].forEach((side, i) => {
        const tunnel = BABYLON.MeshBuilder.CreateBox(`tunnel_${i}`, { width: 4, height: 3, depth: 6 }, scene);
        tunnel.position = new BABYLON.Vector3(0, 0.5, side * 18);
        tunnel.material = dark;
        tunnel.isPickable = false;

        const arch = BABYLON.MeshBuilder.CreateBox(`tunnel_arch_${i}`, { width: 4.8, height: 4, depth: 1.5 }, scene);
        arch.position = new BABYLON.Vector3(0, 2, side * 15.5);
        arch.material = dark;
        arch.isPickable = false;
    });
}

// ── 3. Inner podium wall ──────────────────────────────────────
function buildPodiumWall(
    scene: BABYLON.Scene,
    stone: BABYLON.StandardMaterial,
    dark: BABYLON.StandardMaterial,
    accentHex: string
) {
    const AP = 21, BP = 15; // podium axes
    const PSEGS = 32;

    for (let i = 0; i < PSEGS; i++) {
        const p0 = ellipsePos(i, PSEGS, AP, BP);
        const p1 = ellipsePos(i + 1, PSEGS, AP, BP);
        const cx = (p0.x + p1.x) / 2;
        const cz = (p0.z + p1.z) / 2;
        const segW = Math.sqrt((p1.x - p0.x) ** 2 + (p1.z - p0.z) ** 2) + 0.3;
        const faceAngle = Math.atan2(cx, cz);

        const wall = BABYLON.MeshBuilder.CreateBox(`pod_${i}`, { width: segW, height: 3.5, depth: 2.5 }, scene);
        wall.position = new BABYLON.Vector3(cx, 1.75, cz);
        wall.rotation.y = faceAngle;
        wall.material = stone;
        wall.isPickable = false;

        // Arch gap every 4 segments (exits to arena)
        if (i % 4 === 0) {
            const gap = BABYLON.MeshBuilder.CreateBox(`pod_gap_${i}`, { width: segW * 0.5, height: 2.8, depth: 2.6 }, scene);
            gap.position = new BABYLON.Vector3(cx, 1.4, cz);
            gap.rotation.y = faceAngle;
            gap.material = dark;
            gap.isPickable = false;
        }

        // Top coping stones
        const coping = BABYLON.MeshBuilder.CreateBox(`coping_${i}`, { width: segW + 0.1, height: 0.4, depth: 2.8 }, scene);
        coping.position = new BABYLON.Vector3(cx, 3.7, cz);
        coping.rotation.y = faceAngle;
        coping.material = stone;
        coping.isPickable = false;
    }

    // Torch on podium top every 8 segments
    for (let i = 0; i < PSEGS; i += 8) {
        const p = ellipsePos(i, PSEGS, AP, BP);
        torch(scene, p.x, p.z, accentHex, `pod_torch_${i}`);
    }
}

// ── 4. Main oval colosseum — 3 tiers with arches & columns ───
function buildColosseumOval(
    scene: BABYLON.Scene,
    stone: BABYLON.StandardMaterial,
    dark: BABYLON.StandardMaterial,
    marble: BABYLON.StandardMaterial,
    travertine: BABYLON.StandardMaterial
) {
    const AO = 38, BO = 28; // outer axes
    const tierMats = [stone, travertine, marble];
    const tierH = 7;

    for (let i = 0; i < SEGS; i++) {
        const p0 = ellipsePos(i, SEGS, AO, BO);
        const p1 = ellipsePos(i + 1, SEGS, AO, BO);
        const cx = (p0.x + p1.x) / 2;
        const cz = (p0.z + p1.z) / 2;
        const segW = Math.sqrt((p1.x - p0.x) ** 2 + (p1.z - p0.z) ** 2) + 0.5;
        const faceAngle = Math.atan2(cx, cz);

        // 3 wall tiers
        for (let tier = 0; tier < 3; tier++) {
            const wall = BABYLON.MeshBuilder.CreateBox(`ow_${i}_${tier}`, {
                width: segW, height: tierH, depth: 5.5
            }, scene);
            wall.position = new BABYLON.Vector3(cx, tier * tierH + tierH / 2, cz);
            wall.rotation.y = faceAngle;
            wall.material = tierMats[tier]!;
            wall.isPickable = false;

            // Arched opening — dark recessed box
            const archW = segW * 0.52;
            const archH = tierH * 0.72;
            const arch = BABYLON.MeshBuilder.CreateBox(`arch_${i}_${tier}`, {
                width: archW, height: archH, depth: 5.7
            }, scene);
            arch.position = new BABYLON.Vector3(cx, tier * tierH + archH / 2, cz);
            arch.rotation.y = faceAngle;
            arch.material = dark;
            arch.isPickable = false;
        }

        // Half-column at each node (Doric/Ionic/Corinthian suggestion)
        const colX = p0.x * 1.01;
        const colZ = p0.z * 1.01;
        const col = BABYLON.MeshBuilder.CreateCylinder(`col_${i}`, {
            height: 22, diameterTop: 0.65, diameterBottom: 0.85, tessellation: 10
        }, scene);
        col.position = new BABYLON.Vector3(colX, 11, colZ);
        col.material = marble;
        col.isPickable = false;

        // Capital
        const capital = BABYLON.MeshBuilder.CreateBox(`capital_${i}`, { width: 1.1, height: 0.5, depth: 1.1 }, scene);
        capital.position = new BABYLON.Vector3(colX, 22.25, colZ);
        capital.material = marble;
        capital.isPickable = false;

        // Cornice bands between tiers
        [tierH, tierH * 2].forEach((y, ci) => {
            const cornice = BABYLON.MeshBuilder.CreateBox(`cornice_${i}_${ci}`, {
                width: segW + 0.15, height: 0.55, depth: 5.8
            }, scene);
            cornice.position = new BABYLON.Vector3(cx, y, cz);
            cornice.rotation.y = faceAngle;
            cornice.material = marble;
            cornice.isPickable = false;
        });

        // Attic (4th level — solid wall with small windows)
        const attic = BABYLON.MeshBuilder.CreateBox(`attic_${i}`, {
            width: segW, height: 3.5, depth: 4.5
        }, scene);
        attic.position = new BABYLON.Vector3(cx, tierH * 3 + 1.75, cz);
        attic.rotation.y = faceAngle;
        attic.material = stone;
        attic.isPickable = false;

        // Small attic window
        const win = BABYLON.MeshBuilder.CreateBox(`win_${i}`, {
            width: segW * 0.3, height: 1.5, depth: 4.7
        }, scene);
        win.position = new BABYLON.Vector3(cx, tierH * 3 + 1.75, cz);
        win.rotation.y = faceAngle;
        win.material = dark;
        win.isPickable = false;

        // Top cornice / crown
        const crown = BABYLON.MeshBuilder.CreateBox(`crown_${i}`, {
            width: segW + 0.2, height: 0.8, depth: 5.0
        }, scene);
        crown.position = new BABYLON.Vector3(cx, tierH * 3 + 3.9, cz);
        crown.rotation.y = faceAngle;
        crown.material = marble;
        crown.isPickable = false;
    }

    // Seating suggestion — tiered angled slabs inside the oval
    buildSeating(scene, stone, dark);
}

// ── 5. Seating tiers (cavea) ──────────────────────────────────
function buildSeating(
    scene: BABYLON.Scene,
    stone: BABYLON.StandardMaterial,
    dark: BABYLON.StandardMaterial
) {
    const SSEGS = 28;
    // 4 seating rings from inner to outer
    const rings = [
        { A: 22, B: 16, y: 4.0, tilt: -0.25 },
        { A: 26, B: 19, y: 7.5, tilt: -0.28 },
        { A: 30, B: 22, y: 11.5, tilt: -0.30 },
        { A: 34, B: 25, y: 16.0, tilt: -0.32 },
    ];

    rings.forEach(({ A, B, y, tilt }, ri) => {
        for (let i = 0; i < SSEGS; i++) {
            const p0 = ellipsePos(i, SSEGS, A, B);
            const p1 = ellipsePos(i + 1, SSEGS, A, B);
            const cx = (p0.x + p1.x) / 2;
            const cz = (p0.z + p1.z) / 2;
            const segW = Math.sqrt((p1.x - p0.x) ** 2 + (p1.z - p0.z) ** 2) + 0.3;
            const faceAngle = Math.atan2(cx, cz);

            const slab = BABYLON.MeshBuilder.CreateBox(`seat_${ri}_${i}`, {
                width: segW, height: 0.4, depth: 2.8
            }, scene);
            slab.position = new BABYLON.Vector3(cx, y, cz);
            slab.rotation.y = faceAngle;
            slab.rotation.x = tilt; // slight downward slope toward arena
            slab.material = ri % 2 === 0 ? stone : dark;
            slab.isPickable = false;
        }
    });
}

// ── 6. Torch ring inside the arches ──────────────────────────
function buildTorchRing(scene: BABYLON.Scene, accentHex: string) {
    const AT = 33, BT = 24;
    // Torch at every 3rd segment
    for (let i = 0; i < SEGS; i += 3) {
        const p = ellipsePos(i, SEGS, AT, BT);
        torch(scene, p.x, p.z, accentHex, `ring_torch_${i}`);
    }
}

// ── 7. Arena floor props ──────────────────────────────────────
function buildArenaProps(
    scene: BABYLON.Scene,
    stone: BABYLON.StandardMaterial,
    dark: BABYLON.StandardMaterial,
    sand: BABYLON.StandardMaterial
) {
    // Central podium / sponsor box
    const podium = BABYLON.MeshBuilder.CreateBox('editor_box', { width: 3, height: 0.6, depth: 2 }, scene);
    podium.position = new BABYLON.Vector3(0, 0.3, -10);
    podium.material = stone;

    // Broken column lying on sand
    const fallen = BABYLON.MeshBuilder.CreateCylinder('fallen_col', {
        height: 3.5, diameter: 0.55, tessellation: 10
    }, scene);
    fallen.position = new BABYLON.Vector3(-7, 0.28, 3);
    fallen.rotation.z = Math.PI / 2;
    fallen.rotation.y = 0.6;
    fallen.material = stone;

    // Upright broken column stump
    const stump = BABYLON.MeshBuilder.CreateCylinder('col_stump', {
        height: 1.8, diameterTop: 0.7, diameterBottom: 0.55, tessellation: 10
    }, scene);
    stump.position = new BABYLON.Vector3(-6.5, 0.9, 3);
    stump.material = stone;

    // Shield prop
    const shield = BABYLON.MeshBuilder.CreateCylinder('shield', {
        height: 0.08, diameterTop: 0.9, diameterBottom: 0.9, tessellation: 12
    }, scene);
    shield.position = new BABYLON.Vector3(4, 0.04, -2);
    shield.material = dark;

    // Sand dune suggestions
    [[-5, 6], [8, -4], [-10, -2], [3, 8]].forEach(([x, z], i) => {
        const dune = BABYLON.MeshBuilder.CreateSphere(`dune_${i}`, { diameter: 2, segments: 4 }, scene);
        dune.scaling.y = 0.18;
        dune.position = new BABYLON.Vector3(x!, 0.09, z!);
        dune.material = sand;
        dune.isPickable = false;
    });
}