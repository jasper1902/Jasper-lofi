import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  const [mute, setMute] = useState(true);
  const [volume, setVolume] = useState(10);
  const playerRef = useRef<any>();

  useEffect(() => {
    const getVolume = localStorage.getItem("volume")
    if (getVolume) {
      setVolume(Number(getVolume))
    }
  }, [])

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("video-player", {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          loop: 1,
          mute: 1
        },
        events: {
          onReady: onPlayerReady,
          // onStateChange: onStateChange,
        },
      });
    };

    return () => {
      document.body.removeChild(script);
      window.onYouTubeIframeAPIReady = () => {

      };
    };
  }, [mute, videoId]);

  const onPlayerReady = (e: any) => {
    e.target?.setVolume(10);
  }

  const toggleMute = () => {
    setMute((prevMute) => !prevMute);
    if (mute === true) {
      playerRef.current?.unMute()
    } else {
      playerRef.current?.mute()
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
    localStorage.setItem("volume", e.target.value);
    playerRef.current?.setVolume(Number(e.target.value));

  };

  return (
    <div>
      <div id="video-player"></div>

      <div className="flex items-center gap-4"><div onClick={toggleMute} className="cursor-pointer">{mute ? <FaPlay size={40}/> : <FaPause size={40}/>}</div>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleVolumeChange}
          className="range range-xs"
        /></div>
    </div>
  );
};

export default YouTubeEmbed;
