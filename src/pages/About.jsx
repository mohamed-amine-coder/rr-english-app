import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaLaptopCode, FaBolt, FaComments, FaUsers, FaArrowLeft, 
  FaQuestionCircle, FaCheckCircle, FaRocket, FaExchangeAlt, FaShieldAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function About() {
  const steps = [
    {
      num: "01",
      icon: <FaLaptopCode className="text-2xl text-blue-600" />,
      tag: "الخطوة الأولى",
      title: "قرا فالمنصة وقتما بغيتي",
      desc: "دروس تفاعلية قصيرة (Micro-lessons) مشروحة بالدارجة مع أمثلة من الواقع المغربي. كتقرا بوحدك وبلا تعقيدات القواعد.",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      num: "02",
      icon: <FaBolt className="text-2xl text-amber-500" />,
      tag: "الخطوة الثانية",
      title: "جمع النقاط (XP) والتحديات",
      desc: "كل تمرين وسلايد كملتيه كتربح عليه نقاط XP وسلسلة التزام (Streak). كلما خدمتي كتر كتعمر الحساب ديالك.",
      bg: "bg-amber-50",
      border: "border-amber-200"
    },
    {
      num: "03",
      icon: <FaExchangeAlt className="text-2xl text-purple-600" />,
      tag: "الخطوة الثالثة",
      title: "صرف النقط لحصص مباشرة",
      desc: "هنا كاين السر! النقط لي جمعتي ماشي غير ديكور، كتحولهم مباشرة لحصص تطبيقية تفاعلية لايف مع الأساتذة ديالنا.",
      bg: "bg-purple-50",
      border: "border-purple-200"
    },
    {
      num: "04",
      icon: <FaUsers className="text-2xl text-emerald-600" />,
      tag: "الخطوة الرابعة",
      title: "تطبيق يومي فـ Micro-Groups",
      desc: "مجموعات واتساب مصاوبة لناس نجمة 6 (من 5 لـ 8 ديال الناس) لممارسة الصوتيات والمحادثات الحية باش يطير الحشام.",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl font-sans selection:bg-amber-200">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* 1. الهيدر الترحيبي */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black mb-4 shadow-sm">
            <FaRocket className="text-blue-600" />
            <span>طريقة التعلم المزدوج (Hybrid Learning)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            كيفاش كتخدم منظومة <span className="text-blue-600">RR ENGLISH</span>؟
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            ماشي غير سيت ديال الدروس المسجلة وماشي مدرسة كلاسيكية ميتة! دمجنا بين الخدمة الفردية الذكية والتحفيز بنظام النقط، مع الممارسة التفاعلية الحية.
          </p>
        </div>

        {/* 2. المعادلة السحرية (The Core Formula) */}
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-10 border-4 border-slate-900 shadow-[0_12px_0_#0F172A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-xl sm:text-2xl font-black mb-8 text-center text-amber-400">
            المعادلة السحرية لي كتخليك تهضر فـ 30 يوم ⚡
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <span className="text-3xl mb-3 block">📖</span>
              <h3 className="font-black text-lg mb-2 text-white">1. قرا بوحدك</h3>
              <p className="text-slate-400 text-sm font-medium">فهم القواعد والمصطلحات بسرعة بلا ملل</p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <span className="text-3xl mb-3 block">⚡</span>
              <h3 className="font-black text-lg mb-2 text-amber-400">2. جمع النقط (XP)</h3>
              <p className="text-slate-400 text-sm font-medium">كل تمرين كيعطيك رصيد تصرفو فالحصص</p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <span className="text-3xl mb-3 block">🗣️</span>
              <h3 className="font-black text-lg mb-2 text-emerald-400">3. طلق لسانك</h3>
              <p className="text-slate-400 text-sm font-medium">حصص تفاعلية مباشرة لتثبيت النطق والمحادثة</p>
            </div>
          </div>
        </div>

        {/* 3. خطوات مسار الطالب (The Step-by-Step Roadmap) */}
        <div className="space-y-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">مسارك من أول نقرة حتى لإتقان الحوار</h2>
            <p className="text-slate-500 font-bold text-sm mt-2">تبع هاد الخطوات باش تفهم كيفاش كتربح الحصص التفاعلية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className={`bg-white p-6 sm:p-8 rounded-3xl border-2 ${step.border} shadow-sm relative overflow-hidden`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${step.bg} flex items-center justify-center shrink-0`}>
                      {step.icon}
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{step.tag}</span>
                  </div>
                  <span className="text-3xl font-black text-slate-200">{step.num}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. علاش هاد الطريقة ناجحة؟ (Why It Works) */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-[2.5rem] p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <FaShieldAlt className="text-2xl text-emerald-600" />
            <h3 className="text-2xl font-black text-emerald-950">علاش درنا نظام النقط والحصص؟</h3>
          </div>
          
          <div className="space-y-4 text-emerald-900 text-sm sm:text-base font-bold">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" />
              <p><strong>كيقضي على العكاز:</strong> ملي كتعرف أن كل دقيقة كتقرا فيها كتقربك لحصة حية مع الأستاذ، كترجع تقرا يومياً بلا انقطاع.</p>
            </div>
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" />
              <p><strong>كتجي واجد للحصة:</strong> مكضيعش وقت الحصة فالقواعد والحفاظة، كتجي ديجا فاهم من المنصة وكتدخل ديريكت فالتطبيق والمحادثة.</p>
            </div>
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" />
              <p><strong>بيئة مريحة بلا حكام:</strong> المجموعات مقسمين بناس فنفس مستواك باش تهضر براحتك وتغلط وتصحح بلا إحراج.</p>
            </div>
          </div>
        </div>

        {/* 5. زر البدء السريع (Call to Action) */}
        <div className="text-center pt-4 pb-8">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl text-lg shadow-xl shadow-blue-200 transition-all active:scale-95"
          >
            <span>بدا تجمع أول نقاط دابا</span>
            <FaArrowLeft className="text-sm" />
          </Link>
        </div>

      </div>
    </div>
  );
}