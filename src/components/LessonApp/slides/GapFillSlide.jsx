import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { TextWrapper } from './TextWrapper';

export const GapFillSlide = ({ slide, onDone }) => {
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

  const renderSentence = () => {
    const parts = (slide.sentence || '').split(/(_{3,})/g);

    return parts.map((part, index) => {
      if (/^_{3,}$/.test(part)) {
        return (
          <span key={index} className="mx-2 inline-block min-w-[90px] border-b-2 border-slate-900" />
        );
      }

      return <TextWrapper key={index} text={part} />;
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 overflow-x-hidden" dir="rtl">
      <div className="rounded-xl border-2 border-slate-100 bg-white p-5">
        <p className="text-xl md:text-2xl font-black text-blue-800 leading-loose [unicode-bidi:plaintext]">
          {renderSentence()}
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
              className={`w-full rounded-xl py-3 px-4 text-right font-bold transition-all ${btnClass} [unicode-bidi:plaintext] active:border-b-0 active:translate-y-1`}
            >
              <TextWrapper text={option} />
            </motion.button>
          );
        })}
      </div>

      {isSubmitted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border-2 p-4 text-sm font-bold [unicode-bidi:plaintext]">
          {selectedOption === slide.correctIndex ? (
            <div className="flex items-center gap-3 bg-orange-100 border-orange-200 text-orange-800 p-3 rounded-lg">
              <FaCheckCircle className="text-2xl" />
              <span>برافو! هذا صحيح.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2 bg-rose-100 border-rose-200 text-rose-900 p-3 rounded-lg">
              <div className="flex items-center gap-3 [unicode-bidi:plaintext]">
                <FaTimesCircle className="text-2xl" />
                <span>خطأ! الجواب الصحيح هو:</span>
              </div>
              <span className="rounded-xl bg-white px-3 py-2 border border-rose-200 w-fit">
                <TextWrapper text={slide.options?.[slide.correctIndex] || ''} />
              </span>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
