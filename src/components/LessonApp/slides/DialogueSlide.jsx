import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const DialogueSlide = ({ slide, onDone }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => { setSelectedOption(null); setIsSubmitted(false); }, [slide]);

  const checkAnswer = () => {
    setIsSubmitted(true);
    onDone(selectedOption === slide.correctIndex ? 20 : 0);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 bg-white p-4 md:p-6 rounded-xl border-2 border-slate-100 overflow-x-hidden" dir="rtl">
      <div className="flex items-center justify-between mb-4 border-b-2 border-slate-200 pb-2">
         <span className="font-extrabold text-blue-800 text-sm bg-white px-3 py-1 rounded-lg border border-slate-200 [unicode-bidi:plaintext]">{slide.context}</span>
      </div>
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-slate-100 flex-shrink-0" />
        <div className="bg-white border-2 border-slate-100 p-3 md:p-4 rounded-xl rounded-tl-none font-bold text-blue-800 text-base [unicode-bidi:plaintext]">{slide.personA}</div>
      </div>
      <div className="flex flex-col gap-3 pl-6 md:pl-10 mt-4">
        {slide.options.map((opt, idx) => {
          let btnStyle = 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-slate-50';
          if (selectedOption === idx) btnStyle = 'bg-blue-50 border-blue-500 text-blue-900 shadow-sm';
          if (isSubmitted && idx === slide.correctIndex) btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm';
          else if (isSubmitted && selectedOption === idx) btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 shadow-sm';

          return (
            <motion.button key={idx} disabled={isSubmitted} onClick={() => setSelectedOption(idx)} className={`w-full py-3 px-4 rounded-xl rounded-tr-none text-left font-bold transition-all ${btnStyle} [unicode-bidi:plaintext] active:border-b-0 active:translate-y-1`}>
              {opt}
            </motion.button>
          );
        })}
      </div>
      {!isSubmitted ? (
        <motion.button disabled={selectedOption === null} onClick={checkAnswer} className="w-full mt-4 py-3 bg-orange-50 text-orange-900 border-2 border-orange-300 rounded-xl font-black border-b-[3px] border-orange-400 active:border-b-0 active:translate-y-1 disabled:opacity-40">جاوب</motion.button>
      ) : (
        <p className="text-sm text-blue-800 p-3 bg-blue-50 border-2 border-blue-100 rounded-xl [unicode-bidi:plaintext] mt-2 text-center font-bold">{slide.explanation}</p>
      )}
    </motion.div>
  );
};
