/** 🟧 UI │ TrustStrip — Visual trust chips for landing hero. */
import { TrustBadge } from '../ui/TrustBadge';

const CHIPS = [
  'Free signup',
  'Waiver protected',
  'Curated review',
  'Mobile ready',
  'Email fallback',
];

export const TrustStrip = () => (
  <div className="mt-6 flex flex-wrap gap-2">
    {CHIPS.map((chip) => (
      <span key={chip}>
        <TrustBadge>{chip}</TrustBadge>
      </span>
    ))}
  </div>
);
