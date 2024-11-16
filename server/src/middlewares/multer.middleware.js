import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  // Define the destination folder
  destination: function (req, file, cb) {
    cb(null, 'public/temp'); // The folder where the files will be stored
  },
  // Define the filename structure
  filename: function (req, file, cb) {
    // Set a unique filename for each file by combining current timestamp and original filename
    cb(null, Date.now() + path.extname(file.originalname));  // Keep file extension as well
  }
});
  
  // Initialize multer with the storage configuration
export const upload = multer({
  storage: storage,
  // Optional: add file validation (only allow images, for example)
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only images are allowed.'));
    }
    cb(null, true);  // Proceed with file upload if the type is valid
  }
});