/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟦 MODULE │ gig-quest/src/lib/firebase.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          INFRASTRUCTURE
 * @responsibility Firebase app init, Auth helpers, sanitized Firestore error handling
 * @depends-on     firebase-applet-config.json, firebase SDK
 * @consumers      AuthContext, submissions, audit, AdminDashboard, ArtistDashboard
 * @safe-mode      handleFirestoreError never exposes PII to users or verbose logs
 *
 * STRUCTURAL INTENT
 * Single IO boundary for Firebase client SDK. All Firestore errors flow through
 * handleFirestoreError with { operationType, path, message } logging only.
 *
 * @see docs/SYSTEM_MAP.md#environment--config
 * @see docs/CODEBASE_INDEX.md
 * ═══════════════════════════════════════════════════════════════════════════════
 */
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error signing in with Google', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out', error);
    throw error;
  }
};

/** User-facing auth errors — no internal Firebase codes dumped to UI. */
export function getAuthErrorMessage(error: unknown): string {
  const code =
    error && typeof error === 'object' && 'code' in error
      ? String((error as { code?: string }).code)
      : '';

  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Try again when you are ready.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in popup. Allow popups for this site and retry.';
    case 'auth/configuration-not-found':
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled yet for this project. Enable the Google provider in Firebase Authentication.';
    case 'auth/api-key-not-valid':
    case 'auth/invalid-api-key':
      return 'Firebase API key is invalid. Check firebase-applet-config.json.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for Google sign-in. Add it under Authentication → Settings → Authorized domains.';
    case 'auth/network-request-failed':
      return 'Network error during sign-in. Check your connection and try again.';
    default:
      return 'Sign in failed. Please try again.';
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

const GENERIC_FIRESTORE_ERROR = 'A database error occurred. Please try again.';

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Firestore error', { operationType, path, message });
  throw new Error(GENERIC_FIRESTORE_ERROR);
}
