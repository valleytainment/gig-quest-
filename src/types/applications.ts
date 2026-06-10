export type ApplicationStatus =
  | 'new'
  | 'reviewing'
  | 'approved'
  | 'waitlisted'
  | 'rejected'
  | 'checked_in'
  | 'completed'
  | 'no_show';

export type ApplicationSource = 'public_landing' | 'artist_portal';

export type ConsentSnapshot = {
  waiverVersionId: string;
  waiverBodyHash: string;
  waiverViewed: boolean;
  waiverAccepted: boolean;
  ageConfirmed: boolean;
  eSignConsent: boolean;
  legalSignature: string;
  initials: string;
  guardianName?: string;
  guardianPhone?: string;
  acceptedAt: Date | unknown;
  userAgentHash?: string;
};

export type ArtistSnapshot = {
  stageName: string;
  legalName?: string;
  email: string;
  phone?: string;
  city?: string;
  socialUrl?: string;
  performanceType?: string;
};

export type Application = {
  id?: string;
  eventId?: string;
  artistId?: string;
  source: ApplicationSource;
  status: ApplicationStatus;
  artistSnapshot: ArtistSnapshot;
  emergencyContact?: { name: string; phone: string };
  portfolioUrl?: string;
  message?: string;
  internalNotes?: string;
  consent: ConsentSnapshot;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type LandingFormData = {
  stageName: string;
  realName: string;
  email: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  city: string;
  performanceType: string;
  instagram: string;
  legalSignature: string;
  signatureInitials: string;
  guardianName: string;
  guardianPhone: string;
  notes: string;
};

export type WaiverConsentInput = {
  waiverViewed: boolean;
  waiverAccepted: boolean;
  ageConfirmed: boolean;
  eSignConsent: boolean;
};
