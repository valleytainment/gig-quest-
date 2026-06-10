/** 🟧 UI │ GlassPanel — Frosted glass surface for sections and overlays. */
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  padded?: boolean;
};

export const GlassPanel = ({ children, className, padded = true, ...props }: GlassPanelProps) => (
  <div className={cn('gq-glass rounded-2xl', padded && 'p-4 sm:p-5', className)} {...props}>
    {children}
  </div>
);
