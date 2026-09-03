import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { 
  FaBookOpen, FaListUl, FaQuestionCircle, FaPen, FaCode, FaEdit, 
  FaGraduationCap, FaWhatsapp, FaPlus, FaTrash, FaImage, FaLanguage, 
  FaFileDownload, FaLink, FaComments, FaHome 
} from 'react-icons/fa';

const generateId = () => Math.random().toString(36).substr(2, 9);

export default function LessonPDF() {
  const [inputMode, setInputMode] = useState('form');
  const [jsonError, setJsonError] = useState('');
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [jsonString, setJsonString] = useState('');

  const [pages, setPages] = useState([
    {
      id: generateId(),
      blocks: [
        { id: generateId(), type: 'header', content: { title: "UNIT 1: INTRODUCTIONS" } },
        { id: generateId(), type: 'roleplay', content: { 
            text: "Alex: Hi, I don't think we've met. I'm Alex.\nSara: Nice to meet you, Alex! I am Sara.\nAlex: Are you a new student here?\nSara: Yes, it's my first day. I'm a bit nervous!" 
        }},
        { id: generateId(), type: 'darija', content: { text: "💡 ركز على عبارة 'I don't think we've met' (كنظن ماتلاقيناش). أحسن طريقة باش تبدا محادثة مع شخص جديد بطريقة محترفة." } },
        { id: generateId(), type: 'matching', content: { 
            items: [
              { left: "Nice to meet you", right: "متشرفين" },
              { left: "First day", right: "أول نهار" },
              { left: "Nervous", right: "متوتر" }
            ]
        }},
        { id: generateId(), type: 'homework', content: { text: "Write a short paragraph (3-4 lines) introducing yourself to a new colleague. Bring it to our next live session!" } },
        { id: generateId(), type: 'footer', content: {} }
      ]
    }
  ]);

  const handleJsonChange = (e) => {
    const val = e.target.value;
    setJsonString(val);
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) {
        setPages(parsed);
        setJsonError('');
      } else {
        setJsonError('Format khasso ikon Array dyal pages');
      }
    } catch (err) {
      setJsonError('Kayna ghalat f structure d JSON');
    }
  };

  const addPage = () => {
    setPages([...pages, {
      id: generateId(),
      blocks: [
        { id: generateId(), type: 'header', content: { title: "NEW PAGE" } },
        { id: generateId(), type: 'footer', content: {} }
      ]
    }]);
    setActivePageIndex(pages.length);
  };

  const removePage = (index) => {
    if (pages.length === 1) return;
    const newPages = pages.filter((_, i) => i !== index);
    setPages(newPages);
    setActivePageIndex(Math.max(0, index - 1));
  };

  const addBlock = (type) => {
    const newPages = [...pages];
    let newContent = { text: '', url: '', fileUrl: '' };
    if (type === 'matching') newContent = { items: [{ left: '', right: '' }] };
    
    const newBlock = { id: generateId(), type, content: newContent };
    const footerIndex = newPages[activePageIndex].blocks.findIndex(b => b.type === 'footer');
    
    if (footerIndex !== -1) {
      newPages[activePageIndex].blocks.splice(footerIndex, 0, newBlock);
    } else {
      newPages[activePageIndex].blocks.push(newBlock);
    }
    setPages(newPages);
  };

  const updateBlock = (pageIndex, blockId, field, value) => {
    const newPages = [...pages];
    const block = newPages[pageIndex].blocks.find(b => b.id === blockId);
    if (block) {
      block.content[field] = value;
      setPages(newPages);
    }
  };

  const updateMatchingItem = (pageIndex, blockId, itemIndex, field, value) => {
    const newPages = [...pages];
    const block = newPages[pageIndex].blocks.find(b => b.id === blockId);
    if (block && block.content.items) {
      block.content.items[itemIndex][field] = value;
      setPages(newPages);
    }
  };

  const addMatchingItem = (pageIndex, blockId) => {
    const newPages = [...pages];
    const block = newPages[pageIndex].blocks.find(b => b.id === blockId);
    if (block && block.content.items) {
      block.content.items.push({ left: '', right: '' });
      setPages(newPages);
    }
  };

  const removeBlock = (pageIndex, blockId) => {
    const newPages = [...pages];
    newPages[pageIndex].blocks = newPages[pageIndex].blocks.filter(b => b.id !== blockId);
    setPages(newPages);
  };

  const handleImageUpload = (pageIndex, blockId, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateBlock(pageIndex, blockId, 'fileUrl', url);
    }
  };

  const downloadAllPages = async () => {
    for (let i = 0; i < pages.length; i++) {
      const pageElement = document.getElementById(`page-${pages[i].id}`);
      if (pageElement) {
        try {
          const dataUrl = await toPng(pageElement, { cacheBust: true, pixelRatio: 3 });
          const link = document.createElement('a');
          const headerBlock = pages[i].blocks.find(b => b.type === 'header');
          const title = headerBlock?.content?.title || 'Lesson';
          link.download = `${title}_Page_${i + 1}.png`;
          link.href = dataUrl;
          link.click();
          await new Promise(res => setTimeout(res, 500)); 
        } catch (err) {
          console.error(`Error generating image for page ${i+1}:`, err);
        }
      }
    }
  };

  const renderEditorInput = (block, pageIndex) => {
    switch (block.type) {
      case 'header':
        return (
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Lesson Title</label>
            <input type="text" className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500" value={block.content.title || ''} onChange={(e) => updateBlock(pageIndex, block.id, 'title', e.target.value)} />
          </div>
        );
      case 'matching':
        return (
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">Matching Exercise (List A & List B)</label>
            <div className="flex flex-col gap-2">
              {(block.content.items || []).map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <span className="text-xs font-bold text-gray-400 w-4">{idx + 1}.</span>
                  <input type="text" placeholder="Word" className="flex-1 p-2 border rounded-md text-sm" value={item.left} onChange={(e) => updateMatchingItem(pageIndex, block.id, idx, 'left', e.target.value)} />
                  <input type="text" placeholder="Match (e.g. شرح)" className="flex-1 p-2 border rounded-md text-sm" value={item.right} onChange={(e) => updateMatchingItem(pageIndex, block.id, idx, 'right', e.target.value)} />
                </div>
              ))}
              <button onClick={() => addMatchingItem(pageIndex, block.id)} className="mt-2 self-start text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100">+ Add Pair</button>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="flex flex-col gap-2">
            <label className="block text-xs font-bold text-gray-500">Image (URL ola Upload)</label>
            <input type="text" placeholder="Image URL (Option 1)" className="w-full p-2 border rounded-lg text-sm bg-gray-50" value={block.content.url || ''} onChange={(e) => updateBlock(pageIndex, block.id, 'url', e.target.value)} />
            <input type="file" accept="image/*" className="text-sm" onChange={(e) => handleImageUpload(pageIndex, block.id, e)} />
          </div>
        );
      case 'footer':
        return <div className="text-xs text-gray-400 italic">Footer (Auto-generated Design)</div>;
      default:
        return (
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 capitalize">{block.type}</label>
            <textarea className="w-full p-3 border rounded-lg text-sm min-h-[90px] bg-gray-50" value={block.content.text || ''} onChange={(e) => updateBlock(pageIndex, block.id, 'text', e.target.value)} placeholder={`Enter ${block.type} content...`} />
          </div>
        );
    }
  };

  const renderPreviewBlock = (block) => {
    switch (block.type) {
      case 'header':
        return (
          <div className="bg-blue-600 px-8 py-5 flex flex-col gap-4 border-b-[6px] border-yellow-400 shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-white px-3.5 py-1.5 rounded-xl inline-flex items-center gap-3 shadow-md border-b-4 border-gray-200">
                  <div className="font-black text-xl tracking-tight"><span className="text-gray-900">RR</span> <span className="text-blue-600">ENGLISH</span></div>
                  <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg"><FaGraduationCap size={20} /></div>
                </div>
                <p dir="rtl" className="hidden sm:block text-white text-sm font-bold border-r-2 border-blue-300 pr-4">أول منصة مغربية لتعلم الانجليزية بالدارجة</p>
              </div>
              <img crossOrigin="anonymous" src="https://images.weserv.nl/?url=img.sanishtech.com/u/adbc593f936de4bffeee696a886c185e.jpg" alt="Logo" className="w-16 h-16 rounded-full border-[3px] border-white shadow-lg object-cover bg-white" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div className="inline-flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-xl border border-yellow-400 shadow-inner">
                <span className="text-yellow-400 font-black text-xs uppercase tracking-wider">Lesson</span>
                <span className="text-gray-600 font-light">|</span>
                <h1 className="text-xl md:text-2xl font-black tracking-wide uppercase text-white">{block.content.title}</h1>
              </div>
              <div className="flex gap-6 self-end sm:self-auto">
                <div className="w-28 flex items-end"><span className="font-bold mr-2 text-xs uppercase tracking-wider text-blue-200">Name</span><div className="flex-grow border-b-2 border-blue-300 pb-0.5"></div></div>
                <div className="w-24 flex items-end"><span className="font-bold mr-2 text-xs uppercase tracking-wider text-blue-200">Date</span><div className="flex-grow border-b-2 border-blue-300 pb-0.5"></div></div>
              </div>
            </div>
          </div>
        );
      case 'reading':
        return (
          <section className="mx-8 mt-6 bg-blue-100 rounded-2xl p-6 border-[3px] border-blue-400 shadow-sm">
            <div className="flex items-center gap-3 mb-4 border-b-[3px] border-blue-300 pb-2">
              <FaBookOpen className="text-blue-600 text-2xl" />
              <h2 className="text-xl font-black text-blue-800 uppercase">Reading Context</h2>
            </div>
            <div className="whitespace-pre-wrap text-[1.1rem] leading-relaxed font-bold text-gray-800">{block.content.text}</div>
          </section>
        );
      case 'roleplay':
        return (
          <section className="mx-8 mt-6 bg-cyan-100 rounded-2xl p-6 border-[3px] border-cyan-400 shadow-sm">
            <div className="flex items-center gap-3 mb-5 border-b-[3px] border-cyan-300 pb-2">
              <FaComments className="text-cyan-600 text-2xl" />
              <h2 className="text-xl font-black text-cyan-800 uppercase">Speaking Practice</h2>
            </div>
            <div className="flex flex-col gap-4">
              {block.content.text?.split('\n').map((line, idx) => {
                if (!line.includes(':')) return <p key={idx} className="text-gray-600 font-bold">{line}</p>;
                const [speaker, ...dialogue] = line.split(':');
                const isFirstSpeaker = idx % 2 === 0;
                return (
                  <div key={idx} className={`flex flex-col ${isFirstSpeaker ? 'items-start' : 'items-end'}`}>
                    <span className="text-xs font-black text-cyan-800 mb-1 px-1">{speaker.trim()}</span>
                    <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-[1.05rem] font-bold border-2 ${isFirstSpeaker ? 'bg-white text-gray-800 border-gray-200 rounded-tl-sm' : 'bg-cyan-600 text-white border-cyan-700 rounded-tr-sm'}`}>
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
          <section className="mx-8 mt-6 bg-pink-100 rounded-2xl p-5 border-[3px] border-pink-400 shadow-sm" dir="rtl">
            <div className="flex items-start gap-3">
              <FaLanguage className="text-pink-600 text-2xl mt-1 shrink-0" />
              <div className="whitespace-pre-wrap text-[1.05rem] leading-relaxed font-black text-gray-800">{block.content.text}</div>
            </div>
          </section>
        );
      case 'matching':
        const items = block.content.items || [];
        return (
          <section className="mx-8 mt-6 bg-purple-100 rounded-2xl p-6 border-[3px] border-purple-400 shadow-sm">
            <div className="flex items-center gap-3 mb-5 border-b-[3px] border-purple-300 pb-2">
              <FaLink className="text-purple-600 text-2xl" />
              <h2 className="text-xl font-black text-purple-800 uppercase">Match the Words</h2>
            </div>
            <div className="flex justify-between gap-10">
              <ul className="flex-1 flex flex-col gap-3">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-white border-2 border-purple-300 p-3 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="bg-purple-600 text-white font-black w-7 h-7 flex items-center justify-center rounded-lg">{idx + 1}</span>
                      <span className="font-black text-gray-800 text-lg">{item.left}</span>
                    </div>
                    <div className="w-8 h-8 border-2 border-dashed border-gray-400 rounded-md bg-gray-50"></div>
                  </li>
                ))}
              </ul>
              <ul className="flex-1 flex flex-col gap-3">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-white border-2 border-purple-300 p-3 rounded-xl shadow-sm">
                    <span className="bg-purple-200 text-purple-800 font-black w-7 h-7 flex items-center justify-center rounded-lg">{String.fromCharCode(65 + idx)}</span>
                    <span className="font-black text-gray-800 text-lg" dir="rtl">{item.right}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      case 'homework':
        return (
          <section className="mx-8 mt-6 bg-rose-100 rounded-2xl p-6 border-[3px] border-rose-400 shadow-sm">
            <div className="flex items-center gap-3 mb-4 border-b-[3px] border-rose-300 pb-2">
              <FaHome className="text-rose-600 text-2xl" />
              <h2 className="text-xl font-black text-rose-800 uppercase">Homework</h2>
            </div>
            <div className="whitespace-pre-wrap text-[1.1rem] leading-relaxed font-bold text-gray-800 bg-white/50 p-4 rounded-xl border border-rose-300">
              {block.content.text}
            </div>
          </section>
        );
      case 'image':
        const imgSrc = block.content.fileUrl || block.content.url;
        if (!imgSrc) return null;
        return (
          <div className="mx-8 mt-6 flex justify-center">
            <img src={imgSrc} alt="Illustration" className="max-w-full max-h-[350px] object-cover rounded-2xl border-[4px] border-white shadow-md" />
          </div>
        );
      case 'vocabulary':
        return (
          <section className="mx-8 mt-6 bg-emerald-100 rounded-2xl p-6 border-[3px] border-emerald-400 shadow-sm">
            <div className="flex items-center gap-3 mb-5 border-b-[3px] border-emerald-300 pb-2">
              <FaListUl className="text-emerald-600 text-2xl" />
              <h2 className="text-xl font-black text-emerald-800 uppercase">New Words</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {block.content.text?.split(',').map((pair, idx) => {
                const [word, trans] = pair.split('=');
                if (!word) return null;
                return (
                  <div key={idx} className="flex justify-between items-center bg-white border-2 border-emerald-300 px-4 py-2.5 rounded-xl shadow-sm">
                    <span className="font-black text-emerald-900 text-[1.05rem]">{word.trim()}</span>
                    {trans && <span className="text-[1rem] font-bold text-gray-800 bg-emerald-50 px-2 py-1 rounded" dir="rtl">{trans.trim()}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        );
      case 'questions':
      case 'practice':
        const isPractice = block.type === 'practice';
        return (
          <section className={`mx-8 mt-6 rounded-2xl p-6 border-[3px] shadow-sm ${isPractice ? 'bg-amber-100 border-amber-400' : 'bg-indigo-100 border-indigo-400'}`}>
            <div className={`flex items-center gap-3 mb-4 border-b-[3px] pb-2 ${isPractice ? 'border-amber-300' : 'border-indigo-300'}`}>
              {isPractice ? <FaPen className="text-amber-600 text-2xl" /> : <FaQuestionCircle className="text-indigo-600 text-2xl" />}
              <h2 className={`text-xl font-black uppercase ${isPractice ? 'text-amber-800' : 'text-indigo-800'}`}>{isPractice ? 'Practice' : 'Questions'}</h2>
            </div>
            <div className="whitespace-pre-wrap text-[1.1rem] leading-loose font-bold text-gray-800">
              {block.content.text}
            </div>
          </section>
        );
      case 'footer':
        return (
          <div className="w-full mt-auto pt-8 pb-6 px-10">
            <div className="bg-white rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-2 border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 text-emerald-700 font-black bg-emerald-50 px-4 py-2 rounded-xl border-2 border-emerald-300">
                <FaWhatsapp className="text-emerald-500 text-2xl" /><span dir="ltr" className="tracking-wide">+212 600 000 000</span>
              </div>
              <div dir="rtl" className="flex items-center gap-2 bg-amber-100 border-2 border-amber-400 px-4 py-2 rounded-xl shadow-sm">
                <span className="text-xl">💡</span>
                <span className="text-amber-900 font-black text-sm">شرح بالدارجة فـ: <span className="text-blue-700 mx-1" dir="ltr">rrenglish.com</span></span>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
        .tajawal-font { font-family: 'Tajawal', sans-serif; }
      `}</style>
      <div className="min-h-screen bg-[#E2E8F0] p-4 md:p-6 flex flex-col lg:flex-row gap-6 tajawal-font" dir="rtl">
        
        {/* Editor Sidebar */}
        <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-4">
          <h2 className="text-2xl font-black text-gray-800">1. التحكم والبيانات:</h2>
          
          <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
            <button onClick={() => setInputMode('form')} className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg font-bold transition-all text-sm ${inputMode === 'form' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}><FaEdit /> واجهة الأساتذة</button>
            <button onClick={() => { setJsonString(JSON.stringify(pages, null, 2)); setInputMode('json'); }} className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg font-bold transition-all text-sm ${inputMode === 'json' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}><FaCode /> كود JSON</button>
          </div>

          {inputMode === 'form' ? (
            <>
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex gap-2 overflow-x-auto">
                {pages.map((p, idx) => (
                  <button key={p.id} onClick={() => setActivePageIndex(idx)} className={`px-4 py-2 font-black rounded-lg text-sm shrink-0 ${activePageIndex === idx ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Page {idx + 1}</button>
                ))}
                <button onClick={addPage} className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 flex items-center gap-1 font-black text-sm border border-emerald-300"><FaPlus /> صفحة</button>
              </div>

              <div className="flex-grow bg-white p-4 rounded-xl shadow-sm border border-gray-200 overflow-auto h-[55vh] flex flex-col gap-4">
                <div className="flex justify-between items-center border-b-[3px] pb-2 border-gray-100">
                  <h3 className="font-black text-blue-700 text-lg">محتوى (Page {activePageIndex + 1})</h3>
                  <button onClick={() => removePage(activePageIndex)} className="text-red-500 hover:text-red-700 font-bold text-sm flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md"><FaTrash /> حذف</button>
                </div>
                
                <div className="flex flex-col gap-4">
                  {pages[activePageIndex].blocks.map((block) => (
                    <div key={block.id} className="bg-gray-50 border-[2px] border-gray-200 p-4 rounded-xl relative group shadow-sm">
                      <button onClick={() => removeBlock(activePageIndex, block.id)} className="absolute top-2 left-2 text-red-400 hover:text-red-600 hidden group-hover:block bg-white p-1 rounded-full shadow"><FaTrash /></button>
                      {renderEditorInput(block, activePageIndex)}
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t-[3px] border-gray-100 flex flex-wrap gap-2">
                  <button onClick={() => addBlock('reading')} className="text-sm bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-black border border-blue-300">+ Reading</button>
                  <button onClick={() => addBlock('roleplay')} className="text-sm bg-cyan-100 text-cyan-800 px-3 py-2 rounded-lg font-black border border-cyan-300">+ Roleplay</button>
                  <button onClick={() => addBlock('matching')} className="text-sm bg-purple-100 text-purple-800 px-3 py-2 rounded-lg font-black border border-purple-300">+ Matching</button>
                  <button onClick={() => addBlock('darija')} className="text-sm bg-pink-100 text-pink-800 px-3 py-2 rounded-lg font-black border border-pink-300">+ Darija</button>
                  <button onClick={() => addBlock('vocabulary')} className="text-sm bg-emerald-100 text-emerald-800 px-3 py-2 rounded-lg font-black border border-emerald-300">+ Vocab</button>
                  <button onClick={() => addBlock('practice')} className="text-sm bg-amber-100 text-amber-800 px-3 py-2 rounded-lg font-black border border-amber-300">+ Practice</button>
                  <button onClick={() => addBlock('homework')} className="text-sm bg-rose-100 text-rose-800 px-3 py-2 rounded-lg font-black border border-rose-300">+ Homework</button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-[65vh] flex flex-col">
              <textarea className="w-full h-full p-4 font-mono text-xs bg-gray-900 text-green-400 border-[3px] border-gray-800 rounded-xl focus:outline-none focus:border-blue-500 shadow-inner" dir="ltr" value={jsonString} onChange={handleJsonChange} />
              {jsonError && <p className="text-red-500 text-sm mt-3 font-black bg-red-50 p-2 rounded-lg border border-red-200">{jsonError}</p>}
            </div>
          )}

          <button onClick={downloadAllPages} className="bg-blue-600 text-white font-black py-4 text-lg rounded-xl shadow-lg hover:bg-blue-700 flex justify-center items-center gap-3 border-[3px] border-blue-700 transition-transform active:scale-95">
            <FaFileDownload size={24} /> تحميل الدرس (PNGs)
          </button>
        </div>

        {/* Preview Container */}
        <div className="flex-1 flex flex-col items-center gap-10 overflow-y-auto pb-10" dir="ltr">
          {pages.map((page, idx) => (
            <div key={page.id} className="relative">
              <div className="absolute -left-12 top-0 text-gray-500 font-black text-xl bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">P.{idx + 1}</div>
              <div id={`page-${page.id}`} className="w-[794px] min-h-[1123px] bg-white shadow-2xl overflow-hidden flex flex-col border border-gray-200">
                <div className="flex flex-col flex-grow pb-8">
                  {page.blocks.map(block => (
                    <React.Fragment key={block.id}>
                      {renderPreviewBlock(block)}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}