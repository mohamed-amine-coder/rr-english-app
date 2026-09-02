import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { FaBookOpen, FaListUl, FaQuestionCircle, FaPen, FaCode, FaEdit, FaGraduationCap, FaWhatsapp } from 'react-icons/fa';

export default function LessonPDF() {
  const [inputMode, setInputMode] = useState('form');
  const [jsonError, setJsonError] = useState('');

  const [lessonData, setLessonData] = useState({
    title: "AT THE COFFEE SHOP",
    reading: "Sarah loves visiting the local cafe on weekends. She usually sits near the window and orders a hot cappuccino with an almond croissant.\nThe atmosphere is always calm, with soft jazz music playing in the background. Many people come here to read novels or work on their laptops.\nBefore leaving, Sarah chats with the friendly barista named Leo. She pays for her order, leaves a generous tip, and walks to the park nearby.",
    vocabulary: "Order = يطلب, Atmosphere = أجواء, Friendly = ودود, Barista = مُعِد القهوة, Tip = إكرامية (بقشيش), Nearby = قريب",
    questions: "Where does Sarah like to go on weekends?\nWhat does she order with her cappuccino?\nWhat kind of music plays in the cafe?\nWhat is the name of the barista?\nWhere does Sarah go after leaving the cafe?",
    practice: "Yesterday, I went to a quiet cafe (1)........................ my house. The (2)........................ was very relaxing. I decided to (3)........................ a fresh orange juice. The (4)........................ was smiling and very (5)......................... Before I left, I gave him a small (6)........................ for his great service."
  });

  const downloadImage = () => {
    const worksheetElement = document.getElementById('worksheet-paper');
    toPng(worksheetElement, { cacheBust: true, pixelRatio: 3 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${lessonData.title || 'worksheet'}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('Error generating image:', err));
  };

  const handleJsonChange = (e) => {
    try {
      const parsed = JSON.parse(e.target.value);
      setLessonData(parsed);
      setJsonError('');
    } catch (err) {
      setJsonError('خيا، كاين خطأ فكتابة JSON');
    }
  };

  const handleFormChange = (field, value) => {
    setLessonData({ ...lessonData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#E2E8F0] p-4 md:p-6 flex flex-col lg:flex-row gap-6 font-sans" dir="rtl">
      
      {/* Editor Side */}
      <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#0F172A]">1. ادخال البيانات:</h2>
        
        <div className="flex gap-2 bg-gray-200 p-1 rounded-lg">
          <button 
            onClick={() => setInputMode('form')}
            className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-md font-bold transition-all text-sm ${inputMode === 'form' ? 'bg-white shadow text-[#0F172A]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FaEdit /> واجهة الأساتذة
          </button>
          <button 
            onClick={() => setInputMode('json')}
            className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-md font-bold transition-all text-sm ${inputMode === 'json' ? 'bg-white shadow text-[#0F172A]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FaCode /> كود JSON
          </button>
        </div>

        <div className="flex-grow bg-white p-4 rounded-xl shadow-sm border border-gray-200 overflow-auto h-[65vh]">
          {inputMode === 'form' ? (
            <div className="flex flex-col gap-3 text-sm" dir="auto">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Lesson Title</label>
                <input type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-gray-50" value={lessonData.title} onChange={(e) => handleFormChange('title', e.target.value)} />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">1. Reading</label>
                <textarea className="w-full p-2 border rounded min-h-[90px] focus:ring-2 focus:ring-blue-500 bg-gray-50" value={lessonData.reading} onChange={(e) => handleFormChange('reading', e.target.value)} />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">2. Vocabulary (Word = Translation)</label>
                <textarea className="w-full p-2 border rounded min-h-[70px] focus:ring-2 focus:ring-blue-500 bg-gray-50" placeholder="Apple = تفاحة, Car = سيارة" value={lessonData.vocabulary} onChange={(e) => handleFormChange('vocabulary', e.target.value)} />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">3. Questions</label>
                <textarea className="w-full p-2 border rounded min-h-[90px] focus:ring-2 focus:ring-blue-500 bg-gray-50" value={lessonData.questions} onChange={(e) => handleFormChange('questions', e.target.value)} />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">4. Practice</label>
                <textarea className="w-full p-2 border rounded min-h-[90px] focus:ring-2 focus:ring-blue-500 bg-gray-50" value={lessonData.practice} onChange={(e) => handleFormChange('practice', e.target.value)} />
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <textarea
                className="w-full h-full p-3 font-mono text-xs bg-gray-50 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                dir="ltr"
                defaultValue={JSON.stringify(lessonData, null, 2)}
                onChange={handleJsonChange}
              />
              {jsonError && <p className="text-red-500 text-xs mt-2 font-bold">{jsonError}</p>}
            </div>
          )}
        </div>

        <button
          onClick={downloadImage}
          className="bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all flex justify-center items-center gap-2 text-base"
        >
          تحميل كصورة للطباعة (PNG HD)
        </button>
      </div>

      {/* Preview Side (A4 Wide Container) */}
      <div className="flex-1 flex justify-center overflow-x-auto pb-10">
        <div
          id="worksheet-paper"
          className="w-full max-w-[950px] min-h-[1340px] bg-white relative shadow-2xl overflow-hidden rounded-sm flex flex-col justify-between"
          dir="ltr"
        >
          <div>
            {/* Solid Blue Header - Compact & Styled Title */}
            <div className="bg-[#1E40AF] px-8 py-5 flex flex-col gap-4 border-b-[6px] border-[#F59E0B]">
            
            {/* Top Row: Logo, Slogan & Avatar */}
            <div className="flex justify-between items-center">
                
                {/* Logo & Slogan */}
                <div className="flex items-center gap-4">
                <div className="bg-white px-3.5 py-1.5 rounded-xl inline-flex items-center gap-3 shadow-md">
                    <div className="font-black text-xl tracking-tight">
                    <span className="text-[#0F172A]">RR</span> <span className="text-[#2563EB]">ENGLISH</span>
                    </div>
                    <div className="bg-[#EFF6FF] text-[#2563EB] p-1.5 rounded-lg">
                    <FaGraduationCap size={20} />
                    </div>
                </div>
                <p dir="rtl" className="hidden sm:block text-white/90 text-sm font-semibold border-r-2 border-white/30 pr-4">
                    أول منصة مغربية لتعلم الانجليزية بالدارجة
                </p>
                </div>

                {/* Avatar / Mascot */}
                <div className="shrink-0">
                  <img 
                    crossOrigin="anonymous"
                    src="https://images.weserv.nl/?url=img.sanishtech.com/u/adbc593f936de4bffeee696a886c185e.jpg" 
                    alt="Platform Avatar" 
                    className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover bg-white"
                  />
                </div>
            </div>

            {/* Bottom Row: Styled Title Badge & Inputs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                
                {/* Lesson Title with Special Badge Styling */}
                <div className="inline-flex items-center gap-2 bg-[#0F172A] px-4 py-2 rounded-xl border border-amber-400/60 shadow-inner">
                <span className="text-[#F59E0B] font-black text-xs uppercase tracking-wider">Lesson</span>
                <span className="text-white/40 font-light">|</span>
                <h1 className="text-xl md:text-2xl font-black tracking-wide uppercase text-white">
                    {lessonData.title}
                </h1>
                </div>
                
                {/* Minimalist Info Fields */}
                <div className="flex gap-6 self-end sm:self-auto">
                <div className="w-28 flex items-end">
                    <span className="font-semibold mr-2 text-xs uppercase tracking-wider text-blue-200">Name</span>
                    <div className="flex-grow border-b-2 border-blue-300 pb-0.5"></div>
                </div>
                <div className="w-24 flex items-end">
                    <span className="font-semibold mr-2 text-xs uppercase tracking-wider text-blue-200">Date</span>
                    <div className="flex-grow border-b-2 border-blue-300 pb-0.5"></div>
                </div>
                </div>
            </div>

            </div>

            {/* Body Sections (Darker Backgrounds) */}
            <div className="p-8 md:p-10 flex flex-col gap-8 text-gray-900">
              
              {/* 1. Reading */}
              {lessonData.reading && (
                <section className="bg-[#DBEAFE] border-2 border-blue-300 p-6 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2 border-b-2 border-blue-300 pb-2">
                    <FaBookOpen className="text-blue-700 text-2xl" /> 1. READING
                  </h2>
                  <div className="whitespace-pre-wrap text-[1.1rem] leading-relaxed font-medium">
                    {lessonData.reading}
                  </div>
                </section>
              )}

              {/* 2. Vocabulary */}
              {lessonData.vocabulary && (
                <section className="bg-[#D1FAE5] border-2 border-emerald-300 p-6 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2 border-b-2 border-emerald-300 pb-2">
                    <FaListUl className="text-emerald-700 text-2xl" /> 2. NEW WORDS
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {lessonData.vocabulary.split(',').map((pair, index) => {
                      const [word, translation] = pair.split('=');
                      if (!word) return null;
                      return (
                        <div key={index} className="flex justify-between items-center bg-white border-2 border-emerald-200 px-4 py-2.5 rounded-xl shadow-sm">
                          <span className="font-bold text-emerald-900 text-base">
                            {word.trim()}
                          </span>
                          {translation && (
                            <span className="text-base font-bold text-gray-700 bg-emerald-100 px-3 py-1 rounded-md" dir="rtl">
                              {translation.trim()}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* 3. Questions */}
              {lessonData.questions && (
                <section className="bg-[#E0E7FF] border-2 border-indigo-300 p-6 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2 border-b-2 border-indigo-300 pb-2">
                    <FaQuestionCircle className="text-indigo-700 text-2xl" /> 3. QUESTIONS
                  </h2>
                  <div className="flex flex-col gap-4">
                    {lessonData.questions.split('\n').map((q, index) => q.trim() && (
                      <div key={index} className="flex items-end text-base gap-3">
                        <span className="bg-indigo-600 text-white text-sm w-6 h-6 flex justify-center items-center rounded-full font-bold shrink-0 shadow-sm">
                          {index + 1}
                        </span>
                        <span className="font-bold whitespace-nowrap">{q}</span>
                        <div className="flex-grow border-b-[3px] border-dotted border-indigo-400 mb-1"></div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 4. Practice */}
              {lessonData.practice && (
                <section className="bg-[#FEF3C7] border-2 border-amber-300 p-6 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2 border-b-2 border-amber-300 pb-2">
                    <FaPen className="text-amber-700 text-2xl" /> 4. PRACTICE
                  </h2>
                  <div className="whitespace-pre-wrap text-[1.1rem] leading-loose font-medium">
                    {lessonData.practice}
                  </div>
                </section>
              )}

            </div>
          </div>
          
          {/* Marketing Footer */}
            <div className="w-full p-6 flex flex-col md:flex-row justify-between items-center gap-4 px-10 border-t-2 border-gray-200 bg-white mt-8">
            
            {/* WhatsApp Contact */}
            <div className="flex items-center gap-2 text-emerald-700 font-black text-base bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-300 shadow-sm">
                <FaWhatsapp className="text-2xl text-emerald-600" />
                <span dir="ltr">+212 600 000 000</span>
            </div>

            {/* Marketing Banner (CTA) */}
            <div dir="rtl" className="flex items-center gap-2 bg-[#FEF3C7] border border-amber-300 px-5 py-2.5 rounded-2xl shadow-sm text-center">
                <span className="text-xl">💡</span>
                <p className="text-amber-950 font-bold text-sm">
                ما فهمتيش هاد التمارين؟ دخل دابا للمنصة غادي تلقى شرح مفصل بالدارجة: 
                <span className="text-blue-700 font-black underline mr-1.5 inline-block" dir="ltr">rrenglish</span>
                </p>
            </div>

            {/* Platform Tag */}
            {/* <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                RR English ©
            </div> */}

            </div>
        </div>
      </div>
    </div>
  );
}