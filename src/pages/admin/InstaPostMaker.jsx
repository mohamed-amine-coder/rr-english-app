import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import {
  FaDownload, FaPlus, FaCopy, FaTrash, FaLayerGroup,
  FaCode, FaUpload, FaCheck, FaTimes, FaGraduationCap,
  FaLightbulb, FaQuestionCircle, FaArrowRight, FaBookmark, FaHeart, FaComment
} from 'react-icons/fa';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';

// استيراد الشخصيات
import mrRr from '../../assets/mr-rr.png';
import msRr from '../../assets/ms-rr.png';

const generateId = () => Math.random().toString(36).substr(2, 9);

// أنواع السلايدات
const SLIDE_TYPES = {
  HOOK: 'hook',               
  STEP: 'step',               
  COMPARISON: 'comparison',   
  QUIZ: 'quiz',               
  CTA: 'cta'                  
};

const SLIDE_TYPE_INFO = {
  [SLIDE_TYPES.HOOK]: { icon: FaLightbulb, label: 'خطاف (Hook)' },
  [SLIDE_TYPES.STEP]: { icon: MdOutlineTipsAndUpdates, label: 'معلومة (Step)' },
  [SLIDE_TYPES.COMPARISON]: { icon: FaCheck, label: 'مقارنة' },
  [SLIDE_TYPES.QUIZ]: { icon: FaQuestionCircle, label: 'كويز (Quiz)' },
  [SLIDE_TYPES.CTA]: { icon: FaBookmark, label: 'دعوة (CTA)' }
};

// بيانات افتراضية
const getDefaultDataForType = (type) => {
  switch (type) {
    case SLIDE_TYPES.HOOK:
      return {
        eyebrow: 'سر من أسرار الإنجليزية 🤫',
        title: '3 عبارات غتخليك تبان بحال',
        highlight: 'Native Speaker',
        subtitle: 'سوایپ باش تكتشفهم ⬅️'
      };
    case SLIDE_TYPES.STEP:
      return {
        stepNumber: '01',
        title_en: 'Instead of "Very Good"',
        text_ar: 'الكلمات العادية كتخلي الإنجليزية ديالك تبان ضعيفة. استعمل هاد البدائل باش تبان محترف.',
        example: 'Excellent / Outstanding'
      };
    case SLIDE_TYPES.COMPARISON:
      return {
        concept: 'حروف الجر (Prepositions)',
        correct: 'I am good AT English.',
        wrong: 'I am good IN English.'
      };
    case SLIDE_TYPES.QUIZ:
      return {
        question: 'شنو هي الإجابة الصحيحة؟ 🤔',
        sentence: 'She ___ to the gym everyday.',
        options: ['A) go', 'B) goes', 'C) going'],
        hint: 'جاوب فالتعاليق لتحت 👇'
      };
    case SLIDE_TYPES.CTA:
      return {
        title: 'عجبك هاد الدرس؟',
        subtitle: 'انضم لـ RR ENGLISH وبدا تعلم الإنجليزية بالدارجة بأسرع طريقة.',
        action: 'الرابط فالبايو 🔗'
      };
    default:
      return {};
  }
};

