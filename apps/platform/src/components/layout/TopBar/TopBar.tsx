import { useAuth } from '../../../context/AuthContext';
import styles from './TopBar.module.scss';

export function TopBar({ title }: { title?: string }) {
    const { user } = useAuth();

    return (
        <header className={styles.topbar}>
            <div className={styles.left}>
                {title && <h1 className={styles.title}>{title}</h1>}
            </div>
            <div className={styles.right}>
                {user && (
                    <div className={styles.userChip}>
                        <div className={styles.avatar}>{user.displayName.charAt(0).toUpperCase()}</div>
                        <span className={styles.name}>{user.displayName}</span>
                        <span className={styles.role}>{user.role}</span>
                    </div>
                )}
            </div>
        </header>
    );
}