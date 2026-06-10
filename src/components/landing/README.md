# `components/landing/` — Public Landing UI

> Layer: 🟧 UI | Orchestrator: [pages/Landing.tsx](../../pages/Landing.tsx)

| Component | Responsibility |
|-----------|----------------|
| `LandingHero.tsx` | Hero headline, CTA to open form |
| `TrustStrip.tsx` | Trust / social proof bar |
| `HowItWorks.tsx` | Step-by-step explainer |
| `FaqBlock.tsx` | FAQ section |
| `ArtistIntakeCard.tsx` | Card wrapper for intake section |
| `LandingIntakeForm.tsx` | Form fields, validation display |
| `WaiverBlock.tsx` | Waiver view gate + acceptance checkboxes |
| `WaiverDialogContent.tsx` | Full waiver modal body |
| `ConsentBlock.tsx` | Age + e-sign consent fields |
| `SuccessPanel.tsx` | Post-submit success state |
| `EmailFallbackActions.tsx` | mailto, Gmail, copy-email buttons |

**Rule:** Presentational only — no Firestore calls. State and submit live in `Landing.tsx`.
