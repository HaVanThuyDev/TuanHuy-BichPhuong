import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
    <section id="countdown" className="py-10 sm:py-14 bg-gradient-to-b from-[#faf7f2] via-white to-[#faf7f2] relative overflow-hidden border-b border-rose-100">
      <div className="max-w-xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-1.5 text-rose-600 uppercase tracking-[0.2em] text-[11px] font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Thời Gian Trọng Đại</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        {/* Wedding Date Display Card (Clean Luxury Design) */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white border border-amber-300/40 rounded-3xl p-5 sm:p-6 mb-5 w-full shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-amber-200 text-xs sm:text-base font-serif tracking-widest uppercase">
            <span className="font-semibold text-stone-200">{weddingData.dateFormatted.dayOfWeek}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="font-bold text-white text-base sm:text-xl tracking-wider">{weddingData.dateFormatted.solar}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="font-semibold text-amber-300">{weddingData.dateFormatted.time}</span>
          </div>
          <div className="text-xs text-stone-300 font-light mt-2">
            (Tức ngày {weddingData.dateFormatted.lunar})
          </div>

          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"></div>
        </div>

        {/* Live Countdown Timer (4 Grid for mobile) */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 mb-6 w-full max-w-sm sm:max-w-md">
          {[
            { label: 'Ngày', value: timeLeft.days },
            { label: 'Giờ', value: timeLeft.hours },
            { label: 'Phút', value: timeLeft.minutes },
            { label: 'Giây', value: timeLeft.seconds }
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl py-3 px-1 text-center shadow-md border border-rose-100 hover:border-rose-300 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-serif font-bold text-rose-600 leading-none">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-500 font-medium mt-1.5">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-sm">
          <a
            href="#events"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg shadow-rose-600/25 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Xem Sự Kiện & Điểm Đón</span>
          </a>
          <a
            href="#guestbook"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium text-xs sm:text-sm tracking-wide border border-rose-200 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Gửi Lời Chúc Mừng</span>
          </a>
        </div>
      </div>
    </section>
  );
}
