import { render, screen } from '@testing-library/react';
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
  });

  it('opens the registration form when CTA is clicked', async () => {
    const user = userEvent.setup();
    renderLanding();

    await openRegistrationForm(user);

    expect(screen.getByLabelText(/stage name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/real name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit registration/i })).toBeInTheDocument();
  });

  it('keeps waiver acceptance locked until the waiver is viewed', async () => {
    const user = userEvent.setup();
    renderLanding();

    await openRegistrationForm(user);

    const waiverCheckbox = getWaiverAcceptCheckbox();
    expect(waiverCheckbox).toBeDisabled();
    expect(screen.getByText(/view required/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /view waiver form/i }));

    expect(screen.getByText(/waiver viewed/i)).toBeInTheDocument();
    expect(getWaiverAcceptCheckbox()).toBeEnabled();
  });

  it('disables submit when legal signature does not match real name', async () => {
    const user = userEvent.setup();
    renderLanding();

    await openRegistrationForm(user);

    await user.type(screen.getByLabelText(/stage name/i), 'Stage Star');
    await user.type(screen.getByLabelText(/real name/i), 'Jane Artist');
    await user.type(screen.getByLabelText(/^email$/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '555-0100');
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

    expect(screen.getByRole('button', { name: /submit registration/i })).toBeDisabled();
    expect(
      screen.getByText(/typed legal signature must match the real name field exactly/i)
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
    await openRegistrationForm(user);

    await user.type(screen.getByLabelText(/stage name/i), 'Stage Star');
    await user.type(screen.getByLabelText(/real name/i), 'Jane Artist');
    await user.type(screen.getByLabelText(/^email$/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '555-0100');
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
    expect(locationAssign).toHaveBeenCalled();
  });

  it('shows the free sign-up notice', () => {
    renderLanding();

    expect(
      screen.getByText(/sign-up is free\. some events may require a fee or ticket purchase/i)
    ).toBeInTheDocument();
  });
});
