import React from 'react';
import { AudioButton } from './SharedComponents';
import { TextWrapper } from './TextWrapper';

export const ImageSlide = ({ slide }) => (
  <div className="space-y-5 text-center">
    {slide.speechText && <AudioButton text={slide.speechText} />}

    {slide.image && (
      <img
        src={slide.image}
        alt={slide.word || 'lesson image'}
        className="mx-auto max-h-64 md:max-h-80 w-full object-contain rounded-[2rem] border-4 border-slate-900 shadow-[0_8px_0_#0F172A]"
      />
    )}

    <div className="rounded-xl border-4 border-amber-300 bg-amber-100 p-5 shadow-sm">
      <p className="text-2xl md:text-3xl font-black text-slate-900 dir-rtl">
        <TextWrapper text={slide.word || ''} />
      </p>
    </div>
  </div>
);
