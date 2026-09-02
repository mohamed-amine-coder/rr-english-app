import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCompass, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 dir-rtl text-center font-sans bg-gradient-to-b from-slate-50 to-amber-50/30">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden">
        
        {/* Background decorative blob */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl pointer-events-none"></div>

        {/* Animated Icon Container */}
        <div className="w-24 h-24 bg-gradient-to-tr from-amber-100 to-amber-200 border-4 border-white rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-amber-100 animate-bounce">
          🧭
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-full text-xs font-black mb-4 shadow-sm">
          <FaExclamationTriangle className="text-[10px]" />
          <span>خطأ 404</span>
        </div>

        {/* Texts */}
        <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
          غلطتي فالصفحة 😅
        </h1>
        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
          الصفحة لي كتقلب عليها ماكايناش تقدر تكون تبدلات أولا تحيدات من البلاصة ديالها.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3.5">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 active:scale-[0.98] transition-all text-sm"
          >
            <FaHome className="text-base" />
            <span>الرئيسية</span>
          </Link>
          <Link
            to="/lessons"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold py-3.5 px-4 rounded-2xl hover:shadow-md active:scale-[0.98] transition-all text-sm"
          >
            <FaCompass className="text-base text-slate-500" />
            <span>شوف الدروس</span>
          </Link>
        </div>

      </div>
    </div>
  );
}