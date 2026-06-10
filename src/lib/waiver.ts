/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟩 MODULE │ gig-quest/src/lib/waiver.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          DOMAIN
 * @responsibility Waiver version id, body hash, effective date constants
 * @depends-on     None (pure constants)
 * @consumers      submissions.ts, WaiverBlock, legal pages
 * @safe-mode      Hashes must match firestore.rules isValidConsent validation
 *
 * STRUCTURAL INTENT
 * Single source for waiver versioning until Phase 8 moves to waiverVersions collection.
 *
 * @see docs/DATA_MODEL.md
 * ═══════════════════════════════════════════════════════════════════════════════
 */
export const CURRENT_WAIVER_VERSION_ID = 'v1.0.0';

// Stable hash for the current in-app waiver text (Phase 8 will move to Firestore waiverVersions).
export const CURRENT_WAIVER_BODY_HASH = 'gq-waiver-v1-2026';

export const WAIVER_EFFECTIVE_DATE = '2026-06-01';
