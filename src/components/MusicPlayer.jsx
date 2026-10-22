import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, ListMusic, X, Disc3, Check } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function MusicPlayer() {
  const songs = weddingData.youtubePresets;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Default Wedding Song (index 0)
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef(null);
  const currentSong = songs[currentSongIndex] || songs[0];

  // Change song and play directly on website
  const handleSelectSong = (index) => {
    setCurrentSongIndex(index);
    if (audioRef.current) {
      audioRef.current.src = songs[index].src;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Playback error:', err));
    }
  };

  // Toggle Play / Pause using native HTML5 Audio
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback prevented:', err));
    }
    setHasInteracted(true);
  };

  // Auto-play on first user touch/click anywhere on page
  useEffect(() => {
    const handleFirstTouch = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('touchstart', handleFirstTouch, { once: true });
    window.addEventListener('click', handleFirstTouch, { once: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };
  }, [hasInteracted]);

  return (
    <>
      {/* Native HTML5 Audio Element: Plays directly on web, works 100% on iOS / Android / Messenger */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          // Play next song in playlist automatically
          const nextIndex = (currentSongIndex + 1) % songs.length;
          handleSelectSong(nextIndex);
        }}
      />

      {/* Floating Music Controller (Above Mobile Bottom Nav) */}
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-2">
        {/* Song info pill (Desktop/Tablet) */}
        <div 
          onClick={() => setShowModal(true)}
          className={`cursor-pointer hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-rose-200 shadow-xl transition-all duration-300 hover:scale-105 ${
            isPlaying ? 'opacity-100 translate-x-0' : 'opacity-85'
          }`}
        >
          <div className="flex items-center gap-1">
            <span className={`w-1 h-3 bg-rose-500 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ animationDelay: '0ms' }}></span>
            <span className={`w-1 h-4 bg-rose-500 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ animationDelay: '150ms' }}></span>
            <span className={`w-1 h-2 bg-rose-500 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ animationDelay: '300ms' }}></span>
          </div>
          <div className="text-left text-xs max-w-[140px] truncate">
            <p className="font-semibold text-rose-900 truncate">{currentSong.title}</p>
            <p className="text-stone-500 text-[10px]">{isPlaying ? 'Đang phát' : 'Chạm để bật'}</p>
          </div>
        </div>

        {/* Spinning Vinyl Record Disk Button */}
        <div className="relative group">
          <button
            onClick={togglePlay}
            title={isPlaying ? "Tạm dừng nhạc" : "Bật nhạc nền đám cưới"}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-rose-900 via-rose-700 to-amber-500 p-0.5 sm:p-1 shadow-2xl flex items-center justify-center transition-transform active:scale-90"
            aria-label="Bật/Tắt nhạc"
          >
            {/* Spinning disk ring */}
            <div className={`w-full h-full rounded-full border border-amber-300/60 bg-stone-900 flex items-center justify-center relative overflow-hidden ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-600 flex items-center justify-center border border-amber-200">
                <Disc3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>

            {/* Play/Pause Center Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-white drop-shadow">
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white text-white opacity-90" />
              ) : (
                <Play className="w-4 h-4 fill-white text-white translate-x-0.5 opacity-90" />
              )}
            </div>

            {/* Glowing ring when active */}
            {isPlaying && (
              <span className="absolute -inset-1 rounded-full bg-rose-500/25 animate-ping pointer-events-none"></span>
            )}
          </button>
        </div>

        {/* Playlist Button */}
        <button
          onClick={() => setShowModal(true)}
          title="Chọn bài hát đám cưới"
          className="p-2 sm:p-2.5 rounded-full bg-white/95 hover:bg-white text-rose-700 shadow-lg backdrop-blur-md border border-rose-200 transition-all active:scale-95"
          aria-label="Danh sách bài hát"
        >
          <ListMusic className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Playlist Modal (3 Songs Only, Plays directly on Web) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-rose-100 overflow-hidden transform transition-all flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-rose-600 to-rose-700 p-4 text-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <Disc3 className="w-5 h-5 animate-spin-slow text-amber-300" />
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Âm Nhạc Lễ Cưới</h3>
                  <p className="text-[11px] text-rose-100">Chọn bài hát để phát trực tiếp</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* 3 Songs Selection List (Direct playback on click) */}
            <div className="p-4 space-y-2.5">
              {songs.map((song, idx) => {
                const isSelected = idx === currentSongIndex;
                const isSongPlaying = isSelected && isPlaying;

                return (
                  <div
                    key={song.id}
                    onClick={() => {
                      if (isSelected) {
                        togglePlay();
                      } else {
                        handleSelectSong(idx);
                      }
                    }}
                    className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-rose-50 border-rose-300 shadow-sm'
                        : 'bg-stone-50/70 border-stone-200/70 hover:bg-rose-50/40 hover:border-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      {/* Song Icon / Playing Animation */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-rose-600 text-white shadow-md'
                          : 'bg-white text-stone-600 border border-stone-200'
                      }`}>
                        {isSongPlaying ? (
                          <Pause className="w-4 h-4 fill-white" />
                        ) : (
                          <Play className="w-4 h-4 fill-current translate-x-0.5" />
                        )}
                      </div>

                      <div className="truncate">
                        <p className={`text-xs font-bold truncate ${
                          isSelected ? 'text-rose-700' : 'text-stone-800'
                        }`}>
                          {song.title}
                        </p>
                        <p className="text-[11px] text-stone-500">{song.artist}</p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="flex-shrink-0 ml-2">
                      {isSongPlaying ? (
                        <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-semibold">
                          <span className="w-1 h-2.5 bg-rose-600 rounded-full animate-bounce"></span>
                          <span className="w-1 h-3.5 bg-rose-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-1 h-2 bg-rose-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          <span className="ml-1">Đang phát</span>
                        </div>
                      ) : isSelected ? (
                        <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                          Đã chọn
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="bg-stone-50 p-3 text-center border-t border-stone-200">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold active:scale-95 transition-all"
              >
                Đóng Lại
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
