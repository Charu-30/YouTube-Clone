import express from "express";
import {
  getChannels,
  getChannelByChannelHandle,
  createChannel,
  updateChannel,
  deleteChannel,
  getChannelByUserId,
} from "../Controller/channelController.js";
import upload from "../Middleware/upload.js";
const router = express.Router();

router.get("/", getChannels);
router.get("/user/:userId", getChannelByUserId);
router.get("/handle/:handle", getChannelByChannelHandle);
router.post("/", upload.single("avatar"), createChannel);
router.put("/:id", updateChannel);
router.delete("/:id", deleteChannel);

export default router;