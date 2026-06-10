/** 🟧 UI │ components/landing/LandingIntakeForm.tsx — Intake form fields, waiver, submit UI. @see README.md */
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { EmailFallbackActions } from './EmailFallbackActions';
import { WaiverBlock } from './WaiverBlock';
import { ConsentBlock } from './ConsentBlock';
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

  const SectionHeader = ({ num, label }: { num: number; label: string }) => (
    <div className="gq-form-section-header">
      <span className="gq-section-number">{num}</span>
      <p className="gq-section-label">{label}</p>
    </div>
  );

  return (
    <form className="space-y-4 pb-24 md:pb-4 gq-slide-up" onSubmit={onSubmit}>
      <div className="gq-form-section">
        <SectionHeader num={1} label="Artist Info" />
        <div className="mt-4 space-y-3">
          <div>
            <Label htmlFor="stageName" className="mb-2 text-zinc-200">Stage Name</Label>
            <Input id="stageName" name="stageName" required value={formData.stageName} onChange={onChange} className="gq-input" />
          </div>
          <div>
            <Label htmlFor="realName" className="mb-2 text-zinc-200">Real Name</Label>
            <Input id="realName" name="realName" required value={formData.realName} onChange={onChange} className="gq-input" />
          </div>
        </div>
      </div>

      <div className="gq-form-section">
        <SectionHeader num={2} label="Contact Info" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="email" className="mb-2 text-zinc-200">Email</Label>
            <Input id="email" name="email" type="email" required value={formData.email} onChange={onChange} className="gq-input" />
          </div>
          <div>
            <Label htmlFor="phone" className="mb-2 text-zinc-200">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={onChange} className="gq-input" />
          </div>
          <div>
            <Label htmlFor="emergencyContactName" className="mb-2 text-zinc-200">Emergency Contact Name</Label>
            <Input id="emergencyContactName" name="emergencyContactName" required value={formData.emergencyContactName} onChange={onChange} className="gq-input" />
          </div>
          <div>
            <Label htmlFor="emergencyContactPhone" className="mb-2 text-zinc-200">Emergency Contact Phone</Label>
            <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" required value={formData.emergencyContactPhone} onChange={onChange} className="gq-input" />
          </div>
          <div>
            <Label htmlFor="city" className="mb-2 text-zinc-200">City</Label>
            <Input id="city" name="city" value={formData.city} onChange={onChange} className="gq-input" />
          </div>
          <div>
            <Label htmlFor="performanceType" className="mb-2 text-zinc-200">Artist Type</Label>
            <Input id="performanceType" name="performanceType" placeholder="Singer, rapper, DJ..." value={formData.performanceType} onChange={onChange} className="gq-input" />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="instagram" className="mb-2 text-zinc-200">Instagram or Social Link</Label>
          <Input id="instagram" name="instagram" value={formData.instagram} onChange={onChange} className="gq-input" />
        </div>
        <div className="mt-4">
          <Label htmlFor="notes" className="mb-2 text-zinc-200">Anything Else</Label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={onChange}
            className="gq-input min-h-[6rem] py-3"
            placeholder="Tell us anything important about your act."
          />
        </div>
      </div>

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

      {submitError ? (
        <div className="space-y-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <p className="text-sm text-amber-200">{submitError}</p>
          <EmailFallbackActions mailto={draftLinks.mailto} gmail={draftLinks.gmail} emailBody={draftLinks.body} compact />
        </div>
      ) : null}

      <p className="text-xs text-zinc-500">
        By submitting you agree to our{' '}
        <Link to="/legal/privacy" className="text-[#f2d06b] underline-offset-2 hover:underline">Privacy Policy</Link>
        {' '}and{' '}
        <Link to="/legal/waiver" className="text-[#f2d06b] underline-offset-2 hover:underline">Participation Agreement</Link>.
      </p>

      <p className="text-xs leading-5 text-zinc-500">
        After submit, your email app will open with your registration ready to send.
      </p>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#070911]/95 p-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <Button
          type="submit"
          disabled={
            submitting ||
            !waiverViewed ||
            !waiverAccepted ||
            !ageConfirmed ||
            !eSignConsent ||
            !signatureMatches
          }
          className="elite-btn-gold h-12 w-full rounded-2xl px-4 text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em]"
        >
          {submitting ? 'Submitting…' : 'Submit Registration'}
        </Button>
      </div>
    </form>
  );
};
