import { CURRENT_WAIVER_VERSION_ID, WAIVER_EFFECTIVE_DATE } from '../../lib/waiver';

/** 🟨 ROUTE │ pages/legal/Waiver.tsx — Full liability waiver text. @see lib/waiver.ts */
export const LegalWaiver = () => (
  <article className="text-sm leading-7 text-zinc-200">
    <h1 className="text-2xl font-bold uppercase tracking-tight text-white">Artist Participation Agreement</h1>
    <p className="mt-4 text-zinc-400">
      Version {CURRENT_WAIVER_VERSION_ID} · Effective {WAIVER_EFFECTIVE_DATE}
    </p>
    <p className="mt-4">
      This agreement covers voluntary participation in independent pop-up performance experiences operated by Creative Freq.
      Participants assume inherent risks, grant media release rights, and agree to respectful conduct and safety instructions.
    </p>
    <p className="mt-4">
      The full waiver text shown during registration is the binding version at time of consent. Each submission stores
      the waiver version ID and body hash accepted by the artist.
    </p>
    <p className="mt-4 text-amber-300/90 text-xs uppercase tracking-wider">
      TODO: Have qualified legal counsel review before high-volume public use.
    </p>
  </article>
);
