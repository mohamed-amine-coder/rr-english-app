import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { FaUpload, FaDownload, FaDesktop, FaMobileAlt } from 'react-icons/fa';

export default function AdMockupMaker() {
  const exportRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const [headline, setHeadline] = useState('طريقة جديدة باش تعلم الإنجليزية بالدارجة 🇲🇦');
  const [device, setDevice] = useState('mac'); 
  const [bgTheme, setBgTheme] = useState('blue'); 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImageSrc(URL.createObjectURL(file));
  };

  const handleDownload = async () => {
    if (!exportRef.current || !imageSrc) {
      alert("حط التصويرة هي اللولة!");
      return;
    }
    setIsExporting(true);
    try {
      // pixelRatio: 2 كتعطينا جودة عالية 4K
      const dataUrl = await toPng(exportRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `RR-Ad-Pro-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert('وقع مشكل فالتصدير!');
    }
    setIsExporting(false);
  };

  const themes = {
    blue: 'from-blue-600 to-indigo-900',
    dark: 'from-slate-900 to-slate-950',
    purple: 'from-purple-600 to-indigo-900'
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 dir-rtl font-sans text-slate-800 flex flex-col lg:flex-row gap-8 overflow-hidden">
      
      {/* 1. لوحة التحكم */}
      <div className="w-full lg:w-[350px] bg-white p-6 rounded-3xl shadow-sm border border-slate-200 shrink-0 h-fit z-20">
        <h2 className="text-xl font-black text-slate-900 mb-6">صانع الإعلانات السريع ⚡</h2>

        <div className="space-y-5">
          {/* رفع الصورة (زدت htmlFor باش يخدم الكليك مزيان) */}
          <label htmlFor="ad-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl cursor-pointer bg-slate-50 transition-all">
            <FaUpload className="text-2xl text-slate-400 mb-2" />
            <span className="text-sm font-bold text-slate-600">كليكي وحط السكرين شوت هنا</span>
            <input id="ad-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          {/* العنوان */}
          <div>
            <label className="block text-xs font-black text-slate-500 mb-2">العنوان الإعلاني</label>
            <input 
              type="text" 
              value={headline} 
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* نوع الشاشة */}
          <div>
            <label className="block text-xs font-black text-slate-500 mb-2">شكل الإطار (Device)</label>
            <div className="flex gap-2">
              <button onClick={() => setDevice('mac')} className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${device === 'mac' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                <FaDesktop /> بيسي
              </button>
              <button onClick={() => setDevice('iphone')} className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${device === 'iphone' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                <FaMobileAlt /> تليفون
              </button>
            </div>
          </div>

          {/* لون الخلفية */}
          <div>
            <label className="block text-xs font-black text-slate-500 mb-2">اللون</label>
            <div className="flex gap-2">
              {Object.keys(themes).map(t => (
                <button 
                  key={t} 
                  onClick={() => setBgTheme(t)} 
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${themes[t]} transition-all ${bgTheme === t ? 'ring-4 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-105'}`}
                />
              ))}
            </div>
          </div>

          {/* زر التحميل */}
          <button 
            onClick={handleDownload}
            disabled={isExporting || !imageSrc}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 active:scale-95"
          >
            <FaDownload /> {isExporting ? 'جاري التحميل...' : 'حمل الإعلان بجودة عالية'}
          </button>
        </div>
      </div>

      {/* 2. المعاينة (Preview) */}
      <div className="flex-1 w-full min-h-[500px] flex items-center justify-center bg-slate-200/50 rounded-3xl border-2 border-dashed border-slate-300 overflow-hidden relative">
        
        {/* هاد الكونتينر هو لي كيدير التصغير للعين باش يبان بلا ما يهرس التصميم */}
        <div 
          className="shrink-0 flex items-center justify-center pointer-events-none"
          style={{ width: '1080px', height: '1080px', transform: 'scale(0.40)', transformOrigin: 'center' }}
        >
          {/* هاد الـ div هو لي غيتم التحميل ديالو (1080x1080 ديما مضمونة) */}
          <div 
            ref={exportRef}
            className={`w-full h-full bg-gradient-to-br ${themes[bgTheme]} relative flex flex-col items-center justify-center p-12 overflow-hidden shadow-2xl`}
          >
            {/* تأثيرات الإضاءة */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px]"></div>

            {/* العنوان الفوق */}
            <h1 className="text-[3.5rem] font-black text-white text-center leading-[1.3] mb-16 max-w-4xl relative z-10 drop-shadow-lg">
              {headline}
            </h1>

            {/* إطار السكرين شوت */}
            {imageSrc ? (
              <div className={`relative z-10 flex justify-center w-full ${device === 'mac' ? 'max-w-4xl' : 'max-w-[400px]'}`}>
                <div className="w-full bg-slate-900 rounded-[2rem] border-[6px] border-slate-800 shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden">
                  
                  {/* شريط المتصفح (Mac) أو نوتش (iPhone) */}
                  {device === 'mac' ? (
                    <div className="bg-slate-800/80 px-6 py-4 flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-rose-500"></span>
                      <span className="w-4 h-4 rounded-full bg-amber-500"></span>
                      <span className="w-4 h-4 rounded-full bg-emerald-500"></span>
                    </div>
                  ) : (
                    <div className="bg-slate-900 h-8 flex justify-center w-full relative">
                      <div className="w-32 h-6 bg-black rounded-b-3xl absolute top-0"></div>
                    </div>
                  )}

                  {/* الصورة */}
                  <img src={imageSrc} alt="Preview" className={`w-full object-cover ${device === 'mac' ? 'h-[500px] object-top' : 'h-[650px]'}`} />
                </div>
              </div>
            ) : (
              <div className="w-[800px] h-[450px] border-4 border-dashed border-white/20 rounded-[2rem] flex items-center justify-center text-white/50 text-3xl font-black">
                حط التصويرة باش تبان هنا
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}