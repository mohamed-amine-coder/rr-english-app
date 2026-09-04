import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaCompass, FaMapMarkedAlt } from 'react-icons/fa';

// استيراد الشخصية
import mrRr from '../assets/mr-rr.png';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 dir-rtl text-center font-sans relative overflow-hidden bg-slate-50">
      
      {/* إضاءات خلفية (Ambient Glow) */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-2xl relative z-10"
      >
        {/* شخصية Mr-RR دايخ */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <motion.div
            animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <img 
              src={mrRr} 
              alt="Mr RR Lost" 
              className="w-full h-full object-cover rounded-3xl border-4 border-slate-100 shadow-md bg-slate-50"
            />
            {/* علامات الاستفهام والخريطة */}
            <div className="absolute -top-3 -right-3 bg-white text-xl rounded-full shadow-sm p-1.5 rotate-12 border border-slate-100">
              ❓
            </div>
            <div className="absolute -bottom-3 -left-3 bg-blue-100 text-blue-600 rounded-2xl p-2 shadow-sm border border-blue-200 rotate-[-10deg]">
              <FaMapMarkedAlt className="text-xl" />
            </div>
          </motion.div>
        </div>

        {/* النصوص */}
        <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
          Mr-RR تلف الطريق! 😅
        </h1>
        <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8">
          الصفحة لي كتقلب عليها ماكايناش، تقدر تكون تبدلات أولا تحيدات من البلاصة ديالها.
        </p>

        {/* الأزرار */}
        <div className="flex flex-col sm:flex-row gap-3.5">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 px-4 rounded-xl shadow-[0_5px_15px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_20px_rgba(37,99,235,0.35)] active:scale-95 transition-all text-sm cursor-pointer"
          >
            <FaHome className="text-lg" />
            <span>الرئيسية</span>
          </Link>
          <Link
            to="/lessons"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-3.5 px-4 rounded-xl hover:shadow-md active:scale-95 transition-all text-sm cursor-pointer border border-slate-200"
          >
            <FaCompass className="text-lg text-slate-500" />
            <span>شوف الدروس</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}