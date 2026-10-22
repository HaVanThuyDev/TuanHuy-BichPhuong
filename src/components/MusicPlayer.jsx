import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, ListMusic, Plus, X, Disc3, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [customUrl, setCustomUrl] = useState('');
  const [playlist, setPlaylist] = useState(weddingData.youtubePresets);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeTab, setActiveTab] = useState('mp3'); // 'mp3' (offline direct audio) | 'youtube'

  const audioRef = useRef(null);

  const currentSong = playlist[currentSongIndex] || playlist[0];

  // Helper to extract YouTube ID
  const extractYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url.trim();
  };

  // Toggle Play / Pause using native HTML5 Audio (Guaranteed to work on iOS/Android/Messenger)
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

  // Auto-play on first user interaction (touch/click anywhere)
  useEffect(() => {
    const handleFirstTouch = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Browser might still block until explicit button tap
          });
      }
    };

    window.addEventListener('touchstart', handleFirstTouch, { once: true });
    window.addEventListener('click', handleFirstTouch, { once: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };
  }, [hasInteracted]);

  // Handle adding custom YouTube song
  const handleAddCustomSong = (e) => {
    e.preventDefault();
    const id = extractYouTubeId(customUrl);
    if (!id) {
      alert('Vui lòng nhập đường link YouTube hợp lệ!');
      return;
    }
    const newSong = {
      id,
      title: `Nhạc YouTube yêu thích (${id.substring(0, 5)}...)`,
      artist: 'Người dùng tùy chọn'
    };
    const updated = [newSong, ...playlist];
    setPlaylist(updated);
    setCurrentSongIndex(0);
    setCustomUrl('');
    // Open directly in youtube
    window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
  };

  return (
    <>
      {/* Native HTML5 Audio Element: 100% reliable on mobile browsers, Messenger, Zalo */}
      <audio
        ref={audioRef}
        src="/music/wedding-song.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Music Controller (Placed above Mobile Bottom Nav) */}
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-2">
        {/* Song info pill */}
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
            <p className="font-semibold text-rose-900 truncate">Nhạc Cưới Lãng Mạn</p>
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

        {/* Playlist & YouTube Links Button */}
        <button
          onClick={() => setShowModal(true)}
          title="Chọn bài hát / Mở YouTube"
          className="p-2 sm:p-2.5 rounded-full bg-white/95 hover:bg-white text-rose-700 shadow-lg backdrop-blur-md border border-rose-200 transition-all active:scale-95"
          aria-label="Danh sách bài hát"
        >
          <ListMusic className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Playlist & YouTube Music Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-rose-100 overflow-hidden transform transition-all max-h-[90dvh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-rose-600 to-rose-700 p-4 sm:p-5 text-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <Disc3 className="w-6 h-6 animate-spin-slow text-amber-300" />
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg">Âm Nhạc Lễ Cưới</h3>
                  <p className="text-[11px] sm:text-xs text-rose-100">Bật nhạc nền hoặc nghe trực tiếp trên YouTube</p>
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

            {/* Primary Background Player Controls */}
            <div className="p-4 bg-rose-50/60 border-b border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-stone-900">Bản Nhạc Cưới Lãng Mạn (MP3)</h4>
                  <p className="text-[11px] text-stone-500">
                    {isPlaying ? '🎵 Đang phát nhạc nền' : '⏸ Đang tạm dừng'}
                  </p>
                </div>
              </div>

              <button
                onClick={togglePlay}
                className="px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Tạm Dừng' : 'Phát Nhạc'}</span>
              </button>
            </div>

            {/* YouTube Wedding Playlist (Direct Links for Mobile) */}
            <div className="p-4 space-y-2 overflow-y-auto no-scrollbar flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-stone-400">
                  Nghe trực tiếp trên YouTube:
                </h4>
                <span className="text-[10px] text-rose-600 font-medium">Chạm bài hát để mở nghe ↗</span>
              </div>

              <div className="space-y-2">
                {playlist.map((song) => (
                  <a
                    key={song.id}
                    href={`https://www.youtube.com/watch?v=${song.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl flex items-center justify-between border border-stone-200/80 hover:border-rose-300 hover:bg-rose-50/50 transition-all group bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Play className="w-3.5 h-3.5 fill-red-600 text-red-600 translate-x-0.5" />
                      </div>
                      <div className="truncate text-xs">
                        <p className="font-semibold text-stone-800 group-hover:text-rose-700 truncate">{song.title}</p>
                        <p className="text-[10px] text-stone-400">{song.artist}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-stone-400 group-hover:text-rose-600 font-medium flex-shrink-0 ml-2">
                      <span>YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Add Custom YouTube Link Form */}
              <div className="pt-3 mt-3 border-t border-stone-200">
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-stone-400 mb-2">
                  Hoặc dán link bài hát YouTube của bạn:
                </h4>
                <form onSubmit={handleAddCustomSong} className="flex gap-2">
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="VD: https://youtu.be/..."
                    className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-500 bg-stone-50"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-semibold flex items-center gap-1 shadow-sm active:scale-95"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Mở Nghe</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-stone-50 p-3 text-center border-t border-stone-200 flex-shrink-0">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium active:scale-95"
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
