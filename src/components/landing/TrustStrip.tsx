/** 🟧 UI │ components/landing/TrustStrip.tsx — Social proof / trust indicators strip. @see README.md */
export const TrustStrip = () => (
  <div className="mt-6 flex flex-wrap gap-2">
    {['Free signup', 'Waiver protected', 'Curated review'].map((chip) => (
      <span key={chip} className="gq-status-pill text-zinc-300">
        {chip}
      </span>
    ))}
  </div>
);
