// src/components/LessonApp/index.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useLesson } from '../../hooks/useLesson';
import { useProgress } from '../../hooks/useProgress';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabaseClient';
import { Header, CompletionScreen } from './UIComponents';

import { 
  HookSlide, MistakeSlide, FlipCardSlide, BuilderSlide, 
  DialogueSlide, GapFillSlide, ExplanationSlide, SummarySlide, SpotErrorSlide
} from './slides/index';

export default function MicroLesson() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { saveProgress, saving } = useProgress();
  const { currentLesson, lessonSlides, loading, error } = useLesson(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [xp, setXp] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);
  const xpRef = useRef(0);

  useEffect(() => {
    setCurrentIndex(0);
    setIsCompleted(false);
    setXp(0);
    xpRef.current = 0;
  }, [id]);

  const slide = lessonSlides?.[currentIndex];
  const progress = lessonSlides?.length > 0 ? ((currentIndex + 1) / lessonSlides.length) * 100 : 0;

  useEffect(() => {
    if (slide && ['hook', 'mistake', 'flipcard', 'explanation', 'summary'].includes(slide.type)) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  }, [slide]);

  const handleSlideDone = (earned = 20) => {
    setXp(prev => {
      const next = prev + earned;
      xpRef.current = next;
      return next;
    });
    setCanProceed(true);
  };

  const handleNext = async () => {
    if (currentIndex < lessonSlides.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return;
    }
    
    if (currentLesson?.id) {
      await saveProgress(currentLesson.id, xpRef.current);
    }
    setIsCompleted(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const handleNextLesson = async () => {
    if (!currentLesson?.created_at) {
      navigate('/lessons');
      return;
    }
    setIsNextLoading(true);
    try {
      const { data } = await supabase
        .from('lessons')
        .select('slug')
        .gt('created_at', currentLesson.created_at)
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

      if (data?.slug) {
        navigate(`/lesson/${data.slug}`);
      } else {
        navigate('/lessons');
      }
    } catch (err) {
      navigate('/lessons');
    } finally {
      setIsNextLoading(false);
    }
  };

  if (loading) {
    return <div className="h-[70vh] flex items-center justify-center font-black text-slate-400 text-base">جاري تحضير الدرس... 🚀</div>;
  }

  if (error || !slide) {
    return <div className="h-[70vh] flex items-center justify-center font-black text-rose-500 text-base">الدرس ما متاحش حالياً! ❌</div>;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col h-[100dvh] w-full md:static md:z-auto md:bg-transparent md:h-[calc(100vh-8.5rem)] md:max-h-[640px] md:items-center md:justify-center font-sans select-none dir-rtl">
      
      {/* Container الرئيسي */}
      <div className="w-full h-full max-w-3xl flex flex-col bg-white md:rounded-3xl md:border md:border-slate-200/90 md:shadow-[0_12px_35px_rgba(15,23,42,0.06)] overflow-hidden relative">
        
        {!isCompleted ? (
          <>
            {/* 1. الشريط العلوي المدمج (بدون أخذ مساحة زايدة) */}
            <div className="px-5 py-3.5 bg-white border-b border-slate-100 flex items-center gap-4 shrink-0">
              <button 
                onClick={() => navigate('/lessons')} 
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="رجوع للدروس"
              >
                <FaTimes className="text-sm" />
              </button>

              <div className="flex-1">
                <Header currentIndex={currentIndex} total={lessonSlides.length} progress={progress} />
              </div>

              <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 font-extrabold text-[11px] rounded-lg shrink-0">
                {slide.tag || 'تحدي ⚡'}
              </span>
            </div>

            {/* 2. منطقة عرض السلايد (ثابتة ووسط الكارت بدون سكرول خارجي) */}
            <div className="flex-1 px-5 py-4 sm:px-10 sm:py-6 overflow-y-auto flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="w-full my-auto"
                >
                  {slide.type === 'hook' && <HookSlide slide={slide} />}
                  {slide.type === 'mistake' && <MistakeSlide slide={slide} />}
                  {slide.type === 'flipcard' && <FlipCardSlide slide={slide} />}
                  {slide.type === 'builder' && <BuilderSlide slide={slide} onDone={handleSlideDone} />}
                  {slide.type === 'dialogue' && <DialogueSlide slide={slide} onDone={handleSlideDone} />}
                  {slide.type === 'gapfill' && <GapFillSlide slide={slide} onDone={handleSlideDone} />}
                  {slide.type === 'spot_error' && <SpotErrorSlide slide={slide} onDone={handleSlideDone} />}
                  {slide.type === 'explanation' && <ExplanationSlide slide={slide} />}
                  {slide.type === 'summary' && <SummarySlide slide={slide} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3. الفوتر السفلي للكارت */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0 relative z-30">
              <button
                onClick={() => setCurrentIndex(c => Math.max(0, c - 1))}
                disabled={currentIndex === 0}
                className="text-slate-500 hover:text-slate-800 font-bold text-sm px-4 py-2 rounded-xl hover:bg-slate-200/50 disabled:opacity-0 transition-all cursor-pointer disabled:cursor-default flex items-center gap-2"
              >
                <FaArrowRight className="text-xs" />
                <span>السابق</span>
              </button>

              <button
                disabled={!canProceed || saving}
                onClick={handleNext}
                className={`flex items-center gap-2 font-black px-7 py-2.5 rounded-xl text-sm transition-all cursor-pointer disabled:cursor-not-allowed ${
                  canProceed && !saving
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 active:scale-[0.98]'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                <span>{saving ? 'جاري الحفظ...' : currentIndex === lessonSlides.length - 1 ? 'إنهاء الدرس 🎉' : 'متابعة'}</span>
                <FaArrowLeft className="text-xs" />
              </button>
            </div>
          </>
        ) : (
          <CompletionScreen 
            onRestart={handleRestart} 
            onNextLesson={handleNextLesson} 
            isNextLoading={isNextLoading} 
          />
        )}
      </div>
    </div>
  );
}