import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FaTimes, FaDownload, FaBookOpen, FaListUl, 
  FaQuestionCircle, FaPen, FaComments, FaGraduationCap, 
  FaWhatsapp, FaLanguage, FaHome, FaLink 
} from 'react-icons/fa';
import { toPng } from 'html-to-image';

export default function PdfViewerModal({ worksheet, onClose }) {
  const { user } = useAuth();
  const isAuthorizedToDownload = worksheet.is_free || user?.role === 'admin' || user?.plan === 'Premium';
  const pages = worksheet.content || [];
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAllPages = async () => {
    setIsDownloading(true);
    for (let i = 0; i < pages.length; i++) {
      // كنجبدو الكونتينر المخفي لي محتفظ بعبار A4 للتحميل باش الجودة تبقى طوب
      const pageElement = document.getElementById(`student-page-${pages[i].id}`);
      if (pageElement) {
        try {
          const dataUrl = await toPng(pageElement, { cacheBust: true, pixelRatio: 2 });
          const link = document.createElement('a');
          const title = worksheet.title || 'Lesson';
          link.download = `${title}_Page_${i + 1}.png`;
          link.href = dataUrl;
          link.click();
          await new Promise(res => setTimeout(res, 500)); 
        } catch (err) {
          console.error(`Error generating image for page ${i+1}:`, err);
        }
      }
    }
    setIsDownloading(false);
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case 'header':
        return (
          <div className="bg-blue-600 px-5 sm:px-8 py-5 flex flex-col gap-4 border-b-[6px] border-yellow-400 shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-white px-3.5 py-1.5 rounded-xl inline-flex items-center gap-3 shadow-md border-b-4 border-gray-200">
                  <div className="font-black text-xl tracking-tight"><span className="text-gray-900">RR</span> <span className="text-blue-600">ENGLISH</span></div>
                  <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg"><FaGraduationCap size={20} /></div>
                </div>
                <p dir="rtl" className="hidden sm:block text-white text-sm font-bold border-r-2 border-blue-300 pr-4">أول منصة مغربية لتعلم الانجليزية بالدارجة</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-xl border border-yellow-400 shadow-inner w-fit mt-2">
              <span className="text-yellow-400 font-black text-xs uppercase tracking-wider">Lesson</span>
              <span className="text-gray-600 font-light mx-2">|</span>
              <h1 className="text-lg sm:text-2xl font-black tracking-wide uppercase text-white">{block.content.title}</h1>
            </div>
          </div>
        );
      case 'reading':
        return (
          <section className="mx-4 sm:mx-8 mt-6 bg-blue-100 rounded-2xl p-5 sm:p-6 border-[3px] border-blue-400 shadow-sm">
            <div className="flex items-center gap-3 mb-4 border-b-[3px] border-blue-300 pb-2">
              <FaBookOpen className="text-blue-600 text-xl sm:text-2xl" />
              <h2 className="text-lg sm:text-xl font-black text-blue-800 uppercase">Reading Context</h2>
            </div>
            <div className="whitespace-pre-wrap text-base sm:text-[1.1rem] leading-relaxed font-bold text-gray-800">{block.content.text}</div>
          </section>
        );
      case 'roleplay':
        return (
          <section className="mx-4 sm:mx-8 mt-6 bg-cyan-100 rounded-2xl p-5 sm:p-6 border-[3px] border-cyan-400 shadow-sm">
            <div className="flex items-center gap-3 mb-5 border-b-[3px] border-cyan-300 pb-2">
              <FaComments className="text-cyan-600 text-xl sm:text-2xl" />
              <h2 className="text-lg sm:text-xl font-black text-cyan-800 uppercase">Speaking Practice</h2>
            </div>
            <div className="flex flex-col gap-4">
              {block.content.text?.split('\n').map((line, idx) => {
                if (!line.includes(':')) return <p key={idx} className="text-gray-600 font-bold">{line}</p>;
                const [speaker, ...dialogue] = line.split(':');
                const isFirstSpeaker = idx % 2 === 0;
                return (
                  <div key={idx} className={`flex flex-col ${isFirstSpeaker ? 'items-start' : 'items-end'}`}>
                    <span className="text-xs font-black text-cyan-800 mb-1 px-1">{speaker.trim()}</span>
                    <div className={`px-4 py-2.5 rounded-2xl max-w-[90%] sm:max-w-[80%] text-sm sm:text-[1.05rem] font-bold border-2 ${isFirstSpeaker ? 'bg-white text-gray-800 border-gray-200 rounded-tl-sm' : 'bg-cyan-600 text-white border-cyan-700 rounded-tr-sm'}`}>
                      {dialogue.join(':').trim()}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      case 'darija':
        return (
          <section className="mx-4 sm:mx-8 mt-6 bg-pink-100 rounded-2xl p-5 border-[3px] border-pink-400 shadow-sm" dir="rtl">
            <div className="flex items-start gap-3">
              <FaLanguage className="text-pink-600 text-xl sm:text-2xl mt-1 shrink-0" />
              <div className="whitespace-pre-wrap text-base sm:text-[1.05rem] leading-relaxed font-black text-gray-800">{block.content.text}</div>
            </div>
          </section>
        );
      case 'matching':
        const items = block.content.items || [];
        return (
          <section className="mx-4 sm:mx-8 mt-6 bg-purple-100 rounded-2xl p-5 sm:p-6 border-[3px] border-purple-400 shadow-sm">
            <div className="flex items-center gap-3 mb-5 border-b-[3px] border-purple-300 pb-2">
              <FaLink className="text-purple-600 text-xl sm:text-2xl" />
              <h2 className="text-lg sm:text-xl font-black text-purple-800 uppercase">Match the Words</h2>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-10">
              <ul className="flex-1 flex flex-col gap-3">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-white border-2 border-purple-300 p-3 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="bg-purple-600 text-white font-black w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg text-sm">{idx + 1}</span>
                      <span className="font-black text-gray-800 text-base sm:text-lg">{item.left}</span>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-dashed border-gray-400 rounded-md bg-gray-50"></div>
                  </li>
                ))}
              </ul>
              <ul className="flex-1 flex flex-col gap-3">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-white border-2 border-purple-300 p-3 rounded-xl shadow-sm">
                    <span className="bg-purple-200 text-purple-800 font-black w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg text-sm">{String.fromCharCode(65 + idx)}</span>
                    <span className="font-black text-gray-800 text-base sm:text-lg" dir="rtl">{item.right}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      case 'homework':
        return (
          <section className="mx-4 sm:mx-8 mt-6 bg-rose-100 rounded-2xl p-5 sm:p-6 border-[3px] border-rose-400 shadow-sm">
            <div className="flex items-center gap-3 mb-4 border-b-[3px] border-rose-300 pb-2">
              <FaHome className="text-rose-600 text-xl sm:text-2xl" />
              <h2 className="text-lg sm:text-xl font-black text-rose-800 uppercase">Homework</h2>
            </div>
            <div className="whitespace-pre-wrap text-base sm:text-[1.1rem] leading-relaxed font-bold text-gray-800 bg-white/50 p-4 rounded-xl border border-rose-300">
              {block.content.text}
            </div>
          </section>
        );
      case 'vocabulary':
        return (
          <section className="mx-4 sm:mx-8 mt-6 bg-emerald-100 rounded-2xl p-5 sm:p-6 border-[3px] border-emerald-400 shadow-sm">
            <div className="flex items-center gap-3 mb-5 border-b-[3px] border-emerald-300 pb-2">
              <FaListUl className="text-emerald-600 text-xl sm:text-2xl" />
              <h2 className="text-lg sm:text-xl font-black text-emerald-800 uppercase">New Words</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {block.content.text?.split(',').map((pair, idx) => {
                const [word, trans] = pair.split('=');
                if (!word) return null;
                return (
                  <div key={idx} className="flex justify-between items-center bg-white border-2 border-emerald-300 px-4 py-2.5 rounded-xl shadow-sm">
                    <span className="font-black text-emerald-900 text-base sm:text-[1.05rem]">{word.trim()}</span>
                    {trans && <span className="text-sm sm:text-[1rem] font-bold text-gray-800 bg-emerald-50 px-2 py-1 rounded" dir="rtl">{trans.trim()}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        );
      case 'image':
        const imgSrc = block.content.fileUrl || block.content.url;
        if (!imgSrc) return null;
        return (
          <div className="mx-4 sm:mx-8 mt-6 flex justify-center">
            <img src={imgSrc} alt="Illustration" className="max-w-full max-h-[350px] object-cover rounded-2xl border-[4px] border-white shadow-md" />
          </div>
        );
      case 'questions':
      case 'practice':
        const isPractice = block.type === 'practice';
        return (
          <section className={`mx-4 sm:mx-8 mt-6 rounded-2xl p-5 sm:p-6 border-[3px] shadow-sm ${isPractice ? 'bg-amber-100 border-amber-400' : 'bg-indigo-100 border-indigo-400'}`}>
            <div className={`flex items-center gap-3 mb-4 border-b-[3px] pb-2 ${isPractice ? 'border-amber-300' : 'border-indigo-300'}`}>
              {isPractice ? <FaPen className="text-amber-600 text-xl sm:text-2xl" /> : <FaQuestionCircle className="text-indigo-600 text-xl sm:text-2xl" />}
              <h2 className={`text-lg sm:text-xl font-black uppercase ${isPractice ? 'text-amber-800' : 'text-indigo-800'}`}>{isPractice ? 'Practice' : 'Questions'}</h2>
            </div>
            <div className="whitespace-pre-wrap text-base sm:text-[1.1rem] leading-loose font-bold text-gray-800">
              {block.content.text}
            </div>
          </section>
        );
      case 'footer':
        return (
          <div className="w-full mt-auto pt-8 pb-6 px-4 sm:px-10">
            <div className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-2 border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 text-emerald-700 font-black bg-emerald-50 px-4 py-2 rounded-xl border-2 border-emerald-300">
                <FaWhatsapp className="text-xl sm:text-2xl text-emerald-500" /><span dir="ltr" className="tracking-wide text-sm sm:text-base">+212 600 000 000</span>
              </div>
              <div dir="rtl" className="flex items-center gap-2 bg-amber-100 border-2 border-amber-400 px-4 py-2 rounded-xl shadow-sm w-full sm:w-auto justify-center">
                <span className="text-amber-900 font-black text-xs sm:text-sm">شرح بالدارجة فـ: <span className="text-blue-700 mx-1" dir="ltr">rrenglish.com</span></span>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-slate-900/95 backdrop-blur-sm dir-rtl">
      
      {/* Container الرئيسي كياخد مساحة كبيرة باش يهز المعرض */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full h-full sm:h-[95vh] max-w-7xl bg-[#E2E8F0] sm:rounded-3xl overflow-hidden flex flex-col relative shadow-2xl sm:border-2 sm:border-slate-700"
      >
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-5 bg-white border-b border-slate-200 shrink-0 z-20 shadow-sm">
          <div>
            <h2 className="font-black text-slate-800 text-lg md:text-xl">{worksheet.title}</h2>
            <p className="text-xs font-bold text-slate-500 mt-1">نظرة عامة على الملف ({pages.length} صفحات)</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full hover:bg-rose-100 hover:text-rose-600 transition-colors text-lg">
            <FaTimes />
          </button>
        </div>

        {/* عارض الصفحات فـ Grid (مصغرين بلا سكرول داخلي) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100/80">
          {/* هاد الـ Grid كيخلي 1 فالتليفون، 2 فالطابليت، و 3 فالبيسي */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto justify-items-center">
            {pages.map((page, idx) => (
              <div 
                key={page.id} 
                // 280x396 هو العبار المثالي ديال A4 مصغرة
                className="w-[280px] h-[396px] bg-white shadow-xl border border-gray-200 relative rounded-2xl overflow-hidden shrink-0"
              >
                {/* رقم الصفحة */}
                <div className="absolute top-3 right-3 bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-black shadow-md z-20 opacity-90">
                  {idx + 1}
                </div>
                
                {/* الكونتينر الداخلي لي فيه التصغير بالـ Scale */}
                {/* pointer-events-none باش الطالب ميقدرش يبرك لداخل أو يسيليكسيوني التيكست وهو غير كيشوف Preview */}
                <div 
                  className="w-[794px] h-[1123px] origin-top-left absolute top-0 left-0 pointer-events-none" 
                  style={{ transform: 'scale(0.3526)' }} 
                  dir="ltr"
                >
                  <div className="flex flex-col h-full pb-8">
                    {page.blocks.map(block => <React.Fragment key={block.id}>{renderBlock(block)}</React.Fragment>)}
                  </div>
                </div>

                {/* طبقة شفافة باش يبان كأنه صورة */}
                <div className="absolute inset-0 bg-blue-900/0 hover:bg-blue-900/5 transition-colors z-10 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* الفوتر / زر التحميل */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex justify-between items-center shrink-0 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <span className="font-bold text-sm text-slate-500 hidden sm:block">قم بتحميل الملف للحصول على الجودة العالية (PNG)</span>
          
          <button
            onClick={isAuthorizedToDownload ? downloadAllPages : undefined}
            disabled={isDownloading || !isAuthorizedToDownload}
            className={`flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-3.5 rounded-xl font-black text-sm transition-all ${
                isAuthorizedToDownload 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <FaDownload className="text-lg" />
            {isDownloading 
                ? 'جاري التحميل...' 
                : isAuthorizedToDownload 
                ? 'تحميل الملخص كامل' 
                : 'هذا الملخص حصري للمشتركين'}
            </button>
        </div>

        {/* Container مخفي بالعبار الأصلي (A4) للتحميل بجودة عالية بلا ما يتأثر بالـ Scale */}
        <div className="fixed top-[200vh] left-[200vw] opacity-0 pointer-events-none">
           {pages.map((page) => (
             <div key={page.id} id={`student-page-${page.id}`} className="w-[794px] min-h-[1123px] bg-white flex flex-col font-sans" dir="ltr">
                <div className="flex flex-col flex-grow pb-8">
                  {page.blocks.map(block => <React.Fragment key={block.id}>{renderBlock(block)}</React.Fragment>)}
                </div>
             </div>
           ))}
        </div>

      </motion.div>
    </div>
  );
}