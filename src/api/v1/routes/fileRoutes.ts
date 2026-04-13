import { Router } from "express";
import {
  getAllFiles,
  getFileById,
  createFile,
  updateFile,
  deleteFile,
} from "../controllers/fileController";

import { authenticate } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();


/**
 * GET all files
 * Roles: Brother, Master, Inner Circle, Primarch
 */
router.get(
  "/files",
  authenticate,
  authorizeRoles("Brother", "Master", "Inner Circle", "Primarch"),
  getAllFiles
);

/**
 * GET file by ID
 * Roles: Brother, Master, Inner Circle, Primarch
 */
router.get(
  "/files/:id",
  authenticate,
  authorizeRoles("Brother", "Master", "Inner Circle", "Primarch"),
  getFileById
);

/**
 * CREATE file
 * Roles: Master, Inner Circle, Primarch
 */
router.post(
  "/files",
  authenticate,
  authorizeRoles("Master", "Inner Circle", "Primarch"),
  createFile
);

/**
 * UPDATE file
 * Roles: Inner Circle, Primarch
 */
router.put(
  "/files/:id",
  authenticate,
  authorizeRoles("Inner Circle", "Primarch"),
  updateFile
);

/**
 * DELETE file
 * Roles: Primarch only
 */
router.delete(
  "/files/:id",
  authenticate,
  authorizeRoles("Primarch"),
  deleteFile
);

export default router;