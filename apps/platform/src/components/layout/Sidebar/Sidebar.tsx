import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './Sidebar.module.scss';

const NAV_ITEMS = [
    { to: '/', label: 'Dashboard', icon: '⬡', end: true },
    { to: '/games', label: 'My Games', icon: '◈', end: false },
    { to: '/games/new', label: 'New Game', icon: '+', end: false },
    { to: '/settings', label: 'Settings', icon: '⚙', end: false },
];

export function Sidebar() {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    async function handleSignOut() {
        await signOut();
        navigate('/sign-in');
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoWrap}>
                <img src="/logo.png" alt="Michiko VR" className={styles.logo} />
            </div>

            <nav className={styles.nav} aria-label="Main navigation">
                {NAV_ITEMS.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            [styles.navItem, isActive ? styles.active : ''].join(' ')
                        }
                    >
                        <span className={styles.icon} aria-hidden="true">{item.icon}</span>
                        <span className={styles.label}>{item.label}</span>
                        {item.to === '/games/new' && (
                            <span className={styles.newBadge}>New</span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <button className={styles.signOut} onClick={handleSignOut}>
                <span aria-hidden="true">→</span>
                <span>Sign out</span>
            </button>
        </aside>
    );
}