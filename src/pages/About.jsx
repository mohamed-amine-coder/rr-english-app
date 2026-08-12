import React from 'react';
// يلا كنتي خدام بـ react-icons، هادو هما السميات ديالهم
import { FaLaptopCode, FaTrophy, FaWhatsapp } from 'react-icons/fa';

function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-blue-600 mb-6 tracking-tight">
          طريقة التعلم المزدوج مع RR ENGLISH
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          ماشي غير قراية كلاسيكية وخلاص! طورنا سيستم كيمزج بين الخدمة الراسك والتفاعل الحي مع صحابك باش تطور لونجلي ديالك بطريقة ممتعة.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Step 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center">
          <div className="p-5 bg-blue-50 rounded-2xl text-blue-600 mb-6">
            <FaLaptopCode size={36} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. قرا فالمنصة</h3>
          <p className="text-gray-500 leading-relaxed">
            دخل وقتما بغيتي، تبع الدروس التفاعلية، وطور المهارات الأساسية ديالك بكل مرونة.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center">
          <div className="p-5 bg-amber-50 rounded-2xl text-amber-500 mb-6">
            <FaTrophy size={36} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. جمع النقط وتربح</h3>
          <p className="text-gray-500 leading-relaxed">
            كلما خدمتي كتربح نقط! هاد النقط كيتصرفو لحصص تفاعلية مباشرة (Live) مع الأساتذة ديالنا.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center">
          <div className="p-5 bg-green-50 rounded-2xl text-green-600 mb-6">
            <FaWhatsapp size={36} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. مجموعات الواتساب</h3>
          <p className="text-gray-500 leading-relaxed">
            تطبيقات وتمارين يومية فـ Micro-groups ديال الواتساب (من 5 لـ 8 ديال الناس) باش ميبقاش العكاز.
          </p>
        </div>

      </div>

      {/* Trust Badge / Info */}
      <div className="mt-16 text-center">
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          🚀 السيستم الأسرع باش تطلق لسانك فـ الإنجليزية
        </span>
      </div>
    </div>
  );
}

export default About;