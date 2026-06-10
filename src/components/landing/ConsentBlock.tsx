/** 🟧 UI │ components/landing/ConsentBlock.tsx — Age + e-sign consent fields. @see README.md */
import type { ChangeEvent } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import type { LandingFormData } from '../../types/applications';

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
    <div className="gq-form-section">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-[#f2d06b]" />
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Signature</p>
      </div>
      <p className="mt-2 text-sm text-zinc-400">Almost done — confirm age and sign with your legal name.</p>

      <div className="mt-4 space-y-4">
        <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
          <input
            type="checkbox"
            checked={ageConfirmed}
            required
            onChange={(event) => onAgeConfirmedChange(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/20 accent-[#d4af37]"
          />
          <span className="leading-6">
            I confirm that I am at least 18 years old, or I have legal guardian consent to participate.
          </span>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="guardianName" className="mb-2 text-zinc-200">Guardian Name if Needed</Label>
            <Input id="guardianName" name="guardianName" value={formData.guardianName} onChange={onChange} className="gq-input" />
          </div>
          <div>
            <Label htmlFor="guardianPhone" className="mb-2 text-zinc-200">Guardian Phone if Needed</Label>
            <Input id="guardianPhone" name="guardianPhone" type="tel" value={formData.guardianPhone} onChange={onChange} className="gq-input" />
          </div>
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
          <input
            type="checkbox"
            checked={eSignConsent}
            required
            onChange={(event) => onESignConsentChange(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/20 accent-[#d4af37]"
          />
          <span className="leading-6">
            I agree that typing my legal name below acts as my electronic signature and acknowledgment of this agreement.
          </span>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="legalSignature" className="mb-2 text-zinc-200">Type Legal Name as Signature</Label>
            <Input id="legalSignature" name="legalSignature" required value={formData.legalSignature} onChange={onChange} className="gq-input" />
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-zinc-400">
              Type your legal name exactly as entered above.
            </p>
          </div>
          <div>
            <Label htmlFor="signatureInitials" className="mb-2 text-zinc-200">Initials</Label>
            <Input id="signatureInitials" name="signatureInitials" required value={formData.signatureInitials} onChange={onChange} className="gq-input" />
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-zinc-400">Added to the email record.</p>
          </div>
        </div>

        {signatureMismatch ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs uppercase tracking-[0.14em] text-amber-300">
            Typed legal signature must match the real name field exactly.
          </div>
        ) : null}
      </div>
    </div>
  );
};
