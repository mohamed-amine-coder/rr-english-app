import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, FaCheckCircle, FaFire, FaArrowLeft, 
  FaTimesCircle, FaClock, FaUnlockAlt, FaHandPointer, FaUsers
} from 'react-icons/fa';

// استيراد الشخصيات
import mrRr from '../assets/mr-rr.png';
import msRr from '../assets/ms-rr.png';

export default function Home() {
  const navigate = useNavigate();
  
  // حالة التفاعل مع تشخيص المشكل
  const [selectedPain, setSelectedPain] = useState(0);

  const painPoints = [
    {
      label: "كنفهم شوية ولكن كنتبلوكا فاش كنبغي نهضر 🤐",
      solution: "مشكلتك ماشي فالقواعد! مشكلتك هي دماغك تعود يترجم كلمة بكلمة. فـ الشهر الأول ديال تحدي 90 يوم، كنضربو هاد العقدة بتمارين تركيب الجمل السريعة بلا ترجمة.",
      ctaText: "بدا تفك هاد البلوكاج دابا (درس مجاني)",
      link: "/lessons"
    },
    {
      label: "قريت شحال من مرة فـ يوتيوب والسنطر ولكن دغيا كننسى وكنمل 😴",
      solution: "حيت كتقرا بطريقة سلبية (غير كتفرج وتحفظ). فـ RR ENGLISH كل درس مقسوم لسلايدات تفاعلية قصيرة كتعطيك XP، وموراها كطبقها لايف مع الأساتذة باش ترسخ فـ دماغك.",
      ctaText: "جرب طريقة السلايدات التفاعلية دابا",
      link: "/lessons"
    },
    {
      label: "كنحشم نهضر قدام الناس لا نغلط ويضحكو عليا 😳",
      solution: "هادشي علاش ممنوع عندنا الأقسام لي فيها 20 واحد! فـ تحدي 90 يوم، كدخل لمجموعة واتساب مصغرة (5 لـ 8 د الناس فقط) كلهم فـ نفس مستواك ومع أساتذة كيشجعوك ويصححو ليك.",
      ctaText: "احجز بلاصتك من بين الـ 30 الأوائل (-30%)",
      link: "/pricing"
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans selection:bg-blue-200" dir="rtl">
      
      {/* إضاءات خلفية */}
      <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[35%] left-[-10%] w-[450px] h-[450px] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-2 sm:px-6 pb-20 relative z-10 space-y-20">
        
        {/* =========================================
            0. شريط FOMO العلوي (تخفيض 30% لأول 30 مشترك)
        ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 text-white p-3.5 sm:px-6 rounded-2xl shadow-lg border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-center md:text-right">
            <span className="flex h-3 w-3 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span>
              عرض الدفعة الجديدة: <strong className="text-amber-400">تخفيض -30% فالباقة المدفوعة</strong> خاص غير بـ <span className="underline decoration-rose-500 font-black text-white">أول 30 مشترك</span> فهاد الفوج!
            </span>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end shrink-0">
            {/* عداد بصري كيزيد الحماس */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] font-black text-amber-300">
              <FaUsers className="text-amber-400" />
              <span>الأماكن كتعمر بالزربة!</span>
            </div>

            <Link 
              to="/pricing" 
              className="w-full sm:w-auto text-center text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 px-4 py-2 rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>استفد من -30% دابا</span>
              <FaArrowLeft className="text-[10px]" />
            </Link>
          </div>
        </motion.div>

        {/* =========================================
            1. Hero Section (رسالة هجومية ومباشرة)
        ========================================= */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-right relative z-30"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.2] mb-5 tracking-tight">
              كذبوا عليك وقالو ليك <br className="hidden sm:block" />
              اللغة كتبغي <span className="line-through decoration-rose-500 decoration-4 text-slate-400">سنين</span>... <br />
              طلق لسانك فـ <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-indigo-600">90 يوم فقط!</span>
            </h1>
            
            <p className="text-slate-600 text-sm sm:text-lg font-bold leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              المراكز الكلاسيكية كيقسمو ليك اللغة لـ 12 مستوى باش تبقى تخلص عامين! أما فـ <strong className="text-slate-900">RR ENGLISH</strong> جمعنا ليك الزبدة اللي غتخليك تهضر وتفهم بالدارجة فـ 3 شهور مع الأساتذة ديالنا.
            </p>
            
            {/* أزرار التوجيه مع محفزات */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
              <Link 
                to="/lessons" 
                className="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-2xl font-black text-base transition-all shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.45)] active:scale-95 cursor-pointer"
              >
                <FaRocket className="group-hover:-translate-y-0.5 transition-transform" /> 
                <span>بدا الدرس الأول فابور</span>
              </Link>
              <Link 
                to="/pricing" 
                className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 px-7 py-4 rounded-2xl font-black text-base shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <FaFire className="text-rose-600 text-lg animate-bounce" />
                <span>خطف بلاصتك بـ -30% (لأول 30 مشترك)</span>
              </Link>
            </div>

            <p className="mt-4 text-xs font-bold text-slate-400 flex items-center justify-center lg:justify-start gap-1.5">
              <FaClock className="text-amber-500" />
              <span>أكثر من 85% من الطلبة كيلاحظو فرق فـ النطق من أول سيمانة.</span>
            </p>
          </motion.div>

          {/* الشخصيات مع بطاقات عائمة تفاعلية */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/lessons')}
            className="flex-1 w-full max-w-md relative flex justify-center h-[320px] sm:h-[400px] z-10 cursor-pointer group"
            title="كليكي باش تجرب الدروس"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-tr from-blue-100 to-amber-100 rounded-full border-4 border-white shadow-2xl z-0 group-hover:scale-105 transition-transform"></div>

            {/* Mr-RR */}
            <motion.div 
              animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 right-4 sm:right-6 z-10"
            >
              <img src={mrRr} alt="Mr RR" className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-3xl border-4 border-white shadow-xl bg-amber-50" />
              <div className="absolute -bottom-3 -left-3 bg-slate-900 text-white px-3 py-1.5 rounded-xl shadow-md font-black text-[11px] flex items-center gap-1">
                <span>كليكي جربني!</span> 👆
              </div>
            </motion.div>

            {/* Ms-RR */}
            <motion.div 
              animate={{ y: [0, -8, 0], rotate: [2, -2, 2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-2 left-4 sm:left-6 z-20"
            >
              <img src={msRr} alt="Ms RR" className="w-32 h-32 sm:w-44 sm:h-44 object-cover rounded-3xl border-4 border-white shadow-2xl bg-blue-50" />
              <div className="absolute -top-3 -right-2 bg-emerald-500 text-white px-3 py-1 rounded-xl shadow-md font-black text-[11px] flex items-center gap-1">
                <span>لايف مع الأساتذة</span> 🎙️
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* =========================================
            2. قسم الصدمة: علاش كذبوا عليك؟ (The Truth)
        ========================================= */}
        <section className="bg-white rounded-[2.5rem] p-6 sm:p-10 border-2 border-slate-200/80 shadow-lg relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="bg-rose-100 text-rose-700 font-black text-xs px-3.5 py-1 rounded-full">
              الحقيقة لي ما كيقولوهاش ليك 🤫
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 mb-3">
              علاش قريتي الإنجليزية سنين وباقي كتبلوكا؟
            </h2>
            <p className="text-slate-500 font-bold text-sm sm:text-base">
              حيت النظام القديم مصاوب باش <strong>يطوّل المدة وتبقى تخلص كل شهر</strong>، ماشي باش تهضر دغيا! شوف الفرق براسك:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* الطريقة التقليدية الخاسرة */}
            <div className="bg-rose-50/60 border-2 border-rose-200 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-200/80">
                  <span className="font-black text-rose-900 text-lg">❌ المراكز والدورات التقليدية</span>
                  <span className="text-xs font-black bg-rose-200 text-rose-900 px-2.5 py-1 rounded-md">هدفهم: تبقى تخلص ديما</span>
                </div>
                <ul className="space-y-3.5 text-xs sm:text-sm font-bold text-rose-950/80">
                  <li className="flex items-start gap-2.5">
                    <FaTimesCircle className="text-rose-500 text-base shrink-0 mt-0.5" />
                    <span>كيقسمو كل مستوى لـ 4 أجزاء (A1.1, A1.2...) باش تضرب معاهم عامين.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaTimesCircle className="text-rose-500 text-base shrink-0 mt-0.5" />
                    <span>كيعمرو ليك راسك بقواعد معقدة ما عمرك غتستعملها فالهضرة اليومية.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaTimesCircle className="text-rose-500 text-base shrink-0 mt-0.5" />
                    <span>قسم عامر بـ 25 طالب، كتسالي الحصة وما كيجيكش النوبة حتى تنطق جملة وحدة!</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-200/60 text-center text-xs font-black text-rose-700">
                النتيجة: كتخسر آلاف الدراهم والوقت، وكتخرج كتعرف غير القواعد فالورقة!
              </div>
            </div>

            {/* طريقة RR English */}
            <div className="bg-emerald-50/70 border-2 border-emerald-400 rounded-3xl p-6 flex flex-col justify-between relative shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-200">
                  <span className="font-black text-emerald-950 text-lg">✅ خطة 90 يوم فـ RR ENGLISH</span>
                  <span className="text-xs font-black bg-emerald-500 text-white px-2.5 py-1 rounded-md">هدفنا: تهضر فـ 3 شهور</span>
                </div>
                <ul className="space-y-3.5 text-xs sm:text-sm font-bold text-slate-800">
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-emerald-600 text-base shrink-0 mt-0.5" />
                    <span>كنعطيوْك <strong>الـ 20% ديال اللغة اللي كيتستعمل فـ 80% من المحادثات</strong> اليومية.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-emerald-600 text-base shrink-0 mt-0.5" />
                    <span>شرح بالدارجة المغربية فـ سلايدات تفاعلية سريعة بلا فلسفة زايدة.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-emerald-600 text-base shrink-0 mt-0.5" />
                    <span>مجموعات لايف مصغرة (5 لـ 8 د الناس فقط) باش تهضر بزز منك ويصححو ليك الأساتذة!</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-emerald-600 text-base shrink-0 mt-0.5" />
                    <span>ملخصات وتمارين عالية الجودة باش تبقا مساير التعلم طيلة الأسبوع ماشي وقت الحصص فقط.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================
            3. عنصر تفاعلي: كليكي على المشكل ديالك (Interactive Widget)
        ========================================= */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">
              <FaHandPointer className="animate-bounce" /> تفاعل معانا دابا
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              شنو هو أكبر عائق حابسك دابا فـ الإنجليزية؟ (كليكي عليه 👇)
            </h2>
          </div>

          {/* أزرار الاختيار */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {painPoints.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPain(idx)}
                className={`p-4 rounded-2xl font-black text-xs sm:text-sm text-right border-2 transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  selectedPain === idx
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* صندوق الجواب الديناميكي */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPain}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-l from-blue-600 to-indigo-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="space-y-2 text-center md:text-right flex-1">
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider">💡 الحل فـ تحدي 90 يوم:</span>
                <p className="text-sm sm:text-base font-bold leading-relaxed text-blue-50">
                  {painPoints[selectedPain].solution}
                </p>
              </div>
              <Link
                to={painPoints[selectedPain].link}
                className="shrink-0 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>{painPoints[selectedPain].ctaText}</span>
                <FaArrowLeft className="text-xs" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* =========================================
            4. البانر الختامي للفرصة الأخيرة (Strong FOMO CTA: -30% for First 30)
        ========================================= */}
        <section className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-center lg:text-right relative overflow-hidden shadow-2xl border-2 border-amber-500/40">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-black">
                <FaFire className="text-rose-400 animate-pulse" />
                <span>عرض خاص بـ أول 30 مشترك فهاد الدفعة فقط!</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                من هنا لـ 3 شهور، يا إما غتكون كتهضر الإنجليزية بطلاقة.. يا إما باقي فبلاصتك كتأجل!
              </h2>
              <p className="text-slate-300 font-bold text-xs sm:text-base leading-relaxed">
                بمناسبة انطلاق الدفعة الجديدة، درنا <strong className="text-amber-400 underline">تخفيض 30% فالباقة المدفوعة لأول 30 مشترك</strong> باش كلشي يقدر يبدا ويحضر فـ مجموعات اللايف المصغرة مع الأساتذة. بمجرد ما يكتمل العدد ديال 30 مقعد غادي يرجع الثمن الأصلي أوتوماتيكياً!
              </p>

              {/* شريط تقدم المقاعد باش يبان الـ FOMO بصرياً */}
              <div className="pt-2 max-w-md mx-auto lg:mx-0">
                <div className="flex justify-between text-xs font-black text-amber-400 mb-1.5">
                  <span>المقاعد المحجوزة فـ عرض -30%</span>
                  <span className="text-rose-400">بقات بلايص قليلة من أصل 30! 🔥</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "83%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full lg:w-auto shrink-0">
              <Link
                to="/pricing"
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-black px-8 py-4 rounded-2xl text-sm sm:text-base shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all active:scale-95 cursor-pointer"
              >
                <FaUnlockAlt />
                <span>احجز مقعدك من الـ 30 الأوائل (-30%)</span>
              </Link>
              <Link
                to="/lessons"
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-8 py-3.5 rounded-2xl text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>بغيت نجرب الدرس المجاني هو الأول ➔</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}