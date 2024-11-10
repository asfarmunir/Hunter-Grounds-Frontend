"use client";
import React, { useState } from "react";
import { Play, Pause } from "lucide-react";

const VideoHeroSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const thumbnailImage = "/images/VideoPlayer.svg";
  const backgroundImage = "/images/VideoPlayer.svg";

  const handlePlayPause = () => {
    const video = document.getElementById(
      "heroVideo"
    ) as HTMLVideoElement | null;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <div className="relative w-full h-screen">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {showVideo ? (
          // Video Player
          <div className="relative w-full h-full">
            <video
              id="heroVideo"
              className="absolute inset-0 w-full h-full object-cover"
              poster={thumbnailImage}
              playsInline
            >
              <source src="YOUR_VIDEO_URL_HERE" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 
                     bg-white hover:bg-white rounded-full p-4 backdrop-blur-sm
                     transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-black" />
              ) : (
                <Play className="w-8 h-8 text-black" />
              )}
            </button>
          </div>
        ) : (
          // Background Image
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            {/* Play Button on Image */}
            <button
              onClick={() => setShowVideo(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 
                     bg-white hover:bg-white rounded-full p-4 backdrop-blur-sm
                     transition-all duration-300"
            >
              <Play className="w-8 h-8 text-black" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoHeroSection;
