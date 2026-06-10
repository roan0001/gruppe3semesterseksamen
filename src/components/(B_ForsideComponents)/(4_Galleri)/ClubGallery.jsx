"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import H2 from "@/components/(A_NavigationComponent)/(Titles)/H2";
import { container, item } from "@/components/(B_ForsideComponents)/(4_Galleri)/galleryAnimations";

export default function ClubGallery() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [gallery, setGallery] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    fetch(`${baseUrl}/gallery`)
      .then((res) => res.json())
      .then((data) => setGallery(Array.isArray(data) ? data.slice(0, 8) : []));
  }, [baseUrl]);

  const selectedImg = selectedIndex !== null ? gallery[selectedIndex] : null;

  const goNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % gallery.length);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const carouselNext = () => setCarouselIndex((prev) => (prev + 1) % gallery.length);
  const carouselPrev = () => setCarouselIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  if (!gallery.length) return null;

  return (
    <div className="flex flex-col items-center mt-10 w-full mb-16 max-w-[2200px] mx-auto">
      <H2>NIGHT CLUB GALLERY</H2>

      <div className="md:hidden w-full mt-6">
        <div className="relative w-full aspect-[4/3]">
          <img src={`${baseUrl}${gallery[carouselIndex]?.asset?.url}`} alt={gallery[carouselIndex]?.asset?.alt || "Gallery image"} className="w-full h-full object-cover" />

          <div className="flex justify-center gap-2 mt-3">
            {gallery.map((_, i) => (
              <button key={i} onClick={() => setCarouselIndex(i)} className={`w-3 h-3 transition-colors duration-300 m-2 ${carouselIndex === i ? "bg-nightclub-pink" : "bg-white/50"}`} />
            ))}
          </div>
        </div>
      </div>

      <motion.div className="hidden md:grid grid-cols-4 w-full mt-6" variants={container} initial="hidden" whileInView="show" viewport={{ amount: 0.2, once: true }}>
        {gallery.map((img, index) => (
          <motion.div key={img.id} variants={item} className="relative cursor-pointer aspect-[4/3] overflow-hidden" onClick={() => setSelectedIndex(index)}>
            <img src={`${baseUrl}${img.asset?.url}`} alt={img.asset?.alt || "Gallery image"} className="w-full h-full object-cover" />

            <motion.div className="absolute inset-0 flex items-center justify-center border-t-2 border-b-2 border-nightclub-pink" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="absolute inset-0 bg-black opacity-70" />
              <div className="absolute top-0 left-0 w-0 h-0" style={{ borderTop: "30px solid oklch(65% 0.23 10)", borderRight: "30px solid transparent" }} />
              <div className="absolute bottom-0 right-0 w-0 h-0" style={{ borderBottom: "30px solid oklch(65% 0.23 10)", borderLeft: "30px solid transparent" }} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {selectedImg && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedIndex(null)}>
          <div className="relative flex flex-col items-center bg-black w-fit max-w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={goPrev} className="absolute -left-20 top-1/2 -translate-y-1/2 text-white border-2 border-white w-12 h-12 flex items-center justify-center hover:bg-nightclub-pink hover:border-nightclub-pink transition-colors z-20">
              ◀
            </button>

            <img src={selectedImg.asset ? `${baseUrl}${selectedImg.asset.url}` : selectedImg.url} className="w-full max-w-[600px] h-auto max-h-[65vh] object-contain block shadow-xl" alt="Selected" />

            <div className="text-center mt-6 mb-4 px-4">
              <h2 className="text-white text-xl font-bold uppercase">NIGHTCLUB EXPERIENCE</h2>
              <p className="text-white text-sm mt-1">This is our nightclub gallery.</p>
            </div>

            <button onClick={goNext} className="absolute -right-20 top-1/2 -translate-y-1/2 text-white border-2 border-white w-12 h-12 flex items-center justify-center hover:bg-nightclub-pink hover:border-nightclub-pink transition-colors">
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
