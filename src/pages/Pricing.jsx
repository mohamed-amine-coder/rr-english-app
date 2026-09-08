import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, FaLock, FaCrown, FaVideo, 
  FaGraduationCap, FaUserTie, FaLaptopCode,
  FaFire, FaClock, FaHeart
} from 'react-icons/fa';
import mrRr from '../assets/mr-rr.png';
import msRr from '../assets/ms-rr.png';

const PRICING_CONFIG = {
  smart: { student: 99, regular: 159 },
  vip: { student: 199, regular: 229 }
};

export default function Pricing() {
  const whatsappNumber = '+212718090887'; 

  const [isStudent, setIsStudent] = useState(true);
  const [hasSelected, setHasSelected] = useState(false);

  const currentSmartPrice = isStudent ? PRICING_CONFIG.smart.student : PRICING_CONFIG.smart.regular;
  const currentVipPrice = isStudent ? PRICING_CONFIG.vip.student : PRICING_CONFIG.vip.regular;

  const getWhatsappUrl = (planName, price, isStudentUser) => {
    let message = isStudentUser 
      ? encodeURIComponent(`السلام عليكم، أنا طالب(ة)/ربة بيت وبغيت نسول واش باقا شي بلاصة فـ ${planName} ديال ${price} درهم؟`)
      : encodeURIComponent(`السلام عليكم، بغيت نفعل حسابي فـ ${planName} بـ ${price} درهم.`);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  const handleSelection = (studentStatus) => {
    setIsStudent(studentStatus);
    setHasSelected(true);
    setTimeout(() => {
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 100);
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    boxShadow: ["0px 0px 0px rgba(239,68,68,0)", "0px 0px 15px rgba(239,68,68,0.5)", "0px 0px 0px rgba(239,68,68,0)"],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  };

  const floatingAnimation = {
    y: [0, -8, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 dir-rtl font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-900 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <FaLock className="text-amber-600 text-sm" />
            <span>هاد الدرس داخل فالمحتوى المدفوع</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            قائمة <span className="text-blue-600">الأثمنة والعروض</span>
          </h1>
          <p className="text-slate-500 font-bold text-sm sm:text-base">
            جودة أعلى، وثمن أقل.. باش حتى واحد مايبقى بلاش!
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!hasSelected ? (
            /* Selection Screen */
            <motion.div 
              key="selection-screen"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto mb-20"
            >
              <div className="text-center mb-8">
                <p className="text-slate-500 font-bold text-sm sm:text-base">اختار(ي) الصفة ديالك باش نعطيوك العرض لي مسلكك</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.button
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelection(true)}
                  className="bg-white border-2 border-rose-200 hover:border-rose-500 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col items-center justify-center gap-4 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-3xl group-hover:bg-rose-500 group-hover:text-white transition-colors shadow-inner">
                    <FaGraduationCap />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-black text-slate-900 mb-1">طالب(ة) / تلميذ(ة) / ربة بيت</h3>
                    <p className="text-rose-500 text-xs font-bold">استفد من العرض المدعم</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelection(false)}
                  className="bg-white border-2 border-slate-200 hover:border-blue-500 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col items-center justify-center gap-4 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center text-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-inner">
                    <FaUserTie />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-black text-slate-900 mb-1">موظف(ة) / عموم</h3>
                    <p className="text-slate-500 text-xs font-bold">باقات تناسب وقتك وعملك</p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* Pricing Screen */
            <motion.div 
              key="pricing-screen"
              initial={{ opacity: 0, scale: 1.02, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
              className="mb-14"
            >
              <div className="flex justify-center mb-6 opacity-70 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setHasSelected(false)}
                  className="text-xs font-bold text-slate-500 underline decoration-slate-300 hover:text-blue-600 cursor-pointer"
                >
                  تبديل الاختيار ({isStudent ? 'طالب(ة) / ربة بيت' : 'موظف(ة) / عموم'})
                </button>
              </div>

              {/* Empathy & FOMO Message */}
              <AnimatePresence>
                {isStudent && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="max-w-3xl mx-auto mb-12 overflow-hidden"
                  >
                    <div className="bg-rose-50 border-2 border-rose-100 rounded-3xl p-5 sm:p-6 text-center relative overflow-hidden shadow-sm">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200 rounded-full blur-3xl opacity-30 -mr-10 -mt-10"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-300 rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>
                      
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className="bg-white p-3 rounded-full shadow-sm text-rose-500">
                          <FaHeart className="text-xl animate-pulse" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-rose-900">علاش درنا هاد الدعم؟</h3>
                        <p className="text-rose-800 text-xs sm:text-sm font-bold leading-relaxed max-w-2xl">
                          عارفين بلي المصاريف قاصحة، وما بغيناش نزيدو نكلفو عليك ولا على والديك حيت حاسين بالمجهود لي كديرو. داكشي علاش مستر وميس RR قررو يتحملو جزء من التكلفة كدعم ليك.. <span className="font-black text-rose-950">الثمن الأصلي ديال الباقات ({PRICING_CONFIG.smart.regular} درهم و {PRICING_CONFIG.vip.regular} درهم) ماغاديش تخلصو نتا! </span> 
                          طيحنا الثمن <span className="font-black underline decoration-rose-300">باش الفلوس عمرها تكون عائق بينك وبين مستقبلك!</span>
                        </p>
                        
                        <motion.div 
                          animate={pulseAnimation}
                          className="mt-3 bg-rose-600 text-white text-[11px] sm:text-xs font-black px-5 py-2 rounded-full shadow-md flex items-center gap-2"
                        >
                          <FaFire className="text-amber-300 text-base" /> 
                          <span>هاد الدعم محدود: المقاعد قربات تسالي!</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Character-Driven Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-8 items-stretch max-w-4xl mx-auto mt-16 sm:mt-12">
                
                {/* Card 1: Mr RR (Smart) */}
                <div className={`bg-white border-2 rounded-[2rem] px-6 pb-8 pt-12 shadow-sm hover:shadow-xl transition-all text-center flex flex-col justify-between relative mt-8 sm:mt-0 ${isStudent ? 'border-rose-200' : 'border-slate-200'}`}>
                  
                  <motion.div 
                    animate={floatingAnimation}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28"
                  >
                    <div className="w-full h-full bg-slate-100 rounded-full border-4 border-white shadow-lg overflow-hidden relative">
                      <img src={mrRr} alt="Mr RR" className="w-full h-full object-cover" />
                    </div>
                  </motion.div>

                  <div className="mt-4">
                    <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-black px-3 py-1 rounded-full mb-2">الاشتراك الذكي</span>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">دروس المنصة</h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-bold mb-6 leading-relaxed">
                      السيستيم كيقابلك 24/7. كيعطيك الشرح، التمارين، وكيصحح ليك أوتوماتيكيا بلا ما تسنى.
                    </p>
                    
                    <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 text-right">
                      <div className="flex items-center gap-2 text-slate-800 font-black text-sm mb-2">
                        <FaLaptopCode className="text-blue-600 text-base shrink-0" />
                        <span>ولوج كامل للمنصة التفاعلية</span>
                      </div>
                      <div className="text-rose-500 font-bold text-xs pr-6">
                        ✕ بدون حصص مباشرة مع الأستاذة
                      </div>
                    </div>

                    <div className="mb-6 flex flex-col items-center">
                      <div className="flex items-baseline gap-2 justify-center">
                        {isStudent && (
                          <div className="relative inline-block text-xl font-black text-slate-400">
                            {PRICING_CONFIG.smart.regular}
                            <motion.span
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                              className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-red-500 origin-right rounded-full"
                            />
                          </div>
                        )}
                        <span className={`text-5xl font-black leading-none ${isStudent ? 'text-rose-600' : 'text-blue-600'}`}>
                          {currentSmartPrice}
                        </span>
                        <span className="text-slate-500 text-xs font-bold">درهم / شهر</span>
                      </div>
                    </div>
                    
                    {isStudent && (
                      <div className="mb-5 text-right w-full">
                        <div className="flex justify-between text-[10px] font-black text-rose-600 mb-1.5 px-1">
                          <span>المقاعد فهاد العرض محدودة</span>
                          <span className="flex items-center gap-1"><FaClock /> الطلب طالع</span>
                        </div>
                        <div className="w-full bg-rose-100 rounded-full h-1.5">
                          <motion.div initial={{ width: "0%" }} animate={{ width: "85%" }} transition={{ duration: 2, ease: "easeOut" }} className="bg-rose-500 h-1.5 rounded-full"></motion.div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <motion.a 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={getWhatsappUrl("الاشتراك الذكي", currentSmartPrice, isStudent)}
                    target="_blank" rel="noopener noreferrer" 
                    className={`w-full flex items-center justify-center font-black py-4 rounded-xl transition-colors cursor-pointer text-sm shadow-sm ${
                      isStudent 
                      ? "bg-rose-50 text-rose-700 border border-rose-300 hover:bg-rose-600 hover:text-white" 
                      : "bg-slate-100 text-slate-900 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    {isStudent ? "تأكد واش باقا بلاصة بـ " + currentSmartPrice + " درهم" : "فعل حسابك بـ " + currentSmartPrice + " درهم"}
                  </motion.a>
                </div>

                {/* Card 2: Ms RR (VIP) */}
                <div className="bg-slate-900 border-4 border-amber-500 rounded-[2rem] px-6 pb-8 pt-12 shadow-[0_15px_40px_rgba(245,158,11,0.2)] text-center flex flex-col justify-between relative mt-16 sm:mt-0 sm:-translate-y-4">
                  
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl rounded-tr-[1.75rem] flex items-center gap-1 z-20">
                    <FaCrown /> الأكثر اختياراً
                  </div>

                  <motion.div 
                    animate={floatingAnimation}
                    style={{ animationDelay: '0.5s' }}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 w-32 h-32 z-10"
                  >
                    <div className="w-full h-full bg-slate-800 rounded-full border-4 border-amber-400 shadow-xl overflow-hidden relative">
                      <img src={msRr} alt="Ms RR" className="w-full h-full object-cover" />
                      <div className="absolute bottom-1 right-1 bg-slate-900 text-amber-400 rounded-full p-1.5 border border-amber-500/40">
                        <FaVideo className="text-xs" />
                      </div>
                    </div>
                  </motion.div>

                  <div className="mt-6">
                    <span className="inline-block bg-amber-500/20 text-amber-400 text-[10px] font-black px-3 py-1 rounded-full mb-2 border border-amber-500/30">الباقة التفاعلية VIP</span>
                    <h3 className="text-2xl font-black text-white mb-2">الحصص التفاعلية</h3>
                    <p className="text-slate-300 text-xs sm:text-sm font-bold mb-6 leading-relaxed">
                      السيستيم كيشرح ليك، وعندك حصص مع استاذ/ة كتسمعك وتصحح ليك فـ لايف باش تطلق لسانك وتهضر بثقة.
                    </p>

                    <div className="bg-slate-800 rounded-2xl p-4 mb-6 border border-slate-700 text-right">
                      <div className="flex items-center gap-2 text-white font-black text-sm mb-2">
                        <FaLaptopCode className="text-amber-400 text-base shrink-0" />
                        <span>ولوج كامل للمنصة التفاعلية</span>
                      </div>
                      <div className="text-amber-400 font-bold text-xs pr-6">
                        ✓ + حصص تطبيقية أسبوعياً (مجموعات 5 لـ 8 فقط)
                      </div>
                    </div>

                    <div className="mb-6 flex flex-col items-center">
                      <div className="flex items-baseline gap-2 justify-center">
                        {isStudent && (
                          <div className="relative inline-block text-xl font-black text-slate-500">
                            {PRICING_CONFIG.vip.regular}
                            <motion.span
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5, delay: 0.7 }}
                              className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-red-500 origin-right rounded-full"
                            />
                          </div>
                        )}
                        <span className="text-5xl font-black text-amber-400 leading-none">
                          {currentVipPrice}
                        </span>
                        <span className="text-slate-400 text-xs font-bold">درهم / شهر</span>
                      </div>
                    </div>

                    {isStudent && (
                      <div className="mb-5 text-right w-full">
                        <div className="flex justify-between text-[10px] font-black text-amber-400 mb-1.5 px-1">
                          <span>الأماكن فمجموعات اللايف جد محدودة!</span>
                          <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="flex items-center gap-1 text-red-400">
                            <FaFire /> خطير
                          </motion.span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <motion.div initial={{ width: "0%" }} animate={{ width: "92%" }} transition={{ duration: 2.5, ease: "easeOut" }} className="bg-gradient-to-r from-amber-500 to-red-500 h-1.5 rounded-full relative">
                            <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-full h-full bg-white/30" />
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </div>

                  <motion.a 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={isStudent ? { y: [0, -4, 0], transition: { duration: 2, repeat: Infinity } } : {}}
                    href={getWhatsappUrl("الباقة التفاعلية VIP", currentVipPrice, isStudent)}
                    target="_blank" rel="noopener noreferrer" 
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-black py-4 rounded-xl shadow-[0_5px_15px_rgba(245,158,11,0.3)] cursor-pointer text-sm relative"
                  >
                    <FaWhatsapp className="text-lg" /> 
                    {isStudent ? "خطف بلاصتك بـ " + currentVipPrice + " درهم" : "احجز بلاصتك بـ " + currentVipPrice + " درهم"}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}