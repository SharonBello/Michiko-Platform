import type { WizardData } from '../GameWizard';
import styles from '../WizardStep.module.scss';
import reviewStyles from './Step4Review.module.scss';

interface Props {
    data: WizardData;
    update: (patch: Partial<WizardData>) => void;
    onNext: () => void;
    onBack: () => void;
    onSubmit: () => void;
    saving?: boolean;
}

export function Step4Review({ data, onBack, onSubmit, saving }: Props) {
    const rows = [
        { label: 'Title', value: data.title || '(untitled)' },
        { label: 'Subject', value: data.subject },
        { label: 'Topic', value: data.topic },
        { label: 'Age group', value: `${data.ageGroup} years` },
        { label: 'Mechanic', value: data.mechanic },
        { label: 'Theme', value: data.theme },
        { label: 'Questions', value: String(data.questionCount) },
        { label: 'Question types', value: data.questionTypes.join(', ') },
    ];

    return (
        <div className={styles.step}>
            <div className={styles.heading}>
                <h2 className={styles.title}>Review & create</h2>
                <p className={styles.sub}>
                    Once you submit, the AI will generate your blueprint. You'll review it before anything is built.
                </p>
            </div>

            <div className={reviewStyles.table}>
                {rows.map(r => (
                    <div key={r.label} className={reviewStyles.row}>
                        <span className={reviewStyles.rowLabel}>{r.label}</span>
                        <span className={reviewStyles.rowValue}>{r.value}</span>
                    </div>
                ))}
            </div>

            <div className={reviewStyles.aiNote}>
                <span className={reviewStyles.aiIcon}>✦</span>
                <div>
                    <div className={reviewStyles.aiTitle}>AI will generate</div>
                    <div className={reviewStyles.aiSub}>
                        {data.questionCount} questions · scene layout · NPC dialogue · {data.theme} assets
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.btnSecondary} onClick={onBack} disabled={saving}>
                    ← Back
                </button>
                <button className={styles.btnPrimary} onClick={onSubmit} disabled={saving}>
                    {saving ? 'Saving…' : '✦ Generate game blueprint'}
                </button>
            </div>
        </div>
    );
}