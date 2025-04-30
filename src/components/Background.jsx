import React, { useEffect, useRef } from "react";
import "./Background.css";

const Background = ({ videoSrc }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  return (
    <div className="background-container">
      <video
        ref={videoRef}
        key={videoSrc} // This forces a re-render when videoSrc changes
        autoPlay
        loop
        muted
        className="background-video"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default Background;
