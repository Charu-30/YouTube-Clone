import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import {FaUserCircle} from "react-icons/fa";
import {PiUserCircle} from "react-icons/pi";
import logo from '../assets/logo.jpg';
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import CreateChannel from "./CreateChannel";
import { Link } from "react-router-dom";
import { videos } from "../utils/videoMockdata";
import axios from "axios";
import UploadVideoModal from "./UploadVideoForm";

function Header({searchText, setSearchText, handleSearch, isSidebarOpen, setIsSidebarOpen}){ //Receive props from App.jsx
  const [inputText, setInputText]=useState("");
    const [isSignedIn, setIsSignedIn]= useState(false);
    const [username, setUserName]= useState("");
    const [channelHandle, setChannelHandle]=useState(null);
    const [avatar, setAvatar]= useState(null);
    const [showModal, setShowModal]= useState(false);
    const [dropdownOpen, setDropdownOpen]= useState(false);
    const [showUploadModal, setShowUploadModal]= useState(false);
    const navigate= useNavigate();
    
    // Check if the user is loggen in (JWT in local storage)
    useEffect(()=>{
        const token= localStorage.getItem("token");
        const storedUser= localStorage.getItem("user"); //store entire user object

        // const storedAvatar= localStorage.getItem("avatar"); //Retriev avatar url
        if(token && storedUser){
            const parsedUser= JSON.parse(storedUser);
            setIsSignedIn(true);
            setUserName(parsedUser.username);
            // setHandle(parsedUser.username|| "your-handle");
            setAvatar(parsedUser.avatar); //Use stored avatar or default
            console.log("User data", parsedUser);
            //Fetch the channel handle based on the user ID
            fetchUserChannel(parsedUser.id);
            console.log(parsedUser.id);
        }
    }, []);

    //Fetch the user's channel handle
    const fetchUserChannel=async(userId)=>{
        if(!userId){
            console.error("User ID is missing");
            return;
        }
        try{
            const response= await axios.get(`http://localhost:5000/api/channels/user/${userId}`);
            if(response.data && response.data.handle){
                setChannelHandle(response.data.handle);
            }
            else{
                console.warn("Channel not found");
            }
        }catch(error){
            console.error("Error fetching channel handle:", error);
        }
    }

    const handleCreateChannel=(channelData)=>{
        console.log("Channel Created:", channelData);
        setShowModal(false);
        setChannelHandle(channelData.handle) //Update handle after channel creation
    }

    // Handle sign Out
    const handleSignOut=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsSignedIn(false);
        setUserName("");
        setChannelHandle(null);
        navigate("/"); //Redirect to home
    }

    return(
        <>
        <header className="flex items-center justify-between px-4 py-2 bg-white fixed w-full top-0 z-50">
            {/* Left section: Menu + logo */}
            <div className="flex items-center gap-4">
                <AiOutlineMenu className="w-6 h-6 cursor-pointer" onClick={()=>setIsSidebarOpen(!isSidebarOpen)}/>
                <Link to="/">
                    <img src={logo} alt="YouTube" className="w-24 cursor-pointer" />
                </Link>
            </div>

            {/* Middle Section: Search Bar */}
            <div className="flex items-center max-w-2xl">
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={inputText} 
                    onChange={(e)=> setInputText(e.target.value)}
                    className="w-96 px-4 py-2 border border-gray-300 rounded-l-full outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button 
                    className="px-4 py-2 bg-gray-100 border border-gray-300 hover:bg-gray-200 border-l rounded-r-full"
                    onClick={()=>handleSearch(inputText)}
                >
                    <AiOutlineSearch className="w-6 h-6"/>
                </button>
            </div>

            {/* Right Section: Icons or Sign-In  Button */}
            <div className="flex items-center gap-8">
                <AiOutlineBell className="w-6 h-6 cursor-pointer hidden sm:block"/>
                <div>
                    {!channelHandle&&(
                        <button onClick={()=>setShowModal(true)} 
                        className="border bg-red-500 rounded-full p-2">
                        Create Channel
                        </button>
                    )}
                </div>
                {showModal && <CreateChannel onClose={()=>setShowModal(false)} onCreate={handleCreateChannel} userId={JSON.parse(localStorage.getItem("user"))?.id}/>}
                
                {channelHandle && (
                    <button onClick={()=>setShowUploadModal(true)} className="border bg-blue-500 text-white px-3 py-2 rounded-full">Upload Video</button>
                )}
                {showUploadModal && <UploadVideoModal onClose={()=>setShowUploadModal(false)} handle={channelHandle}/>}
                {/* Avatar dropdown */}
                {isSignedIn ? (
                    <div className="relative">
                        <button onClick={()=>setDropdownOpen(!dropdownOpen)} className="flex items-center">
                            {avatar ? (
                                <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full object-cover"/>
                            ):(
                                <FaUserCircle className="w-8 h-8 cursor-pointer text-gray-600"/>
                            )}  
                        </button>
                        
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-3">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <h2 className="text-lg font-semibold">{username}</h2>
                                        <p className="text-sm text-gray-500">{channelHandle? `${channelHandle}`:`@${username}`}</p>
                                    </div>
                                </div>
                                <hr className="my-2" />
                                {channelHandle? (
                                    <Link to={`/channel/${channelHandle}`} className="block px-3 py-2 hover:bg-gray-100 rounded-lg">
                                    View Your Channel
                                </Link>
                                ): (
                                    <p className="text-gray-500 px-3 py-2">No channel found</p>
                                )}
                                
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Sign Out
                                </button>
                            </div>
                            )}
                    </div>
                ): (
                    <button
                        // onClick={()=>setIsSignedIn(true)}
                        onClick={()=>navigate("/signin")}
                        className="flex gap-1 border px-3 py-2 text-blue-700 rounded-full hover:bg-blue-100 cursor-pointer"
                    >
                        <PiUserCircle className="w-6 h-6"/>
                        <p className="font-semibold">Sign In</p>
                    </button>
                )}
            </div>
        </header>
    </>
    )
}

export default Header;