import React, { useState } from 'react';
import { supabase } from '../../config/supabaseClient';
import { FaCheckCircle, FaSpinner, FaMagic } from 'react-icons/fa';

export default function AddWorksheet() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [reading, setReading] = useState('');
  const [vocabulary, setVocabulary] = useState('');
  const [isPremium, setIsPremium] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // حقل الاستيراد الذكي
  const [smartJson, setSmartJson] = useState('');

  const [questionsJson, setQuestionsJson] = useState('[\n]');
  const [practiceJson, setPracticeJson] = useState('[\n]');

  // دالة الاستيراد الذكي اللي كتحول JSON القديم للجديد
  const handleSmartImport = () => {
    try {
      const parsed = JSON.parse(smartJson);
      
      if (parsed.title) {
        setTitle(parsed.title);
        // توليد Slug أوتوماتيكيا
        setSlug(parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
      }
      if (parsed.reading) setReading(parsed.reading);
      if (parsed.vocabulary) setVocabulary(parsed.vocabulary);

      // تحويل الأسئلة العادية لكويز تفاعلي
      if (parsed.questions && typeof parsed.questions === 'string') {
        const qList = parsed.questions.split('\n').filter(q => q.trim());
        const structuredQs = qList.map(q => ({
          question: q.trim(),
          options: ["Option A", "Option B", "Option C"],
          correctAnswer: 0,
          explanation_darija: "الشرح هنا"
        }));
        setQuestionsJson(JSON.stringify(structuredQs, null, 2));
      }

      // تحويل الفراغات لكويز تفاعلي
      if (parsed.practice && typeof parsed.practice === 'string') {
        const practiceText = parsed.practice.replace(/\(\d+\)\.+/g, "___");
        const pList = [
          {
            sentence: practiceText,
            options: ["Word 1", "Word 2", "Word 3"],
            correctIndex: 0
          }
        ];
        setPracticeJson(JSON.stringify(pList, null, 2));
      }
      
      setSmartJson('');
      alert('تم الاستيراد بنجاح! هبط لتحت وقاد غير الاختيارات ديال الكويز باش يكونو صحاح.');
    } catch (err) {
      alert('كاين خطأ فكتابة JSON. تأكد من الأقواس والفواصل: ' + err.message);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      const parsedQuestions = JSON.parse(questionsJson);
      const parsedPractice = JSON.parse(practiceJson);
      
      const { error } = await supabase.from('worksheets').insert([{
        title,
        slug,
        image_url: imageUrl,
        audio_url: audioUrl,
        reading,
        vocabulary,
        questions: parsedQuestions,
        practice: parsedPractice,
        is_premium: isPremium
      }]);

      if (error) throw error;
      
      setSuccess(true);
      setTitle(''); setSlug(''); setImageUrl(''); setAudioUrl('');
      setReading(''); setVocabulary(''); setQuestionsJson('[\n]'); setPracticeJson('[\n]');
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('خطأ فالإدخال: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 dir-rtl text-slate-800 font-sans">
      <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-[2rem] border-4 border-slate-900 shadow-[0_8px_0_#0F172A]">
        <h1 className="text-2xl md:text-3xl font-black mb-8 text-blue-700">إضافة درس متكامل (Worksheet)</h1>
        
        {/* بلوك الاستيراد الذكي */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-3 text-blue-800 font-black">
            <FaMagic /> <span>الاستيراد السريع (Paste JSON)</span>
          </div>
          <textarea 
            value={smartJson} 
            onChange={(e) => setSmartJson(e.target.value)} 
            rows="4" 
            placeholder="حط كود JSON ديالك هنا كامل دقة وحدة..." 
            className="w-full p-3 border border-blue-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 font-mono text-sm mb-3" 
            dir="ltr"
          ></textarea>
          <button 
            onClick={handleSmartImport}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow-sm transition-colors"
          >
            استيراد البيانات وتوزيعها
          </button>
        </div>

        {/* الحقول العادية اللي كتعمر أوتوماتيك */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block font-bold mb-2 text-slate-700">عنوان الدرس (Title)</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3.5 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors" dir="ltr" />
          </div>
          <div>
            <label className="block font-bold mb-2 text-slate-700">الرابط (Slug)</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full p-3.5 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors" dir="ltr" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block font-bold mb-2 text-slate-700">رابط الصورة (Image URL)</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-3.5 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors" dir="ltr" />
          </div>
          <div>
            <label className="block font-bold mb-2 text-slate-700">رابط الصوت (Audio URL)</label>
            <input type="text" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} className="w-full p-3.5 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors" dir="ltr" />
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-bold mb-2 text-slate-700">نص القراءة (Reading)</label>
          <textarea value={reading} onChange={(e) => setReading(e.target.value)} rows="4" className="w-full p-3.5 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors" dir="ltr"></textarea>
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-2 text-slate-700">الكلمات والمفردات (Vocabulary)</label>
          <textarea value={vocabulary} onChange={(e) => setVocabulary(e.target.value)} rows="3" className="w-full p-3.5 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors" dir="auto"></textarea>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block font-bold mb-2 text-indigo-700">أسئلة الفهم (Questions JSON)</label>
            <textarea value={questionsJson} onChange={(e) => setQuestionsJson(e.target.value)} rows="10" dir="ltr" className="w-full p-4 border-2 border-slate-900 rounded-xl outline-none font-mono text-sm bg-slate-900 text-indigo-300"></textarea>
          </div>
          <div>
            <label className="block font-bold mb-2 text-amber-700">تمرين ملء الفراغ (Practice JSON)</label>
            <textarea value={practiceJson} onChange={(e) => setPracticeJson(e.target.value)} rows="10" dir="ltr" className="w-full p-4 border-2 border-slate-900 rounded-xl outline-none font-mono text-sm bg-slate-900 text-amber-300"></textarea>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border-2 border-slate-200 mb-6 w-fit">
          <input type="checkbox" id="premium" checked={isPremium} onChange={(e) => setIsPremium(e.target.checked)} className="w-6 h-6 accent-blue-600 rounded cursor-pointer" />
          <label htmlFor="premium" className="font-bold text-slate-700 cursor-pointer">محتوى مدفوع (Premium)</label>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-emerald-100 border-2 border-emerald-300 text-emerald-800 rounded-xl font-bold flex items-center gap-2">
            <FaCheckCircle className="text-xl" /> تم إضافة الدرس بنجاح!
          </div>
        )}

        <button 
          onClick={handleSave} 
          disabled={loading} 
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-2xl shadow-sm border-b-4 border-blue-900 transition-all active:border-b-0 active:translate-y-1 disabled:opacity-70"
        >
          {loading ? <FaSpinner className="animate-spin text-xl" /> : null}
          {loading ? 'جاري الحفظ...' : 'حفظ ونشر الدرس'}
        </button>
      </div>
    </div>
  );
}