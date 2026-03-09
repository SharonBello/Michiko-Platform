import { useState } from 'react';
import styles from './MatchingQuestion.module.scss';

interface Props {
    pairs: string[];
    onAnswer: (correct: boolean) => void;
}

export function MatchingQuestion({ pairs, onAnswer }: Props) {
    const parsed = pairs.map(p => {
        if (p.includes('|')) {
            const [l, r] = p.split('|');
            return { left: l.trim(), right: r.trim() };
        }
        return { left: p.trim(), right: p.trim() };
    });

    const lefts = parsed.map(p => p.left);

    // Shuffle once on mount, never again
    const [rights] = useState(() =>
        [...parsed.map(p => p.right)].sort(() => Math.random() - 0.5)
    );

    const [selected, setSelected] = useState<string | null>(null);
    const [matched, setMatched] = useState<Record<string, string>>({});
    const [wrong, setWrong] = useState<string | null>(null);

    function handleLeft(l: string) {
        if (matched[l]) return;
        setSelected(l);
        setWrong(null);
    }

    function handleRight(r: string) {
        if (!selected) return;
        const correct = parsed.find(p => p.left === selected)?.right === r;
        if (correct) {
            const next = { ...matched, [selected]: r };
            setMatched(next);
            setSelected(null);
            if (Object.keys(next).length === parsed.length) {
                setTimeout(() => onAnswer(true), 600);
            }
        } else {
            setWrong(r);
            setTimeout(() => { setSelected(null); setWrong(null); }, 800);
        }
    }

    return (
        <div className={styles.grid}>
            <div className={styles.col}>
                {lefts.map(l => (
                    <button
                        key={l}
                        className={`${styles.item} ${selected === l ? styles.active : ''} ${matched[l] ? styles.done : ''}`}
                        onClick={() => handleLeft(l)}
                    >
                        {l}
                    </button>
                ))}
            </div>
            <div className={styles.col}>
                {rights.map(r => {
                    const isMatched = Object.values(matched).includes(r);
                    return (
                        <button
                            key={r}
                            className={`${styles.item} ${wrong === r ? styles.wrong : ''} ${isMatched ? styles.done : ''}`}
                            onClick={() => handleRight(r)}
                        >
                            {r}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}