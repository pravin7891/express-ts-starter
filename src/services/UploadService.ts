import fs from "fs-extra";
import path from "path";
import { upload, cloudinary, storageType, localUploadDir } from "../config/fileUpload";
import streamifier from "streamifier";

class UploadService {
  /**
   * Uploads a file to either local storage or Cloudinary.
   * @param fileBuffer File buffer
   * @param originalName Original file name
   * @returns Uploaded file URL or local path
   */
  static async uploadFile(fileBuffer: Buffer, originalName: string, folderName?: string): Promise<string> {
    return storageType === "cloud"
      ? this.uploadToCloudinary(fileBuffer, folderName)
      : this.uploadToLocal(fileBuffer, originalName);
  }

  /**
   * Uploads file to local storage.
   * @param fileBuffer File buffer
   * @param originalName Original file name
   * @returns Local file path
   */
  private static async uploadToLocal(fileBuffer: Buffer, originalName: string): Promise<string> {
    const filePath = path.join(localUploadDir, `${Date.now()}-${originalName}`);
    await fs.writeFile(filePath, fileBuffer);
    return `/uploads/${path.basename(filePath)}`; // Return relative path for serving
  }

  /**
   * Uploads file to Cloudinary.
   * @param fileBuffer File buffer
   * @returns Cloudinary file URL
   */
  private static async uploadToCloudinary(fileBuffer: Buffer, folderName: string = "uploads"): Promise<string> {

        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: folderName },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result?.secure_url as string); // Ensure it's a string
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
      };
}

export default UploadService;