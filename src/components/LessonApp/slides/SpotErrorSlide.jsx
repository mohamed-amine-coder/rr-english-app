// src/components/LessonApp/slides/SpotErrorSlide.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBug, FaCheckCircle, FaTimesCircle, FaLightbulb } from 'react-icons/fa';
import { HybridText } from './HybridText';

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
      {/* الهيدر الأيقوني */}
      <div className="inline-flex items-center gap-2 bg-purple-100 border-2 border-purple-300 text-purple-900 px-4 py-1.5 rounded-2xl text-xs font-black shadow-xs">
        <FaBug className="text-purple-600 text-sm animate-bounce" />
        <span>صيد الخطأ 🕵️‍♂️</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-slate-900">
        <HybridText text={slide.instruction || "كليكي على الكلمة لي غالطة فالجملة:"} />
      </h3>

      {/* منطقة الجملة التفاعلية - مجبرة أن تكون LTR باش الكلمات تتسف صحيحة */}
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
              className={`px-4 py-2.5 rounded-xl border-2 font-bold text-lg transition-all cursor-pointer ${btnStyle}`}
            >
              {wordObj.text}
            </motion.button>
          );
        })}
      </div>

      {/* رسالة النتيجة والتوضيح */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border-2 text-right flex items-start gap-3 ${
            isCorrect 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          {isCorrect ? (
            <FaCheckCircle className="text-emerald-500 text-2xl shrink-0 mt-0.5" />
          ) : (
            <FaTimesCircle className="text-rose-500 text-2xl shrink-0 mt-0.5" />
          )}

          <div className="space-y-1 w-full">
            <p className="font-black text-sm">
              {isCorrect ? 'خطير! صدتيها هي هاديك 🎯' : 'للأسف ماشي هاديك الكلمة! ❌'}
            </p>
            {slide.tip && (
              <div className="text-xs sm:text-sm font-bold opacity-90 flex items-center gap-1.5 mt-1">
                <FaLightbulb className="text-amber-500 shrink-0" />
                <HybridText text={slide.tip} />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};