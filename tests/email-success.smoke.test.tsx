/** Phase 12D — Email success panel and fallback action smoke tests. */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { SuccessPanel } from '../src/components/landing/SuccessPanel';
import { INTAKE_RECIPIENT_EMAIL } from '../src/lib/submissions';

const draftLinks = {
  mailto: `mailto:${INTAKE_RECIPIENT_EMAIL}?subject=Test&body=Hello`,
  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${INTAKE_RECIPIENT_EMAIL}`,
  body: 'Artist registration draft body',
};

describe('Email success panel', () => {
  const writeText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    writeText.mockClear();
  });

  afterEach(() => {
    writeText.mockClear();
  });

  it('renders success copy and confirmation checklist', () => {
    render(<SuccessPanel draftLinks={draftLinks} />);

    expect(screen.getByText(/submission draft ready/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /your registration is ready to send/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/waiver reviewed/i)).toBeInTheDocument();
    expect(screen.getByText(/consent recorded/i)).toBeInTheDocument();
    expect(screen.getByText(/signature matched/i)).toBeInTheDocument();
    expect(screen.getByText(/email draft prepared/i)).toBeInTheDocument();
  });

  it('exposes mailto link to creativefreqllc@gmail.com', () => {
    render(<SuccessPanel draftLinks={draftLinks} />);

    expect(screen.getByRole('link', { name: /open email app/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^mailto:creativefreqllc@gmail\.com/)
    );
  });

  it('exposes Gmail fallback link', () => {
    render(<SuccessPanel draftLinks={draftLinks} />);

    expect(screen.getByRole('link', { name: /open in gmail/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^https:\/\/mail\.google\.com\/mail/)
    );
  });

  it('renders copy draft and copy recipient buttons', () => {
    render(<SuccessPanel draftLinks={draftLinks} />);

    expect(screen.getByRole('button', { name: /copy email draft/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy creative freq email/i })).toBeInTheDocument();
  });

  it('copies email draft when Copy Email Draft is clicked', async () => {
    const user = userEvent.setup();
    render(<SuccessPanel draftLinks={draftLinks} />);

    await user.click(screen.getByRole('button', { name: /copy email draft/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^copied$/i })).toBeInTheDocument();
    });
  });

  it('shows confirmation id when provided', () => {
    render(<SuccessPanel draftLinks={draftLinks} confirmationId="abc-123" />);

    expect(screen.getByText(/confirmation id: abc-123/i)).toBeInTheDocument();
  });
});
