import type { AiState } from './useAiValidation';
import styles from './AiValidationBox.module.scss';

interface Props {
    state: AiState;
    message: string;
    onFix: () => void;
    onOverride: () => void;
}

export function AiValidationBox({ state, message, onFix, onOverride }: Props) {
    if (state === 'passed') {
        return (
            <div className={styles.success}>
                <span>✓</span> Topic looks good — moving on…
            </div>
        );
    }

    if (state === 'warning') {
        return (
            <div className={styles.warning}>
                <span className={styles.icon}>⚠</span>
                <div className={styles.body}>
                    <div className={styles.title}>Topic may not match subject</div>
                    <div className={styles.text}>{message}</div>
                    <div className={styles.actions}>
                        <button className={styles.fixBtn} onClick={onFix}>Fix topic</button>
                        <button className={styles.overrideBtn} onClick={onOverride}>Continue anyway</button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}