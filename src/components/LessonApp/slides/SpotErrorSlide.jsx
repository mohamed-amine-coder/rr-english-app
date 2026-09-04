import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBug, FaLightbulb } from 'react-icons/fa';
import { HybridText } from './HybridText';
import { MascotFeedback } from './SharedComponents';

export const SpotErrorSlide = ({ slide, onDone }) => {
  const [selectedWordIndex, setSelectedWordIndex] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedWordIndex(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  }, [slide]);

  const handleWordClick = (index) => {
    if (isSubmitted) return;

    setSelectedWordIndex(index);
    setIsSubmitted(true);

    const clickedWord = slide.words[index];
    const correct = Boolean(clickedWord.isWrong);

    setIsCorrect(correct);
    onDone(correct ? 25 : 0);
  };

  return (
    <div className="space-y-6 text-center" dir="rtl">
      <div className="inline-flex items-center gap-2 bg-purple-100 border-2 border-purple-300 text-purple-900 px-4 py-1.5 rounded-2xl text-xs font-black shadow-xs">
        <FaBug className="text-purple-600 text-sm animate-bounce" />
        <span>صيد الخطأ 🕵️‍♂️</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-slate-900">
        <HybridText text={slide.instruction || "كليكي على الكلمة لي غالطة فالجملة:"} />
      </h3>

      <div className="bg-slate-50 border-3 border-slate-200 p-6 sm:p-8 rounded-[2rem] flex flex-wrap items-center justify-center gap-3" dir="ltr">
        {slide.words.map((wordObj, idx) => {
          let btnStyle = "bg-white border-slate-200 text-slate-800 hover:border-purple-300 hover:bg-purple-50/50 shadow-xs";

          if (isSubmitted) {
            if (wordObj.isWrong) {
              btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 font-black ring-2 ring-emerald-300";
            } else if (selectedWordIndex === idx && !wordObj.isWrong) {
              btnStyle = "bg-rose-100 border-rose-400 text-rose-950 line-through";
            } else {
              btnStyle = "bg-white border-slate-200 text-slate-400 opacity-60";
            }
          }

          return (
            <motion.button
              key={idx}
              whileTap={!isSubmitted ? { scale: 0.95 } : {}}
              disabled={isSubmitted}
              onClick={() => handleWordClick(idx)}
              className={`px-4 py-2.5 rounded-xl border-2 font-bold text-lg transition-all cursor-pointer disabled:cursor-default ${btnStyle}`}
            >
              {wordObj.text}
            </motion.button>
          );
        })}
      </div>

      {isSubmitted && (
        <MascotFeedback 
          isCorrect={isCorrect}
          message={isCorrect ? "خطير! صدتيها هي هاديك 🎯" : "للأسف ماشي هاديك الكلمة! ❌"}
          explanation={slide.tip}
        />
      )}
    </div>
  );
};