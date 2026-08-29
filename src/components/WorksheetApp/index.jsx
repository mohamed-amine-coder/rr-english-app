import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  FaPlay, FaPause, FaCrown, FaCheckCircle, FaTimesCircle, 
  FaArrowRight, FaArrowLeft, FaHeadphones 
} from 'react-icons/fa';

// لوحة ألوان الشخصيات (كتاخد شخصية جديدة وكتعطيها لون أوتوماتيكيا)
const colorPalette = [
  { bg: 'bg-blue-500', bubble: 'bg-blue-50 border-blue-200 text-blue-900', name: 'text-blue-600' },
  { bg: 'bg-emerald-500', bubble: 'bg-emerald-50 border-emerald-200 text-emerald-900', name: 'text-emerald-600' },
  { bg: 'bg-purple-500', bubble: 'bg-purple-50 border-purple-200 text-purple-900', name: 'text-purple-600' },
  { bg: 'bg-orange-500', bubble: 'bg-orange-50 border-orange-200 text-orange-900', name: 'text-orange-600' },
  { bg: 'bg-rose-500', bubble: 'bg-rose-50 border-rose-200 text-rose-900', name: 'text-rose-600' }
];

export default function WorksheetApp() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [worksheet, setWorksheet] = useState(null);
  // xp state is used to update user's XP after finishing the worksheet
  const { user, updateLocalXP } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  // Navigation States
  const [view, setView] = useState('dialogue'); // 'dialogue', 'quiz', 'finish'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  
  // Quiz States
  const [answers, setAnswers] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    async function fetchWorksheet() {
      const { data, error } = await supabase
        .from('worksheets')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (data) setWorksheet(data);
      if (error) console.error(error);
    }
    fetchWorksheet();
  }, [slug]);

  // تحويل JSON الحوار واستخراج ألوان الشخصيات
  const dialogueData = useMemo(() => {
    if (!worksheet?.transcript) return [];
    try {
      return JSON.parse(worksheet.transcript);
    } catch (e) {
      return [];
    }
  }, [worksheet]);

  const personColors = useMemo(() => {
    const mapping = {};
    let colorIndex = 0;
    dialogueData.forEach(line => {
      if (!mapping[line.person]) {
        mapping[line.person] = colorPalette[colorIndex % colorPalette.length];
        colorIndex++;
      }
    });
    return mapping;
  }, [dialogueData]);

  const toggleAudio = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleSelectOption = (optionIndex) => {
    if (isChecked) return;
    setAnswers({ ...answers, [currentQIndex]: optionIndex });
  };

  const handleCheckAnswer = () => {
    setIsChecked(true);
  };

  const handleNextQuestion = async () => {
    if (currentQIndex < worksheet.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setIsChecked(false);
    } else {
      // وصلنا للسؤال اللخر: نسجلو التقدم ونزيدو 40 XP
      if (user?.id && !isSaving) {
        setIsSaving(true);
        try {
          // 1. حاول تسجل التمرين فجدول worksheet_progress
          const { error: progressError } = await supabase
            .from('worksheet_progress')
            .insert([{ user_id: user.id, worksheet_id: worksheet.id }]);
          
          // يلا داز التسجيل بنجاح (يعني أول مرة كيدير هاد التمرين)
          if (!progressError) {
            // 2. زيد 40 XP للحساب ديالو فالداتابيز
            const newXp = (user.xp || 0) + 40;
            await supabase.from('users').update({ xp: newXp }).eq('id', user.id);
            
            // 3. حدث النقط فالـ Navbar مباشرة
            if (updateLocalXP) updateLocalXP(40);
          }
        } catch (error) {
          console.error("Error saving progress:", error);
        }
        setIsSaving(false);
      }

      setView('finish');
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
  };

  if (!worksheet) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500 text-sm">جاري التحميل... ⏳</div>;

  const currentQuestion = worksheet.questions?.[currentQIndex];
  const currentAnswer = answers[currentQIndex];
  const progress = view === 'dialogue' ? 0 : view === 'finish' ? 100 : ((currentQIndex) / worksheet.questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 p-4 dir-rtl font-sans selection:bg-amber-200 flex flex-col items-center">
      
      {/* Header & Progress (صغرنا الحجم) */}
      <div className="w-full max-w-4xl mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 px-3 py-1 rounded-lg text-xs font-black shadow-sm">
            <FaCrown className="text-base" />
            <span>Premium</span>
          </div>
          <span className="text-slate-500 font-bold text-xs">
            {view === 'dialogue' ? 'قراءة واستماع' : view === 'finish' ? 'النتيجة' : `سؤال ${currentQIndex + 1} / ${worksheet.questions.length}`}
          </span>
        </div>
        
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden dir-ltr">
          <motion.div 
            className="h-full bg-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </div>

      <motion.div 
        key={view}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
        className="w-full max-w-4xl bg-white border-[3px] border-slate-900 rounded-[1.5rem] p-5 md:p-6 shadow-[0_6px_0_#0F172A] relative overflow-hidden"
      >
        
        {/* ================= VIEW 1: DIALOGUE (صورة وصوت فجنب والديالوغ فجنب) ================= */}
        {view === 'dialogue' && (
          <div className="space-y-4">
            <h1 className="text-xl md:text-2xl font-black text-slate-800 [unicode-bidi:plaintext] border-b-2 border-slate-100 pb-3">{worksheet.title}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Media Side (Left/Top) */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-4">
                {worksheet.image_url && (
                  <img src={worksheet.image_url} alt="Context" className="w-full h-40 md:h-48 object-cover rounded-2xl border-2 border-slate-100" />
                )}

                {worksheet.audio_url && (
                  <div className="bg-slate-900 p-3 rounded-2xl flex items-center gap-3 dir-ltr shadow-md">
                    <button onClick={toggleAudio} className="w-10 h-10 shrink-0 bg-blue-500 hover:bg-blue-400 text-white rounded-full flex items-center justify-center text-sm transition-all">
                      {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
                    </button>
                    <div className="flex-1">
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        <FaHeadphones className="text-blue-300" /> Audio
                      </div>
                    </div>
                    <audio ref={audioRef} src={worksheet.audio_url} onEnded={() => setIsPlaying(false)} className="hidden" />
                  </div>
                )}
                
                {/* زر الانتقال للتمارين (فالديسكتوب غيبان تحت الميديا) */}
                <button 
                  onClick={() => setView('quiz')}
                  className="hidden lg:flex w-full items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl border-b-[3px] border-blue-900 active:border-b-0 active:translate-y-1 transition-all text-sm"
                >
                  <span>دوز للتمارين</span>
                  <FaArrowLeft className="text-xs" />
                </button>
              </div>

              {/* Chat UI Side (Right/Bottom) */}
              <div className="lg:col-span-7">
                {dialogueData.length > 0 && (
                  <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-2xl space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar dir-ltr">
                    {dialogueData.map((line, idx) => {
                      const pColor = personColors[line.person];
                      const isMe = idx % 2 === 0; 
                      
                      return (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                          key={idx} 
                          className={`flex gap-2 w-full ${isMe ? 'flex-row' : 'flex-row-reverse'}`}
                        >
                          <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-white font-black text-sm ${pColor.bg}`}>
                            {line.person.charAt(0)}
                          </div>
                          <div className={`flex flex-col ${isMe ? 'items-start' : 'items-end'} max-w-[85%]`}>
                            <span className={`text-[10px] font-black uppercase tracking-wider mb-0.5 px-1 ${pColor.name}`}>{line.person}</span>
                            <div className={`p-2.5 md:p-3 font-bold text-sm [unicode-bidi:plaintext] leading-relaxed shadow-sm rounded-xl border-2 ${pColor.bubble} ${isMe ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}>
                              {line.text}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* زر الانتقال للتمارين (فالموبايل غيبان تحت الشات) */}
                <button 
                  onClick={() => setView('quiz')}
                  className="lg:hidden w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl border-b-[3px] border-blue-900 active:border-b-0 active:translate-y-1 transition-all mt-4 text-sm"
                >
                  <span>دوز للتمارين</span>
                  <FaArrowLeft className="text-xs" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ================= VIEW 2: QUIZ (أحجام صغيرة وأنيقة) ================= */}
        {view === 'quiz' && currentQuestion && (
          <div className="max-w-2xl mx-auto space-y-5">
            
            {worksheet.audio_url && (
              <div className="bg-slate-50 border-2 border-slate-200 p-2.5 rounded-xl flex items-center justify-between dir-ltr mb-4">
                <div className="flex items-center gap-2">
                  <button onClick={toggleAudio} className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center">
                    {isPlaying ? <FaPause className="text-xs" /> : <FaPlay className="ml-0.5 text-xs" />}
                  </button>
                  <span className="font-bold text-slate-600 text-xs">إعادة الاستماع</span>
                </div>
                <FaHeadphones className="text-slate-300 text-lg mr-2" />
              </div>
            )}

            <h2 className="text-lg md:text-xl font-black text-slate-800 mb-6 [unicode-bidi:plaintext] leading-snug">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((opt, oIndex) => {
                const isSelected = currentAnswer === oIndex;
                const isCorrect = oIndex === currentQuestion.correctAnswer;
                
                let btnStyle = "bg-white border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-slate-50";
                let icon = null;

                if (isSelected) btnStyle = "bg-blue-50 border-blue-500 text-blue-900 shadow-sm";
                
                if (isChecked) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm";
                    icon = <FaCheckCircle className="text-emerald-500 text-lg shrink-0" />;
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-50 border-rose-500 text-rose-900 shadow-sm";
                    icon = <FaTimesCircle className="text-rose-500 text-lg shrink-0" />;
                  } else {
                    btnStyle = "bg-white border-slate-100 text-slate-400 opacity-50";
                  }
                }

                return (
                  <motion.button 
                    whileTap={!isChecked ? { scale: 0.98 } : {}}
                    key={oIndex}
                    disabled={isChecked}
                    onClick={() => handleSelectOption(oIndex)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 font-bold transition-all text-right text-sm [unicode-bidi:plaintext] ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {icon || (
                      <div className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-blue-500' : 'border-slate-300'}`}>
                        {isSelected && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t-2 border-slate-100">
              {!isChecked ? (
                <button 
                  onClick={handleCheckAnswer}
                  disabled={currentAnswer === undefined}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-black py-3 rounded-xl border-b-[3px] border-orange-700 active:border-b-0 active:translate-y-1 transition-all text-sm"
                >
                  تأكد من الجواب
                </button>
              ) : (
                <button 
                  onClick={handleNextQuestion}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-3 rounded-xl border-b-[3px] border-blue-900 active:border-b-0 active:translate-y-1 transition-all text-sm"
                >
                  <span>{isSaving ? 'جاري الحفظ...' : currentQIndex === worksheet.questions.length - 1 ? 'إنهاء التمرين' : 'السؤال التالي'}</span>
                  {!isSaving && <FaArrowLeft className="text-xs" />}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================= VIEW 3: FINISH ================= */}
        {view === 'finish' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-8">
            <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-400 rounded-3xl flex items-center justify-center text-emerald-500 text-4xl mb-4 shadow-[0_4px_0_#34D399] rotate-3">
              <FaCheckCircle />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">تمرين ناضي! 🎉</h2>
            <p className="text-slate-500 font-bold text-sm mb-6 max-w-sm mx-auto">ساليتي هاد التمرين بنجاح. راك غادي مزيان فالتطوير ديال الإنجليزية ديالك.</p>
            
            <div className="flex gap-3 w-full max-w-sm">
              <button onClick={() => navigate('/worksheets')} className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-black transition-colors border-b-[3px] border-slate-700 active:border-b-0 active:translate-y-1">
                <span>القائمة</span>
                <FaArrowRight className="text-xs" />
              </button>
              <button onClick={() => { setView('dialogue'); setCurrentQIndex(0); setAnswers({}); setIsChecked(false); }} className="flex-1 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl text-sm font-black transition-colors border-b-[3px] active:border-b-0 active:translate-y-1">
                عاود التمرين
              </button>
            </div>
          </motion.div>
        )}
        
      </motion.div>
    </div>
  );
}