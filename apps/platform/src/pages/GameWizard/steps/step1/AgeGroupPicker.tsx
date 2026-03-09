import type { WizardData } from '../../GameWizard';
import styles from '../../WizardStep.module.scss';

const AGE_GROUPS = ['5-7', '7-9', '9-11', '11-14', '12-15', '14-18'];

interface Props {
    value: WizardData['ageGroup'];
    onChange: (val: WizardData['ageGroup']) => void;
}

export function AgeGroupPicker({ value, onChange }: Props) {
    return (
        <div className={styles.field}>
            <label className={styles.label}>Age group</label>
            <div className={styles.chipGrid}>
                {AGE_GROUPS.map(a => (
                    <button
                        key={a}
                        className={`${styles.chip} ${value === a ? styles.chipActive : ''}`}
                        onClick={() => onChange(a as WizardData['ageGroup'])}
                    >
                        {a} yrs
                    </button>
                ))}
            </div>
        </div>
    );
}