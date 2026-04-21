import { db } from "../configs/firebaseConfig";

/**
 * GET all files
 */
export const getAllFiles = async () => {
  const snapshot = await db.collection("files").get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * GET file by ID
 */
export const getFileById = async (id: string) => {
  const doc = await db.collection("files").doc(id).get();

  if (!doc.exists) return null;

  return {
    id: doc.id,
    ...doc.data(),
  };
};

/**
 * CREATE file
 */
export const createFile = async (data: any) => {
  const doc = await db.collection("files").add({
    ...data,
    createdAt: new Date(),
  });

  return {
    id: doc.id,
    ...data,
  };
};

/**
 * UPDATE file
 */
export const updateFile = async (id: string, data: any) => {
  const ref = db.collection("files").doc(id);
  const doc = await ref.get();

  if (!doc.exists) return null;

  await ref.update(data);

  return {
    id,
    ...data,
  };
};

/**
 * DELETE file
 */
export const deleteFile = async (id: string) => {
  const ref = db.collection("files").doc(id);
  const doc = await ref.get();

  if (!doc.exists) return false;

  await ref.delete();
  return true;
};