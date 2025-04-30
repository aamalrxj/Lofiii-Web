import React, { useState, useRef, useEffect } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

// Default tracks
const musicTracks = [
  { src: "/Songs/Song1.mp3", name: "Track 1" },
  { src: "/Songs/Song2.mp3", name: "Track 2" },
  { src: "/Songs/Song3.mp3", name: "Track 3" },
];

const Player = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  
  const audioRef = useRef(null);

  useEffect(() => {
    // Set initial volume
    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      // If was playing before track change, play the new track
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Error playing audio:", err));
      }
    }
  }, [currentTrackIndex, isPlaying]);

  const playPause = () => {
    if (!isPlaying) {
      audioRef.current.play().catch(err => console.error("Error playing audio:", err));
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const skipNext = () => {
    if (currentTrackIndex < musicTracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
  };

  const skipPrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    } else {
      setCurrentTrackIndex(musicTracks.length - 1);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="player">
      <audio 
        ref={audioRef} 
        src={musicTracks[currentTrackIndex].src}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <h2>{musicTracks[currentTrackIndex].name}</h2>
      
      <div className="controls-container">
        <button onClick={skipPrevious} className="control-btn">
          <BiSkipPrevious size={24} />
        </button>
        <button onClick={playPause} className="play-btn">
          {isPlaying ? <AiFillPauseCircle size={40} /> : <AiFillPlayCircle size={40} />}
        </button>
        <button onClick={skipNext} className="control-btn">
          <BiSkipNext size={24} />
        </button>
      </div>
      
      <div className="volume-container">
        {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default Player;
