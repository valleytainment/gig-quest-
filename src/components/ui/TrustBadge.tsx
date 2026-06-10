/** 🟧 UI │ TrustBadge — Compact trust chip for landing and portal surfaces. */
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type TrustBadgeProps = {
  children: ReactNode;
  className?: string;
  dot?: boolean;
};

export const TrustBadge = ({ children, className, dot = false }: TrustBadgeProps) => (
  <span className={cn('gq-status-pill inline-flex items-center gap-2', className)}>
    {dot ? <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden /> : null}
    {children}
  </span>
);
