/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟪 MODULE │ gig-quest/src/contexts/AuthContext.tsx
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          STATE
 * @responsibility Firebase auth session, user profile, isAdmin from adminRoles
 * @depends-on     lib/firebase.ts
 * @consumers      App.tsx, AdminDashboard, ArtistDashboard, Layout, Login
 * @safe-mode      isAdmin is UX hint only — firestore.rules enforces authorization
 *
 * STRUCTURAL INTENT
 * Single auth provider. Admin = adminRoles/{uid} exists (legacy users.role fallback in rules).
 * Creates users/{uid} on first sign-in with artist role defaults.
 * Profile write failures must not block Google auth session.
 *
 * @see docs/SECURITY_PLAN.md
 * @see docs/SYSTEM_MAP.md#auth--admin-model
 * ═══════════════════════════════════════════════════════════════════════════════
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, OperationType } from '../lib/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'artist' | 'admin';
  xp: number;
  level: number;
  createdAt: any;
  waiverCompleted?: boolean;
  waiverVersionId?: string;
  stageName?: string;
  city?: string;
  bio?: string;
  phone?: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  refreshProfile: async () => undefined,
});

export const useAuth = () => useContext(AuthContext);

function buildLocalProfile(currentUser: FirebaseUser, overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    uid: currentUser.uid,
    email: currentUser.email || '',
    displayName: currentUser.displayName || 'New Artist',
    photoURL: currentUser.photoURL || '',
    role: 'artist',
    xp: 0,
    level: 1,
    createdAt: null,
    waiverCompleted: false,
    ...overrides,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAdminRole, setHasAdminRole] = useState(false);

  const loadProfile = async (currentUser: FirebaseUser) => {
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      try {
        const adminRoleDoc = await getDoc(doc(db, 'adminRoles', currentUser.uid));
        setHasAdminRole(adminRoleDoc.exists());
      } catch {
        setHasAdminRole(false);
      }

      if (userDoc.exists()) {
        setProfile(userDoc.data() as UserProfile);
        return;
      }

      const newProfile: Partial<UserProfile> = {
        uid: currentUser.uid,
        email: currentUser.email || '',
        displayName: currentUser.displayName || 'New Artist',
        role: 'artist',
        xp: 0,
        level: 1,
        waiverCompleted: false,
        createdAt: serverTimestamp(),
      };
      if (currentUser.photoURL) {
        newProfile.photoURL = currentUser.photoURL;
      }

      await setDoc(userDocRef, newProfile);
      setProfile(buildLocalProfile(currentUser, { waiverCompleted: false }));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const firestoreNotReady =
        /SERVICE_DISABLED|PERMISSION_DENIED|not been used|Cloud Firestore API/i.test(message);
      console[firestoreNotReady ? 'warn' : 'error'](
        firestoreNotReady
          ? 'Firestore not ready yet — signed in locally. Enable Firestore API + create the default database, then refresh.'
          : 'Firestore error',
        {
          operationType: OperationType.GET,
          path: `users/${currentUser.uid}`,
          message,
        }
      );
      // Auth still works without Firestore — keep session usable.
      setHasAdminRole(false);
      setProfile(buildLocalProfile(currentUser));
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    await loadProfile(user);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await loadProfile(currentUser);
      } else {
        setProfile(null);
        setHasAdminRole(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin: profile?.role === 'admin' || hasAdminRole,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
