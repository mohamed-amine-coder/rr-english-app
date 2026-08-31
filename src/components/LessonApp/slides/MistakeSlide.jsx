// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

// export const MistakeSlide = ({ slide }) => {
//   const [isRevealed, setIsRevealed] = useState(false);
//   useEffect(() => setIsRevealed(false), [slide]);
//   return (
//     <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 overflow-x-hidden" dir="rtl">
//       <h3 className="text-2xl font-black text-blue-800 mb-4 [unicode-bidi:plaintext]">{slide.title}</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="p-5 bg-white border-2 border-rose-100 rounded-xl flex flex-col items-center justify-center text-center">
//           <FaTimesCircle className="text-rose-500 text-4xl mb-2" />
//           <p className="text-rose-900 font-black text-xl line-through [unicode-bidi:plaintext]">{slide.wrong}</p>
//         </div>
//         {!isRevealed ? (
//           <motion.button onClick={() => setIsRevealed(true)} className="p-5 bg-orange-50 text-orange-900 border-2 border-orange-300 rounded-xl flex items-center justify-center font-black text-lg shadow-sm py-4 px-6 border-b-[3px] border-orange-400 active:border-b-0 active:translate-y-1">
//             اكتشف الجواب الصحيح ✨
//           </motion.button>
//         ) : (
//           <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="p-5 bg-white border-2 border-orange-100 rounded-xl flex flex-col items-center justify-center text-center">
//             <FaCheckCircle className="text-orange-500 text-4xl mb-2" />
//             <p className="text-orange-800 font-black text-xl [unicode-bidi:plaintext]">{slide.right}</p>
//           </motion.div>
//         )}
//       </div>
//       {isRevealed && <p className="text-sm font-bold text-slate-600 text-center mt-3 bg-slate-50 p-3 rounded-xl border-2 border-slate-100 [unicode-bidi:plaintext]">{slide.explanation}</p>}
//     </motion.div>
//   );
// };

// src/components/LessonApp/slides/MistakeSlide.jsx
import React, { useState } from 'react';
import { FaTimesCircle, FaCheckCircle, FaFire } from 'react-icons/fa';
import { HybridText } from './HybridText';

export const MistakeSlide = ({ slide }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <span className="text-xs font-black text-rose-500 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
          غلطة كيديروها بزاف 🤦‍♂️
        </span>
        <h3 className="text-xl font-black text-slate-800 mt-2">
          <HybridText text={slide.title || "رد البال متقولش هاكا:"} />
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* الغلط */}
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center gap-3">
          <FaTimesCircle className="text-rose-500 text-2xl shrink-0" />
          <span className="text-rose-950 font-black text-base line-through dir-ltr font-sans">
            {slide.wrong}
          </span>
        </div>

        {/* الصحيح */}
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="p-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl shadow-sm border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaFire className="text-amber-300" />
            <span>كليكي تشوف الصحيح ✨</span>
          </button>
        ) : (
          <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex items-center gap-3 animate-fade-in">
            <FaCheckCircle className="text-emerald-500 text-2xl shrink-0" />
            <span className="text-emerald-950 font-black text-base dir-ltr font-sans">
              {slide.right}
            </span>
          </div>
        )}
      </div>

      {revealed && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <p className="text-xs sm:text-sm font-bold text-slate-600">
            <HybridText text={slide.explanation || "هادي هي الطريقة لي كيهضرو بيها Native Speakers!"} />
          </p>
        </div>
      )}
    </div>
  );
};