import React from 'react';
import { Heart, Sparkles, Calendar } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function LoveStory() {
  const { loveStory } = weddingData;

  return (
    <section id="story" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 text-rose-600 uppercase tracking-[0.2em] text-[11px] sm:text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Hành Trình Hạnh Phúc</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Câu Chuyện Tình Yêu
          </h2>
          <p className="text-stone-600 text-xs sm:text-base font-light italic max-w-md mx-auto">
            "Từ những người xa lạ, tình cờ gặp gỡ, để rồi viết nên câu chuyện cổ tích của riêng mình."
          </p>
        </div>

        {/* Timeline (Responsive: Vertical Left on Mobile, Centered on Desktop) */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-rose-200 via-rose-400 to-amber-300 md:-translate-x-1/2"></div>

          <div className="space-y-8 sm:space-y-12">
            {loveStory.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-start md:items-center pl-10 sm:pl-14 md:pl-0 gap-4 sm:gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot for Mobile (on the left line) & Desktop (center) */}
                  <div className="absolute left-2.5 sm:left-4.5 md:left-1/2 md:-translate-x-1/2 top-2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md border-2 sm:border-4 border-white z-10">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
                  </div>

                  {/* Photo Side */}
                  <div className="w-full md:w-1/2 flex justify-start md:justify-center">
                    <div className="relative group w-full max-w-sm rounded-2xl overflow-hidden shadow-md border-2 sm:border-4 border-white aspect-[4/3] sm:aspect-[16/10]">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-300" />
                        <span>Năm {item.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left md:pl-4' : 'md:text-right md:pr-4'}`}>
                    <div className="hidden md:inline-block px-3 py-1 bg-rose-100 text-rose-700 font-bold text-xs rounded-full mb-2">
                      Năm {item.year}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-serif font-bold text-stone-900 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
