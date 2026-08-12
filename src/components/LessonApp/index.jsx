import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaChevronRight } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useLesson } from '../../hooks/useLesson';
import { useProgress } from '../../hooks/useProgress';

import { supabase } from '../../config/supabaseClient';
import { useAuth } from '../../context/AuthContext';

import { Header, ProgressBar, CompletionScreen } from './UIComponents';
import { 
  HookSlide, MistakeSlide, FlipCardSlide, BuilderSlide, DialogueSlide, 
  ImageSlide, GapFillSlide, ListeningSlide, ExplanationSlide, SummarySlide 
} from './slides/index';
export default function MicroLesson() {
  const navigate = useNavigate();
  
  // 1. Njibo les données huma lowlin
  const { user } = useAuth();
  const { id } = useParams();
  const { saveProgress, saving } = useProgress();
  const { currentLesson, lessonSlides, loading, error } = useLesson(id);

  // 2. Daba 3ad nkhdmo b useEffect hit les variables wlaw ma3rofin
  useEffect(() => {
    // Kantsstaw b 'currentLesson' machi 'lesson'
    if (currentLesson && currentLesson.is_premium) {
      const isAuthorized = user?.role === 'admin' || user?.plan === 'Premium';
      
      if (!isAuthorized) {
        navigate('/lessons', { replace: true });
      }
    }
  }, [currentLesson, user, navigate]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [xp, setXp] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const xpRef = useRef(0);

  useEffect(() => {
    setCurrentIndex(0);
    setIsCompleted(false);
    setXp(0);
    xpRef.current = 0;
  }, [id]);

  useEffect(() => {
    xpRef.current = xp;
  }, [xp]);

  const slide = lessonSlides[currentIndex];
  const progress = lessonSlides.length > 0 ? ((currentIndex + 1) / lessonSlides.length) * 100 : 0;

  useEffect(() => {
    if (slide && ['hook', 'mistake', 'flipcard', 'image', 'explanation', 'summary'].includes(slide.type)) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  }, [slide]);

  const handleSlideDone = (xpEarned = 0) => {
    if (xpEarned > 0) {
      setXp((prev) => {
        const nextXp = prev + xpEarned;
        xpRef.current = nextXp;
        return nextXp;
      });
    }
    setCanProceed(true);
  };

  const handleNext = async () => {
    if (currentIndex < lessonSlides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }
    
    const lessonId = currentLesson?.id;
    const xpToSave = xpRef.current;

    console.log('[Lesson completion] start', {
      lessonId,
      currentIndex,
      totalSlides: lessonSlides.length,
      xp,
      xpToSave,
      userId: user?.id,
    });

    if (lessonId) {
      await saveProgress(lessonId, xpToSave);
    }
    
    setIsCompleted(true);
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const handleNextLesson = async () => {
    try {
      const { data, error } = await supabase
        .from('lessonsTitles')
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
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-xl">جاري التحميل... ⏳</div>;
  }

  if (error || !slide) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-xl text-rose-600">الدرس غير موجود! ❌</div>;
  }

  return (
    <div className="min-h-screen text-slate-800 flex flex-col items-center justify-center p-4 font-sans selection:bg-yellow-300">
      <Header xp={(user?.xp || 0) + xp} />
      <div className="w-full max-w-3xl bg-white border-4 border-slate-900 rounded-[2rem] p-5 md:p-8 shadow-[0_8px_0_#0F172A] relative overflow-hidden">
        {!isCompleted ? (
          <>
            <ProgressBar slide={slide} currentIndex={currentIndex} total={lessonSlides.length} progress={progress} />
            <div className="min-h-[220px] md:min-h-[250px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div key={slide.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="w-full">
                  {slide.type === 'hook' && <HookSlide slide={slide} />}
                  {slide.type === 'mistake' && <MistakeSlide slide={slide} />}
                  {slide.type === 'flipcard' && <FlipCardSlide slide={slide} />}
                  {slide.type === 'builder' && <BuilderSlide slide={slide} onDone={handleSlideDone} />}
                  {slide.type === 'dialogue' && <DialogueSlide slide={slide} onDone={handleSlideDone} />}
                  {slide.type === 'image' && <ImageSlide slide={slide} />}
                  {slide.type === 'gapfill' && <GapFillSlide slide={slide} onDone={handleSlideDone} />}
                  {slide.type === 'listening' && <ListeningSlide slide={slide} onDone={handleSlideDone} />}
                  {slide.type === 'explanation' && <ExplanationSlide slide={slide} />}
                  {slide.type === 'summary' && <SummarySlide slide={slide} />}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 md:mt-8 pt-4 border-t-2 border-slate-100 flex justify-end">
              <motion.button whileTap={{ y: 4 }} disabled={!canProceed || saving} onClick={handleNext} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 py-3 rounded-2xl text-base disabled:opacity-30 border-b-4 border-indigo-900 shadow-sm transition">
                <span>{saving ? 'جاري الحفظ...' : currentIndex === lessonSlides.length - 1 ? 'إنهاء' : 'التالي'}</span>
                <FaChevronRight className="text-sm" />
              </motion.button>
            </div>
          </>
        ) : (
          <CompletionScreen onRestart={handleRestart} onNextLesson={handleNextLesson} />
        )}
      </div>
    </div>
  );
}