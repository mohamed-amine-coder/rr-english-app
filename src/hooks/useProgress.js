import { useCallback, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabaseClient';

export const useProgress = () => {
  const { user, updateLocalXP } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const saveProgress = useCallback(
    async (lessonId, xpEarned) => {
      if (!user?.id) {
        setError('No active session');
        return false;
      }
      
      setSaving(true);
      setError(null);

      console.log('[useProgress] starting saveProgress', {
        lessonId,
        xpEarned,
        userId: user?.id,
      });
      
      try {
        // 1. كنسجلو بلي اليوزر كمل الدرس
        // استعملنا insert عوض upsert، وكنتجاهلو خطأ 23505 يلا كان ديجا مكملو
        const { error: progressError } = await supabase
          .from('user_progress')
          .insert([{ user_id: user.id, lesson_id: lessonId }]);
          
        console.log('[useProgress] user_progress insert complete', { progressError });

        if (progressError && progressError.code !== '23505') {
          throw progressError;
        }

        // 2. كنجيبو النقط ديريكت من القاعدة باش نتفاداو المشاكل ديال Cache
        const { data: userData, error: fetchError } = await supabase
          .from('users')
          .select('xp')
          .eq('id', user.id)
          .single();
          
        console.log('[useProgress] fetched current xp', { userId: user.id, xp: userData?.xp });

        if (fetchError) throw fetchError;

        const newXp = (userData?.xp || 0) + xpEarned;
        console.log('[useProgress] updating user xp', { userId: user.id, oldXp: userData?.xp || 0, xpEarned, newXp });
        
        // 3. كنزيدو النقط للبروفايل
        const { error: userError } = await supabase
          .from('users')
          .update({ xp: newXp })
          .eq('id', user.id);
          
        if (userError) {
          console.error('[useProgress] users.update failed', userError);
          throw userError;
        }

        // 4. تحديث النقط فـ Navbar باش يبانو ديك اللحظة
        if (updateLocalXP) {
          console.log('[useProgress] updating local XP state', { xpEarned });
          updateLocalXP(xpEarned);
        }
        
        return true;
      } catch (err) {
        console.error("Error saving progress:", err);
        setError(err.message);
        return false;
      } finally {
        setSaving(false);
      }
    },
    [user, updateLocalXP]
  );

  return { saveProgress, saving, error };
};