/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟨 MODULE │ gig-quest/src/pages/Login.tsx
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          ROUTE
 * @responsibility Google sign-in page with redirect-back support
 * @depends-on     AuthContext, lib/firebase signInWithGoogle
 * @consumers      App.tsx route "/login"
 * @safe-mode      Must not be required for public "/" intake
 * ═══════════════════════════════════════════════════════════════════════════════
 */
import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Mic2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle } from '../lib/firebase';
import { ActionButton } from '../components/ui/ActionButton';
import { GlowCard } from '../components/ui/GlowCard';
import { TrustBadge } from '../components/ui/TrustBadge';
import { EliteLoader } from '../components/feedback/EliteLoader';
import { ErrorState } from '../components/feedback/ErrorState';

export const Login = () => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname;

  if (loading) {
    return (
      <div className="gq-shell flex min-h-screen items-center justify-center">
        <EliteLoader label="Checking access…" />
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
    <div className="gq-shell flex min-h-screen items-center justify-center px-4 py-8 text-white">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/10 gq-scale-in md:grid-cols-2">
        <section className="relative hidden border-r border-white/10 bg-gradient-to-br from-[#1a2130] to-[#0b0e14] p-10 md:flex md:flex-col md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2d06b]">Gig Quest Portal</p>
            <h1 className="mt-4 text-3xl font-black uppercase leading-tight">
              Artist dashboard · Admin operations · Event review
            </h1>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Artist and admin portal access. Public artist registration is available without signing in.
            </p>
          </div>
          <div className="gq-stagger space-y-3">
            <TrustBadge dot>Secure Google sign-in</TrustBadge>
            <TrustBadge>Public signup does not require login</TrustBadge>
            <p className="flex items-center gap-2 text-sm text-zinc-500">
              <ShieldCheck className="h-4 w-4 text-[#f2d06b]" aria-hidden />
              Manage profile, applications, or event operations
            </p>
          </div>
        </section>

        <GlowCard className="rounded-none border-0 p-8 sm:p-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4af37] shadow-[var(--gq-glow-gold)]">
            <Mic2 className="h-7 w-7 text-black" aria-hidden />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#f2d06b]">Sign In</p>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">Continue With Google</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            Use this portal to manage your profile, applications, or event operations. Public artist signup does not require login.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 md:hidden">
            <TrustBadge dot>Secure sign-in</TrustBadge>
            <TrustBadge>No login for public signup</TrustBadge>
          </div>

          {error ? (
            <div className="mt-4">
              <ErrorState message={error} />
            </div>
          ) : null}

          <ActionButton
            type="button"
            loading={signingIn}
            fullWidth
            className="mt-6"
            onClick={handleSignIn}
          >
            Continue With Google
          </ActionButton>

          <p className="mt-6 text-center text-sm text-zinc-400">
            <Link to="/" className="text-[#f2d06b] underline-offset-4 hover:underline">
              Back to Public Signup
            </Link>
          </p>
        </GlowCard>
      </div>
    </div>
  );
};
