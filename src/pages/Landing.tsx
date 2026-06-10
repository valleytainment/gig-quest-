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
import { HowItWorks } from '../components/landing/HowItWorks';
import { FaqBlock } from '../components/landing/FaqBlock';
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
    <div className="gq-shell relative min-h-screen overflow-x-hidden px-3 py-3 pb-8 safe-area-x sm:px-4 sm:py-6 sm:pb-10 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="gq-orb left-[-2rem] top-[-1rem] h-48 w-48 bg-[#d4af37]/15 sm:h-64 sm:w-64" />
        <div className="gq-orb bottom-[-2rem] right-[-2rem] h-56 w-56 bg-[#27456b]/25 sm:h-80 sm:w-80" />
      </div>

      <main className="relative mx-auto w-full max-w-6xl">
        <div className="gq-card grid w-full min-w-0 grid-cols-1 items-stretch overflow-hidden rounded-2xl lg:grid-cols-2 lg:rounded-[2rem]">
          <section className="order-1 flex min-w-0 flex-col justify-center border-b border-white/10 px-3 py-5 sm:px-6 sm:py-8 lg:order-2 lg:border-b-0 lg:border-l lg:px-8 lg:py-10">
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

          <LandingHero className="order-2 min-w-0 lg:order-1" />
        </div>

        <div className="mt-6 px-2 lg:hidden">
          <HowItWorks />
          <FaqBlock />
        </div>
      </main>
    </div>
  );
};
