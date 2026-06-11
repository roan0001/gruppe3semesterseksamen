"use client";

import { useState } from "react";
import Image from "next/image";
import { FaTwitter, FaFacebook } from "react-icons/fa";

const ReviewContainer = ({ testimonials }) => {
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
  const [current, setCurrent] = useState(0);
  const testimonial = safeTestimonials[current] || {};

  return (
    <section
      className="w-full max-w-[2200px] mx-auto py-16 flex flex-col items-center text-white text-center px-6 relative"
      style={{
        backgroundImage: "url('/backgrounds/footerbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/90" />

      <div className="relative z-9 flex flex-col items-center w-full">
        <div className="relative w-32 h-32 overflow-hidden mb-4">{testimonial.asset?.url && <Image src={`${process.env.NEXT_PUBLIC_API_URL}${testimonial.asset.url}`} alt={testimonial.asset?.alt || `Photo of ${testimonial.name || "reviewer"}`} fill className="object-cover" />}</div>

        <p className="text-white font-extrabold tracking-widest text-sm mb-4 uppercase">{testimonial.name || "Unknown"}</p>
        <p className="text-gray-300 font-regular text-xs leading-relaxed max-w-2xl mb-6">{testimonial.content || "No testimonial available."}</p>

        <div className="flex gap-4 mb-8">
          {testimonial.facebook && (
            <a href={testimonial.facebook} target="_blank" aria-label={`${testimonial.name || "Reviewer"} on Facebook`} className="text-gray-400 border border-white p-2 flex items-center justify-center hover:text-pink-500 hover:border-pink-500 transition-colors duration-200">
              <FaFacebook size={18} />
            </a>
          )}

          {testimonial.twitter && (
            <a href={testimonial.twitter} target="_blank" aria-label={`${testimonial.name || "Reviewer"} on Twitter`} className="text-gray-400 border border-white p-2 flex items-center justify-center hover:text-nightclub-pink hover:border-nightclub-pink transition-colors duration-200">
              <FaTwitter size={18} />
            </a>
          )}
        </div>

        <div className="flex gap-2" role="group" aria-label="Testimonial navigation">
          {safeTestimonials.map((t, index) => (
            <button key={index} onClick={() => setCurrent(index)} aria-label={`View testimonial from ${t.name || `reviewer ${index + 1}`}`} aria-current={current === index ? "true" : undefined} className={`w-3 h-3 transition-colors duration-300 ${current === index ? "bg-nightclub-pink" : "bg-white hover:bg-gray-400"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewContainer;
