import cloudinary from '../config/cloudinary.js';

export const uploadBufferToCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const ext = originalName.split('.').pop().toLowerCase();
    
    // Cloudinary treats non-image files (like PDF or DOCX) as 'raw' resource type
    let resourceType = 'auto';
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext)) {
      resourceType = 'raw';
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'taskflow_attachments',
        resource_type: resourceType,
        public_id: `${Date.now()}-${pathWithoutExtension(originalName)}`,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

// Helper to sanitize filename
function pathWithoutExtension(filename) {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}
