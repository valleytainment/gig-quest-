/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟩 MODULE │ gig-quest/src/lib/waiver.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          DOMAIN
 * @responsibility Waiver version id, body hash, effective date, section text
 * @depends-on     None (pure constants)
 * @consumers      submissions.ts, WaiverDialogContent, legal pages
 * @safe-mode      Hashes must match firestore.rules isValidConsent validation
 *
 * STRUCTURAL INTENT
 * Single source for waiver versioning until Phase 8 moves to waiverVersions collection.
 *
 * @see docs/DATA_MODEL.md
 * ═══════════════════════════════════════════════════════════════════════════════
 */
export const CURRENT_WAIVER_VERSION_ID = 'v1.1.0';

// Stable hash for the current in-app waiver text (Phase 8 will move to Firestore waiverVersions).
export const CURRENT_WAIVER_BODY_HASH = 'gq-waiver-v1.1-2026';

export const WAIVER_EFFECTIVE_DATE = '2026-06-10';

export const WAIVER_ORGANIZER_NAME = 'Creative Freq (Independent Event Organizer)';

export type WaiverSection = {
  title: string;
  body: string;
};

export const WAIVER_SECTIONS: WaiverSection[] = [
  {
    title: '1. Event Description',
    body: 'This is an independent, mobile, pop-up performance experience conducted in public or private areas. Locations, staging, and production setups are dynamic and may change at any time. Events may use mobile stages, trucks, trailers, risers, barriers, tents, and temporary production structures. This is not a traditional fixed-venue event and is not affiliated with any major event, organization, sponsor, or brand unless explicitly stated in writing.',
  },
  {
    title: '2. Voluntary Participation',
    body: 'I understand that my participation is entirely voluntary. I am choosing to participate at my own discretion and accept full personal responsibility for my involvement, my conduct, and the conduct of anyone I bring with me.',
  },
  {
    title: '3. Assumption Of Risk',
    body: 'I acknowledge that participation involves inherent and serious risks, including but not limited to: crowds and crowd surge; public interaction; movement between locations; motor vehicle and truck traffic; climbing or falling from elevated surfaces; stage or equipment collapse; electrical hazards; slips, trips, and falls; uneven or unstable surfaces; weather; noise exposure; equipment use; and interaction with law enforcement or third parties. I voluntarily and knowingly assume all risks of injury, illness, disability, death, and property damage associated with participation — whether caused by negligence (except where prohibited by law) or otherwise.',
  },
  {
    title: '4. Venue, Stage, Truck & Property Access',
    body: 'Performance and production areas may include mobile stages, stage decks, truck beds, trailer interiors and exteriors, ramps, ladders, rails, roofs, lift gates, production cases, cables, generators, and all surrounding property operated, leased, or controlled by the Organizer (“Event Property”). I agree that I will not climb on, mount, stand on, hang from, jump onto, enter, or otherwise access any stage, truck, trailer, vehicle, ladder, rail, roof, lift gate, or production structure unless the Organizer has given me explicit, in-the-moment authorization for that specific task. Unauthorized access is strictly prohibited — even if I have been allowed access before, even if a crowd or third party encourages it, and even if access appears open or unattended. I understand that Event Property may be active, moving, elevated, or unstable. I accept full responsibility and assume all risk of harm to myself and others arising from any contact with Event Property, whether my access was authorized or unauthorized.',
  },
  {
    title: '5. Release Of Liability',
    body: 'To the fullest extent permitted by applicable law, I hereby release, waive, discharge, and covenant not to sue the Organizer, its owners, operators, staff, volunteers, contractors, landlords, property owners, insurers, and affiliates (collectively, the “Released Parties”) from any and all claims, demands, causes of action, liabilities, damages, losses, costs, or expenses (including attorneys’ fees) arising out of or related to my participation, including claims for personal injury, illness, death, emotional distress, and property damage — including injuries or damages resulting from falls from stages, trucks, trailers, or equipment; unauthorized access to Event Property; vehicle movement; structural failure; or interaction with other participants or the public. This release applies whether or not any Released Party has been negligent, except where such release is prohibited by law.',
  },
  {
    title: '6. Indemnification',
    body: 'I agree to defend, indemnify, and hold harmless the Released Parties from any claim, loss, liability, damage, or expense (including reasonable attorneys’ fees) arising from my acts or omissions, my unauthorized access to Event Property, my violation of this agreement, or the acts or omissions of any guest, helper, or minor under my supervision.',
  },
  {
    title: '7. Conduct And Safety',
    body: 'I agree to follow all safety instructions, stay within designated performance areas unless explicitly authorized otherwise, respect time limits, avoid illegal or disruptive behavior, and not interfere with public safety or production operations. I will not climb on Event Property without explicit Organizer authorization. The Organizer may remove or deny participation to me or anyone accompanying me at any time for safety, behavior, or operational reasons.',
  },
  {
    title: '8. No Guarantee Of Performance Or Compensation',
    body: 'Performance opportunities, duration, tips, earnings, and exposure are not guaranteed. Participation is opportunity-based only.',
  },
  {
    title: '9. Personal Property',
    body: 'I am solely responsible for all personal belongings, instruments, equipment, and valuables. The Released Parties are not responsible for lost, stolen, or damaged personal property.',
  },
  {
    title: '10. Media Release',
    body: 'I grant permission for the Organizer to capture and use my image, voice, performance, and name for promotional and marketing purposes without additional compensation unless otherwise agreed in writing.',
  },
  {
    title: '11. Independent Participation Status',
    body: 'I am not an employee, contractor, agent, or representative of the Organizer. I am participating independently.',
  },
  {
    title: '12. Event Flexibility',
    body: 'Performance times, locations, staging, vehicle positioning, and conditions may change due to crowd conditions, safety, weather, equipment, permitting, or public authority direction.',
  },
  {
    title: '13. Removal And Termination',
    body: 'The Organizer may remove, suspend, or deny participation at any time for safety, unauthorized access to Event Property, behavior, or operational concerns.',
  },
  {
    title: '14. Legal Acknowledgment',
    body: 'I confirm that I am at least 18 years old or have legal guardian consent where required, that I have read and understand this agreement, that I am signing voluntarily, and that I understand I am giving up substantial legal rights including the right to sue for injuries arising from participation and access to Event Property.',
  },
];
