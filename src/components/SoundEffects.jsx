import React, { useState, useRef, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./SoundEffects.css";

const SoundEffects = () => {
  const [soundEffects, setSoundEffects] = useState([
    { id: 1, name: "Rain", src: "/Sounds/Rain.mp3", playing: false, volume: 0.3 },
    { id: 2, name: "Forest", src: "/Sounds/Forest.mp3", playing: false, volume: 0.3 },
    { id: 3, name: "Birds", src: "/Sounds/Bird.mp3", playing: false, volume: 0.3 },
    { id: 4, name: "Rap", src: "/Sounds/peekaboo.mp3", playing: false, volume: 0.3 },

  ]);

  // Create refs for each audio element
  const audioRefs = useRef([]);

  // Initialize audio refs
  useEffect(() => {
    audioRefs.current = audioRefs.current.slice(0, soundEffects.length);
  }, [soundEffects]);

  const toggleSound = (id) => {
    setSoundEffects(prevEffects => 
      prevEffects.map(effect => {
        if (effect.id === id) {
          const newPlaying = !effect.playing;
          
          // Get the audio element for this effect
          const audioElement = audioRefs.current[effect.id - 1];
          
          if (newPlaying) {
            audioElement.play();
          } else {
            audioElement.pause();
          }
          
          return { ...effect, playing: newPlaying };
        }
        return effect;
      })
    );
  };

  const adjustVolume = (id, newVolume) => {
    setSoundEffects(prevEffects => 
      prevEffects.map(effect => {
        if (effect.id === id) {
          // Update the volume of the audio element
          const audioElement = audioRefs.current[effect.id - 1];
          audioElement.volume = newVolume;
          
          return { ...effect, volume: newVolume };
        }
        return effect;
      })
    );
  };

  return (
    <div className="sound-effects-container">
      <h3>Sound Effects</h3>
      <div className="sound-effects-grid">
        {soundEffects.map((effect, index) => (
          <div key={effect.id} className="sound-effect-item">
            <audio
              ref={el => audioRefs.current[index] = el}
              src={effect.src}
              loop
            />
            <button 
              className={`sound-button ${effect.playing ? 'active' : ''}`}
              onClick={() => toggleSound(effect.id)}
            >
              {effect.name}
            </button>
            <div className="volume-control">
              {effect.volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={effect.volume}
                onChange={(e) => adjustVolume(effect.id, parseFloat(e.target.value))}
                className="volume-slider"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoundEffects;
