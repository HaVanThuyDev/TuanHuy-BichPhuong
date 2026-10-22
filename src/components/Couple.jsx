import React, { useState } from 'react';
import { Heart, Phone, Quote, Sparkles, User } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Couple() {
  const { groom, bride } = weddingData;
  const [activeMobileTab, setActiveMobileTab] = useState('all'); // 'all' | 'groom' | 'bride'

  return (
    <section id="couple" className="py-16 sm:py-24 bg-[#faf7f2] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-10 left-6 w-60 h-60 rounded-full bg-rose-200/40 blur-3xl"></div>
        <div className="absolute bottom-10 right-6 w-72 h-72 rounded-full bg-amber-100/60 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 text-rose-600 uppercase tracking-[0.2em] text-[11px] sm:text-xs font-semibold">
            <span className="w-6 h-[1px] bg-rose-400"></span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Cô Dâu & Chú Rể</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="w-6 h-[1px] bg-rose-400"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Cặp Đôi Hạnh Phúc
          </h2>
          <p className="text-stone-600 text-xs sm:text-base font-light italic max-w-md mx-auto">
            "Hai con người, hai trái tim, một tình yêu vĩnh cửu"
          </p>
        </div>

        {/* Mobile Quick Filter Tabs */}
        <div className="flex sm:hidden justify-center mb-6">
          <div className="inline-flex p-1 bg-white border border-rose-200/80 rounded-full shadow-sm">
            <button
              onClick={() => setActiveMobileTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeMobileTab === 'all'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Cả Hai
            </button>
            <button
              onClick={() => setActiveMobileTab('groom')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeMobileTab === 'groom'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Chú Rể 🤵
            </button>
            <button
              onClick={() => setActiveMobileTab('bride')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeMobileTab === 'bride'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Cô Dâu 👰
            </button>
          </div>
        </div>

        {/* Couple Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-stretch">
          {/* Groom Card */}
          {(activeMobileTab === 'all' || activeMobileTab === 'groom') && (
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg border border-rose-100/80 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between">
              <div>
                {/* Photo with Badge */}
                <div className="relative mb-5 overflow-hidden rounded-2xl aspect-[4/5] max-h-[380px] sm:max-h-[440px] mx-auto shadow-md group">
                  <img
                    src={groom.avatar}
                    alt={groom.fullName}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest bg-rose-600 text-white px-2.5 py-0.5 rounded-full font-semibold shadow">
                      {groom.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold mt-1 text-white">
                      {groom.fullName}
                    </h3>
                  </div>
                </div>

                {/* Groom Details */}
                <div className="space-y-3.5">
                  <div className="bg-rose-50/50 p-3.5 sm:p-4 rounded-2xl border border-rose-100 text-left">
                    <p className="text-[11px] text-rose-700 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span>Đại diện Nhà Trai:</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs sm:text-sm text-stone-700">
                      <p><span className="font-semibold text-stone-800">Thân phụ:</span> {groom.father}</p>
                      <p><span className="font-semibold text-stone-800">Thân mẫu:</span> {groom.mother}</p>
                    </div>
                    <p className="text-[11px] sm:text-xs text-stone-500 mt-2 flex items-start gap-1">
                      <span>📍</span>
                      <span>{groom.address}</span>
                    </p>
                  </div>

                  <div className="relative pl-4 italic text-stone-600 text-xs sm:text-sm border-l-2 border-rose-400 py-1">
                    <Quote className="w-3.5 h-3.5 text-rose-300 absolute -top-1 left-0.5" />
                    <p>"{groom.quote}"</p>
                  </div>
                </div>
              </div>

              {/* Call Groom Button */}
              <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-center sm:justify-start">
                <a
                  href={`tel:${groom.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-md active:scale-95 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Gọi Chú Rể ({groom.phone})</span>
                </a>
              </div>
            </div>
          )}

          {/* Bride Card */}
          {(activeMobileTab === 'all' || activeMobileTab === 'bride') && (
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg border border-amber-100/80 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between">
              <div>
                {/* Photo with Badge */}
                <div className="relative mb-5 overflow-hidden rounded-2xl aspect-[4/5] max-h-[380px] sm:max-h-[440px] mx-auto shadow-md group">
                  <img
                    src={bride.avatar}
                    alt={bride.fullName}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest bg-amber-600 text-white px-2.5 py-0.5 rounded-full font-semibold shadow">
                      {bride.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold mt-1 text-white">
                      {bride.fullName}
                    </h3>
                  </div>
                </div>

                {/* Bride Details */}
                <div className="space-y-3.5">
                  <div className="bg-amber-50/50 p-3.5 sm:p-4 rounded-2xl border border-amber-100 text-left">
                    <p className="text-[11px] text-amber-800 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span>Đại diện Nhà Gái:</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs sm:text-sm text-stone-700">
                      <p><span className="font-semibold text-stone-800">Thân phụ:</span> {bride.father}</p>
                      <p><span className="font-semibold text-stone-800">Thân mẫu:</span> {bride.mother}</p>
                    </div>
                    <p className="text-[11px] sm:text-xs text-stone-500 mt-2 flex items-start gap-1">
                      <span>📍</span>
                      <span>{bride.address}</span>
                    </p>
                  </div>

                  <div className="relative pl-4 italic text-stone-600 text-xs sm:text-sm border-l-2 border-amber-400 py-1">
                    <Quote className="w-3.5 h-3.5 text-amber-400 absolute -top-1 left-0.5" />
                    <p>"{bride.quote}"</p>
                  </div>
                </div>
              </div>

              {/* Call Bride Button */}
              <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-center sm:justify-start">
                <a
                  href={`tel:${bride.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white shadow-md active:scale-95 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Gọi Cô Dâu ({bride.phone})</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Center Heart Ornament */}
        <div className="mt-10 sm:mt-14 text-center">
          <div className="inline-flex items-center justify-center p-2.5 bg-rose-50 border border-rose-200 rounded-full shadow-inner">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
