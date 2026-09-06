import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, FaQuestionCircle, FaChevronDown, FaChevronUp, 
  FaLock, FaCrown, FaVideo, 
  FaExclamationCircle, FaLightbulb,
  FaGraduationCap, FaUserTie, FaLaptopCode
} from 'react-icons/fa';
import mrRr from '../assets/mr-rr.png';
import msRr from '../assets/ms-rr.png';

export default function Pricing() {
  const whatsappNumber = '+212718090887'; // بدلو برقمك

  const getWhatsappUrl = (planName) => {
    const message = encodeURIComponent(`السلام عليكم، بغيت نشترك فـ ${planName}`);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  const [openFaq, setOpenFaq] = useState(null);
  const [isStudent, setIsStudent] = useState(true);

  const faqs = [
    {
      q: "علاش الاشتراك بالفلوس ومشي فابور كامل؟",
      a: "باش نخلصو السيرفرات والمبرمجين ونقدرو نتبعو معاك فـ الواتساب ونصححو ليك الفوكالات بالتدقيق، هاد الشي كياخد وقت ومجهود كبير من فريق ساهر على مستواك."
    },
    {
      q: "واش خاصني ضروري ويفي بجهد باش نقرا؟",
      a: "لا! السيت خفيف بزاف، والحصص والمحادثات فـ واتساب بلي فوكال والميساجات، مراعاة للناس لي خدامين غير بـ نجمة 6 (*6)."
    },
    {
      q: "أنا زيرو فـ لونجلي، واش غادي نسلك؟",
      a: "البروغرام مصاوب لـ A1 و A2. كلشي مشروح بالدارجة وأمثلة واقعية بلا تعقيدات القواعد والكتب الكلاسيكية المملة."
    },
    {
      q: "كيفاش كيتم الخلاص؟",
      a: "عبر تحويل بنكي (CIH, Attijari...) ولا كاش بلوس / وفاش كاش. كتصيفط التوصيل فـ واتساب وكنفعلو ليك الحساب فالبلاصة."
    },
    {
      q: "شحال ديال الوقت خاصني نخصص فـ النهار؟",
      a: "20 حتى لـ 30 دقيقة فاليوم كافية. المنصة مفتوحة 24/7 والتطبيق فـ الواتساب مرن باش توفق بين خدمتك وقرايتك."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 dir-rtl font-sans overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto"
      >

        {/* الهيدر */}
        <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-900 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <FaLock className="text-amber-600 text-sm" />
            <span>هاد الدرس داخل فالمحتوى المدفوع</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            جودة <span className="text-blue-600">أعلى</span>، وثمن <span className="text-blue-600">أقل</span>.. باش حتى واحد ما يبقى بلاش!
          </h1>
          
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-right">
              <div className="bg-white border-2 border-rose-100 p-4 rounded-2xl shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                  <FaQuestionCircle />
                </div>
                <p className="text-slate-700 font-bold text-xs sm:text-sm leading-relaxed">
                  كتخلص فلوس صحيحة باش تجلس فقسم فيه 20 واحد وتسمع داكشي لي تقدر تقراه بوحدك؟
                </p>
              </div>

              <div className="bg-white border-2 border-rose-100 p-4 rounded-2xl shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                  <FaExclamationCircle />
                </div>
                <p className="text-slate-700 font-bold text-xs sm:text-sm leading-relaxed">
                  كتضيع وقتك فحصص كيمشي نصها غير فتقطاع الهضرة وشرح القواعد المملة؟
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-2xl shadow-sm flex items-center gap-3 text-right">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-lg shadow-md">
                <FaLightbulb />
              </div>
              <p className="text-emerald-950 font-black text-xs sm:text-sm leading-relaxed">
                حنا قلبنا اللعبة: <span className="font-bold text-emerald-800">المنصة كتعطيك الشرح والتمارين، والحصص كتدخل ليهم غير باش تهضر وتطبق والأستاذ يصحح ليك.</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* سيكشن الأثمنة المبسط */}
        <motion.div variants={itemVariants} className="mb-14">
          
          {/* الـ Toggle الذكي */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="bg-slate-200/90 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner w-full max-w-[320px] sm:max-w-sm">
              <button
                type="button"
                onClick={() => setIsStudent(true)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  isStudent
                    ? "bg-white text-blue-600 shadow-md scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FaGraduationCap className="text-base" />
                <span>طالب / تلميذ</span>
              </button>

              <button
                type="button"
                onClick={() => setIsStudent(false)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  !isStudent
                    ? "bg-white text-slate-900 shadow-md scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FaUserTie className="text-sm" />
                <span>عموم / موظف</span>
              </button>
            </div>
          </div>

          {/* الكارطات مركزين على الفرق الأساسي فقط */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch max-w-4xl mx-auto">
            
            {/* الباقة 1: بدون حصص */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all text-right flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 shrink-0">
                    <img src={mrRr} alt="Mr RR" className="w-full h-full object-cover rounded-2xl shadow-sm border-2 border-slate-100" />
                  </div>
                  <span className="bg-slate-100 text-slate-700 text-xs font-black px-3 py-1 rounded-lg border border-slate-200">
                    قرا بوحدك
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-1">الاشتراك الذكي</h3>
                <p className="text-slate-500 text-xs sm:text-sm font-bold mb-6">
                  الولوج الكامل للمنصة، التمارين، والتصحيح الآلي 24/7.
                </p>

                {/* الفرق الجوهري */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-800 font-black text-sm mb-1">
                    <FaLaptopCode className="text-blue-600 text-base shrink-0" />
                    <span>منصة الدروس التفاعلية كاملة</span>
                  </div>
                  <div className="text-rose-500 font-bold text-xs pr-6">
                    ✕ بدون حصص مباشرة مع الأستاذ
                  </div>
                </div>

                {/* الثمن: منطقي حسب السويتش */}
                <div className="mb-6">
                  {isStudent ? (
                    <div className="flex items-baseline gap-2">
                      <div className="relative inline-block text-xl font-black text-slate-400">
                        159
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-red-500 origin-right rounded-full"
                        />
                      </div>
                      <span className="text-4xl font-black text-blue-600 leading-none">99</span>
                      <span className="text-slate-600 text-xs font-bold">درهم / شهر</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-slate-900 leading-none">159</span>
                      <span className="text-slate-600 text-xs font-bold">درهم / شهر</span>
                    </div>
                  )}
                </div>
              </div>

              <a 
                href={getWhatsappUrl(`الاشتراك الذكي (${isStudent ? "طالب: 99 درهم" : "159 درهم"})`)}
                target="_blank" rel="noopener noreferrer" 
                className="w-full flex items-center justify-center bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-900 font-black py-3.5 rounded-xl transition-all cursor-pointer active:scale-95 text-sm shadow-sm"
              >
                {isStudent ? "فعل حسابك بـ 99 درهم" : "فعل حسابك بـ 159 درهم"}
              </a>
            </div>

            {/* الباقة 2: مع حصص مباشرة */}
            <div className="bg-slate-900 border-4 border-amber-500 rounded-3xl p-6 sm:p-7 shadow-[0_12px_35px_rgba(245,158,11,0.2)] relative text-right md:-translate-y-2 flex flex-col justify-between">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <FaCrown /> الأكثر اختياراً
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4 mt-1">
                  <div className="w-14 h-14 shrink-0 relative">
                    <img src={msRr} alt="Ms RR" className="w-full h-full object-cover rounded-2xl shadow-md border-2 border-amber-400" />
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 text-amber-400 rounded-full p-1 border border-amber-500/40">
                      <FaVideo className="text-xs" />
                    </div>
                  </div>
                  <span className="bg-amber-500/20 text-amber-400 text-xs font-black px-3 py-1 rounded-lg border border-amber-500/30">
                    السيستيم + الأستاذ
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-1">الباقة التفاعلية (VIP)</h3>
                <p className="text-slate-300 text-xs sm:text-sm font-bold mb-6">
                  السيستيم كيشرح ليك، والأستاذ كيسمعك ويصحح ليك.
                </p>

                {/* الفرق الجوهري */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-white font-black text-sm mb-1">
                    <FaLaptopCode className="text-amber-400 text-base shrink-0" />
                    <span>منصة الدروس التفاعلية كاملة</span>
                  </div>
                  <div className="text-amber-400 font-bold text-xs pr-6">
                    ✓ + حصص تطبيقية أسبوعياً (مجموعات 5 لـ 8 فقط)
                  </div>
                </div>

                {/* الثمن: منطقي حسب السويتش */}
                <div className="mb-6">
                  {isStudent ? (
                    <div className="flex items-baseline gap-2">
                      <div className="relative inline-block text-xl font-black text-slate-400">
                        299
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-red-500 origin-right rounded-full"
                        />
                      </div>
                      <span className="text-4xl font-black text-amber-400 leading-none">199</span>
                      <span className="text-slate-300 text-xs font-bold">درهم / شهر</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-amber-400 leading-none">299</span>
                      <span className="text-slate-300 text-xs font-bold">درهم / شهر</span>
                    </div>
                  )}
                </div>
              </div>

              <a 
                href={getWhatsappUrl(`الباقة التفاعلية VIP (${isStudent ? "طالب: 199 درهم" : "299 درهم"})`)}
                target="_blank" rel="noopener noreferrer" 
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-black py-3.5 rounded-xl transition-all shadow-md cursor-pointer active:scale-95 text-sm"
              >
                <FaWhatsapp className="text-lg" /> 
                {isStudent ? "احجز بلاصتك بـ 199 درهم" : "احجز بلاصتك بـ 299 درهم"}
              </a>
            </div>

          </div>
        </motion.div>

        {/* الأسئلة الشائعة */}
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto space-y-3">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 text-center flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-blue-600" />
            <span>عندك شي سؤال؟</span>
          </h3>

          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-blue-200 transition-colors">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-right font-black text-slate-800 flex justify-between items-center text-xs sm:text-sm hover:bg-slate-50 cursor-pointer"
              >
                <span className="leading-relaxed">{faq.q}</span>
                {openFaq === idx ? <FaChevronUp className="text-blue-500 text-xs shrink-0 mr-3" /> : <FaChevronDown className="text-slate-400 text-xs shrink-0 mr-3" />}
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-slate-600 text-[11px] sm:text-xs font-bold leading-relaxed border-t border-slate-100 bg-slate-50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
}