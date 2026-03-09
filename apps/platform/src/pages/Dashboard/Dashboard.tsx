import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GameCard } from '../../components/molecules/GameCard/GameCard';
import { UsageMeter } from '../../components/molecules/UsageMeter/UsageMeter';
import { EmptyState } from '../../components/molecules/EmptyState/EmptyState';
import { api } from '../../lib/api';
import type { Game } from '@michiko/types';
import styles from './Dashboard.module.scss';

const PLAN_LIMIT = 10;

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    api.getGames()
      .then(setGames)
      .catch(() => setError('Failed to load games.'))
      .finally(() => setLoading(false));
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  // ── Actions ──────────────────────────────────────────────
  function handleDelete(id: string, title: string) {
    setConfirmDelete({ id, title });
  }

  async function confirmDeleteAction() {
    if (!confirmDelete) return;
    try {
      await api.deleteGame(confirmDelete.id);
      setGames(prev => prev.filter(g => g.id !== confirmDelete.id));
      showToast('Game deleted.');
    } catch {
      showToast('Failed to delete game.');
    } finally {
      setConfirmDelete(null);
    }
  }

  async function handleDuplicate(id: string) {
    try {
      const newGame = await api.duplicateGame(id);
      navigate(`/games/${newGame.id}`);
    } catch {
      showToast('Failed to duplicate game.');
    }
  }

  function handleShare(game: Game) {
    if (!game.shareCode) {
      showToast('Approve the blueprint first to get a share link.');
      return;
    }
    const url = `${window.location.origin}/play/${game.shareCode}`;
    navigator.clipboard.writeText(url);
    showToast(`Link copied — ${url}`);
  }

  // ── Stats ─────────────────────────────────────────────────
  const liveCount = games.filter(g => g.status === 'live').length;
  const buildingCount = games.filter(g => g.status === 'building').length;

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.welcome}>
          <span className={styles.hi}>Welcome back</span>
          <h2 className={styles.name}>{user?.displayName ?? user?.email} 👋</h2>
        </div>
        <button className={styles.newBtn} onClick={() => navigate('/games/new')}>
          + New Game
        </button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        {[
          { label: 'Total Games', value: games.length, color: 'var(--color-brand)' },
          { label: 'Ready', value: games.filter(g => g.status === 'ready').length, color: 'var(--color-accent)' },
          { label: 'Building', value: buildingCount, color: 'var(--color-hi)' },
          { label: 'Live', value: liveCount, color: '#00c864' },
        ].map(s => (
          <div key={s.label} className={styles.statCard} style={{ borderTopColor: s.color }}>
            <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <UsageMeter used={games.length} limit={PLAN_LIMIT} />

      {/* Loading */}
      {loading && (
        <div className={styles.loadingRow}>
          <span className={styles.spinner} /> Loading your games…
        </div>
      )}

      {/* Error */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Empty */}
      {!loading && !error && games.length === 0 && (
        <EmptyState onNew={() => navigate('/games/new')} />
      )}

      {/* Games grid */}
      {!loading && games.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Your Games</h3>
          <div className={styles.grid}>
            {games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => navigate(`/games/${game.id}`)}
                onEdit={() => navigate(`/games/${game.id}/edit`)}
                onDelete={() => handleDelete(game.id, game.title)}
                onDuplicate={() => handleDuplicate(game.id)}
                onShare={() => handleShare(game)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Delete game?</h3>
            <p className={styles.modalText}>
              "<strong>{confirmDelete.title}</strong>" and all its player results will be permanently deleted.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setConfirmDelete(null)}>
                Cancel
              </button>
              <button className={styles.modalDelete} onClick={confirmDeleteAction}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={styles.toast}>
          <span>✓</span> {toast}
        </div>
      )}

    </div>
  );
}