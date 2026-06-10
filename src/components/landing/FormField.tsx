/** 🟧 UI │ FormField — Labeled intake field with optional required marker. */
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Label } from '../ui/label';

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  hint?: string;
};

export const FormField = ({ id, label, required, children, className, hint }: FormFieldProps) => (
  <div className={cn('space-y-2', className)}>
    <Label htmlFor={id} className="mb-0 text-sm text-zinc-200">
      {label}
      {required ? <span className="ml-1 text-[#f2d06b]" aria-hidden>*</span> : null}
    </Label>
    {children}
    {hint ? <p className="text-xs leading-5 text-zinc-500">{hint}</p> : null}
  </div>
);
