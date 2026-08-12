import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { AudioButton } from './SharedComponents';
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
          let btnClass = 'bg-white border-2 border-slate-300 border-b-4 text-slate-700';

          if (isSubmitted && index === slide.correctIndex) {
            btnClass = 'bg-emerald-100 border-emerald-500 border-b-4 text-emerald-900';
          } else if (isSubmitted && selectedOption === index) {
            btnClass = 'bg-rose-100 border-rose-500 border-b-4 text-rose-900';
          } else if (selectedOption === index) {
            btnClass = 'bg-indigo-100 border-indigo-500 border-b-4 text-indigo-900';
          }

          return (
            <motion.button
              key={index}
              whileTap={{ y: 3 }}
              disabled={isSubmitted}
              onClick={() => handleSelect(index)}
              className={`w-full rounded-2xl p-3 md:p-4 text-right font-bold transition-all ${btnClass}`}
            >
              <TextWrapper text={option} />
            </motion.button>
          );
        })}
      </div>

      {isSubmitted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border-2 p-4 text-sm font-bold dir-rtl">
          {selectedOption === slide.correctIndex ? (
            <div className="flex items-center gap-3 bg-emerald-100 border-emerald-400 text-emerald-900">
              <FaCheckCircle className="text-2xl" />
              <span>صحيح! الاستماع كان ممتازًا.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2 bg-rose-100 border-rose-400 text-rose-900">
              <div className="flex items-center gap-3">
                <FaTimesCircle className="text-2xl" />
                <span>أه! الجواب الصحيح هو:</span>
              </div>
              <span className="rounded-xl bg-white px-3 py-2 border border-rose-200 w-fit">
                <TextWrapper text={slide.options?.[slide.correctIndex] || ''} />
              </span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
