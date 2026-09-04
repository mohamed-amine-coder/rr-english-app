import React from 'react';
import { FaLightbulb, FaVolumeUp } from 'react-icons/fa';
import { HybridText } from './HybridText';
import mrRr from '../../../assets/mr-rr.png';
import { motion } from 'framer-motion';

export const ExplanationSlide = ({ slide }) => {
  const playSpeech = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-6 text-center flex flex-col items-center">
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <img src={mrRr} alt="Mr RR" className="w-24 h-24 object-cover rounded-3xl border-4 border-white shadow-xl bg-amber-50" />
        <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-amber-100 text-amber-600 border-2 border-white rounded-full flex items-center justify-center text-lg shadow-md">
          <FaLightbulb />
        </div>
      </motion.div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
        <HybridText text={slide.title || "فهم هاد اللعيبة 🧠"} />
      </h2>

      <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-3xl text-right w-full shadow-sm">
        <p className="text-base sm:text-lg font-bold text-slate-800 leading-loose">
          <HybridText text={slide.text || slide.explanation} />
        </p>
      </div>

      {slide.speechText && (
        <button
          onClick={() => playSpeech(slide.speechText)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-3 rounded-xl text-sm transition-all active:scale-95 shadow-md cursor-pointer"
        >
          <FaVolumeUp className="text-blue-200" />
          <span>سمع النطق الإنجليزي 🔊</span>
        </button>
      )}
    </div>
  );
};