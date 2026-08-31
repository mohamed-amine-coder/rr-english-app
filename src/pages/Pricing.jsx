// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   FaWhatsapp, FaCheck, FaTimes, FaWifi, FaHeadphones, 
//   FaComments, FaQuestionCircle, FaChevronDown, FaChevronUp, FaLock, FaHeart
// } from 'react-icons/fa';

// export default function Pricing() {
//   const whatsappNumber = '212600000000'; // بدلو برقمك
//   const message = encodeURIComponent('السلام عليكم، بغيت نعرف تفاصيل الاشتراك الشهري فـ RR English 🚀');
//   const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

//   const [openFaq, setOpenFaq] = useState(null);

//   const faqs = [
//     {
//       q: "علاش الاشتراك بالفلوس ومشي فابور كامل؟",
//       a: "باش نخلصو السيرفرات والمبرمجين والمصممين ونقدرو نتبعو معاك فـ الواتساب يومياً ونصححو ليك الفوكالات بالتدقيق، هاد الشي كياخد وقت وفريق عمل ساهر على مستواك."
//     },
//     {
//       q: "واش خاصني ضروري ويفي بجهد باش نقرا؟",
//       a: "لا! السيت خفيف بزاف، والحصص والمحادثات فـ واتساب بلي فوكال والميساجات، مراعاة للناس لي خدامين غير بـ نجمة 6 (*6)."
//     },
//     {
//       q: "أنا زيرو فـ لونجلي، واش غادي نسلك؟",
//       a: "البروغرام مصاوب لـ A1 و A2. كلشي مشروح بالدارجة وأمثلة واقعية بلا تعقيدات القواعد والكتب الكلاسيكية."
//     },
//     {
//       q: "كيفاش كيتم الخلاص؟",
//       a: "عبر تحويل بنكي (CIH, Attijari...) ولا كاش بلوس / وفاش كاش. كتصيفط التوصيل فـ واتساب وكنفعلو ليك الحساب فالبلاصة."
//     },
//     {
//       q: "شحال ديال الوقت خاصني نخصص فـ النهار؟",
//       a: "20 حتى لـ 30 دقيقة فاليوم كافية. المنصة مفتوحة 24/7 والتطبيق فـ الواتساب مرن باش توفق بين خدمتك وقرايتك."
//     },
//     {
//       q: "كنحشم نهضر بلونجلي، كيفاش كتعاملو مع هاد المشكل؟",
//       a: "المجموعات مصاوبين بـ عدد قليل وكلكم فنفس المستوى. الهدف هو نغلطو مجموعين ونتعلمو فـ بيئة مريحة بلا حكام ولا إحراج."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl font-sans selection:bg-blue-200">
//       <div className="max-w-4xl mx-auto">
        
//         {/* الهيدر مع الخطاب الصريح */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-4">
//             <FaHeart className="text-red-500 text-xs" />
//             <span>الصراحة راحة بيناتنا</span>
//           </div>
//           <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
//             ما كرهناش نطلقو كلشي <span className="text-blue-600">فابور</span>، ولكن...
//           </h1>
//           <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
//             سواء كملتي الدروس المجانية وبغيتي تكمل، أو جيتي تكتشف الدروس المتقدمة: باش نقدرو نخلصو السيرفرات ونوقفو معاك يومياً بالفوكالات والتصحيح، دايرين <strong className="text-slate-900">اشتراك شهري رمزي</strong> كيخلينا مستمرين وكيضمن ليك خدمة فالمستوى.
//           </p>
//         </div>

//         {/* بطاقة العرض الرئيسي */}
//         <div className="max-w-xl mx-auto bg-white border-4 border-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-[0_12px_0_#0F172A] relative overflow-hidden mb-12 text-right">
          
//           <div className="flex items-center justify-between gap-2 mb-6">
//             <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-200 text-amber-900 px-3.5 py-1.5 rounded-2xl w-fit">
//               <FaWifi className="text-amber-600 text-xs" />
//               <span className="text-xs font-black">مراعاة لصحاب (*6)</span>
//             </div>
//             <div className="flex items-center gap-1.5 bg-blue-50 border-2 border-blue-200 text-blue-900 px-3.5 py-1.5 rounded-2xl w-fit">
//               <FaLock className="text-blue-600 text-xs" />
//               <span className="text-xs font-black">اشتراك شهري شامل</span>
//             </div>
//           </div>

//           <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">الاشتراك الشهري: المنصة + المتابعة</h2>
//           <p className="text-slate-500 font-bold text-sm mb-6">كلشي محلول ليك شهر كامل باش تنتقل من A1 لـ A2 وتطلق لسانك</p>

