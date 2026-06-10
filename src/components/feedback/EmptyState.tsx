/** 🟧 UI │ components/feedback/EmptyState.tsx — Empty list placeholder. @see README.md */
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
};

export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <div className="gq-fade-in flex flex-col items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10">
      <Icon className="h-6 w-6 text-[#f2d06b]" />
    </div>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">{description}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);
