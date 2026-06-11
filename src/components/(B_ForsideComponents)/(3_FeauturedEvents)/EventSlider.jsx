"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PinkFrame from "@/components/(H_GlobalComponents)/PinkFrame";

export default function EventSlider({ events = [] }) {
  const [current, setCurrent] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const update = () => {
      setItemsToShow(window.innerWidth > 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!events.length) return <p className="text-white">No events found.</p>;

  const totalSlides = Math.ceil(events.length / itemsToShow);

  const handleCardClick = (eventId) => {
    setActiveId((prev) => (prev === eventId ? null : eventId));
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.slice(current * itemsToShow, current * itemsToShow + itemsToShow).map((event) => {
          const isActive = activeId === event.id;

          return (
            <div key={event.id} className="relative aspect-[4/3] w-full group overflow-hidden border border-gray-800 cursor-pointer bg-pink-900" onClick={() => handleCardClick(event.id)} role="button" tabIndex={0} aria-label={`${event.title} — tap for info`} onKeyDown={(e) => e.key === "Enter" && handleCardClick(event.id)}>
              <Image src={`${process.env.NEXT_PUBLIC_API_URL}${event.asset.url}`} alt={event.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />

              <div className={`absolute inset-x-0 top-0 bottom-[48px] z-20 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}`}>
                <div className="absolute inset-0 z-30 pointer-events-none scale-y-[-1]">
                  <PinkFrame />
                </div>

                <div className="absolute inset-0 flex flex-col">
                  <div className="flex-1 bg-transparent flex items-center justify-center">
                    <Link href={`/BookTable?eventId=${event.id}`} className="bg-nightclub-pink text-white text-xs font-bold tracking-widest px-7 py-4 hover:bg-nightclub-pink/80 transition-colors pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                      BOOK NOW
                    </Link>
                  </div>

                  <div className="flex-1 bg-black/80 p-6 flex flex-col justify-end">
                    <h3 className="text-white font-bold tracking-widest text-lg mb-2 translate-y-[-6px]">{event.title}</h3>
                    <p className="hidden md:block text-gray-300 text-xs leading-relaxed mb-3 translate-y-[-6px]">{event.excerpt}</p>
                    <p className="text-nightclub-pink text-xs translate-y-[-6px]">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {event.location}
                    </p>
                  </div>
                </div>
              </div>

              {!isActive && (
                <div className="md:hidden absolute inset-x-0 top-0 bottom-[48px] z-20 flex items-center justify-center">
                  <span className="bg-black/50 text-white text-[10px] tracking-widest uppercase px-3 py-1.5 rounded">Tap for info</span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 h-[48px] bg-nightclub-pink px-4 py-2 flex justify-between items-center z-40">
                <span className="text-white text-xs font-bold tracking-widest">{event.title}</span>
                <span className="text-white text-xs">
                  {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {new Date(event.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-8 md:hidden">
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              setActiveId(null);
            }}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={current === i ? "true" : undefined}
            className={`w-3 h-3 transition-colors duration-300 ${current === i ? "bg-nightclub-pink" : "bg-gray-500 hover:bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
