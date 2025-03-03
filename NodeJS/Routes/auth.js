import express from "express";
import multer from "multer";
import { registerUser, loginUser, authenticate } from "../Controller/authController.js";
import upload from "../Middleware/upload.js";

// import authenticateUser from "../Middleware/authenticateUser.js";
const router= express.Router();

//Multer configuration for file uploads
// const storage= multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null, "uploads/") //Stores file in uploads/
//     },
//     filename: (req,file,cb)=>{
//         cb(null, Date.now()+ "-" + file.originalname); //Unique filename
//     }
// });
// const upload= multer({storage});

router.post('/register', upload.single("avatar"), registerUser);
router.post('/login', loginUser);
router.get("/profile", authenticate);

export default router;