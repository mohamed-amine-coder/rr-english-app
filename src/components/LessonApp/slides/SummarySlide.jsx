import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaGraduationCap, FaStar } from 'react-icons/fa';
import { toPng } from 'html-to-image';
import msRr from '../../../assets/ms-rr.png'; // إضافة الشخصية للفوتر

export const SummarySlide = ({ slide }) => {
  const printRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

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
      
      {/* الكارت المربعة الفاتحة (Light Premium) */}
      <div 
        ref={printRef} 
        className="w-full max-w-md aspect-square bg-white text-slate-900 rounded-[2.5rem] p-8 relative flex flex-col justify-between overflow-hidden border-2 border-slate-100 shadow-xl"
        dir="rtl"
      >
        {/* خلفيات إضاءة ناعمة */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/50 rounded-full blur-[60px] pointer-events-none"></div>

        {/* الهيدر العلوي */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md">
              <FaGraduationCap className="text-xl" />
            </div>
            <div>
              <span className="block font-black text-sm tracking-wider text-slate-900">RR ENGLISH</span>
              <span className="block text-[10px] font-bold text-slate-500">أول منصة مغربية لتعلم الانجليزية بالدارجة</span>
            </div>
          </div>

          <span className="text-[10px] font-black tracking-widest px-3.5 py-1.5 rounded-full border bg-amber-50 text-amber-600 border-amber-200 uppercase flex items-center gap-1.5 shadow-sm">
            <FaStar className="text-[10px]" />
            {slide.tag || 'SUMMARY'}
          </span>
        </div>

        {/* الجزء الأوسط: العنوان والنقاط */}
        <div className="relative z-10 my-auto py-4">
          <h2 className="text-2xl md:text-3xl font-black text-blue-900 leading-snug mb-2 [unicode-bidi:plaintext]">
            {slide.title || 'خلاصة الدرس'}
          </h2>
          
          {slide.subtitle && (
            <p className="text-slate-500 font-bold text-xs mb-6 [unicode-bidi:plaintext]">
              {slide.subtitle}
            </p>
          )}

          {/* قائمة النقاط */}
          <div className="space-y-3">
            {slide.points?.slice(0, 3).map((point, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-sm"
              >
                <span className="w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0 bg-blue-100 text-blue-700 border border-blue-200">
                  {index + 1}
                </span>
                <span className="text-slate-700 font-bold text-xs md:text-sm leading-relaxed [unicode-bidi:plaintext] my-auto">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* الفوتر السفلي */}
        <div className="relative z-10 pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={msRr} alt="Ms RR" className="w-8 h-8 object-cover rounded-full border-2 border-white shadow-sm bg-blue-50" />
            <span className="text-[11px] font-bold text-slate-500">
              تعلم الانجليزية بالدارجة 🇲🇦
            </span>
          </div>
          <span className="text-xs font-black text-blue-600">
            rr english
          </span>
        </div>
      </div>

      {/* زر التحميل */}
      <motion.button 
        whileTap={{ scale: 0.98 }} 
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center justify-center gap-3 w-full max-w-md py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-base font-black shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
      >
        <FaDownload className="text-lg" />
        <span>{isDownloading ? 'جاري التصدير...' : 'تحميل البطاقة المربعة 📸'}</span>
      </motion.button>
    </div>
  );
};