import { Outlet, useMatches } from 'react-router-dom';
import styles from './AppShell.module.scss';
import { Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar/TopBar';

const ROUTE_TITLES: Record<string, string> = {
    '/': 'Dashboard',
    '/games': 'My Games',
    '/games/new': 'Create New Game',
    '/settings': 'Settings',
};

export function AppShell() {
    const matches = useMatches();
    const current = matches[matches.length - 1];
    const title = ROUTE_TITLES[current?.pathname ?? '/'] ?? 'Michiko VR';

    return (
        <div className={styles.shell}>
            <Sidebar />
            <div className={styles.main}>
                <TopBar title={title} />
                <main className={styles.content} role="main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}