"use client";

import { useEffect, useRef, useState } from "react";

interface HeroBannerProps {
  videoSrc: string;
  videoType?: string;
  overlayOpacity?: number;
}

export default function HeroBanner({ 
  videoSrc, 
  videoType = "video/mp4",
  overlayOpacity = 0.3 
}: HeroBannerProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const bannerVideoRef = useRef<HTMLVideoElement>(null);

  const toggleBannerVideo = () => {
    if (bannerVideoRef.current) {
      if (isVideoPlaying) {
        bannerVideoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        bannerVideoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  useEffect(() => {
    const video = bannerVideoRef.current;
    if (!video) return;

    const handlePause = () => setIsVideoPlaying(false);
    const handlePlay = () => setIsVideoPlaying(true);

    video.addEventListener('pause', handlePause);
    video.addEventListener('play', handlePlay);

    return () => {
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('play', handlePlay);
    };
  }, []);



  return (
    <div className="absolute inset-0 cursor-pointer" onClick={toggleBannerVideo}>
      <video
        ref={bannerVideoRef}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type={videoType} />
      </video>
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black pointer-events-none" 
        style={{ opacity: overlayOpacity }}
        aria-hidden="true" 
      />
      
      {/* Play button - shown when video is paused */}
      <div className={`absolute inset-0 bg-black flex items-center justify-center z-10 pointer-events-none transition-opacity duration-700 ${
        isVideoPlaying ? 'opacity-0' : 'opacity-100'
      }`}>
        <svg
          width="120"
          height="120"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#00E87B"
          className="drop-shadow-2xl"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
        </svg>
      </div>
    </div>
  );
}
