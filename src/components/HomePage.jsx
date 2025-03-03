import { useState, useEffect } from 'react';
// import {videos} from '../utils/videoMockdata';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';

function HomePage({isOpen}){
    const {searchText, isSidebarOpen}= useOutletContext(); //Get search text from App.jsx
    const [videos, setVideos]= useState([]);
    const [selectedCategory, setSelectedCategory]= useState("All");
    
    //Fetch videos from MogoDB on component mount
    useEffect(()=>{
        const fetchVideos= async()=>{
            try{
                const response= await axios.get("http://localhost:5000/api/videos");
                console.log("Fetched Videos", response.data); //Debugging
                setVideos(Array.isArray(response.data)? response.data:[]);
            }catch(error){
                console.error("Error in fetcging videos:", error);
            }
        };
        fetchVideos();
    }, []);

    //Get unique categories from fetched videos
    const categories= ["All", ...(Array.isArray(videos) ? [...new Set(videos.map((video)=>video.category))]: [])];

    // 🔹 Apply Category Filtering first
    let categoryFilteredVideos = selectedCategory === "All"
    ? videos
    : videos.filter((video) => video.category === selectedCategory);

    // 🔹 Apply Search Filtering on all videos (not just filtered ones)
    let finalFilteredVideos = searchText
    ? categoryFilteredVideos.filter((video) => video.title.toLowerCase().includes(searchText.toLowerCase()))
    : categoryFilteredVideos;

      

    const timeAgo = (isoDate) => {
        const now = new Date();
        const past = new Date(isoDate);
        const seconds = Math.floor((now - past) / 1000);
      
        if (seconds < 60) return `${seconds} seconds ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minutes ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} days ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} months ago`;
        const years = Math.floor(days / 365);
        return `${years} years ago`;
      };
      
    return(
        <div className={`min-h-screen w-full flex flex-col pt-24 px-2 transition-all duration-300 ${isSidebarOpen? "ml-64": ""}`}>
            {/* Category buttons */}
            <div className='flex flex-wrap gap-6 justify-center mb-5'>
                {categories.map(category=>(
                    <button 
                        key={category}
                        className={`px-3 py-1 rounded-lg font-semibold text-md ${selectedCategory === category ? 'bg-gray-900 text-white' : 'bg-gray-300'}`}
                        onClick={()=>setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {finalFilteredVideos.map((video) => (
                    <Link key={video._id} to={`/video/${video._id}`}>
                    <div className="p-1 ">
                        {/* Thumbnail */}
                        <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-xl"
                        />

                        {/* Title and Icon */}
                        <div className='mt-2 mb-1 flex justify-between items-start'>
                            <h3 className="font-semibold flex-1">{video.title}</h3>
                            <FaEllipsisV className='text-gray-500 cursor-pointer pt-1'/>
                        </div>
                        
                        {/* Uploader and Views */}
                        <p className="text-gray-600 text-sm font-medium">{video.uploader}</p>
                        <p className="text-gray-500 text-sm font-medium">{video.views} views • {timeAgo(video.uploadDate)}</p>
                        
                    </div>
                    </Link>
                ))}
            </div>

            {/* No Videos Message */}
            {finalFilteredVideos.length === 0 && (
                <p className="text-center text-gray-600 mt-4">No videos available.</p>
            )}
        </div>
    )
}

export default HomePage;