<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/05fc7137-135e-48c8-a892-207e99d4e60a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Running Tests

**Prerequisites:** Node.js, dependencies installed via `npm install`

| Command | Purpose |
|---------|---------|
| `npm run typecheck` | TypeScript check without emit |
| `npm run test` | Vitest landing smoke tests |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:e2e` | Playwright mobile intake happy path |
| `npm run ci` | typecheck + test + build |

See [docs/LEGACY_SAFE_MODE.md](docs/LEGACY_SAFE_MODE.md) for the no-break rules that protect the live landing/intake flow.
