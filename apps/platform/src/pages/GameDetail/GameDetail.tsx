import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import type { Game, GameResult } from '@michiko/types';
import styles from './GameDetail.module.scss';

export default function GameDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [game, setGame] = useState<Game | null>(null);
    const [results, setResults] = useState<GameResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [duplicating, setDuplicating] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        if (!id) return;

        async function load() {
            const [g, r] = await Promise.all([api.getGame(id!), api.getResults(id!)]);
            setGame(g);
            setResults(r);
            setLoading(false);
        }

        load().catch(() => navigate('/'));

        // Poll every 10s for new results
        const interval = setInterval(() => {
            api.getResults(id).then(setResults).catch(() => { });
        }, 10_000);

        return () => clearInterval(interval);
    }, [id]);

    function copyShareLink() {
        if (!game?.shareCode) return;
        const url = `${window.location.origin}/play/${game.shareCode}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function handleDelete() {
        setConfirmDelete(true);
    }

    async function confirmDeleteAction() {
        if (!id) return;
        setDeleting(true);
        try {
            await api.deleteGame(id);
            navigate('/');
        } catch {
            setDeleting(false);
        } finally {
            setConfirmDelete(false);
        }
    }

    async function handleDuplicate() {
        if (!id) return;
        setDuplicating(true);
        try {
            const newGame = await api.duplicateGame(id);
            navigate(`/games/${newGame.id}`);
        } catch {
            setDuplicating(false);
        }
    }

    if (loading) return <div className={styles.loading}><span className={styles.spinner} /></div>;
    if (!game) return null;

    const avg = results.length
        ? Math.round((results.reduce((n, r) => n + (r.score / r.total) * 100, 0) / results.length))
        : null;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <button className={styles.back} onClick={() => navigate('/')}>← Back</button>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{game.title}</h1>
                    <span className={styles.status}>{game.status}</span>
                </div>
                <p className={styles.desc}>{game.description}</p>
            </div>

            {game.shareCode && (
                <div className={styles.shareBox}>
                    <div className={styles.shareLeft}>
                        <div className={styles.shareLabel}>Share with players</div>
                        <div className={styles.shareCode}>{game.shareCode}</div>
                        <div className={styles.shareUrl}>
                            {window.location.origin}/play/{game.shareCode}
                        </div>
                    </div>
                    <button className={styles.copyBtn} onClick={copyShareLink}>
                        {copied ? '✓ Copied!' : 'Copy link'}
                    </button>
                </div>
            )}

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Player Results</h2>
                    {avg !== null && (
                        <div className={styles.avgBadge}>Avg {avg}%</div>
                    )}
                </div>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{game.title}</h1>
                    <span className={styles.status}>{game.status}</span>
                </div>
                <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => navigate(`/games/${id}/edit`)}>
                        ✎ Edit blueprint
                    </button>
                    <button
                        className={styles.duplicateBtn}
                        onClick={handleDuplicate}
                        disabled={duplicating}
                    >
                        {duplicating ? 'Duplicating…' : '⧉ Duplicate'}
                    </button>
                    <button
                        className={styles.deleteBtn}
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting…' : '✕ Delete'}
                    </button>
                </div>

                {results.length === 0 ? (
                    <div className={styles.empty}>
                        No players have played yet. Share the code above to get started.
                    </div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Score</th>
                                <th>%</th>
                                <th>Time</th>
                                <th>Played</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(r => (
                                <tr key={r.id}>
                                    <td>{r.playerName}</td>
                                    <td>{r.score} / {r.total}</td>
                                    <td>
                                        <span className={`${styles.pct} ${r.score / r.total >= 0.7 ? styles.pctGood : styles.pctLow}`}>
                                            {Math.round((r.score / r.total) * 100)}%
                                        </span>
                                    </td>
                                    <td>{Math.floor(r.timeSecs / 60)}m {r.timeSecs % 60}s</td>
                                    <td>{new Date(r.playedAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {confirmDelete && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3 className={styles.modalTitle}>Delete game?</h3>
                        <p className={styles.modalText}>
                            "<strong>{game?.title}</strong>" and all its player results will be permanently deleted.
                        </p>
                        <div className={styles.modalActions}>
                            <button className={styles.modalCancel} onClick={() => setConfirmDelete(false)}>
                                Cancel
                            </button>
                            <button className={styles.modalDelete} onClick={confirmDeleteAction} disabled={deleting}>
                                {deleting ? 'Deleting…' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}