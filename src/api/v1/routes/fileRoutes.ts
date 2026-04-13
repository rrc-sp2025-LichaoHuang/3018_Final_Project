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
import { Role } from "../types/roles";

const router = Router();

/**
 * Dark Angels RBAC Rules:
 *
 * Brother
 * Master
 * Inner Circle
 * Primarch
 */

/**
 * GET all files
 * GET /api/v1/files
 */
router.get(
  "/",
  authenticate,
  authorizeRoles(
    Role.Brother,
    Role.Master,
    Role.InnerCircle,
    Role.Primarch
  ),
  getAllFiles
);

/**
 * GET file by ID
 * GET /api/v1/files/:id
 */
router.get(
  "/:id",
  authenticate,
  authorizeRoles(
    Role.Brother,
    Role.Master,
    Role.InnerCircle,
    Role.Primarch
  ),
  getFileById
);

/**
 * CREATE file
 * POST /api/v1/files
 */
router.post(
  "/",
  authenticate,
  authorizeRoles(Role.Master, Role.InnerCircle, Role.Primarch),
  createFile
);

/**
 * UPDATE file
 * PUT /api/v1/files/:id
 */
router.put(
  "/:id",
  authenticate,
  authorizeRoles(Role.InnerCircle, Role.Primarch),
  updateFile
);

/**
 * DELETE file
 * DELETE /api/v1/files/:id
 */
router.delete(
  "/:id",
  authenticate,
  authorizeRoles(Role.Primarch),
  deleteFile
);

export default router;