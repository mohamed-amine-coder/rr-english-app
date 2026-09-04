import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AudioButton, MascotFeedback } from './SharedComponents';
import { TextWrapper } from './TextWrapper';

export const ListeningSlide = ({ slide, onDone }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
  }, [slide]);

  const handleSelect = (index) => {
    if (isSubmitted) return;

    const isCorrect = index === slide.correctIndex;
    setSelectedOption(index);
    setIsSubmitted(true);
    onDone(isCorrect ? 20 : 0);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border-4 border-sky-200 bg-sky-50 p-5 text-center">
        {slide.speechText && <AudioButton text={slide.speechText} />}
        <p className="text-xl md:text-2xl font-black text-slate-900 dir-rtl">
          <TextWrapper text={slide.prompt || ''} />
        </p>
      </div>

      <div className="grid gap-3">
        {slide.options?.map((option, index) => {
          let btnClass = 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-slate-50';

          if (isSubmitted && index === slide.correctIndex) {
            btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm';
          } else if (isSubmitted && selectedOption === index) {
            btnClass = 'bg-rose-50 border-rose-500 text-rose-900 shadow-sm';
          } else if (selectedOption === index) {
            btnClass = 'bg-blue-50 border-blue-500 text-blue-900 shadow-sm';
          }

          return (
            <motion.button
              key={index}
              disabled={isSubmitted}
              onClick={() => handleSelect(index)}
              className={`w-full rounded-xl p-3 md:p-4 text-right font-bold transition-all ${btnClass} active:border-b-0 active:translate-y-1 cursor-pointer disabled:cursor-default`}
            >
              <TextWrapper text={option} />
            </motion.button>
          );
        })}
      </div>

      {isSubmitted && (
        <MascotFeedback 
          isCorrect={selectedOption === slide.correctIndex}
          message={selectedOption === slide.correctIndex ? "صحيح! الاستماع ديالك ناضي 🎧" : "أه! الجواب الصحيح هو:"}
          correction={selectedOption !== slide.correctIndex ? <TextWrapper text={slide.options?.[slide.correctIndex] || ''} /> : null}
        />
      )}
    </div>
  );
};