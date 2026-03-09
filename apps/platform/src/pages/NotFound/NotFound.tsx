import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFoundPage = (): JSX.Element => {
    return (
        <div className={styles.page}>
            <div className={styles.code}>404</div>
            <h1 className={styles.title}>Page not found</h1>
            <p className={styles.sub}>This route doesn't exist in the Michiko universe.</p>
            <Link to="/" className={styles.back}>← Back to Dashboard</Link>
        </div>
    );
};

export default NotFoundPage;