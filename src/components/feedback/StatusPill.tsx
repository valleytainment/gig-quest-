/** 🟧 UI │ feedback/StatusPill.tsx — Application/status badge for admin & artist views. */
import type { ApplicationStatus } from '../../types/applications';

const STYLES: Record<string, string> = {
  new: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
  reviewing: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  approved: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  waitlisted: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
  rejected: 'border-red-500/30 bg-red-500/10 text-red-300',
  checked_in: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  completed: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  no_show: 'border-zinc-500/30 bg-zinc-500/10 text-zinc-400',
};

const LABELS: Record<string, string> = {
  new: 'New',
  reviewing: 'Pending Review',
  approved: 'Approved',
  waitlisted: 'Waitlisted',
  rejected: 'Rejected',
  checked_in: 'Checked In',
  completed: 'Completed',
  no_show: 'No Show',
};

type StatusPillProps = {
  status: ApplicationStatus | string;
  className?: string;
};

export const StatusPill = ({ status, className = '' }: StatusPillProps) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
      STYLES[status] ?? STYLES.new
    } ${className}`}
  >
    {LABELS[status] ?? status}
  </span>
);
