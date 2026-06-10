import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export const ArtistIntakeCard = ({ onOpen }: { onOpen: () => void }) => (
  <div className="flex h-full flex-col justify-center gq-fade-in">
    <div className="gq-card-gold gq-shimmer rounded-[1.6rem] p-5 sm:rounded-3xl sm:p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-[#f2d06b] sm:text-sm sm:tracking-[0.35em]">
        Artist Registration
      </p>
      <h2 className="mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-3xl">
        Sign up for performance opportunities
      </h2>
      <p className="mt-3 text-sm leading-6 text-zinc-300">
        Tap once, fill out the basics, and submit your information for review.
      </p>
      <Button
        type="button"
        onClick={onOpen}
        className="elite-btn-gold mt-5 h-12 w-full rounded-2xl px-4 text-sm font-bold uppercase tracking-[0.16em] sm:mt-6 sm:tracking-[0.2em]"
      >
        Sign Up For Performance Opportunities
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
);
