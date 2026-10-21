// src/components/LessonApp/slides/ExplanationSlide.jsx
import React from 'react';
import { FaLightbulb } from 'react-icons/fa';
import { HybridText } from './HybridText';
import { AudioButton } from './SharedComponents';
import mrRr from '../../../assets/mr-rr.png';

export const ExplanationSlide = ({ slide }) => (
  <div className="space-y-4 text-center flex flex-col items-center max-w-xl mx-auto">
    <div className="flex items-center gap-3">
      <img src={mrRr} alt="Mr RR" className="w-14 h-14 object-cover rounded-2xl border-2 border-amber-300 shadow-xs bg-amber-50" />
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 text-right">
        <HybridText text={slide.title || "قاعدة مهمة 🧠"} />
      </h2>
    </div>

    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-right w-full">
      <p className="text-sm sm:text-base font-bold text-slate-700 leading-relaxed">
        <HybridText text={slide.text || slide.explanation} />
      </p>
    </div>

    {slide.speechText && <AudioButton text={slide.speechText} />}
  </div>
);