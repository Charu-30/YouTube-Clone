import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';
import videoRoutes from "./Routes/videos.js";
import authRoutes from "./Routes/auth.js";
import channelRoutes from "./Routes/channel.js";
import commentRoutes from "./Routes/comment.js";

// Initialize express app
const app= new express();

const PORT= process.env.PORT || 9000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true})); //Allow form data parsing
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

const db=mongoose.connection;

db.on("open", ()=>{
    console.log("Database connection is successful")
})

db.on("error", ()=>{
    console.log("Connection is not successful");
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/comments', commentRoutes);


