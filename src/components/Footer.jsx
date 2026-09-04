import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaGraduationCap, FaEnvelope, FaPhoneAlt, FaHeart } from 'react-icons/fa';

// استيراد الشخصيات
import mrRr from '../assets/mr-rr.png';
import msRr from '../assets/ms-rr.png';

function Footer() {
  return (
    <footer className="bg-white border-t-2 border-slate-100 mt-auto relative overflow-hidden" dir="rtl">
      {/* إضاءات خلفية خفيفة */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          
          {/* العمود 1: معلومات عن الموقع والشخصيات */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5 w-fit cursor-pointer">
              <div className="bg-blue-50 p-2 rounded-xl">
                <FaGraduationCap className="text-2xl text-blue-600" />
              </div>
              <span className="font-black text-2xl tracking-wide text-slate-900">
                RR <span className="text-blue-600">ENGLISH</span>
              </span>
            </Link>
            <p className="text-slate-500 font-bold text-sm leading-relaxed mb-6">
              منصتك التفاعلية الأولى لتعلم الإنجليزية بالدارجة المغربية. 
              قرا بوحدك، جمع النقط، وطلق لسانك فحصص مباشرة بكل ثقة.
            </p>
            {/* الشخصيات */}
            <div className="flex items-center -space-x-3 rtl:space-x-reverse">
              <img src={mrRr} alt="Mr RR" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover bg-amber-50 z-10" />
              <img src={msRr} alt="Ms RR" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover bg-blue-50 z-20" />
              <span className="text-xs font-black text-slate-400 mr-3">معاك خطوة بخطوة 🚀</span>
            </div>
          </div>

          {/* العمود 2: روابط سريعة */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-5 border-b-2 border-blue-100 pb-2 inline-block">روابط سريعة</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-slate-500 font-bold hover:text-blue-600 transition-colors flex items-center gap-2 w-fit cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/lessons" className="text-slate-500 font-bold hover:text-blue-600 transition-colors flex items-center gap-2 w-fit cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> البرنامج الدراسي
                </Link>
              </li>
              <li>
                <Link to="/worksheets" className="text-slate-500 font-bold hover:text-blue-600 transition-colors flex items-center gap-2 w-fit cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> التمارين والملخصات
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-500 font-bold hover:text-blue-600 transition-colors flex items-center gap-2 w-fit cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> كيفاش كنقريو؟
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 3: تواصل معنا ومواقع التواصل */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-5 border-b-2 border-amber-100 pb-2 inline-block">تواصل معنا</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-3 text-slate-500 font-bold">
                <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg text-slate-600"><FaEnvelope /></div>
                <span dir="ltr">contact@rrenglish.com</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500 font-bold">
                <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg text-slate-600"><FaPhoneAlt /></div>
                <span dir="ltr">+212 600 000 000</span>
              </li>
            </ul>
            
            {/* أيقونات السوشال ميديا */}
            <div className="flex gap-3">
              <a href="#" className="bg-white border border-slate-200 text-slate-500 p-3 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-all cursor-pointer active:scale-95">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-white border border-slate-200 text-slate-500 p-3 rounded-xl hover:bg-pink-600 hover:text-white hover:border-pink-600 shadow-sm transition-all cursor-pointer active:scale-95">
                <FaInstagram />
              </a>
              <a href="#" className="bg-white border border-slate-200 text-slate-500 p-3 rounded-xl hover:bg-blue-400 hover:text-white hover:border-blue-400 shadow-sm transition-all cursor-pointer active:scale-95">
                <FaTwitter />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* القسم السفلي: حقوق النشر */}
      <div className="border-t border-slate-100 bg-slate-50/80">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-center text-xs font-bold text-slate-500">
          <p>© {new Date().getFullYear()} RR ENGLISH. جميع الحقوق محفوظة.</p>
          <p className="flex items-center justify-center gap-1.5">
            صُنع بحب <FaHeart className="text-rose-500 text-sm" /> فـ المغرب 🇲🇦
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;