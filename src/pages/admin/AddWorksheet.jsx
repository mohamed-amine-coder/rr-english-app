import React, { useState } from 'react';
import { supabase } from '../../config/supabaseClient';

export default function AddWorksheet() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [jsonInput, setJsonInput] = useState('[\n\n]');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const contentArray = JSON.parse(jsonInput);
      
      const { error } = await supabase
        .from('worksheets')
        .insert([{ 
          title, 
          description, 
          is_free: isFree, 
          content: contentArray 
        }]);

      if (error) throw error;
      
      alert("تمت إضافة الملخص بنجاح! 🚀");
      setTitle('');
      setDescription('');
      setIsFree(false);
      setJsonInput('[\n\n]');
    } catch (err) {
      alert("خطأ: تأكد من أن كود JSON صحيح ومفيهش أغلاط.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 dir-rtl text-slate-800 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-[2rem] border-4 border-slate-900 shadow-[0_8px_0_#0F172A]">
        <h1 className="text-3xl font-black mb-6 text-blue-600">إضافة ملخص PDF (JSON Mode)</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-bold mb-2">عنوان الملخص</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border-2 border-slate-300 rounded-xl" />
          </div>
          <div>
            <label className="block font-bold mb-2">وصف قصير</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border-2 border-slate-300 rounded-xl" />
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3 bg-emerald-50 p-4 rounded-xl border-2 border-emerald-200">
          <input type="checkbox" id="freeCheck" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} className="w-6 h-6" />
          <label htmlFor="freeCheck" className="font-bold text-emerald-900 cursor-pointer">هاد الملخص مجاني (Lead Magnet 🎁)</label>
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-2">كود JSON ديال الدرس</label>
          <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} rows="12" dir="ltr" className="w-full p-4 border-2 border-slate-900 rounded-xl font-mono text-sm bg-slate-900 text-emerald-400"></textarea>
        </div>

        <button onClick={handleSave} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-sm border-b-4 border-blue-900 transition active:border-b-0 active:translate-y-1">
          {loading ? 'جاري الحفظ...' : 'حفظ ونشر الملخص'}
        </button>
      </div>
    </div>
  );
}