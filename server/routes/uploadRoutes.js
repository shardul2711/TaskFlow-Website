import express from 'express';
import upload from '../middleware/multer.js';
import { uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
        data: null,
        error: 'Bad Request',
      });
    }

    const url = await uploadBufferToCloudinary(req.file.buffer, req.file.originalname);
    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: { url },
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
