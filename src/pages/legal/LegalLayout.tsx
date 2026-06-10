/** 🟨 ROUTE │ pages/legal/LegalLayout.tsx — Nested layout for /legal/* static pages. */
import { Link, Outlet } from 'react-router-dom';
import { Mic2 } from 'lucide-react';

export const LegalLayout = () => {
  return (
    <div className="gq-shell min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-3xl gq-fade-in">
        <Link to="/" className="mb-6 inline-flex items-center gap-3 text-[#f2d06b] hover:underline">
          <Mic2 className="h-5 w-5" />
          Back to signup
        </Link>
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
