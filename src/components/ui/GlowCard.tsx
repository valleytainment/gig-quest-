/** 🟧 UI │ GlowCard — Premium card surface with gold/blue/default variants. */
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type GlowCardVariant = 'default' | 'gold' | 'blue' | 'bronze';

type GlowCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: GlowCardVariant;
  lift?: boolean;
};

const VARIANT_CLASS: Record<GlowCardVariant, string> = {
  default: 'gq-card',
  gold: 'gq-card-gold',
  blue: 'gq-card-blue',
  bronze: 'elite-card-bronze',
};

export const GlowCard = ({
  children,
  className,
  variant = 'default',
  lift = false,
  ...props
}: GlowCardProps) => (
  <div
    className={cn(VARIANT_CLASS[variant], 'rounded-2xl', lift && 'gq-hover-lift', className)}
    {...props}
  >
    {children}
  </div>
);
