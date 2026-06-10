/** 🟧 UI │ components/landing/EmailFallbackActions.tsx — mailto, Gmail, copy-email actions. @see README.md */
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
    ? 'flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-xs font-bold uppercase'
    : 'flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em]';

  return (
    <div className={compact ? 'flex flex-col gap-2 sm:flex-row' : 'space-y-3'}>
      <a href={mailto} className={`elite-btn-gold ${btnClass}`}>
        <Mail className="h-4 w-4" />
        Open Email App
      </a>
      <a href={gmail} target="_blank" rel="noreferrer" className={`elite-btn-blue ${btnClass}`}>
        Open In Gmail
      </a>
      {emailBody ? (
        <button
          type="button"
          onClick={() => handleCopy('draft', emailBody)}
          className={`elite-btn-dark ${btnClass}`}
        >
          {copied === 'draft' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          {copied === 'draft' ? 'Copied' : 'Copy Artist Registration Email'}
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => handleCopy('email', INTAKE_RECIPIENT_EMAIL)}
        className={`elite-btn-dark ${btnClass}`}
      >
        {copied === 'email' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        {copied === 'email' ? 'Copied' : 'Copy Creative Freq Email'}
      </button>
    </div>
  );
};
