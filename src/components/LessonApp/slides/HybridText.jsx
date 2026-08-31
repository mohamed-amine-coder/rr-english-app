// src/components/LessonApp/slides/HybridText.jsx
import React from 'react';

/**
 * مكون لعرض النصوص الهجينة (دارجة + إنجليزية) بدون ما تنقز الفواصل أو علامات الترقيم
 */
export const HybridText = ({ text = '', className = '' }) => {
  if (!text) return null;

  // التعرف على العبارات الإنجليزية
  const parts = text.split(/([a-zA-Z0-9'’\-.,!?]+(?:\s+[a-zA-Z0-9'’\-.,!?]+)*)/g);

  return (
    <span className={`inline-block leading-relaxed ${className}`} dir="rtl">
      {parts.map((part, index) => {
        const isEnglish = /^[a-zA-Z0-9'’\-.,!?\s]+$/.test(part) && /[a-zA-Z]/.test(part);
        
        if (isEnglish) {
          return (
            <bdi
              key={index}
              dir="ltr"
              className="inline-block mx-1.5 font-sans font-black text-indigo-600 bg-indigo-50/80 px-2 py-0.5 rounded-lg border border-indigo-100 shadow-xs"
            >
              {part}
            </bdi>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};