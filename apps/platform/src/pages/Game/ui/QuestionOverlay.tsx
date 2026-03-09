import { useState } from 'react';
import type { Question } from '@michiko/types';
import styles from './QuestionOverlay.module.scss';

interface Props {
    question: Question;
    index: number;
    total: number;
    onAnswer: (answer: string) => void;
}

export function QuestionOverlay({ question, index, total, onAnswer }: Props) {
    const [selected, setSelected] = useState<string | null>(null);
    const [revealed, setRevealed] = useState(false);

    function handleSelect(opt: string) {
        if (revealed) return;
        setSelected(opt);
        setRevealed(true);
        setTimeout(() => onAnswer(opt), 1200);
    }

    const isTrueFalse = question.type === 'true-false' || question.type === 'True-False';
    const options = isTrueFalse ? ['True', 'False'] : (question.options ?? []);

    return (
        <div className={styles.wrap}>
            <div className={styles.card}>
                <div className={styles.meta}>
                    <span className={styles.badge}>{question.type}</span>
                    <span className={styles.counter}>Q{index + 1} of {total}</span>
                </div>

                <h3 className={styles.question}>{question.text}</h3>

                <div className={styles.options}>
                    {options.map(opt => {
                        const isSelected = selected === opt;
                        const isCorrect = revealed && opt === question.answer;
                        const isWrong = revealed && isSelected && opt !== question.answer;

                        return (
                            <button
                                key={opt}
                                className={`${styles.option} ${isCorrect ? styles.correct : ''} ${isWrong ? styles.wrong : ''} ${isSelected && !revealed ? styles.selected : ''}`}
                                onClick={() => handleSelect(opt)}
                                disabled={revealed}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </div>

                {revealed && (
                    <div className={`${styles.explanation} ${selected === question.answer ? styles.explanationCorrect : styles.explanationWrong}`}>
                        {selected === question.answer ? '✓ Correct! ' : '✗ Incorrect. '}
                        {question.explanation}
                    </div>
                )}
            </div>
        </div>
    );
}