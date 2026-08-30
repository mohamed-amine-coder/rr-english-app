import React from 'react';
import { AudioButton } from './SharedComponents';

export const HookSlide = ({ slide }) => (
  <>
    {slide.speechText && <AudioButton text={slide.speechText} />}
    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-right dir-rtl">
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">{slide.title}</h2>
      </div>
      <div className="flex-1 p-6 bg-yellow-100 border-3 border-yellow-400 rounded-xl w-full">
        <p className="text-slate-800 text-xl font-bold leading-relaxed">{slide.question}</p>
      </div>
    </div>
  </>
);
