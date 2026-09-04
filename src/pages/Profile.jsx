import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { motion } from 'framer-motion';

// استيراد الشخصيات
import mrRr from '../assets/mr-rr.png';
import msRr from '../assets/ms-rr.png';

export default function Profile() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile, progressStats, loading, error } = useProfile();
  
  // حالة باش نعرفو واش الصورة فشلات فالتحميل
  const [imgError, setImgError] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center min-h-[75vh] font-black text-slate-400">جاري تحميل البروفايل... ⏳</div>;
  }

  if (error || !profile) {
    return <div className="flex-1 flex items-center justify-center min-h-[75vh] font-black text-rose-500">مالقيناش الداتا ❌</div>;
  }

  const progressPercentage = progressStats.total > 0 
    ? Math.round((progressStats.completed / progressStats.total) * 100) 
    : 0;

  // استخراج الحرف الأول من الاسم
  const firstLetter = profile.full_name ? profile.full_name.charAt(0).toUpperCase() : '?';

  return (
    <div className="flex-1 flex items-center justify-center min-h-[75vh] w-full dir-rtl font-sans relative px-4 sm:px-6 overflow-hidden">
      
      {/* إضاءات خلفية (Ambient Glow) */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-amber-400/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* غيرنا max-w-md بـ max-w-3xl باش نستغلو العرض فالحاسوب */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl relative z-10 my-10"
      >
        {/* القسم العلوي: معلومات المستخدم وزر الخروج */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-slate-100 pb-8">
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
            {/* الأفاتار مع نظام Fallback للحرف الأول */}
            <div className="relative inline-block shrink-0">
              {profile.avatar_url && !imgError ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile Avatar"
                  onError={() => setImgError(true)}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md relative z-10 bg-slate-100"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-4xl sm:text-5xl font-black text-white relative z-10">
                  {firstLetter}
                </div>
              )}
              <span className="absolute bottom-1 right-1 bg-emerald-400 w-6 h-6 rounded-full border-4 border-white z-20"></span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">{profile.full_name}</h1>
              <p className="text-slate-500 font-bold text-sm bg-slate-50 px-3 py-1.5 rounded-lg inline-block">{profile.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="shrink-0 flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-black px-6 py-3.5 rounded-2xl transition-colors cursor-pointer active:scale-95 border border-rose-100"
          >
            تسجيل الخروج
          </button>
        </div>

        {/* القسم السفلي: شبكة الصناديق (جنب بعض فالحاسوب وتحت بعض فالهاتف) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mt-12">
          
          {/* نقط XP مع شخصية Mr-RR */}
          <div className="relative bg-gradient-to-r from-amber-100 to-amber-50 p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-sm text-center md:text-right">
            <motion.div 
              animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 left-4 z-10 cursor-pointer"
            >
              <img src={mrRr} alt="Mr RR" className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border-2 border-amber-400 shadow-md bg-white" />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full shadow-sm text-lg">💪</div>
            </motion.div>

            <span className="block text-4xl mb-3">⚡</span>
            <span className="block font-black text-amber-600 text-4xl mb-1">{profile.xp || 0}</span>
            <span className="block font-bold text-amber-700/80 text-sm">إجمالي النقاط (XP)</span>
          </div>

          {/* شريط التقدم مع شخصية Ms-RR */}
          <div className="relative bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-inner text-center md:text-right">
            <motion.div 
              animate={{ y: [0, -6, 0], rotate: [2, -2, 2] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute -top-10 right-4 z-10 cursor-pointer"
            >
              <img src={msRr} alt="Ms RR" className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border-2 border-blue-400 shadow-md bg-white" />
              <div className="absolute -bottom-2 -left-2 bg-white rounded-full shadow-sm text-lg">🚀</div>
            </motion.div>

            <div className="flex justify-between items-center mb-5 mt-2">
              <span className="font-black text-slate-700 text-sm">التقدم فـ الدروس</span>
              <span className="font-black text-blue-600 text-sm bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-md">{progressStats.completed} / {progressStats.total}</span>
            </div>
            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden dir-ltr shadow-inner">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                {/* لمعة صغيرة فشريط التقدم */}
                <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent to-white/30"></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-bold mt-4">كملتي {progressPercentage}% من البرنامج 🌟</p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}