import type { ReactNode } from 'react';
import styles from './WizardShell.module.scss';

interface WizardShellProps {
    steps: string[];
    current: number;
    onClose: () => void;
    children: ReactNode;
}

export function WizardShell({ steps, current, onClose, children }: WizardShellProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.panel}>

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.brand}>
                        <img src="/logo.png" alt="Michiko VR" className={styles.logo} />
                        <span className={styles.label}>New Game</span>
                    </div>
                    <button className={styles.close} onClick={onClose} aria-label="Close wizard">✕</button>
                </div>

                {/* Progress */}
                <div className={styles.progress}>
                    {steps.map((s, i) => (
                        <div key={s} className={styles.stepWrap}>
                            <div className={`${styles.stepDot} ${i < current ? styles.done : ''} ${i === current ? styles.active : ''}`}>
                                {i < current ? '✓' : i + 1}
                            </div>
                            <span className={`${styles.stepLabel} ${i === current ? styles.activeLabel : ''}`}>{s}</span>
                            {i < steps.length - 1 && (
                                <div className={`${styles.connector} ${i < current ? styles.connectorDone : ''}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}