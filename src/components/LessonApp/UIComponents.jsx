import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaRedo, FaArrowLeft } from 'react-icons/fa';

import mrRr from '../../assets/mr-rr.png';
import msRr from '../../assets/ms-rr.png';

export const Header = ({ currentIndex, total, progress }) => (
  <div className="w-full max-w-4xl mb-0 md:mb-4">
    <div className="flex items-center justify-between mb-3">
      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 px-3 py-1 rounded-lg text-xs font-black shadow-sm">
        <FaCrown className="text-base" />
        <span>Premium</span>
      </div>
      <span className="text-slate-500 font-bold text-xs">
        {`درس ${currentIndex + 1} / ${total}`}
      </span>
    </div>

    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden dir-ltr">
      <motion.div
        className="h-full bg-emerald-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
    </div>
  </div>
);

export const ProgressBar = ({ slide, currentIndex, total, progress }) => (
  <div className="mb-5 md:mb-8">
    <div className="flex justify-between items-center font-black mb-2 text-sm">
      <span className="text-emerald-600 bg-emerald-100 border-2 border-emerald-300 px-3 py-1 rounded-xl dir-rtl">
        {slide.tag}
      </span>
      <span className="text-slate-500 font-mono text-base">
        {currentIndex + 1} / {total}
      </span>
    </div>
    <div className="w-full h-5 bg-slate-100 rounded-full p-1 border-2 border-slate-900">
      <motion.div
        className="h-full bg-emerald-400 border-b-2 border-emerald-600 rounded-full"
        animate={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
    </div>
  </div>
);

export const CompletionScreen = ({ onRestart, onNextLesson, isNextLoading }) => (
  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="py-10 text-center space-y-6 my-auto">
    
    {/* الشخصيات كتحتفل */}
    <div className="flex justify-center items-center -space-x-4 rtl:space-x-reverse mb-6">
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="z-10 relative"
      >
        <img src={mrRr} alt="Mr RR" className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-emerald-400 shadow-lg object-cover" />
        <div className="absolute -bottom-2 -left-2 bg-white text-xl rounded-full shadow-sm">🎉</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="z-20 relative"
      >
        <img src={msRr} alt="Ms RR" className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-amber-400 shadow-xl object-cover" />
        <div className="absolute -bottom-2 -right-2 bg-white text-xl rounded-full shadow-sm">🥳</div>
      </motion.div>
    </div>

    <div>
      <h2 className="text-4xl font-black text-slate-900 dir-rtl">ناضي! 👏</h2>
      <p className="text-lg text-slate-600 dir-rtl mt-2 font-bold">عاش! ربحتي XP وزدتي خطوة للقدام.</p>
    </div>
    
    <div className="pt-4 max-w-sm mx-auto flex flex-col gap-3 px-4 md:px-0">
      <motion.button 
        onClick={onNextLesson} 
        disabled={isNextLoading}
        className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-400 hover:bg-emerald-500 disabled:opacity-50 text-slate-900 border-b-[3px] border-emerald-600 rounded-xl text-lg font-black shadow-sm transition-all active:border-b-0 active:translate-y-1 cursor-pointer disabled:cursor-not-allowed"
      >
        {isNextLoading ? (
          <span>جاري التحميل... ⏳</span>
        ) : (
          <>
            <FaArrowLeft />
            <span>دوز للدرس الجاي</span>
          </>
        )}
      </motion.button>
      <motion.button 
        onClick={onRestart} 
        disabled={isNextLoading}
        className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border-b-[3px] border-slate-300 rounded-xl text-base font-bold shadow-sm transition-all active:border-b-0 active:translate-y-1 cursor-pointer disabled:cursor-not-allowed"
      >
        <FaRedo />
        <span>نعاود هاد الدرس</span>
      </motion.button>
    </div>
  </motion.div>
);