import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

// جيب الصور ديال الشخصيات
import mrRr from '../../assets/mr-rr.png';
import msRr from '../../assets/ms-rr.png';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth(); 

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    const { error } = await login();

    if (error) {
      setError('وقع شي مشكل فالتسجيل ❌');
      setLoading(false);
    }
  };
  
  return (
    <div className="flex-1 flex items-center justify-center min-h-[75vh] w-full dir-rtl font-sans relative px-4 sm:px-0 overflow-hidden">
      
      {/* إضاءات خلفية فخمة ومتحركة */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-300/20 rounded-full blur-[80px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-[80px] pointer-events-none animate-pulse delay-700"></div>

      {/* البطاقة الرئيسية */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/90 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative z-10 text-center"
      >
        
        {/* تقديم الشخصيات بأنيميشن سريعة وحيوية */}
        <div className="flex justify-center items-center -space-x-4 rtl:space-x-reverse mb-6">
          <motion.div 
            animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            className="z-10 relative cursor-pointer"
          >
            <img 
              src={mrRr} 
              alt="Mr RR" 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-lg object-cover" 
            />
            <div className="absolute -bottom-2 -left-2 bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
              Mr-RR
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [3, -3, 3] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="z-20 relative cursor-pointer"
          >
            <img 
              src={msRr} 
              alt="Ms RR" 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-xl object-cover" 
            />
            <div className="absolute -bottom-2 -right-2 bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
              Ms-RR
            </div>
          </motion.div>
        </div>

        <h1 className="text-3xl font-black mb-3 text-slate-900 tracking-tight">
          مرحبا بيك معانا! 🚀
        </h1>
        <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed px-2">
          سيدي ولالة RR كيتسناو فيك.. دخل دابا باش يعاونوك فطريقك فـإتقان الإنجليزية.
        </p>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-rose-50 text-rose-600 font-bold text-sm p-4 rounded-xl mb-6 border border-rose-100"
          >
            {error}
          </motion.div>
        )}

        {/* زر جوجل بتصميم VIP */}
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-base sm:text-lg py-4 px-6 rounded-2xl border border-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.2)] hover:shadow-[0_10px_25px_rgba(15,23,42,0.3)] transition-all duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed active:scale-95 group"
        >
          <div className="bg-white p-1.5 rounded-xl group-hover:scale-105 transition-transform">
            <img 
              src="https://www.svgrepo.com/show/475656/google-color.svg" 
              alt="Google" 
              className="w-5 h-5" 
            />
          </div>
          <span>{loading ? 'جاري التحميل...' : 'دخول بحساب Google'}</span>
        </button>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-bold leading-relaxed">
           قاد حساب فثواني باش تحفظ التقدم ديالك وتستفد من الدروس المخصصة ليك.
          </p>
        </div>
      </motion.div>
    </div>
  );
}