//           <div className="space-y-4 mb-8">
//             <div className="flex items-start gap-3">
//               <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 text-xs">
//                 <FaCheck />
//               </div>
//               <p className="text-slate-700 font-bold text-sm sm:text-base">
//                 <strong>فتح السيت كامل:</strong> ولوج غير محدود لجميع الدروس والتمارين المغلوقة.
//               </p>
//             </div>

//             <div className="flex items-start gap-3">
//               <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 text-xs">
//                 <FaCheck />
//               </div>
//               <p className="text-slate-700 font-bold text-sm sm:text-base">
//                 <strong>تمارين الاستماع والحوارات:</strong> مواقف يومية حقيقية لضبط النطق وسرعة الفهم.
//               </p>
//             </div>

//             <div className="flex items-start gap-3">
//               <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 text-xs">
//                 <FaCheck />
//               </div>
//               <p className="text-slate-700 font-bold text-sm sm:text-base">
//                 <strong>متابعة يومية فـ الواتساب:</strong> محادثات صوتية وتصحيح مباشر بدون الحاجة لويفي مجهد.
//               </p>
//             </div>
//           </div>

//           <a 
//             href={whatsappUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-6 rounded-2xl text-lg shadow-sm border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all"
//           >
//             <FaWhatsapp className="text-2xl" />
//             <span>عندك شي سؤال؟ مرحبا بيك 😊</span>
//           </a>
//         </div>

//         {/* مقارنة بين الطريقة القديمة والجديدة */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-3xl mx-auto">
//           <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-6 text-right">
//             <h3 className="font-black text-rose-900 text-lg mb-3 flex items-center gap-2">
//               <FaTimes className="text-rose-500" />
//               <span>الطريقة الكلاسيكية (لي معقدة)</span>
//             </h3>
//             <ul className="space-y-2 text-sm text-rose-800/80 font-bold">
//               <li>• سوايع ديال الغرامير والحفاظة بلا فايدة</li>
//               <li>• فيديوهات مسجلين طوال كيجيبو النعاس</li>
//               <li>• كتخلص بزاف ومكتهضرش بلسانك</li>
//             </ul>
//           </div>

//           <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 text-right">
//             <h3 className="font-black text-emerald-900 text-lg mb-3 flex items-center gap-2">
//               <FaCheck className="text-emerald-500" />
//               <span>طريقة RR ENGLISH (العملية)</span>
//             </h3>
//             <ul className="space-y-2 text-sm text-emerald-900 font-bold">
//               <li>• شرح مبسط بالدارجة من الأساسيات (A1/A2)</li>
//               <li>• تمارين تفاعلية وحوارات حية مع صحابك </li>
//               <li>• تطبيق ومحادثة يومية فـ الواتساب (*6)</li>
//             </ul>
//           </div>
//         </div>

//         {/* قسم الأسئلة الشائعة */}
//         <div className="max-w-xl mx-auto space-y-3">
//           <h3 className="text-xl font-black text-slate-900 mb-4 text-center flex items-center justify-center gap-2">
//             <FaQuestionCircle className="text-blue-600" />
//             <span>أسئلة شائعة</span>
//           </h3>

//           {faqs.map((faq, idx) => (
//             <div key={idx} className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden">
//               <button 
//                 onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                 className="w-full p-4 text-right font-bold text-slate-800 flex justify-between items-center text-sm sm:text-base hover:bg-slate-50"
//               >
//                 <span>{faq.q}</span>
//                 {openFaq === idx ? <FaChevronUp className="text-slate-400 text-xs shrink-0 mr-2" /> : <FaChevronDown className="text-slate-400 text-xs shrink-0 mr-2" />}
//               </button>
//               {openFaq === idx && (
//                 <div className="p-4 pt-0 text-slate-600 text-sm font-medium leading-relaxed border-t border-slate-100 bg-slate-50">
//                   {faq.a}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaWhatsapp, FaCheck, FaTimes, FaWifi, 
  FaQuestionCircle, FaChevronDown, FaChevronUp, 
  FaLock, FaHeart, FaCrown, FaVideo, FaRocket, FaUserTie
} from 'react-icons/fa';

