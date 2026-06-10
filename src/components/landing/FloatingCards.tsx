/** 🟧 UI │ FloatingCards — Hero floating opportunity/status cards with live dots. */
import type { LucideIcon } from 'lucide-react';
import { ClipboardList, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';

type FloatingCard = {
  icon: LucideIcon;
  label: string;
  value: string;
  dot?: 'live' | 'ready' | 'protected';
};

const CARDS: FloatingCard[] = [
  { icon: ClipboardList, label: 'Artist Queue', value: 'Curated review', dot: 'live' },
  { icon: ShieldCheck, label: 'Waiver Protected', value: 'Legal consent', dot: 'protected' },
  { icon: Mail, label: 'Email Draft Ready', value: 'Safe submission', dot: 'ready' },
  { icon: Sparkles, label: 'Creative Freq Review', value: 'Official intake', dot: 'live' },
];

const DOT_CLASS: Record<NonNullable<FloatingCard['dot']>, string> = {
  live: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
  ready: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]',
  protected: 'bg-[#f2d06b] shadow-[0_0_8px_rgba(242,208,107,0.5)]',
};

export const FloatingCards = ({ className = '' }: { className?: string }) => (
  <div className={`grid grid-cols-2 gap-3 lg:grid-cols-4 ${className}`}>
    {CARDS.map(({ icon: Icon, label, value, dot }, index) => (
      <GlassPanel
        key={label}
        className={`gq-hover-lift gq-fade-in p-3 sm:p-4 ${index % 2 === 1 ? 'lg:translate-y-2' : ''}`}
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className="mb-2 flex items-center justify-between">
          <Icon className="h-4 w-4 text-[#f2d06b]" aria-hidden />
          {dot ? (
            <span
              className={`h-2 w-2 rounded-full ${DOT_CLASS[dot]}`}
              title={dot === 'live' ? 'Active' : dot === 'ready' ? 'Ready' : 'Protected'}
              aria-hidden
            />
          ) : null}
        </div>
        <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">{label}</p>
        <p className="mt-1 text-xs font-semibold text-white">{value}</p>
      </GlassPanel>
    ))}
  </div>
);
