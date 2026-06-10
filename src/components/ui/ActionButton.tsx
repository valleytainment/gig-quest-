/** 🟧 UI │ ActionButton — Branded CTA with loading/success/error feedback states. */
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Check, CircleAlert } from 'lucide-react';
import { cn } from '../../lib/utils';

type ActionButtonVariant = 'primary' | 'blue' | 'secondary' | 'ghost' | 'danger' | 'success';

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ActionButtonVariant;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
};

const VARIANT_CLASS: Record<ActionButtonVariant, string> = {
  primary: 'gq-btn-primary',
  blue: 'gq-btn-blue',
  secondary: 'gq-btn-secondary',
  ghost: 'gq-btn-ghost',
  danger: 'gq-btn-danger',
  success: 'gq-btn-success',
};

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      variant = 'primary',
      loading = false,
      success = false,
      error = false,
      fullWidth = false,
      className,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        'gq-tap-scale inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold uppercase tracking-[0.14em]',
        VARIANT_CLASS[variant],
        fullWidth && 'w-full',
        loading && 'gq-btn-loading',
        success && 'gq-btn-success-state',
        error && 'gq-btn-error-state',
        className
      )}
      {...props}
    >
      {success ? <Check className="h-4 w-4" aria-hidden /> : null}
      {error ? <CircleAlert className="h-4 w-4" aria-hidden /> : null}
      <span className={loading ? 'invisible' : undefined}>{children}</span>
    </button>
  )
);

ActionButton.displayName = 'ActionButton';
