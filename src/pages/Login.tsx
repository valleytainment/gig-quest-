import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Mic2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle } from '../lib/firebase';
import { Button } from '../components/ui/button';

export const Login = () => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname;

  if (loading) {
    return (
      <div className="elite-bg flex min-h-screen items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />
          <p className="font-mono text-sm uppercase tracking-widest text-gray-400">Loading</p>
        </div>
      </div>
    );
  }

  if (user) {
    const destination =
      from && from !== '/login' && !from.startsWith('/login')
        ? from
        : isAdmin
          ? '/admin'
          : '/artist';
    return <Navigate to={destination} replace />;
  }

  const handleSignIn = async () => {
    setSigningIn(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch {
      setError('Sign in failed. Please try again.');
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="elite-bg flex min-h-screen items-center justify-center px-4 py-8 text-white">
      <div className="elite-panel w-full max-w-md rounded-[1.5rem] p-8 sm:p-10">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-[#d4af37] shadow-[0_0_45px_rgba(212,175,55,0.35)]">
          <Mic2 className="h-8 w-8 text-black" />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#f2d06b]">
          Gig Quest
        </p>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white">Sign In</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          Artists and admins sign in with Google to access dashboards. Public registration stays on the home page.
        </p>

        {error ? (
          <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <Button
          type="button"
          disabled={signingIn}
          onClick={handleSignIn}
          className="elite-btn-gold mt-6 h-12 w-full rounded-2xl text-sm font-bold uppercase tracking-[0.16em]"
        >
          {signingIn ? 'Signing in…' : 'Continue With Google'}
        </Button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          <Link to="/" className="text-[#f2d06b] underline-offset-4 hover:underline">
            Back to artist registration
          </Link>
        </p>
      </div>
    </div>
  );
};
