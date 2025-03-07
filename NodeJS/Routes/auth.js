import express from "express";
import { registerUser, loginUser, authenticate } from "../Controller/authController.js";
import upload from "../Middleware/upload.js";

const router= express.Router();

router.post('/register', upload.single("avatar"), registerUser);
router.post('/login',loginUser);
router.get("/profile", authenticate);

export default router;