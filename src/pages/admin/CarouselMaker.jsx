import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { FaUpload, FaDownload, FaCrown, FaBolt, FaArrowLeft, FaPalette, FaWhatsapp } from 'react-icons/fa';

export default function CarouselMaker() {
  const exportRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const [imageSrc, setImageSrc] = useState(null);
  const [badgeText, setBadgeText] = useState('طريقة جديدة 🚀');
  const [title, setTitle] = useState('شنو ناقصك باش تولي تهضر بطلاقة؟');
  const [description, setDescription] = useState('تعلم بوحدك فالمنصة، وطبق داكشي لي قريتي فحصص لايف باش تطلق لسانك.');
  
  const [showPrice, setShowPrice] = useState(true);
  const [oldPrice, setOldPrice] = useState('300');
  const [newPrice, setNewPrice] = useState('229');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!exportRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(exportRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        width: 1080,
        height: 1080,
        filter: (node) => {
          if (node.tagName === 'LINK' && node.href && node.href.includes('fonts.googleapis.com')) return false;
          return true;
        }
      });
      const link = document.createElement('a');
      link.download = `RR-Premium-Ad-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('وقع مشكل فالتحميل!');
    }
    setIsExporting(false);
  };

  // التصميم الفخم (Premium Design)
  const AdDesign = () => (
    <div 
      className="w-[1080px] h-[1080px] bg-slate-50 relative flex flex-col p-12 overflow-hidden justify-between border-4 border-slate-100 z-0" 
      style={{ fontFamily: '"Tajawal", sans-serif' }} 
      dir="rtl"
    >
      {/* 1. الإضاءات الخلفية المدمجة (Ambient Glows) */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-300/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[20%] left-[-20%] w-[700px] h-[700px] bg-blue-500/15 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-emerald-400/15 rounded-full blur-[100px] -z-10"></div>
      
      {/* باترن خفيف للشبكة (Grid Pattern) */}
      <div className="absolute inset-0 opacity-[0.03] -z-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* 2. الهيدر: تم التعديل باش يجيو فسطر واحد الفوق */}
      <div className="relative z-10 flex flex-col w-full mt-2">
        
        {/* السطر العلوي: البادج + (الواتساب واللوغو) */}
        <div className="flex items-center justify-between w-full mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-200 text-amber-700 px-6 py-2 rounded-full text-xl font-black shadow-sm">
            <FaCrown className="text-amber-500" /> {badgeText}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-2.5 rounded-2xl font-black text-xl shadow-sm">
               <FaWhatsapp className="text-2xl text-emerald-500" /> <span dir="ltr">07 18 09 08 87</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
              <div className="font-black text-2xl tracking-wide border-l-2 border-slate-100 pl-4">
                <span className="text-slate-900">RR</span> <span className="text-blue-600">ENGLISH</span>
              </div>
              <span className="text-xs font-bold text-slate-500 w-32 text-right leading-tight">
                أول منصة مغربية لتعلم الإنجليزية بالدارجة
              </span>
            </div>
          </div>
        </div>

        {/* السطر الثاني: العنوان الرئيسي كياخد مساحتو بوحدو */}
        <h1 className="text-6xl font-black text-slate-900 leading-[1.3] max-w-4xl drop-shadow-sm">
          {title}
        </h1>
      </div>

      {/* 3. منطقة السكرين شوت (تأثير 3D مقصود مع إطار أصفر) */}
      <div className="relative z-10 flex-1 flex justify-center items-center w-full my-6">
        {/* الكارطونة الصفراء المائلة (Backdrop Card) باش يبان الميلان مقصود */}
        <div className="absolute w-[85%] h-[500px] bg-amber-400 rounded-[2rem] transform -rotate-2 shadow-lg border-4 border-amber-500"></div>
        
        {/* السكرين شوت (Main Card) */}
        <div className="w-[85%] h-[500px] bg-white rounded-[2rem] border-4 border-slate-900 shadow-2xl overflow-hidden flex flex-col relative transform rotate-1">
           <div className="w-full h-10 bg-slate-900 flex items-center px-4 gap-2.5 shrink-0">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-500"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
           </div>
          {imageSrc ? (
            <img src={imageSrc} alt="Preview" className="w-full h-full object-cover object-top" />
          ) : (
            <div className="flex-1 bg-slate-50 flex items-center justify-center text-slate-400 text-4xl font-black">
              الصورة ديالك هنا
            </div>
          )}
        </div>
      </div>

      {/* 4. كارد زجاجية لتحت (Glassmorphism) للوصف والثمن */}
      <div className="relative z-20 bg-white/80 backdrop-blur-xl border-2 border-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-between gap-8">
        
        <div className="flex items-start gap-6 flex-1">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-blue-600/30">
            <FaBolt />
          </div>
          <p className="text-3xl font-bold text-slate-700 leading-snug">
            {description}
          </p>
        </div>

        {/* مربع الثمن بالأخضر */}
        {showPrice && (
          <div className="shrink-0 bg-emerald-50 border-2 border-emerald-200 px-8 py-5 rounded-3xl flex flex-col items-center">
            <span className="text-emerald-700 font-black text-xl mb-1">فقط بـ</span>
            <div className="flex items-baseline gap-2" dir="ltr">
              <span className="text-6xl font-black text-emerald-600 tracking-tighter">{newPrice}</span>
              <span className="text-2xl font-bold text-emerald-600">DH</span>
            </div>
            {oldPrice && (
              <div className="text-slate-400 font-black text-2xl line-through decoration-rose-400 decoration-4 mt-1" dir="ltr">
                {oldPrice} DH
              </div>
            )}
          </div>
        )}
      </div>
      
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col lg:flex-row gap-8 dir-rtl font-sans">
      
      {/* Control Panel */}
      <div className="w-full lg:w-[420px] bg-white p-6 rounded-3xl shadow-sm border border-slate-200 shrink-0 h-fit z-20">
        <h2 className="text-2xl font-black text-blue-700 mb-6 flex items-center gap-2">
          <FaPalette className="text-amber-500" /> ديزاين بريميوم
        </h2>

        <div className="space-y-4">
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-2xl cursor-pointer bg-blue-50 transition-colors">
            <FaUpload className="text-2xl text-blue-500 mb-2" />
            <span className="text-sm font-bold text-blue-700">حط السكرين شوت</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-black text-slate-500 mb-1">بادج ذهبي (Badge)</label>
              <input type="text" value={badgeText} onChange={(e) => setBadgeText(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 mb-1">العنوان الكبير (Hook)</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 mb-1">الوصف الزجاجي (Description)</label>
            <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-blue-500" />
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <label className="flex items-center gap-2 font-black text-sm text-slate-700 mb-3 cursor-pointer">
              <input type="checkbox" checked={showPrice} onChange={(e) => setShowPrice(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
              بين الثمن (بالأخضر)
            </label>
            {showPrice && (
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 mb-1">الثمن القديم</label>
                  <input type="text" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-sm outline-none focus:border-rose-400 text-rose-500 line-through" dir="ltr" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 mb-1">الثمن الجديد</label>
                  <input type="text" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full p-2 bg-white border border-slate-200 rounded-lg font-black text-sm outline-none focus:border-emerald-500 text-emerald-600" dir="ltr" />
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={handleDownload}
            disabled={isExporting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl mt-4"
          >
            <FaDownload className="text-amber-400" /> {isExporting ? 'جاري التحميل...' : 'تحميل الإعلان (HD)'}
          </button>
        </div>
      </div>

      {/* Preview Container (Scaled for viewing) */}
      <div className="flex-1 w-full flex items-center justify-center bg-slate-200/50 rounded-3xl border-2 border-dashed border-slate-300 overflow-hidden relative p-4 shadow-inner">
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'center' }} className="pointer-events-none shadow-2xl">
          <AdDesign />
        </div>
      </div>

      {/* Hidden Container for Export */}
      <div className="fixed top-[200vh] left-[200vw] opacity-0 pointer-events-none">
        <div ref={exportRef}>
          <AdDesign />
        </div>
      </div>

    </div>
  );
}