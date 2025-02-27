import { useState, useEffect } from 'react';
// import {videos} from '../utils/videoMockdata';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';

function HomePage(){
    const {searchText}= useOutletContext(); //Get search text from App.jsx
    const [videos, setVideos]= useState([]);
   
    // console.log(categories);
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
    ? videos.filter((video) => video.title.toLowerCase().includes(searchText.toLowerCase()))
    : categoryFilteredVideos;

    return(
        <div className='min-h-screen w-full flex flex-col pt-24 px-4'>
            {/* Category buttons */}
            <div className='flex flex-wrap md:w-auto w-full gap-6 justify-center mb-6'>
                {categories.map(category=>(
                    <button 
                        key={category}
                        className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        onClick={()=>setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 pl-20">
                {finalFilteredVideos.map((video) => (
                    <Link key={video._id} to={`/video/${video._id}`}>
                    <div className="bg-white shadow rounded-lg p-2">
                        <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="mt-2">
                        <h3 className="text-sm font-semibold">{video.title}</h3>
                        <p className="text-gray-600 text-xs">{video.uploader}</p>
                        <p className="text-gray-500 text-xs">{video.views} views {new Date(video.uploadDate).toLocaleDateString()}</p>
                        </div>
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