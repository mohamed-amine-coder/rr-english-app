// src/components/LessonApp/slides/SharedComponents.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import mrRr from '../../../assets/mr-rr.png';
import msRr from '../../../assets/ms-rr.png';

export const playAudio = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

export const AudioButton = ({ text }) => (
  <button 
    type="button"
    onClick={() => playAudio(text)} 
    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl inline-flex items-center gap-2 text-xs sm:text-sm font-black transition-all active:scale-95 cursor-pointer w-fit"
  >
    <FaVolumeUp className="text-sm text-blue-600" />
    <span>استمع للنطق 🔊</span>
  </button>
);

// الفيدباك العائم اللي ما كيهزش عناصر الصفحة
export const MascotFeedback = ({ isCorrect, message, correction, explanation }) => {
  const [mascot] = useState(() => (Math.random() > 0.5 ? mrRr : msRr));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`mt-4 p-3.5 sm:p-4 rounded-2xl border flex items-center gap-3.5 shadow-sm ${
        isCorrect 
          ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900' 
          : 'bg-rose-50/95 border-rose-200 text-rose-900'
      }`}
      dir="rtl"
    >
      <img 
        src={mascot} 
        alt="Mascot" 
        className={`w-11 h-11 object-cover rounded-xl border-2 shrink-0 bg-white ${
          isCorrect ? 'border-emerald-400' : 'border-rose-400'
        }`} 
      />

      <div className="flex-1 min-w-0 text-right">
        <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm">
          {isCorrect ? <FaCheckCircle className="text-emerald-600 shrink-0" /> : <FaTimesCircle className="text-rose-600 shrink-0" />}
          <span className="truncate">{message}</span>
        </div>
        
        {correction && (
          <div className="font-bold text-xs text-slate-800 bg-white px-2.5 py-1 border border-slate-200 rounded-lg dir-ltr w-fit mt-1">
            {correction}
          </div>
        )}

        {explanation && (
          <p className="text-xs font-bold mt-1 opacity-90 line-clamp-2">
            {explanation}
          </p>
        )}
      </div>
    </motion.div>
  );
};