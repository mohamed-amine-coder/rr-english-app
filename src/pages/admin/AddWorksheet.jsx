import React, { useState } from 'react';
import { supabase } from '../../config/supabaseClient';

export default function AddWorksheet() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isPremium, setIsPremium] = useState(true);
  const [loading, setLoading] = useState(false);

  // هيكلة JSON الجديدة (فيها الحوار والأسئلة)
  const defaultJSON = `{
  "dialogue": [
    {"person": "A", "text": "Hello!"},
    {"person": "B", "text": "Hi there!"}
  ],
  "questions": [
    {
      "question": "What did A say?",
      "options": ["Hello", "Bye", "Yes"],
      "correctAnswer": 0
    }
  ]
}`;

  const [contentJson, setContentJson] = useState(defaultJSON);

  const handleSave = async () => {
    setLoading(true);
    try {
      const parsedContent = JSON.parse(contentJson);
      
      const { error } = await supabase.from('worksheets').insert([{
        title,
        slug,
        image_url: imageUrl,
        audio_url: audioUrl,
        // كنخزنو الحوار على شكل String فقاعدة البيانات باش نسهلو القراءة
        transcript: JSON.stringify(parsedContent.dialogue),
        is_premium: isPremium,
        questions: parsedContent.questions
      }]);

      if (error) throw error;
      
      alert('ناااضي! التمرين تضاف بنجاح 🚀');
      setTitle(''); setSlug(''); setImageUrl(''); setAudioUrl('');
      setContentJson('{\n  "dialogue": [],\n  "questions": []\n}');
    } catch (err) {
      alert('Error: تأكد من أن الـ JSON مكتوب بطريقة صحيحة! (' + err.message + ')');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 dir-rtl text-slate-800 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-[2rem] border-4 border-slate-900 shadow-[0_8px_0_#0F172A]">
        <h1 className="text-3xl font-black mb-6 text-emerald-600">إضافة تمرين (Premium)</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-bold mb-2">العنوان (Title)</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 border-2 border-slate-300 rounded-xl outline-none dir-ltr" />
          </div>
          <div>
            <label className="block font-bold mb-2">الرابط (Slug)</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="taking-a-taxi" className="w-full p-4 border-2 border-slate-300 rounded-xl outline-none dir-ltr" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-bold mb-2">رابط الصورة (Image URL)</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-4 border-2 border-slate-300 rounded-xl outline-none dir-ltr" />
          </div>
          <div>
            <label className="block font-bold mb-2">رابط الصوت (Audio URL)</label>
            <input type="text" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} className="w-full p-4 border-2 border-slate-300 rounded-xl outline-none dir-ltr" />
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3 bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
          <input type="checkbox" id="premium" checked={isPremium} onChange={(e) => setIsPremium(e.target.checked)} className="w-6 h-6 accent-emerald-600 rounded cursor-pointer" />
          <label htmlFor="premium" className="font-bold text-slate-700 cursor-pointer">هاد التمرين مدفوع (Premium 💎)</label>
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-2">المحتوى (JSON: Dialogue & Questions)</label>
          <textarea value={contentJson} onChange={(e) => setContentJson(e.target.value)} rows="16" dir="ltr" className="w-full p-4 border-2 border-slate-900 rounded-xl outline-none font-mono text-sm bg-slate-900 text-emerald-400"></textarea>
        </div>

        <button onClick={handleSave} disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black px-10 py-4 rounded-2xl shadow-sm border-b-4 border-emerald-700 transition disabled:opacity-50">
          {loading ? 'جاري الحفظ...' : 'حفظ التمرين'}
        </button>
      </div>
    </div>
  );
}