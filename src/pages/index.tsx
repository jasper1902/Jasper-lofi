import Nav from "@/components/Nav";
import Todo from "@/components/Todo";
import YouTubeAudioPlayer from "@/components/YouTubeAudioPlayer";
import React, { useEffect, useState, useCallback } from "react";

export type BackgroundStateType =
  | "day-sunday"
  | "day-rainny"
  | "night-clear"
  | "night-rainny";

const backgroundStateToVideoURL: Record<BackgroundStateType, string> = {
  "day-sunday": "videos/Day-sunny.mp4",
  "day-rainny": "videos/Day-rainny.mp4",
  "night-clear": "videos/Night-clear.mp4",
  "night-rainny": "videos/Night-rainny.mp4",
};

const Home = React.memo(() => {
  const [backgroundState, setBackgroundState] =
    useState<BackgroundStateType>("day-sunday");

  useEffect(() => {
    const background = localStorage.getItem("background");
    if (
      background &&
      Object.keys(backgroundStateToVideoURL).includes(background)
    ) {
      setBackgroundState(background as BackgroundStateType);
    } else {
      setBackgroundState("day-sunday");
    }
  }, []);

  return (
    <>
      <Nav backgroundState={backgroundState} setBackgroundState={setBackgroundState} />
      <main >
        {Object.entries(backgroundStateToVideoURL).map(([state, url]) => (
          <video
            key={state}
            autoPlay
            loop
            muted
            className={`${backgroundState === state ? "opacity-100" : "opacity-0"
              } z-10 w-full h-full object-cover top-0 left-0 transition-opacity duration-1000 absolute`}
          >
            <source src={url} type="video/mp4" />
          </video>
        ))}

        <div className="footer footer-center absolute inset-x-0 bottom-20 z-10">
          <div >
            <YouTubeAudioPlayer videoId={"jfKfPfyJRdk"} />
          </div>
        </div>

        <div className="flex justify-center my-auto">
          <Todo />
        </div>
      </main>


    </>
  );

});

Home.displayName = "Home";

export default Home;
