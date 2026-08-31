import { useState } from 'react';
import { supabase } from '../config/supabaseClient';

export const useAddLesson = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const addLessonWithJSON = async (title, slidesJsonString, isPremium = false) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      if (!title?.trim()) throw new Error("Darouri tekteb 3onwan dars");

      let slidesArray = [];
      try {
        slidesArray = JSON.parse(slidesJsonString);
        if (!Array.isArray(slidesArray)) throw new Error();
      } catch (e) {
        throw new Error("Kayn khat2 f JSON. T2akked mn l'a9was [] w lfawasil.");
      }

      const slug = title.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/(^-|-$)+/g, '');

      // Insert dars w slides f d9a we7da
      const { error: lessonError } = await supabase
        .from('lessons')
        .insert([{ 
            title: title.trim(), 
            slug: slug, 
            is_premium: isPremium,
            slides: slidesArray 
        }]);

      if (lessonError) throw lessonError;

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