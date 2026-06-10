/** 🟧 UI │ WaiverBlock — Waiver view gate + acceptance checkboxes. @see README.md */
import { CircleAlert, Info, ShieldCheck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { SectionHeader } from '../ui/SectionHeader';
import { WaiverDialogContent } from './WaiverDialogContent';
import { cn } from '../../lib/utils';

type WaiverBlockProps = {
  waiverViewed: boolean;
  waiverAccepted: boolean;
  onViewed: () => void;
  onAcceptedChange: (accepted: boolean) => void;
};

export const WaiverBlock = ({
  waiverViewed,
  waiverAccepted,
  onViewed,
  onAcceptedChange,
}: WaiverBlockProps) => (
  <div className="gq-form-section">
    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-start">
      <SectionHeader
        number={5}
        label="Waiver Review"
        description="Open and review the participation agreement before accepting."
      />
      <span
        title="View the waiver first to unlock acceptance."
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300"
      >
        <Info className="h-4 w-4" aria-hidden />
      </span>
    </div>

    <div className="mt-4 flex flex-wrap items-center gap-3">
      <Dialog>
        <DialogTrigger
          render={
            <button
              type="button"
              className="gq-btn-blue inline-flex h-12 min-h-[44px] w-full items-center justify-center rounded-2xl px-4 text-sm font-bold uppercase tracking-[0.14em] sm:w-auto sm:tracking-[0.18em]"
            />
          }
          onClick={onViewed}
        >
          View Waiver Form
        </DialogTrigger>
        <DialogContent className="mx-2 max-h-[90dvh] max-w-[calc(100%-1rem)] overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-[#111520] p-0 text-white ring-0 sm:mx-auto sm:max-w-3xl">
          <DialogHeader className="border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5">
            <DialogTitle className="text-lg font-bold uppercase tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em]">
              Artist Participation Agreement
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-zinc-300">
              Liability waiver, media release, and terms of participation.
            </DialogDescription>
          </DialogHeader>
          <WaiverDialogContent />
          <DialogFooter className="border-t border-white/10 bg-white/5 px-4 py-4 sm:px-6">
            <div className="w-full rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-[#f2d06b]">
              By accepting and submitting, the artist acknowledges that they have read, understood, and agreed to all terms outlined above.
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <span
        className={cn(
          'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]',
          waiverViewed ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'
        )}
      >
        {waiverViewed ? 'Waiver Viewed' : 'View Required'}
      </span>
    </div>

    <label
      className={cn(
        'gq-checkbox-card mt-4 cursor-pointer',
        waiverViewed && waiverAccepted && 'gq-checkbox-card--active',
        !waiverViewed && 'gq-checkbox-card--locked cursor-not-allowed'
      )}
    >
      <input
        type="checkbox"
        checked={waiverAccepted}
        disabled={!waiverViewed}
        required
        onChange={(event) => onAcceptedChange(event.target.checked)}
        className="gq-checkbox-input"
      />
      <span className="leading-6">
        I have viewed the waiver form and I accept the terms and conditions outlined in the artist participation agreement.
        {!waiverViewed ? (
          <span className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-amber-300">
            <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden />
            View the waiver first to unlock acceptance.
          </span>
        ) : null}
      </span>
    </label>
  </div>
);
