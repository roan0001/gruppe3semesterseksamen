"use client";
import PinkFrame from "@/components/(H_GlobalComponents)/PinkFrame";

export default function MusikListe({ tracks, onSelect, currentTrack }) {
  const currentIndex = tracks.findIndex((t) => t.title === currentTrack?.title);

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    onSelect(tracks[prevIndex]);
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % tracks.length;
    onSelect(tracks[nextIndex]);
  };

  return (
    <>
      <div className="flex flex-col items-center w-full md:hidden">
        <div className="relative w-48 aspect-square">
          <img src={currentTrack?.image} alt={currentTrack?.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 pointer-events-none">
            <PinkFrame />
          </div>
        </div>

        <div className="flex gap-6 mb-4 mt-4">
          <button onClick={goPrev} aria-label="Previous track" className="px-5 py-3 bg-black border border-white text-white hover:bg-gray-700 transition">
            ◀
          </button>
          <button onClick={goNext} aria-label="Next track" className="px-5 py-3 bg-black border border-white text-white hover:bg-gray-700 transition">
            ▶
          </button>
        </div>
      </div>

      <div className="hidden md:flex flex-row items-center justify-center pt-0">
        <button onClick={goPrev} aria-label="Previous track" className="mr-2 px-3 py-2 bg-black border border-white text-white hover:bg-gray-700 transition shrink-0">
          ◀
        </button>

        <div className="flex flex-row flex-1 justify-center min-w-0">
          {tracks.map((track, i) => {
            const isSelected = currentTrack?.title === track.title;
            return (
              <div key={i} role="button" tabIndex={0} aria-label={`Select track: ${track.title}`} aria-pressed={isSelected} onClick={() => onSelect(track)} onKeyDown={(e) => e.key === "Enter" && onSelect(track)} className="flex flex-col items-center cursor-pointer flex-1 min-w-0">
                <div className="relative w-full aspect-square group">
                  <img src={track.image} alt={track.title} className="w-full h-full object-cover shadow" />
                  <div className={`absolute z-10 inset-0 transition-opacity duration-300 pointer-events-none scale-y-[-1] ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    <PinkFrame />
                  </div>
                  <div className={`absolute bottom-0 left-0 w-full bg-black/60 text-white text-xs py-1 px-2 transition-opacity duration-300 truncate ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>{track.title}</div>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={goNext} aria-label="Next track" className="ml-2 px-3 py-2 bg-black border border-white text-white hover:bg-gray-700 transition shrink-0">
          ▶
        </button>
      </div>
    </>
  );
}
