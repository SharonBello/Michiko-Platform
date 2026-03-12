import * as BABYLON from '@babylonjs/core';
import type { SceneLayout } from '@michiko/types';
import { hex, torch } from './helpers';

export function buildLibraryProps(scene: BABYLON.Scene, layout: SceneLayout) {
    const wood = hex(scene, '#3d2200');
    const shelf = hex(scene, '#5a3510');
    const book1 = hex(scene, '#8b1a1a');
    const book2 = hex(scene, '#1a4a8b');
    const book3 = hex(scene, '#1a6b1a');
    const book4 = hex(scene, '#8b6b1a');

    // Bookshelf walls
    [[-10, 0], [10, 0], [-10, 8], [10, 8]].forEach(([x, z], i) => {
        buildBookshelf(scene, x!, z!, [book1, book2, book3, book4], shelf, wood, i);
    });

    // Reading tables
    [[-4, 2], [4, 2], [0, -4]].forEach(([x, z], i) => {
        const table = BABYLON.MeshBuilder.CreateBox(`table_${i}`,
            { width: 3, height: 0.1, depth: 1.5 }, scene);
        table.position = new BABYLON.Vector3(x!, 0.9, z!);
        table.material = wood;

        const leg1 = BABYLON.MeshBuilder.CreateBox(`leg1_${i}`,
            { width: 0.1, height: 0.9, depth: 0.1 }, scene);
        leg1.position = new BABYLON.Vector3(x! - 1.3, 0.45, z! - 0.6);
        leg1.material = wood;

        const leg2 = leg1.clone(`leg2_${i}`);
        leg2.position = new BABYLON.Vector3(x! + 1.3, 0.45, z! - 0.6);

        const leg3 = leg1.clone(`leg3_${i}`);
        leg3.position = new BABYLON.Vector3(x! - 1.3, 0.45, z! + 0.6);

        const leg4 = leg1.clone(`leg4_${i}`);
        leg4.position = new BABYLON.Vector3(x! + 1.3, 0.45, z! + 0.6);

        // Book on table
        const bookOnTable = BABYLON.MeshBuilder.CreateBox(`book_table_${i}`,
            { width: 0.8, height: 0.08, depth: 0.6 }, scene);
        bookOnTable.position = new BABYLON.Vector3(x! - 0.3, 0.99, z!);
        bookOnTable.rotation.y = 0.3;
        bookOnTable.material = [book1, book2, book3][i % 3]!;
    });

    // Candles
    [[-6, 5], [6, 5], [0, 8]].forEach(([x, z], i) => {
        torch(scene, x!, z!, layout.accentColor, `library_${i}`);
    });

    // Arched ceiling suggestion
    buildArch(scene, wood, 0, 10);
    buildArch(scene, wood, 0, 5);
}

function buildBookshelf(
    scene: BABYLON.Scene, x: number, z: number,
    bookMats: BABYLON.StandardMaterial[],
    shelfMat: BABYLON.StandardMaterial,
    baseMat: BABYLON.StandardMaterial,
    idx: number
) {
    const rot = x < 0 ? Math.PI / 2 : -Math.PI / 2;

    const frame = BABYLON.MeshBuilder.CreateBox(`shelf_frame_${idx}`,
        { width: 4, height: 5, depth: 0.3 }, scene);
    frame.position = new BABYLON.Vector3(x, 2.5, z);
    frame.rotation.y = rot;
    frame.material = baseMat;

    for (let row = 0; row < 4; row++) {
        const shelf_ = BABYLON.MeshBuilder.CreateBox(`shelf_${idx}_${row}`,
            { width: 3.8, height: 0.08, depth: 0.35 }, scene);
        shelf_.position = new BABYLON.Vector3(x, 0.8 + row * 1.0, z);
        shelf_.rotation.y = rot;
        shelf_.material = shelfMat;

        for (let b = 0; b < 6; b++) {
            const book = BABYLON.MeshBuilder.CreateBox(`book_${idx}_${row}_${b}`,
                { width: 0.18, height: 0.7 + Math.random() * 0.3, depth: 0.28 }, scene);
            book.position = new BABYLON.Vector3(x, 1.1 + row * 1.0, z + (b - 2.5) * 0.32);
            book.rotation.y = rot;
            book.material = bookMats[b % bookMats.length]!;
            book.isPickable = false;
        }
    }
}

function buildArch(scene: BABYLON.Scene, mat: BABYLON.StandardMaterial, x: number, z: number) {
    const left = BABYLON.MeshBuilder.CreateBox(`arch_left_${z}`,
        { width: 0.5, height: 6, depth: 0.5 }, scene);
    left.position = new BABYLON.Vector3(x - 4, 3, z);
    left.material = mat;

    const right = BABYLON.MeshBuilder.CreateBox(`arch_right_${z}`,
        { width: 0.5, height: 6, depth: 0.5 }, scene);
    right.position = new BABYLON.Vector3(x + 4, 3, z);
    right.material = mat;

    const top = BABYLON.MeshBuilder.CreateBox(`arch_top_${z}`,
        { width: 8.5, height: 0.5, depth: 0.5 }, scene);
    top.position = new BABYLON.Vector3(x, 6.25, z);
    top.material = mat;
}