import React, { useState } from 'react';
import { useAddLesson } from '../../hooks/useAddLesson';

export default function AddLesson() {
  const [title, setTitle] = useState('');
  
  // JSON تجريبي باش ما يبقاش المربع خاوي فالبداية
  const defaultJSON = `[
  {
    "type": "hook",
    "tag": "مقدمة",
    "title": "Welcome to A1",
    "question": "Are you ready?",
    "speechText": "Welcome to A1, Are you ready?"
  }
]`;

  const [jsonInput, setJsonInput] = useState(defaultJSON);
  const { addLessonWithJSON, loading, success, error } = useAddLesson();
  const [isPremium, setIsPremium] = useState(false); // <== هادي جديدة

  const handleSave = async () => {
    const isSaved = await addLessonWithJSON(title, jsonInput, isPremium); // <== زدناها هنا
    if (isSaved) {
      setTitle('');
      setJsonInput('[\n\n]');
      setIsPremium(false); // كنرجعوها للصفر
      alert("تمت إضافة الدرس والسلايدات بنجاح! 🚀");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 dir-rtl text-slate-800 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-[2rem] border-4 border-slate-900 shadow-[0_8px_0_#0F172A]">
        <h1 className="text-3xl font-black mb-6 text-blue-600">إضافة درس سريع (JSON Mode)</h1>

        {/* حقل العنوان */}
        <div className="mb-6">
          <label className="block font-bold mb-2">عنوان الدرس (Title)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: Lesson 1: Verb To Be"
            className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-blue-500 outline-none font-bold dir-ltr text-right"
          />
        </div>
        {/* واش الدرس مدفوع؟ */}
        <div className="mb-6 flex items-center gap-3 bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
          <input
            type="checkbox"
            id="premiumCheck"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
            className="w-6 h-6 accent-blue-600 rounded cursor-pointer"
          />
          <label htmlFor="premiumCheck" className="font-bold text-slate-700 cursor-pointer select-none">
            هاد الدرس مدفوع (Premium 💎)
          </label>
        </div>

        {/* مربع الـ JSON */}
        <div className="mb-6">
          <label className="block font-bold mb-2">السلايدات (JSON Array)</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows="16"
            dir="ltr"
            className="w-full p-4 border-2 border-slate-900 rounded-xl outline-none font-mono text-sm bg-slate-900 text-emerald-400"
          ></textarea>
          <p className="text-sm text-slate-500 mt-2 font-bold">
            حط الكود ديالك بين الأقواس المربعة [ ]، ورد البال للفواصل.
          </p>
        </div>

        {/* رسائل الخطأ والنجاح */}
        {error && (
          <div className="mb-4 p-4 bg-rose-100 text-rose-700 rounded-xl font-bold border-2 border-rose-300">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-emerald-100 text-emerald-700 rounded-xl font-bold border-2 border-emerald-300">
            ناضي! الدرس تسجل فـ Supabase.
          </div>
        )}

        {/* زر الحفظ */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-2xl shadow-sm border-b-4 border-blue-900 transition disabled:opacity-50"
        >
          {loading ? 'جاري الحفظ...' : 'حفظ ونشر الدرس'}
        </button>
      </div>
    </div>
  );
}