import mongoose from "mongoose";

const channelSchema= new mongoose.Schema({
    channelId: {type: mongoose.Schema.Types.ObjectId},
    channelName: { type: String, required: true, unique: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    channelBanner: { type: String},
    subscribers: { type: Number, default: 0 },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
});

const channelModel= mongoose.model("Channel", channelSchema);

export default channelModel;