import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { useGameEngine } from './useGameEngine';
import { initGameState, getCurrentScene, getCurrentQuestion, answerQuestion } from './engine/questionManager';
import { QuestionOverlay } from './ui/QuestionOverlay';
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

    useEffect(() => {
        if (!id) return;
        api.getBlueprint(id)
            .then(bp => {
                setBlueprint(bp);
                setGameState(initGameState(bp));
            })
            .catch(() => navigate('/'))
            .finally(() => setLoading(false));
    }, [id]);

    function handleNPCClick(npcId: string) {
        if (uiMode !== 'explore') return;
        setActiveNpcId(npcId);
        setUiMode('dialogue');
    }

    function handleDialogueDismiss() {
        setUiMode('question');
    }

    function handleAnswer(answer: string) {
        if (!blueprint || !gameState) return;
        const next = answerQuestion(blueprint, gameState, answer);
        setGameState(next);
        if (next.complete) { setUiMode('complete'); return; }
        setTimeout(() => setUiMode('explore'), 300);
    }

    useGameEngine(canvasRef, blueprint, handleNPCClick);

    if (loading) return (
        <div className={styles.loading}>
            <span className={styles.spinner} /> Loading game…
        </div>
    );

    const scene = blueprint && gameState ? getCurrentScene(blueprint, gameState) : null;
    const question = blueprint && gameState ? getCurrentQuestion(blueprint, gameState) : null;
    const activeNpc = scene?.npcs?.find(n => n.id === activeNpcId) ?? scene?.npcs?.[0] ?? null;

    return (
        <div className={styles.page}>
            <canvas ref={canvasRef} className={styles.canvas} />

            {gameState && scene && (
                <ScoreHUD state={gameState} sceneName={scene.name} />
            )}

            {uiMode === 'dialogue' && activeNpc && (
                <NPCDialogue
                    npcName={activeNpc.name}
                    dialogue={activeNpc.dialogue}
                    onDismiss={handleDialogueDismiss}
                />
            )}

            {uiMode === 'question' && question && gameState && (
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