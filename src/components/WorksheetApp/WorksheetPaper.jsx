import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { 
  FaBookOpen, 
  FaListUl, 
  FaQuestionCircle, 
  FaPen, 
  FaGraduationCap, 
  FaWhatsapp, 
  FaDownload,
  FaSpinner 
} from 'react-icons/fa';

export default function WorksheetPaper({ worksheet }) {
  const paperRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  // Fallbacks in case data is not fully loaded
  const readingText = worksheet?.reading || '';
  const vocabularyText = worksheet?.vocabulary || '';
  const questionsList = Array.isArray(worksheet?.questions) ? worksheet.questions : [];
  const practiceList = Array.isArray(worksheet?.practice) ? worksheet.practice : [];

  const downloadImage = async () => {
    if (!paperRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(paperRef.current, { 
        cacheBust: true, 
        pixelRatio: 3, 
        skipFonts: true 
      });
      const link = document.createElement('a');
      link.download = `${worksheet?.title || 'RR_English_Worksheet'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full py-4">
      
      {/* Action Bar */}
      <div className="w-full max-w-[950px] flex justify-between items-center bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm" dir="rtl">
        <div>
          <h3 className="font-black text-slate-800 text-lg">جاهز للتحميل والطباعة</h3>
          <p className="text-xs font-bold text-slate-500 mt-1">تيليشارجي الورقة بجودة عالية باش تخرجها وتخدمها بيدك</p>
        </div>
        <button
          onClick={downloadImage}
          disabled={downloading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 text-sm"
        >
          {downloading ? <FaSpinner className="animate-spin text-base" /> : <FaDownload className="text-base" />}
          <span>{downloading ? 'جاري التحميل...' : 'تحميل الورقة (PNG HD)'}</span>
        </button>
      </div>

      {/* The Paper Component (A4 Wide HD Container) */}
      <div className="w-full overflow-x-auto flex justify-center pb-6">
        <div
          ref={paperRef}
          id="worksheet-paper"
          className="w-full max-w-[950px] min-h-[1340px] bg-white relative shadow-2xl overflow-hidden rounded-sm flex flex-col justify-between"
          dir="ltr"
        >
          <div>
            {/* Header */}
            <div className="bg-[#1E40AF] px-8 py-6 flex flex-col gap-5 border-b-[6px] border-[#F59E0B]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-white px-4 py-2 rounded-xl inline-flex items-center gap-3 shadow-md">
                    <div className="font-black text-xl tracking-tight">
                      <span className="text-[#0F172A]">RR</span> <span className="text-[#2563EB]">ENGLISH</span>
                    </div>
                    <div className="bg-[#EFF6FF] text-[#2563EB] p-2 rounded-lg">
                      <FaGraduationCap size={22} />
                    </div>
                  </div>
                  <p dir="rtl" className="hidden sm:block text-white/90 text-sm font-semibold border-r-2 border-white/30 pr-4">
                    أول منصة مغربية لتعلم الانجليزية بالدارجة
                  </p>
                </div>

                <div className="shrink-0">
                  <img 
                    crossOrigin="anonymous"
                    src="https://images.weserv.nl/?url=img.sanishtech.com/u/adbc593f936de4bffeee696a886c185e.jpg" 
                    alt="Platform Avatar" 
                    className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover bg-white"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="inline-flex items-center gap-2 bg-[#0F172A] px-4 py-2 rounded-xl border border-amber-400/60 shadow-inner">
                  <span className="text-[#F59E0B] font-black text-xs uppercase tracking-wider">Lesson</span>
                  <span className="text-white/40 font-light">|</span>
                  <h1 className="text-2xl font-black tracking-wide uppercase text-white">
                    {worksheet?.title}
                  </h1>
                </div>
                
                <div className="flex gap-8 self-end sm:self-auto">
                  <div className="w-32 flex items-end">
                    <span className="font-semibold mr-3 text-xs uppercase tracking-wider text-blue-200">Name</span>
                    <div className="flex-grow border-b-2 border-blue-300 pb-0.5"></div>
                  </div>
                  <div className="w-28 flex items-end">
                    <span className="font-semibold mr-3 text-xs uppercase tracking-wider text-blue-200">Date</span>
                    <div className="flex-grow border-b-2 border-blue-300 pb-0.5"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 md:p-10 flex flex-col gap-8 text-gray-900">
              
              {/* 1. Reading */}
              {readingText && (
                <section className="bg-[#DBEAFE] border-2 border-blue-300 p-6 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2 border-b-2 border-blue-300 pb-2">
                    <FaBookOpen className="text-blue-700 text-2xl" /> 1. READING
                  </h2>
                  <div className="whitespace-pre-wrap text-[1.1rem] leading-relaxed font-medium">
                    {readingText}
                  </div>
                </section>
              )}

              {/* 2. Vocabulary */}
              {vocabularyText && (
                <section className="bg-[#D1FAE5] border-2 border-emerald-300 p-6 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2 border-b-2 border-emerald-300 pb-2">
                    <FaListUl className="text-emerald-700 text-2xl" /> 2. NEW WORDS
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vocabularyText.split(',').map((pair, index) => {
                      const [word, translation] = pair.split('=');
                      if (!word) return null;
                      return (
                        <div key={index} className="flex justify-between items-center bg-white border-2 border-emerald-200 px-4 py-2.5 rounded-xl shadow-sm">
                          <span className="font-bold text-emerald-900 text-base">
                            {word.trim()}
                          </span>
                          {translation && (
                            <span className="text-base font-bold text-gray-700 bg-emerald-50 px-3 py-1 rounded-md" dir="rtl">
                              {translation.trim()}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* 3. Questions (Comprehension) */}
              {questionsList.length > 0 && (
                <section className="bg-[#E0E7FF] border-2 border-indigo-300 p-6 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-bold text-indigo-900 mb-5 flex items-center gap-2 border-b-2 border-indigo-300 pb-2">
                    <FaQuestionCircle className="text-indigo-700 text-2xl" /> 3. QUESTIONS
                  </h2>
                  <div className="flex flex-col gap-6">
                    {questionsList.map((q, index) => (
                      <div key={index} className="flex items-end text-base gap-3">
                        <span className="bg-indigo-600 text-white text-sm w-7 h-7 flex justify-center items-center rounded-full font-bold shrink-0 shadow-sm">
                          {index + 1}
                        </span>
                        <span className="font-bold whitespace-nowrap">{q.question}</span>
                        <div className="flex-grow border-b-[3px] border-dotted border-indigo-400 mb-1.5 ml-4"></div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 4. Practice (Fill in the blanks) */}
              {practiceList.length > 0 && (
                <section className="bg-[#FEF3C7] border-2 border-amber-300 p-6 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-bold text-amber-900 mb-5 flex items-center gap-2 border-b-2 border-amber-300 pb-2">
                    <FaPen className="text-amber-700 text-2xl" /> 4. PRACTICE (Fill in the blanks)
                  </h2>
                  <div className="flex flex-col gap-5 text-[1.1rem] font-medium text-gray-800 leading-loose">
                    {practiceList.map((p, index) => {
                      // Katbdel "___" ola "____" b ster twil dyal noqat l tba3a
                      const printSentence = p.sentence.replace(/_{2,}/g, '........................');
                      return (
                        <div key={index} className="flex gap-3">
                          <span className="font-black text-amber-700">{index + 1}.</span>
                          <span>{printSentence}</span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="w-full p-6 flex flex-col md:flex-row justify-between items-center gap-4 px-10 border-t-2 border-gray-200 bg-white mt-4">
            <div className="flex items-center gap-2 text-emerald-700 font-black text-base bg-emerald-50 px-5 py-2.5 rounded-xl border border-emerald-300 shadow-sm">
              <FaWhatsapp className="text-2xl text-emerald-600" />
              <span dir="ltr">+212 600 000 000</span>
            </div>
            <div dir="rtl" className="flex items-center gap-3 bg-[#FEF3C7] border border-amber-300 px-6 py-3 rounded-2xl shadow-sm text-center">
              <span className="text-2xl">💡</span>
              <p className="text-amber-950 font-bold text-sm">
                ما فهمتيش هاد التمارين؟ دخل دابا للمنصة غادي تلقى شرح مفصل بالدارجة: 
                <span className="text-blue-700 font-black underline mr-2 inline-block" dir="ltr">rrenglish.ma</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}