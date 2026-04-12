/**
 * Controller Layer for File API
 * This layer handles HTTP requests and responses.
 * It connects routes with the service layer.
 */

import { Request, Response } from "express";
import * as fileService from "../services/fileService";

/**
 * GET all files
 * Endpoint: GET /api/v1/files
 */
export const getAllFiles = (req: Request, res: Response) => {
  const files = fileService.getAllFiles();
  res.json(files);
};

/**
 * GET file by ID
 * Endpoint: GET /api/v1/files/:id
 */
export const getFileById = (req: Request, res: Response) => {
  const file = fileService.getFileById(req.params.id as string);

  // Handle not found case
  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  res.json(file);
};

/**
 * CREATE a new file
 * Endpoint: POST /api/v1/files
 */
export const createFile = (req: Request, res: Response) => {
  const file = fileService.createFile(req.body);

  res.status(201).json(file);
};

/**
 * UPDATE a file
 * Endpoint: PUT /api/v1/files/:id
 */
export const updateFile = (req: Request, res: Response) => {
  const file = fileService.updateFile(req.params.id as string, req.body);

  // Handle not found
  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  res.json(file);
};

/**
 * DELETE a file
 * Endpoint: DELETE /api/v1/files/:id
 */
export const deleteFile = (req: Request, res: Response) => {
  const success = fileService.deleteFile(req.params.id as string);

  // Handle not found
  if (!success) {
    return res.status(404).json({ message: "File not found" });
  }

  res.json({ message: "Deleted successfully" });
};