import { Request, Response } from "express";

/**
 * Handle file upload
 */
export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  return res.status(200).json({
    message: "File uploaded successfully",
    file: {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    },
  });
};