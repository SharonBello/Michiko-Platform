import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { WizardData } from '../GameWizard/GameWizard';
import type { Blueprint } from '@michiko/types';
import styles from './BlueprintGenerating.module.scss';
import { mockGenerateBlueprint } from './../../lib/mockBlueprint';

const STAGES = [
    { label: 'Analysing subject & topic', duration: 900 },
    { label: 'Designing scene layout', duration: 1100 },
    { label: 'Generating questions', duration: 1400 },
    { label: 'Writing NPC dialogue', duration: 900 },
    { label: 'Selecting theme assets', duration: 700 },
    { label: 'Assembling blueprint', duration: 600 },
];

export default function BlueprintGenerating() {
    const navigate = useNavigate();
    const location = useLocation();
    const wizardData = (location.state as { wizardData: WizardData } | null)?.wizardData;

    const [stageIdx, setStageIdx] = useState(0);
    const [done, setDone] = useState(false);
    const [blueprint, setBlueprint] = useState<Blueprint | null>(null);

    useEffect(() => {
        if (!wizardData) { navigate('/'); return; }

        let idx = 0;
        function runStage() {
            if (idx >= STAGES.length) {
                const bp = mockGenerateBlueprint(wizardData!);
                setBlueprint(bp);
                setDone(true);
                return;
            }
            setStageIdx(idx);
            setTimeout(() => { idx++; runStage(); }, STAGES[idx].duration);
        }
        runStage();
    }, []);

    function handleReview() {
        navigate('/blueprint/review', { state: { blueprint } });
    }

    const pct = Math.round(((stageIdx) / STAGES.length) * 100);

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.iconWrap}>
                    <div className={`${styles.orb} ${done ? styles.orbDone : ''}`}>
                        <span className={styles.orbIcon}>{done ? '✓' : '✦'}</span>
                    </div>
                </div>

                <div className={styles.heading}>
                    <h1 className={styles.title}>
                        {done ? 'Blueprint ready!' : 'Generating your game…'}
                    </h1>
                    <p className={styles.sub}>
                        {done
                            ? `${wizardData?.title} is ready for your review.`
                            : 'AI is designing your VR experience. This takes about 10 seconds.'}
                    </p>
                </div>

                {/* Progress bar */}
                <div className={styles.track}>
                    <div
                        className={styles.fill}
                        style={{ width: done ? '100%' : `${pct}%` }}
                    />
                </div>

                {/* Stage list */}
                <div className={styles.stages}>
                    {STAGES.map((s, i) => (
                        <div
                            key={s.label}
                            className={`${styles.stage} ${i < stageIdx || done ? styles.stageDone : ''} ${i === stageIdx && !done ? styles.stageActive : ''}`}
                        >
                            <span className={styles.stageDot}>
                                {i < stageIdx || done ? '✓' : i === stageIdx ? '◉' : '○'}
                            </span>
                            <span className={styles.stageLabel}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {done && (
                    <button className={styles.reviewBtn} onClick={handleReview}>
                        Review blueprint →
                    </button>
                )}
            </div>
        </div>
    );
}