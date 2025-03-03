import { useState } from "react";
import  axios from "axios";

const CreateChannel = ({ onClose, onCreate, userId }) => {
  const [channelName, setChannelName] = useState("");
  const [channelHandle, setChannelHandle] = useState("");
  const [description, setDescription]= useState("");
  const [bannerUrl, setBannerUrl]= useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview]= useState(null);

  const handleFileChange= (e)=>{
    const file=e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file)) //Generate preview URL
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append("channelName", channelName);
    formData.append("handle", channelHandle);
    formData.append("description", description);
    formData.append("channelBannerUrl", bannerUrl);
    formData.append("owner", userId);
    if(avatar){
      formData.append("avatar", avatar);
    }
    try{
      // const channelData={
      //   channelName,
      //   handle: channelHandle,
      //   description,
      //   channelBannerUrl: bannerUrl,
      //   avatar,
      //   owner: userId //Pass user ID from props
      // };

      // Send post request to create a channel
      const response= await axios.post("http://localhost:5000/api/channels", formData, {
        headers: {"Content-Type": "multipart/form-data"}
      });

      console.log("Server response", response.data);
      //Notify parent comonent
      if(response.data.success && response.data.channel){
        onCreate(response.data.channel);
        alert("Channel created successfully!");
        //Close modal after suucessful creation
        onClose();
      }else{
        throw new Error("Invalid response from server");
      }
      
    }catch(error){
      console.error("Error creating channel:", error);
      alert("Failed to craete channel. Please try again");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create Your Channel</h2>
        <label htmlFor="avatar-upload" className="cursor-pointer text-center">
          {preview?(
            <img src={preview} alt="Channel Avatar" className="w-16 h-16 rounded-full object-cover"/>
          ):(
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500"> Select picture</span>
            </div>
          )}
        </label>

        <input type="file"
               id="avatar-upload"
               className="hidden"
               onChange={handleFileChange}
               accept="image/*"
        />

        <input
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg my-2"
        />

        <input
          type="text"
          placeholder="@Handle"
          value={channelHandle}
          onChange={(e) => setChannelHandle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg my-2"
        />

        <textarea 
          value={description}
          placeholder="Channel Description"
          onChange={(e)=>setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg my-2"
        ></textarea>

        <input
          type="text"
          placeholder="Channel Banner Url"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 text-white bg-blue-500 rounded-lg">
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
