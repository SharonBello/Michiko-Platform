import { useState } from 'react';
import type { NPC } from '@michiko/types';
import styles from './EditQuestionCard.module.scss';

interface Props {
    npc: NPC;
    onChange: (patch: Partial<NPC>) => void;
}

export function EditNPCCard({ npc, onChange }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader} onClick={() => setOpen(o => !o)}>
                <div className={styles.cardLeft}>
                    <div className={styles.avatar}>{npc.name[0]}</div>
                    <span className={styles.cardTitle}>{npc.name}</span>
                    <span className={styles.typeBadge}>{npc.role}</span>
                </div>
                <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
            </div>

            {open && (
                <div className={styles.cardBody}>
                    <div className={styles.field}>
                        <label className={styles.label}>Name</label>
                        <input
                            className={styles.input}
                            value={npc.name}
                            onChange={e => onChange({ name: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Dialogue</label>
                        <textarea
                            className={styles.textarea}
                            value={npc.dialogue}
                            rows={3}
                            onChange={e => onChange({ dialogue: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Role</label>
                        <select
                            className={styles.input}
                            value={npc.role}
                            onChange={e => onChange({ role: e.target.value as NPC['role'] })}
                        >
                            <option value="guide">Guide</option>
                            <option value="villain">Villain</option>
                            <option value="neutral">Neutral</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}