import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaPlayCircle, FaLaptopCode, FaBolt, FaComments, FaGem } from 'react-icons/fa';

// استيراد الشخصيات
import mrRr from '../assets/mr-rr.png';
import msRr from '../assets/ms-rr.png';

export default function Home() {
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
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-[85vh] bg-slate-50 overflow-hidden font-sans selection:bg-blue-200" dir="rtl">
      
      {/* إضاءات خلفية (Ambient Glow) */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10">
        
        {/* =========================================
            1. Hero Section (الواجهة الرئيسية)
        ========================================= */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mb-24">
          
          {/* النص والأزرار (جهة اليمين) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 text-center lg:text-right"
          >
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-xs sm:text-sm font-black mb-6 shadow-sm">
              <FaGem className="text-amber-500" />
              <span>المنصة التفاعلية الأولى فالمغرب 🇲🇦</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.15] mb-6 tracking-tight">
              تعلم الإنجليزية بـ <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">الدارجة المغربية</span> بسهولة.
            </h1>
            
            <p className="text-slate-600 text-base sm:text-lg font-bold leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              منصة RR ENGLISH غتخليك تهضر وتفهم الإنجليزية بلا عقد. قرا بوحدك، جمع النقط (XP)، وشارك فحصص مباشرة باش تطلق لسانك.
            </p>
            
            {/* الأزرار */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/lessons" 
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-base transition-all shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_10px_25px_rgba(37,99,235,0.35)] active:scale-95 cursor-pointer"
              >
                <FaRocket /> 
                <span>بدا تجمع الـ XP دابا</span>
              </Link>
              <Link 
                to="/about" 
                className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-blue-200 hover:bg-blue-50 text-slate-700 px-8 py-4 rounded-2xl font-black text-base transition-all active:scale-95 cursor-pointer"
              >
                <FaPlayCircle className="text-blue-500 text-lg" />
                <span>كيفاش كتخدم المنصة؟</span>
              </Link>
            </div>
          </motion.div>

          {/* الشخصيات (جهة اليسار) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full max-w-lg relative flex justify-center h-80 sm:h-[450px]"
          >
            {/* خلفية الشخصيات */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-tr from-blue-100 to-amber-100 rounded-full border-4 border-white shadow-2xl z-0"></div>

            {/* Mr-RR */}
            <motion.div 
              animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 sm:top-10 right-4 sm:right-10 z-10"
            >
              <img src={mrRr} alt="Mr RR" className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded-3xl border-4 border-white shadow-xl bg-amber-50" />
              <div className="absolute -bottom-3 -left-3 bg-white px-3 py-1.5 rounded-xl shadow-md border border-slate-100 font-black text-xs text-amber-600 flex items-center gap-1">
                <span>تفاعلي</span> ⚡
              </div>
            </motion.div>

            {/* Ms-RR */}
            <motion.div 
              animate={{ y: [0, -10, 0], rotate: [2, -2, 2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 z-20"
            >
              <img src={msRr} alt="Ms RR" className="w-40 h-40 sm:w-56 sm:h-56 object-cover rounded-3xl border-4 border-white shadow-2xl bg-blue-50" />
              <div className="absolute -top-4 -right-2 bg-white px-3 py-1.5 rounded-xl shadow-md border border-slate-100 font-black text-xs text-blue-600 flex items-center gap-1">
                <span>مباشر</span> 🗣️
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* =========================================
            2. Features Section (المميزات السريعة)
        ========================================= */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* الميزة 1 */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <FaLaptopCode />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">قرا وتدرب بوحدك</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed">
              دروس وتمارين تفاعلية مشروحة بالدارجة. متاحين 24/7 باش تتعلم على راحتك.
            </p>
          </motion.div>

          {/* الميزة 2 */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all">
              <FaBolt />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">جمع الـ XP والتحديات</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed">
              القراية بحال اللعب! كل تمرين كيعطيك نقط، وهاد النقط كتحول لحصص لايف.
            </p>
          </motion.div>

          {/* الميزة 3 */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <FaComments />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">طلق لسانك لايف</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed">
              مجموعات مصغرة مع الأساتذة لتطبيق داكشي لي قريتي فمواقف حقيقية.
            </p>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}