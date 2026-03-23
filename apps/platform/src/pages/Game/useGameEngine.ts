import React, { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF'; // Required for GLB loading

// Legacy builder (keep for backwards compatibility)
import { buildScene } from './engine/sceneBuilder';

// NEW: V2 builder
import { buildSceneV2 } from './engine/sceneBuilderV2';

// NEW: V2 environment configs
import { getEnvironmentV2 } from './engine/environments-v2';
import { matchEnvironmentV2 } from './engine/environments-v2/index';

import { placeNPCs } from './engine/npcPlacer';
import { getAnimation } from './engine/animationRules';
import type { NPCController } from './engine/npcPlacer';
import type { Blueprint, SceneLayoutV2 } from '@michiko/types';

// Feature flag — set to false to revert to legacy
const USE_V2_ENVIRONMENTS = true;

export function useGameEngine(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    blueprint: Blueprint | null,
    onNPCClick: (npcId: string) => void
) {
    const engineRef = useRef<BABYLON.Engine | null>(null);
    const sceneRef = useRef<BABYLON.Scene | null>(null);
    const [sceneReady, setSceneReady] = React.useState(false);
    const [loadingProgress, setLoadingProgress] = React.useState(0);
    const [loadingStage, setLoadingStage] = React.useState('');
    const cameraRef = useRef<BABYLON.UniversalCamera | null>(null);
    const npcControllerRef = useRef<NPCController | null>(null);

    // Always points to latest onNPCClick — prevents stale closure in placeNPCs/onPointerDown
    const onNPCClickRef = useRef(onNPCClick);
    onNPCClickRef.current = onNPCClick;

    // ── Streak tracking ──────────────────────────────────────
    const correctStreakRef = useRef(0);
    const wrongStreakRef = useRef(0);

    useEffect(() => {
        if (!canvasRef.current || !blueprint) return;

        let disposed = false;

        const engine = new BABYLON.Engine(canvasRef.current, true, {
            preserveDrawingBuffer: true,
            stencil: true,
        });
        engineRef.current = engine;

        const scene = new BABYLON.Scene(engine);
        sceneRef.current = scene;

        // ══════════════════════════════════════════════════════════
        // CRITICAL: Create camera FIRST, before render loop starts
        // ══════════════════════════════════════════════════════════
        const camera = new BABYLON.UniversalCamera(
            'cam',
            new BABYLON.Vector3(0, 1.7, -12),
            scene
        );
        camera.setTarget(new BABYLON.Vector3(0, 1.5, 0));
        camera.attachControl(canvasRef.current, true);

        // WASD + Arrow keys
        camera.keysUp = [87, 38];      // W + Up
        camera.keysDown = [83, 40];    // S + Down
        camera.keysLeft = [65, 37];    // A + Left
        camera.keysRight = [68, 39];   // D + Right
        camera.keysUpward = [];
        camera.keysDownward = [];
        camera.speed = 0.18;
        camera.minZ = 0.1;
        camera.fov = 1.2;
        camera.inertia = 0.85;
        camera.angularSensibility = 800;

        // Collision & gravity
        camera.checkCollisions = true;
        camera.applyGravity = true;
        camera.ellipsoid = new BABYLON.Vector3(0.4, 0.85, 0.4);
        scene.gravity = new BABYLON.Vector3(0, -0.98, 0);
        scene.collisionsEnabled = true;

        // Head bob
        // Head bob + Boundary clamp
        let bobTime = 0;
        const BASE_Y = 1.7;
        const TERRAIN_SIZE = 100; // Match your terrain.size in config
        const BOUNDARY = TERRAIN_SIZE / 2 - 5; // Stay 5 units from edge

        scene.registerBeforeRender(() => {
            const moving = (camera as any)._localDirection?.length() > 0.01;
            if (moving) {
                bobTime += 0.1;
                camera.position.y = BASE_Y + Math.sin(bobTime * 2) * 0.028;
            } else {
                camera.position.y += (BASE_Y - camera.position.y) * 0.12;
                bobTime = 0;
            }

            // ═══ BOUNDARY CLAMP - Keep player on terrain ═══
            if (camera.position.x > BOUNDARY) camera.position.x = BOUNDARY;
            if (camera.position.x < -BOUNDARY) camera.position.x = -BOUNDARY;
            if (camera.position.z > BOUNDARY) camera.position.z = BOUNDARY;
            if (camera.position.z < -BOUNDARY) camera.position.z = -BOUNDARY;
        });

        cameraRef.current = camera;

        // ══════════════════════════════════════════════════════════
        // NOW start render loop (camera exists)
        // ══════════════════════════════════════════════════════════
        engine.runRenderLoop(() => scene.render());

        // ══════════════════════════════════════════════════════════
        // Build Scene (V2 or Legacy) - async
        // ══════════════════════════════════════════════════════════
        const initScene = async () => {
            if (disposed) return;

            try {
                if (USE_V2_ENVIRONMENTS) {
                    const envId = blueprint.sceneLayout.environment;
                    let v2Config = getEnvironmentV2(envId);

                    // If no exact match, try matching by subject
                    if (!v2Config && blueprint.subject) {
                        v2Config = matchEnvironmentV2(blueprint.subject);
                        console.log(`[Engine] No exact V2 match for "${envId}", matched to "${v2Config.id}" by subject`);
                    }

                    if (v2Config) {
                        console.log(`[Engine] Using V2 environment: ${v2Config.name}`);

                        const layoutV2: SceneLayoutV2 = {
                            environment: v2Config.id,
                            skybox: v2Config.skybox,
                            terrain: v2Config.terrain,
                            fog: v2Config.fog,
                            lighting: v2Config.lighting,
                            props: v2Config.props,
                            particles: v2Config.particles,
                            postProcess: v2Config.postProcess,
                            audio: v2Config.audio,
                            spawnPoints: v2Config.spawnPoints,
                        };

                        await buildSceneV2(scene, layoutV2, (stage, percent) => {
                            if (disposed) return;
                            setLoadingStage(stage);
                            setLoadingProgress(percent);
                            console.log(`[Engine] ${stage}: ${percent}%`);
                        });
                    } else {
                        console.log(`[Engine] No V2 config found, using legacy builder`);
                        buildScene(scene, blueprint.sceneLayout);
                    }
                } else {
                    buildScene(scene, blueprint.sceneLayout);
                }

                if (disposed) return;
                setSceneReady(true);
                setLoadingProgress(100);
                setLoadingStage('Complete');

            } catch (err) {
                console.error('[Engine] Scene build failed:', err);
                if (disposed) return;
                // Fallback to legacy
                buildScene(scene, blueprint.sceneLayout);
                setSceneReady(true);
            }
        };

        initScene();

        // ══════════════════════════════════════════════════════════
        // Load NPCs (wait for scene to be ready)
        // ══════════════════════════════════════════════════════════
        const scene0 = blueprint.scenes[0];
        if (scene0?.npcs) {
            console.log('🟡 Starting NPC load, npcs:', scene0.npcs.map(n => n.name));

            placeNPCs(
                scene,
                scene0.npcs,
                blueprint.sceneLayout,
                (npc) => onNPCClickRef.current(npc.id),
                (npc) => onNPCClickRef.current(npc.id + '__leave'),
                blueprint.subject,
                blueprint.theme,
            ).then(controller => {
                console.log('🟢 placeNPCs resolved, disposed:', disposed);
                if (disposed) {
                    console.warn('⚠️ Disposed before NPCs loaded — React StrictMode');
                    return;
                }
                npcControllerRef.current = controller;

                scene0.npcs.forEach((npc, i) => {
                    setTimeout(() => {
                        if (disposed) return;
                        const rule = getAnimation('game_start', npc, {
                            environment: blueprint.sceneLayout.environment,
                            ageGroup: blueprint.ageGroup,
                        });
                        controller.triggerEvent('game_start', npc.id, rule);
                    }, i * 400);
                });
            }).catch(err => {
                console.error('❌ Failed to load NPCs:', err);
            });
        }

        scene.onPointerDown = (_evt, pickResult) => {
            console.log('🖱️ pointer down, hit:', pickResult?.pickedMesh?.name ?? 'none');
            if (!pickResult?.hit || !pickResult.pickedMesh) return;
            const name = pickResult.pickedMesh.name;
            const match = name.match(/whb_(.+)/);
            if (match) onNPCClickRef.current(match[1]!);
        };

        const onResize = () => engine.resize();
        window.addEventListener('resize', onResize);

        return () => {
            disposed = true;
            npcControllerRef.current?.dispose();
            npcControllerRef.current = null;
            engine.dispose();
            window.removeEventListener('resize', onResize);
            sceneRef.current = null;
            cameraRef.current = null;
        };
    }, [blueprint]);

    // ── Public methods for GamePage ──────────────────────────

    const onDialogueOpen = (npcId: string) => {
        const ctrl = npcControllerRef.current;
        const npc = getNPC(blueprint, npcId);
        if (!ctrl || !npc) return;
        const rule = getAnimation('dialogue_open', npc, {
            environment: blueprint?.sceneLayout.environment,
            ageGroup: blueprint?.ageGroup,
        });
        ctrl.triggerEvent('dialogue_open', npcId, rule);
    };

    const onDialogueClose = (npcId: string) => {
        const ctrl = npcControllerRef.current;
        const npc = getNPC(blueprint, npcId);
        if (!ctrl || !npc) return;
        const rule = getAnimation('dialogue_close', npc, {
            environment: blueprint?.sceneLayout.environment,
        });
        ctrl.triggerEvent('dialogue_close', npcId, rule);
        ctrl.setDialogueClosed(npcId);
    };

    const onQuestionOpen = (npcId: string) => {
        const ctrl = npcControllerRef.current;
        const npc = getNPC(blueprint, npcId);
        if (!ctrl || !npc) return;
        const rule = getAnimation('question_open', npc, {
            environment: blueprint?.sceneLayout.environment,
        });
        ctrl.triggerEvent('question_open', npcId, rule);
    };

    const onAnswerCorrect = (npcId: string, totalScore: number, maxScore: number) => {
        const ctrl = npcControllerRef.current;
        const npc = getNPC(blueprint, npcId);
        if (!ctrl || !npc) return;

        correctStreakRef.current += 1;
        wrongStreakRef.current = 0;
        const streak = correctStreakRef.current;

        const rule = getAnimation('answer_correct', npc, {
            environment: blueprint?.sceneLayout.environment,
            ageGroup: blueprint?.ageGroup,
            streak,
            scoreRatio: maxScore > 0 ? totalScore / maxScore : 0,
        });
        ctrl.triggerEvent('answer_correct', npcId, rule);

        if (streak === 3 || streak === 5 || streak === 10) {
            getAllNPCIds(blueprint).forEach(id => {
                if (id === npcId) return;
                const otherNpc = getNPC(blueprint, id);
                if (!otherNpc) return;
                const streakRule = getAnimation('player_correct_streak', otherNpc, {
                    environment: blueprint?.sceneLayout.environment,
                });
                setTimeout(() => ctrl.triggerEvent('player_correct_streak', id, streakRule), 300);
            });
        }
    };

    const onAnswerWrong = (npcId: string) => {
        const ctrl = npcControllerRef.current;
        const npc = getNPC(blueprint, npcId);
        if (!ctrl || !npc) return;

        wrongStreakRef.current += 1;
        correctStreakRef.current = 0;
        const streak = wrongStreakRef.current;

        const rule = getAnimation('answer_wrong', npc, {
            environment: blueprint?.sceneLayout.environment,
            ageGroup: blueprint?.ageGroup,
            streak,
        });
        ctrl.triggerEvent('answer_wrong', npcId, rule);

        if (streak >= 3) {
            getAllNPCIds(blueprint).forEach(id => {
                if (id === npcId) return;
                const otherNpc = getNPC(blueprint, id);
                if (!otherNpc || otherNpc.role !== 'villain') return;
                const streakRule = getAnimation('player_wrong_streak', otherNpc, {
                    environment: blueprint?.sceneLayout.environment,
                });
                setTimeout(() => ctrl.triggerEvent('player_wrong_streak', id, streakRule), 500);
            });
        }
    };

    const onHintRequested = (npcId: string) => {
        const ctrl = npcControllerRef.current;
        const npc = getNPC(blueprint, npcId);
        if (!ctrl || !npc) return;
        const rule = getAnimation('hint_requested', npc, {
            environment: blueprint?.sceneLayout.environment,
        });
        ctrl.triggerEvent('hint_requested', npcId, rule);
    };

    const onGameComplete = (totalScore: number, maxScore: number) => {
        const ctrl = npcControllerRef.current;
        if (!ctrl || !blueprint) return;

        getAllNPCIds(blueprint).forEach((id, i) => {
            const npc = getNPC(blueprint, id);
            if (!npc) return;
            setTimeout(() => {
                const rule = getAnimation('game_complete', npc, {
                    environment: blueprint.sceneLayout.environment,
                    ageGroup: blueprint.ageGroup,
                    scoreRatio: maxScore > 0 ? totalScore / maxScore : 0,
                });
                ctrl.triggerEvent('game_complete', id, rule);
            }, i * 300);
        });
    };

    return {
        sceneRef,
        sceneReady,
        cameraRef,
        loadingProgress,
        loadingStage,
        onDialogueOpen,
        onDialogueClose,
        onQuestionOpen,
        onAnswerCorrect,
        onAnswerWrong,
        onHintRequested,
        onGameComplete,
    };
}

// ── Helpers ───────────────────────────────────────────────────
function getNPC(blueprint: Blueprint | null, npcId: string) {
    if (!blueprint) return null;
    for (const scene of blueprint.scenes) {
        const found = scene.npcs.find(n => n.id === npcId);
        if (found) return found;
    }
    return null;
}

function getAllNPCIds(blueprint: Blueprint | null): string[] {
    if (!blueprint) return [];
    return blueprint.scenes.flatMap(s => s.npcs.map(n => n.id));
}