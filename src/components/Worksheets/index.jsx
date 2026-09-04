import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { FaLock, FaBookOpen, FaCrown, FaSpinner, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PdfViewerModal from './PdfViewerModal';

// استيراد الشخصيات بجوج
import mrRr from '../../assets/mr-rr.png';
import msRr from '../../assets/ms-rr.png';

// 1. مكون الكارت الأفقية للووركشيت بتصميم فاتح وفخم
const InteractiveWorksheetCard = ({ sheet, index, onActionClick, isAuthorized }) => {
  // التناوب بين الشخصيات: مرة Mr-RR ومرة Ms-RR
  const currentMascot = index % 2 === 0 ? mrRr : msRr;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => onActionClick(sheet, isAuthorized)}
      className="group flex flex-col sm:flex-row bg-white rounded-3xl shadow-sm hover:shadow-xl border-2 border-slate-100 hover:border-blue-300 overflow-hidden transition-all duration-300 cursor-pointer"
    >
      {/* جهة الصورة والشخصية */}
      <div className="relative w-full sm:w-[40%] md:w-[35%] shrink-0 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-5 overflow-hidden border-b-2 sm:border-b-0 sm:border-l-2 border-slate-100">
        
        {/* إضاءة دائرية فالخلفية حسب نوع الملف */}
        <div className={`absolute w-32 h-32 rounded-full blur-2xl opacity-40 transition-transform duration-700 group-hover:scale-150 ${
          sheet.is_free ? 'bg-emerald-400' : 'bg-amber-400'
        }`}></div>

        {/* صورة الشخصية */}
        <img 
          src={currentMascot} 
          alt="Mascot" 
          className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border-4 border-white shadow-md group-hover:-translate-y-2 transition-transform duration-500" 
        />
        
        {/* طبقة ضبابية كطّلع فالهوفر فيها أيقونة القفل أو الكتاب */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 transition-transform group-hover:scale-110 ${
            isAuthorized 
              ? 'bg-blue-600 text-white border-blue-400' 
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}>
            {isAuthorized ? <FaBookOpen className="text-xl" /> : <FaLock className="text-xl" />}
          </div>
        </div>

        {/* نوع الملف */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-black px-2 py-1 rounded-lg z-30 border border-slate-200 shadow-sm">
          PDF تفاعلي
        </div>
      </div>

      {/* جهة التفاصيل والوصف */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center bg-white relative">
        
        <div className="flex justify-between items-start mb-3">
          {sheet.is_free ? (
            <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm">
              مجاني 🎁
            </span>
          ) : (
            <span className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
              <FaCrown className="text-[10px]" /> Premium
            </span>
          )}
          <span className="text-slate-400 text-[11px] font-black tracking-wider bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
            تمرين {index + 1}
          </span>
        </div>
        
        <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
          {sheet.title}
        </h2>
        
        <p className="text-slate-500 text-xs sm:text-sm font-bold leading-relaxed line-clamp-2">
          {sheet.description}
        </p>
      </div>
    </motion.div>
  );
};

// 2. المكون الرئيسي
export default function Worksheets() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [worksheets, setWorksheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSheet, setSelectedSheet] = useState(null);

  useEffect(() => {
    async function fetchWorksheets() {
      const { data, error } = await supabase
        .from('worksheets')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data) {
        setWorksheets(data);
      }
      setLoading(false);
    }
    fetchWorksheets();
  }, []);

  const handleActionClick = (sheet, isAuthorized) => {
    if (isAuthorized) {
      setSelectedSheet(sheet);
    } else {
      navigate('/pricing');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 dir-rtl font-sans selection:bg-blue-200">
      <div className="max-w-5xl mx-auto">
        
        {/* الهيدر */}
        <div className="text-center mb-10">
          <h1 className="flex items-center justify-center gap-3 text-3xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            تمارين <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">الدروس</span> 
            <FaUsers className="text-blue-500 text-3xl sm:text-4xl" />
          </h1>
          <p className="text-slate-600 text-xs sm:text-base font-bold max-w-xl mx-auto leading-relaxed">
            خدم هاد التمارين مزيان، حيت نفس الستيل غادي نطبقوه ونتدربو عليه فالمجموعات المباشرة مع الأساتذة ديالك.
          </p>
        </div>

        {/* حالة التحميل */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-500 font-bold">
            <FaSpinner className="animate-spin text-3xl text-blue-600" />
            <span>جاري تحميل الملفات...</span>
          </div>
        ) : (
          /* شبكة الكروت التفاعلية */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {worksheets.map((sheet, index) => {
              const isAuthorized = sheet.is_free || user?.role === 'admin' || user?.plan === 'Premium';

              return (
                <InteractiveWorksheetCard 
                  key={sheet.id} 
                  sheet={sheet} 
                  index={index} 
                  isAuthorized={isAuthorized}
                  onActionClick={handleActionClick} 
                />
              );
            })}
          </div>
        )}

        {/* النافذة المنبثقة لقراءة وتحميل الـ PDF */}
        {selectedSheet && (
          <PdfViewerModal 
            worksheet={selectedSheet} 
            onClose={() => setSelectedSheet(null)} 
          />
        )}
      </div>
    </div>
  );
}