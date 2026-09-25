/** 🟫 OPS │ tests/landing.smoke.test.tsx — Vitest safe-mode landing smoke. */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { Landing } from '../src/pages/Landing';

function renderLanding() {
  return render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );
}

async function openRegistrationForm(user: ReturnType<typeof userEvent.setup>) {
  await user.click(
    screen.getByRole('button', { name: /sign up for performance opportunities/i })
  );
}

async function completeQuickSignup(user: ReturnType<typeof userEvent.setup>) {
  await openRegistrationForm(user);
  await user.type(screen.getByLabelText(/stage name/i), 'Stage Star');
  await user.type(screen.getByLabelText(/real name/i), 'Jane Artist');
  await user.type(screen.getByLabelText(/^email/i), 'jane@example.com');
  await user.type(screen.getByLabelText(/phone number/i), '555-0100');
  await user.click(screen.getByRole('button', { name: /create free signup/i }));
  expect(screen.getByText(/you are signed up/i)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /complete agreement now/i }));
}

function getWaiverAcceptCheckbox() {
  const label = screen.getByText(/I have viewed the waiver form/i).closest('label');
  expect(label).toBeTruthy();
  const checkbox = label!.querySelector('input[type="checkbox"]');
  expect(checkbox).toBeTruthy();
  return checkbox as HTMLInputElement;
}

async function viewWaiver(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /view waiver form/i }));
  expect(screen.getByText(/waiver viewed/i)).toBeInTheDocument();
  await user.keyboard('{Escape}');
}

describe('Landing page smoke tests', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      ...navigator,
      userAgent: 'vitest-smoke-test',
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads with hero and CTA visible', () => {
    renderLanding();

    expect(
      screen.getByRole('heading', {
        name: /apply once.*get reviewed/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up for performance opportunities/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument();
  });

  it('opens the quick signup form when CTA is clicked', async () => {
    const user = userEvent.setup();
    renderLanding();

    await openRegistrationForm(user);

    expect(screen.getByLabelText(/stage name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/real name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create free signup/i })).toBeInTheDocument();
  });

  it('reminds artists to complete the waiver after quick signup', async () => {
    const user = userEvent.setup();
    renderLanding();

    await openRegistrationForm(user);
    await user.type(screen.getByLabelText(/stage name/i), 'Stage Star');
    await user.type(screen.getByLabelText(/real name/i), 'Jane Artist');
    await user.type(screen.getByLabelText(/^email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '555-0100');
    await user.click(screen.getByRole('button', { name: /create free signup/i }));

    expect(screen.getByText(/stage star, you are signed up/i)).toBeInTheDocument();
    expect(screen.getByText(/waiver required for acceptance/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /complete agreement now/i })).toBeInTheDocument();
  });

  it('keeps waiver acceptance locked until the waiver is viewed', async () => {
    const user = userEvent.setup();
    renderLanding();

    await completeQuickSignup(user);

    const waiverCheckbox = getWaiverAcceptCheckbox();
    expect(waiverCheckbox).toBeDisabled();
    expect(screen.getByText(/view required/i)).toBeInTheDocument();
    expect(screen.getByText(/view the waiver first to unlock acceptance/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /view waiver form/i }));

    expect(screen.getByText(/waiver viewed/i)).toBeInTheDocument();
    expect(getWaiverAcceptCheckbox()).toBeEnabled();
  });

  it('keeps submit clickable and shows guidance when signature does not match', async () => {
    const user = userEvent.setup();
    renderLanding();

    await completeQuickSignup(user);

    await user.type(screen.getByLabelText(/emergency contact name/i), 'Contact One');
    await user.type(screen.getByLabelText(/emergency contact phone/i), '555-0101');
    await viewWaiver(user);

    await user.click(getWaiverAcceptCheckbox());

    await user.click(
      screen.getByRole('checkbox', {
        name: /I confirm that I am at least 18 years old/i,
      })
    );
    await user.click(
      screen.getByRole('checkbox', {
        name: /I agree that typing my legal name below acts as my electronic signature/i,
      })
    );

    await user.type(screen.getByLabelText(/type legal name as signature/i), 'Wrong Name');
    await user.type(screen.getByLabelText(/initials/i), 'WA');

    const submit = screen.getByRole('button', { name: /submit registration/i });
    expect(submit).toBeEnabled();
    await user.click(submit);

    expect(
      screen.getByText(/typed legal signature must match the real name field exactly/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/almost there — please match your typed signature to your real name/i)
    ).toBeInTheDocument();
  });

  it('shows mailto and Gmail fallback links after a valid submission', async () => {
    const user = userEvent.setup();
    const locationAssign = vi.fn();

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        ...window.location,
        href: 'http://localhost/',
        assign: locationAssign,
      },
    });

    Object.defineProperty(window.location, 'href', {
      configurable: true,
      set: locationAssign,
      get: () => 'http://localhost/',
    });

    renderLanding();
    await completeQuickSignup(user);

    await user.type(screen.getByLabelText(/emergency contact name/i), 'Contact One');
    await user.type(screen.getByLabelText(/emergency contact phone/i), '555-0101');
    await viewWaiver(user);

    await user.click(getWaiverAcceptCheckbox());
    await user.click(
      screen.getByRole('checkbox', {
        name: /I confirm that I am at least 18 years old/i,
      })
    );
    await user.click(
      screen.getByRole('checkbox', {
        name: /I agree that typing my legal name below acts as my electronic signature/i,
      })
    );
    await user.type(screen.getByLabelText(/type legal name as signature/i), 'Jane Artist');
    await user.type(screen.getByLabelText(/initials/i), 'JA');

    await user.click(screen.getByRole('button', { name: /submit registration/i }));

    expect(screen.getByRole('link', { name: /open email app/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^mailto:creativefreqllc@gmail\.com/)
    );
    expect(screen.getByRole('link', { name: /open in gmail/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^https:\/\/mail\.google\.com\/mail/)
    );
    await waitFor(() => {
      expect(locationAssign).toHaveBeenCalled();
    });
  });

  it('shows the free sign-up notice', () => {
    renderLanding();

    expect(
      screen.getByText(/sign-up is free\. some events may require a fee or ticket purchase/i)
    ).toBeInTheDocument();
  });

  it('shows trust strip, legal links, and portal sign-in', () => {
    renderLanding();

    expect(screen.getAllByText('Free signup').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Email fallback').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /view artist agreement/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /already have portal access\? sign in/i }).length).toBeGreaterThan(0);
  });
});
