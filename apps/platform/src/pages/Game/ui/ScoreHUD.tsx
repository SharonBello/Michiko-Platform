import { useEffect, useRef, useState } from 'react';
import styles from './ScoreHUD.module.scss';
import type { GameState } from '../engine/questionManager';

interface Props {
    state: GameState;
    sceneName: string;
    streak?: number;
}

export function ScoreHUD({ state, sceneName, streak = 0 }: Props) {
    const multiplier = streak >= 5 ? 3 : streak >= 3 ? 2 : 1;

    // Animated score count-up
    const [displayScore, setDisplayScore] = useState(state.score);
    const [coinBurst, setCoinBurst] = useState(false);
    const prevScore = useRef(state.score);

    useEffect(() => {
        if (state.score === prevScore.current) return;
        const gained = state.score - prevScore.current;
        prevScore.current = state.score;
        if (gained <= 0) return;

        setCoinBurst(true);
        setTimeout(() => setCoinBurst(false), 600);

        const start = displayScore;
        const target = state.score;
        let frame = 0;
        const FRAMES = 24;
        const tick = () => {
            frame++;
            setDisplayScore(Math.round(start + (target - start) * (frame / FRAMES)));
            if (frame < FRAMES) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [state.score]);

    const progress = state.totalQuestions > 0
        ? (state.answered.size / state.totalQuestions) * 100
        : 0;

    return (
        <>
            {/* Coin score — top left */}
            <div className={styles.coinHud}>
                <div className={`${styles.coin} ${coinBurst ? styles.coinSpin : ''}`}>
                    <svg viewBox="0 0 40 40" width="36" height="36">
                        <defs>
                            <radialGradient id="cg" cx="38%" cy="32%">
                                <stop offset="0%" stopColor="#ffe066" />
                                <stop offset="55%" stopColor="#f0a500" />
                                <stop offset="100%" stopColor="#a06000" />
                            </radialGradient>
                        </defs>
                        <circle cx="20" cy="20" r="18" fill="url(#cg)" />
                        <circle cx="20" cy="20" r="13" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.5" />
                        <text x="20" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7a4000">✦</text>
                    </svg>

                    {/* Coin burst rings */}
                    {coinBurst && (
                        <>
                            <div className={styles.ring} />
                            <div className={`${styles.ring} ${styles.ring2}`} />
                        </>
                    )}
                </div>

                <div className={styles.coinScore}>
                    <span className={`${styles.scoreNum} ${coinBurst ? styles.bump : ''}`}>
                        {displayScore}
                    </span>
                    {multiplier > 1 && streak >= 3 && (
                        <span className={styles.multi}>×{multiplier}</span>
                    )}
                </div>

                {/* Mini progress bar under coin */}
                <div className={styles.miniProgress}>
                    <div className={styles.miniBar} style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* Scene name — top centre */}
            <div className={styles.sceneName}>{sceneName}</div>

            {/* Streak badge — top right */}
            {streak >= 3 && (
                <div className={styles.streakBadge}>
                    <span>🔥</span>
                    <span className={styles.streakNum}>{streak}</span>
                    <span className={styles.streakLabel}>streak</span>
                </div>
            )}

            {/* Correct counter — side panel */}
            <div className={styles.sidePanel}>
                <div className={styles.statLabel}>CORRECT</div>
                <div className={styles.statValue}>
                    {state.score > 0 ? state.score : 0}
                    <span className={styles.statTotal}>/{state.totalQuestions}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.statLabel}>LEFT</div>
                <div className={styles.statValue}>
                    {state.totalQuestions - state.answered.size}
                </div>
            </div>
        </>
    );
}