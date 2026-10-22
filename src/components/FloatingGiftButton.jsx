import React from 'react';
import { Gift } from 'lucide-react';

export default function FloatingGiftButton({ onOpenGiftModal }) {
  return (
    <div className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 flex items-center gap-2 animate-fade-in">
      <button
        onClick={onOpenGiftModal}
        title="Gửi quà & Mừng cưới (QR Pay)"
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-0.5 sm:p-1 shadow-2xl flex items-center justify-center transition-transform active:scale-90 hover:scale-105 group"
        aria-label="Hộp mừng cưới"
      >
        {/* Inner button container */}
        <div className="w-full h-full rounded-full border border-amber-200/70 bg-gradient-to-br from-rose-600 to-rose-700 flex items-center justify-center relative overflow-hidden">
          <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200 group-hover:scale-110 transition-transform" />
        </div>

        {/* Subtle glowing ring */}
        <span className="absolute -inset-1 rounded-full bg-rose-500/25 animate-ping pointer-events-none"></span>
      </button>

      {/* Text label badge (Desktop/Tablet) */}
      <div 
        onClick={onOpenGiftModal}
        className="cursor-pointer hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-rose-200 shadow-xl transition-all duration-300 hover:scale-105"
      >
        <Gift className="w-4 h-4 text-rose-600" />
        <span className="text-xs font-bold text-rose-700">Mừng Cưới</span>
      </div>
    </div>
  );
}
