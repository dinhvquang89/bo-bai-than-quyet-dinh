"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Sun, Infinity, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import contentDataLenormand from '../../data/content.json';
import contentDataAI from '../../data/content_oracle.json';



// Helper to track events
const trackEvent = async (eventName: string, variant: string, userId: string) => {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, variant, userId }),
    });
  } catch (e) {
    console.error('Track error:', e);
  }
};

const DRAW_KEY = 'cw_draws_left';
const DATE_KEY = 'cw_draw_date';
const FREE_PER_DAY = 3;
const AD_REWARD = 3;

function getTodayStr() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function CardFlip() {
  const { lang } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [drawsLeft, setDrawsLeft] = useState(FREE_PER_DAY);
  const [showAdPrompt, setShowAdPrompt] = useState(false);

  // Deck Selection State (thay thế A/B random)
  const [selectedDeck, setSelectedDeck] = useState<'lenormand' | 'oracle'>('lenormand');
  const [userId, setUserId] = useState<string>("");

  // Khởi tạo: Load lượt rút, deck đã chọn, userId
  React.useEffect(() => {
    const today = getTodayStr();
    const savedDate = localStorage.getItem(DATE_KEY);
    if (savedDate !== today) {
      localStorage.setItem(DATE_KEY, today);
      localStorage.setItem(DRAW_KEY, String(FREE_PER_DAY));
      setDrawsLeft(FREE_PER_DAY);
    } else {
      const saved = parseInt(localStorage.getItem(DRAW_KEY) || String(FREE_PER_DAY));
      setDrawsLeft(saved);
    }

    let savedUserId = localStorage.getItem('oracle_user_id');
    if (!savedUserId) {
      savedUserId = Math.random().toString(36).substring(2, 11);
      localStorage.setItem('oracle_user_id', savedUserId);
    }
    setUserId(savedUserId);

    // Nhớ lại bộ bài user đã chọn lần trước
    const savedDeck = localStorage.getItem('cw_selected_deck') as 'lenormand' | 'oracle';
    if (savedDeck) setSelectedDeck(savedDeck);
  }, []);

  // Audio References for Sound Effects
  const audioRefs = React.useRef<{ [key: string]: HTMLAudioElement | null }>({
    draw: null,
    positive: null,
    negative: null,
    neutral: null,
  });

  // Initialize Audio on Mount
  React.useEffect(() => {
    audioRefs.current = {
      draw: typeof Audio !== 'undefined' ? new Audio('/sounds/draw.mp3') : null,
      positive: typeof Audio !== 'undefined' ? new Audio('/sounds/positive.mp3') : null,
      negative: typeof Audio !== 'undefined' ? new Audio('/sounds/negative.mp3') : null,
      neutral: typeof Audio !== 'undefined' ? new Audio('/sounds/neutral.mp3') : null,
    };
  }, []);

  const playSFX = (type: 'draw' | 'positive' | 'negative' | 'neutral') => {
    const audio = audioRefs.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log("SFX Playback blocked:", e));
    }
  };

  // Xử lý chọn bộ bài — reset bài đang xem & track Agent 5
  const handleSelectDeck = (deck: 'lenormand' | 'oracle') => {
    if (deck === selectedDeck) return;
    setSelectedDeck(deck);
    localStorage.setItem('cw_selected_deck', deck);
    // Đóng bài đang xem nếu có
    if (isFlipped) {
      setIsFlipped(false);
      document.body.classList.remove('theme-negative', 'theme-positive');
      setTimeout(() => setCardData(null), 500);
    }
    // Agent 5: Track sự kiện chọn bộ bài
    trackEvent('DECK_SELECTED', deck, userId);
  };

  // Hàm xem quảng cáo → thưởng +AD_REWARD lượt
  const handleWatchAd = () => {
    // TODO: Thay bằng SDK quảng cáo thật (Google AdSense Rewarded, etc.)
    alert(lang === 'vn'
      ? `🎬 Giả lập xem quảng cáo 15s... Bạn nhận được +${AD_REWARD} lượt rút!`
      : `🎬 Simulating 15s ad... You earned +${AD_REWARD} draws!`);
    const newDraws = drawsLeft + AD_REWARD;
    setDrawsLeft(newDraws);
    localStorage.setItem(DRAW_KEY, String(newDraws));
    setShowAdPrompt(false);
  };

  const drawCard = () => {
    if (isFlipped) {
      setIsFlipped(false);
      document.body.classList.remove('theme-negative', 'theme-positive');
      setTimeout(() => setCardData(null), 500);
      setShowAdPrompt(false);
      return;
    }

    // Kiểm tra còn lượt không
    if (drawsLeft <= 0) {
      setShowAdPrompt(true);
      return;
    }

    // Play drawing sound
    playSFX('draw');

    setLoading(true);
    const newDrawsLeft = drawsLeft - 1;
    setDrawsLeft(newDrawsLeft);
    localStorage.setItem(DRAW_KEY, String(newDrawsLeft));
    setShowAdPrompt(false);

    setTimeout(() => {
      const activeContent = selectedDeck === 'oracle' ? contentDataAI : contentDataLenormand;
      const cards = activeContent.cards;
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      setCardData(randomCard);
      setIsFlipped(true);
      setLoading(false);
      // Agent 5: Track hoàn thành rút bài kèm deck
      trackEvent('DRAW_COMPLETED', selectedDeck, userId);

      // Logics đổi nền dựa trên tính chất bài
      // Variant B (AI) has different names, but we categorize them similarly or bypass
      const positiveCards = ['Rider', 'Clover', 'Ship', 'House', 'Tree', 'Bouquet', 'Child', 'Bear', 'Stars', 'Stork', 'Dog', 'Heart', 'Ring', 'Sun', 'Moon', 'Key', 'Fish', 'Anchor', 'Absolute Yes', 'Be Patient', 'Action Required Now', 'Trust Your Instinct', 'Be More Creative', 'It Is Certain', 'Expect A Miracle', 'It Worth Attempt', 'Follow The Lead', 'Act As Master', 'Obvious Sign Found', 'Glad You Did It', 'Invest Your Time', 'The Finish Line', 'Victory Is Near', 'It A Promise', 'Follow The Music', 'Stay The Course', 'Soul Searching', 'Prioritize Joy', 'Success Is Guaranteed', 'Abundance', 'Heart Over Head'];
      const negativeCards = ['Clouds', 'Snake', 'Coffin', 'Scythe', 'Whip', 'Fox', 'Mountain', 'Mice', 'Cross', 'Absolute No', 'Prepare Exit', 'Doubt Reality', 'No Guarantee', 'Disappointing Results', 'Unlikely', 'Avoid Shortcuts', 'Evaluate Again'];




      
      document.body.classList.remove('theme-negative', 'theme-positive');
      if (negativeCards.includes(randomCard.nameEn)) {
        document.body.classList.add('theme-negative');
        playSFX('negative');
      } else if (positiveCards.includes(randomCard.nameEn)) {
        document.body.classList.add('theme-positive');
        playSFX('positive');
      } else {
        playSFX('neutral');
      }
    }, 400); 
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      document.body.classList.remove('theme-negative', 'theme-positive');
    };
  }, []);

  const positiveCardsRef = ['Rider', 'Clover', 'Ship', 'House', 'Tree', 'Bouquet', 'Child', 'Bear', 'Stars', 'Stork', 'Dog', 'Heart', 'Ring', 'Sun', 'Moon', 'Key', 'Fish', 'Anchor', 'Absolute Yes', 'Be Patient', 'Action Required Now', 'Trust Your Instinct', 'Be More Creative', 'It Is Certain', 'Expect A Miracle', 'It Worth Attempt', 'Follow The Lead', 'Act As Master', 'Obvious Sign Found', 'Glad You Did It', 'Invest Your Time', 'The Finish Line', 'Victory Is Near', 'It A Promise', 'Follow The Music', 'Stay The Course', 'Soul Searching', 'Prioritize Joy', 'Success Is Guaranteed', 'Abundance', 'Heart Over Head'];
  const negativeCardsRef = ['Clouds', 'Snake', 'Coffin', 'Scythe', 'Whip', 'Fox', 'Mountain', 'Mice', 'Cross', 'Absolute No', 'Prepare Exit', 'Doubt Reality', 'No Guarantee', 'Disappointing Results', 'Unlikely', 'Avoid Shortcuts', 'Evaluate Again'];




  
  let cardType = 'neutral';
  if (cardData) {
     if (positiveCardsRef.includes(cardData.nameEn)) cardType = 'positive';
     else if (negativeCardsRef.includes(cardData.nameEn)) cardType = 'negative';
  }

  const handleShare = () => {
    // Agent 5: Track share kèm deck đang dùng
    trackEvent('SHARE_CLICK', selectedDeck, userId);
    alert(lang === 'vn' ? "Đã chia sẻ lên Story!" : "Shared to Story!");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4 w-full">

      {/* ═══════════════════════════════════════════════════════
          [Agent 1 — UI Task] TAB CHỌN BỘ BÀI
          Thiết kế: 2 tab bo tròn, nổi bật linh hồn từng bộ.
          ═══════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-4 p-1.5 bg-slate-900/90 border border-ancient-gold/20 rounded-full backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] z-30 ring-1 ring-white/5">
        <button
          onClick={() => handleSelectDeck('lenormand')}
          className={`group flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-700 relative overflow-hidden ${
            selectedDeck === 'lenormand'
              ? 'bg-gradient-to-br from-ancient-gold to-amber-700 text-black shadow-[0_10px_30px_rgba(212,175,55,0.4)] scale-105 border border-white/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
          }`}
        >
          {selectedDeck === 'lenormand' && (
            <motion.div layoutId="tab-glow" className="absolute inset-0 bg-white/20 animate-pulse" />
          )}
          <Sun className={`w-5 h-5 transition-transform duration-500 ${selectedDeck === 'lenormand' ? 'rotate-12 scale-110' : 'group-hover:rotate-45'}`} />
          <span className="relative z-10 font-mystic tracking-widest uppercase text-[10px] md:text-xs">
            {lang === 'vn' ? 'Thông Điệp Ngày' : 'Daily Message'}
          </span>
        </button>

        <button
          onClick={() => handleSelectDeck('oracle')}
          className={`group flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-700 relative overflow-hidden ${
            selectedDeck === 'oracle'
              ? 'bg-gradient-to-br from-indigo-600 to-purple-900 text-white shadow-[0_10px_30px_rgba(138,43,226,0.4)] scale-105 border border-white/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
          }`}
        >
          {selectedDeck === 'oracle' && (
            <motion.div layoutId="tab-glow" className="absolute inset-0 bg-white/10 animate-pulse" />
          )}
          <Infinity className={`w-5 h-5 transition-transform duration-500 ${selectedDeck === 'oracle' ? 'scale-110 opacity-100' : 'opacity-60 group-hover:scale-125'}`} />
          <span className="relative z-10 font-mystic tracking-widest uppercase text-[10px] md:text-xs">
            {lang === 'vn' ? 'Hỏi Một Vấn Đề' : 'Ask a Question'}
          </span>
        </button>
      </div>

      {/* Mô tả ngắn cho bộ đang chọn */}
      <p className="text-[11px] md:text-base text-white tracking-widest text-center px-6 max-w-3xl animate-fade-in font-bold md:whitespace-nowrap transition-all duration-700 drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
        {selectedDeck === 'lenormand'
          ? (lang === 'vn' ? '✧ Nhận định chung từ vũ trụ cho ngày hôm nay ✧' : '✧ General cosmic guidance for your day ✧')
          : (lang === 'vn' ? '✧ Đặt câu hỏi trong đầu, rồi rút bài để nhận chỉ dẫn ✧' : '✧ Hold your question in mind, then draw for guidance ✧')
        }
      </p>
      {/* Card wrapper w/ ambient glow */}
      <div className="relative flex items-center justify-center">
        {/* Ambient glow behind card */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30 rounded-full bg-gradient-to-br from-indigo-600 via-purple-800 to-amber-600" style={{transform: 'scale(1.2)'}} />
      <div 
        style={{ perspective: "1500px" }}
        className="cursor-pointer select-none relative h-[500px] md:h-[520px] xl:h-[540px]"
        onClick={drawCard}
      >
        <motion.div
          className="h-full relative shadow-2xl rounded-2xl transition-shadow duration-500"
          animate={{ 
            rotateY: isFlipped ? 180 : 0,
            width: isFlipped
              ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 680)
              : (typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 360)
          }}
          transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15 }}
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ scale: isFlipped ? 1.01 : 1.04, translateY: isFlipped ? 0 : -6 }}
        >
          {/* Mặt úp của lá bài */}
          <div 
            className="absolute w-full h-full bg-mystic-surface border border-ancient-gold/40 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(74,14,78,0.5)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Glow aura around card face */}
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-amber-900/10 blur-xl" />
            <div className="w-[85%] h-[90%] border-[2px] border-dashed border-ancient-gold/30 rounded-xl flex items-center justify-center relative">
               <span className="text-ancient-gold-light font-serif font-bold text-2xl tracking-[0.2em] uppercase text-center px-4">
               {loading ? (lang === 'vn' ? 'Đang thỉnh...' : 'Seeking...') : (selectedDeck === 'oracle' ? (lang === 'vn' ? 'TIẾNG VỌNG CỦA THẦN LINH' : 'DIVINE ECHOES') : (lang === 'vn' ? 'LENORMAND' : 'LENORMAND'))}





               </span>
            </div>
          </div>

          {/* Mặt ngửa của lá bài */}
          <div 
             className={`absolute inset-0 bg-slate-900 border-[3px] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden transition-all duration-1000 ${
               cardType === 'positive' ? 'border-ancient-gold/80 shadow-ancient-gold/30' :
               cardType === 'negative' ? 'border-royal-nebula-light/80 shadow-royal-nebula/30' :
               'border-slate-500/80 shadow-slate-500/20'
             }`}
             style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          >
            {cardData && (
              <>
                {/* Cột Trái: Hình ảnh (30% trên Mobile, 50% trên PC) */}
                <div className="w-full h-[30%] md:h-full md:w-1/2 relative bg-black overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
                   {cardData.imageUrl ? (
                     <img 
                       src={cardData.imageUrl} 
                       alt={cardData.nameEn} 
                       className="w-full h-full object-cover opacity-80 transition-opacity duration-700"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-slate-900">
                        <span className="text-slate-700 text-[10px] tracking-tighter uppercase font-bold">Divine Energy</span>
                     </div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Cột Phải: Nội dung văn bản (70% trên Mobile, 50% trên PC) */}
                <div className="w-full h-[70%] md:h-full md:w-1/2 flex flex-col items-center text-center p-5 md:p-8 overflow-y-auto custom-scrollbar bg-mystic-void/60 backdrop-blur-md">
                  <h3 className={`w-full text-2xl md:text-4xl font-extrabold mb-3 md:mb-6 border-b pb-4 font-serif transition-colors ${
                    cardType === 'positive' ? 'text-ancient-gold border-ancient-gold/40' : 
                    cardType === 'negative' ? 'text-royal-nebula-light border-royal-nebula/40' : 
                    'text-slate-100 border-slate-700'
                  }`}>
                    {lang === 'vn' ? cardData.nameVn : cardData.nameEn}
                  </h3>
                  
                  <div className={`mb-4 md:mb-6 py-2 px-4 border rounded-full text-[10px] md:text-xs font-bold ${
                    cardType === 'positive' ? 'bg-[#D4AF37]/10 text-ancient-gold-light border-ancient-gold/30' :
                    cardType === 'negative' ? 'bg-[#8A2BE2]/10 text-royal-nebula-light border-royal-nebula/30' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {cardType === 'positive' && (lang === 'vn' ? '🌟 THÔNG ĐIỆP TỐT LÀNH' : '🌟 POSITIVE VIBE')}
                    {cardType === 'neutral' && (lang === 'vn' ? '⚖️ THÔNG ĐIỆP TRUNG LẬP' : '⚖️ NEUTRAL ENERGY')}
                    {cardType === 'negative' && (lang === 'vn' ? '⚠️ CẢNH BÁO & CẨN TRỌNG' : '⚠️ WARNING & CAUTION')}
                  </div>

                  <div className="grow flex items-center justify-center mb-6">
                    <p className="text-sm md:text-lg text-slate-300 italic font-serif leading-relaxed max-w-[90%]">
                      "{lang === 'vn' ? cardData.descriptionVn : cardData.descriptionEn}"
                    </p>
                  </div>

                  <div className="w-full glass-panel p-4 md:p-6 rounded-xl border border-white/5 bg-white/5 mt-auto shadow-inner flex flex-col items-center">
                    <span className="uppercase text-[10px] md:text-xs text-ancient-gold-light tracking-[0.2em] block mb-3 font-bold opacity-80">
                      {lang === 'vn' ? 'Lời khuyên từ vũ trụ' : 'Universe Advice'}
                    </span>
                    <p className="text-xs md:text-base font-semibold text-slate-100 leading-relaxed">
                      {lang === 'vn' ? cardData.adviceVn : cardData.adviceEn}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
      </div>
      
      {/* Hiển thị lượt còn lại */}
      {!isFlipped && (
        <div className="flex flex-col items-center gap-3">
          {drawsLeft > 0 ? (
            <>
              <p className="text-[10px] text-slate-400 tracking-[0.2em] uppercase font-bold opacity-90">
                {lang === 'vn' ? `🔮 Lượt rút hôm nay: ${drawsLeft}` : `🔮 Draws left today: ${drawsLeft}`}
              </p>
              <button
                onClick={drawCard}
                disabled={loading}
                className="px-8 py-3.5 bg-royal-nebula hover:bg-royal-nebula-light text-white rounded-full shadow-[0_0_20px_rgba(74,14,78,0.6)] hover:shadow-[0_0_30px_rgba(138,43,226,0.8)] font-bold transition-all tracking-widest text-lg md:text-xl uppercase border border-white/10"
              >
                {loading ? '...' : (lang === 'vn' ? 'Nhận thông điệp' : 'Receive message')}
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <p className="text-amber-400 text-sm font-bold tracking-wide animate-pulse">
                {lang === 'vn' ? '✨ Bạn đã dùng hết lượt hôm nay!' : '✨ You have used all draws today!'}
              </p>
              <button
                onClick={handleWatchAd}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold rounded-full shadow-lg transition-all flex items-center gap-2 uppercase text-sm tracking-widest"
              >
                {lang === 'vn' ? `🎬 Xem quảng cáo để nhận +${AD_REWARD} lượt` : `🎬 Watch Ad for +${AD_REWARD} draws`}
              </button>
              <p className="text-slate-500 text-[10px] italic">
                {lang === 'vn' ? 'hoặc quay lại vào ngày mai để nhận 3 lượt mới' : 'or come back tomorrow for 3 free draws'}
              </p>
            </div>
          )}
        </div>
      )}
      
      {isFlipped && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 w-full px-4"
        >
          {/* Nút xem quảng cáo khi đã hết lượt */}
          {drawsLeft <= 0 && (
            <button
              onClick={handleWatchAd}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold rounded-full shadow-lg transition-all flex items-center justify-center gap-2 uppercase text-xs md:text-sm tracking-widest min-w-[240px]"
            >
              {lang === 'vn' ? `🎬 Xem Video để nhận +${AD_REWARD} lượt` : `🎬 Watch Ad for +${AD_REWARD} draws`}
            </button>
          )}
          
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={handleShare}
              className="flex-1 md:flex-none px-6 py-3 border border-royal-nebula-light glass-panel hover:bg-royal-nebula/30 text-ancient-gold-light rounded-full font-bold transition-all text-[10px] md:text-xs uppercase tracking-wide text-center min-w-[120px]"
            >
              {lang === 'vn' ? '🌟 Chia Sẻ' : '🌟 Share'}
            </button>
            <button 
              onClick={drawCard}
              className="flex-1 md:flex-none px-6 py-3 bg-mystic-surface border border-white/10 hover:bg-white/10 text-white rounded-full font-medium transition-all text-[10px] md:text-xs uppercase tracking-wide text-center min-w-[120px]"
            >
              {lang === 'vn' ? 'Đóng Lại' : 'Close'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// @AGENT_MODIFIED: 2026-04-21T17:15:00Z | Agent 4 | Reason: Integrated sound effects for card drawing and outcomes | Tag: #audio #sfx




