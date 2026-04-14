import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Mic2, ArrowRight, Star } from 'lucide-react';

export const Landing = () => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [draftLinks, setDraftLinks] = useState({ mailto: '', gmail: '' });
  const [formData, setFormData] = useState({
    stageName: '',
    realName: '',
    email: '',
    phone: '',
    city: '',
    performanceType: '',
    instagram: '',
    notes: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Artist Registration - ${formData.stageName || formData.realName || 'New Submission'}`;
    const body = [
      'New artist registration submission:',
      '',
      `Stage Name: ${formData.stageName}`,
      `Real Name: ${formData.realName}`,
      `Email: ${formData.email}`,
      `Phone Number: ${formData.phone}`,
      `City: ${formData.city || 'N/A'}`,
      `Artist Type: ${formData.performanceType || 'N/A'}`,
      `Instagram or Social Link: ${formData.instagram || 'N/A'}`,
      '',
      'Anything Else:',
      formData.notes || 'N/A',
    ].join('\n');

    const mailtoUrl = `mailto:creativefreqllc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('creativefreqllc@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftLinks({ mailto: mailtoUrl, gmail: gmailUrl });
    setSubmitted(true);

    // Try the default mail client first. If the browser/device has no handler configured,
    // the fallback buttons in the success state let the user open the draft manually.
    window.location.href = mailtoUrl;
  };

  return (
    <div className="elite-bg min-h-screen overflow-hidden px-4 py-8 text-white md:px-6 md:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#d4af37]/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#27456b]/25 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="elite-panel grid w-full overflow-hidden md:grid-cols-[1.1fr_0.9fr]">
          <section className="border-b border-white/10 px-6 py-10 md:border-b-0 md:border-r md:px-10 md:py-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#f2d06b]">
              <Star className="h-3.5 w-3.5" />
              Elite Plan First
            </div>

            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-[#d4af37] shadow-[0_0_45px_rgba(212,175,55,0.35)]">
              <Mic2 className="h-10 w-10 text-black" />
            </div>

            <h1 className="max-w-lg text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">
              Performance Opportunities For Serious Artists
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 md:text-lg">
              Keep this simple. Start with the elite plan, send your artist details, and we will review your registration for upcoming performance opportunities.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-400">
              <span className="rounded-full border border-white/10 px-3 py-1.5">Fast sign up</span>
              <span className="rounded-full border border-white/10 px-3 py-1.5">Artist-first intake</span>
              <span className="rounded-full border border-white/10 px-3 py-1.5">Direct follow-up</span>
            </div>
          </section>

          <section className="px-6 py-10 md:px-8 md:py-12">
            {!showForm && !submitted ? (
              <div className="flex h-full flex-col justify-center">
                <div className="elite-card-gold rounded-3xl p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-[#f2d06b]">
                    Artist Registration
                  </p>
                  <h2 className="mt-4 text-3xl font-bold text-white">
                    Sign up for performance opportunities
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    Tap once, fill out the basics, and submit your information for review.
                  </p>
                  <Button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="elite-btn-gold mt-6 h-12 w-full rounded-2xl text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    Sign Up For Performance Opportunities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : null}

            {showForm && !submitted ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="stageName" className="mb-2 text-zinc-200">Stage Name</Label>
                  <Input id="stageName" name="stageName" required value={formData.stageName} onChange={handleChange} className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                </div>

                <div>
                  <Label htmlFor="realName" className="mb-2 text-zinc-200">Real Name</Label>
                  <Input id="realName" name="realName" required value={formData.realName} onChange={handleChange} className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="email" className="mb-2 text-zinc-200">Email</Label>
                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="mb-2 text-zinc-200">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="city" className="mb-2 text-zinc-200">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                  </div>

                  <div>
                    <Label htmlFor="performanceType" className="mb-2 text-zinc-200">Artist Type</Label>
                    <Input id="performanceType" name="performanceType" placeholder="Singer, rapper, DJ..." value={formData.performanceType} onChange={handleChange} className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-500" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="instagram" className="mb-2 text-zinc-200">Instagram or Social Link</Label>
                  <Input id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white" />
                </div>

                <div>
                  <Label htmlFor="notes" className="mb-2 text-zinc-200">Anything Else</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20"
                    placeholder="Tell us anything important about your act."
                  />
                </div>

                <Button
                  type="submit"
                  className="elite-btn-gold h-12 w-full rounded-2xl text-sm font-bold uppercase tracking-[0.2em]"
                >
                  Submit Registration
                </Button>
              </form>
            ) : null}

            {submitted ? (
              <div className="flex h-full flex-col justify-center">
                <div className="elite-card-blue rounded-3xl p-8 text-center">
                  <p className="text-sm uppercase tracking-[0.35em] text-sky-300">
                    Submission Received
                  </p>
                  <h2 className="mt-4 text-3xl font-bold text-white">
                    We will reach out soon thank you
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">
                    Your artist registration draft is ready. If your email app did not open automatically, use one of the options below to send it to us.
                  </p>
                  <div className="mt-6 space-y-3">
                    <a
                      href={draftLinks.mailto}
                      className="elite-btn-gold flex h-12 w-full items-center justify-center rounded-2xl text-sm font-bold uppercase tracking-[0.2em]"
                    >
                      Open Email App
                    </a>
                    <a
                      href={draftLinks.gmail}
                      target="_blank"
                      rel="noreferrer"
                      className="elite-btn-blue flex h-12 w-full items-center justify-center rounded-2xl text-sm font-bold uppercase tracking-[0.2em]"
                    >
                      Open In Gmail
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
};
