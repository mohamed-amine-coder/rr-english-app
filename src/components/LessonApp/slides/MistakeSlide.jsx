// src/components/LessonApp/slides/MistakeSlide.jsx
import React from 'react';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { HybridText } from './HybridText';

export const MistakeSlide = ({ slide }) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <span className="text-xs font-black text-rose-500 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
          غلطة كيديروها بزاف 🤦‍♂️
        </span>
        <h3 className="text-xl font-black text-slate-800 mt-2">
          <HybridText text={slide.title || "رد البال متقولش هاكا:"} />
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* الغلط */}
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center gap-3">
          <FaTimesCircle className="text-rose-500 text-2xl shrink-0" />
          <span 
            dir="ltr" 
            className="text-rose-950 font-black text-base line-through dir-ltr font-sans text-left w-full"
          >
            {slide.wrong}
          </span>
        </div>

        {/* الصحيح */}
        <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex items-center gap-3">
          <FaCheckCircle className="text-emerald-500 text-2xl shrink-0" />
          <span 
            dir="ltr" 
            className="text-emerald-950 font-black text-base dir-ltr font-sans text-left w-full"
          >
            {slide.right}
          </span>
        </div>
      </div>

      {/* الشرح */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
        <p className="text-xs sm:text-sm font-bold text-slate-600">
          <HybridText text={slide.explanation || "هادي هي الطريقة لي كيهضرو بيها Native Speakers!"} />
        </p>
      </div>
    </div>
  );
};