import React from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaStar, FaTrophy, FaRedo, FaArrowLeft } from 'react-icons/fa';

export const Header = ({ xp }) => (
  <div className="w-full max-w-3xl flex justify-between items-center mb-6 px-2 dir-rtl">
    {/* <div className="flex items-center gap-2 bg-orange-500 text-white font-extrabold text-sm px-4 py-2.5 rounded-2xl border-b-4 border-orange-700 shadow-sm">
      <FaFire className="text-xl animate-bounce text-yellow-300" />
      <span>3 أيام متابعة</span>
    </div>
    <div className="flex items-center gap-2 bg-amber-400 text-slate-900 font-extrabold text-sm px-4 py-2.5 rounded-2xl border-b-4 border-amber-600 shadow-sm">
      <FaStar className="text-xl text-white" />
      <span>{xp} XP</span>
    </div> */}
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
        transition={{ type: "spring", stiffness: 80 }}
      />
    </div>
  </div>
);

export const CompletionScreen = ({ onRestart, onNextLesson }) => (
  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="py-10 text-center space-y-6">
    <div className="w-24 h-24 bg-yellow-400 border-4 border-slate-900 rounded-3xl flex items-center justify-center mx-auto text-slate-900 text-5xl shadow-[0_6px_0_#0F172A] rotate-3">
      <FaTrophy />
    </div>
    <div>
      <h2 className="text-4xl font-black text-slate-900 dir-rtl">نادية! 👏</h2>
      <p className="text-lg text-slate-600 dir-rtl mt-2 font-bold">ربحتي +40 XP وزدتي خطوة للقدام.</p>
    </div>
    <div className="pt-4 max-w-sm mx-auto flex flex-col gap-3">
      <motion.button whileTap={{ y: 4 }} onClick={onNextLesson} className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-400 hover:bg-emerald-500 text-slate-900 border-b-4 border-emerald-600 rounded-2xl text-lg font-black shadow-sm transition">
        <FaArrowLeft />
        <span>دوز للدرس الجاي</span>
      </motion.button>
      <motion.button whileTap={{ y: 4 }} onClick={onRestart} className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border-b-4 border-slate-300 rounded-2xl text-base font-bold shadow-sm transition">
        <FaRedo />
        <span>نعاود هاد الدرس</span>
      </motion.button>
    </div>
  </motion.div>
);