/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟩 MODULE │ gig-quest/src/lib/xp.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          DOMAIN
 * @responsibility XP award constants and level calculation (read-only client use)
 * @depends-on     None
 * @consumers      Display only — client writes blocked by firestore.rules
 * @safe-mode      Do not call awardXp from artist flows; server-side awards planned Phase 18
 * ═══════════════════════════════════════════════════════════════════════════════
 */
// Client-side XP writes are deferred until server-side awards (Cloud Function / admin).
// Artists cannot update xp/level per Firestore rules.

export const XP_AWARDS = {
  complete_profile: 10,
  apply_to_event: 10,
  approved: 25,
  checked_in: 50,
  completed_performance: 100,
  no_show: -25,
} as const;

export type XpReason = keyof typeof XP_AWARDS;
