/** 🟧 UI │ ArtistIntakeCard — Primary intake CTA card on landing. */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ActionButton } from '../ui/ActionButton';
import { GlowCard } from '../ui/GlowCard';
import { signInWithGoogle, getAuthErrorMessage } from '../../lib/firebase';

export const ArtistIntakeCard = ({ onOpen }: { onOpen: () => void }) => {
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setGoogleError(null);
    try {
      await signInWithGoogle();
      navigate('/artist', { replace: true, state: { remindWaiver: true } });
    } catch (error) {
      setGoogleError(getAuthErrorMessage(error));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col justify-center gq-scale-in">
      <GlowCard variant="gold" className="gq-shimmer rounded-[1.35rem] p-4 sm:rounded-3xl sm:p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[#f2d06b] sm:text-sm sm:tracking-[0.35em]">
          Artist Registration
        </p>
        <h2 className="mt-3 text-xl font-bold text-white sm:mt-4 sm:text-3xl">
          Sign up fast. Finish the waiver next.
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          Create your free signup in minutes, then complete the participation agreement before acceptance.
        </p>

        <ActionButton type="button" onClick={onOpen} fullWidth className="mt-5 sm:mt-6">
          <span className="flex items-center justify-center gap-2">
            Sign Up For Performance Opportunities
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </span>
        </ActionButton>

        <ActionButton
          type="button"
          fullWidth
          loading={googleLoading}
          className="mt-3"
          onClick={handleGoogleSignUp}
        >
          Continue With Google
        </ActionButton>

        {googleError ? <p className="mt-3 text-sm text-amber-200">{googleError}</p> : null}

        <Link
          to="/legal/waiver"
          className="gq-btn-ghost gq-tap-scale mt-3 inline-flex h-11 w-full items-center justify-center rounded-2xl text-xs font-bold uppercase tracking-[0.14em]"
        >
          View Artist Agreement
        </Link>

        <p className="mt-4 text-center text-xs text-zinc-500">
          <Link to="/login" className="font-semibold uppercase tracking-[0.1em] text-zinc-400 hover:text-[#f2d06b]">
            Already have portal access? Sign in
          </Link>
        </p>
      </GlowCard>
    </div>
  );
};
