// src/components/LessonApp/UIComponents.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaRedo, FaArrowLeft } from 'react-icons/fa';

import mrRr from '../../assets/mr-rr.png';
import msRr from '../../assets/ms-rr.png';

export const Header = ({ currentIndex, total, progress }) => (
  <div className="w-full flex items-center gap-3">
    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden dir-ltr">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
    <span className="text-slate-400 font-bold text-xs font-mono shrink-0">
      {currentIndex + 1}/{total}
    </span>
  </div>
);

export const CompletionScreen = ({ onRestart, onNextLesson, isNextLoading }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.96 }} 
    animate={{ opacity: 1, scale: 1 }} 
    className="p-8 text-center flex flex-col items-center justify-center h-full my-auto space-y-6"
  >
    <div className="flex justify-center items-center -space-x-3 rtl:space-x-reverse">
      <img src={mrRr} alt="Mr RR" className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-4 border-white shadow-md object-cover bg-amber-50 z-10" />
      <img src={msRr} alt="Ms RR" className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-4 border-white shadow-md object-cover bg-blue-50 z-20" />
    </div>

    <div>
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dir-rtl">كمّلتي الدرس بنجاح! 👏</h2>
      <p className="text-sm sm:text-base text-slate-500 dir-rtl mt-1.5 font-bold">ربحتي نقط XP جديدة وزدتي خطوة للقدام.</p>
    </div>
    
    <div className="w-full max-w-xs flex flex-col gap-2.5 pt-2">
      <button 
        onClick={onNextLesson} 
        disabled={isNextLoading}
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-black shadow-md shadow-blue-600/20 transition-all active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
      >
        {isNextLoading ? (
          <span>جاري التحميل... ⏳</span>
        ) : (
          <>
            <span>الدرس الموالي</span>
            <FaArrowLeft className="text-xs" />
          </>
        )}
      </button>

      <button 
        onClick={onRestart} 
        disabled={isNextLoading}
        className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-bold transition-all active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
      >
        <FaRedo className="text-xs" />
        <span>إعادة الدرس</span>
      </button>
    </div>
  </motion.div>
);