import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaCrown, FaTimes, FaDownload, FaStar, FaPen, FaCoffee, FaMapMarkerAlt, FaPlusCircle, FaLightbulb, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function DailyClasses() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // داتا غنية فيها مصطلحات وقواعد باش تبان الورقة عامرة ومفيدة
  const worksheets = [
    { 
      id: 1, 
      title: 'التعريف بالنفس', 
      type: 'Worksheet 1',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      lightBg: 'bg-blue-50',
      icon: <FaPen className="text-blue-500" />,
      vocab: ['Name', 'Country', 'Age', 'Nice to meet you'],
      grammarTip: 'Use "I am" for age and nationality.',
      lines: ['Hello, my name is Ahmed.', 'I am from Morocco.', 'I am 25 years old.'],
      question: 'Choose the correct verb:',
      answers: ['am', 'is', 'are'],
      correct: 0
    },
    { 
      id: 2, 
      title: 'طلب القهوة فالمقهى', 
      type: 'Worksheet 2',
      color: 'amber',
      gradient: 'from-amber-400 to-orange-500',
      lightBg: 'bg-amber-50',
      icon: <FaCoffee className="text-amber-500" />,
      vocab: ['Waiter', 'Order', 'Coffee', 'The bill'],
      grammarTip: 'Say "I would like..." to be polite.',
      lines: ['Waiter: What would you like?', 'Me: I would like a coffee.', 'Waiter: Anything else?'],
      question: 'Translate to English:',
      answers: ['بغيت', 'عافاك', 'شكرا'],
      correct: null
    },
    { 
      id: 3, 
      title: 'الاتجاهات والأماكن', 
      type: 'Worksheet 3',
      color: 'emerald',
      gradient: 'from-emerald-400 to-teal-500',
      lightBg: 'bg-emerald-50',
      icon: <FaMapMarkerAlt className="text-emerald-500" />,
      vocab: ['Straight', 'Left', 'Right', 'Next to'],
      grammarTip: 'Use imperative verbs for directions.',
      lines: ['Excuse me, where is the bank?', 'Go straight, then turn left.', 'It is next to the hospital.'],
      question: 'Fill in the blanks:',
      answers: ['straight', 'left', 'next'],
      correct: null
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 dir-rtl font-sans selection:bg-amber-200 overflow-hidden">
      
      {/* خلفية زاهية */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* الهيدر */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-200 text-amber-800 px-5 py-2 rounded-full text-xs sm:text-sm font-black mb-6 shadow-sm transform -rotate-2 hover:rotate-0 transition-transform">
            <FaCrown className="text-amber-600 text-base" />
            <span>ركن المشتركين (Premium)</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
            حصص <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">اليوم</span> 📝
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto font-bold leading-relaxed">
            أوراق عمل عامرة بالمصطلحات والقواعد، مع تمارين مصممة باش تخليك تطبق داكشي لي قريتي ديريكت.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* أوراق العمل المليئة بالمحتوى */}
          {worksheets.map((sheet, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              key={sheet.id} className="group relative col-span-1"
            >
              <div className="bg-white rounded-[2rem] border-[3px] border-slate-900 shadow-[0_8px_0_#0F172A] p-5 relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 h-[480px] flex flex-col">
                <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${sheet.gradient}`}></div>

                <div className="flex justify-between items-center mb-4 pt-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${sheet.lightBg} flex items-center justify-center shrink-0`}>
                      {sheet.icon}
                    </div>
                    <span className="font-black text-slate-800 text-base leading-tight">{sheet.title}</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  
                  {/* قسم المصطلحات */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase mb-2 block dir-ltr text-left">Vocabulary:</span>
                    <div className="flex flex-wrap gap-1.5 dir-ltr justify-start">
                      {sheet.vocab.map((v, i) => (
                        <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-600 inline-block">{v}</span>
                      ))}
                    </div>
                  </div>

                  {/* قسم القاعدة السريعة */}
                  <div className={`${sheet.lightBg} p-3 rounded-xl border border-white dir-ltr text-left`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <FaLightbulb className={`${sheet.color === 'amber' ? 'text-amber-500' : sheet.color === 'emerald' ? 'text-emerald-500' : 'text-blue-500'} text-xs`} />
                      <span className="text-[10px] font-black uppercase text-slate-600">Tip</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700">{sheet.grammarTip}</p>
                  </div>

                  {/* قسم النصوص (مضبوط بـ dir="ltr" لتفادي مشكل الفواصل) */}
                  <div className="space-y-2 mt-1 dir-ltr text-left">
                    {sheet.lines.map((line, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <FaStar className="text-slate-200 text-[10px] shrink-0 mt-1" />
                        <p className="text-slate-600 font-bold text-xs border-b border-slate-100/50 pb-1 w-full">
                          {line}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* تمرين مطبوع */}
                  <div className="mt-2 border-2 border-slate-100 p-3 rounded-2xl dir-ltr text-left">
                    <p className="text-[11px] font-black text-slate-700 mb-2">{sheet.question}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {sheet.answers.map((opt, i) => (
                         <span key={i} className={`px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 flex items-center gap-1 ${sheet.correct === i ? 'border-emerald-400 text-emerald-600 bg-emerald-50' : ''}`}>
                           {sheet.correct === i && <FaCheck className="text-[8px]" />}
                           {opt}
                         </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* التمويه (Fade out) لتشويق الزائر */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/95 to-transparent flex items-end justify-center pb-6">
                  <div className="bg-slate-900/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-900/10 flex items-center gap-2">
                     <FaLock className="text-slate-400 text-xs" />
                     <span className="text-slate-500 text-xs font-bold">باقي المحتوى مقفول</span>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setIsModalOpen(true)} className={`w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r ${sheet.gradient} text-white font-black py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 text-sm`}>
                <FaDownload className="text-base" />
                <span>حمل ({sheet.type})</span>
              </button>
            </motion.div>
          ))}

          {/* البطاقة الرابعة: دروس أخرى */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="col-span-1">
            <div className="bg-slate-100/50 rounded-[2rem] border-[3px] border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center h-[480px] transition-colors hover:bg-slate-100 hover:border-slate-400 cursor-pointer" onClick={() => setIsModalOpen(true)}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border-2 border-slate-200">
                <FaPlusCircle className="text-3xl text-slate-400" />
              </div>
              <h3 className="text-xl font-black text-slate-600 mb-2">أكثر من 50+ ورقة عمل</h3>
              <p className="text-sm font-bold text-slate-400">
                مكتبة كاملة ديال التمارين، الحوارات، والمصطلحات كتسناك لداخل.
              </p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-700 font-black py-3 rounded-2xl transition-all active:scale-95 text-sm">
              <span>تصفح المكتبة كاملة</span>
            </button>
          </motion.div>

        </div>
      </div>

      {/* النافذة المنبثقة (Modal) لي كتبقى نفس الديزاين */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 dir-rtl">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -2 }} animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20, rotate: 2 }} className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-10 border-4 border-slate-900 shadow-[0_20px_0_#0F172A] z-10 text-center">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-full transition-colors border-2 border-rose-200"><FaTimes /></button>
              <div className="w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-500 rounded-[2rem] flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-lg rotate-6"><FaLock /></div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">هاد التمارين دياول <br/> <span className="text-amber-500">المشتركين فقط!</span> 💎</h2>
              <p className="text-slate-500 font-bold text-sm md:text-base mb-8 leading-relaxed">باش تحمل أوراق العمل، وتستافد من التصحيح اليومي والمتابعة الخاصة فـ الواتساب، اشترك معانا دابا فالعرض المتقدم.</p>
              <Link to="/pricing" className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl border-b-4 border-slate-700 active:border-b-0 active:translate-y-1 transition-all text-lg shadow-xl"><FaCrown className="text-xl text-amber-400" /><span>شوف تفاصيل الاشتراك</span></Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}