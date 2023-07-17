import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTubeEmbed from "./YouTubeEmbed";

const YouTubeAudioPlayer = ({ videoId }: { videoId: string }) => {
  const [videoTitle, setVideoTitle] = useState("");

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              id: videoId,
              part: "snippet",
              key: "AIzaSyCrgXQtgoO0qMTGXp7r9bvYU1IHvFJYOVs",
            },
          }
        );
        const videoData = response.data.items[0].snippet;
        setVideoTitle(videoData.title);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [videoId]);

  return (
    <div>
      <YouTubeEmbed videoId={videoId} />
    </div>
  );
};

export default YouTubeAudioPlayer;
