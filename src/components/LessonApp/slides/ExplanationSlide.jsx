// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { TextWrapper } from './TextWrapper';

// export const ExplanationSlide = ({ slide }) => {
//   const [visibleCount, setVisibleCount] = useState(0);
//   const words = (slide.text || '').trim().split(/\s+/).filter(Boolean);

//   useEffect(() => {
//     setVisibleCount(0);
//   }, [slide.id]);

//   useEffect(() => {
//     if (visibleCount >= words.length) return;

//     const timeout = window.setTimeout(() => {
//       setVisibleCount((prev) => prev + 1);
//     }, 120);

//     return () => window.clearTimeout(timeout);
//   }, [visibleCount, words.length]);

//   return (
//     <div className="rounded-xl border-4 border-violet-200 bg-violet-50 p-6 md:p-8 shadow-sm">
//       <p className="text-xl md:text-2xl font-black leading-loose text-slate-900 dir-rtl">
//         {words.slice(0, visibleCount).map((word, index) => {
//           const cleanedWord = word.trim();
//           if (!cleanedWord) return null;

//           return (
//             <motion.span
//               key={`${cleanedWord}-${index}`}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mr-1 inline-block"
//             >
//               <TextWrapper text={cleanedWord} />
//             </motion.span>
//           );
//         })}
//       </p>
//     </div>
//   );
// };

// src/components/LessonApp/slides/ExplanationSlide.jsx
import React from 'react';
import { FaLightbulb, FaVolumeUp } from 'react-icons/fa';
import { HybridText } from './HybridText';

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
    <div className="space-y-4 text-center">
      <div className="w-14 h-14 bg-amber-100 text-amber-600 border-2 border-amber-300 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-sm rotate-3">
        <FaLightbulb />
      </div>

      <h2 className="text-2xl font-black text-slate-900">
        <HybridText text={slide.title || "فهم هاد اللعيبة 🧠"} />
      </h2>

      <div className="bg-indigo-50/70 border-2 border-indigo-200 p-5 rounded-3xl text-right">
        <p className="text-base sm:text-lg font-bold text-slate-800 leading-loose">
          <HybridText text={slide.text || slide.explanation} />
        </p>
      </div>

      {slide.speechText && (
        <button
          onClick={() => playSpeech(slide.speechText)}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black px-5 py-2.5 rounded-xl text-sm transition-transform active:scale-95 shadow-sm"
        >
          <FaVolumeUp className="text-amber-400" />
          <span>سمع النطق الإنجليزي 🔊</span>
        </button>
      )}
    </div>
  );
};