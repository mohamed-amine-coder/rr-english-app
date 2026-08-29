import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaWhatsapp, FaCheck, FaTimes, FaWifi, FaHeadphones, 
  FaComments, FaQuestionCircle, FaChevronDown, FaChevronUp 
} from 'react-icons/fa';

export default function Pricing() {
  const whatsappNumber = '212600000000'; // بدلو برقمك
  const message = encodeURIComponent('السلام عليكم خويا، بغيت ندخل معاكم فـ العرض ديال RR English 🚀');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "واش خاصني ضروري ويفي بجهد باش نقرا؟",
      a: "لا! السيت خفيف بزاف، والحصص ديال المحادثة كاندوزوهم فـ واتساب بلي فوكال والميساجات، مراعاة للناس لي عندهم غير نجمة 6 (*6)."
    },
    {
      q: "أنا زيرو فـ لونجلي، واش غادي نسلك؟",
      a: "هاد البروغرام مصاوب لـ A1 و A2. كلشي كيتشرح بالدارجة بأمثلة د الزنقة والخدمة بلا قواعد معقدة ديال المدرسة."
    },
    {
      q: "كيفاش غانخلص؟",
      a: "عبر تحويل بنكي (CIH, Attijari...) ولا كاش بلوس / وفاش كاش. كتصيفط لينا التوصيل فـ واتساب وكنفعلو ليك الحساب فالبلاصة."
    },
    {
      q: "شحال ديال الوقت خاصني نخصص فـ النهار؟",
      a: "غير 20 حتى لـ 30 دقيقة فاليوم كافية. تقدر تقرا فـ المنصة فوقت فراغك وتجاوب فـ كروب الواتساب وقتما كنتي مسالي."
    },
    {
      q: "واش كاين وقت محدد للحصص ولا نخدم فوقاش ما بغيت؟",
      a: "المنصة مفتوحة ليك 24/24 و 7/7. والتطبيقات فـ واتساب كيكونو مرنين باش توفق بين قرايتك/خدمتك وتعلمك."
    },
    {
      q: "واش كاناخد شي شهادة فـ اللخر؟",
      a: "الهدف الأساسي هو تطلق لسانك وتهضر بصح، ولكن ملي كتسالي مسار A1/A2 وكاع التمارين كتاخد شهادة إتمام المسار من المنصة."
    },
    {
      q: "واش كانبقى فـ الكروب ديما ولا كاين حد زمني؟",
      a: "الاشتراك كيضمن ليك المتابعة الكاملة طيلة مدة الدورة حتى تفوت المستويات المحددة وتثبت القواعد فـ الممارسة اليومية."
    },
    {
      q: "كنحشم نهضر بلونجلي قدام الناس، كيفاش كتعاملو مع هاد المشكل؟",
      a: "الميكرو-كروبات مصاوبين بـ عدد قليل وكلكم فنفس المستوى، والهدف هو نغلطو كاملين ونتعلمو فـ بيئة مريحة بلا حكام ولا إحراج."
    }
  ];
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl font-sans selection:bg-blue-200">
      <div className="max-w-4xl mx-auto">
        
        {/* الهيدر والمقدمة */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-black px-4 py-1.5 rounded-full mb-3">
            من A1 لـ A2 بلا تعقيد
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            تعلّم النكليزية بالصح <span className="text-blue-600">بلا ما تحرق الويفي</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            عارفين الأغلبية معندهمش ويفي 24/24 ولا الوقت للحصص الطويلة فـ Google Meet. طورنا سيستم كيقسم ليك التعلم بين المنصة وتطبيقات يومية فـ الواتساب.
          </p>
        </div>

        {/* مقارنة بين الطريقة القديمة والجديدة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-3xl mx-auto">
          <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-6 text-right">
            <h3 className="font-black text-rose-900 text-lg mb-3 flex items-center gap-2">
              <FaTimes className="text-rose-500" />
              <span>الطريقة الكلاسيكية (لي معقدة)</span>
            </h3>
            <ul className="space-y-2 text-sm text-rose-800/80 font-bold">
              <li>• سوايع ديال الغرامير والحفاظة بلا فايدة</li>
              <li>• فيديوهات مسجلين طوال كيجيبو النعاس</li>
              <li>• كتخلص بزاف ومكتهضرش بلسانك</li>
            </ul>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 text-right">
            <h3 className="font-black text-emerald-900 text-lg mb-3 flex items-center gap-2">
              <FaCheck className="text-emerald-500" />
              <span>طريقة RR ENGLISH (العملية)</span>
            </h3>
            <ul className="space-y-2 text-sm text-emerald-900 font-bold">
              <li>• شرح مبسط بالدارجة من الأساسيات (A1/A2)</li>
              <li>• تمارين تفاعلية وحوارات حية وسط السيت</li>
              <li>• تطبيق ومحادثة يومية فـ الواتساب (صحاب *6)</li>
            </ul>
          </div>
        </div>

        {/* بطاقة العرض الرئيسي */}
        <div className="max-w-xl mx-auto bg-white border-4 border-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-[0_12px_0_#0F172A] relative overflow-hidden mb-12 text-right">
          
          <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-200 text-amber-900 px-4 py-2 rounded-2xl w-fit mb-6">
            <FaWifi className="text-amber-600" />
            <span className="text-xs font-black">مراعاة لصحاب نجمة 6 (*6)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">العرض الشامل: منصة + واتساب</h2>
          <p className="text-slate-500 font-bold text-sm mb-6">كلشي لي غتحتاج باش تفوت A1 و A2 وتطلق لسانك فالحوارات</p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                <FaCheck />
              </div>
              <p className="text-slate-700 font-bold text-sm sm:text-base">
                <strong>المنصة كاملة:</strong> فتح جميع الدروس وسلايدات الشرح والتمارين المدفوعة.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                <FaCheck />
              </div>
              <p className="text-slate-700 font-bold text-sm sm:text-base">
                <strong>تمارين الاستماع (Worksheets):</strong> مواقف حقيقية (طاكسي، قهوة، مطار...) باش تفهم النطق الصحيح.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                <FaCheck />
              </div>
              <p className="text-slate-700 font-bold text-sm sm:text-base">
                <strong>مجموعات الواتساب التطبيقية:</strong> ميكرو-كروبات صغيرة للتحدث بالفوكالات والتصحيح المباشر.
              </p>
            </div>
          </div>

          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-6 rounded-2xl text-lg shadow-sm border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all"
          >
            <FaWhatsapp className="text-2xl" />
            <span>تسجل معنا دابا فـ الواتساب</span>
          </a>

          <p className="text-center text-xs font-bold text-slate-400 mt-4">
            تواصل مباشر مع الأستاذ والتفعيل فنفس الدقيقة 🚀
          </p>
        </div>

        {/* قسم الأسئلة الشائعة */}
        <div className="max-w-xl mx-auto space-y-3">
          <h3 className="text-xl font-black text-slate-900 mb-4 text-center flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-blue-600" />
            <span>أسئلة شائعة</span>
          </h3>

          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-right font-bold text-slate-800 flex justify-between items-center text-sm sm:text-base hover:bg-slate-50"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <FaChevronUp className="text-slate-400 text-xs shrink-0 mr-2" /> : <FaChevronDown className="text-slate-400 text-xs shrink-0 mr-2" />}
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-slate-600 text-sm font-medium leading-relaxed border-t border-slate-100 bg-slate-50">
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