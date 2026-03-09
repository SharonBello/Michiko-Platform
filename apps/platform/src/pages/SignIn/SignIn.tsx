import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './SignIn.module.scss';

const SignInPage = (): JSX.Element => {
    const { signIn, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';

    const [email, setEmail] = useState('sharon@michiko.vr');
    const [password, setPassword] = useState('michiko123');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (user) return <Navigate to={from} replace />;

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signIn(email, password);
            navigate(from, { replace: true });
        } catch {
            setError('Invalid credentials. Try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.card}>
                <img src="/logo.png" alt="Michiko VR" className={styles.logo} />

                <div className={styles.heading}>
                    <h1 className={styles.title}>Sign in</h1>
                    <p className={styles.sub}>Level up learning with immersive VR.</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.field}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input id="email" type="email" className={styles.input}
                            value={email} onChange={e => setEmail(e.target.value)}
                            autoComplete="email" required disabled={loading} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input id="password" type="password" className={styles.input}
                            value={password} onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password" required disabled={loading} />
                    </div>

                    {error && <div className={styles.error} role="alert">{error}</div>}

                    <button type="submit" className={styles.submit} disabled={loading}>
                        {loading && <span className={styles.spinner} aria-hidden="true" />}
                        {loading ? 'Signing in…' : 'Sign in →'}
                    </button>
                </form>

                <p className={styles.note}>Demo mode — Firebase Auth wired in Step 4.</p>
            </div>
        </div>
    );
};

export default SignInPage;