/** Phase 12G — Mobile conversion smoke tests. */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LandingIntakeForm } from '../src/components/landing/LandingIntakeForm';
import { EmailFallbackActions } from '../src/components/landing/EmailFallbackActions';
import { SuccessState } from '../src/components/feedback/SuccessState';
import { INTAKE_RECIPIENT_EMAIL } from '../src/lib/submissions';
import type { LandingFormData } from '../src/types/applications';

const formData: LandingFormData = {
  stageName: '',
  realName: 'Jane Artist',
  email: '',
  phone: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  city: '',
  performanceType: '',
  instagram: '',
  legalSignature: 'Jane Artist',
  signatureInitials: 'JA',
  guardianName: '',
  guardianPhone: '',
  notes: '',
};

const noop = () => undefined;

describe('Phase 12G mobile conversion', () => {
  it('LandingIntakeForm uses sticky submit bar class', () => {
    const { container } = render(
      <MemoryRouter>
        <LandingIntakeForm
          formData={formData}
          waiverViewed
          waiverAccepted
          ageConfirmed
          eSignConsent
          submitting={false}
          submitError={null}
          draftLinks={{ mailto: '', gmail: '' }}
          onChange={noop}
          onWaiverViewed={noop}
          onWaiverAcceptedChange={noop}
          onAgeConfirmedChange={noop}
          onESignConsentChange={noop}
          onSubmit={(event) => event.preventDefault()}
        />
      </MemoryRouter>
    );

    expect(container.querySelector('.gq-sticky-submit')).toBeInTheDocument();
  });

  it('EmailFallbackActions stacks actions for mobile success recovery', () => {
    const { container } = render(
      <EmailFallbackActions
        mailto={`mailto:${INTAKE_RECIPIENT_EMAIL}`}
        gmail="https://mail.google.com/mail/"
        emailBody="draft"
      />
    );

    expect(container.querySelector('.gq-mobile-stack')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open email app/i })).toHaveClass('w-full');
  });

  it('SuccessState uses tighter mobile padding classes', () => {
    const { container } = render(
      <SuccessState title="Your registration is ready to send" checklist={['Waiver reviewed']} />
    );

    const card = container.querySelector('.rounded-\\[1\\.35rem\\]');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('p-4');
  });
});
