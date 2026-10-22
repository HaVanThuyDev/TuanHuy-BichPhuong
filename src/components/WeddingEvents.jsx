import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, CalendarPlus, Check, Sparkles, Copy } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function WeddingEvents() {
  const { events } = weddingData;
  const [copiedId, setCopiedId] = useState(null);
  const [activeEventTab, setActiveEventTab] = useState('all'); // 'all' | 'vu-quy' | 'thanh-hon'

  // Helper to copy address for Grab / Taxi
  const handleCopyAddress = (id, address) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Helper to generate Google Calendar link
  const createGoogleCalendarLink = (event) => {
    const isVuQuy = event.id === 'vu-quy';
    const title = encodeURIComponent(`${event.title} - Tuấn Huy & Bích Phương`);
    const details = encodeURIComponent(`Đám cưới Tuấn Huy & Bích Phương\nThời gian: ${event.time} ${event.date}\nĐịa điểm: ${event.locationName} - ${event.address}`);
    const location = encodeURIComponent(`${event.locationName}, ${event.address}`);
    
    // Dates formatted YYYYMMDDTHHmmssZ (Vietnam UTC+7)
    const dates = isVuQuy 
      ? '20261121T020000Z/20261121T050000Z'
      : '20261122T040000Z/20261122T080000Z';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  return (
    <section id="events" className="py-16 sm:py-24 bg-[#fdfbf7] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 text-rose-600 uppercase tracking-[0.2em] text-[11px] sm:text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Thời Gian & Địa Điểm</span>
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Sự Kiện Cưới
          </h2>
          <p className="text-stone-600 text-xs sm:text-base font-light italic max-w-md mx-auto">
            "Sự hiện diện của quý khách là niềm vinh hạnh to lớn cho gia đình chúng tôi!"
          </p>
        </div>

        {/* Mobile Quick Event Selector */}
        <div className="flex sm:hidden justify-center mb-6">
          <div className="inline-flex p-1 bg-white border border-rose-200/80 rounded-full shadow-sm text-xs">
            <button
              onClick={() => setActiveEventTab('all')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                activeEventTab === 'all'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-stone-600'
              }`}
            >
              Cả Hai Tiệc
            </button>
            <button
              onClick={() => setActiveEventTab('vu-quy')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                activeEventTab === 'vu-quy'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-stone-600'
              }`}
            >
              Nhà Gái (21/11)
            </button>
            <button
              onClick={() => setActiveEventTab('thanh-hon')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                activeEventTab === 'thanh-hon'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-stone-600'
              }`}
            >
              Nhà Trai (22/11)
            </button>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          {events.map((ev) => {
            const isVuQuy = ev.id === 'vu-quy';
            if (activeEventTab !== 'all' && activeEventTab !== ev.id) {
              return null;
            }

            return (
              <div
                key={ev.id}
                className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border border-rose-100 flex flex-col justify-between hover:shadow-2xl transition-all relative overflow-hidden group"
              >
                {/* Decorative corner tag */}
                <div className={`absolute top-0 right-0 px-5 py-1 rounded-bl-2xl text-[11px] font-bold uppercase tracking-wider text-white shadow-sm ${
                  isVuQuy ? 'bg-amber-600' : 'bg-rose-600'
                }`}>
                  {isVuQuy ? 'Nhà Gái' : 'Nhà Trai'}
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-1.5 pr-20">
                    {ev.title}
                  </h3>

                  {/* Time badge */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-semibold mb-4 text-rose-600">
                    <Clock className="w-4 h-4" />
                    <span>{ev.time} • {ev.date}</span>
                    <span className="text-stone-400 font-normal">({ev.lunarDate})</span>
                  </div>

                  {/* Location Info Box */}
                  <div className="bg-stone-50/80 rounded-2xl p-4 mb-5 border border-stone-200/70">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-stone-900 text-sm sm:text-base">
                          {ev.locationName}
                        </h4>
                        <p className="text-stone-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
                          {ev.address}
                        </p>

                        {/* Copy Address Button (Especially handy on phone for Grab/Taxi) */}
                        <button
                          onClick={() => handleCopyAddress(ev.id, `${ev.locationName}, ${ev.address}`)}
                          className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-full border border-rose-200/60 transition-colors"
                        >
                          {copiedId === ev.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 font-semibold">Đã sao chép để gọi xe</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Sao chép địa chỉ đặt xe</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Breakdown */}
                  <div className="mb-5 space-y-2.5">
                    <h5 className="text-[11px] uppercase tracking-wider font-bold text-stone-400">
                      Chương trình buổi lễ:
                    </h5>
                    <div className="space-y-1.5">
                      {ev.schedule.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700">
                          <span className="font-bold text-rose-600 min-w-[50px] text-[11px] bg-rose-50 px-2 py-0.5 rounded text-center">
                            {item.time}
                          </span>
                          <span className="text-stone-700">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dresscode note */}
                  {ev.dressCode && (
                    <div className="mb-5 text-[11px] sm:text-xs text-stone-500 flex items-center gap-1.5 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/50">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span><strong>Dress code:</strong> {ev.dressCode}</span>
                    </div>
                  )}
                </div>

                {/* Mobile-Friendly Action Buttons */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={ev.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl shadow-md shadow-rose-600/20 active:scale-95 transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Mở Chỉ Đường Google Maps</span>
                  </a>

                  <a
                    href={createGoogleCalendarLink(ev)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-medium py-3 px-4 rounded-xl active:scale-95 transition-all"
                  >
                    <CalendarPlus className="w-4 h-4 text-rose-600" />
                    <span>Thêm Vào Lịch Nhắc</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
