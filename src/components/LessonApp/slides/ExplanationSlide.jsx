import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TextWrapper } from './TextWrapper';

export const ExplanationSlide = ({ slide }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const words = (slide.text || '').trim().split(/\s+/).filter(Boolean);

  useEffect(() => {
    setVisibleCount(0);
  }, [slide.id]);

  useEffect(() => {
    if (visibleCount >= words.length) return;

    const timeout = window.setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, 120);

    return () => window.clearTimeout(timeout);
  }, [visibleCount, words.length]);

  return (
    <div className="rounded-[2rem] border-4 border-violet-200 bg-violet-50 p-6 md:p-8 shadow-sm">
      <p className="text-xl md:text-2xl font-black leading-loose text-slate-900 dir-rtl">
        {words.slice(0, visibleCount).map((word, index) => {
          const cleanedWord = word.trim();
          if (!cleanedWord) return null;

          return (
            <motion.span
              key={`${cleanedWord}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mr-1 inline-block"
            >
              <TextWrapper text={cleanedWord} />
            </motion.span>
          );
        })}
      </p>
    </div>
  );
};
