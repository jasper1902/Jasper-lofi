import React, { useEffect, useState, useCallback } from "react";

type BackgroundStateType =
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
  const [backgroundState, setBackgroundState] = useState<BackgroundStateType>(
    "day-sunday"
  );

  useEffect(() => {
    const background = localStorage.getItem("background");
    if (background && Object.keys(backgroundStateToVideoURL).includes(background)) {
      setBackgroundState(background as BackgroundStateType);
    } else {
      setBackgroundState("day-sunday");
    }
  }, []);

  const handleBackgroundChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedBackground = e.target.value as BackgroundStateType;
      setBackgroundState(selectedBackground);
      localStorage.setItem("background", selectedBackground);
    },
    []
  );

  return (
    <>
      {Object.entries(backgroundStateToVideoURL).map(([state, url]) => (
        <video
          key={state}
          autoPlay
          loop
          muted
          className={`${
            backgroundState === state ? "opacity-100" : "opacity-0"
          } z-10 w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000`}
        >
          <source src={url} type="video/mp4" />
        </video>
      ))}

      <select
        className="select select-ghost max-w-xs absolute z-10"
        value={backgroundState}
        onChange={handleBackgroundChange}
      >
        <option value="day-sunday">Day Sunday</option>
        <option value="day-rainny">Day Rainny</option>
        <option value="night-clear">Night Clear</option>
        <option value="night-rainny">Night Rainny</option>
      </select>
    </>
  );
});

Home.displayName = "Home";

export default Home;
