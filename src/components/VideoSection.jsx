import React, { useState } from 'react';
import { Film, Play, Sparkles } from 'lucide-react';

export default function VideoSection() {
  const [videoId, setVideoId] = useState('shL1vjQ2_3Q'); // Default romantic wedding song MV (Cưới Nhau Đi)
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 sm:py-28 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/90 to-stone-950 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 uppercase tracking-[0.2em] text-xs font-semibold">
            <Film className="w-4 h-4" />
            <span>Thước Phim Kỷ Niệm</span>
            <Film className="w-4 h-4" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Video Ngày Chung Đôi
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light italic">
            "Lưu giữ từng ánh mắt, nụ cười và lời hẹn thề ngọt ngào nhất."
          </p>
        </div>

        {/* Video Player Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-300/30 bg-black aspect-video max-w-4xl mx-auto">
          {!isPlaying ? (
            <div className="relative w-full h-full flex items-center justify-center group cursor-pointer" onClick={() => setIsPlaying(true)}>
              <img
                src="/img/photo-2.jpg"
                alt="Video Cover"
                className="w-full h-full object-cover opacity-75 group-hover:opacity-85 transition-opacity duration-500 group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px]"></div>

              {/* Glowing Play Button */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-2xl group-hover:scale-115 transition-transform duration-300">
                  <Play className="w-8 h-8 fill-white translate-x-1" />
                </div>
                <p className="text-sm font-medium text-amber-200 tracking-wider uppercase">
                  Nhấn Để Phát Video
                </p>
              </div>
            </div>
          ) : (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Tuấn Huy & Bích Phương Wedding Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
}
