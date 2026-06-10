/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟫 OPS │ scripts/launch/diagnose-firestore.mjs
 * @responsibility Probe Firestore API; detect CONSUMER_INVALID
 * @usage npm run launch:diagnose
 * ═══════════════════════════════════════════════════════════════════════════════
 */
import firebaseConfig from '../../firebase-applet-config.json' with { type: 'json' };

const { projectId, firestoreDatabaseId, apiKey } = firebaseConfig;
const url =
  `https://firestore.googleapis.com/v1/projects/${projectId}` +
  `/databases/${firestoreDatabaseId}/documents/waiverVersions?pageSize=1&key=${apiKey}`;

console.log(`Project:  ${projectId}`);
console.log(`Database: ${firestoreDatabaseId}`);
console.log('');

const response = await fetch(url, { headers: { Referer: 'http://localhost:3000/' } });
const body = await response.json();

if (response.ok) {
  console.log('OK: Firestore API reachable. If writes fail, publish firestore.rules in Console.');
  process.exit(0);
}

const reason = body?.error?.details?.find((d) => d.reason)?.reason ?? 'UNKNOWN';
const message = body?.error?.message ?? 'Unknown error';

console.log(`FAIL (${response.status}): ${message}`);
console.log(`Reason: ${reason}`);
console.log('');

if (reason === 'CONSUMER_INVALID') {
  console.log('Fix (in order):');
  console.log('  1. Enable API: https://console.cloud.google.com/apis/library/firestore.googleapis.com?project=' + projectId);
  console.log('  2. Firebase Console → Firestore → confirm database exists');
  console.log('  3. npm run launch:open-console → paste firestore.rules → Publish');
  console.log('  4. npm run launch:test-rules');
  console.log('');
  console.log('If this AI Studio project cannot enable billing/API:');
  console.log('  npm run launch:open-new-project');
  process.exit(2);
}

if (reason === 'API_KEY_INVALID' || message.includes('API key')) {
  console.log('Fix: regenerate web API key in Firebase Project settings → update firebase-applet-config.json');
  process.exit(3);
}

console.log('Fix: npm run launch:open-console and complete INTAKE_ENABLE_RUNBOOK.md gates');
process.exit(1);
