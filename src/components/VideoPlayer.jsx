import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { videos } from "../utils/videoMockdata";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown, FaShare, FaBookmark, FaEllipsisV } from "react-icons/fa";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo]= useState(null);
  const [recommendedVideos, setRecommendedVideos]= useState([]);
  const  [loading, setLoading]= useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId]= useState(null);
  const [editText, setEditText]= useState("");
  const [showOptions, setShowOptions]= useState(null); //Track which comment's menu is open

  useEffect(()=>{
    const fetchVideo= async()=>{
      try{
        const res= await axios.get(`http://localhost:5000/api/videos/${videoId}`);
        setVideo(res.data);
        setLikes(res.data.likes);
        setDislikes(res.data.dislikes);
        setComments(res.data.comments || []);
      }catch(error){
        console.error("Error in fetching video:", error);
      }finally{
        setLoading(false);
      }
    };

    const fetchRecommendedVideos= async()=>{
      try{
        const res= await axios.get("http://localhost:5000/api/videos");
        setRecommendedVideos(res.data.filter((vid)=>vid._id!==videoId));
      }catch(error){
        console.error("Error in fetching recommended vidoes:", error);
      }
    };
    fetchVideo();
    fetchRecommendedVideos();
  }, [videoId]);

  if(loading) return <p className="text center mt-10">Loading...</p>;
  if (!video) return <p className="text-center mt-10 text-xl font-semibold">Video not found</p>;

  const userId= "67af16f3f0b5784759113b51"; 

  const handleLike = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/videos/${videoId}/like`, {userId});
      setLikes(res.data.likes); // Update UI with new likes count
      setDislikes(res.data.dislikes);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDislike = async () => {
  try {
    const res = await axios.put(`http://localhost:5000/api/videos/${videoId}/dislike`, {userId});
    setLikes(res.data.likes);
    setDislikes(res.data.dislikes); // Update UI with new dislikes count
  } catch (error) {
    console.error("Error updating dislikes:", error);
  }
};

  const addComment = async () => {
    if (newComment.trim()) {
      try {
        const userId = "67af16f3f0b5784759113b51"; // Replace with actual logged-in user ID
      const username = "Charu"; // Replace with actual username
        const res = await axios.post(`http://localhost:5000/api/comments/${videoId}`,{
          text: newComment,
          userId,
          videoId,
          username
        });
        setComments([res.data.comment, ...comments]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  // Function to toggle menu visibility
  const toggleOptions= (commentId)=>{
    setShowOptions(showOptions===commentId ? null: commentId);
  }

  // Function to delete comment
  const deleteComment = async(commentId) => {
    try{
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
    }catch(error){
      console.error("Error in deleting comment:", error);
    }
  };

  //Function to enable edit mode
  const enableEdit= (comment)=>{
    setEditingCommentId(comment._id);
    setEditText(comment.text);
    setShowOptions(null);
  }
 
  // Function to save edited comment
  const saveEdit = async (commentId) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/comments/${commentId}`, { text: editText });
      setComments(comments.map((comment) => (comment._id === commentId ? { ...comment, text: res.data.text } : comment)));
      setEditingCommentId(null);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div className="min-w-screen-lg mx-auto p-4 flex flex-col lg:flex-row gap-6 pt-20 pl-32">
      {/* Left: Video Player & Details */}
      <div className="flex-1">
        {/* Video Player */}
        <div className="w-full aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-[480px] rounded-lg"
            src={video.videoUrl.replace("watch?v=", "embed/")}
            title={video.title}
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <h2 className="text-2xl font-bold mt-4">{video.title}</h2>
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-gray-600">{video.views} views • {new Date(video.uploadDate).toDateString()}</p>
            <p className="text-sm text-gray-500 font-semibold">Channel: {video.uploader}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className="flex items-center gap-1 text-blue-500">
              <FaThumbsUp /> {likes}
            </button>
            <button onClick={handleDislike} className="flex items-center gap-1 text-red-500">
              <FaThumbsDown /> {dislikes}
            </button>
            <button className="flex items-center gap-1 text-gray-700">
              <FaShare /> Share
            </button>
            <button className="flex items-center gap-1 text-gray-700">
              <FaBookmark /> Save
            </button>
          </div>
        </div>

        <div className="bg-gray-200 p-2 rounded">
          <p>{video.description}</p>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="border p-2 w-full rounded"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addComment}>
              Add
            </button>
          </div>

          <div className="mt-4">
            {comments.map((comment) => (
              <div key={comment._id} className="border-b py-2">
                <div>
                  <p className="font-semibold">{comment.username}</p>
                  {editingCommentId===comment._id ? (
                    <input type="text" value={editText} onChange={(e)=>setEditText(e.target.value)} 
                    className="border rounded px-2 py-1" />
                  ):(<p>{comment.text}</p>)}
                </div>
                
                {/* Three-dot menu */}
                <div className="relative">
                  <button onClick={() => toggleOptions(comment._id)} className="text-gray-500">
                    <FaEllipsisV />
                  </button>

                  {showOptions === comment._id && (
                  <div className="absolute right-0 bg-white shadow-md border rounded p-2">
                    <button onClick={() => enableEdit(comment)} className="block w-full text-left px-2 py-1 hover:bg-gray-200">Edit</button>
                    <button onClick={() => deleteComment(comment._id)} className="block w-full text-left px-2 py-1 hover:bg-red-200">Delete</button>
                  </div>
                  )}

                  {/* Save button for editing */}
                  {editingCommentId === comment._id && (
                    <button onClick={() => saveEdit(comment._id)} className="ml-2 bg-green-500 text-white px-2 py-1 rounded">
                      Save
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Recommended Videos */}
      <div className="w-full lg:w-1/3">
        <h3 className="text-xl font-semibold mb-2">Recommended Videos</h3>
        <div className="flex flex-col gap-4">
          {recommendedVideos.map((rec) => (
            <div
              key={rec._id}
              className="flex gap-2 cursor-pointer"
              onClick={() => navigate(`/video/${rec._id}`)}
            >
              <img
                src={rec.thumbnailUrl}
                alt={rec.title}
                className="w-32 h-20 object-cover rounded"
              />
              <div>
                <p className="text-sm font-semibold">{rec.title}</p>
                <p className="text-xs text-gray-500">{rec.uploader} • {rec.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
