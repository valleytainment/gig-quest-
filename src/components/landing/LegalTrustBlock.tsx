/** 🟧 UI │ LegalTrustBlock — Waiver/legal trust links on landing. */
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';

export const LegalTrustBlock = ({ className = '' }: { className?: string }) => (
  <GlassPanel className={`mt-6 ${className}`}>
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10">
        <ShieldCheck className="h-5 w-5 text-[#f2d06b]" aria-hidden />
      </div>
      <div>
        <p className="text-sm font-semibold text-white">Waiver protected intake</p>
        <p className="mt-1 text-xs leading-5 text-zinc-400">
          Review the artist participation agreement before you submit. Your consent is recorded with your registration.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.12em]">
          <Link to="/legal/waiver" className="text-[#f2d06b] hover:underline">
            Artist Agreement
          </Link>
          <Link to="/legal/privacy" className="text-zinc-400 hover:text-white">
            Privacy
          </Link>
          <Link to="/legal/terms" className="text-zinc-400 hover:text-white">
            Terms
          </Link>
        </div>
      </div>
    </div>
  </GlassPanel>
);
