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
 */
router.get(
  "/",
  authenticate,
  authorizeRoles(["Brother", "Master", "Inner Circle", "Primarch"]),
  getAllFiles
);

/**
 * GET file by ID
 */
router.get(
  "/:id",
  authenticate,
  authorizeRoles(["Brother", "Master", "Inner Circle", "Primarch"]),
  getFileById
);

/**
 * CREATE file
 */
router.post(
  "/",
  authenticate,
  authorizeRoles(["Master", "Inner Circle", "Primarch"]),
  createFile
);

/**
 * UPDATE file
 */
router.put(
  "/:id",
  authenticate,
  authorizeRoles(["Inner Circle", "Primarch"]),
  updateFile
);

/**
 * DELETE file
 */
router.delete(
  "/:id",
  authenticate,
  authorizeRoles(["Primarch"]),
  deleteFile
);

export default router;