import React, { useState, useEffect } from 'react';
import { Heart, Calendar, ChevronDown, Sparkles, MapPin } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Hero({ onOpenGiftModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const heroImages = weddingData.heroImages;

  // Background slideshow effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Countdown calculation
  useEffect(() => {
    const targetDate = new Date(weddingData.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
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
          {/* Subtle gradient vignette overlays for luxury cinematic look */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/50 to-stone-950/70" />
          <div className="absolute inset-0 bg-rose-950/20 backdrop-brightness-90" />
        </div>
      ))}

      {/* Decorative luxury corners for mobile/desktop (Wedding Invitation Card Feel) */}
      <div className="absolute inset-4 sm:inset-8 border border-amber-300/25 rounded-3xl pointer-events-none z-10 hidden sm:block">
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-300/60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-300/60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-300/60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-300/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white py-20 sm:py-28 flex flex-col items-center justify-center min-h-[100dvh]">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-md px-3.5 sm:px-5 py-1.5 rounded-full border border-amber-300/30 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium mb-4 sm:mb-6 text-amber-200 shadow-xl animate-fade-in">
          <Sparkles className="w-3 h-3 text-amber-300 animate-spin-slow" />
          <span>Save The Date • Lễ Thành Hôn</span>
          <Sparkles className="w-3 h-3 text-amber-300 animate-spin-slow" />
        </div>

        {/* Invitation Text */}
        <p className="font-alex text-2xl sm:text-3xl text-rose-200 tracking-wide mb-1 font-normal drop-shadow">
          Trân trọng kính mời tới dự lễ cưới của
        </p>

        {/* Couple Names - Highly Optimized for Mobile Screen */}
        <div className="space-y-1 mb-4 sm:mb-6">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-cursive font-normal text-rose-50 text-shadow-lg tracking-wide leading-tight">
            Tuấn Huy
            <span className="inline-block mx-2 sm:mx-3 text-amber-300 font-serif text-2xl sm:text-5xl">&</span>
            Bích Phương
          </h1>
          <p className="font-serif italic text-xs sm:text-base text-stone-200 tracking-wider font-light max-w-md mx-auto px-2">
            "Hạnh phúc là khi tìm thấy một người để cùng già đi"
          </p>
        </div>

        {/* Wedding Date Display Card */}
        <div className="bg-stone-950/50 backdrop-blur-md border border-amber-300/30 rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3 mb-6 max-w-sm sm:max-w-md w-full shadow-2xl">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-amber-200 text-xs sm:text-base font-serif tracking-widest uppercase">
            <span className="font-medium text-stone-300">{weddingData.dateFormatted.dayOfWeek}</span>
            <span className="w-1 h-1 rounded-full bg-amber-300"></span>
            <span className="font-bold text-white text-sm sm:text-lg">{weddingData.dateFormatted.solar}</span>
            <span className="w-1 h-1 rounded-full bg-amber-300"></span>
            <span className="font-medium text-amber-300">{weddingData.dateFormatted.time}</span>
          </div>
          <div className="text-[11px] text-stone-300/80 font-light mt-1 text-center">
            (Tức ngày {weddingData.dateFormatted.lunar})
          </div>
        </div>

        {/* Live Countdown Timer (Perfect 4-grid for mobile touch) */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3.5 mb-6 w-full max-w-[340px] sm:max-w-md">
          {[
            { label: 'Ngày', value: timeLeft.days },
            { label: 'Giờ', value: timeLeft.hours },
            { label: 'Phút', value: timeLeft.minutes },
            { label: 'Giây', value: timeLeft.seconds }
          ].map((item) => (
            <div
              key={item.label}
              className="bg-stone-900/70 backdrop-blur-md border border-amber-200/30 rounded-xl sm:rounded-2xl py-2 px-1 text-center shadow-lg relative overflow-hidden"
            >
              <div className="text-xl sm:text-3xl font-serif font-bold text-amber-200 leading-none">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[9px] sm:text-xs uppercase tracking-wider text-rose-100/90 font-medium mt-1">
                {item.label}
              </div>
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Mobile-First Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-sm sm:max-w-none">
          <a
            href="#events"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-xs sm:text-sm tracking-wide shadow-xl shadow-rose-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Xem Sự Kiện & Điểm Đón</span>
          </a>
          <a
            href="#guestbook"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-medium text-xs sm:text-sm tracking-wide border border-white/30 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>Gửi Lời Chúc Mừng</span>
          </a>
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-12 sm:bottom-10 left-0 right-0 z-20 flex justify-center items-center gap-1.5 sm:gap-2">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all rounded-full ${
              idx === currentSlide
                ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-amber-300'
                : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Chuyển tới ảnh slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Down arrow link */}
      <a
        href="#couple"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 text-white/70 hover:text-white transition-colors animate-bounce p-1"
        aria-label="Cuộn xuống"
      >
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>
    </section>
  );
}
