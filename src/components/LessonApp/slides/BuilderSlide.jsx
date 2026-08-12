import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

export const BuilderSlide = ({ slide, onDone }) => {
  const [selected, setSelected] = useState([]);
  const [available, setAvailable] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // كنجبدو الداتا من السلايد ملي كيتشارجا
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

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }} className="space-y-5 overflow-x-hidden" dir="rtl">
      <p className="text-lg text-blue-800 font-extrabold [unicode-bidi:plaintext]">{slide.question}</p>

      <div className="min-h-[80px] bg-white border-2 border-slate-100 rounded-2xl p-3 flex flex-wrap gap-3 items-center" dir="ltr">
        {selected.map(word => (
          <motion.button layout key={word.id} onClick={() => move(word, false)} className="py-3 px-4 bg-white border-2 border-slate-200 text-blue-800 font-semibold rounded-xl text-lg shadow-sm [unicode-bidi:plaintext]">{word.text}</motion.button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center border-t-2 border-slate-100 pt-4" dir="ltr">
        {available.map(word => (
          <motion.button layout key={word.id} onClick={() => move(word, true)} className="py-3 px-4 bg-orange-50 border-2 border-orange-200 text-orange-700 font-semibold rounded-xl text-lg hover:bg-orange-100 transition-all [unicode-bidi:plaintext]">{word.text}</motion.button>
        ))}
      </div>

      {!isSubmitted ? (
        <motion.button whileTap={{ y: 4 }} disabled={selected.length === 0} onClick={checkAnswer} className="w-full py-3 md:py-4 bg-orange-500 disabled:opacity-50 text-white rounded-2xl text-lg font-black mt-4 shadow-sm">
          تأكد من الجواب
        </motion.button>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
          {selected.map(w => w.text).join(' ') === correctOrder.join(' ') ? (
            <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-2xl flex items-center gap-3 text-orange-800 font-bold [unicode-bidi:plaintext]"><FaCheckCircle className="text-2xl" /> برافو! جملة صحيحة.</div>
          ) : (
            <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl flex flex-col gap-2 text-rose-900 font-bold">
              <div className="flex items-center gap-3 [unicode-bidi:plaintext]"><FaTimesCircle className="text-2xl"/> خطأ! الجواب الصحيح هو:</div>
              <span className="font-mono bg-white px-3 py-2 border border-rose-200 rounded-lg dir-ltr w-fit">{correctOrder.join(' ')}</span>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};