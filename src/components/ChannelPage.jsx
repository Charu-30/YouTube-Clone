import { useParams } from "react-router-dom";
const channelData = {
    channelId: "channel01",
    channelName: "Code with John",
    owner: "user01",
    description: "Coding tutorials and tech reviews by John Doe.",
    channelBanner: "https://example.com/banners/john_banner.png",
    subscribers: 5200,
    videos: ["video01", "video02"],
  };

const ChannelPage = () => {
  const { channelId } = useParams();

  return (
    <div className="w-full p-4 pl-28 pt-20">
      <div className="relative w-full h-48">
        <img src={channelData.channelBanner} alt="Banner" className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{channelData.channelName}</h1>
        <p>{channelData.description}</p>
        <p className="text-gray-500">{channelData.subscribers} subscribers</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {channelData.videos.map((video) => (
          <div key={video} className="border p-2">Video {video}</div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
