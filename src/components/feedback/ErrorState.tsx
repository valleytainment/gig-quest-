import { CircleAlert } from 'lucide-react';

export const ErrorState = ({ message }: { message: string }) => (
  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
    <div className="flex items-start gap-2">
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  </div>
);
