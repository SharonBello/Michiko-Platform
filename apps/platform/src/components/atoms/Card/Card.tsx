import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.scss';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  hoverable?: boolean;
  children: ReactNode;
}
interface SubProps { children: ReactNode; className?: string; }

export function Card({ padding = 'md', hoverable = false, children, className = '', ...rest }: CardProps) {
  return (
    <div className={[styles.card, styles[`p-${padding}`], hoverable ? styles.hoverable : '', className].join(' ').trim()} {...rest}>
      {children}
    </div>
  );
}
Card.Header = function CardHeader({ children, className = '' }: SubProps) {
  return <div className={[styles.header, className].join(' ')}>{children}</div>;
};
Card.Body = function CardBody({ children, className = '' }: SubProps) {
  return <div className={[styles.body, className].join(' ')}>{children}</div>;
};
Card.Footer = function CardFooter({ children, className = '' }: SubProps) {
  return <div className={[styles.footer, className].join(' ')}>{children}</div>;
};
