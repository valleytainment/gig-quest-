/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟩 MODULE │ gig-quest/src/lib/audit.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          DOMAIN
 * @responsibility Append-only audit log writes to auditLogs collection
 * @depends-on     firebase.ts
 * @consumers      AdminDashboard (application status changes)
 * @safe-mode      N/A — admin-only writes per firestore.rules
 *
 * STRUCTURAL INTENT
 * Thin wrapper for admin action auditing. No reads; admin UI queries separately.
 *
 * @see docs/DATA_MODEL.md
 * ═══════════════════════════════════════════════════════════════════════════════
 */
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export type AuditEntityType = 'event' | 'application' | 'artist' | 'message' | 'waiver';

export async function logAuditAction(params: {
  actorId: string;
  action: string;
  entityType: AuditEntityType;
  entityId: string;
  before?: unknown;
  after?: unknown;
}) {
  await addDoc(collection(db, 'auditLogs'), {
    ...params,
    createdAt: serverTimestamp(),
  });
}
