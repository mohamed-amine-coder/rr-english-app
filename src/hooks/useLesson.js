import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';

export const useLesson = (lessonId) => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonSlides, setLessonSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLesson = async () => {
      if (!lessonId) {
        if (isMounted) setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      // Njibo dars w JSON array dyal slides
      const { data: lessonData, error: lessonError } = await supabase
        .from('lessons')
        .select('*')
        .eq('slug', lessonId)
        .single();

      if (!isMounted) return;

      if (lessonError) {
        setCurrentLesson(null);
        setLessonSlides([]);
        setLoading(false);
        setError(lessonError.message);
        return;
      }

      setCurrentLesson(lessonData);
      // Slides rah deja format JSON array kima dekheltihom
      setLessonSlides(lessonData.slides || []);
      setLoading(false);
    };

    fetchLesson();

    return () => {
      isMounted = false;
    };
  }, [lessonId]);

  return {
    currentLesson,
    lessonSlides,
    loading,
    error,
  };
};