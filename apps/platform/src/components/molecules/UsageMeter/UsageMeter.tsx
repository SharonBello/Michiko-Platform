import styles from './UsageMeter.module.scss';

interface UsageMeterProps {
    used: number;
    limit: number;
}

export function UsageMeter({ used, limit }: UsageMeterProps) {
    const pct = Math.min((used / limit) * 100, 100);
    const isWarn = pct >= 70;
    const isCrit = pct >= 90;

    return (
        <div className={styles.wrap}>
            <div className={styles.row}>
                <span className={styles.label}>Plan usage</span>
                <span className={styles.count}>
                    <strong>{used}</strong> / {limit} games
                    <span className={styles.plan}>Spark (free)</span>
                </span>
            </div>
            <div className={styles.track}>
                <div
                    className={`${styles.fill} ${isWarn ? styles.warn : ''} ${isCrit ? styles.crit : ''}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
            {isCrit && (
                <p className={styles.warning}>
                    You're almost at your limit. Upgrade to add more games.
                </p>
            )}
        </div>
    );
}