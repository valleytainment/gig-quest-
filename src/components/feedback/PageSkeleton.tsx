/** 🟧 UI │ components/feedback/PageSkeleton.tsx — Route loading skeleton. @see README.md */
export const PageSkeleton = () => (
  <div className="space-y-4 p-4 md:p-8" aria-hidden>
    <div className="gq-skeleton h-28 rounded-xl" />
    <div className="grid gap-4 md:grid-cols-3">
      <div className="gq-skeleton h-24 rounded-xl" />
      <div className="gq-skeleton h-24 rounded-xl" />
      <div className="gq-skeleton h-24 rounded-xl" />
    </div>
    <div className="gq-skeleton h-64 rounded-xl" />
  </div>
);
