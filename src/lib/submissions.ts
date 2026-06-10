/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟩 MODULE │ gig-quest/src/lib/submissions.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          DOMAIN
 * @responsibility Public intake: email draft, Firestore create gate, confirmation IDs
 * @depends-on     firebase.ts, waiver.ts, types/applications
 * @consumers      Landing.tsx, LandingIntakeForm (via Landing)
 * @safe-mode      isFirestoreIntakeEnabled() false by default; email fallback always built
 *
 * STRUCTURAL INTENT
 * Canonical intake domain logic. Firestore write is optional and env-gated;
 * buildEmailDraft() always runs so users can send via mailto/Gmail.
 *
 * @see docs/INTAKE_ENABLE_RUNBOOK.md
 * @see docs/SYSTEM_MAP.md#intake-flow-public-landing
 * ═══════════════════════════════════════════════════════════════════════════════
 */
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import {
  CURRENT_WAIVER_BODY_HASH,
  CURRENT_WAIVER_VERSION_ID,
} from './waiver';
import type {
  Application,
  ConsentSnapshot,
  LandingFormData,
  WaiverConsentInput,
} from '../types/applications';

export type EmailDraftLinks = { mailto: string; gmail: string; subject: string; body: string };

export const INTAKE_RECIPIENT_EMAIL = 'creativefreqllc@gmail.com';

export function buildEmailBody(formData: LandingFormData, confirmationId?: string): { subject: string; body: string } {
  const submittedAt = new Date();
  const subject = `Artist Registration - ${formData.stageName || formData.realName || 'New Submission'}`;
  const body = [
    'New artist registration submission:',
    '',
    confirmationId ? `Confirmation ID: ${confirmationId}` : '',
    confirmationId ? '' : '',
    'SUBMISSION RECORD',
    `Submitted At (Local): ${submittedAt.toLocaleString()}`,
    `Submitted At (UTC/ISO): ${submittedAt.toISOString()}`,
    `Browser Time Zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
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
    `Waiver Version: ${CURRENT_WAIVER_VERSION_ID}`,
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
    'By submitting this registration, I confirm that I reviewed the Artist Participation Agreement (including stage, truck, and property access rules), understood it, and voluntarily agreed to its terms — including assumption of risk and release of liability.',
    '',
    'Anything Else:',
    formData.notes || 'N/A',
  ]
    .filter((line, index, arr) => !(line === '' && arr[index - 1] === ''))
    .join('\n');

  return { subject, body };
}

export function buildConsentSnapshot(
  formData: LandingFormData,
  consent: WaiverConsentInput
): ConsentSnapshot {
  return {
    waiverVersionId: CURRENT_WAIVER_VERSION_ID,
    waiverBodyHash: CURRENT_WAIVER_BODY_HASH,
    waiverViewed: consent.waiverViewed,
    waiverAccepted: consent.waiverAccepted,
    ageConfirmed: consent.ageConfirmed,
    eSignConsent: consent.eSignConsent,
    legalSignature: formData.legalSignature,
    initials: formData.signatureInitials,
    guardianName: formData.guardianName || undefined,
    guardianPhone: formData.guardianPhone || undefined,
    acceptedAt: new Date(), // replaced with serverTimestamp() on write
    userAgentHash: navigator.userAgent.slice(0, 64),
  };
}

export function buildEmailDraft(
  formData: LandingFormData,
  confirmationId?: string
): EmailDraftLinks {
  const { subject, body } = buildEmailBody(formData, confirmationId);
  const mailtoUrl = `mailto:${INTAKE_RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(INTAKE_RECIPIENT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { mailto: mailtoUrl, gmail: gmailUrl, subject, body };
}

export function isFirestoreIntakeEnabled(): boolean {
  return import.meta.env.VITE_ENABLE_FIRESTORE_INTAKE === 'true';
}

export async function createPublicApplication(params: {
  formData: LandingFormData;
  consent: WaiverConsentInput;
}): Promise<{ id: string }> {
  const { formData, consent } = params;
  const consentSnapshot = buildConsentSnapshot(formData, consent);

  const application: Omit<Application, 'id'> = {
    source: 'public_landing',
    status: 'new',
    artistSnapshot: {
      stageName: formData.stageName,
      legalName: formData.realName,
      email: formData.email.toLowerCase(),
      phone: formData.phone,
      city: formData.city || undefined,
      socialUrl: formData.instagram || undefined,
      performanceType: formData.performanceType || undefined,
    },
    emergencyContact: {
      name: formData.emergencyContactName,
      phone: formData.emergencyContactPhone,
    },
    message: formData.notes || undefined,
    consent: { ...consentSnapshot, acceptedAt: serverTimestamp() },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, 'applications'), application);
  return { id: docRef.id };
}
