import React, { useState } from 'react';
import { X, Gift, Copy, Check, Download, QrCode } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function GiftModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('groom'); // 'groom' | 'bride'
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentPerson = activeTab === 'groom' ? weddingData.groom : weddingData.bride;
  const isGroom = activeTab === 'groom';

  const handleCopyAccount = (number) => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-rose-100 overflow-hidden relative max-h-[92dvh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 p-4 sm:p-5 text-white text-center relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-1.5">
            <Gift className="w-5 h-5 text-amber-300" />
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">Hộp Mừng Cưới</h3>
          <p className="text-[11px] sm:text-xs text-rose-100 mt-0.5 max-w-xs mx-auto">
            Gửi gắm lời chúc và món quà mừng hạnh phúc đến cô dâu & chú rể
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-200 bg-stone-50 flex-shrink-0">
          <button
            onClick={() => {
              setActiveTab('groom');
              setCopied(false);
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'groom'
                ? 'bg-white text-rose-700 border-b-2 border-rose-600 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Nhà Trai (Chú Rể)</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('bride');
              setCopied(false);
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'bride'
                ? 'bg-white text-amber-700 border-b-2 border-amber-600 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Nhà Gái (Cô Dâu)</span>
          </button>
        </div>

        {/* Content Body (Scrollable on small phones) */}
        <div className="p-4 sm:p-6 text-center space-y-4 overflow-y-auto no-scrollbar flex-1">
          {/* QR Code Container */}
          <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-3 sm:p-4 rounded-2xl border border-rose-200 inline-block shadow-inner w-full max-w-[260px]">
            <img
              src={currentPerson.bank.qrCodeUrl}
              alt={`QR Code ${currentPerson.fullName}`}
              className="w-44 h-44 sm:w-48 sm:h-48 mx-auto object-contain rounded-xl bg-white p-1.5 shadow"
            />
            <p className="text-[11px] text-stone-500 mt-1.5 font-medium">
              Quét mã QR bằng App Ngân hàng bất kỳ
            </p>
          </div>

          {/* Account Details Box */}
          <div className="bg-stone-50 p-3.5 sm:p-4 rounded-2xl text-left space-y-2 border border-stone-200/70 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Ngân hàng:</span>
              <span className="font-semibold text-stone-800 text-right">{currentPerson.bank.bankName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Chủ tài khoản:</span>
              <span className="font-bold text-stone-900 uppercase text-right">{currentPerson.bank.accountHolder}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-stone-200">
              <div>
                <span className="text-stone-500 text-[11px] block">Số tài khoản:</span>
                <span className="font-bold text-rose-600 text-base sm:text-lg tracking-wider">{currentPerson.bank.accountNumber}</span>
              </div>
              <button
                onClick={() => handleCopyAccount(currentPerson.bank.accountNumber)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold shadow-sm active:scale-95 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Đã sao chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép STK</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-stone-500 italic">
            "Sự hiện diện và lời chúc phúc của quý khách là món quà quý giá nhất đối với chúng mình!"
          </p>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 p-3 sm:p-4 text-center border-t border-stone-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs sm:text-sm transition-colors active:scale-95"
          >
            Đóng Lại
          </button>
        </div>
      </div>
    </div>
  );
}
