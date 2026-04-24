/**
 * Firebase Admin SDK initialization module
 *
 * This module handles the initialization of Firebase Admin SDK for server-side
 * operations. It sets up authentication, Firestore database, and Storage connections.
 */

import {
  initializeApp,
  cert,
  getApps,
  App,
  AppOptions,
  ServiceAccount,
} from "firebase-admin/app";

import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import { getStorage, Storage } from "firebase-admin/storage";

/**
 * Retrieves Firebase configuration from environment variables
 *
 * @returns {AppOptions} Firebase application configuration object
 * @throws {Error} If any required environment variables are missing
 */
const getFirebaseConfig = (): AppOptions => {
  const {
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
  } = process.env;

  if (
    !FIREBASE_PROJECT_ID ||
    !FIREBASE_CLIENT_EMAIL ||
    !FIREBASE_PRIVATE_KEY
  ) {
    throw new Error(
      "Missing Firebase configuration. Please check your environment variables."
    );
  }

  const serviceAccount: ServiceAccount = {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };

  return {
    credential: cert(serviceAccount),

    // ⭐ 你自己的 storage bucket
    storageBucket: "final-project-59898.firebasestorage.app",
  };
};

/**
 * Initializes Firebase Admin SDK if not already initialized
 *
 * Ensures only one instance is created (singleton pattern)
 */
const initializeFirebaseAdmin = (): App => {
  const existingApp: App = getApps()[0];

  if (existingApp) {
    return existingApp;
  }

  return initializeApp(getFirebaseConfig());
};

// Initialize app
const app: App = initializeFirebaseAdmin();

// Services
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
const storage: Storage = getStorage(app);

// Export services
export { db, auth, storage };