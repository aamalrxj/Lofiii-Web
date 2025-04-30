import React, { useState } from "react";
import "./App.css";
import Player from "./components/Player";
import Background from "./components/Background";
import BackgroundSelectorModal from "./components/BackgroundSelectorModal";
import SoundEffects from "./components/SoundEffects";
import ChatBox from "./components/ChatBox";
import { FaMusic, FaVolumeUp, FaChevronDown, FaChevronUp } from "react-icons/fa";

function App() {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isSoundEffectsOpen, setIsSoundEffectsOpen] = useState(false);

  const backgroundVideos = [
    { src: "/samp1.mp4", name: "Lofi Cafe" },
    { src: "/samp2.mp4", name: "Rainy Window" },
    { src: "/samp3.mp4", name: "Night City" },
    { src: "/samp4.mp4", name: "Sunset Beach" },
    { src: "/samp5.mp4", name: "Calm" },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectBackground = (index) => {
    setCurrentBackgroundIndex(index);
  };

  const toggleMusicPlayer = () => {
    setIsMusicPlayerOpen(!isMusicPlayerOpen);
  };

  const toggleSoundEffects = () => {
    setIsSoundEffectsOpen(!isSoundEffectsOpen);
  };

  return (
    <div className="app-container"> 
      <Background videoSrc={backgroundVideos[currentBackgroundIndex].src} />
      
      {/* Music Player Dropdown - Top Left */}
      <div className="dropdown-container music-dropdown">
        <button className="dropdown-toggle" onClick={toggleMusicPlayer}>
          <FaMusic /> Music Player {isMusicPlayerOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isMusicPlayerOpen && (
          <div className="dropdown-content">
            <Player />
          </div>
        )}
      </div>
      
      {/* Sound Effects Dropdown - Top Right */}
      <div className="dropdown-container effects-dropdown">
        <button className="dropdown-toggle" onClick={toggleSoundEffects}>
          <FaVolumeUp /> Sound Effects {isSoundEffectsOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isSoundEffectsOpen && (
          <div className="dropdown-content">
            <SoundEffects />
          </div>
        )}
      </div>
      
      <div className="background-control">
        <button onClick={openModal} className="btn">Change Background</button>
      </div>
      
      {/* Chat Box Component */}
      <ChatBox />
      
      <BackgroundSelectorModal
        isOpen={isModalOpen}
        onClose={closeModal}
        backgrounds={backgroundVideos}
        onSelect={selectBackground}
        currentBackgroundIndex={currentBackgroundIndex}
      />
    </div>
  );
}

export default App;
