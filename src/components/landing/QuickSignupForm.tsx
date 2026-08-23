/** 🟧 UI │ QuickSignupForm — Fast contact signup before waiver step. */
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../ui/input';
import { ActionButton } from '../ui/ActionButton';
import { IntakeFormSection } from './IntakeFormSection';
import { FormField } from './FormField';
import type { LandingFormData } from '../../types/applications';

type QuickSignupFormProps = {
  formData: LandingFormData;
  submitting?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const QuickSignupForm = ({
  formData,
  submitting = false,
  onChange,
  onSubmit,
}: QuickSignupFormProps) => (
  <form className="gq-form-reveal space-y-4 pb-[calc(7.5rem+env(safe-area-inset-bottom))] md:pb-4" onSubmit={onSubmit}>
    <div className="rounded-2xl border border-[#f2d06b]/25 bg-[#f2d06b]/8 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f2d06b]">Fast signup</p>
      <p className="mt-1 text-sm leading-5 text-zinc-300">
        Create your free signup in under a minute. You will complete the participation agreement next before acceptance.
      </p>
    </div>

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

      <IntakeFormSection number={2} label="Contact" description="How we reach you about opportunities.">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField id="email" label="Email" required>
            <Input id="email" name="email" type="email" required value={formData.email} onChange={onChange} className="gq-input" autoComplete="email" />
          </FormField>
          <FormField id="phone" label="Phone Number" required>
            <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={onChange} className="gq-input" autoComplete="tel" />
          </FormField>
        </div>
      </IntakeFormSection>

      <IntakeFormSection number={3} label="Optional Details" description="Add these now or finish them with the agreement.">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField id="city" label="City">
            <Input id="city" name="city" value={formData.city} onChange={onChange} className="gq-input" autoComplete="address-level2" />
          </FormField>
          <FormField id="performanceType" label="Artist Type" hint="Singer, rapper, DJ, band, etc.">
            <Input id="performanceType" name="performanceType" placeholder="Singer, rapper, DJ..." value={formData.performanceType} onChange={onChange} className="gq-input" />
          </FormField>
        </div>
      </IntakeFormSection>
    </div>

    <p className="text-xs leading-5 text-zinc-500">
      Signing up is free and does not guarantee a stage spot. Acceptance requires completing the{' '}
      <Link to="/legal/waiver" className="text-[#f2d06b] underline-offset-2 hover:underline">
        Participation Agreement
      </Link>
      .
    </p>

    <div className="gq-sticky-submit md:static md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
      <ActionButton type="submit" fullWidth loading={submitting} className="min-h-[48px]">
        Create Free Signup
      </ActionButton>
    </div>
  </form>
);
