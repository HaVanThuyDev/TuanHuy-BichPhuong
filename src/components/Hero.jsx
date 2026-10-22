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
          {/* Subtle gradient vignette: very light on top so faces are crystal clear, gentle gradient at the bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/10 to-stone-950/40 pointer-events-none" />
        </div>
      ))}

      {/* Top Area: Completely empty & transparent so faces of bride & groom are 100% visible */}
      <div className="h-28 sm:h-32 pointer-events-none"></div>

      {/* Circled Red Area: Placed at waist/lower-middle of photo */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center text-white my-auto flex flex-col items-center">
        {/* Invitation text */}
        <p className="font-alex text-xl sm:text-2xl text-rose-200 tracking-wide mb-1 font-normal drop-shadow">
          Trân trọng kính mời tới dự lễ cưới của
        </p>

        {/* Couple Names - Placed exactly in the circled area */}
        <h1 className="text-4xl xs:text-5xl sm:text-6xl font-cursive font-normal text-rose-50 text-shadow-lg tracking-wide leading-tight">
          Tuấn Huy
          <span className="inline-block mx-2.5 text-amber-300 font-serif text-2xl sm:text-4xl">&</span>
          Bích Phương
        </h1>

        <p className="font-serif italic text-xs sm:text-sm text-stone-200 tracking-wider font-light mt-1.5 text-shadow">
          "Hạnh phúc là khi tìm thấy một người để cùng già đi"
        </p>
      </div>

      {/* Bottom Controls */}
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

        {/* Scroll button to Countdown & Events */}
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
