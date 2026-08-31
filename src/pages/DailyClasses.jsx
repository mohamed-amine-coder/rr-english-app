import React, { useState } from 'react';
import MrRR from '../assets/mr-rr.png';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaPlay, 
  FaFilePdf, 
  FaCheckCircle, 
  FaBrain, 
  FaBolt, 
  FaCrown,
  FaArrowLeft,
  FaVideo,
  FaCheckDouble
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// 1. مكون الكارت الأفقية (بدون أقفال مسبقة لزيادة نسبة النقر)
const InteractiveLessonCard = ({ lesson, onActionClick, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group flex flex-col sm:flex-row bg-[#0F172A] rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 border border-blue-950 hover:border-amber-500/50"
    >
      {/* جهة الفيديو (يمين) - مشجعة على الضغط */}
      <div 
        onClick={() => onActionClick(lesson, 'video')} 
        className="relative w-full sm:w-[45%] md:w-[40%] shrink-0 bg-[#0B1120] aspect-video sm:aspect-auto overflow-hidden cursor-pointer"
      >
        <img 
          src={MrRR} 
          alt="Masterclass Lesson" 
          className="absolute inset-0 w-full h-full object-cover object-top opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent"></div>

        {/* زر التشغيل (Play) جذاب وبدون قفل */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-13 h-13 rounded-full bg-red-600/90 backdrop-blur-xs text-white flex items-center justify-center group-hover:scale-115 group-hover:bg-red-600 transition-all duration-300 shadow-[0_4px_20px_rgba(220,38,38,0.5)] border border-red-400/40">
            <FaPlay className="text-white text-base ml-1" />
          </div>
        </div>

        {/* التوقيت */}
        <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-black px-2 py-0.5 rounded z-20 border border-white/10">
          {lesson.duration}
        </div>

        {/* شريط الفيديو السفلي */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800 z-20">
          <div className="h-full bg-red-600 w-[35%]"></div>
        </div>
      </div>

      {/* جهة الوصف والأزرار التفاعلية (يسار) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border-t-[3px] sm:border-t-0 sm:border-r-[3px] border-amber-500">
        
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-black px-2.5 py-0.5 rounded">
              {lesson.category}
            </span>
            <span className="text-blue-300/40 text-[11px] font-black tracking-wider">
              الحلقة {lesson.episode}
            </span>
          </div>
          
          <h2 
            onClick={() => onActionClick(lesson, 'video')} 
            className="text-base sm:text-lg font-black text-white mb-1.5 group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {lesson.mainTitle}
          </h2>
          
          <p className="text-slate-300 text-xs font-medium leading-relaxed line-clamp-2 mb-4">
            {lesson.subTitle}
          </p>
        </div>

        {/* أزرار النظام التفاعلي (Call To Actions المباشرة) */}
        <div className="pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* زر التمارين والتصحيح الآلي */}
            <button
              onClick={() => onActionClick(lesson, 'quiz')}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black px-3 py-1.5 rounded-lg transition-all active:scale-95 shadow-sm"
            >
              <FaBrain className="text-amber-300 text-xs" />
              <span>التمارين والتصحيح الآلي</span>
            </button>

            {/* زر تحميل الملخص */}
            <button
              onClick={() => onActionClick(lesson, 'pdf')}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600/50 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-all active:scale-95 shadow-xs"
            >
              <FaFilePdf className="text-rose-400 text-xs" />
              <span>الملخص PDF</span>
            </button>
          </div>

          <div 
            onClick={() => onActionClick(lesson, 'video')}
            className="text-xs font-black text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <span>ابدأ الحصة</span>
            <FaArrowLeft className="text-[10px]" />
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// 2. المكون الرئيسي
export default function DailyClasses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [triggerType, setTriggerType] = useState('video');

  const lessons = [
    {
      id: 1,
      episode: 1,
      mainTitle: "عقدة 'كنفهم وماكنهضرش': كيفاش تفك لسانك 🗣️",
      subTitle: "تخلص من البلوكاج والترجمة فدماغك قبل ما تخرج الكلمة، وهضر بتلقائية تامة.",
      duration: "16:40",
      category: "عقدة الكلام",
      quizCount: "8 تمارين تفاعلية"
    },
    {
      id: 2,
      episode: 2,
      mainTitle: "الـ Job Interview: جاوب بثقة وضمن خدمتك 💼",
      subTitle: "كيفاش تبرز مهاراتك وتقنع المشغل وخا الإنجليزية ديالك ما كاملاش.",
      duration: "24:15",
      category: "كارير & بيزنس",
      quizCount: "12 تمرين تطبيقي"
    },
    {
      id: 3,
      episode: 3,
      mainTitle: "حشمة النطق: هضر بلا خوف من الانتقاد 🎙️",
      subTitle: "أسرار النطق الطبيعي والربط بين الكلمات باش تبان بحال Native بلا تكلف.",
      duration: "18:50",
      category: "النطق & اللكنة",
      quizCount: "6 تمارين صوتية"
    },
    {
      id: 4,
      episode: 4,
      mainTitle: "صدمة الأفلام: علاش كيهضرو بالزربة وماكتفهم والو؟ 🎧",
      subTitle: "فك شفرة اللهجة الأمريكية السريعة والاختصارات لي ما قراوهومش ليك فالقسم.",
      duration: "21:30",
      category: "استماع سريع",
      quizCount: "10 مقاطع استماع"
    },
    {
      id: 5,
      episode: 5,
      mainTitle: "وسواس الـ Grammar: كيفاش تهضر بلا تعقيد القواعد ⚡",
      subTitle: "ركز على الطلاقة وحيد التردد واش الزمن (Tense) صحيح ولا غالط فاش تكون كتهضر.",
      duration: "15:20",
      category: "طلاقة فورية",
      quizCount: "15 تدريب عملي"
    },
    {
      id: 6,
      episode: 6,
      mainTitle: "دولار الفريلانس: إقناع الكليان الأجنبي بالإنجليزية 💻",
      subTitle: "مهارات التفاوض، كتابة الـ Proposals، والـ Calls مع كليان على برا فـ Remote Work.",
      duration: "26:40",
      category: "الفريلانس",
      quizCount: "نماذج إيميلات حقيقية"
    }
  ];

  const handleActionClick = (lesson, type) => {
    setSelectedLesson(lesson);
    setTriggerType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 dir-rtl font-sans selection:bg-amber-400 selection:text-slate-950">
      
      <div className="max-w-5xl mx-auto">
        
        {/* الهيدر */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            ماستركلاس <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">الإنجليزية التطبيقية</span> 🎬
          </h1>
          <p className="text-slate-600 text-xs sm:text-base font-bold max-w-xl mx-auto leading-relaxed">
            النظام التفاعلي الأول لي كيعلمك الإنجليزية بالممارسة الواقعية والتصحيح الفوري.
          </p>
        </div>

        {/* الشريط التوضيحي السريع (باش الزائر يفهم السيستيم طاير فـ 5 ثواني) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-500/30 shadow-sm mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-slate-100">
            
            <div className="flex items-center gap-3 justify-center sm:justify-start px-2 py-1">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 text-lg">
                <FaVideo />
              </div>
              <div className="text-right">
                <h4 className="text-xs font-black text-slate-900">1. تفرج فالحصة</h4>
                <p className="text-[11px] font-bold text-slate-500">فيديو مركز فمواقف حقيقية</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start px-2 py-1">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-lg">
                <FaCheckDouble />
              </div>
              <div className="text-right">
                <h4 className="text-xs font-black text-slate-900">2. طبق فالبلاصة</h4>
                <p className="text-[11px] font-bold text-slate-500">تمارين تفاعلية بتصحيح آلي فوري</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start px-2 py-1">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 text-lg">
                <FaFilePdf />
              </div>
              <div className="text-right">
                <h4 className="text-xs font-black text-slate-900">3. راجع بالملخصات</h4>
                <p className="text-[11px] font-bold text-slate-500">تحميل PDF وبنك المصطلحات</p>
              </div>
            </div>

          </div>
        </div>

        {/* شبكة الكروت التفاعلية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {lessons.map((lesson, index) => (
            <InteractiveLessonCard 
              key={lesson.id} 
              lesson={lesson} 
              index={index} 
              onActionClick={handleActionClick} 
            />
          ))}
        </div>

      </div>

      {/* نافذة الاشتراك الذكية (كتطلع فقط ملي كيضغط الزائر) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 dir-rtl">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)} 
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 10 }} 
              className="relative bg-gradient-to-b from-[#0F172A] to-[#1E293B] w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center border border-amber-500/40 text-white"
            >
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
              >
                <FaTimes />
              </button>
              
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-slate-950 text-2xl mx-auto mb-4 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                {triggerType === 'quiz' ? <FaBrain /> : triggerType === 'pdf' ? <FaFilePdf /> : <FaCrown />}
              </div>
              
              <h2 className="text-xl font-black text-white mb-2">
                {triggerType === 'quiz' 
                  ? 'خدم التمارين وخود التصحيح الفوري!' 
                  : triggerType === 'pdf' 
                  ? 'حمل ملخص الدرس وبنك المصطلحات!' 
                  : 'افتح حصص الماستركلاس التطبيقي!'}
              </h2>
              
              <p className="text-slate-300 text-xs font-medium mb-5 leading-relaxed">
                باش تبدا حلقة <span className="text-amber-400 font-bold">"{selectedLesson?.mainTitle}"</span>، تخدم التمارين الذكية، وتحصل على التصحيح الآلي، انضم للمشتركين دابا.
              </p>
              
              {/* صندوق القيمة المركزة */}
              <div className="bg-[#0B1120]/80 rounded-2xl p-4 mb-6 text-right border border-slate-700/60">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-black mb-3">
                  <FaBolt />
                  <span>شنو غتستافد مباشرة فالحساب ديالك:</span>
                </div>
                
                <ul className="text-[11px] font-bold text-slate-300 space-y-2.5">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-amber-400 shrink-0" /> 
                    <span>مشاهدة فيديوهات الماستركلاس كاملة.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-amber-400 shrink-0" /> 
                    <span>السيستيم الذكي: تمارين تفاعلية مع تصحيح فوري فالبلاصة.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-amber-400 shrink-0" /> 
                    <span>تحميل ملخصات PDF منظمة لكل درس.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-amber-400 shrink-0" /> 
                    <span>تتبع التطور ومستوى الطلاقة ديالك خطوة بخطوة.</span>
                  </li>
                </ul>
              </div>

              {/* زر التوجيه للتسعير */}
              <Link 
                to="/pricing" 
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-black py-3.5 rounded-xl transition-all active:scale-95 text-sm shadow-[0_5px_20px_rgba(245,158,11,0.35)]"
              >
                <span>شوف العروض وفعل حسابك</span>
                <FaArrowLeft className="text-xs" />
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}