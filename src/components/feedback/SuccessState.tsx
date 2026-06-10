/** 🟧 UI │ feedback/SuccessState.tsx — Reusable success panel shell for email-first flows. */
import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { GlowCard } from '../ui/GlowCard';

type SuccessStateProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  checklist?: string[];
  actions?: ReactNode;
  footer?: ReactNode;
};

export const SuccessState = ({
  eyebrow = 'Submission Draft Ready',
  title,
  description,
  checklist = [],
  actions,
  footer,
}: SuccessStateProps) => (
  <div className="gq-scale-in">
    <GlowCard variant="blue" className="rounded-[1.6rem] p-5 sm:rounded-3xl sm:p-8">
      <p className="text-xs uppercase tracking-[0.28em] text-sky-300 sm:text-sm sm:tracking-[0.35em]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{title}</h2>
      {description ? <div className="mt-4 text-sm leading-6 text-zinc-300">{description}</div> : null}

      {checklist.length > 0 ? (
        <ul className="gq-check-stagger mt-5 space-y-2 rounded-2xl border border-white/10 bg-black/20 p-4">
          {checklist.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-zinc-200">
              <Check className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {actions ? <div className="mt-6">{actions}</div> : null}
      {footer ? <div className="mt-5 text-xs leading-5 text-zinc-500">{footer}</div> : null}
    </GlowCard>
  </div>
);
