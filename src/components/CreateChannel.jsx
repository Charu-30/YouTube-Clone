import { useState } from "react";

const CreateChannel = ({ onClose, onCreate }) => {
  const [channelName, setChannelName] = useState("");
  const [channelHandle, setChannelHandle] = useState("");
  const [description, setDescription]= useState("");
  const [bannerUrl, setBannerUrl]= useState("");
  const [avatar, setAvatar] = useState(null);

  const handleImageUpload= (event)=>{
    const file=event.target.files[0];
    if(file){
      const imageUrl= URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  }
  const handleSubmit = ()=>{
    const channelData={
      channelName,
      channelHandle,
      description,
      bannerUrl,
      avatar
    }
    onCreate(channelData);
    onClose();
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create Your Channel</h2>
        <label htmlFor="avatar-upload" className="cursor-pointer text-center">
          {avatar?(
            <img src={avatar} alt="Channel Avatar" className="w-16 h-16 rounded-full"/>
          ):(
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500"> Select picture</span>
            </div>
          )}
        </label>

        <input type="file"
               id="avatar-upload"
               className="hidden"
               onChange={handleImageUpload}
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
