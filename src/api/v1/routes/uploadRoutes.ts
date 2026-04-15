import { Router } from "express";
import { upload } from "../middleware/upload";
import { uploadFile } from "../controllers/uploadController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

/**
 * POST /api/v1/upload
 * Upload a file (image/pdf)
 */
router.post(
  "/",
  authenticate,
  upload.single("file"), // field name = file
  uploadFile
);

export default router;