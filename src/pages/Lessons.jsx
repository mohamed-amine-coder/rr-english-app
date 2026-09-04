import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { FaCheckCircle, FaLock, FaSpinner, FaPlay, FaRedo, FaRocket, FaCrown, FaBolt } from 'react-icons/fa';
import { motion } from 'framer-motion';

// استيراد الشخصيات
import mrRr from '../assets/mr-rr.png';
import msRr from '../assets/ms-rr.png';

// 1. مكون الكارت الأفقية للدرس بتصميم تحفيزي وفخم
const InteractiveLessonCard = ({ lesson, index, isCompleted, isAuthorized, onActionClick }) => {
  // التناوب بين الشخصيات
  const currentMascot = index % 2 === 0 ? mrRr : msRr;

  // تحديد الألوان حسب حالة الدرس (مكتمل، متاح، مقفول)
  let statusTheme = {
    bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    glow: 'bg-blue-400',
    border: 'hover:border-blue-300',
    iconBg: 'bg-blue-600 border-blue-400 text-white',
    icon: <FaPlay className="text-xl ml-1" />,
    textHover: 'group-hover:text-blue-600'
  };

  if (isCompleted) {
    statusTheme = {
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      glow: 'bg-emerald-400',
      border: 'hover:border-emerald-300 border-emerald-100',
      iconBg: 'bg-emerald-500 border-emerald-400 text-white',
      icon: <FaRedo className="text-xl" />,
      textHover: 'group-hover:text-emerald-600'
    };
  } else if (!isAuthorized) {
    statusTheme = {
      bg: 'bg-gradient-to-br from-slate-50 to-slate-100',
      glow: 'bg-slate-400',
      border: 'hover:border-amber-300',
      iconBg: 'bg-slate-100 border-slate-200 text-slate-500',
      icon: <FaLock className="text-xl" />,
      textHover: 'group-hover:text-amber-600'
    };
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => onActionClick(lesson, isAuthorized)}
      className={`group flex flex-col sm:flex-row bg-white rounded-3xl shadow-sm hover:shadow-xl border-2 border-slate-100 ${statusTheme.border} overflow-hidden transition-all duration-300 cursor-pointer relative`}
    >
      {/* جهة الصورة والشخصية */}
      <div className={`relative w-full sm:w-[35%] shrink-0 ${statusTheme.bg} flex items-center justify-center p-4 overflow-hidden border-b-2 sm:border-b-0 sm:border-l-2 border-slate-100`}>
        
        {/* إضاءة دائرية فالخلفية */}
        <div className={`absolute w-24 h-24 rounded-full blur-2xl opacity-30 transition-transform duration-700 group-hover:scale-150 ${statusTheme.glow}`}></div>

        {/* صورة الشخصية */}
        <img 
          src={currentMascot} 
          alt="Mascot" 
          className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border-4 border-white shadow-md group-hover:-translate-y-2 transition-transform duration-500" 
        />
        
        {/* طبقة ضبابية كطّلع فالهوفر فيها الأيقونة (Play / Redo / Lock) */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 transition-transform group-hover:scale-110 ${statusTheme.iconBg}`}>
            {statusTheme.icon}
          </div>
        </div>

        {/* شريط التقدم الوهمي / الزينة لتحت */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-200 z-30">
          {isCompleted && <div className="h-full w-full bg-emerald-500"></div>}
          {!isCompleted && isAuthorized && <div className="h-full w-[15%] bg-blue-500"></div>}
        </div>
      </div>

      {/* جهة التفاصيل والوصف */}
      <div className="p-5 flex-1 flex flex-col justify-center bg-white relative">
        
        <div className="flex justify-between items-start mb-3">
          {/* بادج الحالة (مكتمل أو رقم الدرس) */}
          {isCompleted ? (
            <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-black px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
              <FaCheckCircle /> مكتمل
            </span>
          ) : (
            <span className="bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-black px-2.5 py-1 rounded-lg shadow-sm">
              الدرس {index + 1}
            </span>
          )}

          {/* بادج المجاني / المدفوع */}
          {!lesson.is_premium ? (
            <span className="text-emerald-500 text-[10px] font-black tracking-wider bg-emerald-50/50 border border-emerald-100 px-2 py-1 rounded-md">
              مجاني 🎁
            </span>
          ) : (
            <span className="text-amber-500 text-[10px] font-black tracking-wider bg-amber-50/50 border border-amber-100 px-2 py-1 rounded-md flex items-center gap-1">
              <FaCrown className="text-[10px]" /> Premium
            </span>
          )}
        </div>
        
        <h2 className={`text-lg sm:text-xl font-black text-slate-800 mb-2 transition-colors ${statusTheme.textHover} [unicode-bidi:plaintext]`}>
          {lesson.title}
        </h2>
        
        {lesson.description_darija && (
          <p className="text-slate-500 text-xs sm:text-sm font-bold leading-relaxed line-clamp-2 [unicode-bidi:plaintext]">
            {lesson.description_darija}
          </p>
        )}

        {/* سطر تحفيزي صغير لتحت */}
        {!isCompleted && isAuthorized && (
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-black text-amber-500">
            <FaBolt className="animate-pulse" />
            <span>قرا هاد الدرس وجمع الـ XP دابا!</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};


// 2. المكون الرئيسي
function Lessons() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .order('created_at', { ascending: true });

        if (lessonsError) throw lessonsError;

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

  // دالة التعامل مع الكليك
  const handleActionClick = (lesson, isAuthorized) => {
    if (isAuthorized) {
      navigate(`/lesson/${lesson.slug}`);
    } else {
      navigate('/pricing');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 overflow-x-hidden font-sans selection:bg-blue-200" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* الهيدر التحفيزي */}
        <motion.div 
          className="text-center mb-10" 
          initial={{ opacity: 0, y: 8 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.32 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black mb-4 shadow-sm">
            <FaRocket className="text-blue-600" />
            <span>مسار الإتقان والطلاقة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight [unicode-bidi:plaintext]">
            البرنامج <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">الدراسي</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-base font-bold max-w-xl mx-auto leading-relaxed [unicode-bidi:plaintext]">
            كل درس كتكملو كيقربك خطوة للطلاقة وكيعطيك XP باش تشارك فالحصص المباشرة. اختار الدرس وبدا تجمع النقط دابا!
          </p>
        </motion.div>

        {/* الأنيميشن ديال التحميل */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-blue-800/70 font-bold">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
            <span className="text-lg">جاري تجهيز مسار الدروس...</span>
          </div>
        ) : lessons.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
            <p className="text-blue-800/70 font-semibold text-lg [unicode-bidi:plaintext]">
              كاين شي مشكل فالاتصال بالأنترنيت 🌐. تأكد من الكونيكسيون وعاود ريفريشي الصفحة.
            </p>
          </div>
        ) : (
          /* شبكة الكروت التفاعلية */
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6" 
            initial={{ opacity: 0, y: 6 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.32 }}
          >
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isPremium = lesson.is_premium;
              const isAuthorized = !isPremium || user?.role === 'admin' || user?.plan === 'Premium';

              return (
                <InteractiveLessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  isCompleted={isCompleted}
                  isAuthorized={isAuthorized}
                  onActionClick={handleActionClick}
                />
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Lessons;