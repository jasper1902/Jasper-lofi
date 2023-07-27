import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTubeEmbed from "./YouTubeEmbed";

const YouTubeAudioPlayer = ({ videoId }: { videoId: string }) => {
  const [videoTitle, setVideoTitle] = useState("");
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              id: videoId,
              part: "snippet",
              key: YOUTUBE_API_KEY,
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
    
  }, [YOUTUBE_API_KEY, videoId]);

  return (
    <div>
      <YouTubeEmbed videoId={videoId} />
    </div>
  );
};

export default YouTubeAudioPlayer;
