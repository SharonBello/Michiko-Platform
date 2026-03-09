import styles from './Spinner.module.scss';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

interface SpinnerProps { size?: SpinnerSize; label?: string; }

export function Spinner({ size = 'md', label = 'Loading…' }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={[styles.spinner, styles[size]].join(' ')} />
  );
}
