/** 🟨 ROUTE │ pages/legal/LegalLayout.tsx — Nested layout for /legal/* static pages. */
import { Link, Outlet } from 'react-router-dom';
import { Mic2, ShieldCheck } from 'lucide-react';
import { GlowCard } from '../../components/ui/GlowCard';

export const LegalLayout = () => {
  return (
    <div className="gq-shell min-h-screen px-4 py-8 text-white sm:px-6 print:bg-white print:text-black">
      <div className="mx-auto max-w-3xl gq-fade-in">
        <Link to="/" className="mb-6 inline-flex items-center gap-3 text-[#f2d06b] hover:underline print:text-black">
          <Mic2 className="h-5 w-5" aria-hidden />
          Back to signup
        </Link>

        <header className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 print:border-gray-300 print:bg-gray-50">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10">
              <ShieldCheck className="h-5 w-5 text-[#f2d06b]" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f2d06b] print:text-gray-700">
                Gig Quest Legal Center
              </p>
              <h1 className="mt-1 text-xl font-bold text-white sm:text-2xl print:text-black">
                Review terms, privacy, and artist participation agreement before submitting.
              </h1>
            </div>
          </div>
        </header>

        <GlowCard className="rounded-2xl p-6 sm:p-10 print:border print:border-gray-300 print:shadow-none">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-400 print:border-gray-300 print:text-gray-600">
            Effective 2026 · Creative Freq
          </div>
          <div className="legal-prose space-y-4 text-sm leading-7 text-zinc-300 sm:text-base print:text-black">
            <Outlet />
          </div>
        </GlowCard>

        <nav className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-400 print:text-gray-700">
          <Link to="/legal/terms" className="hover:text-white print:hover:text-black">Terms</Link>
          <Link to="/legal/privacy" className="hover:text-white print:hover:text-black">Privacy</Link>
          <Link to="/legal/waiver" className="hover:text-white print:hover:text-black">Waiver</Link>
        </nav>
      </div>
    </div>
  );
};
