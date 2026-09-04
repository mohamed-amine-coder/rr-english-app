import React from 'react';
import { motion } from 'framer-motion';
import { AudioButton } from './SharedComponents';
import msRr from '../../../assets/ms-rr.png'; // استيراد الشخصية

export const HookSlide = ({ slide }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6 text-center dir-rtl">
    
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <img
        src={msRr}
        alt="Mascot"
        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-3xl border-4 border-white shadow-xl bg-blue-50"
      />
      <div className="absolute -bottom-2 -left-2 text-2xl">👋</div>
    </motion.div>

    <div className="space-y-4">
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">{slide.title}</h2>
    </div>
    
    {slide.speechText && <AudioButton text={slide.speechText} />}
    
    <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-2xl w-full shadow-sm">
      <p className="text-amber-900 text-xl font-bold leading-relaxed">{slide.question}</p>
    </div>
  </motion.div>
);