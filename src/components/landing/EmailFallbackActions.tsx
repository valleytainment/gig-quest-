/** 🟧 UI │ EmailFallbackActions — mailto, Gmail, copy-email recovery actions. @see README.md */
import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { INTAKE_RECIPIENT_EMAIL } from '../../lib/submissions';

type EmailFallbackActionsProps = {
  mailto: string;
  gmail: string;
  emailBody?: string;
  compact?: boolean;
};

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export const EmailFallbackActions = ({ mailto, gmail, emailBody, compact }: EmailFallbackActionsProps) => {
  const [copied, setCopied] = useState<'draft' | 'email' | null>(null);

  const handleCopy = async (kind: 'draft' | 'email', text: string) => {
    await copyText(text);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 2000);
  };

  const btnClass = compact
    ? 'gq-tap-scale flex min-h-11 w-full flex-1 items-center justify-center gap-2 rounded-xl text-xs font-bold uppercase sm:flex-1'
    : 'gq-tap-scale flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-3 text-xs font-bold uppercase tracking-[0.12em] sm:px-4 sm:text-sm sm:tracking-[0.14em]';

  return (
    <div
      className={compact ? 'flex flex-col gap-2 sm:flex-row' : 'gq-mobile-stack'}
      role="group"
      aria-label="Email fallback actions"
    >
      <a href={mailto} className={`gq-btn-primary ${btnClass}`}>
        <Mail className="h-4 w-4 shrink-0" aria-hidden />
        Open Email App
      </a>
      <a href={gmail} target="_blank" rel="noreferrer" className={`gq-btn-blue ${btnClass}`}>
        Open In Gmail
      </a>
      {emailBody ? (
        <button
          type="button"
          onClick={() => handleCopy('draft', emailBody)}
          className={`gq-btn-secondary ${btnClass} ${copied === 'draft' ? 'gq-btn-success-state' : ''}`}
        >
          {copied === 'draft' ? <Check className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden /> : <Copy className="h-4 w-4 shrink-0" aria-hidden />}
          {copied === 'draft' ? 'Copied' : 'Copy Email Draft'}
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => handleCopy('email', INTAKE_RECIPIENT_EMAIL)}
        className={`gq-btn-secondary ${btnClass} ${copied === 'email' ? 'gq-btn-success-state' : ''}`}
      >
        {copied === 'email' ? <Check className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden /> : <Copy className="h-4 w-4 shrink-0" aria-hidden />}
        {copied === 'email' ? 'Copied' : 'Copy Creative Freq Email'}
      </button>
    </div>
  );
};
