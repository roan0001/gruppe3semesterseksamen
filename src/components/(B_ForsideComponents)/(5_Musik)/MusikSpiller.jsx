"use client";

import { useRef, useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/app/audio-player.css";
import { FaBackward, FaForward, FaRandom, FaPause } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";

export default function MusikSpiller({ track }) {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    const audio = playerRef.current?.audio?.current;
    if (!audio) return;
    const onLoaded = () => {
      setMaxDuration(audio.duration);
      setDuration(formatTime(audio.duration));
    };
    audio.addEventListener("loadedmetadata", onLoaded);
    return () => audio.removeEventListener("loadedmetadata", onLoaded);
  }, [track]);

  const togglePlay = () => {
    const audio = playerRef.current.audio.current;
    audio.paused ? audio.play() : audio.pause();
  };

  return (
    <>
      {/* Skjult AudioPlayer */}
      <div className="hidden">
        <AudioPlayer
          ref={playerRef}
          src={track.src}
          autoPlay={false}
          showJumpControls={false}
          customAdditionalControls={[]}
          customControlsSection={[]}
          customVolumeControls={[]}
          customProgressBarSection={[]}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onListen={(e) => {
            setCurrentTime(formatTime(e.target.currentTime));
            setProgress(e.target.currentTime);
          }}
        />
      </div>

      {/* ── MOBIL + TABLET layout — under md ── */}
      <div className="flex md:hidden flex-col items-center w-full text-white px-4 pb-4">
        <h3 className="text-sm font-semibold mb-3 tracking-widest uppercase text-center">{track.title}</h3>

        <input
          type="range"
          min="0"
          max={maxDuration || 0}
          value={progress}
          aria-label="Seek"
          onChange={(e) => {
            const val = Number(e.target.value);
            playerRef.current.audio.current.currentTime = val;
            setProgress(val);
          }}
          className="w-full h-1 bg-gray-700 rounded-lg accent-nightclub-pink cursor-pointer mb-2"
        />

        <div className="flex justify-between w-full text-xs text-gray-400 mb-4">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>

        <div className="flex items-center justify-center gap-6 mb-4">
          <button aria-label="Rewind 5 seconds" onClick={() => (playerRef.current.audio.current.currentTime -= 5)} className="hover:text-nightclub-pink transition-colors">
            <FaBackward size={20} />
          </button>
          <button aria-label={isPlaying ? "Pause" : "Play"} onClick={togglePlay} className="w-14 h-14 flex items-center justify-center hover:text-nightclub-pink transition-colors">
            {isPlaying ? <FaPause size={36} /> : <FaRegCirclePlay size={36} />}
          </button>
          <button aria-label="Forward 5 seconds" onClick={() => (playerRef.current.audio.current.currentTime += 5)} className="hover:text-nightclub-pink transition-colors">
            <FaForward size={20} />
          </button>
          <button aria-label="Shuffle" className="hover:text-nightclub-pink transition-colors">
            <FaRandom size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 w-full justify-center">
          <span className="text-xs text-gray-400" aria-hidden="true">
            🔊
          </span>
          <input type="range" min="0" max="1" step="0.01" defaultValue={1} aria-label="Volume" onChange={(e) => (playerRef.current.audio.current.volume = e.target.value)} className="w-40 h-1 bg-gray-700 rounded-lg accent-nightclub-pink cursor-pointer" />
        </div>
      </div>

      {/* ── DESKTOP layout — fra md og op ── */}
      <div className="hidden md:flex items-center gap-4 border rounded-lg w-full overflow-hidden">
        <img src={track.image} alt={track.title} className="w-40 h-40 lg:w-52 lg:h-52 object-cover flex-shrink-0" />

        <div className="flex flex-col flex-1 text-white pr-3 min-w-0">
          <h3 className="text-sm font-semibold mb-2 truncate">{track.title}</h3>

          <input
            type="range"
            min="0"
            max={maxDuration || 0}
            value={progress}
            aria-label="Seek"
            onChange={(e) => {
              const val = Number(e.target.value);
              playerRef.current.audio.current.currentTime = val;
              setProgress(val);
            }}
            className="w-full h-1 bg-gray-700 rounded-lg accent-nightclub-pink cursor-pointer"
          />

          <div className="flex items-center justify-between mt-2 w-full gap-2">
            <span className="text-xs shrink-0">{currentTime}</span>

            <div className="flex items-center gap-2">
              <button aria-label="Rewind 5 seconds" onClick={() => (playerRef.current.audio.current.currentTime -= 5)} className="hover:text-nightclub-pink transition-colors">
                <FaBackward size={18} />
              </button>
              <button aria-label={isPlaying ? "Pause" : "Play"} onClick={togglePlay} className="w-10 h-10 flex items-center justify-center hover:text-nightclub-pink transition-colors">
                {isPlaying ? <FaPause size={28} /> : <FaRegCirclePlay size={28} />}
              </button>
              <button aria-label="Forward 5 seconds" onClick={() => (playerRef.current.audio.current.currentTime += 5)} className="hover:text-nightclub-pink transition-colors">
                <FaForward size={18} />
              </button>
              <button aria-label="Shuffle" className="hover:text-nightclub-pink transition-colors">
                <FaRandom size={18} />
              </button>
            </div>

            <input type="range" min="0" max="1" step="0.01" defaultValue={1} aria-label="Volume" onChange={(e) => (playerRef.current.audio.current.volume = e.target.value)} className="w-16 lg:w-24 h-1 bg-gray-700 rounded-lg accent-nightclub-pink cursor-pointer shrink-0" />
          </div>
        </div>
      </div>
    </>
  );
}
