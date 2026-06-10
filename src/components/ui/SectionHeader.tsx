/** 🟧 UI │ SectionHeader — Numbered section title for guided forms and pages. */
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type SectionHeaderProps = {
  number?: number;
  label: string;
  description?: ReactNode;
  className?: string;
};

export const SectionHeader = ({ number, label, description, className }: SectionHeaderProps) => (
  <div className={cn('gq-form-section-header', className)}>
    {number != null ? <span className="gq-section-number">{number}</span> : null}
    <div>
      <p className="gq-section-label">{label}</p>
      {description ? <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p> : null}
    </div>
  </div>
);
