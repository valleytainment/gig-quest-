import {
  CURRENT_WAIVER_VERSION_ID,
  WAIVER_EFFECTIVE_DATE,
  WAIVER_ORGANIZER_NAME,
  WAIVER_SECTIONS,
} from '../../lib/waiver';

/** 🟨 ROUTE │ pages/legal/Waiver.tsx — Full liability waiver text. @see lib/waiver.ts */
export const LegalWaiver = () => (
  <article className="text-sm leading-7 text-zinc-200">
    <h1 className="text-2xl font-bold uppercase tracking-tight text-white">Artist Participation Agreement</h1>
    <p className="mt-4 text-zinc-400">
      Version {CURRENT_WAIVER_VERSION_ID} · Effective {WAIVER_EFFECTIVE_DATE}
    </p>
    <p className="mt-4">
      Organizer: {WAIVER_ORGANIZER_NAME}. This agreement covers voluntary participation in independent pop-up
      performance experiences. Participants assume inherent risks, accept restrictions on stage/truck/property
      access, release liability to the fullest extent permitted by law, and grant media release rights.
    </p>
    <div className="mt-8 space-y-6">
      {WAIVER_SECTIONS.map(({ title, body }) => (
        <section key={title}>
          <h2 className="text-base font-semibold uppercase tracking-[0.12em] text-[#f2d06b]">{title}</h2>
          <p className="mt-2">{body}</p>
        </section>
      ))}
    </div>
    <p className="mt-8 text-xs uppercase tracking-wider text-zinc-500">
      The version shown during registration is the binding version at time of consent. Each submission stores the
      waiver version ID and body hash accepted by the artist.
    </p>
    <p className="mt-4 text-amber-300/90 text-xs uppercase tracking-wider">
      Have qualified legal counsel review before high-volume public use.
    </p>
  </article>
);
