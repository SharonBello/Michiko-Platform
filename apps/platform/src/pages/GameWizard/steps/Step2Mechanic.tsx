import type { WizardData } from '../GameWizard';
import styles from '../WizardStep.module.scss';
import cardStyles from './Step2Mechanic.module.scss';

interface Props {
    data: WizardData;
    update: (patch: Partial<WizardData>) => void;
    onNext: () => void;
    onBack: () => void;
}

const MECHANICS = [
    { value: 'quiz', label: 'Quiz', icon: '❓', desc: 'players answer questions to progress through the world.' },
    { value: 'exploration', label: 'Exploration', icon: '🗺', desc: 'players discover answers by exploring the VR environment.' },
    { value: 'challenge', label: 'Challenge', icon: '⚡', desc: 'Time-pressured tasks and scoring to drive engagement.' },
    { value: 'puzzle', label: 'Puzzle', icon: '🧩', desc: 'players solve multi-step problems to unlock the next area.' },
    { value: 'simulation', label: 'Simulation', icon: '🔭', desc: 'players interact with a simulated system to learn by doing.' },
];

const THEMES = [
    { value: 'EduVerse', label: 'EduVerse', icon: '🌌', desc: 'Futuristic space academy — sci-fi aesthetic.' },
    { value: 'ChronoWorld', label: 'ChronoWorld', icon: '⏳', desc: 'Time-travel through historical eras.' },
    { value: 'NexusAcademy', label: 'Nexus Academy', icon: '🏙', desc: 'Neon cyberpunk city of learning.' },
];

export function Step2Mechanic({ data, update, onNext, onBack }: Props) {
    const canNext = data.mechanic !== '' && data.theme !== '';

    return (
        <div className={styles.step}>
            <div className={styles.heading}>
                <h2 className={styles.title}>How will players play?</h2>
                <p className={styles.sub}>Choose a game mechanic and a visual theme.</p>
            </div>

            {/* Mechanic */}
            <div className={styles.field}>
                <label className={styles.label}>Game mechanic</label>
                <div className={cardStyles.cardGrid}>
                    {MECHANICS.map(m => (
                        <button
                            key={m.value}
                            className={`${cardStyles.card} ${data.mechanic === m.value ? cardStyles.cardActive : ''}`}
                            onClick={() => update({ mechanic: m.value as WizardData['mechanic'] })}
                        >
                            <span className={cardStyles.icon}>{m.icon}</span>
                            <span className={cardStyles.cardLabel}>{m.label}</span>
                            <span className={cardStyles.cardDesc}>{m.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Theme */}
            <div className={styles.field}>
                <label className={styles.label}>Visual theme</label>
                <div className={cardStyles.themeGrid}>
                    {THEMES.map(t => (
                        <button
                            key={t.value}
                            className={`${cardStyles.themeCard} ${data.theme === t.value ? cardStyles.themeActive : ''}`}
                            onClick={() => update({ theme: t.value as WizardData['theme'] })}
                        >
                            <span className={cardStyles.themeIcon}>{t.icon}</span>
                            <span className={cardStyles.themeLabel}>{t.label}</span>
                            <span className={cardStyles.themeDesc}>{t.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.btnSecondary} onClick={onBack}>← Back</button>
                <button className={styles.btnPrimary} onClick={onNext} disabled={!canNext}>
                    Next: Questions →
                </button>
            </div>
        </div>
    );
}