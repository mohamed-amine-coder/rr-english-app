// src/components/LessonApp/slides/HookSlide.jsx
import React from 'react';
import { AudioButton } from './SharedComponents';
import msRr from '../../../assets/ms-rr.png';

export const HookSlide = ({ slide }) => (
  <div className="flex flex-col items-center gap-4 text-center dir-rtl max-w-lg mx-auto">
    <div className="relative">
      <img
        src={msRr}
        alt="Mascot"
        className="w-20 h-20 object-cover rounded-2xl border-2 border-slate-200 shadow-sm bg-blue-50"
      />
      <span className="absolute -bottom-1 -left-1 text-lg">👋</span>
    </div>

    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
      {slide.title}
    </h2>
    
    {slide.speechText && <AudioButton text={slide.speechText} />}
    
    <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl w-full">
      <p className="text-amber-950 text-base sm:text-lg font-bold leading-relaxed">
        {slide.question}
      </p>
    </div>
  </div>
);