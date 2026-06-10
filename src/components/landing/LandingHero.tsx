/** 🟧 UI │ components/landing/LandingHero.tsx — Hero headline, trust strip, how-it-works, FAQ. @see README.md */
import { Link } from 'react-router-dom';
import { ClipboardList, Mail, Mic2, ShieldCheck, Sparkles } from 'lucide-react';
import { TrustStrip } from './TrustStrip';
import { HowItWorks } from './HowItWorks';
import { FaqBlock } from './FaqBlock';

const FLOATING_CARDS = [
  { icon: ClipboardList, label: 'Artist Queue', value: 'Curated review' },
  { icon: ShieldCheck, label: 'Waiver Protected', value: 'Legal consent' },
  { icon: Mail, label: 'Email Fallback Ready', value: 'Safe submission' },
];

export const LandingHero = ({ className = '' }: { className?: string }) => (
  <section
    className={`relative border-b border-white/10 px-5 py-8 sm:px-6 sm:py-9 lg:border-b-0 lg:border-r lg:px-10 lg:py-12 ${className}`}
  >
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="gq-spotlight-orb absolute -left-12 top-4 h-48 w-48" />
      <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#3a75b5]/15 blur-3xl gq-soft-pulse" />
      <div className="gq-stage-beams absolute inset-0" />
      <div
        className="absolute left-1/2 top-0 h-px w-[140%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f2d06b]/40 to-transparent"
        style={{ animation: 'gq-stage-sweep 12s ease-in-out infinite' }}
      />
    </div>

    <div className="relative gq-slide-up">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-[#d4af37] shadow-[var(--gq-glow-gold)] sm:h-20 sm:w-20 sm:rounded-[1.75rem]">
        <Mic2 className="h-8 w-8 text-black sm:h-10 sm:w-10" />
      </div>

      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#f2d06b]">
        <Sparkles className="h-3.5 w-3.5" />
        Creative Freq Artist Intake
      </p>

      <h1 className="gq-hero-title max-w-xl text-[1.75rem] leading-[1.05] sm:text-4xl lg:text-5xl xl:text-6xl">
        Apply once. Get reviewed. Lock in performance opportunities.
      </h1>

      <p className="mt-4 max-w-md text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
        Free signup. Waiver protected. Email-safe submission.
      </p>

      <p className="mt-3 max-w-md text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6">
        Sign-up is free. Some events may require a fee or ticket purchase — you will be notified in advance if that applies.
      </p>

      <TrustStrip />

      <div className="mt-6 hidden gap-3 lg:grid lg:grid-cols-3">
        {FLOATING_CARDS.map(({ icon: Icon, label, value }, index) => (
          <div
            key={label}
            className={`gq-glass gq-hover-lift rounded-2xl px-4 py-3 ${index === 1 ? 'lg:translate-y-2' : ''}`}
          >
            <Icon className="mb-2 h-4 w-4 text-[#f2d06b]" />
            <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">{label}</p>
            <p className="mt-1 text-xs font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/legal/waiver"
          className="gq-btn-ghost inline-flex h-11 items-center justify-center rounded-2xl px-5 text-xs font-bold uppercase tracking-[0.14em]"
        >
          View Artist Agreement
        </Link>
      </div>

      <div className="hidden lg:block">
        <HowItWorks />
        <FaqBlock />
      </div>
    </div>
  </section>
);
