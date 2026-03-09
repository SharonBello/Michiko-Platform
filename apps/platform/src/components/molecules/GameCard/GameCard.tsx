import type { Game, GameStatus } from '@michiko/types';
import styles from './GameCard.module.scss';

const STATUS_LABEL: Record<GameStatus, string> = {
    draft: 'Draft',
    building: 'Building',
    ready: 'Ready',
    live: 'Live',
    archived: 'Archived',
};

const STATUS_CLASS: Record<GameStatus, string> = {
    draft: 'statusDraft',
    building: 'statusBuilding',
    ready: 'statusReady',
    live: 'statusLive',
    archived: 'statusArchived',
};

const THEME_COLORS: Record<string, string> = {
    EduVerse: 'var(--color-brand)',
    ChronoWorld: 'var(--color-hi)',
    NexusAcademy: 'var(--color-accent)',
};

interface GameCardProps {
    game: Game;
    onClick: () => void;
}

export function GameCard({ game, onClick }: GameCardProps) {
    const themeColor = THEME_COLORS[game.theme] ?? 'var(--color-brand)';
    const updated = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        .format(new Date(game.updatedAt));

    return (
        <div className={styles.card} onClick={onClick} role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onClick()}
            style={{ '--theme-color': themeColor } as React.CSSProperties}
        >
            {/* Top bar accent */}
            <div className={styles.accent} />

            {/* Header */}
            <div className={styles.header}>
                <span className={`${styles.status} ${styles[STATUS_CLASS[game.status]]}`}>
                    {game.status === 'live' && <span className={styles.dot} />}
                    {STATUS_LABEL[game.status]}
                </span>
                <span className={styles.theme}>{game.theme}</span>
            </div>

            {/* Title */}
            <h3 className={styles.title}>{game.title}</h3>
            <p className={styles.description}>{game.description}</p>

            {/* Meta */}
            <div className={styles.meta}>
                <span className={styles.tag}>{game.subject}</span>
                <span className={styles.tag}>{game.ageGroup} yrs</span>
                <span className={styles.tag}>{game.mechanic}</span>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <span className={styles.updated}>Updated {updated}</span>
                <span className={styles.arrow}>→</span>
            </div>
        </div>
    );
}