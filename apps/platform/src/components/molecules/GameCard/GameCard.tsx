import { useState, useRef, useEffect } from 'react';
import type { Game } from '@michiko/types';
import styles from './GameCard.module.scss';

interface Props {
    game: Game;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onDuplicate: () => void;
    onShare: () => void;
}

const THEME_COLORS: Record<string, string> = {
    EduVerse: 'var(--color-brand)',
    ChronoWorld: 'var(--color-accent)',
    NexusAcademy: 'var(--color-hi)',
};

const STATUS_LABELS: Record<string, string> = {
    building: 'Building',
    ready: 'Ready',
    live: 'Live',
    archived: 'Archived',
    draft: 'Draft',
};

export function GameCard({ game, onClick, onEdit, onDelete, onDuplicate, onShare }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function action(fn: () => void) {
        return (e: React.MouseEvent) => {
            e.stopPropagation();
            setMenuOpen(false);
            fn();
        };
    }

    const themeColor = THEME_COLORS[game.theme] ?? 'var(--color-brand)';

    return (
        <div className={styles.card} onClick={onClick} style={{ '--theme': themeColor } as React.CSSProperties}>
            <div className={styles.topBar} />

            <div className={styles.body}>
                <div className={styles.titleRow}>
                    <h3 className={styles.title}>{game.title}</h3>
                    <div className={styles.menuWrap} ref={menuRef}>
                        <button
                            className={styles.dotsBtn}
                            onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }}
                            aria-label="Game actions"
                        >
                            ⋯
                        </button>

                        {menuOpen && (
                            <div className={styles.menu}>
                                <button className={styles.menuItem} onClick={action(onShare)}>
                                    <span className={styles.menuIcon}>🔗</span> Share link
                                </button>
                                <button className={styles.menuItem} onClick={action(onEdit)}>
                                    <span className={styles.menuIcon}>✎</span> Edit blueprint
                                </button>
                                <button className={styles.menuItem} onClick={action(onDuplicate)}>
                                    <span className={styles.menuIcon}>⧉</span> Duplicate
                                </button>
                                <div className={styles.menuDivider} />
                                <button className={`${styles.menuItem} ${styles.menuItemDanger}`} onClick={action(onDelete)}>
                                    <span className={styles.menuIcon}>✕</span> Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <p className={styles.desc}>{game.description}</p>

                <div className={styles.footer}>
                    <span className={styles.theme}>{game.theme}</span>
                    <span className={`${styles.status} ${styles[`status_${game.status}`]}`}>
                        {STATUS_LABELS[game.status] ?? game.status}
                    </span>
                </div>
            </div>
        </div>
    );
}