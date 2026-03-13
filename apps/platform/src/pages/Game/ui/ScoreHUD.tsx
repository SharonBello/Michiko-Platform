import styles from './ScoreHUD.module.scss';
import type { GameState } from '../engine/questionManager';

interface Props {
    state: GameState;
    sceneName: string;
    streak?: number;
}

export function ScoreHUD({ state, sceneName, streak = 0 }: Props) {
    const multiplier = streak >= 5 ? 3 : streak >= 3 ? 2 : 1;
    const progress = state.totalQuestions > 0
        ? (state.answered.size / state.totalQuestions) * 100
        : 0;

    return (
        <div className={styles.hud}>
            <div className={styles.left}>
                <span className={styles.sceneName}>{sceneName}</span>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className={styles.center}>
                {streak >= 3 && (
                    <div className={styles.streak}>
                        <span className={styles.streakFlame}>🔥</span>
                        <span className={styles.streakCount}>{streak}</span>
                        {multiplier > 1 && (
                            <span className={styles.multiplier}>×{multiplier}</span>
                        )}
                    </div>
                )}
            </div>

            <div className={styles.right}>
                <span className={styles.score}>
                    {state.score} / {state.answered.size} correct
                </span>
            </div>
        </div>
    );
}