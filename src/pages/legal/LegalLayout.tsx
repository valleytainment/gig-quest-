import { Link, Outlet } from 'react-router-dom';
import { Mic2 } from 'lucide-react';

export const LegalLayout = () => {
  return (
    <div className="elite-bg min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-3 text-[#f2d06b] hover:underline">
          <Mic2 className="h-5 w-5" />
          Back to Gig Quest
        </Link>
        <div className="elite-panel rounded-2xl p-6 sm:p-10">
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
