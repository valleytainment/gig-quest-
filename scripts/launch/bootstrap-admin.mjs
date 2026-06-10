/**
 * Bootstrap first admin via Firebase Admin SDK (bypasses security rules).
 *
 * Prerequisites:
 *   1. firebase login  (or GOOGLE_APPLICATION_CREDENTIALS set)
 *   2. ADMIN_UID env var set to your Firebase Auth UID
 *
 * Usage:
 *   ADMIN_UID=your-uid npm run launch:bootstrap-admin
 */
import admin from 'firebase-admin';
import firebaseConfig from '../../firebase-applet-config.json' with { type: 'json' };

const uid = process.env.ADMIN_UID;
if (!uid) {
  console.error('ERROR: Set ADMIN_UID to your Firebase Auth user id.');
  console.error('Find it in Firebase Console → Authentication → Users → User UID');
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: firebaseConfig.projectId,
  });
}

const db = admin.firestore();
db.settings({ databaseId: firebaseConfig.firestoreDatabaseId });

const ref = db.collection('adminRoles').doc(uid);
const existing = await ref.get();

if (existing.exists) {
  console.log(`adminRoles/${uid} already exists — skipping.`);
  process.exit(0);
}

await ref.set({
  role: 'owner',
  createdBy: 'manual-bootstrap',
  createdAt: admin.firestore.FieldValue.serverTimestamp(),
});

console.log(`Created adminRoles/${uid} with role=owner`);
