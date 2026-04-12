/**
 * Routes Layer for File API
 * This defines all endpoints related to file operations.
 */

import { Router } from "express";
import * as controller from "../controllers/fileController";
import { validateRequest } from "../middleware/validateRequest";
import { createFileSchema, updateFileSchema, } from "../validation/fileSchemas";

const router = Router();

/**
 * GET /api/v1/files
 * Get all files
 */
router.get("/", controller.getAllFiles);

/**
 * GET /api/v1/files/:id
 * Get a file by ID
 */
router.get("/:id", controller.getFileById);

/**
 * POST /api/v1/files
 * Create a new file
 */
router.post(
  "/",
  validateRequest(createFileSchema),
  controller.createFile
);

/**
 * PUT /api/v1/files/:id
 * Update an existing file
 */
router.put(
  "/:id",
  validateRequest(updateFileSchema),
  controller.updateFile
);

/**
 * DELETE /api/v1/files/:id
 * Delete a file
 */
router.delete("/:id", controller.deleteFile);

export default router;