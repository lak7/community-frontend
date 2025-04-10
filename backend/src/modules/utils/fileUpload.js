import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Validate that Cloudinary is properly configured
const validateCloudinaryConfig = () => {
  const { cloud_name, api_key, api_secret } = cloudinary.config();
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      "Missing Cloudinary configuration. Please check your environment variables."
    );
  }
};

/**
 * Upload a buffer to Cloudinary
 * @param {Buffer} buffer - The file buffer to upload
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadToCloudinary = async (buffer) => {
  // Validate configuration before attempting upload
  validateCloudinaryConfig();

  if (!buffer || buffer.length === 0) {
    throw new Error("Invalid file buffer provided");
  }

  return new Promise((resolve, reject) => {
    // Set a timeout for the upload
    const uploadTimeout = setTimeout(() => {
      reject(new Error("Upload timeout after 30 seconds"));
    }, 30000); // 30 second timeout

    const uploadOptions = {
      folder: "task-submissions",
      resource_type: "auto",
      timeout: 25000, // Cloudinary timeout
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        clearTimeout(uploadTimeout); // Clear the timeout

        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(
            new Error(
              `Cloudinary upload failed: ${error.message || "Unknown error"}`
            )
          );
        } else if (!result || !result.secure_url) {
          reject(new Error("Invalid response from Cloudinary"));
        } else {
          resolve(result);
        }
      }
    );

    // Stream the buffer to Cloudinary
    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    bufferStream.on("error", (error) => {
      clearTimeout(uploadTimeout);
      reject(new Error(`Stream error: ${error.message}`));
    });

    bufferStream.pipe(uploadStream);
  });
};

export { uploadToCloudinary };
