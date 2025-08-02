import { v2 as cloudinary } from "cloudinary";

interface UploadResult {
  public_id: string;
  secure_url: string;
}

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string
): Promise<UploadResult> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true, // Use HTTPS
  });

  console.log(process.env.CLOUDINARY_CLOUD_NAME);

  return new Promise<UploadResult>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Upload failed"));
        }

        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
        });
      }
    );

    stream.end(fileBuffer);
  });
};
