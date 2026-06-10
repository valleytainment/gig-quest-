/** 🟧 UI │ ArtistIntakeCard — Primary intake CTA card on landing. */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ActionButton } from '../ui/ActionButton';
import { GlowCard } from '../ui/GlowCard';

export const ArtistIntakeCard = ({ onOpen }: { onOpen: () => void }) => (
  <div className="flex h-full flex-col justify-center gq-fade-in">
    <GlowCard variant="gold" className="gq-shimmer rounded-[1.6rem] p-5 sm:rounded-3xl sm:p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-[#f2d06b] sm:text-sm sm:tracking-[0.35em]">
        Artist Registration
      </p>
      <h2 className="mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-3xl">
        Sign up for performance opportunities
      </h2>
      <p className="mt-3 text-sm leading-6 text-zinc-300">
        Tap once, fill out the basics, and submit your information for review.
      </p>

      <ActionButton
        type="button"
        onClick={onOpen}
        fullWidth
        className="mt-5 sm:mt-6"
      >
        <span className="flex items-center justify-center gap-2">
          Sign Up For Performance Opportunities
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </span>
      </ActionButton>

      <Link
        to="/legal/waiver"
        className="gq-btn-ghost mt-3 inline-flex h-11 w-full items-center justify-center rounded-2xl text-xs font-bold uppercase tracking-[0.14em]"
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
