"use client";
import React, { useState, useEffect } from "react";
import CardFlip from "./components/CardFlip";
import Disclaimer from "./components/Disclaimer";
import Sidebar from "./components/Sidebar";
import { useLanguage } from "./contexts/LanguageContext";
import { Heart, X } from "lucide-react";
import contentData from "../data/content.json";

export default function Home() {
  const { lang, setLang } = useLanguage();
  const [showDonate, setShowDonate] = useState(false);

  // Agent 5 Tracking: Daily Pulse for Retention
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
  }, []);
  
  // Nạp 100% Cài đặt từ Static JSON file
  const settings = contentData.settings;

  return (
    <main className="min-h-screen bg-transparent flex flex-col items-center py-2 md:py-10 px-4 relative overflow-x-hidden">
      
      {/* Top Header: Chỉ hiển thị Ngôn ngữ trên Mobile/PC */}
      <div className="absolute top-6 right-6 md:right-10 flex items-center gap-3 z-20 justify-end">
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

          {/* Advertisement Area (Green Area on PC) */}
          <div className="hidden md:block w-full max-w-4xl mt-12 mb-8">
            <div className="glass-panel p-4 rounded-3xl border border-white/10 bg-slate-900/40 shadow-xl min-h-[90px] flex items-center justify-center relative overflow-hidden group">
              {settings.adBottomUrl ? (
                <img 
                  src={settings.adBottomUrl} 
                  alt="Ads" 
                  className="w-full h-full max-h-[120px] object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <span className="text-[10px] text-slate-700 tracking-[0.2em] font-bold">ADVERTISEMENT SPACE</span>
              )}
            </div>
          </div>

          {/* Mobile-only Donate Button */}
          <div className="mt-8 md:hidden">
             <button 
              onClick={() => setShowDonate(true)}
              className="flex items-center gap-2 px-6 py-2 text-sm font-bold rounded-full bg-amber-500 hover:bg-amber-600 text-amber-950 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] mx-auto animate-pulse"
            >
              <Heart className="w-4 h-4 fill-current" /> {lang === 'vn' ? 'Ủng hộ dự án' : 'Support Us'}
            </button>
          </div>

          <div className="mt-20 border-t border-slate-800 pt-8 pb-20 md:hidden w-full">
            <Disclaimer />
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
                  <div className="bg-slate-800 p-4 rounded-xl">
                    <p className="mb-2 text-sm text-slate-300 font-medium">MOMO E-Wallet</p>
                    <img src={settings.donateMomoUrl} alt="Momo QR" className="w-48 h-48 mx-auto rounded bg-white p-2 object-cover" />
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

      {/* Bottom Footer: Copyright - Chuyển sang bình thường (không fixed) */}
      <div className="w-full bg-slate-900/60 border-t border-slate-800 flex flex-col items-center justify-center mt-auto z-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
         <div className="w-[95%] md:w-[80%] bg-slate-950/80 py-4 px-6 text-center select-none backdrop-blur-sm rounded-t-2xl border-x border-t border-white/5" onContextMenu={(e) => e.preventDefault()}>
           <h5 className="text-[10px] text-amber-500 font-black tracking-[0.2em] uppercase mb-2 border-b border-white/5 pb-1 inline-block">
             {lang === 'vn' ? 'Copyright Notice' : 'Copyright Notice'}
           </h5>
           <p className="text-[9px] md:text-[10px] text-slate-200 leading-relaxed mb-3 max-w-3xl mx-auto px-4 lg:px-0 font-medium">
             {lang === 'vn' 
               ? 'Kiến thức gốc (Tarot/Lenormand) được tổng hợp dưới dạng Tự do (Public Domain/Fair Use). Các yếu tố Đồ họa 3D, Cấu trúc nội dung, và Mã nguồn thuộc tác quyền độc lập của Thông Điệp Vũ Trụ. Mọi hành vi sao chép không xin phép đều bị nghiêm cấm theo luật DMCA.' 
               : 'Original framework (Tarot/Lenormand) compiled under Public Domain/Fair Use. Core 3D Graphics, Content Structures, and Source Code are proprietary to Celestial Whispers. Unauthorized duplication is strictly prohibited under DMCA.'}
           </p>
           <p className="text-[10px] text-slate-400 tracking-wider font-bold italic">
             © 2026 {lang === 'vn' ? 'THÔNG ĐIỆP VŨ TRỤ' : 'CELESTIAL WHISPERS'}. ALL RIGHTS RESERVED.
           </p>
         </div>
      </div>
    </main>
  );
}

// @AGENT_MODIFIED: 2026-04-21T05:54:00Z | Agent 4 | Reason: Enhanced Copyright text visibility | Tag: #ui #legal
