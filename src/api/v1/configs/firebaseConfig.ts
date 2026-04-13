import {
  initializeApp,
  cert,
  getApps,
  App,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from "../../../../serviceAccountKey.json";

const initializeFirebaseAdmin = (): App => {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert(serviceAccount as any),
  });
};

const app = initializeFirebaseAdmin();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };