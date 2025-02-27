import videoModel from "../Model/videoModel.js";
// import commentModel from "../Model/commentModel.js";
import userModel from "../Model/userModel.js";
import channelModel from "../Model/channelModel.js";

// Fetch all channels
export async function getChannels(req, res){
    try{
        const channels= await channelModel.find().populate('owner', 'username avatar');
        res.status(200).json(channels);
    }catch(error){
        res.status(500).json({message: 'Server Error: Unable to fetch channels'});
    }
};

// Fetch a single channel by ID
export async function getChannelById(req, res){
    try{
        const channel= await channelModel.findById(req.params.id).populate('owner', 'username avatar');
        if(!channel){
            return res.status(404).json({message: 'Channel not found'});
        }
        res.status(200).json(channel);
    }catch(error){
        res.status(500).json({message: 'Server Error : Uable to fetch channel'});
    }
}

// Create a new channel (User must be signed in)
export async function createChannel(req, res) {
    try{
        const {channelName, description, owner, channelBanner}= req.body;
        const newChannel= new channelModel({
            channelName, description, owner, channelBanner
        });
        await newChannel.save();
        await userModel.findByIdAndUpdate(owner, {$push: {channels: newChannel._id}})
        res.status(201).json({message: "Channel created", channel: newChannel});
    }catch(error){
        res.status(500).json({error: "Server error: Failed to create channel"});
    }
}

// Update a channel
export async function updateChannel(req, res){
    try{
        const updatedChannel= await channelModel.findByIdAndUpdate(req.params.id, req.body);
        if(!updatedChannel){
            return res.status(404).json({error: "Channel not found"});
        }
        res.status(200).json({message: "channel Updated", channel: updatedChannel});
    }catch(error){
        res.status(500).json({error: "Server Error: Failed to update channel"});
    } 
}

// Delete a channel
export async function deleteChannel(req, res) {
    try{
        const deletedChannel= await channelModel.findByIdAndDelete(req.params.id);
        if(!deletedChannel){
            return res.status(404).json({error: "Video not found"});
        }
        await videoModel.deleteMany({channel: deleteChannel._id});
        res.status(200).json({message: "Channel deleted successfully"});
    }catch(error){
        res.status(500).json({error: "Server Error: Failed to delete channel"});
    }
}





