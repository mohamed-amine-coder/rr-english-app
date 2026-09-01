// src/components/LessonApp/index.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaChevronLeft, FaChevronRight, FaVolumeUp } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useLesson } from '../../hooks/useLesson';
import { useProgress } from '../../hooks/useProgress';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabaseClient';
import { Header, CompletionScreen } from './UIComponents';

// استيراد السلايدات
import { 
  HookSlide, MistakeSlide, FlipCardSlide, BuilderSlide, 
  DialogueSlide, GapFillSlide, ExplanationSlide, SummarySlide, SpotErrorSlide
} from './slides/index';

export default function MicroLesson() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const { saveProgress, saving } = useProgress();
  const { currentLesson, lessonSlides, loading, error } = useLesson(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [xp, setXp] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false); // حالة التحميل ديال الدرس الجاي
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
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  // دالة إعادة الدرس
  const handleRestart = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // دالة المرور للدرس القادم
  const handleNextLesson = async () => {
    if (!currentLesson?.created_at) {
      navigate('/lessons');
      return;
    }
    
    setIsNextLoading(true);
    try {
      // كنقلبو فجدول lessons على أول درس تكرية من بعد الدرس الحالي
      const { data, error } = await supabase
        .from('lessons')
        .select('slug')
        .gt('created_at', currentLesson.created_at)
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

      if (data && data.slug) {
        navigate(`/lesson/${data.slug}`);
      } else {
        navigate('/lessons');
      }
    } catch (err) {
      console.error("Error in handleNextLesson:", err);
      navigate('/lessons');
    } finally {
      setIsNextLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-black text-slate-400 text-lg">جاري تحضير الدرس... 🚀</div>;
  }

  if (error || !slide) {
    return <div className="min-h-screen flex items-center justify-center font-black text-rose-500">الدرس ما متاحش حالياً! ❌</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100/60 flex flex-col items-center justify-center p-3 sm:p-6 font-sans select-none dir-rtl">
      
      <Header currentIndex={currentIndex} total={lessonSlides.length} progress={progress} />

      <div className="w-full max-w-2xl bg-white border-[3.5px] border-slate-900 rounded-[2.5rem] shadow-[0_10px_0_#0F172A] flex flex-col h-[580px] sm:h-[540px] relative overflow-hidden">
        
        {!isCompleted ? (
          <>
            <div className="px-6 pt-5 pb-2 flex justify-between items-center shrink-0 border-b border-slate-100">
              <span className="px-3 py-1 bg-amber-100 border-2 border-amber-300 text-amber-900 font-black text-xs rounded-xl shadow-xs">
                {slide.tag || 'تحدي سريع ⚡'}
              </span>
              <span className="text-xs font-black text-slate-400 font-mono">
                {currentIndex + 1} / {lessonSlides.length}
              </span>
            </div>

            <div className="flex-1 p-5 sm:p-7 overflow-y-auto flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
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

            <div className="p-4 sm:p-5 bg-slate-50/80 border-t-2 border-slate-100 flex justify-between items-center shrink-0">
              <button
                onClick={() => setCurrentIndex(c => Math.max(0, c - 1))}
                disabled={currentIndex === 0}
                className="text-slate-400 hover:text-slate-700 font-black text-sm px-4 py-2 disabled:opacity-0 transition-opacity"
              >
                السابق
              </button>

              <button
                disabled={!canProceed || saving}
                onClick={handleNext}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:hover:bg-indigo-600 text-white font-black px-8 py-3.5 rounded-2xl text-base border-b-4 border-indigo-950 active:border-b-0 active:translate-y-1 shadow-md transition-all cursor-pointer"
              >
                <span>{saving ? 'كنسجلو...' : currentIndex === lessonSlides.length - 1 ? 'سالينا 🎉' : 'دوز ➔'}</span>
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