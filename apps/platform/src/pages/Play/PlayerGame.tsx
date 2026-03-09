import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGameEngine } from '../Game/useGameEngine';
import { initGameState, getCurrentScene, getCurrentQuestion, answerQuestion } from '../Game/engine/questionManager';
import { QuestionOverlay } from '../Game/ui/QuestionOverlay';
import { NPCDialogue } from '../Game/ui/NPCDialogue';
import { ScoreHUD } from '../Game/ui/ScoreHUD';
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

    function handleNPCClick(npcId: string) {
        if (uiMode !== 'explore') return;
        setActiveNpcId(npcId);
        setUiMode('dialogue');
    }

    function handleAnswer(answer: string) {
        setTransitioning(true);
        const next = answerQuestion(blueprint, gameState, answer);
        setGameState(next);
        if (next.complete) {
            setUiMode('complete');
            setTransitioning(false);
            return;
        }
        setTimeout(() => {
            setUiMode('explore');
            setTransitioning(false);
        }, 600);
    }

    // Save score when complete
    useEffect(() => {
        if (uiMode !== 'complete' || scoreSaved) return;
        setScoreSaved(true);

        const timeSecs = Math.round((Date.now() - startTime) / 1000);
        api.saveResult({
            gameId: game.id,
            blueprintId: blueprint.id,
            playerName,
            score: gameState.score,
            total: gameState.totalQuestions,
            timeSecs,
        }).catch(err => console.error('Failed to save result:', err));
    }, [uiMode]);

    useGameEngine(canvasRef, blueprint, handleNPCClick);

    const scene = getCurrentScene(blueprint, gameState);
    const question = getCurrentQuestion(blueprint, gameState);
    const activeNpc = scene?.npcs?.find(n => n.id === activeNpcId) ?? scene?.npcs?.[0] ?? null;

    return (
        <div className={styles.page}>
            <canvas ref={canvasRef} className={styles.canvas} />

            {scene && (
                <ScoreHUD state={gameState} sceneName={scene.name} />
            )}

            <div className={styles.playerTag}>
                Playing as <strong>{playerName}</strong>
            </div>

            {uiMode === 'dialogue' && activeNpc && (
                <NPCDialogue
                    npcName={activeNpc.name}
                    dialogue={activeNpc.dialogue}
                    onDismiss={() => setUiMode('question')}
                />
            )}

            {uiMode === 'question' && question && !transitioning && (
                <QuestionOverlay
                    question={question}
                    index={gameState.answered.size}
                    total={gameState.totalQuestions}
                    onAnswer={handleAnswer}
                />
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