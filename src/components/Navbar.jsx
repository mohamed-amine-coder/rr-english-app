import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBars, FaTimes, FaHome, FaQuestionCircle, FaGraduationCap, 
  FaUserCircle, FaSignOutAlt, FaBook, FaEdit, FaChevronDown, 
  FaCalendarDay, FaBolt, FaPenNib
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// استيراد الشخصيات
import mrRr from '../assets/mr-rr.png';
import msRr from '../assets/ms-rr.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false); // حالة الصورة
  const { user, logout } = useAuth();
  
  const closeMenu = () => setIsOpen(false);
  
  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* اللوغو */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group" onClick={closeMenu}>
            <div className="bg-blue-50 p-2.5 rounded-2xl group-hover:bg-blue-100 transition-colors">
              <FaGraduationCap className="text-2xl sm:text-3xl text-blue-600" />
            </div>
            <span className="font-black text-xl sm:text-2xl tracking-wide text-slate-900">
              RR <span className="text-blue-600">ENGLISH</span>
            </span>
          </Link>

          {/* قائمة الديسكتوب */}
          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-colors cursor-pointer">
                <FaHome className="text-lg" />
                <span>الرئيسية</span>
              </Link>

              {/* Dropdown المقرر */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-colors py-2 cursor-pointer">
                  <FaBook className="text-lg" />
                  <span>المقرر</span>
                  <FaChevronDown className="text-[10px] transition-transform duration-300 group-hover:rotate-180 mt-1" />
                </button>
                
                {/* محتوى الـ Dropdown */}
                <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                  <div className="p-3 flex flex-col gap-1.5 relative overflow-hidden">
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-50 rounded-full blur-xl -z-10"></div>
                    
                    <Link to="/lessons" className="flex items-center gap-3 px-3 py-3 text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-xl font-bold transition-all cursor-pointer">
                      <div className="bg-white shadow-sm p-1.5 rounded-lg text-blue-500"><FaBook className="text-sm" /></div>
                      <span>الدروس التفاعلية</span>
                    </Link>
                    <Link to="/worksheets" className="flex items-center gap-3 px-3 py-3 text-slate-700 hover:text-amber-700 hover:bg-amber-50 rounded-xl font-bold transition-all cursor-pointer">
                      <div className="bg-white shadow-sm p-1.5 rounded-lg text-amber-500"><FaPenNib className="text-sm" /></div>
                      <span>التمارين</span>
                    </Link>
                  </div>
                </div>
              </div>

              <Link to="/about" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-colors cursor-pointer">
                <FaQuestionCircle className="text-lg" />
                <span>حول المنصة</span>
              </Link>
            </div>

            <div className="h-8 w-px bg-slate-200 rounded-full"></div>

            {/* معلومات المستخدم / الأزرار */}
            <div>
              {user ? (
                <div className="flex items-center gap-3 bg-slate-50 py-1.5 pr-4 pl-1.5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-blue-200">
                  
                  {/* أزرار الأدمن */}
                  {user.role === 'admin' && (
                    <div className="flex gap-1.5 ml-2 border-l border-slate-200 pl-3">
                      <Link to="/add-lesson" className="bg-white text-blue-600 p-2 rounded-xl hover:bg-blue-100 shadow-sm transition-colors cursor-pointer" title="إضافة درس">
                        <FaEdit className="text-sm" />
                      </Link>
                      <Link to="/add-worksheet" className="bg-white text-amber-600 p-2 rounded-xl hover:bg-amber-100 shadow-sm transition-colors cursor-pointer" title="إضافة تمارين">
                        <FaEdit className="text-sm" />
                      </Link>
                    </div>
                  )}
                  
                  {/* بيانات الطالب + زر البروفايل */}
                  <Link to="/profile" className="flex items-center gap-3 cursor-pointer group hover:bg-white p-1 rounded-xl transition-colors">
                    <div className="flex flex-col text-right">
                      <span className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors">{user.full_name || 'طالب'}</span>
                      <span className="text-xs text-amber-500 font-black tracking-wider flex items-center gap-1 justify-end">
                        <FaBolt className="text-[10px]" /> {user.xp || 0} XP
                      </span>
                    </div>
                    <div className="relative">
                      {user.avatar_url && !imgError ? (
                        <img 
                          src={user.avatar_url} 
                          alt="avatar" 
                          onError={() => setImgError(true)}
                          className="w-10 h-10 rounded-xl object-cover border-2 border-slate-200 shadow-sm group-hover:border-blue-400 group-hover:scale-105 transition-all" 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl border-2 border-slate-200 shadow-sm bg-slate-100 flex items-center justify-center text-slate-400 group-hover:border-blue-400 group-hover:text-blue-500 group-hover:scale-105 transition-all">
                          <FaUserCircle className="text-2xl" />
                        </div>
                      )}
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full z-10"></span>
                    </div>
                  </Link>

                  {/* زر الخروج */}
                  <button
                    onClick={handleLogout}
                    className="mr-2 bg-white p-2.5 rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white shadow-sm border border-slate-100 transition-all cursor-pointer active:scale-95"
                    title="تسجيل الخروج"
                  >
                    <FaSignOutAlt className="text-sm" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black hover:bg-slate-800 transition-all shadow-[0_5px_15px_rgba(15,23,42,0.2)] active:scale-95 flex items-center gap-2 cursor-pointer">
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>

          {/* زر الموبايل */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-800 bg-slate-50 p-2.5 rounded-xl hover:bg-slate-100 border border-slate-200 transition-all focus:outline-none cursor-pointer active:scale-95"
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الموبايل (Mobile Menu) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] absolute w-full overflow-hidden"
          >
            <div className="px-5 py-6 space-y-4">
              
              <Link to="/" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
                <FaHome className="text-xl text-slate-400" />
                <span>الرئيسية</span>
              </Link>

              {/* قسم المقرر فالموبايل */}
              <div className="bg-slate-50 rounded-3xl p-3 border border-slate-100 shadow-inner">
                <span className="block px-3 py-2 text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">المقرر الدراسي</span>
                <Link to="/lessons" onClick={closeMenu} className="flex items-center gap-3 px-3 py-3 rounded-2xl font-bold text-slate-700 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                  <FaBook className="text-lg text-blue-500" />
                  <span>الدروس التفاعلية</span>
                </Link>
                <Link to="/worksheets" onClick={closeMenu} className="flex items-center gap-3 px-3 py-3 rounded-2xl font-bold text-slate-700 hover:text-amber-600 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                  <FaPenNib className="text-lg text-amber-500" />
                  <span>التمارين</span>
                </Link>
              </div>

              {/* أزرار الأدمن فالموبايل */}
              {user?.role === 'admin' && (
                <div className="flex gap-3">
                  <Link to="/add-lesson" onClick={closeMenu} className="flex-1 flex justify-center items-center gap-2 p-3 rounded-2xl font-bold text-blue-700 bg-blue-100 transition-all cursor-pointer text-sm">
                    <FaEdit /> درس جديد
                  </Link>
                  <Link to="/add-worksheet" onClick={closeMenu} className="flex-1 flex justify-center items-center gap-2 p-3 rounded-2xl font-bold text-amber-700 bg-amber-100 transition-all cursor-pointer text-sm">
                    <FaEdit /> تمرين جديد
                  </Link>
                </div>
              )}

              <Link to="/about" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
                <FaQuestionCircle className="text-xl text-slate-400" />
                <span>حول المنصة</span>
              </Link>

              {/* قسم اليوزر أو تسجيل الدخول */}
              <div className="border-t border-slate-100 mt-6 pt-6">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm">
                      <Link to="/profile" onClick={closeMenu} className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-2 rounded-xl transition-colors">
                        <div className="relative">
                          {user.avatar_url && !imgError ? (
                            <img 
                              src={user.avatar_url} 
                              alt="avatar" 
                              onError={() => setImgError(true)}
                              className="w-12 h-12 rounded-xl object-cover border-2 border-slate-100 group-hover:border-blue-400 transition-colors" 
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl border-2 border-slate-100 bg-slate-50 flex items-center justify-center text-slate-400 group-hover:border-blue-400 group-hover:text-blue-500 transition-colors">
                              <FaUserCircle className="text-3xl" />
                            </div>
                          )}
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full z-10"></span>
                        </div>
                        <div>
                          <div className="font-black text-slate-800 group-hover:text-blue-600 transition-colors">{user.full_name || 'طالب'}</div>
                          <div className="text-sm text-amber-500 font-black flex items-center gap-1"><FaBolt className="text-[10px]"/> {user.xp || 0} XP</div>
                        </div>
                      </Link>
                      <button onClick={handleLogout} className="bg-rose-50 p-3.5 rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer active:scale-95">
                        <FaSignOutAlt className="text-lg" />
                      </button>
                    </div>
                    
                    {/* ترحيب من الشخصيات فالموبايل */}
                    <div className="flex items-center justify-center gap-3 text-slate-400 text-xs font-bold pt-2">
                      <img src={mrRr} alt="Mr" className="w-8 h-8 rounded-full border border-slate-200 bg-amber-50" />
                      <span>مستعد تكمل التعلم ديالك؟ 🚀</span>
                      <img src={msRr} alt="Ms" className="w-8 h-8 rounded-full border border-slate-200 bg-blue-50" />
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="w-full flex justify-center items-center bg-slate-900 text-white px-4 py-4 rounded-2xl font-black shadow-md active:scale-95 transition-all cursor-pointer text-lg"
                  >
                    تسجيل الدخول
                  </Link>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;