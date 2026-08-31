import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { FaCheckCircle, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Lessons() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]); // هادي غنخبيو فيها IDs ديال الدروس المكتملة
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        // 1. كنجيبو جميع الدروس مرتبين من القديم للجديد
        // 1. Kanjibo jmi3 dorous
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons') // Kant lessonsTitles
          .select('*')
          .order('created_at', { ascending: true });

        if (lessonsError) throw lessonsError;

        // 2. كنجيبو التقدم ديال الطالب (إلا كان مكونيكطي)
        let completedIds = [];
        if (user?.id) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_progress')
            .select('lesson_id')
            .eq('user_id', user.id);

          if (!progressError && progressData) {
            completedIds = progressData.map(p => p.lesson_id);
          }
        }

        if (isMounted) {
          setLessons(lessonsData || []);
          setCompletedLessons(completedIds);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden" dir="rtl">
      <div className="max-w-4xl mx-auto px-2">
        
        {/* الهيدر */}
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 tracking-tight mb-3 [unicode-bidi:plaintext]">
            البرنامج الدراسي
          </h1>
          <p className="text-base sm:text-lg text-blue-800/75 max-w-xl mx-auto [unicode-bidi:plaintext]">
            اختار الدرس اللي بغيتي تبدا فيه، وكمل التحديات باش تجمع النقاط.
          </p>
        </motion.div>

        {/* الأنيميشن ديال التحميل */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white border border-gray-100 rounded-2xl p-6 animate-pulse shadow-sm">
                <div className="h-6 bg-blue-50 rounded-md w-1/3 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-12 bg-gray-100 rounded-xl"></div>
                  <div className="h-12 bg-gray-100 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : lessons.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
            <p className="text-blue-800/70 font-semibold text-lg [unicode-bidi:plaintext]">باقي ما كاين حتى درس حالياً! ضيف الدروس من لوحة التحكم.</p>
          </div>
        ) : (
          /* الواجهة ديال الدروس */
          <motion.div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 lg:p-8 shadow-sm" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
            <div className="mb-5">
              <span className="text-xs font-bold tracking-wide text-blue-800 uppercase bg-blue-50 px-3 py-1 rounded-md [unicode-bidi:plaintext]">
                RR English
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-blue-800 mt-3 [unicode-bidi:plaintext]">
                جميع الدروس
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessons.map((lesson, index) => {
                // كنفحصو واش هاد الدرس كاين فليستة الدروس لي سالا الطالب
                const isCompleted = completedLessons.includes(lesson.id);

                return (
                  <motion.div
                    key={lesson.id}
                    className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all duration-200 gap-4 ${
                      isCompleted 
                        ? 'bg-green-100 border-green-100 hover:border-green-200' 
                        : 'bg-blue-50/60 hover:bg-blue-50/40 border-transparent hover:border-blue-100'
                    }`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    whileHover={{ y: -3 }}
                  >
                    {/* معلومات الدرس */}
                    <div className="flex items-start gap-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-xl border text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                        isCompleted 
                          ? 'bg-blue-800 border-blue-900 text-white shadow-sm' 
                          : 'bg-white border-gray-200 text-gray-500 group-hover:border-blue-200 group-hover:text-blue-600'
                      }`}>
                        {isCompleted ? <FaCheckCircle className="text-sm" /> : index + 1}
                      </div>
                      <div className="space-y-1">
                        <h3 className={`font-semibold text-right transition-colors ${
                          isCompleted ? 'text-blue-900' : 'text-gray-800 group-hover:text-blue-600'
                        } [unicode-bidi:plaintext]`}>
                          {lesson.title}
                        </h3>
                        {lesson.description_darija && (
                          <p className={`text-xs text-right leading-relaxed font-medium ${
                            isCompleted ? 'text-blue-800/70' : 'text-gray-500'
                          } [unicode-bidi:plaintext]`}>
                            {lesson.description_darija}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* زر بدأ الدرس */}
                    {/* <Link
                      to={`/lesson/${lesson.slug}`}
                      className={`text-sm font-bold px-4 py-2.5 rounded-xl border transition-all duration-150 shadow-sm active:scale-95 text-center shrink-0 [unicode-bidi:plaintext] ${
                        isCompleted 
                          ? 'bg-white text-blue-800 border-blue-100 hover:bg-blue-50' 
                          : 'bg-orange-500 hover:bg-orange-600 text-white border-transparent'
                      }`}
                    >
                      <span className="inline-block px-1">{isCompleted ? 'مراجعة' : 'بدأ الدرس'}</span>
                    </Link> */}
                    {(() => {
                      // كنشوفو واش الدرس بريميوم
                      const isPremium = lesson.is_premium;
                      
                      // مسموح ليه يلا: الدرس فابور، أو هو أدمين، أو الخطة ديالو Premium
                      const isAuthorized = !isPremium || user?.role === 'admin' || user?.plan === 'Premium';

                      if (isAuthorized) {
                        return (
                          <Link
                            to={`/lesson/${lesson.slug}`}
                            className={`text-sm font-bold px-5 py-2.5 rounded-xl border transition-all duration-200 shadow-sm active:scale-95 text-center shrink-0 ${
                              isCompleted 
                                ? 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50' 
                                : 'bg-white hover:bg-blue-600 text-gray-700 hover:text-white border-gray-200 hover:border-blue-600'
                            }`}
                          >
                            {isCompleted ? 'مراجعة' : 'بدأ الدرس'}
                          </Link>
                        );
                      } else {
                        return (
                          <Link
                            to="/pricing"
                            className="flex items-center justify-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl border-2 border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all duration-200 shadow-sm shrink-0"
                          >
                            <FaLock className="text-xs" />
                            <span>مقفول</span>
                          </Link>
                        );
                      }
                    })()}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Lessons;