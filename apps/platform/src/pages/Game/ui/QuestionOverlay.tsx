import { useState, useRef, useEffect } from 'react';
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
    const [fillValue, setFillValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const isTrueFalse = question.type === 'true-false' || question.type === 'True-False';
    const isMatch = question.type === 'match';
    const isFill = question.type === 'fill-blank';
    const options = isTrueFalse ? ['True', 'False'] : (question.options ?? []);

    // Auto-focus the text input and stop camera keys from firing
    useEffect(() => {
        if (isFill && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFill]);

    function handleSelect(opt: string) {
        if (selection) return;
        setSelection({ answer: opt });
        setTimeout(() => onAnswer(opt), 1200);
    }

    function handleFillSubmit() {
        if (selection || !fillValue.trim()) return;
        const trimmed = fillValue.trim();
        setSelection({ answer: trimmed });
        setTimeout(() => onAnswer(trimmed), 1200);
    }

    function handleFillKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        e.stopPropagation(); // prevent WASD / arrow keys from moving camera
        if (e.key === 'Enter') handleFillSubmit();
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.card} onClick={e => e.stopPropagation()}>
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
                ) : isFill ? (
                    <div className={styles.fillWrap}>
                        <input
                            ref={inputRef}
                            className={`${styles.fillInput} ${selection
                                    ? selection.answer.toLowerCase().trim() === question.answer.toLowerCase().trim()
                                        ? styles.fillCorrect
                                        : styles.fillWrong
                                    : ''
                                }`}
                            type="text"
                            placeholder="Type your answer..."
                            value={fillValue}
                            disabled={!!selection}
                            onChange={e => setFillValue(e.target.value)}
                            onKeyDown={handleFillKeyDown}
                            // Stop ALL key events reaching Babylon camera
                            onKeyUp={e => e.stopPropagation()}
                            onKeyPress={e => e.stopPropagation()}
                        />
                        {!selection && (
                            <button
                                className={styles.fillSubmit}
                                onClick={handleFillSubmit}
                                disabled={!fillValue.trim()}
                            >
                                Submit →
                            </button>
                        )}
                    </div>
                ) : (
                    <div className={styles.options}>
                        {options.map(opt => {
                            const isSelected = selection?.answer === opt;
                            const isCorrect = !!selection && opt === question.answer;
                            const isWrong = !!selection && isSelected && opt !== question.answer;
                            return (
                                <button
                                    key={opt}
                                    className={`${styles.option} ${isCorrect ? styles.correct : ''} ${isWrong ? styles.wrong : ''}`}
                                    onClick={() => handleSelect(opt)}
                                    disabled={!!selection}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                )}

                {selection && (
                    <div className={`${styles.explanation} ${selection.answer.toLowerCase().trim() === question.answer.toLowerCase().trim()
                            ? styles.explanationCorrect
                            : styles.explanationWrong
                        }`}>
                        {selection.answer.toLowerCase().trim() === question.answer.toLowerCase().trim()
                            ? '✓ Correct! '
                            : `✗ Incorrect. Answer: ${question.answer}. `}
                        {question.explanation}
                    </div>
                )}
            </div>
        </div>
    );
}