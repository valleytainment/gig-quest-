import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const XP_AWARDS = {
  complete_profile: 10,
  apply_to_event: 10,
  approved: 25,
  checked_in: 50,
  completed_performance: 100,
  no_show: -25,
} as const;

export type XpReason = keyof typeof XP_AWARDS;

export async function awardXp(uid: string, reason: XpReason) {
  const delta = XP_AWARDS[reason];
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return;

  const currentXp = (snap.data().xp as number) || 0;
  const currentLevel = (snap.data().level as number) || 1;
  const nextXp = Math.max(0, currentXp + delta);
  const nextLevel = Math.max(1, Math.floor(nextXp / 100) + 1);

  await updateDoc(userRef, { xp: nextXp, level: nextLevel });
}
