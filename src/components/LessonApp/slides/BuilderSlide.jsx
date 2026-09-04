import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 overflow-x-hidden" dir="rtl">
      <p className="text-lg text-blue-800 font-extrabold [unicode-bidi:plaintext]">{slide.question}</p>

      <div className="min-h-[80px] bg-white border-2 border-slate-100 rounded-xl p-3 flex flex-wrap gap-3 items-center" dir="ltr">
        {selected.map(word => (
          <motion.button layout key={word.id} onClick={() => move(word, false)} className="py-3 px-4 bg-white border-2 border-slate-200 text-blue-800 font-semibold rounded-xl text-lg shadow-sm [unicode-bidi:plaintext] cursor-pointer hover:bg-slate-50">
            {word.text}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center border-t-2 border-slate-100 pt-4" dir="ltr">
        {available.map(word => (
          <motion.button layout key={word.id} onClick={() => move(word, true)} className="py-3 px-4 bg-orange-50 border-2 border-orange-200 text-orange-700 font-semibold rounded-xl text-lg hover:bg-orange-100 transition-all [unicode-bidi:plaintext] cursor-pointer">
            {word.text}
          </motion.button>
        ))}
      </div>

      {!isSubmitted ? (
        <motion.button disabled={selected.length === 0} onClick={checkAnswer} className="w-full py-3 md:py-4 bg-orange-50 text-orange-900 border-2 border-orange-300 rounded-xl text-lg font-black mt-4 shadow-sm border-b-[3px] border-orange-400 active:border-b-0 active:translate-y-1 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
          تأكد من الجواب
        </motion.button>
      ) : (
        <MascotFeedback 
          isCorrect={isCorrect}
          message={isCorrect ? "برافو! جملة صحيحة 👏" : "خطأ! الترتيب الصحيح هو:"}
          correction={!isCorrect ? correctOrder.join(' ') : null}
        />
      )}
    </motion.div>
  );
};