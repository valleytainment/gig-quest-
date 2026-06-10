/** 🟧 UI │ LandingIntakeForm — Guided artist intake form sections. @see README.md */
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../ui/input';
import { ActionButton } from '../ui/ActionButton';
import { EmailFallbackActions } from './EmailFallbackActions';
import { WaiverBlock } from './WaiverBlock';
import { ConsentBlock } from './ConsentBlock';
import { IntakeFormSection } from './IntakeFormSection';
import { FormField } from './FormField';
import type { LandingFormData } from '../../types/applications';

type LandingIntakeFormProps = {
  formData: LandingFormData;
  waiverViewed: boolean;
  waiverAccepted: boolean;
  ageConfirmed: boolean;
  eSignConsent: boolean;
  submitting: boolean;
  submitError: string | null;
  draftLinks: { mailto: string; gmail: string; body?: string };
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onWaiverViewed: () => void;
  onWaiverAcceptedChange: (accepted: boolean) => void;
  onAgeConfirmedChange: (checked: boolean) => void;
  onESignConsentChange: (checked: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const LandingIntakeForm = ({
  formData,
  waiverViewed,
  waiverAccepted,
  ageConfirmed,
  eSignConsent,
  submitting,
  submitError,
  draftLinks,
  onChange,
  onWaiverViewed,
  onWaiverAcceptedChange,
  onAgeConfirmedChange,
  onESignConsentChange,
  onSubmit,
}: LandingIntakeFormProps) => {
  const signatureMatches =
    formData.legalSignature.trim().toLowerCase() === formData.realName.trim().toLowerCase();

  return (
    <form className="gq-form-reveal space-y-4 pb-28 md:pb-4" onSubmit={onSubmit}>
      <div className="gq-stagger space-y-4">
      <IntakeFormSection number={1} label="Artist Info" description="Your stage and legal name.">
        <div className="space-y-4">
          <FormField id="stageName" label="Stage Name" required>
            <Input id="stageName" name="stageName" required value={formData.stageName} onChange={onChange} className="gq-input" />
          </FormField>
          <FormField id="realName" label="Real Name" required>
            <Input id="realName" name="realName" required value={formData.realName} onChange={onChange} className="gq-input" autoComplete="name" />
          </FormField>
        </div>
      </IntakeFormSection>

      <IntakeFormSection number={2} label="Contact Info" description="How we reach you about opportunities.">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField id="email" label="Email" required>
            <Input id="email" name="email" type="email" required value={formData.email} onChange={onChange} className="gq-input" autoComplete="email" />
          </FormField>
          <FormField id="phone" label="Phone Number" required>
            <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={onChange} className="gq-input" autoComplete="tel" />
          </FormField>
        </div>
      </IntakeFormSection>

      <IntakeFormSection number={3} label="Emergency Contact" description="Someone we can reach if needed during an event.">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField id="emergencyContactName" label="Emergency Contact Name" required>
            <Input id="emergencyContactName" name="emergencyContactName" required value={formData.emergencyContactName} onChange={onChange} className="gq-input" />
          </FormField>
          <FormField id="emergencyContactPhone" label="Emergency Contact Phone" required>
            <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" required value={formData.emergencyContactPhone} onChange={onChange} className="gq-input" autoComplete="tel" />
          </FormField>
        </div>
      </IntakeFormSection>

      <IntakeFormSection number={4} label="Performance Details" description="Tell us about your act and where you perform.">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField id="city" label="City">
            <Input id="city" name="city" value={formData.city} onChange={onChange} className="gq-input" autoComplete="address-level2" />
          </FormField>
          <FormField id="performanceType" label="Artist Type" hint="Singer, rapper, DJ, band, etc.">
            <Input id="performanceType" name="performanceType" placeholder="Singer, rapper, DJ..." value={formData.performanceType} onChange={onChange} className="gq-input" />
          </FormField>
        </div>
        <div className="mt-4 space-y-4">
          <FormField id="instagram" label="Instagram or Social Link">
            <Input id="instagram" name="instagram" value={formData.instagram} onChange={onChange} className="gq-input" placeholder="https://instagram.com/..." />
          </FormField>
          <FormField id="notes" label="Anything Else">
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={onChange}
              className="gq-input min-h-[6rem] py-3"
              placeholder="Tell us anything important about your act."
            />
          </FormField>
        </div>
      </IntakeFormSection>

      <WaiverBlock
        waiverViewed={waiverViewed}
        waiverAccepted={waiverAccepted}
        onViewed={onWaiverViewed}
        onAcceptedChange={onWaiverAcceptedChange}
      />

      <ConsentBlock
        formData={formData}
        ageConfirmed={ageConfirmed}
        eSignConsent={eSignConsent}
        onChange={onChange}
        onAgeConfirmedChange={onAgeConfirmedChange}
        onESignConsentChange={onESignConsentChange}
      />
      </div>

      {submitError ? (
        <div className="space-y-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <p className="text-sm text-amber-200">{submitError}</p>
          <EmailFallbackActions mailto={draftLinks.mailto} gmail={draftLinks.gmail} emailBody={draftLinks.body} compact />
        </div>
      ) : null}

      <p className="text-xs leading-5 text-zinc-500">
        By submitting you agree to our{' '}
        <Link to="/legal/privacy" className="text-[#f2d06b] underline-offset-2 hover:underline">Privacy Policy</Link>
        {' '}and{' '}
        <Link to="/legal/waiver" className="text-[#f2d06b] underline-offset-2 hover:underline">Participation Agreement</Link>.
      </p>

      <p className="text-xs leading-5 text-zinc-500">
        After submit, your email app will open with your registration ready to send.
      </p>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#070911]/95 p-4 backdrop-blur-md safe-area-pb md:static md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <ActionButton
          type="submit"
          fullWidth
          loading={submitting}
          disabled={
            !waiverViewed ||
            !waiverAccepted ||
            !ageConfirmed ||
            !eSignConsent ||
            !signatureMatches
          }
          className="min-h-[48px]"
        >
          Submit Registration
        </ActionButton>
      </div>
    </form>
  );
};
