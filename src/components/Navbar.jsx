import React, { useState, useEffect } from 'react';
import { Heart, X, Gift } from 'lucide-react';

export default function Navbar({ onOpenGiftModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Couple Name: 1 Single Horizontal Line Guaranteed */}
        <a href="#home" className="flex items-center gap-1.5 whitespace-nowrap group">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse flex-shrink-0" />
          <div className="flex items-center gap-1 text-lg xs:text-xl sm:text-2xl font-cursive leading-none whitespace-nowrap">
            <span className={`transition-colors ${
              isScrolled ? 'text-rose-600' : 'text-white'
            }`}>
              Tuấn Huy
            </span>
            <span className="text-amber-300 font-serif text-sm sm:text-base mx-0.5">&</span>
            <span className={`transition-colors ${
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

          {/* Desktop Gift button */}
          <button
            onClick={onOpenGiftModal}
            className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <Gift className="w-4 h-4" />
            <span>Mừng Cưới</span>
          </button>
        </nav>

        {/* Mobile Navigation Button: Replaced hamburger '---' with lovely Romantic Heart */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full transition-all flex items-center justify-center active:scale-90 ${
              isScrolled
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/15 text-white backdrop-blur-md border border-white/25'
            }`}
            aria-label="Menu"
            title="Mục lục thiệp cưới"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-rose-500" />
            ) : (
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-rose-100 px-6 py-5 space-y-3 shadow-2xl animate-fade-in-up">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-800 hover:text-rose-600 font-medium text-sm py-2.5 border-b border-stone-100 flex items-center justify-between"
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
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white font-semibold py-2.5 rounded-xl shadow-md active:scale-95 text-xs"
            >
              <Gift className="w-4 h-4" />
              <span>Gửi Quà & Mừng Cưới (QR Pay)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
