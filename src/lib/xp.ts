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
