import multer from "multer";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import fs from "fs-extra";

dotenv.config();

// Determine storage type (local or cloud)
const storageType = process.env.STORAGE_TYPE || "local";

// Configure Multer
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory before processing
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!")  as unknown as null, false);
    }
    cb(null, true);
  },
});

// Corrected: Use `cloudinary.v2.config`
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define local storage directory
const localUploadDir = path.join(__dirname, "..", "..", process.env.UPLOADS_FOLDER || "uploads");
fs.ensureDirSync(localUploadDir); // Ensure directory exists

export { upload, cloudinary, storageType, localUploadDir };
