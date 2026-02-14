
import React, { useState, useRef, useEffect } from 'react';
import './MusicButton.css';

const MusicButton = () => {
  const songs = [
    "/LuzzRoza.mp3",
   "/stars.mp3",
    "/iwasneverthere.mp3",
     "/blue.mp3",
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);
  const clickTimer = useRef(null);

  // 1. Auto-play Logic: Pehle interaction par music on karne ke liye
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => console.log("Interaction required for audio"));
        
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('scroll', handleFirstInteraction);
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [isPlaying]);

  // 2. Single vs Double Click Handling
  // Browser me single aur double click conflict karte hain, isliye timer zaroori hai
  const handleToggle = () => {
    if (clickTimer.current) {
      // Agar dusra click jaldi aa gaya toh ye double click hai
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      handleNextSong();
    } else {
      // Single click ke liye thoda wait karo dekhne ke liye ki dusra click aata hai ya nahi
      clickTimer.current = setTimeout(() => {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
        clickTimer.current = null;
      }, 250); // 250ms ka delay double click detect karne ke liye
    }
  };

  const handleNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  // Jab index change ho toh naya gaana bajao
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  return (
    <div className="music-wrapper">
      <p className="music-hint">
        {isPlaying ? 'Double tap to change • Click to off' : 'Click to play music'}
      </p>
      
      <button 
        className={`music-fab ${isPlaying ? 'playing' : ''}`} 
        onClick={handleToggle}
      >
        <audio 
          ref={audioRef} 
          src={songs[currentSongIndex]} 
          loop={false}
          onEnded={handleNextSong} // Gaana khatam hone par auto-next
        />
        
        {!isPlaying ? (
          <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <div className="mini-visualizer">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default MusicButton;