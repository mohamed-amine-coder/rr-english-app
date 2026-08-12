import { Link } from 'react-router-dom';
// جبنا الأيقونات اللي غنحتاجو باش نزوقو المميزات
import { FaRocket, FaGraduationCap, FaBrain, FaMicrophoneAlt } from 'react-icons/fa';
// هادي هي التصويرة اللي عندك ف الدوسي، غنعيطو ليها باش نخدمو بيها
import heroImg from '../assets/mr-rr.png';

function Home() {
  return (
    // هاد div هو الحاضن الرئيسي، درنا gap-20 باش نخليو تيساع مريح بين الأقسام
    <div className="flex flex-col gap-20 pb-20">
      
      {/* =========================================
          1. Hero Section (الواجهة الرئيسية)
      ========================================= */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 mt-10">
        
        {/* النص والأزرار (جهت اليمين) */}
        <div className="flex-1 space-y-6 text-center md:text-right">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            تعلم النڭليزية بـ <span className="text-blue-600">الدارجة المغربية</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            منصة RR ENGLISH غتخليك تهضر وتفهم النڭليزية بلا عقد، بطريقة خفيفة، تفاعلية، ومصاوبة خصيصاً للمغاربة.
          </p>
          
          {/* الأزرار ديال Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link to="/lessons" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
              <FaRocket /> بدا التعلم دابا
            </Link>
            <Link to="/about" className="bg-white border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition text-center">
              اكتشف الطريقة
            </Link>
          </div>
        </div>

        {/* التصويرة (جهت اليسار ف البيسي، والفوق ف التليفون) */}
        <div className="flex-1 w-full max-w-lg">
          <img 
            src={heroImg} 
            alt="RR English Hero" 
            className="w-full aspect-square object-cover rounded-full border-4 border-blue-600 drop-shadow-2xl animate-fade-in-up" 
          />
        </div>
      </section>

      {/* =========================================
          2. Features Section (قسم المميزات)
      ========================================= */}
      <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">علاش تختار RR ENGLISH؟</h2>
          <p className="text-gray-500 mt-3 text-lg">بنينا هاد المنصة باش نحلوا مشاكل التعلم التقليدي</p>
        </div>
        
        {/* قسمناهم لـ 3 ديال الكارطات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* الميزة 1 */}
          <div className="bg-slate-50 p-6 rounded-2xl hover:shadow-md transition duration-300 hover:-translate-y-1">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <FaGraduationCap className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">شرح بالدارجة</h3>
            <p className="text-gray-600 leading-relaxed">
              قواعد النڭليزية مشروحة بأمثلة من الواقع المغربي باش تفهم بالزربة وبلا داك التعقيد الأكاديمي.
            </p>
          </div>

          {/* الميزة 2 */}
          <div className="bg-slate-50 p-6 rounded-2xl hover:shadow-md transition duration-300 hover:-translate-y-1">
            <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <FaMicrophoneAlt className="text-2xl text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">هضر مع الذكاء الاصطناعي</h3>
            <p className="text-gray-600 leading-relaxed">
              درب النطق ديالك وهضر مع بوت ذكي (AI) كيرد عليك، كيصحح ليك الأغلاط، وكيعلمك كيفاش تجاوب ف البلاصة.
            </p>
          </div>

          {/* الميزة 3 */}
          <div className="bg-slate-50 p-6 rounded-2xl hover:shadow-md transition duration-300 hover:-translate-y-1">
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <FaBrain className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">نظام الـ XP التفاعلي</h3>
            <p className="text-gray-600 leading-relaxed">
              انسى الحفاظة! نظام ديال الكويزات والنقط (XP) كيخليك تتعلم بحال يلا كتلعب وتنافس مع راسك.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;