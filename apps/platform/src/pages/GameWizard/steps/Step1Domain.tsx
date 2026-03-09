import type { WizardData } from '../GameWizard';
import styles from '../WizardStep.module.scss';

interface Props {
    data: WizardData;
    update: (patch: Partial<WizardData>) => void;
    onNext: () => void;
    onBack: () => void;
}

const SUBJECTS = [
    { value: 'math', label: '🔢 Math' },
    { value: 'science', label: '🔬 Science' },
    { value: 'history', label: '🏛 History' },
    { value: 'language', label: '📖 Language' },
    { value: 'geography', label: '🌍 Geography' },
    { value: 'arts', label: '🎨 Arts' },
];

const AGE_GROUPS = ['5-7', '7-9', '9-11', '11-14', '12-15', '14-18'];

export function Step1Domain({ data, update, onNext }: Props) {
    const canNext = data.subject !== '' && data.topic.trim() !== '' && data.ageGroup !== '';

    return (
        <div className={styles.step}>
            <div className={styles.heading}>
                <h2 className={styles.title}>What will students learn?</h2>
                <p className={styles.sub}>Define the subject, topic and age group for this game.</p>
            </div>

            {/* Title */}
            <div className={styles.field}>
                <label className={styles.label}>Game title</label>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="e.g. Solar System Explorer"
                    value={data.title}
                    onChange={e => update({ title: e.target.value })}
                />
            </div>

            {/* Subject */}
            <div className={styles.field}>
                <label className={styles.label}>Subject</label>
                <div className={styles.chipGrid}>
                    {SUBJECTS.map(s => (
                        <button
                            key={s.value}
                            className={`${styles.chip} ${data.subject === s.value ? styles.chipActive : ''}`}
                            onClick={() => update({ subject: s.value as WizardData['subject'] })}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Topic */}
            <div className={styles.field}>
                <label className={styles.label}>Specific topic</label>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="e.g. The planets and their moons"
                    value={data.topic}
                    onChange={e => update({ topic: e.target.value })}
                />
            </div>

            {/* Age group */}
            <div className={styles.field}>
                <label className={styles.label}>Age group</label>
                <div className={styles.chipGrid}>
                    {AGE_GROUPS.map(a => (
                        <button
                            key={a}
                            className={`${styles.chip} ${data.ageGroup === a ? styles.chipActive : ''}`}
                            onClick={() => update({ ageGroup: a as WizardData['ageGroup'] })}
                        >
                            {a} yrs
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.actions}>
                <span />
                <button className={styles.btnPrimary} onClick={onNext} disabled={!canNext}>
                    Next: Choose mechanic →
                </button>
            </div>
        </div>
    );
}