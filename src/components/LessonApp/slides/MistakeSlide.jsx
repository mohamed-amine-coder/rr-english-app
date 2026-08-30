import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

export const MistakeSlide = ({ slide }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => setIsRevealed(false), [slide]);
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 overflow-x-hidden" dir="rtl">
      <h3 className="text-2xl font-black text-blue-800 mb-4 [unicode-bidi:plaintext]">{slide.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-white border-2 border-rose-100 rounded-xl flex flex-col items-center justify-center text-center">
          <FaTimesCircle className="text-rose-500 text-4xl mb-2" />
          <p className="text-rose-900 font-black text-xl line-through [unicode-bidi:plaintext]">{slide.wrong}</p>
        </div>
        {!isRevealed ? (
          <motion.button onClick={() => setIsRevealed(true)} className="p-5 bg-orange-50 text-orange-900 border-2 border-orange-300 rounded-xl flex items-center justify-center font-black text-lg shadow-sm py-4 px-6 border-b-[3px] border-orange-400 active:border-b-0 active:translate-y-1">
            اكتشف الجواب الصحيح ✨
          </motion.button>
        ) : (
          <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="p-5 bg-white border-2 border-orange-100 rounded-xl flex flex-col items-center justify-center text-center">
            <FaCheckCircle className="text-orange-500 text-4xl mb-2" />
            <p className="text-orange-800 font-black text-xl [unicode-bidi:plaintext]">{slide.right}</p>
          </motion.div>
        )}
      </div>
      {isRevealed && <p className="text-sm font-bold text-slate-600 text-center mt-3 bg-slate-50 p-3 rounded-xl border-2 border-slate-100 [unicode-bidi:plaintext]">{slide.explanation}</p>}
    </motion.div>
  );
};
