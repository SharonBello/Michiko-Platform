import type { WizardData } from '../GameWizard';
import { useStep1Form } from './step1/useStep1Form';
import { useAiValidation } from './step1/useAiValidation';
import { SubjectPicker } from './step1/SubjectPicker';
import { AgeGroupPicker } from './step1/AgeGroupPicker';
import { AiValidationBox } from './step1/AiValidationBox';
import styles from '../WizardStep.module.scss';
import localStyles from './step1/Step1Domain.module.scss';

interface Props {
    data: WizardData;
    update: (patch: Partial<WizardData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function Step1Domain({ data, update, onNext }: Props) {
    const form = useStep1Form(data);
    const ai = useAiValidation();

    async function handleNext() {
        if (!form.validate()) return;
        if (ai.state === 'idle' || ai.state === 'warning') {
            const passed = await ai.check(data.subject, data.topic);
            if (passed) setTimeout(onNext, 400);
        }
    }

    function handleOverride() { onNext(); }

    return (
        <div className={styles.step}>
            <div className={styles.heading}>
                <h2 className={styles.title}>What will students learn?</h2>
                <p className={styles.sub}>Define the subject, topic and age group for this game.</p>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Game title</label>
                <input
                    className={`${styles.input} ${form.errors.title ? localStyles.inputError : ''}`}
                    type="text"
                    placeholder="e.g. Solar System Explorer"
                    value={data.title}
                    onChange={e => { update({ title: e.target.value }); form.clearError('title'); }}
                />
                {form.errors.title && <span className={localStyles.errorMsg}>{form.errors.title}</span>}
            </div>

            <SubjectPicker
                value={data.subject}
                onChange={val => { update({ subject: val }); ai.reset(); }}
            />

            <div className={styles.field}>
                <label className={styles.label}>Specific topic</label>
                <input
                    className={`${styles.input} ${form.errors.topic ? localStyles.inputError : ''}`}
                    type="text"
                    placeholder="e.g. The planets and their moons"
                    value={data.topic}
                    onChange={e => { update({ topic: e.target.value }); form.clearError('topic'); ai.reset(); }}
                />
                {form.errors.topic && <span className={localStyles.errorMsg}>{form.errors.topic}</span>}
            </div>

            <AgeGroupPicker
                value={data.ageGroup}
                onChange={val => update({ ageGroup: val })}
            />

            <AiValidationBox
                state={ai.state}
                message={ai.message}
                onFix={ai.reset}
                onOverride={handleOverride}
            />

            <div className={styles.actions}>
                <span />
                <button
                    className={styles.btnPrimary}
                    onClick={handleNext}
                    disabled={!form.isComplete || ai.state === 'checking'}
                >
                    {ai.state === 'checking'
                        ? <><span className={localStyles.spinner} /> Checking…</>
                        : 'Next: Choose mechanic →'
                    }
                </button>
            </div>
        </div>
    );
}