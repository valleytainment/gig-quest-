/**
 * Apply Firebase web config from a JSON file to repo config files.
 *
 * Usage:
 *   npm run launch:apply-config -- ./my-firebase-config.json
 *
 * Input JSON must include standard web SDK fields plus firestoreDatabaseId (use "(default)" for new projects).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: npm run launch:apply-config -- <path-to-config.json>');
  process.exit(1);
}

const raw = JSON.parse(readFileSync(resolve(inputPath), 'utf8'));
const required = [
  'projectId',
  'appId',
  'apiKey',
  'authDomain',
  'storageBucket',
  'messagingSenderId',
  'firestoreDatabaseId',
];

for (const key of required) {
  if (!raw[key] || typeof raw[key] !== 'string') {
    console.error(`Missing or invalid field: ${key}`);
    process.exit(1);
  }
}

const appletConfig = {
  projectId: raw.projectId,
  appId: raw.appId,
  apiKey: raw.apiKey,
  authDomain: raw.authDomain,
  firestoreDatabaseId: raw.firestoreDatabaseId,
  storageBucket: raw.storageBucket,
  messagingSenderId: raw.messagingSenderId,
  measurementId: raw.measurementId ?? '',
};

const repoRoot = resolve(import.meta.dirname, '../..');
writeFileSync(
  resolve(repoRoot, 'firebase-applet-config.json'),
  `${JSON.stringify(appletConfig, null, 2)}\n`,
);
writeFileSync(
  resolve(repoRoot, '.firebaserc'),
  `${JSON.stringify({ projects: { default: raw.projectId } }, null, 2)}\n`,
);
writeFileSync(
  resolve(repoRoot, 'firebase.json'),
  `${JSON.stringify({ firestore: { rules: 'firestore.rules', database: raw.firestoreDatabaseId } }, null, 2)}\n`,
);

console.log(`Updated firebase-applet-config.json for project: ${raw.projectId}`);
console.log(`Database: ${raw.firestoreDatabaseId}`);
console.log('Next: npm run launch:diagnose');
