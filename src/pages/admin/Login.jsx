import React, { useState } from 'react';
import { supabase } from '../../config/supabaseClient'; 

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://rrenglish.vercel.app/about' 
      }
    });

    if (error) {
      setError('وقع شي مشكل فالتسجيل ❌');
      setLoading(false);
    }
  };

  return (
    // خلفية مدمجة بألوان المنصة (تدرج لوني ناعم)
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9E6] via-indigo-50 to-indigo-100 flex items-center justify-center p-6 dir-rtl font-sans relative overflow-hidden">
      
      {/* دوائر ديكور فالخلفية */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* البطاقة الرئيسية (Glassmorphism Effect) */}
      <div className="max-w-md w-full bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] text-center relative z-10">
        
        {/* الأيقونة الفوق */}
        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-8 rotate-3 hover:rotate-0 transition-transform duration-300">
          <span className="text-4xl">🎓</span>
        </div>

        <h1 className="text-3xl font-black mb-2 text-slate-800">مرحبا بيك معانا!</h1>
        <p className="text-slate-500 font-medium mb-8">سجل الدخول باش تبدا أو تكمل طريقك فتعلم الإنجليزية</p>
        
        {error && (
          <div className="bg-rose-50 text-rose-600 font-bold p-4 rounded-xl mb-6 border border-rose-100">
            {error}
          </div>
        )}

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-lg py-4 px-6 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 disabled:opacity-50 group"
        >
          <div className="bg-slate-50 p-2 rounded-xl group-hover:bg-white transition-colors">
            <img 
              src="https://www.svgrepo.com/show/475656/google-color.svg" 
              alt="Google" 
              className="w-6 h-6 group-hover:scale-110 transition-transform" 
            />
          </div>
          <span>{loading ? 'جاري الانشاء...' : 'الدخول باستخدام حساب Google'}</span>
        </button>

        <div className="mt-8 pt-6 border-t border-slate-200/50">
          <p className="text-sm text-slate-500 font-bold">
           قاد حساب باش تحفظ التقدم وتستفد من الدروس المخصصة ليك 🚀
          </p>
        </div>
      </div>
    </div>
  );
}