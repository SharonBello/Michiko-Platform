import { useState } from 'react';
import type { Question } from '@michiko/types';
import styles from './EditQuestionCard.module.scss';

interface Props {
    question: Question;
    index: number;
    onChange: (patch: Partial<Question>) => void;
    onDelete: () => void;
}

export function EditQuestionCard({ question, index, onChange, onDelete }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader} onClick={() => setOpen(o => !o)}>
                <div className={styles.cardLeft}>
                    <span className={styles.qNum}>Q{index + 1}</span>
                    <span className={styles.typeBadge}>{question.type}</span>
                    <span className={styles.cardTitle}>{question.text}</span>
                </div>
                <div className={styles.cardRight}>
                    <button
                        className={styles.deleteBtn}
                        onClick={e => { e.stopPropagation(); onDelete(); }}
                    >
                        ✕
                    </button>
                    <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
                </div>
            </div>

            {open && (
                <div className={styles.cardBody}>
                    <div className={styles.field}>
                        <label className={styles.label}>Question text</label>
                        <textarea
                            className={styles.textarea}
                            value={question.text}
                            rows={2}
                            onChange={e => onChange({ text: e.target.value })}
                        />
                    </div>

                    {question.options && (
                        <div className={styles.field}>
                            <label className={styles.label}>Options (one per line)</label>
                            <textarea
                                className={styles.textarea}
                                rows={question.options.length + 1}
                                value={question.options.join('\n')}
                                onChange={e => onChange({ options: e.target.value.split('\n') })}
                            />
                        </div>
                    )}

                    <div className={styles.field}>
                        <label className={styles.label}>Correct answer</label>
                        <input
                            className={styles.input}
                            value={question.answer}
                            onChange={e => onChange({ answer: e.target.value })}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Explanation</label>
                        <textarea
                            className={styles.textarea}
                            rows={2}
                            value={question.explanation ?? ''}
                            onChange={e => onChange({ explanation: e.target.value })}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}