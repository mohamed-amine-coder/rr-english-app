import React, { useState } from 'react';
import MrRR from '../assets/mr-rr.png';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaPlay, 
  FaCheckCircle, 
  FaBolt, 
  FaCrown,
  FaArrowLeft,
  FaVideo,
  FaCheckDouble,
  FaFilePdf
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// 1. مكون الكارت الأفقية (البطاقة كاملة قابلة للضغط)
const InteractiveLessonCard = ({ lesson, onActionClick, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => onActionClick(lesson)}
      className="group flex flex-col sm:flex-row bg-[#0F172A] rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 border border-blue-950 hover:border-amber-500/50 cursor-pointer"
    >
      {/* جهة الفيديو */}
      <div className="relative w-full sm:w-[45%] md:w-[40%] shrink-0 bg-[#0B1120] aspect-video sm:aspect-auto overflow-hidden">
        <img 
          src={MrRR} 
          alt="Masterclass Lesson" 
          className="absolute inset-0 w-full h-full object-cover object-top opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent"></div>

        {/* زر التشغيل */}
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

      {/* جهة الوصف */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border-t-[3px] sm:border-t-0 sm:border-r-[3px] border-amber-500">
        
        <div className="flex justify-between items-start mb-3">
          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-black px-2.5 py-0.5 rounded">
            {lesson.category}
          </span>
          <span className="text-blue-300/40 text-[11px] font-black tracking-wider">
            الحلقة {lesson.episode}
          </span>
        </div>
        
        {/* العنوان خدا مساحة أكبر من بعد ما حيدنا الأزرار */}
        <h2 className="text-lg sm:text-xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
          {lesson.mainTitle}
        </h2>
        
        <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed line-clamp-2">
          {lesson.subTitle}
        </p>
      </div>
    </motion.div>
  );
};

