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
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};

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
