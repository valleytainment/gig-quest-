export const WaiverDialogContent = () => (
  <div className="space-y-5 px-4 py-5 text-sm leading-7 text-zinc-200 sm:px-6 sm:py-6">
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2d06b]">Organizer</p>
      <p className="mt-2">Independent Event Organizer</p>
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
    {[
      ['1. Event Description', 'This is an independent, mobile, pop-up performance experience conducted in public areas. Locations are dynamic and may change at any time. This is not a traditional stage event and is not affiliated with any major event, organization, sponsor, or brand.'],
      ['2. Voluntary Participation', 'I understand that my participation is voluntary. I am choosing to participate at my own discretion and accept full responsibility for my involvement.'],
      ['3. Assumption Of Risk', 'I acknowledge that participation involves inherent risks, including crowds, public interaction, movement between locations, traffic, uneven surfaces, weather, equipment use, and law enforcement interaction. I voluntarily assume all risks associated with participation.'],
      ['4. Release Of Liability', 'To the fullest extent permitted by law, I release and hold harmless the Organizer, including any assistants or affiliates, from any and all claims, liabilities, damages, injuries, losses, or expenses arising from my participation.'],
      ['5. Conduct And Safety', 'I agree to follow safety instructions, respect time limits, avoid illegal or disruptive behavior, and not interfere with public safety. The Organizer may remove any participant at any time.'],
      ['6. No Guarantee Of Performance Or Compensation', 'Performance opportunities, duration, tips, earnings, and exposure are not guaranteed. Participation is opportunity-based.'],
      ['7. Personal Property', 'I am responsible for all personal belongings, equipment, and valuables. The Organizer is not responsible for lost, stolen, or damaged property.'],
      ['8. Media Release', 'I grant permission for the Organizer to capture and use my image, voice, performance, and name for promotional and marketing purposes without compensation unless otherwise agreed.'],
      ['9. Independent Participation Status', 'I am not an employee, contractor, or representative of the Organizer. I am participating independently.'],
      ['10. Event Flexibility', 'Performance times, locations, and conditions may change due to crowd conditions, safety, weather, equipment, or public authority interaction.'],
      ['11. Removal And Termination', 'The Organizer may remove or deny participation at any time for safety, behavior, or operational concerns.'],
      ['12. Legal Acknowledgment', 'I confirm that I am at least 18 years old or have legal guardian consent, have read and understand this agreement, and agree voluntarily.'],
    ].map(([title, body]) => (
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
