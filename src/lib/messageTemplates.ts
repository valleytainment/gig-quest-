export type MessageTemplateId =
  | 'application_submitted'
  | 'application_approved'
  | 'application_waitlisted'
  | 'application_rejected'
  | 'event_reminder';

export const MESSAGE_TEMPLATES: Record<
  MessageTemplateId,
  { subject: string; body: (vars: Record<string, string>) => string }
> = {
  application_submitted: {
    subject: 'Gig Quest — Application Received',
    body: (v) =>
      `Hi ${v.stageName},\n\nWe received your Gig Quest application. Our team will review it and follow up soon.\n\n— Creative Freq`,
  },
  application_approved: {
    subject: 'Gig Quest — You Are Approved',
    body: (v) =>
      `Hi ${v.stageName},\n\nYou are approved for ${v.eventTitle}. Check your dashboard for check-in details.\n\n— Creative Freq`,
  },
  application_waitlisted: {
    subject: 'Gig Quest — Waitlist Update',
    body: (v) =>
      `Hi ${v.stageName},\n\nYou are on the waitlist for ${v.eventTitle}. We will notify you if a slot opens.\n\n— Creative Freq`,
  },
  application_rejected: {
    subject: 'Gig Quest — Application Update',
    body: (v) =>
      `Hi ${v.stageName},\n\nThank you for applying. We cannot offer a slot for ${v.eventTitle} this round, but we may reach out for future opportunities.\n\n— Creative Freq`,
  },
  event_reminder: {
    subject: 'Gig Quest — Event Reminder',
    body: (v) =>
      `Hi ${v.stageName},\n\nReminder: ${v.eventTitle} is coming up on ${v.eventDate} at ${v.eventLocation}.\n\n— Creative Freq`,
  },
};

export function renderTemplate(
  id: MessageTemplateId,
  vars: Record<string, string>
): { subject: string; body: string } {
  const template = MESSAGE_TEMPLATES[id];
  return { subject: template.subject, body: template.body(vars) };
}
