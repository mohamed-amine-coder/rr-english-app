import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { HybridText } from './HybridText';
import mrRr from '../../../assets/mr-rr.png';
import msRr from '../../../assets/ms-rr.png';

export const MistakeSlide = ({ slide }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => setIsRevealed(false), [slide]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <span className="text-xs font-black text-rose-500 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full shadow-sm">
          غلطة كيديروها بزاف 🤦‍♂️
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-4">
          <HybridText text={slide.title || "رد البال متقولش هاكا:"} />
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* الغلط */}
        <div className="p-5 bg-rose-50 border-2 border-rose-300 rounded-2xl flex flex-col items-center justify-center text-center relative shadow-sm mt-6 md:mt-0">
          <img src={mrRr} alt="Mr RR" className="w-16 h-16 object-cover rounded-xl border-2 border-rose-300 shadow-sm absolute -top-8 bg-white" />
          <FaTimesCircle className="text-rose-500 text-3xl mb-3 mt-6" />
          <span dir="ltr" className="text-rose-900 font-black text-lg line-through font-sans">
            {slide.wrong}
          </span>
        </div>

        {/* الصحيح */}
        {!isRevealed ? (
          <motion.button 
            onClick={() => setIsRevealed(true)} 
            className="p-5 bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border-2 border-slate-200 hover:border-emerald-300 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm transition-all cursor-pointer active:scale-95 mt-6 md:mt-0"
          >
            اكتشف الجواب الصحيح ✨
          </motion.button>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-5 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex flex-col items-center justify-center text-center relative shadow-sm mt-6 md:mt-0">
            <img src={msRr} alt="Ms RR" className="w-16 h-16 object-cover rounded-xl border-2 border-emerald-400 shadow-sm absolute -top-8 bg-white" />
            <FaCheckCircle className="text-emerald-500 text-3xl mb-3 mt-6" />
            <span dir="ltr" className="text-emerald-950 font-black text-lg font-sans">
              {slide.right}
            </span>
          </motion.div>
        )}
      </div>

      {isRevealed && slide.explanation && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center shadow-sm">
          <p className="text-sm font-bold text-blue-800">
            <HybridText text={slide.explanation} />
          </p>
        </motion.div>
      )}
    </div>
  );
};