import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, ExternalLink } from 'lucide-react';
import contentData from '../../data/content.json';

interface AdRewardModalProps {
  onClose: () => void;
  onReward: () => void;
  lang: 'vn' | 'en';
}

export default function AdRewardModal({ onClose, onReward, lang }: AdRewardModalProps) {
  const [timeLeft, setTimeLeft] = useState(7);
  const [isRewarded, setIsRewarded] = useState(false);
  const settings = contentData.settings;
  const [affiliateProduct, setAffiliateProduct] = useState(contentData.affiliateProducts[0]);

  useEffect(() => {
    // Pick random affiliate product
    const products = contentData.affiliateProducts;
    if (products && products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      setAffiliateProduct(products[randomIndex]);
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isRewarded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isRewarded) {
      setIsRewarded(true);
      onReward();
    }
  }, [timeLeft, isRewarded, onReward]);

  const progressPercentage = ((7 - timeLeft) / 7) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-900 border border-ancient-gold/30 rounded-2xl p-6 md:p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col items-center text-center overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />

        {isRewarded && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <h3 className="text-xl md:text-2xl font-mystic font-bold text-ancient-gold-light mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          {lang === 'vn' ? 'Kết Nối Vũ Trụ' : 'Cosmic Connection'}
        </h3>
        
        <p className="text-slate-400 text-sm mb-6">
          {isRewarded 
            ? (lang === 'vn' ? 'Bạn đã nhận được lượt rút mới!' : 'You have received new draws!') 
            : (lang === 'vn' ? 'Đang truyền năng lượng... Vui lòng chờ.' : 'Channeling energy... Please wait.')}
        </p>

        {/* Shopee Affiliate Product */}
        <div className="w-full bg-slate-950/50 rounded-xl p-4 border border-white/5 mb-6 relative group">
          <span className="absolute top-2 left-2 bg-slate-800 text-[10px] text-slate-400 px-2 py-1 rounded uppercase tracking-wider font-bold z-10">
            {lang === 'vn' ? 'Tài Trợ' : 'Sponsored'}
          </span>
          
          <div className="aspect-square w-32 md:w-40 mx-auto mb-4 overflow-hidden rounded-lg border border-slate-700 bg-black">
            <img 
              src={affiliateProduct?.image || settings.shopeeProductImage} 
              alt={lang === 'vn' ? affiliateProduct?.nameVn : affiliateProduct?.nameEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <h4 className="text-sm md:text-base font-bold text-slate-200 mb-3 line-clamp-2">
            {lang === 'vn' ? affiliateProduct?.nameVn : affiliateProduct?.nameEn}
          </h4>
          
          <a 
            href={affiliateProduct?.url || settings.shopeeAffiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white rounded-lg font-bold text-sm transition-all"
          >
            {lang === 'vn' ? 'Xem trên Shopee' : 'View on Shopee'}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Timer / Progress Bar */}
        <div className="w-full">
          {!isRewarded ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-ancient-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ ease: "linear", duration: 1 }}
                />
              </div>
              <span className="text-xs font-bold text-slate-400 font-mono">00:0{timeLeft}</span>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 bg-ancient-gold hover:bg-ancient-gold-light text-black font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              {lang === 'vn' ? 'Nhận Lượt & Đóng' : 'Claim Draws & Close'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// @AGENT_MODIFIED: 2026-04-28T16:45:00Z | Agent 4 | Reason: Created AdRewardModal for simulated ads and Shopee affiliate | Tag: #monetization #ui
