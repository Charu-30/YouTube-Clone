import { useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

function CreateChannel({ onClose, onCreate, userId }) {
  const [channelName, setChannelName] = useState("");
  const [channelHandle, setChannelHandle] = useState("");
  const [description, setDescription] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file)); //Generate preview URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("channelName", channelName);
    formData.append("handle", channelHandle);
    formData.append("description", description);
    formData.append("channelBannerUrl", bannerUrl);
    formData.append("owner", userId);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    try {
      // Send post request to create a channel
      const response = await axios.post(
        "http://localhost:5000/api/channels",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      //Notify parent comonent
      if (response.data.success && response.data.channel) {
        onCreate(response.data.channel);
        alert("Channel created successfully!");
        //Close modal after suucessful creation
        onClose();
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error creating channel:", error);
      alert("Failed to create channel. Please try again");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 p-4">
      <div className="bg-white p-6 rounded-lg max-w-sm sm:max-w-md md:max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create Your Channel
        </h2>

        {/* Channel Avatar upload */}
        <label
          htmlFor="avatar-upload"
          className="block cursor-pointer text-center"
        >
          {preview ? (
            <img
              src={preview}
              alt="Channel Avatar"
              className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <div className="flex flex-col items-center">
              <FaUserCircle className="text-blue-400 text-6xl mx-auto" />
              <span className="text-sm text-blue-700 mt-2 hover:underline">
                Select Picture
              </span>
            </div>
          )}
        </label>
        <input
          type="file"
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
          className="w-full px-3 py-2 border rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />

        <input
          type="text"
          placeholder="@Handle"
          value={channelHandle}
          onChange={(e) => setChannelHandle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />

        <textarea
          value={description}
          placeholder="Channel Description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
        ></textarea>

        <input
          type="text"
          placeholder="Channel Banner Url"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-300 hover:bg-gray-400 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateChannel;
