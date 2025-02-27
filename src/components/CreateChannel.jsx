import { useState } from "react";

const CreateChannel = ({ onClose }) => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call backend API to create channel
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Your Channel</h2>

        <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />

        <input
          type="text"
          placeholder="Channel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 mt-2"
        />

        <input
          type="text"
          placeholder="@handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className="w-full border p-2 mt-2"
        />

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 px-4 py-2 text-white rounded-lg">
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
