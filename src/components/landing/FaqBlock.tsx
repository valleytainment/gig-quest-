const FAQ = [
  {
    q: 'Is it free?',
    a: 'Sign-up is free. Event fees are communicated in advance.',
  },
  {
    q: 'Am I guaranteed a slot?',
    a: 'No — submission does not guarantee acceptance.',
  },
  {
    q: 'Will I be filmed?',
    a: 'Events may be recorded for promotion per the waiver.',
  },
];

export const FaqBlock = () => (
  <div className="mt-8 max-w-md">
    <p className="gq-section-label">FAQ</p>
    <div className="mt-3 space-y-3 text-sm text-zinc-300">
      {FAQ.map(({ q, a }) => (
        <p key={q}>
          <strong className="text-white">{q}</strong> {a}
        </p>
      ))}
    </div>
  </div>
);
