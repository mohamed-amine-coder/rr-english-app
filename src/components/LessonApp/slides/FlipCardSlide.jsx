import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSyncAlt } from 'react-icons/fa';

export const FlipCardSlide = ({ slide }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => setIsFlipped(false), [slide]);

  return (
    <div className="flex flex-col items-center justify-center perspective-1000 w-full md:w-3/4 mx-auto">
      <motion.div className="w-full min-h-[220px] bg-white border-4 border-slate-900 rounded-[2rem] p-6 shadow-[0_6px_0_#0F172A] cursor-pointer flex flex-col items-center justify-center text-center relative" onClick={() => setIsFlipped(!isFlipped)} animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.4, type: "spring" }} style={{ transformStyle: 'preserve-3d' }}>
        {!isFlipped ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-6">
            <FaSyncAlt className="text-slate-300 text-2xl absolute top-4 right-4" />
            <h2 className="text-4xl md:text-5xl font-black text-indigo-700">{slide.word}</h2>
            <p className="text-slate-400 font-mono mt-2 text-lg">{slide.phonetic}</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-6 bg-indigo-50 rounded-[2rem]" style={{ transform: 'rotateY(180deg)' }}>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dir-rtl">{slide.meaning}</h3>
            <div className="w-12 h-1 bg-indigo-200 rounded-full my-4"></div>
            <p className="text-lg font-bold text-indigo-800 text-center">"{slide.example}"</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
