import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";
import { useState, useRef, useEffect } from "react";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();
  const [showInterestGroups, setShowInterestGroups] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.play().catch(console.error);
      setIsAudioPlaying(true);
    }
  }, [play]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        audioRef.current.play().catch(console.error);
        setIsAudioPlaying(true);
      }
    }
  };
  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        src="https://www.bensound.com/bensound-music/bensound-tenderness.mp3"
      />
      
      {play && (
        <button 
          className="audio-control"
          onClick={toggleAudio}
          aria-label={isAudioPlaying ? "Pause audio" : "Play audio"}
        >
          <div className={`audio-icon ${isAudioPlaying ? "playing" : "paused"}`}>
            {isAudioPlaying ? "⏸️" : "▶️"}
          </div>
        </button>
      )}

      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">
            SYCAMORE
            <div className="spinner">
              <div className="spinner__image" />
            </div>
          </h1>
          <p className="intro__scroll">Scroll to begin the journey</p>
          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            Begin
          </button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <div className="outro-content">
          <p className="outro__text"> The Church Beyond Four Walls is You, Me, Us, - it is as much my church, as it is - your church.</p>
          
          {!showInterestGroups && (
            <button
              className="interest-groups-btn"
              onClick={() => {
                console.log("Interest groups button clicked, current state:", showInterestGroups);
                setShowInterestGroups(true);
              }}
            >
              View Interest Groups
            </button>
          )}

          {showInterestGroups && (
            <div className="interest-groups">
              <h2>Interest Groups</h2>
              
              <div className="groups-grid">
                <div className="group-category">
                  <h3>Relationship & Family Life</h3>
                  <p className="schedule">Starts Wednesday 25th June, 7:30 pm, Online</p>
                  <ul>
                    <li>Dating with Meaning</li>
                    <li>Married For Less Than 3 years</li>
                    <li>Planning Our Marriage in the next 6 months</li>
                    <li>30+ Single Men</li>
                    <li>Parenting towards teen aging (kids from 8 years)</li>
                    <li>25 - 29 Single Ladies</li>
                    <li>Single and not ready</li>
                    <li>Married for 3 - 7 years</li>
                    <li>Preggies & New Moms (kids 3 year and below) - Friday 12 - 1pm, online</li>
                  </ul>
                </div>

                <div className="group-category">
                  <h3>Career</h3>
                  <p className="schedule">Starts Sunday 29th June - 7:30 pm, Online</p>
                  <ul>
                    <li>Techies, Creatives and Freelancers</li>
                    <li>Business Owners (with up to 3 employees)</li>
                    <li>Academic Focus & Upgrade</li>
                    <li>Productivity at Work Booster</li>
                    <li>Finance & Investment</li>
                  </ul>
                </div>

                <div className="group-category">
                  <h3>Faith, Ministry & Calling</h3>
                  <ul>
                    <li>Purpose Discovery Hub - starts Monday, 30th June, 5:30pm at the Mini Hall</li>
                    <li>Prayer / Intercessors Gang - Thursdays 5:30 pm at the Mini Hall</li>
                    <li>Acts of the Apostles Bible Study Group - starts Thursday, 26th June, 7 - 8 pm, Online</li>
                    <li>Book Reading Club - starts Thursday, 26th June, 7 - 8 pm, Online</li>
                  </ul>
                </div>

                <div className="group-category">
                  <h3>General Life</h3>
                  <p className="schedule">Starts Saturday 28th June, 7 - 8 am, Online</p>
                  <ul>
                    <li>Sports & Fitness (Aerobics, Workout) - (Saturday- 7:30 am- church premises)</li>
                    <li>Home Management, Food and Recipes</li>
                    <li>Leadership Boost</li>
                    <li>Health and Well Being (Inc. Mental Health Boost)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
