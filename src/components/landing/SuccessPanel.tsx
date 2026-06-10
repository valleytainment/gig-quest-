/** 🟧 UI │ components/landing/SuccessPanel.tsx — Post-submit success + email recovery. @see README.md */
import { Check } from 'lucide-react';
import { EmailFallbackActions } from './EmailFallbackActions';

type SuccessPanelProps = {
  draftLinks: { mailto: string; gmail: string; body?: string };
  confirmationId?: string | null;
};

const CHECKLIST = [
  'Waiver reviewed',
  'Consent recorded',
  'Signature matched',
  'Email draft prepared',
];

export const SuccessPanel = ({ draftLinks, confirmationId }: SuccessPanelProps) => (
  <div className="flex h-full flex-col justify-center gq-scale-in">
    <div className="gq-card-blue rounded-[1.6rem] p-5 sm:rounded-3xl sm:p-8">
      <p className="text-xs uppercase tracking-[0.28em] text-sky-300 sm:text-sm sm:tracking-[0.35em]">
        Submission Draft Ready
      </p>
      <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
        Your registration is ready to send
      </h2>
      {confirmationId ? (
        <p className="mt-3 font-mono text-sm text-sky-200">Confirmation ID: {confirmationId}</p>
      ) : null}
      <p className="mt-4 text-sm leading-6 text-zinc-300">
        Your email app should open automatically with your artist registration prepared.
      </p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        If it does not open, use one of the options below.
      </p>

      <ul className="mt-5 space-y-2 rounded-2xl border border-white/10 bg-black/20 p-4">
        {CHECKLIST.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-zinc-200">
            <Check className="h-4 w-4 shrink-0 text-emerald-400" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <EmailFallbackActions
          mailto={draftLinks.mailto}
          gmail={draftLinks.gmail}
          emailBody={draftLinks.body}
        />
      </div>

      <p className="mt-5 text-xs leading-5 text-zinc-500">
        Submission does not guarantee acceptance. Your information may be considered for future opportunities.
      </p>
    </div>
  </div>
);
