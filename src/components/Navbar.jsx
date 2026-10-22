import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Gift, Calendar, Music } from 'lucide-react';

export default function Navbar({ onOpenGiftModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', href: '#home' },
    { name: 'Cặp Đôi', href: '#couple' },
    { name: 'Chuyện Tình Yêu', href: '#story' },
    { name: 'Sự Kiện Cưới', href: '#events' },
    { name: 'Album Ảnh', href: '#gallery' },
    { name: 'Lời Chúc', href: '#guestbook' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
          : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Couple Initials */}
        <a href="#home" className="flex items-center gap-2 group">
          <Heart className={`w-4 h-4 text-rose-500 fill-rose-500 transition-opacity ${
            isScrolled ? 'opacity-100 animate-pulse' : 'opacity-90'
          }`} />
          <div className={`transition-all duration-300 ${
            isScrolled
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-2 pointer-events-none sm:opacity-100 sm:translate-x-0 sm:pointer-events-auto'
          }`}>
            <span className={`font-cursive text-2xl sm:text-3xl transition-colors ${
              isScrolled ? 'text-rose-600' : 'text-white'
            }`}>
              Tuấn Huy
            </span>
            <span className="mx-1 text-amber-300 font-serif">&</span>
            <span className={`font-cursive text-2xl sm:text-3xl transition-colors ${
              isScrolled ? 'text-rose-600' : 'text-white'
            }`}>
              Bích Phương
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-rose-500 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-rose-500 hover:after:w-full after:transition-all ${
                isScrolled ? 'text-stone-700' : 'text-white/90'
              }`}
            >
              {link.name}
            </a>
          ))}

          {/* Gift button */}
          <button
            onClick={onOpenGiftModal}
            className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <Gift className="w-4 h-4" />
            <span>Mừng Cưới</span>
          </button>
        </nav>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenGiftModal}
            className="flex items-center gap-1.5 bg-rose-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Mừng Cưới</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-stone-800 hover:bg-stone-100' : 'text-white hover:bg-white/20'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-rose-100 px-6 py-6 space-y-4 shadow-2xl animate-fade-in-up">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-800 hover:text-rose-600 font-medium text-base py-2 border-b border-stone-100 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <Heart className="w-3.5 h-3.5 text-rose-300" />
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGiftModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white font-semibold py-3 rounded-xl shadow-md"
            >
              <Gift className="w-5 h-5" />
              <span>Gửi Quà & Mừng Cưới (QR Pay)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
