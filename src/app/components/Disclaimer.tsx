import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Disclaimer() {
  const { lang } = useLanguage();

  return (
    <div className="p-4 bg-slate-900/50 border-l-4 border-amber-500 rounded text-left text-sm text-slate-400 space-y-2 select-none shadow-[0_0_10px_rgba(0,0,0,0.5)]" onContextMenu={(e) => e.preventDefault()}>
      <p>
        <strong className="text-amber-500">
          {lang === 'vn' ? '⚠️ Tuyên bố Trách nhiệm: ' : '⚠️ Disclaimer: '}
        </strong>
        {lang === 'vn' 
          ? 'Hệ thống Thông Điệp Vũ Trụ này cung cấp định hướng tinh thần và tham khảo giải trí. Nếu bạn rút phải lá bài mang nội dung nhạy cảm hoặc tâm lý đang không ổn định, hãy bình tĩnh quay lại vào một ngày khác - không có nghiệp quả nào là không thể thay đổi.' 
          : 'This Celestial Whispers system provides spiritual guidance and entertainment. If you draw a sensitive card or feel mentally unstable, please stay calm and come back another day - no karma is unchangeable.'}
      </p>
      
      <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-800">
        <strong className="text-slate-400">Copyright Notice: </strong>
        {lang === 'vn' 
          ? 'Kiến thức gốc (Tarot/Lenormand) được tổng hợp dưới dạng Tự do (Public Domain/Fair Use). Các yếu tố Đồ họa 3D, Cấu trúc nội dung, và Mã nguồn thuộc tác quyền độc lập của Thông Điệp Vũ Trụ. Mọi hành vi sao chép không xin phép đều bị nghiêm cấm theo luật DMCA.' 
          : 'Original framework (Tarot/Lenormand) compiled under Public Domain/Fair Use. Core 3D Graphics, Content Structures, and Source Code are proprietary to Celestial Whispers. Unauthorized duplication is strictly prohibited under DMCA limit.'}
      </p>
    </div>
  );
}
