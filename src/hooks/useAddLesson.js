import { useState } from 'react';
import { supabase } from '../config/supabaseClient';

export const useAddLesson = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // ضفنا isPremium كمتغير ثالث
  const addLessonWithJSON = async (title, slidesJsonString, isPremium = false) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      if (!title?.trim()) throw new Error("ضروري تكتب عنوان الدرس");

      let slidesArray = [];
      try {
        slidesArray = JSON.parse(slidesJsonString);
        if (!Array.isArray(slidesArray)) throw new Error();
      } catch (e) {
        throw new Error("كاين خطأ فـ الـ JSON. تأكد من الأقواس [] والفواصل.");
      }

      const slug = title.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/(^-|-$)+/g, '');

      // زدنا is_premium فعملية الإدخال لـ Supabase
      const { data: lessonData, error: lessonError } = await supabase
        .from('lessonsTitles')
        .insert([{ title: title.trim(), slug: slug, is_premium: isPremium }])
        .select()
        .single();

      if (lessonError) throw lessonError;

      const slidesToInsert = slidesArray.map((slide, index) => {
        const { type, tag, id, ...contentData } = slide;
        return {
          lesson_id: lessonData.id,
          slide_order: index + 1,
          type: type,
          tag: tag || 'عام',
          content: contentData,
        };
      });

      if (slidesToInsert.length > 0) {
        const { error: slidesError } = await supabase.from('slides').insert(slidesToInsert);
        if (slidesError) throw slidesError;
      }

      setSuccess(true);
      return true;

    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addLessonWithJSON, loading, success, error };
};