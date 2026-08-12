import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';

export const useLesson = (lessonId) => {
  // ملاحظة: lessonId هنا راه هي الكلمة لي فالرابط (slug) حيت هكاك مسمينها فـ App.jsx
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonSlides, setLessonSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLesson = async () => {
      // 1. إلى مكانش الـ ID (يعني الـ slug)، ما نديرو والو
      if (!lessonId) {
        if (isMounted) setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      // 2. كنجيبو العنوان ديال الدرس من lessonsTitles باستعمال الـ slug
      const { data: lessonData, error: lessonError } = await supabase
        .from('lessonsTitles')
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

      // 3. كنجيبو السلايدات ديال هاد الدرس بالـ ID الحقيقي لي عاد جبنا
      const { data: slidesData, error: slidesError } = await supabase
        .from('slides')
        .select('*')
        .eq('lesson_id', lessonData.id)
        .order('slide_order', { ascending: true });

      if (!isMounted) return;

      if (slidesError) {
        setCurrentLesson(lessonData);
        setLessonSlides([]);
        setLoading(false);
        setError(slidesError.message);
        return;
      }

      // 4. كنقادو السلايدات باش يخدمو فـ الواجهة
      const formattedSlides = (slidesData || []).map((slide) => ({
        id: slide.id,
        type: slide.type,
        tag: slide.tag,
        ...slide.content,
      }));

      setCurrentLesson(lessonData);
      setLessonSlides(formattedSlides);
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