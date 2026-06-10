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
 *
 * @see docs/SECURITY_PLAN.md
 * @see docs/SYSTEM_MAP.md#auth--admin-model
 * ═══════════════════════════════════════════════════════════════════════════════
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'artist' | 'admin';
  xp: number;
  level: number;
  createdAt: any;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAdminRole, setHasAdminRole] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          const adminRoleDoc = await getDoc(doc(db, 'adminRoles', currentUser.uid));
          setHasAdminRole(adminRoleDoc.exists());
          
          if (userDoc.exists()) {
            setProfile(userDoc.data() as UserProfile);
          } else {
            // Create new user profile
            const newProfile: Partial<UserProfile> = {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'New Artist',
              photoURL: currentUser.photoURL || '',
              role: 'artist',
              xp: 0,
              level: 1,
              createdAt: serverTimestamp(),
            };
            
            await setDoc(userDocRef, newProfile);
            setProfile(newProfile as UserProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        }
      } else {
        setProfile(null);
        setHasAdminRole(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      isAdmin: profile?.role === 'admin' || hasAdminRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
