import { Router } from "express";
import { upload } from "../middleware/upload";
import { uploadFile } from "../controllers/uploadController";
import { authenticate } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorizeRoles";
import { Role } from "../types/roles";

const router = Router();

/**
 * @openapi
 * /upload:
 *   post:
 *     summary: Upload a file to Firebase Storage
 *     description: |
 *       Allows authenticated users to upload a file. 
 *       The file is stored in Firebase Storage and its metadata is saved in Firestore.
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
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (PNG, JPG, etc.)
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
 *                   example: File uploaded to Firebase successfully
 *                 id:
 *                   type: string
 *                   example: abc123xyz
 *                 url:
 *                   type: string
 *                   example: https://storage.googleapis.com/your-bucket/gallery/example.png
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Upload failed
 */
router.post(
  "/",
  authenticate,
  authorizeRoles(
    Role.Master,
    Role.InnerCircle,
    Role.Primarch
  ),
  upload.single("file"),
  uploadFile
);

export default router;