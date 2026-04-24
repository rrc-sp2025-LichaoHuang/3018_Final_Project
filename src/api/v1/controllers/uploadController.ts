import { Request, Response } from "express";
import { storage, db } from "../configs/firebaseConfig";
import fs from "fs";

/**
 * Handle file upload to Firebase
 */
export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const bucket = storage.bucket();
    const localPath = req.file.path;

    const fileName = `gallery/${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(fileName);

    await file.save(fs.readFileSync(localPath), {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    const doc = await db.collection("gallery").add({
      filename: req.file.originalname,
      storagePath: fileName,
      url: publicUrl,
      size: req.file.size,
      createdAt: new Date(),
    });

    fs.unlinkSync(localPath);

    return res.status(200).json({
      message: "File uploaded to Firebase successfully",
      id: doc.id,
      url: publicUrl,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Upload failed",
    });
  }
};