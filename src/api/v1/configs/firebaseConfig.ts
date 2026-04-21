import {
  initializeApp,
  cert,
  getApps,
  App,
} from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

import serviceAccount from "../../../../serviceAccountKey.json";

const initializeFirebaseAdmin = (): App => {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert(serviceAccount as any),

    storageBucket: "final-project-59898.firebasestorage.app",
  });
};

const app = initializeFirebaseAdmin();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };