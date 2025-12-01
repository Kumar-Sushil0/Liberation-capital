import { useState, useRef } from 'react';

export const useVideoControls = () => {
  const [videoStates, setVideoStates] = useState({});
  const videoRefs = useRef([]);

  const togglePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play();
      setVideoStates(prev => ({
        ...prev,
        [index]: { ...prev[index], isPlaying: true }
      }));
    } else {
      video.pause();
      setVideoStates(prev => ({
        ...prev,
        [index]: { ...prev[index], isPlaying: false }
      }));
    }
  };

  const updateProgress = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    const progress = (video.currentTime / video.duration) * 100;
    setVideoStates(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        progress,
        currentTime: video.currentTime
      }
    }));
  };

  const updateDuration = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    setVideoStates(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        duration: video.duration
      }
    }));
  };

  const seekVideo = (index, e) => {
    const video = videoRefs.current[index];
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    video.currentTime = percentage * video.duration;
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    videoStates,
    setVideoStates,
    videoRefs,
    togglePlayPause,
    updateProgress,
    updateDuration,
    seekVideo,
    formatTime
  };
};

