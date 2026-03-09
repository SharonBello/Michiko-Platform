import logoSrc from '/logo.png';
import styles from './Logo.module.scss';

export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  size?: LogoSize;
  className?: string;
}

const SIZE_MAP: Record<LogoSize, number> = { sm: 32, md: 48, lg: 72, xl: 120 };

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const px = SIZE_MAP[size];
  return (
    <img
      src={logoSrc}
      alt="Michiko VR"
      role="img"
      aria-label="Michiko VR logo"
      width={px * 1.41}
      height={px}
      className={[styles.logo, className].join(' ').trim()}
      draggable={false}
    />
  );
}
