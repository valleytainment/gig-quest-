import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { ArrowRight, CircleAlert, Info, Mic2, ShieldCheck } from 'lucide-react';

export const Landing = () => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [draftLinks, setDraftLinks] = useState({ mailto: '', gmail: '' });
  const [waiverViewed, setWaiverViewed] = useState(false);
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [eSignConsent, setESignConsent] = useState(false);
  const [formData, setFormData] = useState({
    stageName: '',
    realName: '',
    email: '',
    phone: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    city: '',
    performanceType: '',
    instagram: '',
    legalSignature: '',
    signatureInitials: '',
    guardianName: '',
    guardianPhone: '',
    notes: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signatureMatches =
      formData.legalSignature.trim().toLowerCase() === formData.realName.trim().toLowerCase();

    if (!waiverViewed || !waiverAccepted || !ageConfirmed || !eSignConsent || !signatureMatches) {
      return;
    }

    const submittedAt = new Date();
    const submittedAtLocal = submittedAt.toLocaleString();
    const submittedAtIso = submittedAt.toISOString();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const subject = `Artist Registration - ${formData.stageName || formData.realName || 'New Submission'}`;
    const body = [
      'New artist registration submission:',
      '',
      'SUBMISSION RECORD',
      `Submitted At (Local): ${submittedAtLocal}`,
      `Submitted At (UTC/ISO): ${submittedAtIso}`,
      `Browser Time Zone: ${timezone}`,
      `User Agent: ${navigator.userAgent}`,
      '',
      'ARTIST DETAILS',
      `Stage Name: ${formData.stageName}`,
      `Real Name: ${formData.realName}`,
      `Email: ${formData.email}`,
      `Phone Number: ${formData.phone}`,
      `Emergency Contact Name: ${formData.emergencyContactName}`,
      `Emergency Contact Phone: ${formData.emergencyContactPhone}`,
      `City: ${formData.city || 'N/A'}`,
      `Artist Type: ${formData.performanceType || 'N/A'}`,
      `Instagram or Social Link: ${formData.instagram || 'N/A'}`,
      '',
      'WAIVER / CONSENT RECORD',
      `Waiver Viewed: Yes`,
      `Waiver Accepted: Yes`,
      `18+ Or Guardian Consent Confirmed: Yes`,
      `Electronic Signature Consent: Yes`,
      `Typed Legal Signature: ${formData.legalSignature}`,
      `Signature Initials: ${formData.signatureInitials}`,
      `Guardian Name: ${formData.guardianName || 'N/A'}`,
      `Guardian Phone: ${formData.guardianPhone || 'N/A'}`,
      '',
      'LEGAL ACKNOWLEDGMENT',
      'By submitting this registration, I confirm that I reviewed the Artist Participation Agreement, understood it, and voluntarily agreed to its terms. I understand that typing my legal name below acts as my electronic signature and acknowledgment of the waiver, media release, and participation terms.',
      '',
      'Anything Else:',
      formData.notes || 'N/A',
    ].join('\n');

    const mailtoUrl = `mailto:creativefreqllc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('creativefreqllc@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftLinks({ mailto: mailtoUrl, gmail: gmailUrl });
    setSubmitted(true);

    // Try the default mail client first. If the browser/device has no handler configured,
    // the fallback buttons in the success state let the user open the draft manually.
    window.location.href = mailtoUrl;
  };

  return (
    <div className="elite-bg min-h-screen overflow-hidden px-3 py-4 text-white sm:px-4 sm:py-6 md:px-6 md:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-2rem] top-[-1rem] h-48 w-48 rounded-full bg-[#d4af37]/15 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute bottom-[-2rem] right-[-2rem] h-56 w-56 rounded-full bg-[#27456b]/25 blur-3xl sm:h-80 sm:w-80" />
      </div>

      <main className="relative mx-auto flex min-h-[100dvh] max-w-5xl items-stretch justify-center md:min-h-[calc(100vh-4rem)] md:items-center">
        <div className="elite-panel grid w-full overflow-hidden rounded-[1.5rem] md:grid-cols-[1.02fr_0.98fr] md:rounded-[2rem]">
          <section className="border-b border-white/10 px-5 py-8 sm:px-6 sm:py-9 md:border-b-0 md:border-r md:px-10 md:py-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-[#d4af37] shadow-[0_0_45px_rgba(212,175,55,0.35)] sm:h-20 sm:w-20 sm:rounded-[1.75rem] md:mx-0">
              <Mic2 className="h-8 w-8 text-black sm:h-10 sm:w-10" />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#f2d06b] sm:text-sm">
              Creative Freq Artist Intake
            </p>

            <h1 className="max-w-lg text-[2.35rem] font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-7xl">
              Performance Opportunities For Serious Artists
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
              Submit once, review the waiver, and send your registration from your phone without extra steps.
            </p>

            <p className="mt-4 max-w-md text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6">
              Sign-up is free. Some events may require a fee or ticket purchase — you will be notified in advance if that applies.
            </p>

          </section>

          <section className="px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-12">
            {!showForm && !submitted ? (
              <div className="flex h-full flex-col justify-center">
                <div className="elite-card-gold rounded-[1.6rem] p-5 sm:rounded-3xl sm:p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#f2d06b] sm:text-sm sm:tracking-[0.35em]">
                    Artist Registration
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-3xl">
                    Sign up for performance opportunities
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    Tap once, fill out the basics, and submit your information for review.
                  </p>
                  <Button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="elite-btn-gold mt-5 h-12 w-full rounded-2xl px-4 text-sm font-bold uppercase tracking-[0.16em] sm:mt-6 sm:tracking-[0.2em]"
                  >
                    Sign Up For Performance Opportunities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : null}

            {showForm && !submitted ? (
              <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="stageName" className="mb-2 text-zinc-200">Stage Name</Label>
                  <Input id="stageName" name="stageName" required value={formData.stageName} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                </div>

                <div>
                  <Label htmlFor="realName" className="mb-2 text-zinc-200">Real Name</Label>
                  <Input id="realName" name="realName" required value={formData.realName} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="email" className="mb-2 text-zinc-200">Email</Label>
                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="mb-2 text-zinc-200">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="emergencyContactName" className="mb-2 text-zinc-200">Emergency Contact Name</Label>
                    <Input id="emergencyContactName" name="emergencyContactName" required value={formData.emergencyContactName} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                  </div>

                  <div>
                    <Label htmlFor="emergencyContactPhone" className="mb-2 text-zinc-200">Emergency Contact Phone</Label>
                    <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" required value={formData.emergencyContactPhone} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="city" className="mb-2 text-zinc-200">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                  </div>

                  <div>
                    <Label htmlFor="performanceType" className="mb-2 text-zinc-200">Artist Type</Label>
                    <Input id="performanceType" name="performanceType" placeholder="Singer, rapper, DJ..." value={formData.performanceType} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-500" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="instagram" className="mb-2 text-zinc-200">Instagram or Social Link</Label>
                  <Input id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                </div>

                <div>
                  <Label htmlFor="notes" className="mb-2 text-zinc-200">Anything Else</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20"
                    placeholder="Tell us anything important about your act."
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-[#f2d06b]" />
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                          Terms And Conditions / Waiver
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        You must open and review the waiver before you can accept it and continue.
                      </p>
                    </div>
                    <span
                      title="Open the waiver first. The acceptance box stays locked until the waiver has been viewed."
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300"
                    >
                      <Info className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Dialog>
                      <DialogTrigger
                        render={
                          <button
                            type="button"
                            className="elite-btn-blue inline-flex h-12 w-full items-center justify-center rounded-2xl px-4 text-sm font-bold uppercase tracking-[0.14em] sm:w-auto sm:tracking-[0.18em]"
                          />
                        }
                        onClick={() => setWaiverViewed(true)}
                      >
                        View Waiver Form
                      </DialogTrigger>
                      <DialogContent className="max-h-[90dvh] max-w-[calc(100%-1rem)] overflow-y-auto rounded-3xl border border-white/10 bg-[#111520] p-0 text-white ring-0 sm:max-w-3xl">
                        <DialogHeader className="border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5">
                          <DialogTitle className="text-lg font-bold uppercase tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em]">
                            Artist Participation Agreement
                          </DialogTitle>
                          <DialogDescription className="text-sm leading-6 text-zinc-300">
                            Liability waiver, media release, and terms of participation.
                          </DialogDescription>
                        </DialogHeader>

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

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">1. Event Description</h3>
                            <p className="mt-2">
                              This is an independent, mobile, pop-up performance experience conducted in public areas. Locations are dynamic and may change at any time. This is not a traditional stage event and is not affiliated with any major event, organization, sponsor, or brand.
                            </p>
                          </section>

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">2. Voluntary Participation</h3>
                            <p className="mt-2">
                              I understand that my participation is voluntary. I am choosing to participate at my own discretion and accept full responsibility for my involvement.
                            </p>
                          </section>

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">3. Assumption Of Risk</h3>
                            <p className="mt-2">I acknowledge that participation involves inherent risks, including but not limited to:</p>
                            <ul className="mt-3 space-y-2 text-zinc-300">
                              <li>• Crowds and public interaction</li>
                              <li>• Movement between locations</li>
                              <li>• Traffic and public streets</li>
                              <li>• Uneven surfaces and trip hazards</li>
                              <li>• Weather conditions</li>
                              <li>• Use of sound and electrical equipment</li>
                              <li>• Law enforcement or public authority interaction</li>
                            </ul>
                            <p className="mt-3">I voluntarily assume all risks associated with participation.</p>
                          </section>

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">4. Release Of Liability</h3>
                            <p className="mt-2">
                              To the fullest extent permitted by law, I release and hold harmless the Organizer, including any assistants or affiliates, from any and all claims, liabilities, damages, injuries, losses, or expenses arising from my participation.
                            </p>
                          </section>

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">5. Conduct And Safety</h3>
                            <p className="mt-2">I agree to:</p>
                            <ul className="mt-3 space-y-2 text-zinc-300">
                              <li>• Follow all safety instructions</li>
                              <li>• Respect time limits and performance structure</li>
                              <li>• Avoid illegal, unsafe, or disruptive behavior</li>
                              <li>• Not interfere with public safety or movement</li>
                            </ul>
                            <p className="mt-3">
                              The Organizer reserves the right to remove any participant at any time for safety, legal, or operational reasons.
                            </p>
                          </section>

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">6. No Guarantee Of Performance Or Compensation</h3>
                            <p className="mt-2">I understand and agree that:</p>
                            <ul className="mt-3 space-y-2 text-zinc-300">
                              <li>• Performance opportunities are not guaranteed</li>
                              <li>• Duration and frequency of performance may vary</li>
                              <li>• Tips, earnings, and exposure are not guaranteed</li>
                            </ul>
                            <p className="mt-3">Participation is opportunity-based.</p>
                          </section>

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">7. Personal Property</h3>
                            <p className="mt-2">
                              I am responsible for all personal belongings, equipment, and valuables. The Organizer is not responsible for lost, stolen, or damaged property.
                            </p>
                          </section>

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">8. Media Release</h3>
                            <p className="mt-2">
                              I grant full permission for the Organizer to capture, record, photograph, and use my:
                            </p>
                            <ul className="mt-3 space-y-2 text-zinc-300">
                              <li>• Image</li>
                              <li>• Voice</li>
                              <li>• Performance</li>
                              <li>• Name or stage name</li>
                            </ul>
                            <p className="mt-3">
                              for promotional, marketing, social media, and content purposes in any format, without compensation unless otherwise agreed.
                            </p>
                          </section>

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">9. Independent Participation Status</h3>
                            <p className="mt-2">
                              I acknowledge that I am not an employee, contractor, or representative of the Organizer. I am participating independently and am responsible for my own actions and obligations.
                            </p>
                          </section>

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">10. Event Flexibility</h3>
                            <p className="mt-2">
                              I understand that performance times, locations, and conditions may change at any time due to:
                            </p>
                            <ul className="mt-3 space-y-2 text-zinc-300">
                              <li>• Crowd conditions</li>
                              <li>• Safety concerns</li>
                              <li>• Weather</li>
                              <li>• Equipment limitations</li>
                              <li>• Public or law enforcement interaction</li>
                            </ul>
                          </section>

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">11. Removal And Termination</h3>
                            <p className="mt-2">
                              The Organizer may remove or deny participation at any time for any reason including safety, behavior, or operational concerns.
                            </p>
                          </section>

                          <section>
                            <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-[#f2d06b]">12. Legal Acknowledgment</h3>
                            <p className="mt-2">I confirm that:</p>
                            <ul className="mt-3 space-y-2 text-zinc-300">
                              <li>• I am at least 18 years old or have legal guardian consent</li>
                              <li>• I have read and fully understand this agreement</li>
                              <li>• I agree to all terms voluntarily</li>
                            </ul>
                          </section>

                          <section>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2d06b]">Signature</p>
                            <div className="mt-3 space-y-2 text-zinc-300">
                              <p>Artist Signature: _______________________________</p>
                              <p>Printed Name: _______________________________</p>
                              <p>Date: _______________________________</p>
                            </div>
                          </section>
                        </div>

                        <DialogFooter className="border-t border-white/10 bg-white/5 px-4 py-4 sm:px-6">
                          <div className="w-full rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-[#f2d06b]">
                            By accepting and submitting, the artist acknowledges that they have read, understood, and agreed to all terms outlined above.
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${waiverViewed ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
                      {waiverViewed ? 'Waiver Viewed' : 'View Required'}
                    </span>
                  </div>

                  <label className={`mt-4 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${waiverViewed ? 'border-emerald-500/25 bg-emerald-500/10 text-white' : 'border-white/10 bg-black/20 text-zinc-400'}`}>
                    <input
                      type="checkbox"
                      checked={waiverAccepted}
                      disabled={!waiverViewed}
                      required
                      onChange={(event) => setWaiverAccepted(event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/20 accent-[#d4af37]"
                    />
                    <span className="leading-6">
                      I have viewed the waiver form and I accept the terms and conditions outlined in the artist participation agreement.
                      {!waiverViewed ? (
                        <span className="mt-1 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-amber-300">
                          <CircleAlert className="h-3.5 w-3.5" />
                          Open the waiver first to unlock this checkbox.
                        </span>
                      ) : null}
                    </span>
                  </label>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#f2d06b]" />
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                      Consent Record
                    </p>
                  </div>

                  <div className="mt-4 space-y-4">
                    <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
                      <input
                        type="checkbox"
                        checked={ageConfirmed}
                        required
                        onChange={(event) => setAgeConfirmed(event.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-white/20 accent-[#d4af37]"
                      />
                      <span className="leading-6">
                        I confirm that I am at least 18 years old, or I have legal guardian consent to participate.
                      </span>
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="guardianName" className="mb-2 text-zinc-200">Guardian Name if Needed</Label>
                        <Input id="guardianName" name="guardianName" value={formData.guardianName} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                      </div>

                      <div>
                        <Label htmlFor="guardianPhone" className="mb-2 text-zinc-200">Guardian Phone if Needed</Label>
                        <Input id="guardianPhone" name="guardianPhone" type="tel" value={formData.guardianPhone} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
                      <input
                        type="checkbox"
                        checked={eSignConsent}
                        required
                        onChange={(event) => setESignConsent(event.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-white/20 accent-[#d4af37]"
                      />
                      <span className="leading-6">
                        I agree that typing my legal name below acts as my electronic signature and acknowledgment of this agreement.
                      </span>
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="legalSignature" className="mb-2 text-zinc-200">Type Legal Name as Signature</Label>
                        <Input id="legalSignature" name="legalSignature" required value={formData.legalSignature} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                        <p className="mt-2 text-xs uppercase tracking-[0.14em] text-zinc-400">
                          Must match real name above.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="signatureInitials" className="mb-2 text-zinc-200">Initials</Label>
                        <Input id="signatureInitials" name="signatureInitials" required value={formData.signatureInitials} onChange={handleChange} className="h-12 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                        <p className="mt-2 text-xs uppercase tracking-[0.14em] text-zinc-400">
                          Added to the email record.
                        </p>
                      </div>
                    </div>

                    {formData.legalSignature &&
                    formData.realName &&
                    formData.legalSignature.trim().toLowerCase() !== formData.realName.trim().toLowerCase() ? (
                      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs uppercase tracking-[0.14em] text-amber-300">
                        Typed legal signature must match the real name field exactly.
                      </div>
                    ) : null}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={
                    !waiverViewed ||
                    !waiverAccepted ||
                    !ageConfirmed ||
                    !eSignConsent ||
                    formData.legalSignature.trim().toLowerCase() !== formData.realName.trim().toLowerCase()
                  }
                  className="elite-btn-gold h-12 w-full rounded-2xl px-4 text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em]"
                >
                  Submit Registration
                </Button>
              </form>
            ) : null}

            {submitted ? (
              <div className="flex h-full flex-col justify-center">
                <div className="elite-card-blue rounded-[1.6rem] p-5 text-center sm:rounded-3xl sm:p-8">
                  <p className="text-xs uppercase tracking-[0.28em] text-sky-300 sm:text-sm sm:tracking-[0.35em]">
                    Submission Received
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-3xl">
                    We will reach out soon thank you
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">
                    Your artist registration draft is ready. If your email app did not open automatically, use one of the options below to send it to us.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    Submission does not guarantee acceptance for a performance opportunity. If you are not selected right away, your information may still be considered for future opportunities.
                  </p>
                  <div className="mt-6 space-y-3">
                    <a
                      href={draftLinks.mailto}
                      className="elite-btn-gold flex h-12 w-full items-center justify-center rounded-2xl px-4 text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em]"
                    >
                      Open Email App
                    </a>
                    <a
                      href={draftLinks.gmail}
                      target="_blank"
                      rel="noreferrer"
                      className="elite-btn-blue flex h-12 w-full items-center justify-center rounded-2xl px-4 text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em]"
                    >
                      Open In Gmail
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
};
