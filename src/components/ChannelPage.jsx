import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineBell } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const ChannelPage = () => {
    const { handle } = useParams(); // Get channel handle from URL
    const [channel, setChannel] = useState(null);
    const [videos, setVideos]= useState([]);
    useEffect(() => {
        // Fetch channel details from API
        const fetchChannelData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/channels/handle/${handle}`);
                setChannel(response.data);
            } catch (error) {
                console.error("Error fetching channel data:", error);
            }
        };

        const fetchVideos=async()=>{
            try{
                const response= await axios.get(`http://localhost:5000/api/videos/channel/${handle}`)
                setVideos(response.data);
            }catch(error){
                console.error("Error fetching videos:", error);
            }
        }
        fetchChannelData();
        fetchVideos();
    }, [handle]);

    if (!channel) {
        return <div className="text-center text-lg font-semibold py-10">Loading...</div>;
    }

    return (
        <div className="mx-28 mt-20">
            {/* Banner */}
            <div className="w-full h-52 sm:h-64 md:h-72 lg:h-80 bg-gray-200">
                {channel.channelBannerUrl ? (
                    <img src={channel.channelBannerUrl} alt="Banner" className="w-full h-full object-fill rounded-lg" />
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500 text-xl">
                        No Banner
                    </div>
                )}
            </div>

            {/* Channel Info */}
            <div className="px-4 lg:px-10 py-6 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32">
                {/* <FaUserCircle className="w-full h-full text-gray-400" /> */}
                    {channel.avatar ? (
                        <img src={`http://localhost:5000${channel.avatar}`} alt="Channel Logo" className="w-full h-full rounded-full" />
                    ) : (
                        <FaUserCircle className="w-full h-full text-gray-400" />
                    )}
                </div>

                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{channel.channelName}</h1>
                    <p className="text-gray-500">{channel.handle}</p>
                    <p className="text-gray-600">{channel.subscribers} subscribers •  videos</p>
                    <p className="text-gray-700 mt-2">{channel.description}</p>
                </div>

                <button className=" px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
                    Subscribe
                </button>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-300 flex gap-8 px-4 lg:px-10 text-gray-600 text-sm sm:text-base font-semibold">
                <button className="py-4 border-b-2 border-black text-black">Home</button>
                <button className="py-4 hover:text-black">Videos</button>
                <button className="py-4 hover:text-black">Shorts</button>
                <button className="py-4 hover:text-black">Playlists</button>
                <button className="py-4 hover:text-black">Posts</button>
            </div>

            {/* For You Section (Example Video Grid) */}
            <div className="px-4 lg:px-10 py-6">
                <h2 className="text-xl font-semibold mb-4">For You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <div key={video._id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                            <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
                            <div className="p-2">
                                <p className="text-sm font-semibold">{video.title}</p>
                                <p className="text-xs text-gray-500">{video.views} views • {video.uploadedAt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChannelPage;
