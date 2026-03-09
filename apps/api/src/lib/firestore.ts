import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({
    credential: cert('service-account.json'),
  });
}

export const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });