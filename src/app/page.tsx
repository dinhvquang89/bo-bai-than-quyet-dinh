"use client";
import React, { useState, useEffect } from "react";
import CardFlip from "./components/CardFlip";
import Disclaimer from "./components/Disclaimer";
import Sidebar from "./components/Sidebar";
import { useLanguage } from "./contexts/LanguageContext";
import { Heart, X, Sparkles } from "lucide-react";
import contentData from "../data/content.json";

export default function Home() {
  const { lang, setLang } = useLanguage();
  const [showDonate, setShowDonate] = useState(false);
  const [affiliateProduct, setAffiliateProduct] = useState(contentData.affiliateProducts[0]);

  // Agent 203 Tracking: Daily Pulse for Retention
  useEffect(() => {
    const trackPulse = async () => {
      const savedUserId = localStorage.getItem('oracle_user_id');
      const savedDeck = localStorage.getItem('cw_selected_deck') || 'lenormand';
      if (savedUserId) {
        try {
          await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventName: 'DAILY_PULSE', variant: savedDeck, userId: savedUserId }),
          });
        } catch (e) {
          console.error('Pulse track error:', e);
        }
      }
    };
    // Delay slightly to ensure localStorage is set by CardFlip if new user
    setTimeout(trackPulse, 1000);

    // Pick random affiliate product
    const products = contentData.affiliateProducts;
    if (products && products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      setAffiliateProduct(products[randomIndex]);
    }
  }, []);
  
  // Nạp 100% Cài đặt từ Static JSON file
  const settings = contentData.settings;

  return (
    <main className="min-h-dvh bg-transparent flex flex-col items-center py-2 md:py-10 px-4 relative overflow-x-hidden">
      
      {/* Top Header: Chỉ hiển thị Ngôn ngữ trên Mobile/PC */}
      <div className="w-full flex justify-end z-20 mb-4 md:absolute md:top-6 md:right-10 md:w-auto md:mb-0">
        <div className="flex bg-slate-800 rounded text-xs md:text-sm font-bold overflow-hidden shadow-lg border border-white/5">
          <button onClick={() => setLang('vn')} className={`px-2 md:px-3 py-1 ${lang === 'vn' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white transition'}`}>
            VN
          </button>
          <button onClick={() => setLang('en')} className={`px-2 md:px-3 py-1 ${lang === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white transition'}`}>
            EN
          </button>
        </div>
      </div>

      {/* Main Container: Flexbox 2 cột trên PC */}
      <div className="max-w-[1400px] w-full flex flex-col md:flex-row gap-6 md:gap-10 z-10 relative mt-2 md:mt-0 items-start justify-center px-2">
        
        {/* Cột trái: Nội dung chính (Lá bài) */}
        <div className="flex-1 flex flex-col items-center text-center w-full">
          <h1 className="text-[clamp(2rem,10vw,3.5rem)] font-mystic font-bold text-transparent bg-clip-text bg-gradient-to-r from-ancient-gold via-white to-ancient-gold drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)] mb-1 md:mb-2 relative leading-tight tracking-tight px-2">
            {lang === 'vn' ? 'Thông Điệp Vũ Trụ' : 'Celestial Whispers'}
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-4 md:mb-6 text-[10px] md:text-sm px-6 opacity-90 leading-relaxed font-medium tracking-wide">
            {lang === 'vn' ? '✧ Lắng nghe thông điệp từ vũ trụ trước những ngã rẽ cuộc đời ✧' : '✧ Listen to the messages of the universe before the crossroads of life ✧'}
          </p>

          <CardFlip />

          {/* Advertisement Area (Shopee Affiliate Banner) */}
          {/* Desktop Banner */}
          <div className="hidden md:block w-full max-w-3xl mt-12 mb-8">
            <a 
              href={affiliateProduct?.url || settings.shopeeAffiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl flex items-center justify-between relative overflow-hidden group hover:border-ancient-gold transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center gap-6 z-10">
                <div className="w-32 h-32 rounded-xl overflow-hidden border border-ancient-gold/30 bg-black shadow-inner shadow-ancient-gold/10 relative flex-shrink-0">
                  <img 
                    src={affiliateProduct?.image || settings.shopeeProductImage} 
                    alt={lang === 'vn' ? affiliateProduct?.nameVn : affiliateProduct?.nameEn} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-left max-w-md">
                  <span className="text-xs text-ancient-gold uppercase tracking-widest font-bold block mb-2 flex items-center gap-1 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    {lang === 'vn' ? 'Góc May Mắn & Bình An' : 'Lucky Corner & Serenity'}
                  </span>
                  <p className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors leading-snug">
                    {lang === 'vn' ? affiliateProduct?.nameVn : affiliateProduct?.nameEn}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-medium">
                    {lang === 'vn' ? '✧ Năng lượng tích cực đang chờ đón bạn ✧' : '✧ Positive energy awaits you ✧'}
                  </p>
                </div>
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-ancient-gold via-amber-500 to-orange-500 rounded-xl text-slate-950 text-sm font-bold whitespace-nowrap z-10 shadow-lg group-hover:shadow-ancient-gold/30 transition-all duration-500 transform group-hover:translate-x-1">
                {lang === 'vn' ? 'Đón Nhận Ngay' : 'Claim Now'}
              </div>
              {/* Background gradient effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {/* Decorative glowing circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-ancient-gold/10 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
            </a>
          </div>

          {/* Mobile Square Banner */}
          <div className="md:hidden w-full max-w-[280px] mx-auto mt-10 mb-2">
            <a 
              href={affiliateProduct?.url || settings.shopeeAffiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-5 rounded-[2rem] border border-white/10 bg-slate-900/60 shadow-xl flex flex-col items-center text-center relative overflow-hidden group active:scale-95 transition-all duration-300"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden border border-ancient-gold/20 bg-black mb-4 relative shadow-lg">
                <img 
                  src={affiliateProduct?.image || settings.shopeeProductImage} 
                  alt={lang === 'vn' ? affiliateProduct?.nameVn : affiliateProduct?.nameEn} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              <div className="z-10 w-full">
                <span className="text-[10px] text-ancient-gold uppercase tracking-[0.2em] font-black block mb-1.5 animate-pulse">
                  {lang === 'vn' ? '✨ Góc May Mắn ✨' : '✨ Lucky Corner ✨'}
                </span>
                <p className="text-sm font-bold text-slate-100 mb-4 line-clamp-2 px-1">
                  {lang === 'vn' ? affiliateProduct?.nameVn : affiliateProduct?.nameEn}
                </p>
                <div className="w-full py-2.5 bg-gradient-to-r from-ancient-gold to-orange-500 rounded-xl text-slate-950 text-xs font-black shadow-lg">
                  {lang === 'vn' ? 'ĐÓN NHẬN NGAY' : 'CLAIM NOW'}
                </div>
              </div>

              {/* Decorative effects */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-ancient-gold/5 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-2xl" />
            </a>
          </div>

          {/* Mobile-only Donate Button */}
          <div className="mt-8 md:hidden">
             <button 
              onClick={() => setShowDonate(true)}
              className="flex items-center gap-2 px-6 py-2 text-sm font-bold rounded-full bg-amber-500 hover:bg-amber-600 text-amber-950 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] mx-auto animate-pulse"
            >
              {lang === 'vn' ? 'Ủng hộ dự án một ly trà sữa' : 'Buy us a milk tea'} <Heart className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Cột phải: Sidebar (Chỉ hiện trên PC) */}
        <Sidebar 
          lang={lang} 
          settings={settings} 
          setShowDonate={setShowDonate} 
        />
      </div>
      
      {/* Tính năng Donate Modal */}
      {showDonate && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setShowDonate(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-amber-500 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6" /> {lang === 'vn' ? 'Ủng hộ dự án' : 'Support Us'}
            </h3>
            
            {(settings.donateMomoUrl || settings.donatePaypalUrl) ? (
              <div className="space-y-6 text-center">
                {settings.donateMomoUrl && (
                  <div className="bg-slate-800 p-4 rounded-xl flex flex-col items-center gap-3">
                    <p className="mb-1 text-sm text-slate-300 font-medium">
                      {lang === 'vn' ? 'Chuyển Khoản VietQR / MOMO' : 'VietQR / MOMO Transfer'}
                    </p>
                    <div className="w-48 h-48 rounded-xl bg-white overflow-hidden flex items-center justify-center shadow-inner relative">
                      <img 
                        src={settings.donateMomoUrl} 
                        alt="VietQR Momo" 
                        className="w-full h-full object-cover scale-[1.7] transform transition-transform" 
                      />
                    </div>
                    
                    {/* Nút tải ảnh QR trên mobile */}
                    <a 
                      href={settings.donateMomoUrl} 
                      download="vietqr_momo.png" 
                      className="md:hidden flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs rounded-full transition-all shadow-md"
                    >
                      📥 {lang === 'vn' ? 'Lưu / Tải ảnh QR' : 'Save QR Image'}
                    </a>
                  </div>
                )}
                {settings.donatePaypalUrl && (
                  <a href={settings.donatePaypalUrl} target="_blank" rel="noreferrer" className="block w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold transition flex items-center justify-center">
                    <span className="text-slate-100">Donate via PayPal</span>
                  </a>
                )}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">
                 {lang === 'vn' ? 'Tính năng đang bảo trì thiết lập tài khoản. Vui lòng quay lại sau!' : 'Account setup in progress. Please come back later!'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Bottom Footer: Disclaimer & Copyright Notice */}
      <div className="w-full bg-slate-900/60 border-t border-slate-800 flex flex-col items-center justify-center mt-12 z-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] select-none" onContextMenu={(e) => e.preventDefault()}>
         <div className="w-[95%] md:w-[80%] bg-slate-950/80 py-6 px-6 text-center backdrop-blur-sm rounded-t-2xl border-x border-t border-white/5">
           
           {/* Tuyên bố trách nhiệm */}
           <p className="text-[10px] text-amber-500/90 leading-relaxed mb-4 max-w-3xl mx-auto px-4 font-medium">
             <span className="font-black uppercase tracking-wider">{lang === 'vn' ? '⚠️ Tuyên bố Trách nhiệm: ' : '⚠️ Disclaimer: '}</span>
             {lang === 'vn' 
               ? 'Hệ thống Thông Điệp Vũ Trụ này cung cấp định hướng tinh thần và tham khảo giải trí. Nếu bạn rút phải lá bài mang nội dung nhạy cảm hoặc tâm lý đang không ổn định, hãy bình tĩnh quay lại vào một ngày khác - không có nghiệp quả nào là không thể thay đổi.' 
               : 'This Celestial Whispers system provides spiritual guidance and entertainment. If you draw a sensitive card or feel mentally unstable, please stay calm and come back another day - no karma is unchangeable.'}
           </p>

           {/* Copyright Notice */}
           <p className="text-[9px] text-slate-400 leading-relaxed mb-3 max-w-3xl mx-auto px-4 font-normal border-t border-white/5 pt-3">
             {lang === 'vn' 
               ? 'Kiến thức gốc (Tarot/Lenormand) được tổng hợp dưới dạng Tự do (Public Domain/Fair Use). Các yếu tố Đồ họa 3D, Cấu trúc nội dung, và Mã nguồn thuộc tác quyền độc lập của Thông Điệp Vũ Trụ. Mọi hành vi sao chép không xin phép đều bị nghiêm cấm theo luật DMCA.' 
               : 'Original framework (Tarot/Lenormand) compiled under Public Domain/Fair Use. Core 3D Graphics, Content Structures, and Source Code are proprietary to Celestial Whispers. Unauthorized duplication is strictly prohibited under DMCA.'}
           </p>

           <p className="text-[10px] text-slate-500 tracking-wider font-bold italic">
             © 2026 {lang === 'vn' ? 'THÔNG ĐIỆP VŨ TRỤ' : 'CELESTIAL WHISPERS'}. ALL RIGHTS RESERVED.
           </p>
         </div>
      </div>
    </main>
  );
}

// @AGENT_MODIFIED: 2026-04-21T05:54:00Z | Agent 202 | Reason: Enhanced Copyright text visibility | Tag: #ui #legal
// @AGENT_MODIFIED: 2026-04-28T20:10:00Z | Agent 202 | Reason: Optimized responsive design for mobile (viewport & lazy-loading) | Tag: #performance
// @AGENT_MODIFIED: 2026-04-28T22:08:00Z | Agent 200 | Reason: Fixed language switcher overlapping title on mobile | Tag: #ui
// @AGENT_MODIFIED: 2026-04-28T22:15:00Z | Agent 200 | Reason: Optimized mobile layout, removed duplicate disclaimer and merged into footer | Tag: #ui #ux
// @AGENT_MODIFIED: 2026-04-28T22:45:00Z | Agent 200 | Reason: Added QR Donate download button and filled MOMO QR slot | Tag: #ui #monetization
// @AGENT_MODIFIED: 2026-05-01T15:02:00Z | Agent 202 | Reason: Updated mobile support button text to "Ủng hộ dự án một ly trà sữa" | Tag: #ui #ux
