import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, FaCheck, FaWifi, 
  FaQuestionCircle, FaChevronDown, FaChevronUp, 
  FaLock, FaCrown, FaVideo, 
  FaLaptopCode, FaUsers, FaComments, FaBolt,
  FaExclamationCircle, FaLightbulb
} from 'react-icons/fa';
import mrRr from '../assets/mr-rr.png';
import msRr from '../assets/ms-rr.png';

export default function Pricing() {
  const whatsappNumber = '212600000000'; // بدلو برقمك

  const getWhatsappUrl = (planName) => {
    const message = encodeURIComponent(`السلام عليكم، بغيت نشترك فـ ${planName}`);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  const [openFaq, setOpenFaq] = useState(null);

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

  // إعدادات الأنيميشن
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
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl font-sans overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto"
      >

        {/* الهيدر الواثق والمباشر */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-900 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-5 shadow-sm">
            <FaLock className="text-amber-600 text-sm" />
            <span>هاد الدرس داخل فالمحتوى المدفوع</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
            جودة <span className="text-blue-600">أعلى</span>، وثمن <span className="text-blue-600">أقل</span>.. باش حتى واحد ما يبقى بلاش!
          </h1>
          
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {/* الأسئلة المستفزة (على شكل كروت) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
              <motion.div whileHover={{ y: -3 }} className="bg-white border-2 border-rose-100 p-5 rounded-2xl shadow-sm flex items-start gap-4 hover:border-rose-300 transition-colors">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 text-lg">
                  <FaQuestionCircle />
                </div>
                <p className="text-slate-700 font-bold text-sm leading-relaxed mt-1">
                  واش كيجيك منطقي تخلص فلوس صحيحة باش تجلس فقسم عامر بـ 20 واحد، وتضيع وقتك كتسمع داكشي لي تقدر تقراه بوحدك؟
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} className="bg-white border-2 border-rose-100 p-5 rounded-2xl shadow-sm flex items-start gap-4 hover:border-rose-300 transition-colors">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 text-lg">
                  <FaExclamationCircle />
                </div>
                <p className="text-slate-700 font-bold text-sm leading-relaxed mt-1">
                  واش ماحسيتيش بلي كيبيعو ليك الوهم فحصص كيمشي نصها غير فتقطاع الهضرة وشرح الأستاذ؟
                </p>
              </motion.div>
            </div>

            {/* الجواب / قالبنا الآية */}
            <motion.div whileHover={{ y: -3 }} className="bg-emerald-50 border-2 border-emerald-200 p-5 sm:p-6 rounded-2xl shadow-sm flex items-start sm:items-center gap-4 text-right mt-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xl shadow-md">
                <FaLightbulb />
              </div>
              <p className="text-emerald-950 font-black text-sm sm:text-base leading-relaxed">
                حنا قلبنا هاد اللعبة: <span className="font-bold text-emerald-800">المنصة كتعطيك الشرح والتمارين والملخصات، أما الحصص كتدخل ليهم غير باش تهضر وتطبق نتا وصحابك والأستاذ يصحح ليكم.</span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* سلم القيمة */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center max-w-4xl mx-auto">
          
          {/* الباقة الأولى: 99 درهم */}
          <motion.div variants={itemVariants} className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all text-right h-full flex flex-col">
            <div className="w-16 h-16 mb-4 shrink-0">
              <img 
                src={mrRr} 
                alt="Mr RR" 
                className="w-full h-full object-cover rounded-2xl shadow-sm border-2 border-slate-100" 
              />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">الاشتراك الذكي</h3>
            <p className="text-slate-500 text-xs font-bold mb-6 h-8">الولوج الكامل للسيستيم باش تقرا وتفهم بوحدك بسلاسة.</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">99</span>
              <span className="text-slate-500 font-bold"> درهم / شهر</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm font-bold text-slate-700 flex-1">
              <li className="flex items-start gap-2"><FaCheck className="text-blue-500 mt-1 shrink-0" /> فتح جميع الدروس التفاعلية فالمنصة.</li>
              <li className="flex items-start gap-2"><FaCheck className="text-blue-500 mt-1 shrink-0" /> نظام النقاط والتمارين الذكية والتصحيح الآلي.</li>
              <li className="flex items-start gap-2"><FaCheck className="text-blue-500 mt-1 shrink-0" /> تحميل ملخصات PDF عالية الجودة.</li>
              <li className="flex items-start gap-2"><FaCheck className="text-blue-500 mt-1 shrink-0" /> وصول دائم 24/7 للمنصة.</li>
            </ul>
            <a 
              href={getWhatsappUrl("الاشتراك الذكي (99 درهم)")} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-black py-4 rounded-xl transition-all cursor-pointer active:scale-95 mt-auto"
            >
              فعل حسابك دابا
            </a>
          </motion.div>

          {/* الباقة الثانية: 199 درهم */}
          <motion.div variants={itemVariants} className="bg-slate-900 border-4 border-amber-500 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_15px_40px_rgba(245,158,11,0.2)] relative text-right transform md:-translate-y-2 h-full flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 text-xs font-black px-5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
              <FaCrown /> الأكثر اختياراً (السيستيم + التطبيق المباشر)
            </div>
            
            <div className="w-16 h-16 mb-4 shrink-0 relative">
              <img 
                src={msRr} 
                alt="Ms RR" 
                className="w-full h-full object-cover rounded-2xl shadow-md border-2 border-amber-400" 
              />
              <div className="absolute -bottom-2 -right-2 bg-slate-900 text-amber-400 rounded-full p-1.5 border border-amber-500/30">
                <FaVideo className="text-xs" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">الباقة التفاعلية (VIP)</h3>
            <p className="text-slate-400 text-xs font-bold mb-6 h-8">السيستيم كيشرح ليك، والأستاذ كيسمعك ويصحح ليكم.</p>
            <div className="mb-6">
              <span className="text-5xl font-black text-amber-400">199</span>
              <span className="text-slate-400 font-bold"> درهم / شهر</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm font-bold text-slate-200 flex-1">
              <li className="flex items-start gap-2"><FaCheck className="text-amber-500 mt-1 shrink-0" /> <span className="text-white">الولوج الكامل للسيستيم</span></li>
              <li className="flex items-start gap-2"><FaCheck className="text-amber-500 mt-1 shrink-0" /> <span className="text-amber-400">تأطير مباشر:</span> حصص تطبيقية أسبوعياً مع الأستاذ.</li>
              <li className="flex items-start gap-2"><FaCheck className="text-amber-500 mt-1 shrink-0" /> مجموعات مصغرة: <strong className="text-amber-400">5 لـ 8 أشخاص كحد أقصى</strong>.</li>
              <li className="flex items-start gap-2"><FaWifi className="text-amber-500 mt-1 shrink-0" /> مجموعة WhatsApp للتواصل والتصحيح المستمر.</li>
            </ul>
            <a 
              href={getWhatsappUrl("الباقة التفاعلية VIP (199 درهم)")} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:brightness-110 text-slate-900 font-black py-4 rounded-xl transition-all shadow-[0_5px_15px_rgba(245,158,11,0.3)] cursor-pointer active:scale-95 text-base sm:text-lg mt-auto"
            >
              <FaWhatsapp className="text-xl" /> احجز بلاصتك فالمجموعة
            </a>
          </motion.div>

        </motion.div>

        {/* الأسئلة الشائعة */}
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto space-y-3">
          <h3 className="text-2xl font-black text-slate-900 mb-6 text-center flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-blue-600" />
            <span>عندك شي سؤال؟</span>
          </h3>

          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-blue-200 transition-colors">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-right font-black text-slate-800 flex justify-between items-center text-sm sm:text-base hover:bg-slate-50 cursor-pointer"
              >
                <span>{faq.q}</span>
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
                    <div className="p-4 pt-0 text-slate-600 text-xs sm:text-sm font-bold leading-relaxed border-t border-slate-100 bg-slate-50">
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