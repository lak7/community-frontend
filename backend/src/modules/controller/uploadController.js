import { uploadToCloudinary } from "../utils/fileUpload.js";

export const uploadImage = async (req, res) => {
  try {
    // Check if request has a file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No image file provided",
      });
    }

    console.log("File received:", {
      mimetype: req.file.mimetype,
      size: req.file.size,
      originalname: req.file.originalname,
    });

    // Call the Cloudinary upload function
    const result = await uploadToCloudinary(req.file.buffer);

    console.log("Upload successful:", result.secure_url);

    // Return success response
    return res.status(200).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error details:", error);

    // Send detailed error response
    return res.status(500).json({
      success: false,
      error: "Image upload failed",
      message: error.message || "Unknown error occurred",
      details:
        process.env.NODE_ENV === "development" ? error.toString() : undefined,
    });
  }
};
