import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaLaptopCode, FaBolt, FaComments, FaUsers, FaArrowLeft, 
  FaCheckCircle, FaRocket, FaShieldAlt, FaGamepad
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// استيراد الشخصيات
import mrRr from '../assets/mr-rr.png';
import msRr from '../assets/ms-rr.png';

export default function About() {
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
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl font-sans selection:bg-blue-200 overflow-hidden relative">
      
      {/* إضاءات خلفية ناعمة */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-20 relative z-10">
        
        {/* 1. الهيدر الترحيبي مع الشخصيات */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6 mt-4">
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-right"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black mb-6 shadow-sm">
              <FaRocket className="text-blue-600" />
              <span>طريقة التعلم المزدوج (Hybrid Learning)</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
              كيفاش كنعلموك تهضر بـ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">الزربة؟</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg font-bold leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
              قراية القسم المملة والحفاظة سالات. فـ RR ENGLISH، جبنا ليك بيداغوجيا جديدة كتجمع بين التعلم الذاتي الممتع، وبين الممارسة المباشرة.
            </p>
            <Link
              to="/lessons"
              className="inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-black px-8 py-4 rounded-2xl text-base shadow-xl shadow-slate-900/20 transition-all active:scale-95 group"
            >
              <span>بدا التجربة دابا</span>
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* الشخصيات العائمة */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full max-w-md relative flex justify-center h-72 sm:h-96"
          >
            {/* Mr-RR */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-4 sm:right-10 z-10"
            >
              <img src={mrRr} alt="Mr RR" className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-3xl border-4 border-white shadow-2xl bg-amber-50" />
              <div className="absolute -bottom-4 -left-4 bg-white px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 font-black text-xs text-amber-600">
                شرح مبسط 💡
              </div>
            </motion.div>

            {/* Ms-RR */}
            <motion.div 
              animate={{ y: [0, -10, 0], rotate: [2, -2, 2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-4 left-4 sm:left-10 z-20"
            >
              <img src={msRr} alt="Ms RR" className="w-36 h-36 sm:w-52 sm:h-52 object-cover rounded-3xl border-4 border-white shadow-2xl bg-blue-50" />
              <div className="absolute -top-4 -right-4 bg-white px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 font-black text-xs text-blue-600">
                تطبيق مباشر 🗣️
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. شرح البيداغوجيا (خطوات التعلم) */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">البيداغوجيا ديالنا فـ 3 خطوات</h2>
            <p className="text-slate-500 font-bold text-sm">طريقة متسلسلة باش تفهم، تطبق، وتهضر بثقة.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* الخطوة 1 */}
            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-[2rem] border-2 border-blue-100 shadow-sm hover:border-blue-300 transition-colors relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors"></div>
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm relative z-10 border border-blue-200">
                <FaLaptopCode />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 relative z-10">1. قرا وتمرن فـ المنصة</h3>
              <p className="text-slate-600 font-bold text-sm leading-relaxed relative z-10">
                السيدة RR كتوفر ليك دروس قصيرة وتفاعلية (Micro-learning) مشروحة بالدارجة. كتقرا بوحدك وقتما بغيتي بلا ما تمل.
              </p>
            </motion.div>

            {/* الخطوة 2 */}
            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-[2rem] border-2 border-amber-100 shadow-sm hover:border-amber-300 transition-colors relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full blur-2xl group-hover:bg-amber-100 transition-colors"></div>
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm relative z-10 border border-amber-200">
                <FaGamepad />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 relative z-10">2. جمع النقط (XP)</h3>
              <p className="text-slate-600 font-bold text-sm leading-relaxed relative z-10">
                السيد RR مكيخليكش تعكز! كل تمرين كملتيه كتربح عليه نقاط XP وتصحيح فوري. هاد النقط هما باش كتدوز للمرحلة الأهم.
              </p>
            </motion.div>

            {/* الخطوة 3 */}
            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-[2rem] border-2 border-emerald-100 shadow-sm hover:border-emerald-300 transition-colors relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full blur-2xl group-hover:bg-emerald-100 transition-colors"></div>
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm relative z-10 border border-emerald-200">
                <FaComments />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 relative z-10">3. طلق لسانك لايف</h3>
              <p className="text-slate-600 font-bold text-sm leading-relaxed relative z-10">
                النقط لي جمعتي كتحولها لحصص تطبيقية ومحادثات فمجموعات واتساب مصغرة. هنا فين كتمارس الهضرة مع الأساتذة ديالنا.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* 3. علاش هاد الطريقة ناجحة؟ (Why It Works) */}
        <section className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden border-4 border-slate-900 shadow-[0_15px_40px_-10px_rgba(15,23,42,0.5)]">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-400/20 rounded-lg">
                  <FaShieldAlt className="text-2xl text-amber-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">علاش هاد النظام كيخدم مزيان؟</h3>
              </div>
              
              <div className="space-y-5 text-slate-300 text-sm sm:text-base font-bold">
                <div className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <FaCheckCircle className="text-emerald-400 mt-1 shrink-0 text-lg" />
                  <p><strong>كيقضي على العكز:</strong> ملي كتعرف أن القراية ديالك كتحول لنقاط، وأن هاد النقاط غتخليك تشارك فحصص لايف، كتقرا يومياً بلا انقطاع.</p>
                </div>
                <div className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <FaCheckCircle className="text-emerald-400 mt-1 shrink-0 text-lg" />
                  <p><strong>كتجي واجد للحصة:</strong> مكنضيعوش وقت الحصة اللايف فشرح القواعد. كتجي ديجا فاهم من المنصة، وكتدخل ديريكت فالمحادثة والتصحيح.</p>
                </div>
                <div className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <FaCheckCircle className="text-emerald-400 mt-1 shrink-0 text-lg" />
                  <p><strong>بيئة آمنة:</strong> المجموعات مقسمين بناس فنفس مستواك باش تهضر براحتك وتغلط وتتعلم بلا حشمة.</p>
                </div>
              </div>
            </div>

            {/* بانر تشجيعي صغير */}
            <div className="w-full md:w-1/3 shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-3xl text-slate-900 text-center shadow-lg transform rotate-2 hover:rotate-0 transition-transform">
              <FaUsers className="text-4xl mx-auto mb-3 opacity-80" />
              <h4 className="text-xl font-black mb-2">مجموعات مصغرة</h4>
              <p className="text-sm font-bold opacity-90 mb-4">من 5 لـ 8 ديال الناس باش كلشي ياخد وقتو فالهضرة.</p>
              <Link to="/Lessons" className="inline-block bg-slate-900 text-white font-black px-6 py-2.5 rounded-xl text-sm hover:bg-slate-800 transition-colors">
                شوف الدروس المجانية
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}