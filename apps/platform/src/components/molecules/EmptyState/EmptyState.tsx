import styles from './EmptyState.module.scss';

interface EmptyStateProps {
    onNew: () => void;
}

export function EmptyState({ onNew }: EmptyStateProps) {
    return (
        <div className={styles.wrap}>
            <div className={styles.icon} aria-hidden="true">◈</div>
            <h3 className={styles.title}>No games yet</h3>
            <p className={styles.sub}>
                Create your first VR game and let AI do the heavy lifting.
                Your players will be exploring immersive worlds in minutes.
            </p>
            <button className={styles.btn} onClick={onNew}>
                + Create your first game
            </button>
        </div>
    );
}