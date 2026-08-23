/** 🟧 UI │ HowItWorks — Three-step premium how-it-works cards. */
import { FileText, Mail, ShieldCheck } from 'lucide-react';
import { GlowCard } from '../ui/GlowCard';

const STEPS = [
  {
    icon: FileText,
    title: 'Quick Signup',
    body: 'Enter your stage name and contact info in under a minute — free, no login required.',
  },
  {
    icon: ShieldCheck,
    title: 'Complete Agreement',
    body: 'Review the participation agreement and sign. Acceptance stays pending until this is done.',
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
    <div className="gq-stagger mt-4 grid gap-3 sm:grid-cols-3">
      {STEPS.map(({ icon: Icon, title, body }, index) => (
        <GlowCard key={title} lift className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="gq-section-number h-7 w-7 text-[11px]">{index + 1}</span>
            <Icon className="h-4 w-4 text-[#f2d06b]" aria-hidden />
          </div>
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <p className="mt-2 text-xs leading-5 text-zinc-400">{body}</p>
        </GlowCard>
      ))}
    </div>
  </div>
);