export default function Pricing() {
  const whatsappNumber = '212600000000'; // بدلو برقمك

  // دالة لتوليد رابط واتساب حسب الباقة
  const getWhatsappUrl = (planName) => {
    const message = encodeURIComponent(`السلام عليكم، بغيت نشترك فـ ${planName} 🚀`);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "علاش الاشتراك بالفلوس ومشي فابور كامل؟",
      a: "باش نخلصو السيرفرات والمبرمجين والمصممين ونقدرو نتبعو معاك فـ الواتساب يومياً ونصححو ليك الفوكالات بالتدقيق، هاد الشي كياخد وقت وفريق عمل ساهر على مستواك."
    },
    {
      q: "واش خاصني ضروري ويفي بجهد باش نقرا؟",
      a: "لا! السيت خفيف بزاف، والحصص والمحادثات فـ واتساب بلي فوكال والميساجات، مراعاة للناس لي خدامين غير بـ نجمة 6 (*6)."
    },
    {
      q: "أنا زيرو فـ لونجلي، واش غادي نسلك؟",
      a: "البروغرام مصاوب لـ A1 و A2. كلشي مشروح بالدارجة وأمثلة واقعية بلا تعقيدات القواعد والكتب الكلاسيكية."
    },
    {
      q: "كيفاش كيتم الخلاص؟",
      a: "عبر تحويل بنكي (CIH, Attijari...) ولا كاش بلوس / وفاش كاش. كتصيفط التوصيل فـ واتساب وكنفعلو ليك الحساب فالبلاصة."
    },
    {
      q: "شحال ديال الوقت خاصني نخصص فـ النهار؟",
      a: "20 حتى لـ 30 دقيقة فاليوم كافية. المنصة مفتوحة 24/7 والتطبيق فـ الواتساب مرن باش توفق بين خدمتك وقرايتك."
    },
    {
      q: "كنحشم نهضر بلونجلي، كيفاش كتعاملو مع هاد المشكل؟",
      a: "المجموعات مصاوبين بـ عدد قليل وكلكم فنفس المستوى. الهدف هو نغلطو مجموعين ونتعلمو فـ بيئة مريحة بلا حكام ولا إحراج."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl font-sans selection:bg-amber-200 selection:text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* الهيدر التسويقي الصريح */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-5 shadow-sm">
            <FaHeart className="text-red-500 text-xs" />
            <span>الصراحة راحة بيناتنا</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            ما كرهناش نطلقو كلشي <span className="text-blue-600">فابور</span>، ولكن...
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-bold leading-relaxed">
            باش نضمنو ليك سيرفرات سريعة، محتوى بريميوم، وتصحيح يومي ومتابعة شخصية، درنا باقات رمزية كتناسب كل ميزانية باش تاخد نتيجة حقيقية ماشي غير تضيع وقتك.
          </p>
        </div>

        {/* سلم القيمة (Pricing Tiers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-center">
          
          {/* الباقة 1: التعلم الذاتي (Starter) */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all text-right h-fit">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4 border border-blue-100">
              <FaLock />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">التعلم الذاتي</h3>
            <p className="text-slate-500 text-xs font-bold mb-6 h-8">للناس لي باغية تبدا بوحدها وتراجع بشوية عليها.</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">99</span>
              <span className="text-slate-500 font-bold"> درهم / شهر</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm font-bold text-slate-700">
              <li className="flex items-start gap-2"><FaCheck className="text-blue-500 mt-1 shrink-0" /> ولوج لجميع الدروس الأساسية.</li>
              <li className="flex items-start gap-2"><FaCheck className="text-blue-500 mt-1 shrink-0" /> تمارين قواعد ونصوص تطبيقية.</li>
              <li className="flex items-start gap-2"><FaCheck className="text-blue-500 mt-1 shrink-0" /> تحميل ملخصات PDF.</li>
            </ul>
            <a href={getWhatsappUrl("باقة التعلم الذاتي (99 درهم)")} target="_blank" rel="noopener noreferrer" className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-black py-3.5 rounded-xl transition-all">
              اشترك دابا
            </a>
          </div>

          {/* الباقة 2: الماستركلاس (Best Value) - التصميم البريميوم لجلب 80% من المبيعات */}
          <div className="bg-slate-900 border-4 border-amber-500 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_15px_40px_rgba(245,158,11,0.2)] relative text-right transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 text-xs font-black px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
              <FaCrown /> الأكثر اختياراً (وفر 60%)
            </div>
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center text-xl mb-4 border border-amber-500/30">
              <FaVideo />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">الماستركلاس التفاعلي</h3>
            <p className="text-slate-400 text-xs font-bold mb-6 h-8">الحل الشامل باش تطلق لسانك وتطبق فمواقف حقيقية.</p>
            <div className="mb-6">
              <span className="text-5xl font-black text-amber-400">249</span>
              <span className="text-slate-400 font-bold"> درهم / شهر</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm font-bold text-slate-200">
              <li className="flex items-start gap-2"><FaCheck className="text-amber-500 mt-1 shrink-0" /> <span className="text-white">كلشي فالباقة الأساسية +</span></li>
              <li className="flex items-start gap-2"><FaCheck className="text-amber-500 mt-1 shrink-0" /> التمارين الذكية مع التصحيح الآلي الفوري.</li>
              <li className="flex items-start gap-2"><FaCheck className="text-amber-500 mt-1 shrink-0" /> <span className="text-amber-400">حصتين (2) تفاعليتين أسبوعياً</span> مع الأستاذ.</li>
              <li className="flex items-start gap-2"><FaWifi className="text-amber-500 mt-1 shrink-0" /> مجموعة WhatsApp للممارسة (مناسبة لـ *6).</li>
            </ul>
            <a href={getWhatsappUrl("باقة الماستركلاس التفاعلي (249 درهم)")} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:brightness-110 text-slate-900 font-black py-4 rounded-xl transition-all shadow-[0_5px_15px_rgba(245,158,11,0.3)] active:scale-95 text-lg">
              <FaWhatsapp className="text-xl" /> احجز بلاصتك دابا
            </a>
          </div>

          {/* الباقة 3: الكوتشينغ المكثف (VIP) */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all text-right h-fit relative overflow-hidden">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-xl mb-4 border border-rose-100">
              <FaUserTie />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">الـ VIP المكثف</h3>
            <p className="text-slate-500 text-xs font-bold mb-6 h-8">للي زربان وعندو مقابلة عمل أو باغي يهاجر.</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">499</span>
              <span className="text-slate-500 font-bold"> درهم / شهر</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm font-bold text-slate-700">
              <li className="flex items-start gap-2"><FaCheck className="text-rose-500 mt-1 shrink-0" /> جميع ميزات الماستركلاس.</li>
              <li className="flex items-start gap-2"><FaCheck className="text-rose-500 mt-1 shrink-0" /> <span className="text-slate-900">فتح جميع فيديوهات الماستركلاس (HD).</span></li>
              <li className="flex items-start gap-2"><FaCheck className="text-rose-500 mt-1 shrink-0" /> <span className="text-slate-900">4 حصص أسبوعياً</span> (مجموعة مصغرة).</li>
              <li className="flex items-start gap-2"><FaCheck className="text-rose-500 mt-1 shrink-0" /> متابعة صوتية خاصة 1-on-1 يومياً.</li>
              <li className="flex items-start gap-2"><FaCheck className="text-rose-500 mt-1 shrink-0" /> تدريب خاص للـ Interviews والبيزنس.</li>
            </ul>
            <a href={getWhatsappUrl("باقة الـ VIP المكثف (499 درهم)")} target="_blank" rel="noopener noreferrer" className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white font-black py-3.5 rounded-xl transition-all">
              اشترك فـ VIP
            </a>
          </div>

        </div>

        {/* مقارنة بين الطريقة القديمة والجديدة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16 max-w-4xl mx-auto">
          <div className="bg-rose-50 border-2 border-rose-100 rounded-2xl p-6 text-right">
            <h3 className="font-black text-rose-900 text-lg mb-4 flex items-center gap-2">
              <FaTimes className="text-rose-500" />
              <span>السوايع الإضافية (لي معقدة وغالية)</span>
            </h3>
            <ul className="space-y-3 text-sm text-rose-800/80 font-bold">
              <li>• حصص غالية بزاف (أكثر من 800 درهم للشهر)</li>
              <li>• كتركزو غير على الغرامير والحفاظة بلا فايدة</li>
              <li>• كتضيع الوقت فالمواصلات باش تمشي للسنتر</li>
              <li>• كتحشم تهضر قدام 20 واحد فالقسم</li>
            </ul>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 text-right shadow-sm">
            <h3 className="font-black text-emerald-900 text-lg mb-4 flex items-center gap-2">
              <FaRocket className="text-emerald-500" />
              <span>طريقة RR ENGLISH (العملية)</span>
            </h3>
            <ul className="space-y-3 text-sm text-emerald-900 font-bold">
              <li>• اشتراك رمزي (ابتداء من 99 درهم للشهر)</li>
              <li>• تمارين تفاعلية وحوارات حية من دارك وفأي وقت</li>
              <li>• تطبيق ومحادثة يومية فـ الواتساب (مراعاة لـ *6)</li>
              <li>• بيئة آمنة باش تغلط وتتعلم بلا حكام ولا إحراج</li>
            </ul>
          </div>
        </div>

        {/* قسم الأسئلة الشائعة */}
        <div className="max-w-2xl mx-auto space-y-3">
          <h3 className="text-2xl font-black text-slate-900 mb-6 text-center flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-blue-600" />
            <span>أسئلة شائعة</span>
          </h3>

          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-blue-200 transition-colors">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-right font-bold text-slate-800 flex justify-between items-center text-sm sm:text-base hover:bg-slate-50"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <FaChevronUp className="text-blue-500 text-xs shrink-0 mr-3" /> : <FaChevronDown className="text-slate-400 text-xs shrink-0 mr-3" />}
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-slate-600 text-xs sm:text-sm font-medium leading-relaxed border-t border-slate-100 bg-slate-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}