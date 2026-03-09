import type { WizardData } from '../GameWizard';
import styles from '../WizardStep.module.scss';

interface Props {
    data: WizardData;
    update: (patch: Partial<WizardData>) => void;
    onNext: () => void;
    onBack: () => void;
}

const QUESTION_TYPES = [
    { value: 'multiple-choice', label: 'Multiple choice', desc: 'Pick one correct answer from four options.' },
    { value: 'true-false', label: 'True / False', desc: 'Binary correct/incorrect judgement.' },
    { value: 'fill-blank', label: 'Fill in the blank', desc: 'Type the missing word or number.' },
    { value: 'match', label: 'Matching', desc: 'Connect pairs of related items.' },
    { value: 'voice', label: 'Voice answer', desc: 'Student speaks the answer aloud (VR mic).' },
];

const COUNTS = [5, 10, 15, 20, 25];

export function Step3Questions({ data, update, onNext, onBack }: Props) {
    function toggleType(val: string) {
        const current = data.questionTypes;
        if (current.includes(val)) {
            if (current.length === 1) return; // must keep at least one
            update({ questionTypes: current.filter(t => t !== val) });
        } else {
            update({ questionTypes: [...current, val] });
        }
    }

    return (
        <div className={styles.step}>
            <div className={styles.heading}>
                <h2 className={styles.title}>Question setup</h2>
                <p className={styles.sub}>AI will generate all questions — just tell it how many and what types.</p>
            </div>

            {/* Count */}
            <div className={styles.field}>
                <label className={styles.label}>Number of questions</label>
                <div className={styles.chipGrid}>
                    {COUNTS.map(c => (
                        <button
                            key={c}
                            className={`${styles.chip} ${data.questionCount === c ? styles.chipActive : ''}`}
                            onClick={() => update({ questionCount: c })}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Types */}
            <div className={styles.field}>
                <label className={styles.label}>Question types</label>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                    Select all you want — AI will mix them.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {QUESTION_TYPES.map(qt => {
                        const active = data.questionTypes.includes(qt.value);
                        return (
                            <div
                                key={qt.value}
                                onClick={() => toggleType(qt.value)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                                    padding: 'var(--space-3) var(--space-4)',
                                    borderRadius: 'var(--radius-md)',
                                    border: `1px solid ${active ? 'var(--color-brand)' : 'var(--color-border)'}`,
                                    background: active ? 'rgba(0,200,224,0.07)' : 'var(--color-elevated)',
                                    cursor: 'pointer',
                                    transition: 'all var(--duration-base)',
                                }}
                            >
                                <div style={{
                                    width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                                    border: `2px solid ${active ? 'var(--color-brand)' : 'var(--color-border-strong)'}`,
                                    background: active ? 'var(--color-brand)' : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 11, color: '#000', fontWeight: 700,
                                }}>
                                    {active ? '✓' : ''}
                                </div>
                                <div>
                                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)' }}>
                                        {qt.label}
                                    </div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                                        {qt.desc}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.btnSecondary} onClick={onBack}>← Back</button>
                <button className={styles.btnPrimary} onClick={onNext}>
                    Next: Review →
                </button>
            </div>
        </div>
    );
}