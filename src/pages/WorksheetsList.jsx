
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { FaLock, FaHeadphones, FaCheckCircle, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WorksheetsList() {
  const { user } = useAuth();
  const [worksheets, setWorksheets] = useState([]);
  const [completedSheets, setCompletedSheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // 1. رجع حالة التحميل لـ true فكل مرة كيتعاود فيها الـ Effect
      setLoading(true); 
      
      const { data: sheetsData } = await supabase
        .from('worksheets')
        .select('*')
        .order('created_at', { ascending: true });
        
      if (sheetsData) setWorksheets(sheetsData);

      if (user?.id) {
        const { data: progressData } = await supabase
          .from('worksheet_progress')
          .select('worksheet_id')
          .eq('user_id', user.id);
          
        if (progressData) {
          setCompletedSheets(progressData.map(p => p.worksheet_id));
        }
      }
      
      // 2. حيّد حالة التحميل حتى يسالي كلشي
      setLoading(false);
    }
    
    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl font-sans selection:bg-blue-200">
      <div className="max-w-4xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-xs font-black mb-4 shadow-sm">
            <FaStar className="text-blue-600" />
            <span>RR English Interactive Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
            التمارين <span className="text-blue-600">التفاعلية</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto font-medium leading-relaxed">
            درب ودنك، تفاعل مع الحوارات الحية، وجاوب على الأسئلة باش تتبث داكشي لي قريتي باحترافية.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-slate-500 text-sm">جاري تحميل التمارين... ⏳</p>
          </div>
        ) : worksheets.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-white rounded-3xl border-2 border-slate-100 p-12 text-center shadow-sm"
          >
            <p className="text-slate-500 font-bold text-lg">ما كاين حتى تمرين متاح حالياً، ترقبوا الجديد قريباً! 🚀</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {worksheets.map((sheet, index) => {
              const isCompleted = completedSheets.includes(sheet.id);
              const isAuthorized = !sheet.is_premium || user?.role === 'admin' || user?.plan === 'Premium';

              return (
                <motion.div
                  key={sheet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-6 rounded-[2rem] border-2 flex items-center justify-between shadow-sm transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-emerald-50/70 border-emerald-200 shadow-emerald-100/50' 
                      : 'bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner shrink-0 ${
                      isCompleted ? 'bg-emerald-500 text-white' : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {isCompleted ? <FaCheckCircle /> : <FaHeadphones />}
                    </div>
                    <div>
                      <h3 className={`font-black text-base sm:text-lg mb-1 ${isCompleted ? 'text-emerald-950' : 'text-slate-900'}`}>
                        {sheet.title}
                      </h3>
                      <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full inline-block ${
                        isCompleted ? 'text-emerald-700 bg-emerald-200/60' : 'text-blue-600 bg-blue-50 border border-blue-100'
                      }`}>
                        {isCompleted ? 'مكتمل ✅' : 'تمرين استماع وحوار 🎧'}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 mr-2">
                    {isAuthorized ? (
                      <Link
                        to={`/worksheet/${sheet.slug}`}
                        className={`text-xs sm:text-sm font-black px-5 py-3 rounded-2xl shadow-sm transition-all active:scale-95 inline-block ${
                          isCompleted 
                            ? 'bg-white text-emerald-700 border-2 border-emerald-300 hover:bg-emerald-100' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                        }`}
                      >
                        {isCompleted ? 'مراجعة' : 'بدء التمرين'}
                      </Link>
                    ) : (
                      <Link
                        to="/pricing"
                        className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border-2 border-amber-200 text-xs sm:text-sm font-black px-4 py-2.5 rounded-2xl transition-all shadow-sm"
                      >
                        <FaLock className="text-xs" />
                        <span>مقفول</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}