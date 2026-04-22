"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'vn' | 'en';
type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType>({ lang: 'vn', setLang: () => {} });

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('vn');
  
  // Có thể dùng localStorage lưu lại tùy chọn ngôn ngữ sau này nếu muốn
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