const SlideDesign = ({ slide, slideIndex = 0, totalSlides = 1, isExport = false }) => {
  const { type, data, character } = slide;
  
  const getBackground = () => {
    return (
      <>
        <div className="absolute inset-0 bg-slate-950 z-0"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[150px] z-0"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-amber-500/15 rounded-full blur-[150px] z-0"></div>
        <div className="absolute inset-0 opacity-[0.05] z-0" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </>
    );
  };

  const renderContent = () => {
    switch (type) {
      case SLIDE_TYPES.HOOK:
        return (
          <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto space-y-8 z-20">
            <div className="bg-white/10 text-amber-400 border border-white/20 px-6 py-2 rounded-full font-bold text-2xl tracking-wide backdrop-blur-sm">
              {data.eyebrow}
            </div>
            <h1 className="text-[5.5rem] font-black text-white leading-[1.3]" dir="rtl">
              {data.title} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500" dir="ltr">{data.highlight}</span>
            </h1>
            <p className="text-4xl text-slate-400 font-bold mt-8">{data.subtitle}</p>
          </div>
        );

      case SLIDE_TYPES.STEP:
        return (
          <div className="flex flex-col w-full max-w-4xl mx-auto z-20 h-full justify-center">
            <div className="mb-10 flex">
              <div className="relative flex items-center justify-center w-28 h-28 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-[1.5rem] shadow-2xl">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg rotate-12 border-2 border-slate-900">
                  <MdOutlineTipsAndUpdates className="text-slate-900 text-2xl -rotate-12" />
                </div>
                <span className="text-amber-400 font-black text-6xl tracking-tighter" dir="ltr">{data.stepNumber}</span>
              </div>
            </div>

            <h2 className="text-7xl font-black text-white mb-10 tracking-tight" dir="ltr">{data.title_en}</h2>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2rem] backdrop-blur-md shadow-2xl relative">
              <div className="absolute top-0 left-10 w-20 h-1 bg-amber-400 rounded-b-full"></div>
              <p className="text-4xl text-slate-300 font-bold leading-relaxed mb-8" dir="rtl">{data.text_ar}</p>
              <div className="bg-blue-900/40 border border-blue-500/30 p-6 rounded-2xl flex items-center gap-4">
                <FaLightbulb className="text-amber-400 text-4xl" />
                <span className="text-4xl font-black text-white" dir="ltr">{data.example}</span>
              </div>
            </div>
          </div>
        );

      case SLIDE_TYPES.COMPARISON:
        return (
          <div className="flex flex-col w-full max-w-4xl mx-auto z-20 space-y-10">
            <div className="text-center mb-4">
              <h2 className="text-4xl font-bold text-slate-400 tracking-widest uppercase">{data.concept}</h2>
            </div>
            <div className="bg-rose-950/40 border border-rose-500/30 p-10 rounded-[2rem] relative overflow-hidden backdrop-blur-sm">
              <div className="absolute -right-4 -top-4 bg-rose-500/20 w-32 h-32 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-6 mb-4">
                <div className="bg-rose-500 text-white p-2 rounded-full"><FaTimes className="text-2xl" /></div>
                <span className="text-2xl font-bold text-rose-400" dir="rtl">ماكنقولوش</span>
              </div>
              <p className="text-6xl font-black text-slate-300 line-through decoration-rose-500/50 decoration-4" dir="ltr">{data.wrong}</p>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-10 rounded-[2rem] relative overflow-hidden backdrop-blur-sm shadow-[0_0_50px_rgba(16,185,129,0.1)]">
              <div className="absolute -left-4 -top-4 bg-emerald-500/20 w-32 h-32 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-6 mb-4">
                <div className="bg-emerald-500 text-white p-2 rounded-full"><FaCheck className="text-2xl" /></div>
                <span className="text-2xl font-bold text-emerald-400" dir="rtl">كنقولو</span>
              </div>
              <p className="text-6xl font-black text-white" dir="ltr">{data.correct}</p>
            </div>
          </div>
        );

      case SLIDE_TYPES.QUIZ:
        return (
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto z-20 text-center">
            <h2 className="text-4xl font-bold text-amber-400 mb-12" dir="rtl">{data.question}</h2>
            <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] w-full mb-12 backdrop-blur-md">
              <p className="text-6xl font-black text-white tracking-wide" dir="ltr">{data.sentence}</p>
            </div>
            <div className="grid grid-cols-1 gap-5 w-full max-w-2xl">
              {data.options.map((opt, i) => (
                <div key={i} className="bg-slate-900 border-2 border-slate-700 p-6 rounded-2xl text-4xl font-bold text-slate-300 text-left pl-10" dir="ltr">
                  {opt}
                </div>
              ))}
            </div>
            <p className="text-3xl text-blue-400 font-bold mt-12 animate-pulse" dir="rtl">{data.hint}</p>
          </div>
        );

      case SLIDE_TYPES.CTA:
        return (
          <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto z-20">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-10 shadow-[0_0_60px_rgba(37,99,235,0.4)]">
              <FaGraduationCap className="text-[5rem] text-white" />
            </div>
            <h1 className="text-7xl font-black text-white mb-6" dir="rtl">{data.title}</h1>
            <p className="text-4xl text-slate-400 font-bold leading-relaxed mb-16 max-w-3xl" dir="rtl">{data.subtitle}</p>
            
            <div className="flex gap-6 mb-16">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20"><FaBookmark className="text-3xl text-white" /></div>
                <span className="text-white font-bold text-xl">Save</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20"><FaComment className="text-3xl text-white" /></div>
                <span className="text-white font-bold text-xl">Comment</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20"><FaHeart className="text-3xl text-white" /></div>
                <span className="text-white font-bold text-xl">Like</span>
              </div>
            </div>

            <div className="bg-amber-400 text-slate-950 px-16 py-6 rounded-full font-black text-4xl shadow-xl w-full max-w-2xl">
              {data.action}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-[1080px] h-[1080px] relative overflow-hidden flex flex-col ${isExport ? '' : 'shadow-2xl border-4 border-slate-700 rounded-[2.5rem]'}`}>
      {getBackground()}

      {/* الهيدر والشخصية مجموعين هنا باش ما يتزاحموش */}
      <div className="relative z-30 flex justify-between items-start px-16 pt-16">
        
        {/* اللوغو (اليمين) */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-white/10">
            <FaGraduationCap className="text-4xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[2.5rem] tracking-wide text-white leading-none mb-1">RR <span className="text-amber-400">ENGLISH</span></span>
            <span className="text-slate-400 font-bold text-lg tracking-wide opacity-90" dir="rtl">أول منصة مغربية لتعلم الإنجليزية</span>
          </div>
        </div>

        {/* الشخصية (اليسار) */}
        {character !== 'none' && type !== SLIDE_TYPES.CTA && (
          <div className="opacity-90">
            <div className={`w-[90px] h-[90px] rounded-full p-1 ${character === 'mr-rr' ? 'bg-amber-400' : 'bg-blue-400'} shadow-xl`}>
              <img src={character === 'mr-rr' ? mrRr : msRr} alt="character" className="w-full h-full object-cover rounded-full bg-slate-900" />
            </div>
          </div>
        )}
      </div>

      <div className="relative z-20 flex-1 flex items-center justify-center px-16 pb-16 pt-4">
        {renderContent()}
      </div>

      <div className="absolute bottom-12 left-0 w-full px-16 flex justify-between items-center z-30">
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-sm text-slate-400">
          <span className="font-black text-2xl tracking-widest">
            {String(slideIndex + 1).padStart(2, '0')} <span className="opacity-50">/ {String(totalSlides).padStart(2, '0')}</span>
          </span>
        </div>
        {type !== SLIDE_TYPES.CTA && (
          <div className="flex items-center gap-3 text-amber-400 font-bold text-2xl animate-bounce-x">
            <span>Swipe</span>
            <FaArrowRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default function InstaPostMaker() {
  const [slides, setSlides] = useState(() => {
    const types = [SLIDE_TYPES.HOOK, SLIDE_TYPES.STEP, SLIDE_TYPES.COMPARISON, SLIDE_TYPES.QUIZ, SLIDE_TYPES.CTA];
    return types.map((type, index) => ({
      id: generateId(),
      type,
      character: index % 2 === 0 ? 'mr-rr' : 'ms-rr',
      data: getDefaultDataForType(type)
    }));
  });

  const [activeSlideId, setActiveId] = useState(slides[0]?.id || '');
  const [isDownloading, setIsDownloading] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [showJsonModal, setShowJsonModal] = useState(false);

  const activeSlide = slides.find(s => s.id === activeSlideId);
  const activeIndex = slides.findIndex(s => s.id === activeSlideId);

  const updateActiveSlide = (field, value) => {
    setSlides(slides.map(s => s.id === activeSlideId ? { ...s, [field]: value } : s));
  };

  const updateSlideData = (key, value) => {
    setSlides(slides.map(s =>
      s.id === activeSlideId ? { ...s, data: { ...s.data, [key]: value } } : s
    ));
  };

  const addSlide = (type) => {
    const newSlide = {
      id: generateId(),
      type,
      character: 'none',
      data: getDefaultDataForType(type)
    };
    setSlides([...slides, newSlide]);
    setActiveId(newSlide.id);
  };

  const removeSlide = (id) => {
    if (slides.length === 1) return;
    const newSlides = slides.filter(s => s.id !== id);
    setSlides(newSlides);
    if (activeSlideId === id) setActiveId(newSlides[0].id);
  };

  const importFromJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) throw new Error('يجب أن يكون الكود عبارة عن مصفوفة (Array)');
      
      const validSlides = parsed.map(s => ({
        id: s.id || generateId(),
        type: s.type || SLIDE_TYPES.HOOK,
        character: s.character || 'none',
        data: s.data || getDefaultDataForType(s.type || SLIDE_TYPES.HOOK)
      }));
      
      setSlides(validSlides);
      setActiveId(validSlides[0].id);
      setShowJsonModal(false);
      setJsonInput('');
    } catch (e) {
      alert('خطأ فكود JSON: ' + e.message);
    }
  };

  const downloadAllSlides = async () => {
    setIsDownloading(true);
    const firstSlide = slides[0];
    const rawTitle = firstSlide?.data?.highlight || firstSlide?.data?.title_en || 'RR-English-Post';
    const safeTitle = rawTitle.replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, '').trim().replace(/\s+/g, '-');

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const node = document.getElementById(`export-slide-${slide.id}`);
      if (node) {
        try {
          const dataUrl = await toPng(node, { cacheBust: true, width: 1080, height: 1080, pixelRatio: 2 });
          const fileName = `${safeTitle}-${i + 1}.png`;
          const link = document.createElement('a');
          link.download = fileName;
          link.href = dataUrl;
          link.click();
          await new Promise(res => setTimeout(res, 600));
        } catch (err) {
          console.error(err);
        }
      }
    }
    setIsDownloading(false);
  };

  const renderDataFields = () => {
    const { type, data } = activeSlide || {};
    if (!type) return null;

    const inputClass = "w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm";
    const labelClass = "font-black text-slate-700 text-xs uppercase tracking-wider mb-1 mt-3 block";

    switch (type) {
      case SLIDE_TYPES.HOOK:
        return (
          <>
            <label className={labelClass}>الكلمة المفتاحية (Eyebrow)</label>
            <input value={data.eyebrow || ''} onChange={e => updateSlideData('eyebrow', e.target.value)} className={inputClass} dir="rtl" />
            <label className={labelClass}>العنوان الرئيسي</label>
            <input value={data.title || ''} onChange={e => updateSlideData('title', e.target.value)} className={inputClass} dir="rtl" />
            <label className={labelClass}>الكلمة البارزة (Highlight)</label>
            <input value={data.highlight || ''} onChange={e => updateSlideData('highlight', e.target.value)} className={inputClass} dir="ltr" />
            <label className={labelClass}>نص سفلي</label>
            <input value={data.subtitle || ''} onChange={e => updateSlideData('subtitle', e.target.value)} className={inputClass} dir="rtl" />
          </>
        );
      case SLIDE_TYPES.STEP:
        return (
          <>
            <label className={labelClass}>رقم الخطوة</label>
            <input value={data.stepNumber || ''} onChange={e => updateSlideData('stepNumber', e.target.value)} className={inputClass} dir="ltr" />
            <label className={labelClass}>العنوان الإنجليزي</label>
            <input value={data.title_en || ''} onChange={e => updateSlideData('title_en', e.target.value)} className={inputClass} dir="ltr" />
            <label className={labelClass}>الشرح بالدارجة</label>
            <textarea value={data.text_ar || ''} onChange={e => updateSlideData('text_ar', e.target.value)} rows="3" className={inputClass} dir="rtl" />
            <label className={labelClass}>مثال بارز</label>
            <input value={data.example || ''} onChange={e => updateSlideData('example', e.target.value)} className={inputClass} dir="ltr" />
          </>
        );
      case SLIDE_TYPES.COMPARISON:
        return (
          <>
            <label className={labelClass}>المفهوم / القاعدة</label>
            <input value={data.concept || ''} onChange={e => updateSlideData('concept', e.target.value)} className={inputClass} dir="rtl" />
            <label className={labelClass}>الجملة الخاطئة</label>
            <input value={data.wrong || ''} onChange={e => updateSlideData('wrong', e.target.value)} className={inputClass} dir="ltr" />
            <label className={labelClass}>الجملة الصحيحة</label>
            <input value={data.correct || ''} onChange={e => updateSlideData('correct', e.target.value)} className={inputClass} dir="ltr" />
          </>
        );
      case SLIDE_TYPES.QUIZ:
        return (
          <>
            <label className={labelClass}>سؤال الكويز</label>
            <input value={data.question || ''} onChange={e => updateSlideData('question', e.target.value)} className={inputClass} dir="rtl" />
            <label className={labelClass}>الجملة الناقصة</label>
            <input value={data.sentence || ''} onChange={e => updateSlideData('sentence', e.target.value)} className={inputClass} dir="ltr" />
            <label className={labelClass}>الخيارات (كل خيار فسطر)</label>
            <textarea value={(data.options || []).join('\n')} onChange={e => updateSlideData('options', e.target.value.split('\n'))} rows="3" className={inputClass} dir="ltr" />
            <label className={labelClass}>نص تشجيعي (Hint)</label>
            <input value={data.hint || ''} onChange={e => updateSlideData('hint', e.target.value)} className={inputClass} dir="rtl" />
          </>
        );
      case SLIDE_TYPES.CTA:
        return (
          <>
            <label className={labelClass}>العنوان الرئيسي</label>
            <input value={data.title || ''} onChange={e => updateSlideData('title', e.target.value)} className={inputClass} dir="rtl" />
            <label className={labelClass}>النص الثانوي</label>
            <textarea value={data.subtitle || ''} onChange={e => updateSlideData('subtitle', e.target.value)} rows="2" className={inputClass} dir="rtl" />
            <label className={labelClass}>زر الإجراء (Button)</label>
            <input value={data.action || ''} onChange={e => updateSlideData('action', e.target.value)} className={inputClass} dir="rtl" />
          </>
        );
      default:
        return null;
    }
  };

  if (!activeSlide) return null;

  return (
    <div className="min-h-screen bg-slate-100 p-6 dir-rtl font-sans text-slate-800 flex flex-col lg:flex-row gap-6 items-start">
      <div className="w-full lg:w-[480px] bg-white p-6 rounded-[2rem] shadow-xl shrink-0 flex flex-col h-[calc(100vh-3rem)] sticky top-6 z-40">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <FaLayerGroup className="text-blue-600" /> Post Creator
          </h1>
          <button onClick={() => setShowJsonModal(true)} className="bg-slate-100 hover:bg-slate-200 p-2 px-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
            <FaCode className="text-blue-600" /> JSON
          </button>
        </div>

        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {slides.map((s, i) => (
              <div key={s.id} className="relative group shrink-0">
                <button
                  onClick={() => setActiveId(s.id)}
                  className={`w-12 h-12 rounded-xl font-black transition-all ${activeSlideId === s.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  {i + 1}
                </button>
                {slides.length > 1 && (
                  <button onClick={() => removeSlide(s.id)} className="absolute -top-2 -right-2 hidden group-hover:flex bg-rose-500 text-white p-1 rounded-full shadow-md z-10"><FaTimes size={10} /></button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-black text-slate-700 text-xs uppercase mb-2 block">نوع السلايد</label>
              <select
                value={activeSlide.type}
                onChange={(e) => {
                  const newType = e.target.value;
                  updateActiveSlide('type', newType);
                  updateActiveSlide('data', getDefaultDataForType(newType));
                }}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-sm font-bold bg-slate-50"
              >
                {Object.entries(SLIDE_TYPE_INFO).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-black text-slate-700 text-xs uppercase mb-2 block">الشخصية (Avatar)</label>
              <select
                value={activeSlide.character}
                onChange={(e) => updateActiveSlide('character', e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-sm font-bold bg-slate-50"
              >
                <option value="none">بدون</option>
                <option value="mr-rr">Mr-RR</option>
                <option value="ms-rr">Ms-RR</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            {renderDataFields()}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4">
          <p className="text-xs font-bold text-slate-400 mb-2">إضافة سلايد جديد:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SLIDE_TYPE_INFO).map(([key, val]) => {
              const IconBtn = val.icon;
              return (
                <button key={key} onClick={() => addSlide(key)} className="text-xs font-bold px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center gap-1.5 transition-colors">
                  <IconBtn /> {val.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={downloadAllSlides}
          disabled={isDownloading}
          className="w-full mt-6 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <FaDownload className="text-amber-400" />
          {isDownloading ? 'جاري التصدير...' : `تحميل (${slides.length} صور)`}
        </button>
      </div>

      <div className="flex-1 flex justify-center items-center w-full min-h-[calc(100vh-3rem)] bg-slate-300/30 rounded-[3rem] border-2 border-dashed border-slate-300 p-4 overflow-hidden relative">
        <div style={{ transform: 'scale(0.55)', transformOrigin: 'center center' }} className="transition-transform duration-300">
          <SlideDesign slide={activeSlide} slideIndex={activeIndex} totalSlides={slides.length} />
        </div>
      </div>

      <div className="fixed top-[200vh] left-[200vw] opacity-0 pointer-events-none">
        {slides.map((slide, index) => (
          <div key={`export-${slide.id}`} id={`export-slide-${slide.id}`}>
            <SlideDesign slide={slide} slideIndex={index} totalSlides={slides.length} isExport={true} />
          </div>
        ))}
      </div>

      {showJsonModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white p-6 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl">
            <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><FaUpload className="text-blue-600"/> استيراد JSON</h2>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={12}
              className="w-full p-3 border-2 border-slate-200 rounded-2xl font-mono text-sm focus:border-blue-500 outline-none"
              placeholder={`[\n  {\n    "type": "hook",\n    "character": "mr-rr",\n    "data": {\n      "eyebrow": "سر من أسرار الإنجليزية 🤫",\n      "title": "3 عبارات غتخليك تبان بحال",\n      "highlight": "Native Speaker",\n      "subtitle": "سوایپ باش تكتشفهم ⬅️"\n    }\n  }\n]`}
            />
            <div className="flex gap-3 mt-4 justify-end">
              <button onClick={() => { setShowJsonModal(false); setJsonInput(''); }} className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-xl font-black hover:bg-slate-200 transition-colors">إلغاء</button>
              <button onClick={importFromJson} className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-black hover:bg-blue-700 shadow-md transition-colors">استيراد</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}