"use client";

import { useState } from "react";
import PinkFrame from "@/components/(H_GlobalComponents)/PinkFrame";

const WelcomeClubCard = ({ image, title, text, icon: Icon, iconImage }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="group relative w-full h-[320px] sm:h-[380px] lg:h-[460px] overflow-hidden shadow-md cursor-pointer" onClick={() => setIsActive(!isActive)}>
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 " />

      <div
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300
        ${isActive ? "opacity-100" : "opacity-0"}
        md:opacity-0 md:group-hover:opacity-100`}
      >
        <PinkFrame />
      </div>

      <div
        className={`absolute inset-0 z-10 bg-black/90 flex flex-col justify-center items-center text-center p-6 gap-4 transition-opacity duration-300
        ${isActive ? "opacity-100" : "opacity-0"}
        md:opacity-0 md:group-hover:opacity-100`}
      >
        {Icon && <Icon className="w-16 h-16 text-nightclub-pink text-5xl p-3 border-2 border-nightclub-pink rounded-lg bg-transparent" />}
        {iconImage && <img src={iconImage} alt="Icon" className="w-16 h-16 p-3 border-2 border-nightclub-pink rounded-lg bg-transparent object-contain" />}
        <h3 className="text-white !text-base font-bold uppercase md:scale-50 md:group-hover:scale-100 md:opacity-0 md:group-hover:opacity-100 md:transition-all md:duration-1000">{title}</h3>

        <p className="text-white/90 text-sm md:opacity-0 md:group-hover:opacity-100 md:translate-x-10 md:group-hover:translate-x-0 md:transition-all md:duration-700 md:delay-200">{text}</p>
      </div>
    </div>
  );
};

export default WelcomeClubCard;
