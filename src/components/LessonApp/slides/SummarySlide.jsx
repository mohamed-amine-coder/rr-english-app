import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaGraduationCap, FaStar } from 'react-icons/fa';
import { toPng } from 'html-to-image';

export const SummarySlide = ({ slide }) => {
  const printRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  // الخريطة ديال الألوان المتغيرة على حساب شنو كتبتي فـ JSON
  const colorThemes = {
    purple: {
      accent: 'from-purple-500 to-indigo-600',
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      num: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      glow: 'bg-purple-500/20'
    },
    emerald: {
      accent: 'from-emerald-400 to-teal-600',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      num: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      glow: 'bg-emerald-500/20'
    },
    amber: {
      accent: 'from-amber-400 to-orange-600',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      num: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      glow: 'bg-amber-500/20'
    },
    rose: {
      accent: 'from-rose-400 to-pink-600',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      num: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      glow: 'bg-rose-500/20'
    },
    blue: {
      accent: 'from-blue-500 to-cyan-500',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      num: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      glow: 'bg-blue-500/20'
    }
  };

  const theme = colorThemes[slide.color] || colorThemes.blue;

  const handleDownload = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);
    
    try {
      const dataUrl = await toPng(printRef.current, { 
        cacheBust: true, 
        pixelRatio: 3,
        style: { direction: 'rtl' }
      });
      
      const link = document.createElement('a');
      link.download = `RR_English_Summary_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col items-center w-full">
      
      {/* الكارت المربعة (Square 1:1 Aspect Ratio) */}
      <div 
        ref={printRef} 
        className="w-full max-w-md aspect-square bg-slate-950 text-white rounded-[2.5rem] p-8 relative flex flex-col justify-between overflow-hidden border border-slate-800 shadow-2xl"
        dir="rtl"
      >
        {/* خلفيات إضاءة ناعمة (Glow Effects) */}
        <div className={`absolute top-0 right-0 w-64 h-64 ${theme.glow} rounded-full blur-[90px] -z-0 pointer-events-none`}></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[90px] -z-0 pointer-events-none"></div>

        {/* الهيدر العلوي */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${theme.accent} text-white shadow-lg`}>
              <FaGraduationCap className="text-xl" />
            </div>
            <div>
              <span className="block font-black text-sm tracking-wider text-white">RR ENGLISH</span>
              <span className="block text-[10px] font-medium text-slate-400">Micro-Learning</span>
            </div>
          </div>

          <span className={`text-[10px] font-black tracking-widest px-3.5 py-1.5 rounded-full border ${theme.badge} uppercase flex items-center gap-1.5`}>
            <FaStar className="text-[10px]" />
            {slide.tag || 'SUMMARY'}
          </span>
        </div>

        {/* الجزء الأوسط: العنوان والنقاط */}
        <div className="relative z-10 my-auto py-4">
          <h2 className="text-2xl md:text-3xl font-black text-slate-100 leading-snug mb-2 [unicode-bidi:plaintext]">
            {slide.title || 'خلاصة الدرس'}
          </h2>
          
          {slide.subtitle && (
            <p className="text-slate-400 font-medium text-xs mb-6 [unicode-bidi:plaintext]">
              {slide.subtitle}
            </p>
          )}

          {/* قائمة النقاط */}
          <div className="space-y-2.5">
            {slide.points?.slice(0, 3).map((point, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-slate-800/80"
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0 border ${theme.num}`}>
                  {index + 1}
                </span>
                <span className="text-slate-200 font-semibold text-xs md:text-sm leading-relaxed [unicode-bidi:plaintext] my-auto">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* الفوتر السفلي التسويقي */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400">
            تعلم النڭليزية بالدارجة 🇲🇦
          </span>
          <span className={`text-xs font-black text-transparent bg-clip-text bg-gradient-to-r ${theme.accent}`}>
            rrenglish.com
          </span>
        </div>
      </div>

      {/* زر التحميل */}
      <motion.button 
        whileTap={{ scale: 0.98 }} 
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center justify-center gap-3 w-full max-w-md py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl text-base font-black shadow-lg shadow-indigo-500/25 transition-all"
      >
        <FaDownload className="text-lg" />
        <span>{isDownloading ? 'جاري التصدير...' : 'تحميل البطاقة المربعة 📸'}</span>
      </motion.button>

    </div>
  );
};