/** 🟧 UI │ SuccessPanel — Post-submit email-first success with recovery actions. @see README.md */
import { EmailFallbackActions } from './EmailFallbackActions';
import { SuccessState } from '../feedback/SuccessState';

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
  <div className="flex h-full flex-col justify-center">
    <SuccessState
      eyebrow="Submission Draft Ready"
      title="Your registration is ready to send"
      description={
        <>
          <p>
            Your email app should open automatically with your artist registration prepared.
          </p>
          <p className="mt-2 text-zinc-400">
            If it does not open, use the options below to send your registration manually.
          </p>
          {confirmationId ? (
            <p className="mt-3 font-mono text-sm text-sky-200">Confirmation ID: {confirmationId}</p>
          ) : null}
        </>
      }
      checklist={CHECKLIST}
      actions={
        <EmailFallbackActions
          mailto={draftLinks.mailto}
          gmail={draftLinks.gmail}
          emailBody={draftLinks.body}
        />
      }
      footer={
        <>
          <p>
            Submission does not guarantee acceptance. Your information may be considered for future opportunities.
          </p>
          <p className="mt-3 text-zinc-600">
            Recovery: copy the draft and recipient email, open your mail app manually, paste, and send.
          </p>
        </>
      }
    />
  </div>
);
