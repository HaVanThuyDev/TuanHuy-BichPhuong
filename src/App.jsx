import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PetalsCanvas from './components/PetalsCanvas';
import Hero from './components/Hero';
import WeddingCountdown from './components/WeddingCountdown';
import Couple from './components/Couple';
import LoveStory from './components/LoveStory';
import WeddingEvents from './components/WeddingEvents';
import Gallery from './components/Gallery';
import VideoSection from './components/VideoSection';
import Guestbook from './components/Guestbook';
import GiftModal from './components/GiftModal';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf7f2] relative text-stone-800 overflow-x-hidden">
      {/* Falling sakura & heart petals canvas */}
      <PetalsCanvas />

      {/* Top Navigation bar */}
      <Navbar onOpenGiftModal={() => setIsGiftModalOpen(true)} />

      {/* Hero section (Faces clearly visible, no boxes blocking) */}
      <Hero />

      {/* Wedding Date Display & Countdown Timer (Moved cleanly here) */}
      <WeddingCountdown />

      {/* Bride & Groom section */}
      <Couple />

      {/* Love Story timeline */}
      <LoveStory />

      {/* Wedding Events & Detailed Locations */}
      <WeddingEvents />

      {/* Wedding Gallery Photo Album (26 photos) */}
      <Gallery />

      {/* Wedding Video highlights */}
      <VideoSection />

      {/* Guestbook & Wishes */}
      <Guestbook />

      {/* Footer */}
      <Footer />

      {/* Floating Music Player with native audio & YouTube links */}
      <MusicPlayer />

      {/* Mobile-Only Bottom Quick Action Bar */}
      <MobileBottomNav onOpenGiftModal={() => setIsGiftModalOpen(true)} />

      {/* Gift / Chúc Phúc Modal */}
      <GiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
      />
    </div>
  );
}
