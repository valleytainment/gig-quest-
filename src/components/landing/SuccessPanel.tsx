/** 🟧 UI │ components/landing/SuccessPanel.tsx — Post-submit success state wrapper. @see README.md */
import { EmailFallbackActions } from './EmailFallbackActions';

type SuccessPanelProps = {
  draftLinks: { mailto: string; gmail: string; body?: string };
  confirmationId?: string | null;
};

export const SuccessPanel = ({ draftLinks, confirmationId }: SuccessPanelProps) => (
  <div className="flex h-full flex-col justify-center gq-fade-in">
    <div className="gq-card-blue rounded-[1.6rem] p-5 text-center sm:rounded-3xl sm:p-8">
      <p className="text-xs uppercase tracking-[0.28em] text-sky-300 sm:text-sm sm:tracking-[0.35em]">
        Submission draft ready
      </p>
      <h2 className="mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-3xl">
        We will reach out soon — thank you
      </h2>
      {confirmationId ? (
        <p className="mt-4 font-mono text-sm text-sky-200">Confirmation ID: {confirmationId}</p>
      ) : null}
      <p className="mt-4 text-sm leading-6 text-zinc-300">
        Your email app should open automatically. If not, use one of the options below.
      </p>
      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Submission does not guarantee acceptance. Your information may be considered for future opportunities.
      </p>
      <div className="mt-6">
        <EmailFallbackActions
          mailto={draftLinks.mailto}
          gmail={draftLinks.gmail}
          emailBody={draftLinks.body}
        />
      </div>
    </div>
  </div>
);
