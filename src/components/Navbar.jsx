import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaHeadphones, FaQuestionCircle, FaGraduationCap, FaUserCircle, FaSignOutAlt, FaBook, FaEdit, FaChevronDown, FaCalendarDay } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const closeMenu = () => setIsOpen(false);
  
  // جمعنا تسجيل الخروج وسدان المينو ففانكشن وحدة
  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm" dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* اللوغو */}
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="bg-blue-50 p-2 rounded-xl">
              <FaGraduationCap className="text-3xl text-blue-600" />
            </div>
            <span className="font-black text-2xl tracking-wide text-gray-900">
              RR <span className="text-blue-600">ENGLISH</span>
            </span>
          </Link>

          {/* قائمة الديسكتوب */}
          <div className="hidden md:flex items-center gap-10 lg:gap-14">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors">
                <FaHome className="text-lg" />
                <span>الرئيسية</span>
              </Link>

            {/* Dropdown المقرر */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors py-2">
                <FaBook className="text-lg" />
                <span>المقرر</span>
                <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
              </button>
              
              {/* محتوى الـ Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                <div className="p-2 flex flex-col gap-1">
                  <Link to="/lessons" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition-colors">
                    <FaBook className="text-sm" />
                    <span>الدروس</span>
                  </Link>
                  <Link to="/worksheets" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition-colors">
                    <FaHeadphones className="text-sm" />
                    <span>التمارين</span>
                  </Link>
                  <Link to="/daily-classes" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition-colors">
                    <FaCalendarDay className="text-sm" />
                    <span>حصص اليوم</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link to="/about" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors">
              <FaQuestionCircle className="text-lg" />
              <span>حول المنصة</span>
            </Link>
            </div>

            <div className="h-8 w-px bg-gray-200 rounded-full"></div>

            {/* معلومات المستخدم / زر تسجيل الدخول */}
            <div>
              {user ? (
                <div className="flex items-center gap-4 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-100">
                  {user.role === 'admin' && (
                    <Link to="/add-lesson" className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors" title="إضافة درس">
                      <FaEdit className="text-lg" />
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link to="/add-worksheet" className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors" title="إضافة تمارين">
                      <FaEdit className="text-lg" />
                    </Link>
                  )}
                  {/* استعملنا px-2 بلاصة pr-2 باش تجي مقادة فالعربية */}
                  <div className="flex flex-col text-right px-2">
                    <span className="text-sm font-extrabold text-gray-800">{user.full_name || 'طالب'}</span>
                    <span className="text-xs text-orange-500 font-bold tracking-wider">{user.xp || 0} XP ⚡</span>
                  </div>
                  <Link to="/profile">
                    <FaUserCircle className="text-4xl text-blue-200 bg-white rounded-full hover:text-blue-400 transition" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    // استعملنا ms-2 بلاصة ml-2
                    className="ms-2 bg-red-50 p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    title="تسجيل الخروج"
                  >
                    <FaSignOutAlt className="text-lg" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition shadow-md flex items-center gap-2">
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>

          {/* زر الموبايل */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition focus:outline-none">
              {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full">
          <div className="px-6 py-4 space-y-3">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition">
              <FaHome className="text-xl" />
              <span>الرئيسية</span>
            </Link>

            {/* قسم المقرر فالموبايل مجمع ومقاد */}
            <div className="bg-slate-50 rounded-2xl p-2 my-2 border border-slate-100">
              <span className="block px-3 py-2 text-xs font-black text-slate-400">المقرر الدراسي</span>
              <Link to="/lessons" onClick={closeMenu} className="flex items-center gap-3 px-3 py-3 rounded-xl font-bold text-gray-600 hover:text-blue-600 hover:bg-white transition">
                <FaBook className="text-xl" />
                <span>الدروس</span>
              </Link>
              <Link to="/worksheets" onClick={closeMenu} className="flex items-center gap-3 px-3 py-3 rounded-xl font-bold text-gray-600 hover:text-blue-600 hover:bg-white transition">
                <FaHeadphones className="text-xl" />
                <span>التمارين</span>
              </Link>
              <Link to="/daily-classes" onClick={closeMenu} className="flex items-center gap-3 px-3 py-3 rounded-xl font-bold text-gray-600 hover:text-blue-600 hover:bg-white transition">
                <FaCalendarDay className="text-xl" />
                <span>حصص اليوم</span>
              </Link>
            </div>

            {user?.role === 'admin' && (
              <Link to="/add-lesson" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-blue-600 bg-blue-50 transition">
                <FaEdit className="text-xl" />
                <span>إضافة درس</span>
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/add-worksheet" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-blue-600 bg-blue-50 transition">
                <FaEdit className="text-xl" />
                <span>إضافة تمارين</span>
              </Link>
            )}

            <Link to="/about" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition">
              <FaQuestionCircle className="text-xl" />
              <span>حول المنصة</span>
            </Link>

            <div className="border-t border-gray-100 my-4 pt-4">
              {user ? (
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Link to="/profile" onClick={closeMenu}>
                      <FaUserCircle className="text-4xl text-blue-200 bg-white rounded-full" />
                    </Link>
                    <div>
                      <div className="font-extrabold text-gray-800">{user.full_name || 'طالب'}</div>
                      <div className="text-sm text-orange-500 font-bold">{user.xp || 0} XP</div>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="bg-red-50 p-3 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition">
                    <FaSignOutAlt className="text-xl" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="w-full flex justify-center bg-blue-600 text-white px-4 py-3 rounded-xl font-bold shadow-md shadow-blue-200"
                >
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;