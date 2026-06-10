/** Foundation UI primitives smoke tests — Phase 12A visual system. */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ActionButton } from '../src/components/ui/ActionButton';
import { GlassPanel } from '../src/components/ui/GlassPanel';
import { GlowCard } from '../src/components/ui/GlowCard';
import { SectionHeader } from '../src/components/ui/SectionHeader';
import { StatusPill } from '../src/components/ui/StatusPill';
import { TrustBadge } from '../src/components/ui/TrustBadge';
import { SuccessState } from '../src/components/feedback/SuccessState';

describe('Phase 12A foundation primitives', () => {
  it('renders action button variants and states', () => {
    render(<ActionButton loading>Submit Registration</ActionButton>);
    expect(screen.getByRole('button', { name: /submit registration/i })).toBeDisabled();
  });

  it('renders status pill labels', () => {
    render(<StatusPill status="waitlisted" />);
    expect(screen.getByText('Waitlisted')).toBeInTheDocument();
  });

  it('renders section header with number', () => {
    render(<SectionHeader number={2} label="Contact Info" />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Contact Info')).toBeInTheDocument();
  });

  it('renders trust badge and glass/glow surfaces', () => {
    render(
      <>
        <TrustBadge dot>Email fallback</TrustBadge>
        <GlassPanel>Glass content</GlassPanel>
        <GlowCard>Gold card</GlowCard>
      </>
    );
    expect(screen.getByText('Email fallback')).toBeInTheDocument();
    expect(screen.getByText('Glass content')).toBeInTheDocument();
    expect(screen.getByText('Gold card')).toBeInTheDocument();
  });

  it('renders success state shell', () => {
    render(
      <SuccessState
        title="Your registration is ready to send"
        checklist={['Waiver reviewed', 'Email draft prepared']}
      />
    );
    expect(screen.getByRole('heading', { name: /your registration is ready to send/i })).toBeInTheDocument();
    expect(screen.getByText('Waiver reviewed')).toBeInTheDocument();
  });
});
