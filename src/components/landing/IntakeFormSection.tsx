/** 🟧 UI │ IntakeFormSection — Numbered glass form section wrapper. */
import type { ReactNode } from 'react';
import { SectionHeader } from '../ui/SectionHeader';

type IntakeFormSectionProps = {
  number: number;
  label: string;
  description?: string;
  children: ReactNode;
};

export const IntakeFormSection = ({ number, label, description, children }: IntakeFormSectionProps) => (
  <div className="gq-form-section">
    <SectionHeader number={number} label={label} description={description} />
    <div className="mt-4">{children}</div>
  </div>
);
