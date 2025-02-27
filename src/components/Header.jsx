import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import {FaUserCircle} from "react-icons/fa";
import {PiUserCircle} from "react-icons/pi";
import logo from '../assets/logo.jpg';
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import CreateChannel from "./CreateChannel";
import { videos } from "../utils/videoMockdata";

function Header({searchText, setSearchText, handleSearch}){ //Receive props from App.jsx
    
    // const [searchText, setSearchText]= useState("");
    const [isSignedIn, setIsSignedIn]= useState(false);
    const [isSidebarOpen, setIsSidebarOpen]= useState(false);
    const [username, setUserName]= useState("");
    const [avatar, setAvatar]= useState(null);
    const [showModal, setShowModal]= useState(false);
    const navigate= useNavigate();
    
    // Check if the user is loggen in (JWT in local storage)
    useEffect(()=>{
        const token= localStorage.getItem("token");
        const storedUsername= localStorage.getItem("username");
        const storedAvatar= localStorage.getItem("avatar"); //Retriev avatar url
        if(token && storedUsername){
            setIsSignedIn(true);
            setUserName(storedUsername);
            setAvatar(storedAvatar); //Use stored avatar or default
        }
    }, []);

    // Handle sign Out
    const handleSignOut=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsSignedIn(false);
        navigate("/"); //Redirect to home
    }

    return(
        <>
        <header className="flex items-center justify-between px-4 py-2 bg-white fixed w-full top-0 z-50">
            {/* Left section: Menu + logo */}
            <div className="flex items-center gap-4">
                <AiOutlineMenu className="w-6 h-6 cursor-pointer" onClick={()=>setIsSidebarOpen(!isSidebarOpen)}/>
                <img src={logo} alt="YouTube" className="w-24 cursor-pointer" />
            </div>

            {/* Middle Section: Search Bar */}
            <div className="flex items-center max-w-2xl">
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={searchText} 
                    onChange={(e)=> setSearchText(e.target.value)}
                    // onKeyDown={handleKeyPress}
                    className="w-96 px-4 py-2 border border-gray-300 rounded-l-full outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button 
                    className="px-4 py-2 bg-gray-100 border border-gray-300 hover:bg-gray-200 border-l rounded-r-full"
                    onClick={()=>handleSearch(searchText)}
                >
                    <AiOutlineSearch className="w-6 h-6"/>
                </button>
            </div>

            {/* Right Section: Icons or Sign-In  Button */}
            <div className="flex items-center gap-8">
                <AiOutlineBell className="w-6 h-6 cursor-pointer hidden sm:block"/>
                <div>
                    <button onClick={()=>setShowModal(true)} 
                            className="border bg-red-500 rounded-full p-2">
                            Create Channel
                    </button>
                </div>
                {showModal && <CreateChannel onClose={()=>setShowModal(false)}/>}
                {isSignedIn ? (
                    <div>
                        <div className="flex items-center gap-2">
                        <p>{username}</p>
                        <button onClick={handleSignOut} className="flex items-center">
                            {avatar ? (
                                <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full"/>
                            ):(
                                <FaUserCircle className="w-8 h-8 cursor-pointer text-gray-600"/>
                            )}  
                        </button>
                        
                    </div>
                   
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

        {/* Sidebar component */}
        <Sidebar isOpen={isSidebarOpen}/>
        </>
    )
}

export default Header;