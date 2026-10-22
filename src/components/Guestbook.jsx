import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Heart, User, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/weddingData';

export default function Guestbook() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Bạn bè');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const quickTags = [
    'Trăm năm hạnh phúc! 💖',
    'Sớm sinh quý tử nhé! 👶',
    'Mãi mãi yêu thương & thấu hiểu! 💍',
    'Chúc đôi uyên ương viên mãn! 🥂',
    'Tổ ấm luôn rộn rã tiếng cười! 🌸',
    'Hôn nhân ngọt ngào bền lâu! ✨'
  ];

  // Load wishes from LocalStorage or default
  useEffect(() => {
    const saved = localStorage.getItem('wedding_wishes_tuanhuy_bichphuong');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        setWishes(weddingData.defaultWishes);
      }
    } else {
      setWishes(weddingData.defaultWishes);
    }
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#fda4af', '#dfbe73', '#ffffff']
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert('Vui lòng nhập tên và lời chúc của bạn nhé!');
      return;
    }

    const newWish = {
      id: Date.now(),
      name: name.trim(),
      relation,
      wish: message.trim(),
      time: 'Vừa xong'
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_wishes_tuanhuy_bichphuong', JSON.stringify(updated));

    triggerConfetti();
    setIsSuccess(true);
    setMessage('');
    setName('');

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <section id="guestbook" className="py-16 sm:py-24 bg-[#fdfbf7] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-rose-600 uppercase tracking-[0.2em] text-[11px] sm:text-xs font-semibold">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Sổ Lưu Bút & Chúc Phúc</span>
            <MessageSquareHeart className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Gửi Lời Chúc Mừng
          </h2>
          <p className="text-stone-600 text-xs sm:text-base font-light italic max-w-md mx-auto">
            "Mỗi lời chúc của bạn là món quà vô giá sưởi ấm ngày trọng đại của chúng mình."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Wish Form (Optimized for Mobile Keyboards) */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-7 rounded-3xl shadow-xl border border-rose-100">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Gửi Lời Chúc Tới Cặp Đôi</span>
            </h3>

            {isSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-xl flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Cảm ơn bạn! Lời chúc đã được gửi thành công.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Tên của bạn *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Nguyễn Văn A..."
                    className="w-full text-base sm:text-sm pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Mối quan hệ
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full text-base sm:text-sm px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-stone-50/50 text-stone-700"
                >
                  <option value="Bạn chú rể">Bạn chú rể (Nhà Trai)</option>
                  <option value="Bạn cô dâu">Bạn cô dâu (Nhà Gái)</option>
                  <option value="Bạn bè chung">Bạn bè chung</option>
                  <option value="Gia đình / Người thân">Gia đình / Người thân</option>
                  <option value="Đồng nghiệp">Đồng nghiệp</option>
                </select>
              </div>

              {/* Quick Preset Tags (Tap to fill on mobile) */}
              <div>
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                  Gợi ý lời chúc 1 chạm:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {quickTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setMessage(tag)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/70 transition-colors active:scale-95"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Nội dung lời chúc *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Gửi gắm lời chúc tốt đẹp nhất tới Tuấn Huy & Bích Phương..."
                  className="w-full text-base sm:text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-stone-50/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Lời Chúc Ngay</span>
              </button>
            </form>
          </div>

          {/* Wishes List Feed */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-7 rounded-3xl shadow-xl border border-rose-100">
            <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-500" />
                <span>Sổ Lưu Bút ({wishes.length})</span>
              </h3>
              <span className="text-[11px] text-stone-400">Trực tiếp</span>
            </div>

            <div className="space-y-3 max-h-[440px] sm:max-h-[480px] overflow-y-auto pr-1 no-scrollbar">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-3.5 rounded-2xl bg-rose-50/40 border border-rose-100/70 hover:bg-rose-50/80 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                        {w.name ? w.name.charAt(0).toUpperCase() : '♥'}
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm text-stone-900 leading-none">{w.name}</h4>
                        {w.relation && (
                          <span className="text-[10px] text-rose-600 font-medium">
                            {w.relation}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-400">{w.time || 'Vừa xong'}</span>
                  </div>
                  <p className="text-stone-700 text-xs sm:text-sm italic pl-9">
                    "{w.wish}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
