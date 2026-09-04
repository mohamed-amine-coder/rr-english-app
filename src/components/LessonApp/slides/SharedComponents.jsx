import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// استيراد الشخصيات
import mrRr from '../../../assets/mr-rr.png';
import msRr from '../../../assets/ms-rr.png';

export const playAudio = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }
};

export const AudioButton = ({ text }) => (
  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => playAudio(text)} className="mb-4 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white border-b-[3px] border-sky-700 rounded-xl flex items-center gap-2 text-sm font-extrabold shadow-sm transition-all w-fit active:border-b-0 active:translate-y-1 cursor-pointer">
    <FaVolumeUp className="text-base" /><span>النطق 🔊</span>
  </motion.button>
);

// المكون الجديد ديال الفيدباك بالشخصيات
export const MascotFeedback = ({ isCorrect, message, correction, explanation }) => {
  const [mascot, setMascot] = useState(null);

  useEffect(() => {
    // اختيار عشوائي للشخصية (50% لكل واحد)
    setMascot(Math.random() > 0.5 ? mrRr : msRr);
  }, []);

  if (!mascot) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`mt-4 p-4 rounded-2xl border-2 flex items-start gap-4 ${
        isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
      }`}
      dir="rtl"
    >
      {/* صورة الشخصية مع أنيميشن */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="shrink-0 relative"
      >
        <img 
          src={mascot} 
          alt="Mascot" 
          className={`w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border-2 shadow-sm ${
            isCorrect ? 'border-emerald-400' : 'border-rose-400'
          }`} 
        />
        {/* إيموجي صغير كيعبر على الحالة */}
        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 shadow-sm text-sm">
          {isCorrect ? '🤩' : '🤔'}
        </div>
      </motion.div>

      {/* النص والتصحيح */}
      <div className="flex flex-col gap-1.5 pt-1 w-full">
        <div className={`flex items-center gap-2 font-black text-base sm:text-lg ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
          {isCorrect ? <FaCheckCircle className="shrink-0" /> : <FaTimesCircle className="shrink-0" />}
          <span>{message}</span>
        </div>
        
        {correction && (
          <span className="font-bold text-slate-800 bg-white px-3 py-1.5 border border-slate-200 rounded-lg dir-ltr w-fit mt-1 shadow-sm">
            {correction}
          </span>
        )}

        {explanation && (
          <p className={`text-sm font-bold mt-1 leading-relaxed ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
            {explanation}
          </p>
        )}
      </div>
    </motion.div>
  );
};