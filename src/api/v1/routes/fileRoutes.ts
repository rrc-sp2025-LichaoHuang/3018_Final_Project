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
 * @swagger
 * tags:
 *   name: Files
 *   description: Dark Angels secret archive management
 */

/**
 * @swagger
 * /files:
 *   get:
 *     summary: Get all files
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved files
 *         content:
 *           application/json:
 *             example:
 *               - id: "123"
 *                 title: "Dark Angels File"
 *                 content: "Secret archive"
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
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: Get a file by ID
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File found
 *       404:
 *         description: File not found
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
 * @swagger
 * /files:
 *   post:
 *     summary: Create a new file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Dark Angels File
 *               content:
 *                 type: string
 *                 example: Secret archive
 *     responses:
 *       201:
 *         description: File created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  authenticate,
  authorizeRoles(Role.Master, Role.InnerCircle, Role.Primarch),
  createFile
);

/**
 * @swagger
 * /files/{id}:
 *   put:
 *     summary: Update a file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             title: Updated title
 *             content: Updated content
 *     responses:
 *       200:
 *         description: File updated
 *       404:
 *         description: File not found
 */
router.put(
  "/:id",
  authenticate,
  authorizeRoles(Role.InnerCircle, Role.Primarch),
  updateFile
);

/**
 * @swagger
 * /files/{id}:
 *   delete:
 *     summary: Delete a file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File deleted
 *       404:
 *         description: File not found
 */
router.delete(
  "/:id",
  authenticate,
  authorizeRoles(Role.Primarch),
  deleteFile
);

export default router;