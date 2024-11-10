// VideoPlayer.tsx
import React from "react";
import ReactDOM from "react-dom";

type VideoPlayerProps = {
  onBack: () => void;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onBack }) => {
    const videoPlayerContent = (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="relative w-auto h-auto">
          <iframe
            width="800"
            height="500"
            src="https://www.youtube.com/embed/_eRs55eqvtg?autoplay=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
  
          <button
            onClick={onBack}
            className="absolute top-10 left-10 bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    );

  

  const container = document.getElementById("landing-page-container");
  if (!container) return null;

  return ReactDOM.createPortal(videoPlayerContent, container);
};

export default VideoPlayer;
