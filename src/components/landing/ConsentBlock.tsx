/** 🟧 UI │ ConsentBlock — Consent record + signature sections. @see README.md */
import type { ChangeEvent } from 'react';
import { CircleAlert } from 'lucide-react';
import { Input } from '../ui/input';
import { SectionHeader } from '../ui/SectionHeader';
import { FormField } from './FormField';
import type { LandingFormData } from '../../types/applications';
import { cn } from '../../lib/utils';

type ConsentBlockProps = {
  formData: LandingFormData;
  ageConfirmed: boolean;
  eSignConsent: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAgeConfirmedChange: (checked: boolean) => void;
  onESignConsentChange: (checked: boolean) => void;
};

export const ConsentBlock = ({
  formData,
  ageConfirmed,
  eSignConsent,
  onChange,
  onAgeConfirmedChange,
  onESignConsentChange,
}: ConsentBlockProps) => {
  const signatureMismatch =
    formData.legalSignature &&
    formData.realName &&
    formData.legalSignature.trim().toLowerCase() !== formData.realName.trim().toLowerCase();

  return (
    <>
      <div className="gq-form-section">
        <SectionHeader
          number={6}
          label="Consent Record"
          description="Confirm age and electronic signature consent."
        />

        <div className="mt-4 space-y-4">
          <label
            className={cn(
              'gq-checkbox-card cursor-pointer',
              ageConfirmed && 'gq-checkbox-card--active'
            )}
          >
            <input
              type="checkbox"
              checked={ageConfirmed}
              required
              onChange={(event) => onAgeConfirmedChange(event.target.checked)}
              className="gq-checkbox-input"
            />
            <span className="leading-6">
              I confirm that I am at least 18 years old, or I have legal guardian consent to participate.
            </span>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField id="guardianName" label="Guardian Name if Needed">
              <Input id="guardianName" name="guardianName" value={formData.guardianName} onChange={onChange} className="gq-input" />
            </FormField>
            <FormField id="guardianPhone" label="Guardian Phone if Needed">
              <Input id="guardianPhone" name="guardianPhone" type="tel" value={formData.guardianPhone} onChange={onChange} className="gq-input" />
            </FormField>
          </div>

          <label
            className={cn(
              'gq-checkbox-card cursor-pointer',
              eSignConsent && 'gq-checkbox-card--active'
            )}
          >
            <input
              type="checkbox"
              checked={eSignConsent}
              required
              onChange={(event) => onESignConsentChange(event.target.checked)}
              className="gq-checkbox-input"
            />
            <span className="leading-6">
              I agree that typing my legal name below acts as my electronic signature and acknowledgment of this agreement.
            </span>
          </label>
        </div>
      </div>

      <div className="gq-form-section">
        <SectionHeader number={7} label="Signature" description="Type your legal name exactly as entered above." />

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <FormField id="legalSignature" label="Type Legal Name as Signature" required>
            <Input
              id="legalSignature"
              name="legalSignature"
              required
              value={formData.legalSignature}
              onChange={onChange}
              className={cn('gq-input', signatureMismatch && 'border-amber-500/50')}
              autoComplete="name"
            />
          </FormField>
          <FormField id="signatureInitials" label="Initials" required hint="Added to the email record.">
            <Input
              id="signatureInitials"
              name="signatureInitials"
              required
              value={formData.signatureInitials}
              onChange={onChange}
              className="gq-input"
            />
          </FormField>
        </div>

        {signatureMismatch ? (
          <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs uppercase tracking-[0.12em] text-amber-300">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Typed legal signature must match the real name field exactly.
          </div>
        ) : null}
      </div>
    </>
  );
};
