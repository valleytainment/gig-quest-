/** Phase 12F — Motion and microinteraction smoke tests. */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ActionButton } from '../src/components/ui/ActionButton';
import { StatusPill } from '../src/components/ui/StatusPill';
import { SuccessState } from '../src/components/feedback/SuccessState';
import { PageSkeleton } from '../src/components/feedback/PageSkeleton';
import { EliteLoader } from '../src/components/feedback/EliteLoader';
import { TrustStrip } from '../src/components/landing/TrustStrip';

describe('Phase 12F motion utilities', () => {
  it('ActionButton applies tap-scale feedback class', () => {
    render(<ActionButton>Submit Registration</ActionButton>);
    expect(screen.getByRole('button', { name: /submit registration/i })).toHaveClass('gq-tap-scale');
  });

  it('StatusPill applies status-pop entrance class', () => {
    render(<StatusPill status="approved" />);
    expect(screen.getByText('Approved')).toHaveClass('gq-status-pop');
  });

  it('SuccessState staggers checklist items', () => {
    const { container } = render(
      <SuccessState
        title="Ready"
        checklist={['Waiver reviewed', 'Email draft prepared']}
      />
    );
    expect(container.querySelector('.gq-check-stagger')).toBeInTheDocument();
    expect(container.querySelector('.gq-scale-in')).toBeInTheDocument();
  });

  it('PageSkeleton uses staggered skeleton blocks', () => {
    const { container } = render(<PageSkeleton />);
    expect(container.querySelector('.gq-skeleton-stagger')).toBeInTheDocument();
    expect(container.querySelectorAll('.gq-skeleton').length).toBeGreaterThan(0);
  });

  it('EliteLoader uses branded spinner motion', () => {
    const { container } = render(<EliteLoader label="Checking access…" />);
    expect(container.querySelector('.gq-spinner')).toBeInTheDocument();
    expect(container.querySelector('.gq-fade-in')).toBeInTheDocument();
  });

  it('TrustStrip staggers trust chips', () => {
    const { container } = render(<TrustStrip />);
    expect(container.querySelector('.gq-stagger')).toBeInTheDocument();
  });
});
