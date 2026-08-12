import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';

export default function Profile() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  // جبدنا progressStats من الـ hook
  const { profile, progressStats, loading, error } = useProfile();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">جاري تحميل البروفايل... ⏳</div>;
  }

  if (error || !profile) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-rose-500">مالقيناش الداتا ❌</div>;
  }

  // حساب النسبة المئوية للتقدم
  const progressPercentage = progressStats.total > 0 
    ? Math.round((progressStats.completed / progressStats.total) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-8 dir-rtl font-sans flex items-center justify-center">
      <div className="w-full max-w-sm bg-white p-8 rounded-[2rem] border-4 border-slate-900 shadow-[0_8px_0_#0F172A] text-center">
        <div className="relative inline-block mb-4">
          <img
            src={profile.avatar_url || 'https://via.placeholder.com/150'}
            alt="Profile Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
          />
          <span className="absolute bottom-1 right-1 bg-emerald-400 w-6 h-6 rounded-full border-4 border-white"></span>
        </div>

        <h1 className="text-2xl font-black text-slate-800 mb-1">{profile.full_name}</h1>
        <p className="text-slate-500 font-bold mb-8 text-sm">{profile.email}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-amber-100 p-4 rounded-2xl border-2 border-amber-300">
            <span className="block text-3xl mb-2">⚡</span>
            <span className="block font-black text-amber-600 text-2xl">{profile.xp || 0}</span>
            <span className="block font-bold text-amber-700 text-xs mt-1">إجمالي النقاط (XP)</span>
          </div>

          <div className="bg-emerald-100 p-4 rounded-2xl border-2 border-emerald-300">
            <span className="block text-3xl mb-2">🔥</span>
            <span className="block font-black text-emerald-600 text-2xl">{profile.streak_days || 0}</span>
            <span className="block font-bold text-emerald-700 text-xs mt-1">أيام متتالية</span>
          </div>
        </div>

        {/* شريط التقدم (Progress Bar) */}
        <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 mb-8 text-right">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-slate-700 text-sm">التقدم فـ الدروس</span>
            <span className="font-black text-indigo-600 text-sm">{progressStats.completed} / {progressStats.total}</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300 dir-ltr">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 font-bold mt-2 text-center">كملتي {progressPercentage}% من البرنامج 🚀</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-black py-4 rounded-xl border-2 border-rose-200 transition-colors"
        >
          تسجيل الخروج 🚪
        </button>
      </div>
    </div>
  );
}