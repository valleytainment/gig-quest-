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

export type EmailDraftLinks = { mailto: string; gmail: string };

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
    'By submitting this registration, I confirm that I reviewed the Artist Participation Agreement, understood it, and voluntarily agreed to its terms.',
    '',
    'Anything Else:',
    formData.notes || 'N/A',
  ]
    .filter((line, index, arr) => !(line === '' && arr[index - 1] === ''))
    .join('\n');

  const mailtoUrl = `mailto:creativefreqllc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('creativefreqllc@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { mailto: mailtoUrl, gmail: gmailUrl };
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
