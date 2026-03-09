import { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import { buildScene } from './engine/sceneBuilder';
import { placeNPCs } from './engine/npcPlacer';
import type { Blueprint } from '@michiko/types';

export interface GameEngineHandles {
    npcMeshes: Array<{ id: string; name: string; position: BABYLON.Vector3 }>;
}

export function useGameEngine(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    blueprint: Blueprint | null,
    onNPCClick: (npcId: string) => void
) {
    const engineRef = useRef<BABYLON.Engine | null>(null);

    useEffect(() => {
        if (!canvasRef.current || !blueprint) return;

        const engine = new BABYLON.Engine(canvasRef.current, true, { preserveDrawingBuffer: true });
        engineRef.current = engine;

        const scene = new BABYLON.Scene(engine);
        buildScene(scene, blueprint.theme);

        // First-person camera
        const camera = new BABYLON.UniversalCamera('cam', new BABYLON.Vector3(0, 1.7, -15), scene);
        camera.setTarget(new BABYLON.Vector3(0, 1.5, 0));
        camera.attachControl(canvasRef.current, true);
        camera.keysUp = [87, 38]; // W / ↑
        camera.keysDown = [83, 40]; // S / ↓
        camera.keysLeft = [65, 37]; // A / ←
        camera.keysRight = [68, 39]; // D / →
        camera.speed = 0.15;
        camera.minZ = 0.1;

        // Place NPCs from first scene
        const scene0 = blueprint.scenes[0];
        if (scene0?.npcs) {
            const cfg = buildScene(scene, blueprint.theme);
            placeNPCs(scene, scene0.npcs, cfg.theme);
        }

        // NPC click detection
        scene.onPointerDown = (_evt, pickResult) => {
            if (!pickResult?.hit || !pickResult.pickedMesh) return;
            const name = pickResult.pickedMesh.name;
            const match = name.match(/npc-(?:body|head)-(.+)/);
            if (match) onNPCClick(match[1]);
        };

        engine.runRenderLoop(() => scene.render());
        window.addEventListener('resize', () => engine.resize());

        return () => {
            engine.dispose();
            window.removeEventListener('resize', () => engine.resize());
        };
    }, [blueprint]);
}