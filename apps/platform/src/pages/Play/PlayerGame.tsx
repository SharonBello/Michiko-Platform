import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as BABYLON from '@babylonjs/core';
import { useGameEngine } from '../Game/useGameEngine';
import { initGameState, getCurrentScene, getCurrentQuestion, answerQuestion } from '../Game/engine/questionManager';
import { QuestionOverlay } from '../Game/ui/QuestionOverlay';
import { NPCDialogue } from '../Game/ui/NPCDialogue';
import { ScoreHUD } from '../Game/ui/ScoreHUD';
import { burstCorrect, burstWrong } from '../Game/engine/particleEffects';
import { showScorePopup } from '../Game/engine/scorePopup';
import { SoundManager } from '../Game/engine/soundManager';
import { api } from '../../lib/api';
import type { Blueprint, Game } from '@michiko/types';
import type { GameState } from '../Game/engine/questionManager';
import styles from '../Game/Game.module.scss';

type UIMode = 'explore' | 'dialogue' | 'question' | 'complete';

export default function PlayerGame() {
    const { code } = useParams<{ code: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { playerName, game, blueprint } = location.state as {
        playerName: string;
        game: Game;
        blueprint: Blueprint;
    };

    const [gameState, setGameState] = useState<GameState>(() => initGameState(blueprint));
    const [uiMode, setUiMode] = useState<UIMode>('explore');
    const [activeNpcId, setActiveNpcId] = useState<string | null>(null);
    const [startTime] = useState(() => Date.now());
    const [scoreSaved, setScoreSaved] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const [streak, setStreak] = useState(0);
    const soundRef = useRef<SoundManager | null>(null);

    function handleNPCClick(npcId: string) {
        // npcPlacer fires npcId + '__leave' when player walks away
        if (npcId.endsWith('__leave')) {
            const realId = npcId.replace('__leave', '');
            onDialogueClose(realId);
            setUiMode('explore');
            setActiveNpcId(null);
            return;
        }
        if (uiMode !== 'explore') return;
        setActiveNpcId(npcId);
        setUiMode('dialogue');
        onDialogueOpen(npcId);
        soundRef.current?.playSFX('dialogue');
    }

    const {
        sceneRef, cameraRef,
        onDialogueOpen, onDialogueClose,
        onQuestionOpen, onAnswerCorrect, onAnswerWrong,
        onGameComplete,
    } = useGameEngine(canvasRef, blueprint, handleNPCClick);

    // Start sound manager once scene is ready
    useEffect(() => {
        if (!sceneRef.current) return;
        const sm = new SoundManager(sceneRef.current, blueprint.sceneLayout.environment);
        sm.startAmbient();
        soundRef.current = sm;
        return () => { sm.dispose(); soundRef.current = null; };
    }, [sceneRef.current]);

    function handleDialogueDismiss() {
        if (activeNpcId) onDialogueClose(activeNpcId);
        setUiMode('question');
        if (activeNpcId) onQuestionOpen(activeNpcId);
    }

    function handleAnswer(answer: string) {
        const question = getCurrentQuestion(blueprint, gameState);
        const correct = answer === question?.answer;

        // Streak tracking
        const newStreak = correct ? streak + 1 : 0;
        setStreak(newStreak);
        const multiplier = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
        const points = correct ? (question?.points ?? 1) * multiplier : 0;

        if (sceneRef.current && cameraRef.current) {
            // Burst particles from NPC position
            const scene0 = getCurrentScene(blueprint, gameState);
            const npcId = activeNpcId ?? scene0?.npcs?.[0]?.id ?? null;
            const npcPos = npcId
                ? sceneRef.current.getTransformNodeByName(`npc_root_${npcId}`)?.position
                ?? cameraRef.current.position.add(new BABYLON.Vector3(0, 0, 3))
                : cameraRef.current.position.add(new BABYLON.Vector3(0, 0, 3));

            if (correct) {
                burstCorrect(sceneRef.current, npcPos, blueprint.theme);
                showScorePopup(sceneRef.current, npcPos, points, multiplier);
                soundRef.current?.playSFX(newStreak >= 3 ? 'streak' : 'correct');
            } else {
                burstWrong(sceneRef.current, npcPos);
                soundRef.current?.playSFX('wrong');
            }
        }

        const next = answerQuestion(blueprint, gameState, answer);
        setGameState(next);

        const scene0 = getCurrentScene(blueprint, gameState);
        const targetId = activeNpcId ?? scene0?.npcs?.[0]?.id ?? null;
        if (targetId) {
            correct
                ? onAnswerCorrect(targetId, next.score, next.totalQuestions)
                : onAnswerWrong(targetId);
        }

        if (next.complete) {
            soundRef.current?.playSFX('complete');
            onGameComplete(next.score, next.totalQuestions);
            setUiMode('complete');
            setTransitioning(false);
            return;
        }

        setTransitioning(true);
        setTimeout(() => { setUiMode('explore'); setTransitioning(false); }, 2000);
    }

    // Save score when complete
    useEffect(() => {
        if (uiMode !== 'complete' || scoreSaved) return;
        setScoreSaved(true);
        const timeSecs = Math.round((Date.now() - startTime) / 1000);
        api.saveResult({
            gameId: game.id,
            blueprintId: blueprint.id ?? '',
            playerName,
            score: gameState.score,
            total: gameState.totalQuestions,
            timeSecs,
        }).catch(err => console.error('Failed to save result:', err));
    }, [uiMode]);

    const scene = getCurrentScene(blueprint, gameState);
    const question = getCurrentQuestion(blueprint, gameState);
    const activeNpc = scene?.npcs?.find(n => n.id === activeNpcId) ?? scene?.npcs?.[0] ?? null;

    return (
        <div className={styles.page}>
            <canvas ref={canvasRef} className={styles.canvas} />

            {scene && <ScoreHUD state={gameState} sceneName={scene.name} streak={streak} />}

            <div className={styles.playerTag}>
                Playing as <strong>{playerName}</strong>
            </div>

            {uiMode === 'dialogue' && activeNpc && (
                <>
                    <div
                        className={styles.backdrop}
                        onClick={() => { if (activeNpcId) onDialogueClose(activeNpcId); setUiMode('explore'); setActiveNpcId(null); }}
                    />
                    <NPCDialogue
                        npcName={activeNpc.name}
                        dialogue={activeNpc.dialogue}
                        onDismiss={handleDialogueDismiss}
                    />
                </>
            )}

            {uiMode === 'question' && question && !transitioning && (
                <>
                    <div
                        className={styles.backdrop}
                        onClick={() => { setUiMode('explore'); setActiveNpcId(null); }}
                    />
                    <QuestionOverlay
                        question={question}
                        index={gameState.answered.size}
                        total={gameState.totalQuestions}
                        onAnswer={handleAnswer}
                    />
                </>
            )}

            {uiMode === 'complete' && (
                <div className={styles.complete}>
                    <div className={styles.completeCard}>
                        <div className={styles.completeIcon}>🎓</div>
                        <h2 className={styles.completeTitle}>Well done, {playerName}!</h2>
                        <p className={styles.completeScore}>
                            You scored <strong>{gameState.score}</strong> out of <strong>{gameState.totalQuestions}</strong>
                        </p>
                        <button className={styles.completeBtn} onClick={() => navigate(`/play/${code}`)}>
                            Play again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}