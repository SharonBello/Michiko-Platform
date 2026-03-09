import styles from './ScoreHUD.module.scss';
import type { GameState } from '../engine/questionManager';

interface Props {
    state: GameState;
    sceneName: string;
}

export function ScoreHUD({ state, sceneName }: Props) {
    const pct = state.totalQuestions > 0
        ? Math.round((state.answered.size / state.totalQuestions) * 100)
        : 0;

    return (
        <div className={styles.hud}>
            <div className={styles.scene}>{sceneName}</div>
            <div className={styles.bar}>
                <div className={styles.fill} style={{ width: `${pct}%` }} />
            </div>
            <div className={styles.score}>
                {state.score} / {state.answered.size} correct
            </div>
        </div>
    );
}