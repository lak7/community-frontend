import express from 'express';
import { upload, uploadToCloudinary } from '../utils/fileUpload.js';

const uploadRouting = express.Router();

uploadRouting.post('/image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) throw new Error('No image uploaded');

        const result = await uploadToCloudinary(req.file.buffer);
        res.json({ url: result.secure_url });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default uploadRouting;