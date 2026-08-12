import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaGraduationCap, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* القسم العلوي ديال الفوتر فيه 3 ديال الأعمدة */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* العمود 1: معلومات عن الموقع */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaGraduationCap className="text-3xl text-blue-500" />
              <span className="font-bold text-2xl text-white">RR ENGLISH</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              منصتك الأولى لتعلم اللغة الإنجليزية بطريقة بسيطة، تفاعلية، وبالدارجة المغربية. 
              طوّر مهاراتك من الزيرو تال الاحتراف.
            </p>
          </div>

          {/* العمود 2: روابط سريعة */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2 inline-block">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> من نحن
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 3: تواصل معنا ومواقع التواصل */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2 inline-block">تواصل معنا</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400" />
                <span>contact@rrenglish.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-400" />
                <span>+212 600 000 000</span>
              </li>
            </ul>
            
            {/* أيقونات السوشال ميديا */}
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 hover:text-white transition-all">
                <FaInstagram />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-400 hover:text-white transition-all">
                <FaTwitter />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* القسم السفلي: حقوق النشر */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} RR ENGLISH. جميع الحقوق محفوظة.</p>
          <p className="mt-1">مبرمج بحب فـ المغرب 🇲🇦</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;