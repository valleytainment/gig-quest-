/** 🟨 ROUTE │ pages/legal/LegalLayout.tsx — Nested layout for /legal/* static pages. */
import { Link, Outlet } from 'react-router-dom';
import { Mic2, ShieldCheck } from 'lucide-react';

export const LegalLayout = () => {
  return (
    <div className="gq-shell min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-3xl gq-fade-in">
        <Link to="/" className="mb-6 inline-flex items-center gap-3 text-[#f2d06b] hover:underline">
          <Mic2 className="h-5 w-5" />
          Back to signup
        </Link>

        <header className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10">
              <ShieldCheck className="h-5 w-5 text-[#f2d06b]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f2d06b]">
                Gig Quest Legal Center
              </p>
              <h1 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                Review terms, privacy, and artist participation agreement before submitting.
              </h1>
            </div>
          </div>
        </header>

        <div className="gq-card rounded-2xl p-6 sm:p-10 print:border print:shadow-none">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-400">
            Effective 2026 · Creative Freq
          </div>
          <Outlet />
        </div>
        <nav className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-400">
          <Link to="/legal/terms" className="hover:text-white">Terms</Link>
          <Link to="/legal/privacy" className="hover:text-white">Privacy</Link>
          <Link to="/legal/waiver" className="hover:text-white">Waiver</Link>
        </nav>
      </div>
    </div>
  );
};
