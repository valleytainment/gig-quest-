/** 🟧 UI │ components/landing/HowItWorks.tsx — Three-step premium how-it-works cards. @see README.md */
import { FileText, Mail, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    icon: FileText,
    title: 'Submit Artist Info',
    body: 'Tell us who you are, how to contact you, and what type of performance you bring.',
  },
  {
    icon: ShieldCheck,
    title: 'Review + Consent',
    body: 'View the participation agreement, confirm consent, and sign electronically.',
  },
  {
    icon: Mail,
    title: 'Send Registration',
    body: 'Your email app opens automatically. Gmail and copy options stay available.',
  },
];

export const HowItWorks = () => (
  <div className="mt-8">
    <p className="gq-section-label">How It Works</p>
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      {STEPS.map(({ icon: Icon, title, body }, index) => (
        <div
          key={title}
          className="gq-glass gq-hover-lift rounded-2xl p-4"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 font-mono text-xs text-[#f2d06b]">
              {index + 1}
            </span>
            <Icon className="h-4 w-4 text-[#f2d06b]" />
          </div>
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <p className="mt-2 text-xs leading-5 text-zinc-400">{body}</p>
        </div>
      ))}
    </div>
  </div>
);
