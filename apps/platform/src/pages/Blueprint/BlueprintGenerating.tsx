import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../lib/api';
import styles from './BlueprintGenerating.module.scss';

const STAGES = [
    'Analysing learning objectives…',
    'Designing scene layout…',
    'Generating NPC characters…',
    'Writing questions…',
    'Assembling blueprint…',
];

export default function BlueprintGenerating() {
    const navigate = useNavigate();
    const location = useLocation();
    const called = useRef(false);

    const { wizardData, gameId } = location.state as {
        wizardData: Record<string, unknown>;
        gameId: string;
    };

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        async function generate() {
            try {
                const blueprint = await api.generateBlueprint({ ...wizardData, gameId } as never);
                const saved = await api.saveBlueprint({ ...blueprint, gameId });

                navigate('/blueprint/review', {
                    state: { blueprint: { ...blueprint, id: saved.id }, gameId },
                });
            } catch (err) {
                console.error('Generation error:', err);
                navigate('/');
            }
        }

        generate();
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.orbWrap}>
                    <div className={styles.orb} />
                    <div className={styles.orbRing} />
                </div>
                <h2 className={styles.title}>Building your game…</h2>
                <div className={styles.stages}>
                    {STAGES.map((s, i) => (
                        <div key={i} className={styles.stage} style={{ animationDelay: `${i * 1.2}s` }}>
                            <span className={styles.dot} />
                            {s}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}