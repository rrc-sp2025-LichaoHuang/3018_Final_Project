
import { File } from "../models/fileModel";

let files: File[] = [];

/**
 * GET all files
 * @returns Array of all files
 */
export const getAllFiles = (): File[] => {
  return files;
};

/**
 * GET a file by ID
 * @param id - File ID
 * @returns File object or undefined if not found
 */
export const getFileById = (id: string): File | undefined => {
  return files.find(file => file.id === id);
};

/**
 * CREATE a new file
 * Automatically generates:
 * - id
 * - createdAt
 * - updatedAt
 * 
 * @param data - File data without id and timestamps
 * @returns Newly created file
 */
export const createFile = (
  data: Omit<File, "id" | "createdAt" | "updatedAt">
): File => {
  const newFile: File = {
    id: `file_${Date.now()}`, // simple unique ID
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  files.push(newFile);
  return newFile;
};

/**
 * UPDATE an existing file
 * @param id - File ID
 * @param data - Partial fields to update
 * @returns Updated file or null if not found
 */
export const updateFile = (
  id: string,
  data: Partial<File>
): File | null => {
  const index = files.findIndex(file => file.id === id);

  // If file does not exist
  if (index === -1) return null;

  // Merge existing data with new data
  files[index] = {
    ...files[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return files[index];
};

/**
 * DELETE a file
 * @param id - File ID
 * @returns true if deleted, false if not found
 */
export const deleteFile = (id: string): boolean => {
  const index = files.findIndex(file => file.id === id);

  if (index === -1) return false;

  files.splice(index, 1);
  return true;
};