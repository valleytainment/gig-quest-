/** 🟧 UI │ components/feedback/EliteLoader.tsx — Branded loading spinner. @see README.md */
export const EliteLoader = ({ label = 'Loading' }: { label?: string }) => (
  <div className="gq-fade-in flex flex-col items-center gap-4" role="status" aria-live="polite">
    <div className="relative h-12 w-12 gq-soft-pulse">
      <div className="gq-spinner absolute inset-0 rounded-full border-4 border-[#d4af37]/25 border-t-[#d4af37]" />
      <div className="absolute inset-2 rounded-full bg-[#d4af37]/10" />
    </div>
    <p className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-400">{label}</p>
  </div>
);
