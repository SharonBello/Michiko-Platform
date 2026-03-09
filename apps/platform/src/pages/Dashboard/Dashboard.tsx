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
  const { user }    = useAuth();
  const navigate    = useNavigate();
  const [games, setGames]     = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    api.getGames()
      .then(setGames)
      .catch(() => setError('Failed to load games.'))
      .finally(() => setLoading(false));
  }, []);

  const liveCount     = games.filter(g => g.status === 'live').length;
  const buildingCount = games.filter(g => g.status === 'building').length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.welcome}>
          <span className={styles.hi}>Welcome back</span>
          <h2 className={styles.name}>{user?.displayName} 👋</h2>
        </div>
        <button className={styles.newBtn} onClick={() => navigate('/games/new')}>
          + New Game
        </button>
      </div>

      <div className={styles.stats}>
        {[
          { label: 'Total Games',      value: games.length,  color: 'var(--color-brand)'   },
          { label: 'Live',             value: liveCount,     color: 'var(--color-accent)'  },
          { label: 'Building',         value: buildingCount, color: 'var(--color-hi)'      },
          { label: 'Students Reached', value: 0,             color: 'var(--color-success)' },
        ].map(s => (
          <div key={s.label} className={styles.statCard} style={{ borderTopColor: s.color }}>
            <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <UsageMeter used={games.length} limit={PLAN_LIMIT} />

      {loading && (
        <div className={styles.loadingRow}>
          <span className={styles.spinner} /> Loading your games…
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      {!loading && !error && games.length === 0 && (
        <EmptyState onNew={() => navigate('/games/new')} />
      )}

      {!loading && games.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Your Games</h3>
          <div className={styles.grid}>
            {games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => navigate(`/games/${game.id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}