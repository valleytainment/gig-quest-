/** 🟧 UI │ components/landing/TrustStrip.tsx — Visual trust chips. @see README.md */
const CHIPS = [
  'Free signup',
  'Curated review',
  'Waiver protected',
  'Mobile friendly',
  'Email fallback',
];

export const TrustStrip = () => (
  <div className="mt-6 flex flex-wrap gap-2">
    {CHIPS.map((chip) => (
      <span key={chip} className="gq-status-pill text-zinc-300">
        {chip}
      </span>
    ))}
  </div>
);
