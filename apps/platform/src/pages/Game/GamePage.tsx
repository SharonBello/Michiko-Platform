import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as BABYLON from '@babylonjs/core';
import { api } from '../../lib/api';
import { useGameEngine } from './useGameEngine';
import { initGameState, getCurrentScene, getCurrentQuestion, answerQuestion } from './engine/questionManager';
import { QuestionOverlay } from './ui/QuestionOverlay';
import { burstCorrect, burstWrong } from './engine/particleEffects';
import { NPCDialogue } from './ui/NPCDialogue';
import { ScoreHUD } from './ui/ScoreHUD';
import type { Blueprint } from '@michiko/types';
import type { GameState } from './engine/questionManager';
import styles from './Game.module.scss';

type UIMode = 'explore' | 'dialogue' | 'question' | 'complete';

export default function GamePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [uiMode, setUiMode] = useState<UIMode>('explore');
    const [activeNpcId, setActiveNpcId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [transitioning, setTransitioning] = useState(false);

    function handleNPCClick(npcId: string) {
        debugger;
        console.log(`handleNPCClick: npcId="${npcId}" uiMode=${uiMode}`);
        if (uiMode !== 'explore') return;
        setActiveNpcId(npcId);
        setUiMode('dialogue');
        onDialogueOpen(npcId);
    }

    const {
        sceneRef, cameraRef,
        onDialogueOpen, onDialogueClose,
        onQuestionOpen, onAnswerCorrect, onAnswerWrong,
        onGameComplete,
    } = useGameEngine(canvasRef, blueprint, handleNPCClick);

    useEffect(() => {
        if (!id) return;
        api.getBlueprint(id)
            .then(bp => { setBlueprint(bp); setGameState(initGameState(bp)); })
            .catch(() => navigate('/'))
            .finally(() => setLoading(false));
    }, [id]);

    function handleDialogueDismiss() {
        console.log(`handleDialogueDismiss: activeNpcId="${activeNpcId}" uiMode=${uiMode}`);
        if (activeNpcId) onDialogueClose(activeNpcId);
        setUiMode('question');
        if (activeNpcId) onQuestionOpen(activeNpcId);
    }

    function handleAnswer(answer: string) {
        console.log('🔴 handleAnswer called', answer, blueprint ? 'bp ok' : 'NO BLUEPRINT', gameState ? 'gs ok' : 'NO GAMESTATE');

        if (!blueprint || !gameState) return;
        console.log(`handleAnswer: activeNpcId="${activeNpcId}" answer="${answer}"`);
        const question = getCurrentQuestion(blueprint, gameState);
        const correct = answer === question?.answer;

        if (sceneRef.current && cameraRef.current) {
            const pos = cameraRef.current.position.add(new BABYLON.Vector3(0, 0, 3));
            correct
                ? burstCorrect(sceneRef.current, pos, blueprint.theme)
                : burstWrong(sceneRef.current, pos);
        }

        const next = answerQuestion(blueprint, gameState, answer);
        setGameState(next);

        const targetNpcId = activeNpcId ?? scene?.npcs?.[0]?.id ?? null;

        if (targetNpcId) {
            correct
                ? onAnswerCorrect(targetNpcId, next.score, next.totalQuestions)
                : onAnswerWrong(targetNpcId);
        }

        if (next.complete) {
            onGameComplete(next.score, next.totalQuestions);
            setUiMode('complete');
            return;
        }

        setTransitioning(true);
        setTimeout(() => { setUiMode('explore'); setTransitioning(false); }, 2000);
    }

    if (loading) return (
        <div className={styles.loading}><span className={styles.spinner} /> Loading game…</div>
    );

    const scene = blueprint && gameState ? getCurrentScene(blueprint, gameState) : null;
    const question = blueprint && gameState ? getCurrentQuestion(blueprint, gameState) : null;
    const activeNpc = scene?.npcs?.find(n => n.id === activeNpcId) ?? scene?.npcs?.[0] ?? null;

    return (
        <div className={styles.page}>
            <canvas ref={canvasRef} className={styles.canvas} />

            {gameState && scene && <ScoreHUD state={gameState} sceneName={scene.name} />}

            {uiMode === 'dialogue' && activeNpc && (
                <NPCDialogue
                    npcName={activeNpc.name}
                    dialogue={activeNpc.dialogue}
                    onDismiss={handleDialogueDismiss}
                />
            )}

            {uiMode === 'question' && question && gameState && !transitioning && (
                <QuestionOverlay
                    question={question}
                    index={gameState.answered.size}
                    total={gameState.totalQuestions}
                    onAnswer={handleAnswer}
                />
            )}

            {uiMode === 'complete' && gameState && (
                <div className={styles.complete}>
                    <div className={styles.completeCard}>
                        <div className={styles.completeIcon}>🎓</div>
                        <h2 className={styles.completeTitle}>Game Complete!</h2>
                        <p className={styles.completeScore}>
                            You scored <strong>{gameState.score}</strong> out of <strong>{gameState.totalQuestions}</strong>
                        </p>
                        <button className={styles.completeBtn} onClick={() => navigate('/')}>
                            Back to dashboard
                        </button>
                    </div>
                </div>
            )}

            <button className={styles.exitBtn} onClick={() => navigate('/')}>✕ Exit</button>
        </div>
    );
}