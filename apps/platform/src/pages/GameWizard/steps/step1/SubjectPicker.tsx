import type { WizardData } from '../../GameWizard';
import styles from '../../WizardStep.module.scss';

const SUBJECTS = [
    { value: 'math', label: '🔢 Math' },
    { value: 'science', label: '🔬 Science' },
    { value: 'history', label: '🏛 History' },
    { value: 'language', label: '📖 Language' },
    { value: 'geography', label: '🌍 Geography' },
    { value: 'arts', label: '🎨 Arts' },
];

interface Props {
    value: WizardData['subject'];
    onChange: (val: WizardData['subject']) => void;
}

export function SubjectPicker({ value, onChange }: Props) {
    return (
        <div className={styles.field}>
            <label className={styles.label}>Subject</label>
            <div className={styles.chipGrid}>
                {SUBJECTS.map(s => (
                    <button
                        key={s.value}
                        className={`${styles.chip} ${value === s.value ? styles.chipActive : ''}`}
                        onClick={() => onChange(s.value as WizardData['subject'])}
                    >
                        {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
}