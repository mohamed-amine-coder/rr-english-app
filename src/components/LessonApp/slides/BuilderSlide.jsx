// src/components/LessonApp/slides/BuilderSlide.jsx
import React, { useState, useEffect } from 'react';
import { MascotFeedback } from './SharedComponents';

export const BuilderSlide = ({ slide, onDone }) => {
  const [selected, setSelected] = useState([]);
  const [available, setAvailable] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setSelected([]);
    setAvailable(slide.words || []);
    setIsSubmitted(false);
  }, [slide]);

  const move = (word, toSelected) => {
    if (isSubmitted) return;
    if (toSelected) {
      setAvailable(prev => prev.filter(w => w.id !== word.id));
      setSelected(prev => [...prev, word]);
    } else {
      setSelected(prev => prev.filter(w => w.id !== word.id));
      setAvailable(prev => [...prev, word]);
    }
  };

  const checkAnswer = () => {
    setIsSubmitted(true);
    const correctOrder = slide.correctOrder || [];
    const isCorrect = selected.map(w => w.text).join(' ') === correctOrder.join(' ');
    onDone(isCorrect ? 20 : 0);
  };

  const correctOrder = slide.correctOrder || [];
  const isCorrect = selected.map(w => w.text).join(' ') === correctOrder.join(' ');

  return (
    <div className="space-y-4 max-w-xl mx-auto" dir="rtl">
      <h3 className="text-base sm:text-lg text-slate-800 font-black [unicode-bidi:plaintext]">
        {slide.question}
      </h3>

      {/* منطقة تركيب الجملة - ارتفاع ثابت باش ما تنقزش */}
      <div className="min-h-[68px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-3 flex flex-wrap gap-2 items-center" dir="ltr">
        {selected.length === 0 && (
          <span className="text-xs font-bold text-slate-400 mx-auto select-none">
            كليكي على الكلمات لتحت باش تركب الجملة
          </span>
        )}
        {selected.map(word => (
          <button
            type="button"
            key={word.id}
            onClick={() => move(word, false)}
            className="py-2 px-3.5 bg-blue-600 text-white font-bold rounded-xl text-sm shadow-xs hover:bg-blue-700 transition-transform active:scale-95 cursor-pointer"
          >
            {word.text}
          </button>
        ))}
      </div>

      {/* الكلمات المتاحة - ارتفاع ثابت */}
      <div className="min-h-[60px] flex flex-wrap gap-2 justify-center items-center py-2" dir="ltr">
        {available.map(word => (
          <button
            type="button"
            key={word.id}
            onClick={() => move(word, true)}
            className="py-2 px-3.5 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 text-slate-700 font-bold rounded-xl text-sm shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            {word.text}
          </button>
        ))}
      </div>

      {!isSubmitted ? (
        <button
          type="button"
          disabled={selected.length === 0}
          onClick={checkAnswer}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-xl text-sm font-black transition-all active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
        >
          تأكد من الجواب
        </button>
      ) : (
        <MascotFeedback 
          isCorrect={isCorrect}
          message={isCorrect ? "برافو! ترتيب صحيح 👏" : "الترتيب الصحيح هو:"}
          correction={!isCorrect ? correctOrder.join(' ') : null}
        />
      )}
    </div>
  );
};