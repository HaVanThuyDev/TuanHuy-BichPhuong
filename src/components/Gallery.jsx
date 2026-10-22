import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, Play, Pause, Heart, ChevronDown } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8); // On mobile, show first 8 items then 'Load More'

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const gallery = weddingData.gallery;

  const categories = [
    { id: 'all', label: `Tất Cả (${gallery.length})` },
    { id: 'pre-wedding', label: 'Pre-Wedding' },
    { id: 'studio', label: 'Studio Cưới' },
    { id: 'moments', label: 'Ngọt Ngào' },
    { id: 'outdoor', label: 'Ngoại Cảnh' },
  ];

  const filteredImages = activeCategory === 'all'
    ? gallery
    : gallery.filter((img) => img.category === activeCategory);

  const displayedImages = filteredImages.slice(0, visibleCount);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Slideshow auto-play in Lightbox
  useEffect(() => {
    if (!isAutoPlaying || lightboxIndex === null) return;
    const interval = setInterval(() => {
      setLightboxIndex((prev) => (prev + 1) % gallery.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, lightboxIndex, gallery.length]);

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext(); // swipe left -> next
      } else {
        handlePrev(); // swipe right -> prev
      }
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#faf7f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-rose-600 uppercase tracking-[0.2em] text-[11px] sm:text-xs font-semibold">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Album Kỷ Niệm</span>
            <ImageIcon className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Khoảnh Khắc Đẹp Nhất
          </h2>
          <p className="text-stone-600 text-xs sm:text-base font-light italic max-w-md mx-auto">
            "Mỗi bức hình là một mảnh ghép của tình yêu, lưu giữ trọn vẹn từng cung bậc cảm xúc."
          </p>
        </div>

        {/* Filter Categories (Horizontal swipe on phone) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 px-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setVisibleCount(8);
              }}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid (2 cols on mobile, 3-4 cols on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {displayedImages.map((img) => {
            const actualIndex = gallery.findIndex((item) => item.id === img.id);
            return (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(actualIndex)}
                className="group relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-stone-200 shadow hover:shadow-xl transition-all duration-300 aspect-[3/4]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Subtle bottom gradient on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-2.5 sm:p-3">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-[11px] sm:text-xs font-medium truncate drop-shadow pr-1">
                      {img.title}
                    </span>
                    <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button for Mobile */}
        {visibleCount < filteredImages.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-rose-50 text-rose-600 font-semibold text-xs sm:text-sm border border-rose-200 shadow-md active:scale-95 transition-all"
            >
              <span>Xem Thêm ({filteredImages.length - visibleCount} ảnh)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal (Optimized for Mobile Gestures & Fullscreen View) */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Control Bar */}
          <div className="absolute top-0 left-0 right-0 p-3 sm:p-5 flex items-center justify-between text-white z-20 bg-gradient-to-b from-black/80 to-transparent">
            <div className="text-xs sm:text-sm font-medium tracking-wide truncate max-w-[200px] sm:max-w-none">
              {lightboxIndex + 1}/{gallery.length} • {gallery[lightboxIndex]?.title}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                title={isAutoPlaying ? "Tạm dừng" : "Tự động phát"}
                className={`p-2 rounded-full transition-colors ${
                  isAutoPlaying ? 'bg-rose-600 text-white' : 'hover:bg-white/20 text-white'
                }`}
              >
                {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setLightboxIndex(null);
                  setIsAutoPlaying(false);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Đóng (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Photo Display */}
          <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center p-2 sm:p-4">
            <img
              src={gallery[lightboxIndex]?.src}
              alt={gallery[lightboxIndex]?.alt}
              className="max-w-full max-h-[76vh] object-contain rounded-lg shadow-2xl animate-fade-in"
            />
          </div>

          {/* Mobile swipe helper hint */}
          <div className="sm:hidden absolute bottom-20 left-0 right-0 text-center pointer-events-none">
            <span className="text-[10px] text-white/60 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
              Vuốt sang trái / phải để xem tiếp
            </span>
          </div>

          {/* Prev / Next Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-white/30 backdrop-blur-md text-white transition-all z-20 active:scale-95"
            title="Ảnh trước"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-white/30 backdrop-blur-md text-white transition-all z-20 active:scale-95"
            title="Ảnh tiếp theo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Bottom Thumbnail Strip (Desktop/Tablet) */}
          <div className="hidden sm:flex absolute bottom-4 left-0 right-0 z-20 justify-center overflow-x-auto px-4 py-2 gap-2 max-w-2xl mx-auto no-scrollbar">
            {gallery.map((thumb, idx) => (
              <button
                key={thumb.id}
                onClick={() => setLightboxIndex(idx)}
                className={`relative flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden transition-all ${
                  idx === lightboxIndex
                    ? 'ring-2 ring-rose-500 scale-105 opacity-100'
                    : 'opacity-40 hover:opacity-80'
                }`}
              >
                <img
                  src={thumb.src}
                  alt={`Thumbnail ${thumb.id}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
