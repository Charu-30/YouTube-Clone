import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Files will be stored in 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ "-" + file.originalname); //Unique filename
    }
});

// File filter to allow only images
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only image files are allowed!"), false);
//     }
// };

// Multer upload instance
const upload = multer({ storage });

export default upload;
