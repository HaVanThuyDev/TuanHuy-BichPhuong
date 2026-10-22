import React, { useState, useEffect } from 'react';
import { Home, Heart, Calendar, Image as ImageIcon, MessageSquareHeart, Gift } from 'lucide-react';

export default function MobileBottomNav({ onOpenGiftModal }) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'couple', 'story', 'events', 'gallery', 'guestbook'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home, href: '#home' },
    { id: 'couple', label: 'Cặp đôi', icon: Heart, href: '#couple' },
    { id: 'events', label: 'Tiệc cưới', icon: Calendar, href: '#events' },
    { id: 'gallery', label: 'Album', icon: ImageIcon, href: '#gallery' },
    { id: 'guestbook', label: 'Lời chúc', icon: MessageSquareHeart, href: '#guestbook' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom,0px)+8px)] pt-1 pointer-events-none">
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur-xl border border-rose-200/80 rounded-2xl shadow-[0_-4px_25px_rgba(225,29,72,0.12)] px-2 py-1.5 flex items-center justify-around pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                isActive
                  ? 'text-rose-600 font-semibold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div className={`relative p-1 rounded-full transition-transform ${
                isActive ? 'scale-110' : ''
              }`}>
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-600" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            </a>
          );
        })}

        {/* Highlight Gift Button in bottom bar */}
        <button
          onClick={onOpenGiftModal}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-rose-600 font-semibold active:scale-95 transition-transform"
          aria-label="Hộp mừng cưới"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25 animate-pulse-subtle">
            <Gift className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] text-rose-600 font-bold mt-0.5">Mừng cưới</span>
        </button>
      </div>
    </div>
  );
}
