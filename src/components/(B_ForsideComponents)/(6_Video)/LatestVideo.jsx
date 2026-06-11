"use client";
import { useState, useRef, useEffect } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import H2 from "@/components/(A_NavigationComponent)/(Titles)/H2";
import PinkFrame from "@/components/(H_GlobalComponents)/PinkFrame";

export default function LatestVideo() {
  const videos = [
    { src: "/media/video-crowd.mp4", thumb: "/contentImg/video_poster.jpg" },
    { src: "/media/video-dj-crowd-2.mp4", thumb: "/contentImg/video_poster.jpg" },
    { src: "/media/video-dj-crowd1.mp4", thumb: "/contentImg/video_poster.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState("0:00");
  const videoRef = useRef(null);

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current?.pause();
      videoRef.current?.load();
    }
  }, [currentIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      const remaining = video.duration - video.currentTime;
      if (!isNaN(remaining)) {
        const minutes = Math.floor(remaining / 60);
        const seconds = Math.floor(remaining % 60)
          .toString()
          .padStart(2, "0");
        setTimeLeft(`${minutes}:${seconds}`);
      }
    };

    video.addEventListener("timeupdate", updateTime);
    return () => video.removeEventListener("timeupdate", updateTime);
  }, [currentIndex]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-16 relative max-w-[1200px] mx-auto">
      <H2>LATEST VIDEO</H2>

      <div className="relative w-full h-[200px] sm:h-[280px] md:h-[360px] lg:w-[900px] lg:h-[500px] overflow-hidden">
        {!isPlaying && (
          <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer" onClick={togglePlay} role="button" aria-label="Play video" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && togglePlay()}>
            <img src={videos[currentIndex].thumb} className="w-full h-full object-cover" alt="Video thumbnail" />
            <img src="/icon/Play_btn.svg" className="absolute w-20 h-20" alt="" aria-hidden="true" />
          </div>
        )}

        <video key={currentIndex} ref={videoRef} className="w-full h-full object-cover cursor-pointer z-40" muted playsInline controls={false} onClick={togglePlay} aria-label={`Video ${currentIndex + 1} of ${videos.length}`}>
          <source src={videos[currentIndex].src} type="video/mp4" />
        </video>

        <div className="absolute inset-0 pointer-events-none z-20">
          <PinkFrame />
        </div>

        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-1 rounded text-sm z-60" aria-live="off">
          {timeLeft}
        </div>
      </div>

      <div className="flex gap-4 mt-6 relative z-20 items-center">
        <button onClick={() => setCurrentIndex((i) => (i - 1 + videos.length) % videos.length)} aria-label="Previous video" className="px-2 py-2 bg-black border border-white text-white hover:bg-gray-700 transition">
          <BiSolidLeftArrow />
        </button>

        {videos.map((_, i) => {
          const pageNum = i + 1;
          return (
            <button key={pageNum} onClick={() => setCurrentIndex(i)} aria-label={`Go to video ${pageNum}`} aria-current={currentIndex === i ? "true" : undefined} className={`hover:text-pink-500 ${currentIndex === i ? "text-pink-500" : "text-white"}`}>
              {pageNum}
            </button>
          );
        })}

        <button onClick={() => setCurrentIndex((i) => (i + 1) % videos.length)} aria-label="Next video" className="px-2 py-2 bg-black border border-white text-white hover:bg-gray-700 transition">
          <BiSolidRightArrow />
        </button>
      </div>
    </div>
  );
}
