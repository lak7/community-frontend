import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { uploadImage } from '../controller/uploadController.js';

const uploadRouting = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

uploadRouting.post(
    '/image', protect, upload.single('image'), uploadImage,
);

export default uploadRouting;