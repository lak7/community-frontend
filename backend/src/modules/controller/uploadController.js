import { uploadToCloudinary } from '../utils/fileUpload.js';

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No image file provided'
            });
        }

        const result = await uploadToCloudinary(req.file.buffer);

        res.json({
            success: true,
            url: result.secure_url,
            publicId: result.public_id
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Image upload failed',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};