/**
 * Probes whether production Firestore rules allow public applications create.
 * Safe: writes a single test doc with obvious test data (delete manually if needed).
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json' with { type: 'json' };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const testDoc = {
  source: 'public_landing',
  status: 'new',
  artistSnapshot: {
    stageName: 'Rules Probe',
    legalName: 'Rules Probe',
    email: 'rules.probe@gmail.com',
  },
  emergencyContact: { name: 'Probe Contact', phone: '555-0199' },
  consent: {
    waiverVersionId: 'v1.0.0',
    waiverBodyHash: 'gq-waiver-v1-2026',
    waiverViewed: true,
    waiverAccepted: true,
    ageConfirmed: true,
    eSignConsent: true,
    legalSignature: 'Rules Probe',
    initials: 'RP',
    acceptedAt: serverTimestamp(),
  },
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
};

const timeoutMs = 15_000;
const write = addDoc(collection(db, 'applications'), testDoc);
const timer = new Promise((_, reject) => {
  setTimeout(() => reject(new Error(`Timed out after ${timeoutMs}ms — rules likely not published`)), timeoutMs);
});

try {
  const ref = await Promise.race([write, timer]);
  console.log(`PASS: public applications create allowed. Test doc: applications/${ref.id}`);
  console.log('Delete this test doc in Firebase Console when done verifying.');
  process.exit(0);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('FAIL: public create blocked — publish firestore.rules in Console first.');
  console.error(message);
  process.exit(1);
}
