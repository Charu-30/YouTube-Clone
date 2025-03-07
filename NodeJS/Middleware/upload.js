import multer from "multer";

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); //Unique filename
  },
});

// Multer upload instance
const upload = multer({ storage });

export default upload;
