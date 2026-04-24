import { Request, Response } from "express";
import * as fileService from "../services/fileService";

/**
 * GET all files (with optional sorting)
 */
export const getAllFiles = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as string;

    let files;

    if (sort) {
      // with sort
      files = await fileService.getAllFilesSorted(sort);
    } else {
      // with out sort
      files = await fileService.getAllFiles();
    }

    res.json(files);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch files",
    });
  }
};

/**
 * GET file by ID
 */
export const getFileById = async (req: Request, res: Response) => {
  const file = await fileService.getFileById(req.params.id as string);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  res.json(file);
};

/**
 * CREATE file
 */
export const createFile = async (req: Request, res: Response) => {
  const file = await fileService.createFile(req.body);
  res.status(201).json(file);
};

/**
 * UPDATE file
 */
export const updateFile = async (req: Request, res: Response) => {
  const file = await fileService.updateFile(
    req.params.id as string,
    req.body
  );

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  res.json(file);
};

/**
 * DELETE file
 */
export const deleteFile = async (req: Request, res: Response) => {
  const success = await fileService.deleteFile(req.params.id as string);

  if (!success) {
    return res.status(404).json({ message: "File not found" });
  }

  res.json({ message: "Deleted successfully" });
};