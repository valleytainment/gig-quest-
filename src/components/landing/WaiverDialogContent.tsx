/** 🟧 UI │ components/landing/WaiverDialogContent.tsx — Full waiver text inside dialog. @see lib/waiver.ts */
import { WAIVER_ORGANIZER_NAME, WAIVER_SECTIONS } from '../../lib/waiver';

export const WaiverDialogContent = () => (
  <div className="space-y-5 px-4 py-5 text-sm leading-7 text-zinc-200 sm:px-6 sm:py-6">
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2d06b]">Organizer</p>
      <p className="mt-2">{WAIVER_ORGANIZER_NAME}</p>
    </section>
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2d06b]">Artist Information</p>
      <div className="mt-3 space-y-2 text-zinc-300">
        <p>Legal Name: _______________________________</p>
        <p>Stage Name: _______________________________</p>
        <p>Phone: _______________________________</p>
        <p>Email: _______________________________</p>
        <p>Emergency Contact Name &amp; Phone: _______________________________</p>
      </div>
    </section>
    {WAIVER_SECTIONS.map(({ title, body }) => (
      <section key={title}>
        <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">{title}</h3>
        <p className="mt-2">{body}</p>
      </section>
    ))}
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2d06b]">Signature</p>
      <div className="mt-3 space-y-2 text-zinc-300">
        <p>Artist Signature: _______________________________</p>
        <p>Printed Name: _______________________________</p>
        <p>Date: _______________________________</p>
      </div>
    </section>
  </div>
);
