import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaTimesCircle, FaCheckCircle, FaSyncAlt } from 'react-icons/fa';

export const playAudio = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }
};

const AudioButton = ({ text }) => (
  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} onClick={() => playAudio(text)} className="mb-4 px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white border-b-4 border-sky-600 rounded-2xl flex items-center gap-2 text-sm font-extrabold shadow-sm transition w-fit">
    <FaVolumeUp className="text-base" /><span>النطق 🔊</span>
  </motion.button>
);

export const HookSlide = ({ slide }) => (
  <>
    {slide.speechText && <AudioButton text={slide.speechText} />}
    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-right dir-rtl">
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">{slide.title}</h2>
      </div>
      <div className="flex-1 p-6 bg-yellow-100 border-3 border-yellow-400 rounded-3xl w-full">
        <p className="text-slate-800 text-xl font-bold leading-relaxed">{slide.question}</p>
      </div>
    </div>
  </>
);

export const MistakeSlide = ({ slide }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => setIsRevealed(false), [slide]);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-black text-slate-900 dir-rtl mb-4">{slide.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-rose-50 border-3 border-rose-300 rounded-3xl flex flex-col items-center justify-center text-center">
          <FaTimesCircle className="text-rose-500 text-4xl mb-2" />
          <p className="text-rose-900 font-black text-xl line-through">{slide.wrong}</p>
        </div>
        {!isRevealed ? (
          <motion.button whileTap={{ y: 4 }} onClick={() => setIsRevealed(true)} className="p-5 bg-emerald-400 border-b-4 border-emerald-600 rounded-3xl flex items-center justify-center text-slate-900 font-black text-lg shadow-sm">
            اكتشف الجواب الصحيح ✨
          </motion.button>
        ) : (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-5 bg-emerald-50 border-3 border-emerald-300 rounded-3xl flex flex-col items-center justify-center text-center">
            <FaCheckCircle className="text-emerald-500 text-4xl mb-2" />
            <p className="text-emerald-900 font-black text-xl">{slide.right}</p>
          </motion.div>
        )}
      </div>
      {isRevealed && <p className="text-sm font-bold text-slate-600 dir-rtl text-center mt-3 bg-slate-100 p-3 rounded-xl border-2 border-slate-200">{slide.explanation}</p>}
    </div>
  );
};

