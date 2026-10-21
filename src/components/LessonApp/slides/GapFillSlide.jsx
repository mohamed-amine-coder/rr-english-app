// src/components/LessonApp/slides/GapFillSlide.jsx
import React, { useEffect, useState } from 'react';
import { TextWrapper } from './TextWrapper';
import { MascotFeedback } from './SharedComponents';

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
    const parts = (slide.sentence || '').split(/(_{2,})/g);
    return parts.map((part, index) => {
      if (/^_{2,}$/.test(part)) {
        const filledWord = selectedOption !== null ? slide.options?.[selectedOption] : '____';
        return (
          <span 
            key={index} 
            className={`mx-1.5 px-3 py-0.5 rounded-lg border-b-2 font-black inline-block text-center transition-colors ${
              !isSubmitted 
                ? 'bg-blue-50 border-blue-400 text-blue-600' 
                : selectedOption === slide.correctIndex
                ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                : 'bg-rose-100 border-rose-500 text-rose-800'
            }`}
          >
            {filledWord}
          </span>
        );
      }
      return <TextWrapper key={index} text={part} />;
    });
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto" dir="rtl">
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 text-center">
        <p className="text-lg sm:text-xl font-black text-slate-800 leading-relaxed [unicode-bidi:plaintext]">
          {renderSentence()}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {slide.options?.map((option, index) => {
          let btnClass = 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50/30';

          if (isSubmitted && index === slide.correctIndex) {
            btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200';
          } else if (isSubmitted && selectedOption === index) {
            btnClass = 'bg-rose-50 border-rose-500 text-rose-900';
          }

          return (
            <button
              type="button"
              key={index}
              disabled={isSubmitted}
              onClick={() => handleSelect(index)}
              className={`w-full rounded-xl py-3 px-4 text-center font-bold text-sm sm:text-base border transition-all cursor-pointer disabled:cursor-default active:scale-[0.98] ${btnClass}`}
            >
              <TextWrapper text={option} />
            </button>
          );
        })}
      </div>

      {isSubmitted && (
        <MascotFeedback 
          isCorrect={selectedOption === slide.correctIndex}
          message={selectedOption === slide.correctIndex ? "برافو! الجواب صحيح 👏" : "الجواب الصحيح هو:"}
          correction={selectedOption !== slide.correctIndex ? <TextWrapper text={slide.options?.[slide.correctIndex] || ''} /> : null}
        />
      )}
    </div>
  );
};