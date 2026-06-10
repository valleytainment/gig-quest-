/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟨 MODULE │ gig-quest/src/pages/Landing.tsx
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          ROUTE
 * @responsibility Public intake orchestrator — form state, submit, success flow
 * @depends-on     lib/submissions, components/landing/*, types/applications
 * @consumers      App.tsx route "/"
 * @safe-mode      CRITICAL — waiver gate, signature match, email fallback required
 *
 * STRUCTURAL INTENT
 * Owns intake state machine only; presentation delegated to components/landing/.
 * Never remove email fallback on success. Firestore create is env-gated.
 *
 * @see docs/LEGACY_SAFE_MODE.md
 * @see docs/SYSTEM_MAP.md#intake-flow-public-landing
 * ═══════════════════════════════════════════════════════════════════════════════
 */
import React, { useState } from 'react';
import {
  buildEmailDraft,
  createPublicApplication,
  isFirestoreIntakeEnabled,
} from '../lib/submissions';
import { LandingHero } from '../components/landing/LandingHero';
import { ArtistIntakeCard } from '../components/landing/ArtistIntakeCard';
import { LandingIntakeForm } from '../components/landing/LandingIntakeForm';
import { SuccessPanel } from '../components/landing/SuccessPanel';
import type { LandingFormData } from '../types/applications';

const INITIAL_FORM: LandingFormData = {
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
};

export const Landing = () => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [draftLinks, setDraftLinks] = useState({ mailto: '', gmail: '', body: '' });
  const [waiverViewed, setWaiverViewed] = useState(false);
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [eSignConsent, setESignConsent] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<LandingFormData>(INITIAL_FORM);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signatureMatches =
      formData.legalSignature.trim().toLowerCase() === formData.realName.trim().toLowerCase();

    if (!waiverViewed || !waiverAccepted || !ageConfirmed || !eSignConsent || !signatureMatches) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const consent = { waiverViewed, waiverAccepted, ageConfirmed, eSignConsent };

    if (isFirestoreIntakeEnabled()) {
      try {
        const { id } = await createPublicApplication({ formData, consent });
        const drafts = buildEmailDraft(formData, id);
        setConfirmationId(id);
        setDraftLinks({ mailto: drafts.mailto, gmail: drafts.gmail, body: drafts.body });
        setSubmitted(true);
        window.location.href = drafts.mailto;
        return;
      } catch {
        const drafts = buildEmailDraft(formData);
        setDraftLinks({ mailto: drafts.mailto, gmail: drafts.gmail, body: drafts.body });
        setSubmitError(
          'Online submission failed. Your answers are still here — retry or send via email below.'
        );
        setSubmitting(false);
        return;
      }
    }

    const drafts = buildEmailDraft(formData);
    setDraftLinks({ mailto: drafts.mailto, gmail: drafts.gmail, body: drafts.body });
    setSubmitted(true);
    window.location.href = drafts.mailto;
    setSubmitting(false);
  };

  return (
    <div className="gq-shell min-h-screen overflow-hidden px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="gq-orb left-[-2rem] top-[-1rem] h-48 w-48 bg-[#d4af37]/15 sm:h-64 sm:w-64" />
        <div className="gq-orb bottom-[-2rem] right-[-2rem] h-56 w-56 bg-[#27456b]/25 sm:h-80 sm:w-80" />
      </div>

      <main className="relative mx-auto flex min-h-[100dvh] max-w-5xl items-stretch justify-center md:min-h-[calc(100vh-4rem)] md:items-center">
        <div className="gq-card grid w-full overflow-hidden rounded-[1.5rem] md:grid-cols-[1.02fr_0.98fr] md:rounded-[2rem]">
          <LandingHero />

          <section className="px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-12">
            {!showForm && !submitted ? (
              <ArtistIntakeCard onOpen={() => setShowForm(true)} />
            ) : null}

            {showForm && !submitted ? (
              <LandingIntakeForm
                formData={formData}
                waiverViewed={waiverViewed}
                waiverAccepted={waiverAccepted}
                ageConfirmed={ageConfirmed}
                eSignConsent={eSignConsent}
                submitting={submitting}
                submitError={submitError}
                draftLinks={draftLinks}
                onChange={handleChange}
                onWaiverViewed={() => setWaiverViewed(true)}
                onWaiverAcceptedChange={setWaiverAccepted}
                onAgeConfirmedChange={setAgeConfirmed}
                onESignConsentChange={setESignConsent}
                onSubmit={handleSubmit}
              />
            ) : null}

            {submitted ? (
              <SuccessPanel draftLinks={draftLinks} confirmationId={confirmationId} />
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
};