export const FlipCardSlide = ({ slide }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => setIsFlipped(false), [slide]);

  return (
    <div className="flex flex-col items-center justify-center perspective-1000 w-full md:w-3/4 mx-auto">
      <motion.div className="w-full min-h-[220px] bg-white border-4 border-slate-900 rounded-[2rem] p-6 shadow-[0_6px_0_#0F172A] cursor-pointer flex flex-col items-center justify-center text-center relative" onClick={() => setIsFlipped(!isFlipped)} animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.4, type: "spring" }} style={{ transformStyle: 'preserve-3d' }}>
        {!isFlipped ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-6">
            <FaSyncAlt className="text-slate-300 text-2xl absolute top-4 right-4" />
            <h2 className="text-4xl md:text-5xl font-black text-indigo-700">{slide.word}</h2>
            <p className="text-slate-400 font-mono mt-2 text-lg">{slide.phonetic}</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-6 bg-indigo-50 rounded-[2rem]" style={{ transform: 'rotateY(180deg)' }}>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dir-rtl">{slide.meaning}</h3>
            <div className="w-12 h-1 bg-indigo-200 rounded-full my-4"></div>
            <p className="text-lg font-bold text-indigo-800 text-center">"{slide.example}"</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const BuilderSlide = ({ slide, onDone }) => {
  const [selected, setSelected] = useState([]);
  const [available, setAvailable] = useState(slide.words);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => { setSelected([]); setAvailable(slide.words); setIsSubmitted(false); }, [slide]);

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
    const isCorrect = selected.map(w => w.text).join(' ') === slide.correctOrder.join(' ');
    onDone(isCorrect ? 20 : 0);
  };

  return (
    <div className="space-y-5">
      <p className="text-lg text-slate-800 dir-rtl font-extrabold">{slide.question}</p>
      <div className="min-h-[80px] bg-slate-100 border-3 border-dashed border-slate-300 rounded-3xl p-3 flex flex-wrap gap-2 items-center dir-ltr">
        {selected.map(word => (
          <motion.button layout key={word.id} onClick={() => move(word, false)} className="px-4 py-2 bg-white border-2 border-slate-900 border-b-4 text-slate-900 font-black rounded-xl text-lg transition-all">{word.text}</motion.button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 dir-ltr justify-center border-t-2 border-slate-100 pt-4">
        {available.map(word => (
          <motion.button layout key={word.id} onClick={() => move(word, true)} className="px-4 py-2 bg-purple-100 border-2 border-purple-500 border-b-4 text-purple-900 font-black rounded-xl text-lg hover:bg-purple-200 transition-all">{word.text}</motion.button>
        ))}
      </div>
      {!isSubmitted ? (
        <motion.button whileTap={{ y: 4 }} disabled={selected.length === 0} onClick={checkAnswer} className="w-full py-3 md:py-4 bg-emerald-400 disabled:opacity-50 text-slate-900 border-b-4 border-emerald-600 rounded-2xl text-lg font-black mt-4">
          تأكد من الجواب
        </motion.button>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
          {selected.map(w => w.text).join(' ') === slide.correctOrder.join(' ') ? (
            <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center gap-3 dir-rtl text-emerald-900 font-bold"><FaCheckCircle className="text-2xl" /> برافو! جملة صحيحة.</div>
          ) : (
            <div className="p-4 bg-rose-100 border-2 border-rose-400 rounded-2xl flex flex-col gap-2 dir-rtl text-rose-900 font-bold">
              <div className="flex items-center gap-3"><FaTimesCircle className="text-2xl"/> خطأ! الجواب الصحيح هو:</div>
              <span className="font-mono bg-white px-3 py-1 border border-rose-200 rounded-lg dir-ltr w-fit">{slide.correctOrder.join(' ')}</span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const DialogueSlide = ({ slide, onDone }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => { setSelectedOption(null); setIsSubmitted(false); }, [slide]);

  const checkAnswer = () => {
    setIsSubmitted(true);
    onDone(selectedOption === slide.correctIndex ? 20 : 0);
  };

  return (
    <div className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-3xl border-2 border-slate-100">
      <div className="flex items-center justify-between mb-4 border-b-2 border-slate-200 pb-2">
         <span className="font-extrabold text-slate-700 dir-rtl text-sm bg-white px-3 py-1 rounded-lg border border-slate-200">{slide.context}</span>
      </div>
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-slate-900 flex-shrink-0"></div>
        <div className="bg-white border-2 border-slate-900 p-3 md:p-4 rounded-2xl rounded-tl-none font-bold text-slate-800 text-base">{slide.personA}</div>
      </div>
      <div className="flex flex-col gap-3 pl-8 md:pl-12 mt-4">
        {slide.options.map((opt, idx) => {
          let btnStyle = "bg-white border-2 border-slate-300 border-b-4 text-slate-700";
          if (selectedOption === idx) btnStyle = "bg-indigo-100 border-indigo-500 border-b-4 text-indigo-900";
          if (isSubmitted && idx === slide.correctIndex) btnStyle = "bg-emerald-100 border-emerald-500 border-b-4 text-emerald-900";
          else if (isSubmitted && selectedOption === idx) btnStyle = "bg-rose-100 border-rose-500 border-b-4 text-rose-900";

          return (
            <motion.button key={idx} whileTap={{ y: 3 }} disabled={isSubmitted} onClick={() => setSelectedOption(idx)} className={`w-full p-3 md:p-4 rounded-2xl rounded-tr-none text-left font-bold transition-all ${btnStyle}`}>{opt}</motion.button>
          );
        })}
      </div>
      {!isSubmitted ? (
        <motion.button whileTap={{ y: 4 }} disabled={selectedOption === null} onClick={checkAnswer} className="w-full mt-4 py-3 bg-emerald-400 disabled:opacity-40 text-slate-900 border-b-4 border-emerald-600 rounded-2xl font-black">جاوب</motion.button>
      ) : (
        <p className="text-sm text-emerald-900 p-3 bg-emerald-100 border-2 border-emerald-300 rounded-xl dir-rtl mt-2 text-center font-bold">{slide.explanation}</p>
      )}
    </div>
  );
};