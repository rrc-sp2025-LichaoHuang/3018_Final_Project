import { Router } from "express";
import { upload } from "../middleware/upload";
import { uploadFile } from "../controllers/uploadController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

/**
 * @openapi
 * /upload:
 *   post:
 *     summary: Upload a file
 *     description: Allows authenticated users to upload files with size and type restrictions.
 *     tags:
 *       - Upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 file:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                     path:
 *                       type: string
 *                     size:
 *                       type: number
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authenticate,
  upload.single("file"), // field name = file
  uploadFile
);

export default router;