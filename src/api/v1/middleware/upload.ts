import multer from "multer";
import path from "path";

/**
 * Storage config (save locally)
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

/**
 * File filter (only images + pdf)
 */
const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;

  const isValid =
    allowedTypes.test(file.mimetype) &&
    allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDFs are allowed"));
  }
};

/**
 * Multer instance
 */
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
});