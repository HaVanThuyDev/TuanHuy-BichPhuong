import React, { useState } from 'react';
import { Heart, Share2, Check, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tuấn Huy & Bích Phương - Happy Wedding',
        text: 'Trân trọng kính mời bạn đến chung vui cùng gia đình chúng mình!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-28 lg:pb-14 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-5 relative z-10">
        {/* Heart & Monogram */}
        <div className="flex justify-center items-center gap-2">
          <span className="w-10 h-[1px] bg-amber-400/40"></span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="w-10 h-[1px] bg-amber-400/40"></span>
        </div>

        <h3 className="font-cursive text-3xl sm:text-5xl text-rose-200">
          Tuấn Huy & Bích Phương
        </h3>

        <p className="text-stone-300 text-xs sm:text-base font-light italic max-w-lg mx-auto leading-relaxed px-2">
          "Cảm ơn tất cả mọi người đã luôn yêu thương, đồng hành và dành những lời chúc phúc tốt đẹp nhất cho ngày hạnh phúc của chúng mình!"
        </p>

        {/* Share Button & Back to Top */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm px-5 py-2.5 rounded-full border border-white/20 transition-all active:scale-95 shadow-md"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Đã sao chép link thiệp</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-amber-300" />
                <span>Chia sẻ thiệp cưới</span>
              </>
            )}
          </button>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95"
            title="Lên đầu trang"
            aria-label="Lên đầu trang"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 border-t border-stone-800 text-[11px] text-stone-500">
          <p>© 2026 Tuấn Huy & Bích Phương • Trân trọng kính mời</p>
        </div>
      </div>
    </footer>
  );
}
