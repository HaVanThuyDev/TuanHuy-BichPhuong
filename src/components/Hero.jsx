import React, { useState, useEffect } from 'react';
import { ChevronDown, Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = weddingData.heroImages;

  // Background slideshow effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden">
      {/* Background Slideshow with Ken Burns Effect */}
      {heroImages.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt="Tuấn Huy & Bích Phương Wedding Background"
            className={`w-full h-full object-cover object-center ${
              idx === currentSlide ? 'animate-kenburns' : ''
            }`}
          />
          {/* Subtle gradient: only dark at the very top for header contrast, completely clear in center/bottom to see faces */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-transparent to-stone-950/75 pointer-events-none" />
        </div>
      ))}

      {/* Top Section: Invitation Title & Couple Names (Kept at top so face is 100% visible) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-24 sm:pt-28 flex flex-col items-center">
        {/* Invitation Subtitle */}
        <p className="font-alex text-2xl sm:text-3xl text-rose-200 tracking-wide mb-1 font-normal drop-shadow-md animate-fade-in">
          Trân trọng kính mời tới dự lễ cưới của
        </p>

        {/* Couple Names - Elegant & Clean */}
        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-cursive font-normal text-rose-50 text-shadow-lg tracking-wide leading-tight">
          Tuấn Huy
          <span className="inline-block mx-2 sm:mx-3 text-amber-300 font-serif text-2xl sm:text-5xl">&</span>
          Bích Phương
        </h1>

        <p className="font-serif italic text-xs sm:text-sm text-stone-200 tracking-wider font-light mt-1 text-shadow">
          "Hạnh phúc là khi tìm thấy một người để cùng già đi"
        </p>
      </div>

      {/* Center Area: Intentionally completely empty to let bride & groom's faces shine brightly! */}
      <div className="flex-1 min-h-[180px] pointer-events-none"></div>

      {/* Bottom Area of Hero: Gentle Call-to-Scroll Bar */}
      <div className="relative z-10 pb-8 sm:pb-10 text-center flex flex-col items-center">
        {/* Slide indicator dots */}
        <div className="flex justify-center items-center gap-1.5 mb-3">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all rounded-full ${
                idx === currentSlide
                  ? 'w-6 h-1.5 bg-amber-300'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ảnh ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll prompt button */}
        <a
          href="#countdown"
          className="inline-flex items-center gap-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs text-white/90 transition-all hover:scale-105 active:scale-95 shadow-lg group"
        >
          <span>Xem Ngày Cưới & Sự Kiện</span>
          <ChevronDown className="w-4 h-4 text-amber-300 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
