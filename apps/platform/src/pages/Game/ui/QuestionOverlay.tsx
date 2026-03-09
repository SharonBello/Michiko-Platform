import { useState } from 'react';
import type { Question } from '@michiko/types';
import styles from './QuestionOverlay.module.scss';
import { MatchingQuestion } from './MatchingQuestion';

interface Props {
    question: Question;
    index: number;
    total: number;
    onAnswer: (answer: string) => void;
}

export function QuestionOverlay({ question, index, total, onAnswer }: Props) {
    const [selection, setSelection] = useState<{ answer: string } | null>(null);

    function handleSelect(opt: string) {
        if (selection) return;
        setSelection({ answer: opt });
        setTimeout(() => onAnswer(opt), 1200);
    }

    const isTrueFalse = question.type === 'true-false' || question.type === 'True-False';
    const isMatch = question.type === 'match';
    const options = isTrueFalse ? ['True', 'False'] : (question.options ?? []);

    return (
        <div className={styles.wrap}>
            <div className={styles.card}>
                <div className={styles.meta}>
                    <span className={styles.badge}>{question.type}</span>
                    <span className={styles.counter}>Q{index + 1} of {total}</span>
                </div>

                <h3 className={styles.question}>{question.text}</h3>

                {isMatch ? (
                    <MatchingQuestion
                        pairs={question.options ?? []}
                        onAnswer={(correct: any) => {
                            setSelection({ answer: correct ? question.answer : '' });
                            setTimeout(() => onAnswer(correct ? question.answer : ''), 1200);
                        }}
                    />
                ) : (
                    <div className={styles.options}>
                        {options.map(opt => {
                            const isSelected = selection?.answer === opt;
                            const isCorrect = !!selection && opt === question.answer;
                            const isWrong = !!selection && isSelected && opt !== question.answer;

                            return (
                                <button
                                    key={opt}
                                    className={`${styles.option} ${isCorrect ? styles.correct : ''} ${isWrong ? styles.wrong : ''}`} onClick={() => handleSelect(opt)}
                                    disabled={!!selection}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                )}

                {selection && (
                    <div className={`${styles.explanation} ${selection.answer === question.answer ? styles.explanationCorrect : styles.explanationWrong}`}>
                        {selection.answer === question.answer ? '✓ Correct! ' : '✗ Incorrect. '}
                        {question.explanation}
                    </div>
                )}
            </div>
        </div>
    );
}