import Image from "next/image";
import Button from "@/components/(H_GlobalComponents)/Btn";

const EventCard = ({ slug, title, date, location, excerpt, image }) => {
  return (
    <article className="flex flex-col lg:flex-row lg:even:flex-row-reverse lg:h-[350px] max-w-[2200px] mx-auto">
      {/* Billede */}
      <div className="relative w-full lg:w-1/2 h-[220px] lg:h-full">
        <Image src={image} alt={title} fill className="object-cover object-top" />
      </div>

      {/* Tekst */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center bg-black">
        <h2 className="text-white text-xl lg:text-2xl font-bold tracking-widest mb-3">{title}</h2>
        <p className="text-nightclub-pink text-sm tracking-widest mb-1">
          {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {new Date(date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} <span className="text-white">| {location}</span>
        </p>

        <p className="text-gray-300 text-sm leading-relaxed mt-4 mb-0">{excerpt}</p>

        <div className="w-fit pl-5">
          <Button href={`/detailview/${slug}`} label="READ MORE" />
        </div>
      </div>
    </article>
  );
};

export default EventCard;
