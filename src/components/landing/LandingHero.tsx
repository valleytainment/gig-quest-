/** 🟧 UI │ components/landing/LandingHero.tsx — Hero headline, trust strip, how-it-works, FAQ. @see README.md */
import { ClipboardList, Mic2, ShieldCheck, Sparkles } from 'lucide-react';
import { TrustStrip } from './TrustStrip';
import { HowItWorks } from './HowItWorks';
import { FaqBlock } from './FaqBlock';

export const LandingHero = () => (
  <section className="relative border-b border-white/10 px-5 py-8 sm:px-6 sm:py-9 md:border-b-0 md:border-r md:px-10 md:py-12">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-8 top-8 h-40 w-40 rounded-full bg-[#d4af37]/12 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#3a75b5]/15 blur-3xl" />
      <div
        className="absolute left-1/2 top-0 h-px w-[140%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f2d06b]/40 to-transparent"
        style={{ animation: 'gq-stage-sweep 8s ease-in-out infinite' }}
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

      <h1 className="gq-hero-title max-w-lg text-[2.2rem] sm:text-5xl md:text-6xl">
        Apply Once. Get Reviewed. Lock In Performance Opportunities.
      </h1>

      <p className="mt-4 max-w-md text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
        Submit once, review the waiver, and send your registration from your phone without extra steps.
      </p>

      <p className="mt-4 max-w-md text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6">
        Sign-up is free. Some events may require a fee or ticket purchase — you will be notified in advance if that applies.
      </p>

      <TrustStrip />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { icon: ClipboardList, label: 'New submissions', value: 'Open intake' },
          { icon: Mic2, label: 'Artist queue', value: 'Curated review' },
          { icon: ShieldCheck, label: 'Legal consent', value: 'Waiver protected' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="gq-glass rounded-2xl px-3 py-3">
            <Icon className="mb-2 h-4 w-4 text-[#f2d06b]" />
            <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">{label}</p>
            <p className="mt-1 text-xs font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <HowItWorks />
      <FaqBlock />
    </div>
  </section>
);