// 2. المكون الرئيسي
export default function DailyClasses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const lessons = [
  {
    id: 1,
    episode: 1,
    mainTitle: "كيفاش تقدم راسك قدام الناس باحترافية؟ 🤝",
    subTitle: "تخلص من التردد، وعرف براسك واهتماماتك بطريقة طبيعية ومضبوطة فـ أول لقاء.",
    duration: "حصة تطبيقية",
    category: "التواصل الأولي",
    quizCount: "8 تمارين تفاعلية"
  },
  {
    id: 2,
    episode: 2,
    mainTitle: "كيفاش تهضر على الأحلام والطموحات ديالك؟ 🚀",
    subTitle: "عبر على شنو باغي تحقق فالمستقبل وعلاش، باستعمال تعابير قوية ومقنعة.",
    duration: "18:40",
    category: "التعبير الشخصي",
    quizCount: "10 تمارين تفاعلية"
  },
  {
    id: 3,
    episode: 3,
    mainTitle: "طلب الماكلة فمطعم أو سناك بلا ارتباك 🍔",
    subTitle: "فهم المونيو، طلب الماكلة، عزل المكونات، وطلب لاديسيون بكل ثقة.",
    duration: "14:10",
    category: "مواقف يومية",
    quizCount: "8 تمارين تفاعلية"
  },
  {
    id: 4,
    episode: 4,
    mainTitle: "كيفاش تعاود على شنو درتي فالويكاند؟ ☕",
    subTitle: "استعمل الماضي البسيط باش تعاود مغامراتك ونشاطاتك بلا ما توحل فالقواعد.",
    duration: "19:30",
    category: "السرد والحكي",
    quizCount: "12 تمرين تطبيقي"
  },
  {
    id: 5,
    episode: 5,
    mainTitle: "كيفاش تعتاذر وتقبل الاعتذار بلباقة؟ 🙏",
    subTitle: "فرق بين درجات الاعتذار فالمواقف العادية والرسمية، وعرف تجاوب بأدب.",
    duration: "13:45",
    category: "آداب الحوار",
    quizCount: "6 تمارين تفاعلية"
  },
  {
    id: 6,
    episode: 6,
    mainTitle: "تسول على الطريق وتوصفها لشي أجنبي 🗺️",
    subTitle: "حفظ الاتجاهات، المعالم، وكيفاش تعطي إرشادات دقيقة بلا ما تلف.",
    duration: "17:15",
    category: "الاتجاهات والتنقل",
    quizCount: "9 تمارين تفاعلية"
  },
  {
    id: 7,
    episode: 7,
    mainTitle: "وصف الروتين اليومي والنهار العادي ⏰",
    subTitle: "هضر على أوقات الفياق، الخدمة، العادات اليومية، وتنظيم الوقت بسلاسة.",
    duration: "16:50",
    category: "الحياة اليومية",
    quizCount: "10 تمارين تفاعلية"
  },
  {
    id: 8,
    episode: 8,
    mainTitle: "السؤال على الوقت وتحديد المواعيد 📅",
    subTitle: "ضبط قراءة الساعة، التواريخ، وتثبيت المواعيد أو تبديلها بلا غلط.",
    duration: "14:30",
    category: "الوقت والمواعيد",
    quizCount: "8 تمارين تفاعلية"
  },
  {
    id: 9,
    episode: 9,
    mainTitle: "التعبير على الإعجاب والحوايج لي مكتعجبكش",
    subTitle: "عبر على الذوق ديالك فالحياة اليومية بلا ما تبقى فـ 'I like' بوحدها.",
    duration: "15:40",
    category: "الآراء والمشاعر",
    quizCount: "7 تمارين تفاعلية"
  },
  {
    id: 10,
    episode: 10,
    mainTitle: "الهضرة على خدمتك، قرايتك والمجال ديالك 💻",
    subTitle: "شرح شنو كدير بالضبط فالخدمة أو القراية باختصار وبمصطلحات نقية ومفهومة.",
    duration: "21:10",
    category: "العمل والدراسة",
    quizCount: "11 تمرين تطبيقي"
  },
  {
    id: 11,
    episode: 11,
    mainTitle: "وصف العائلة، الصحاب والشخصيات 👨‍👩‍👦",
    subTitle: "وصف المظهر الخارجي، الطبايع، وصلة القرابة بطريقة ممتعة ومفصلة.",
    duration: "18:25",
    category: "الوصف والأشخاص",
    quizCount: "9 تمارين تفاعلية"
  },
  {
    id: 12,
    episode: 12,
    mainTitle: "وصف الدار، الحي وفين ساكن 🏠",
    subTitle: "سميات البيوت، الأثاث، والمرافق القريبة ليك باش تشرح لشي حد داركم بدقة.",
    duration: "16:15",
    category: "السكن والمحيط",
    quizCount: "8 تمارين تفاعلية"
  },
  {
    id: 13,
    episode: 13,
    mainTitle: "شنو واقع دابا؟ وصف اللحظة الحالية ⚡",
    subTitle: "إتقان الـ Present Continuous باش تشرح الأحداث لي واقعة قدام عينيك فهاد الدقيقة.",
    duration: "17:00",
    category: "الحاضر المباشر",
    quizCount: "10 تمارين تفاعلية"
  },
  {
    id: 14,
    episode: 14,
    mainTitle: "إعطاء الرأي والموافقة أو الرفض بأدب 💬",
    subTitle: "دافع على وجهة نظرك، وافق، أو قول 'لا' بلباقة واحترافية بلا ما تجرح حد.",
    duration: "19:05",
    category: "النقاش والحوار",
    quizCount: "8 تمارين تفاعلية"
  },
  {
    id: 15,
    episode: 15,
    mainTitle: "السؤال على الأثمنة والشراء فالمحلات 🛍️",
    subTitle: "تفاوض على الثمن، سول على المقاسات والألوان، وتخلص بلا ما تنصب عليك.",
    duration: "18:50",
    category: "التسوق والمعاملات",
    quizCount: "10 تمارين تفاعلية"
  },
  {
    id: 16,
    episode: 16,
    mainTitle: "دوز مكالمة هاتفية واضحة بلا توتر 📞",
    subTitle: "كيفاش تبدا المكالمة، تطلب تهضر مع شخص معين، وتنهي الاتصال باحترافية.",
    duration: "20:15",
    category: "التواصل الهاتفي",
    quizCount: "12 تمرين تطبيقي"
  },
  {
    id: 17,
    episode: 17,
    mainTitle: "التخطيط للمستقبل القريب والويكاند الجاي 🎯",
    subTitle: "فرق بين النوايا والخطط الثابتة باستعمال Going to و Will بطريقة مبسطة.",
    duration: "17:40",
    category: "المستقبل والخطط",
    quizCount: "9 تمارين تفاعلية"
  },
  {
    id: 18,
    episode: 18,
    mainTitle: "الهضرة على الطقس وفتح مواضيع خفيفة ☀️🌧️",
    subTitle: "Small Talk بالطقس: كيفاش تفتح حوار ودي فالمصعد أو مع زميل بلا إحراج.",
    duration: "13:20",
    category: "Small Talk",
    quizCount: "6 تمارين تفاعلية"
  },
  {
    id: 19,
    episode: 19,
    mainTitle: "شرح الحالة الصحية والتعامل فالفارماسيان 💊",
    subTitle: "وصف الأعراض البسيطة (الرواص، الحريق، السخانة) وفهم نصائح الصيدلي.",
    duration: "19:55",
    category: "الصحة والطوارئ",
    quizCount: "10 تمارين تفاعلية"
  },
  {
    id: 20,
    episode: 20,
    mainTitle: "السفر، قطع التيكي والتعامل فالمطار ✈️",
    subTitle: "Check-in، الجوازات، التعامل مع طاقم الطائرة والنزول فالفندق بلا مشاكل.",
    duration: "25:30",
    category: "السفر والمطار",
    quizCount: "14 تمرين تطبيقي"
  }
];

  const handleActionClick = (lesson) => {
    setSelectedLesson(lesson);
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

        {/* الشريط التوضيحي السريع */}
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

      {/* النافذة المنبثقة الموحدة */}
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
                <FaCrown />
              </div>
              
              <h2 className="text-xl font-black text-white mb-2">
                افتح حصص الماستركلاس التطبيقي!
              </h2>

              <p className="text-slate-300 text-xs font-medium mb-4 leading-relaxed">
                باش تبدا حلقة <span className="text-amber-400 font-bold">"{selectedLesson?.mainTitle}"</span>، وتستافد من التمارين الذكية والملخصات، انضم للمشتركين دابا.
              </p>

              {/* سكريبت تسويقي بأنيميشن كيجذب الانتباه */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 mb-5 text-center shadow-inner"
              >
                <p className="text-amber-300 text-[11px] leading-relaxed font-bold">
                  واش بغيتي تقرا هادشي مع Mr.RR مباشرة؟
                </p>
              </motion.div>
              
              {/* صندوق القيمة المركزة */}
              <div className="bg-[#0B1120]/80 rounded-2xl p-4 mb-6 text-right border border-slate-700/60">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-black mb-3">
                  <FaBolt />
                  <span>شنو غتستافد مباشرة فالحساب ديالك:</span>
                </div>
                
                <ul className="text-[11px] font-bold text-slate-300 space-y-2.5">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-amber-400 shrink-0" /> 
                    <span>حصص تطبيقية كاملة.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-amber-400 shrink-0" /> 
                    <span>السيستيم الذكي: تمارين تفاعلية مع تصحيح فوري.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-amber-400 shrink-0" /> 
                    <span>تحميل ملخصات  منظمة لكل درس.</span>
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