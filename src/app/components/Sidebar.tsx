"use client";
import React from 'react';
import Disclaimer from './Disclaimer';
import { Heart, MessageCircle } from 'lucide-react';

interface SidebarProps {
  lang: 'vn' | 'en';
  settings: any;
  setShowDonate: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ lang, settings, setShowDonate }) => {
  return (
    <aside className="hidden md:flex flex-col gap-1.5 w-full max-w-[280px] xl:max-w-[300px] sticky top-4">
      
      {/* 1. Lời nhắn - RED */}
      <div className="glass-panel p-3.5 rounded-2xl border-l-[6px] border-rose-500 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
        <h4 className="text-[11px] font-mystic font-bold text-rose-400 mb-2 flex items-center gap-2 tracking-widest uppercase">
          {lang === 'vn' ? '🚩 LỜI NHẮN QUAN TRỌNG' : '🚩 IMPORTANT NOTE'}
        </h4>
        <p className="text-[11px] text-slate-100 leading-relaxed font-medium">
          {lang === 'vn' 
            ? <>Nếu bạn rút phải lá bài không tốt lành hoặc tâm lý đang không ổn định, hãy bình tĩnh: <br /><br /> chăm sóc sức khỏe, làm việc tốt và quay lại vào một ngày khác - <br /><br /> không có nghiệp quả nào là không thể thay đổi!</> 
            : <>If you draw an unfavorable card or feel mentally unstable, stay calm: <br /><br /> take care of your health, do good deeds, and return another day - <br /><br /> no karma is unchangeable!</>}
        </p>
      </div>

      {/* 2. QR Donate - GREEN/GOLD */}
      <div className="glass-panel p-3.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 shadow-2xl flex flex-col items-center text-center">
        <h3 className="text-sm font-mystic font-bold text-emerald-400 mb-3 flex items-center gap-2 leading-tight">
          <Heart className="w-4 h-4 fill-emerald-400" /> 
          {lang === 'vn' ? 'Lan tỏa Năng Lượng Vũ Trụ' : 'Spread Cosmic Energy'}
        </h3>
        
        <p className="text-[11px] text-slate-200 leading-relaxed mb-3 font-medium">
          {lang === 'vn' 
            ? <>Mọi thông điệp đều hoàn toàn miễn phí. <br /><br /> Nếu Thông Điệp Vũ Trụ giúp bạn có thêm niềm vui hoặc tránh được vận rủi hôm nay, hãy giúp chúng mình một tách cà phê để duy trì máy chủ nhé. <br /><br /> Chúng mình biết ơn bạn rất nhiều! ❤️</> 
            : <>All messages are completely free. <br /><br /> If Celestial Whispers helps you have more joy or avoid bad luck today, please help us with a cup of coffee to maintain the server. <br /><br /> We are very grateful to you! ❤️</>}
        </p>

        {settings.donateMomoUrl ? (
          <div className="bg-white p-1.5 rounded-lg mb-3 shadow-inner ring-4 ring-emerald-500/10 transition-transform hover:scale-105">
            <img 
              src={settings.donateMomoUrl} 
              alt="Momo QR" 
              className="w-24 h-24 object-cover"
            />
          </div>
        ) : (
          <div className="w-24 h-24 bg-slate-800 flex items-center justify-center rounded-lg mb-3 text-[10px] text-slate-500 italic">
             QR Maintenance
          </div>
        )}

        <button 
          onClick={() => {
            if (settings.donatePaypalUrl) window.open(settings.donatePaypalUrl, '_blank');
            else setShowDonate(true);
          }}
          className="w-full py-2.5 px-4 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-200 rounded-full text-[10px] font-bold transition-all border border-emerald-500/40 uppercase tracking-widest shadow-lg"
        >
          {lang === 'vn' ? 'Donate by Paypal' : 'Donate by Paypal'}
        </button>
      </div>

      {/* 4. Liên hệ Quảng cáo - AMBER */}
      <div className="glass-panel p-3.5 rounded-2xl border border-ancient-gold/20 bg-ancient-gold/5 transition-all hover:bg-ancient-gold/10 group">
        <h4 className="text-[10px] font-mystic font-bold text-ancient-gold-light uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-ancient-gold" />
          {lang === 'vn' ? 'LIÊN HỆ ĐẶT QUẢNG CÁO' : 'ADVERTISING CONTACT'}
        </h4>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <a href="https://zalo.me/84398032853" target="_blank" rel="noopener noreferrer" 
                 className="min-w-[38px] h-8 px-1.5 flex items-center justify-center bg-[#0068FF] rounded-lg text-[9px] font-black text-white hover:scale-110 transition-all shadow-lg shadow-blue-500/20" title="Zalo">
                ZALO
              </a>
              <a href="https://wa.me/84398032853" target="_blank" rel="noopener noreferrer" 
                 className="min-w-[38px] h-8 px-1.5 flex items-center justify-center bg-[#25D366] rounded-lg text-[9px] font-black text-white hover:scale-110 transition-all shadow-lg shadow-green-500/20" title="WhatsApp">
                WA
              </a>
              <a href="viber://chat?number=84398032853" target="_blank" rel="noopener noreferrer" 
                 className="min-w-[42px] h-8 px-1.5 flex items-center justify-center bg-[#7360F2] rounded-lg text-[9px] font-black text-white hover:scale-110 transition-all shadow-lg shadow-purple-500/20" title="Viber">
                VIBER
              </a>
              <a href="https://line.me/ti/p/~84398032853" target="_blank" rel="noopener noreferrer" 
                 className="min-w-[38px] h-8 px-1.5 flex items-center justify-center bg-[#00C300] rounded-lg text-[9px] font-black text-white hover:scale-110 transition-all shadow-lg shadow-green-400/20" title="Line">
                LINE
              </a>
            </div>
          </div>
          <div className="pt-2 border-t border-white/10 text-center">
            <span className="text-[12px] font-black text-white tracking-widest group-hover:text-ancient-gold transition-colors">
              SĐT/Zalo: +84398032853
            </span>
          </div>
        </div>
      </div>

      {/* 3. Tuyên bố trách nhiệm pháp lý - GREY */}
      <div className="glass-panel p-3.5 rounded-2xl border border-white/5 bg-slate-950/40">
        <h4 className="text-[10px] font-mystic font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-1 text-center">
          {lang === 'vn' ? 'TUYÊN BỐ TRÁCH NHIỆM' : 'LEGAL STATEMENT'}
        </h4>
        <p className="text-[10px] text-slate-400 leading-relaxed font-normal text-center">
          {lang === 'vn' 
            ? 'Hệ thống Thông Điệp Vũ Trụ này cung cấp định hướng tinh thần và tham khảo giải trí. Chúng tôi không cung cấp lời khuyên về sức khỏe, tính mạng, pháp luật hoặc đầu tư tài chính. Mọi quyết định cuối cùng thuộc về bạn.' 
            : 'This Celestial Whispers system provides spiritual guidance and entertainment. We do not provide advice on health, life, law, or financial investment. All final decisions are yours.'}
        </p>
      </div>
      
    </aside>
  );
};

export default Sidebar;

// @AGENT_MODIFIED: 2026-04-21T05:54:00Z | Agent 4 | Reason: Updated Donate title CTA & Enhanced Legal text visibility | Tag: #ui #legal
