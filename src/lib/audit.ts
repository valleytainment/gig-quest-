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
