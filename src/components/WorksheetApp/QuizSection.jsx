import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaHeadphones, FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';

export default function QuizSection({ 
  worksheet, 
  currentQuestion, 
  currentQIndex, 
  currentAnswer, 
  isChecked, 
  isPlaying, 
  isSaving, 
  handleSelectOption, 
  handleCheckAnswer, 
  handleNextQuestion, 
  toggleAudio 
}) {
  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {worksheet.audio_url && (
        <div className="bg-slate-50 border-2 border-slate-200 p-2.5 rounded-xl flex items-center justify-between dir-ltr mb-4">
          <div className="flex items-center gap-2">
            <button onClick={toggleAudio} className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center">
              {isPlaying ? <FaPause className="text-xs" /> : <FaPlay className="ml-0.5 text-xs" />}
            </button>
            <span className="font-bold text-slate-600 text-xs">إعادة الاستماع</span>
          </div>
          <FaHeadphones className="text-slate-300 text-lg mr-2" />
        </div>
      )}

      <h2 className="text-lg md:text-xl font-black text-slate-800 mb-6 [unicode-bidi:plaintext] leading-snug">
        {currentQuestion.question}
      </h2>

      <div className="space-y-3">
        {currentQuestion.options.map((opt, oIndex) => {
          const isSelected = currentAnswer === oIndex;
          const isCorrect = oIndex === currentQuestion.correctAnswer;
          
          let btnStyle = "bg-white border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-slate-50";
          let icon = null;

          if (isSelected) btnStyle = "bg-blue-50 border-blue-500 text-blue-900 shadow-sm";
          
          if (isChecked) {
            if (isCorrect) {
              btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm";
              icon = <FaCheckCircle className="text-emerald-500 text-lg shrink-0" />;
            } else if (isSelected && !isCorrect) {
              btnStyle = "bg-rose-50 border-rose-500 text-rose-900 shadow-sm";
              icon = <FaTimesCircle className="text-rose-500 text-lg shrink-0" />;
            } else {
              btnStyle = "bg-white border-slate-100 text-slate-400 opacity-50";
            }
          }

          return (
            <motion.button 
              whileTap={!isChecked ? { scale: 0.98 } : {}}
              key={oIndex}
              disabled={isChecked}
              onClick={() => handleSelectOption(oIndex)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 font-bold transition-all text-right text-sm [unicode-bidi:plaintext] ${btnStyle}`}
            >
              <span>{opt}</span>
              {icon || (
                <div className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-blue-500' : 'border-slate-300'}`}>
                  {isSelected && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 pt-5 border-t-2 border-slate-100">
        {!isChecked ? (
          <button 
            onClick={handleCheckAnswer}
            disabled={currentAnswer === undefined}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-black py-3 rounded-xl border-b-[3px] border-orange-700 active:border-b-0 active:translate-y-1 transition-all text-sm"
          >
            تأكد من الجواب
          </button>
        ) : (
          <button 
            onClick={handleNextQuestion}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-3 rounded-xl border-b-[3px] border-blue-900 active:border-b-0 active:translate-y-1 transition-all text-sm"
          >
            <span>{isSaving ? 'جاري الحفظ...' : currentQIndex === worksheet.questions.length - 1 ? 'إنهاء التمرين' : 'السؤال التالي'}</span>
            {!isSaving && <FaArrowLeft className="text-xs" />}
          </button>
        )}
      </div>
    </div>
  );
}