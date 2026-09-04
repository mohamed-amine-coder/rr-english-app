import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSyncAlt } from 'react-icons/fa';

export const FlipCardSlide = ({ slide }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => setIsFlipped(false), [slide]);

  return (
    <div className="flex flex-col items-center justify-center perspective-1000 w-full md:w-3/4 mx-auto">
      <motion.div 
        className="w-full min-h-[250px] bg-white border-2 border-slate-100 rounded-[2rem] p-6 shadow-md hover:shadow-xl cursor-pointer flex flex-col items-center justify-center text-center relative transition-shadow" 
        onClick={() => setIsFlipped(!isFlipped)} 
        animate={{ rotateY: isFlipped ? 180 : 0 }} 
        transition={{ duration: 0.5, type: "spring", stiffness: 60 }} 
        style={{ transformStyle: 'preserve-3d' }}
      >
        {!isFlipped ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-6 bg-gradient-to-br from-blue-50 to-white rounded-[2rem]">
            <div className="absolute top-4 right-4 bg-blue-100 text-blue-500 p-2 rounded-full shadow-sm">
              <FaSyncAlt className="text-sm" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-blue-700 mb-2">{slide.word}</h2>
            <p className="text-slate-500 font-mono text-lg bg-white px-4 py-1 rounded-lg border border-slate-100 shadow-sm">{slide.phonetic}</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-6 bg-gradient-to-br from-emerald-50 to-white rounded-[2rem] border-2 border-emerald-100" style={{ transform: 'rotateY(180deg)' }}>
            <h3 className="text-2xl md:text-3xl font-black text-emerald-800 dir-rtl mb-4">{slide.meaning}</h3>
            <div className="w-16 h-1 bg-emerald-200 rounded-full mb-4"></div>
            <p className="text-lg font-bold text-slate-700 text-center px-4 leading-relaxed">"{slide.example}"</p>
          </div>
        )}
      </motion.div>
      <p className="text-xs font-bold text-slate-400 mt-6 animate-pulse">كليكي على البطاقة باش تقلبها 👆</p>
    </div>
  );
};