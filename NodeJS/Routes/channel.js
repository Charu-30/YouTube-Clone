import express from "express";
import { getChannels, getChannelById, createChannel, updateChannel, deleteChannel } from "../Controller/channelController.js";
const router= express.Router();

router.get('/', getChannels);
router.get('/:id', getChannelById);
router.post('/', createChannel);
router.put('/:id', updateChannel);
router.delete('/:id', deleteChannel);

export default router;