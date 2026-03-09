import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import type { Game, Blueprint } from '@michiko/types';
import styles from './PlayEntry.module.scss';

export default function PlayEntry() {
    const { code } = useParams<{ code: string }>();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [game, setGame] = useState<Game | null>(null);
    const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!code) return;
        api.getGameByCode(code)
            .then(({ game, blueprint }) => { setGame(game); setBlueprint(blueprint); })
            .catch(() => setError('Game not found. Check your code and try again.'))
            .finally(() => setLoading(false));
    }, [code]);

    function handlePlay() {
        if (!name.trim() || !game || !blueprint) return;
        navigate(`/play/${code}/game`, {
            state: { playerName: name.trim(), game, blueprint },
        });
    }

    if (loading) return (
        <div className={styles.loading}>
            <span className={styles.spinner} />
        </div>
    );

    if (error) return (
        <div className={styles.error}>
            <div className={styles.errorCard}>
                <div className={styles.errorIcon}>🔍</div>
                <h2>Game not found</h2>
                <p>{error}</p>
            </div>
        </div>
    );

    const totalQ = blueprint?.scenes.reduce((n, s) => n + (s.questions?.length ?? 0), 0) ?? 0;

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.logo}>michiko VR</div>

                <div className={styles.gameInfo}>
                    <div className={styles.theme}>{game?.theme}</div>
                    <h1 className={styles.title}>{game?.title}</h1>
                    <p className={styles.desc}>{game?.description}</p>
                    <div className={styles.meta}>
                        <span>📚 {game?.subject}</span>
                        <span>🎯 {totalQ} questions</span>
                        <span>👥 {game?.ageGroup} yrs</span>
                    </div>
                </div>

                <div className={styles.nameField}>
                    <label className={styles.label}>What's your name?</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter your name to start"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handlePlay()}
                        autoFocus
                    />
                </div>

                <button
                    className={styles.playBtn}
                    onClick={handlePlay}
                    disabled={!name.trim()}
                >
                    ▶ Play Now
                </button>
            </div>
        </div>
    );
}