/** 🟧 UI │ PendingWaiverPanel — Post-signup reminder to complete waiver before acceptance. */
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { ActionButton } from '../ui/ActionButton';
import { GlowCard } from '../ui/GlowCard';
import { TrustBadge } from '../ui/TrustBadge';

type PendingWaiverPanelProps = {
  stageName: string;
  onCompleteAgreement: () => void;
  onGoogleSignUp?: () => void;
  googleLoading?: boolean;
  googleError?: string | null;
};

export const PendingWaiverPanel = ({
  stageName,
  onCompleteAgreement,
  onGoogleSignUp,
  googleLoading = false,
  googleError = null,
}: PendingWaiverPanelProps) => (
  <div className="flex h-full flex-col justify-center gq-scale-in">
    <GlowCard variant="gold" className="rounded-[1.35rem] p-4 sm:rounded-3xl sm:p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300">
        <ShieldAlert className="h-6 w-6" aria-hidden />
      </div>

      <p className="text-xs uppercase tracking-[0.28em] text-[#f2d06b]">Signup saved</p>
      <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
        {stageName ? `${stageName}, you are signed up` : 'You are signed up'}
      </h2>
      <p className="mt-3 text-sm leading-6 text-zinc-300">
        Complete the participation agreement next. Artists are not accepted for performances until the waiver and signature are finished.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <TrustBadge dot>Signup complete</TrustBadge>
        <TrustBadge>Waiver required for acceptance</TrustBadge>
      </div>

      <ActionButton type="button" fullWidth className="mt-6" onClick={onCompleteAgreement}>
        <span className="flex items-center justify-center gap-2">
          Complete Agreement Now
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </span>
      </ActionButton>

      {onGoogleSignUp ? (
        <ActionButton
          type="button"
          fullWidth
          loading={googleLoading}
          className="mt-3"
          onClick={onGoogleSignUp}
        >
          Save Progress With Google
        </ActionButton>
      ) : null}

      {googleError ? (
        <p className="mt-3 text-sm text-amber-200">{googleError}</p>
      ) : null}

      <Link
        to="/legal/waiver"
        className="gq-btn-ghost gq-tap-scale mt-3 inline-flex h-11 w-full items-center justify-center rounded-2xl text-xs font-bold uppercase tracking-[0.14em]"
      >
        Preview Artist Agreement
      </Link>
    </GlowCard>
  </div>
);
