/** 🟧 UI │ components/landing/HowItWorks.tsx — Three-step how-it-works section. @see README.md */
const STEPS = [
  'Apply with your artist details',
  'Get reviewed by the team',
  'Receive slot status and next steps',
  'Check in, perform, build XP',
];

export const HowItWorks = () => (
  <div className="mt-8 max-w-md">
    <p className="gq-section-label">How It Works</p>
    <ol className="mt-3 space-y-2 text-sm text-zinc-300">
      {STEPS.map((step, index) => (
        <li key={step} className="flex gap-3">
          <span className="font-mono text-[#f2d06b]">{index + 1}.</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  </div>
);
