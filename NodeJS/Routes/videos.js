import express from "express";
import { getVideos, getVideoById, getVideoByChannelHandle, likeVideo, uploadVideo, updateVideo, deleteVideo, dislikeVideo } from "../Controller/videoController.js";

const router= express.Router();

router.get('/', getVideos);
router.get('/:id', getVideoById);
router.get('/channel/:handle', getVideoByChannelHandle);
router.put("/:id/like", likeVideo);
router.put("/:id/dislike", dislikeVideo);
router.post('/', uploadVideo);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

export default router;
