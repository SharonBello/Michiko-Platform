import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { Game } from '@michiko/types';
import styles from './Dashboard.module.scss';
import { UsageMeter } from '../../components/molecules/UsageMeter/UsageMeter';
import { EmptyState } from '../../components/molecules/EmptyState/EmptyState';
import { GameCard } from '../../components/molecules/GameCard/GameCard';

// Mock data — replaced with API in Phase 4
const MOCK_GAMES: Game[] = [
    {
        id: '1',
        title: 'Solar System Explorer',
        subject: 'science',
        ageGroup: '9-11',
        mechanic: 'exploration',
        status: 'live',
        createdAt: new Date('2024-11-01'),
        updatedAt: new Date('2024-11-10'),
        ownerId: 'mock-001',
        theme: 'EduVerse',
        description: 'Students explore the planets in an immersive VR space environment.',
    },
    {
        id: '2',
        title: 'Ancient Egypt Quest',
        subject: 'history',
        ageGroup: '11-14',
        mechanic: 'quiz',
        status: 'building',
        createdAt: new Date('2024-11-15'),
        updatedAt: new Date('2024-11-20'),
        ownerId: 'mock-001',
        theme: 'ChronoWorld',
        description: 'Travel back to Ancient Egypt and answer questions to unlock secrets.',
    },
    {
        id: '3',
        title: 'Algebra Arena',
        subject: 'math',
        ageGroup: '12-15',
        mechanic: 'challenge',
        status: 'draft',
        createdAt: new Date('2024-11-22'),
        updatedAt: new Date('2024-11-22'),
        ownerId: 'mock-001',
        theme: 'NexusAcademy',
        description: 'Solve algebra problems to power up your avatar and defeat challenges.',
    },
];

const PLAN_LIMIT = 10;

export default function DashboardPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [games] = useState<Game[]>(MOCK_GAMES);

    const liveCount = games.filter(g => g.status === 'live').length;
    const buildingCount = games.filter(g => g.status === 'building').length;

    return (
        <div className={styles.page}>

            {/* Header row */}
            <div className={styles.header}>
                <div className={styles.welcome}>
                    <span className={styles.hi}>Welcome back</span>
                    <h2 className={styles.name}>{user?.displayName} 👋</h2>
                </div>
                <button className={styles.newBtn} onClick={() => navigate('/games/new')}>
                    + New Game
                </button>
            </div>

            {/* Stats row */}
            <div className={styles.stats}>
                {[
                    { label: 'Total Games', value: games.length, color: 'var(--color-brand)' },
                    { label: 'Live', value: liveCount, color: 'var(--color-accent)' },
                    { label: 'Building', value: buildingCount, color: 'var(--color-hi)' },
                    { label: 'Students Reached', value: 0, color: 'var(--color-success)' },
                ].map(s => (
                    <div key={s.label} className={styles.statCard} style={{ borderTopColor: s.color }}>
                        <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
                        <div className={styles.statLabel}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Usage meter */}
            <UsageMeter used={games.length} limit={PLAN_LIMIT} />

            {/* Game grid */}
            {games.length === 0 ? (
                <EmptyState onNew={() => navigate('/games/new')} />
            ) : (
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