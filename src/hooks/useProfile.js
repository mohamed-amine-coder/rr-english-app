import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabaseClient';

export const useProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  // زدنا هاد الـ State باش نحفظو فيه التقدم
  const [progressStats, setProgressStats] = useState({ completed: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfileData = async () => {
      if (!user?.id) {
        if (isMounted) {
          setProfile(null);
          setLoading(false);
          setError('No active session');
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 1. نجيبو معلومات البروفايل
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (userError) throw userError;

        // 2. نحسبو شحال من درس كاين فالسيت كامل
        const { count: totalLessons, error: totalError } = await supabase
          .from('lessonsTitles')
          .select('*', { count: 'exact', head: true });

        if (totalError) throw totalError;

        // 3. نحسبو شحال من درس سالا هاد الطالب
        const { count: completedLessons, error: progressError } = await supabase
          .from('user_progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (progressError) throw progressError;

        if (isMounted) {
          setProfile(userData);
          setProgressStats({
            completed: completedLessons || 0,
            total: totalLessons || 0
          });
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProfileData();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  return {
    profile,
    progressStats, // كنصدرو هاد الداتا باش نخدمو بيها فالواجهة
    loading: authLoading || loading,
    error,
  };
};