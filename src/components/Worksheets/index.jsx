// import React, { useEffect, useState } from 'react';
// import { supabase } from '../../config/supabaseClient';
// import { useAuth } from '../../context/AuthContext';
// import { FaLock, FaBookOpen } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import PdfViewerModal from './PdfViewerModal';

// export default function Worksheets() {
//   const { user } = useAuth();
//   const [worksheets, setWorksheets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedSheet, setSelectedSheet] = useState(null);

//   useEffect(() => {
//     async function fetchWorksheets() {
//       const { data, error } = await supabase
//         .from('worksheets')
//         .select('*')
//         .order('created_at', { ascending: true });

//       if (!error && data) {
//         setWorksheets(data);
//       }
//       setLoading(false);
//     }
//     fetchWorksheets();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8 dir-rtl font-sans">
//       <div className="text-center mb-10">
//         <h1 className="text-3xl sm:text-4xl font-black text-blue-800 mb-3">ملخصات الدروس 📚</h1>
//         <p className="text-slate-600 font-bold text-sm">راجع الدروس ديالك عن طريق سلايدات تفاعلية.</p>
//       </div>

//       {loading ? (
//         <div className="text-center font-bold text-slate-500">جاري التحميل... ⏳</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           {worksheets.map((sheet, index) => {
//             const isAuthorized = sheet.is_free || user?.role === 'admin' || user?.plan === 'Premium';

//             return (
//               <div key={sheet.id} className="bg-white border-2 border-slate-100 p-5 rounded-2xl shadow-sm hover:border-blue-200 transition-all flex items-center justify-between gap-4">
//                 <div className="flex items-start gap-4">
//                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black shrink-0 ${sheet.is_free ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
//                     {index + 1}
//                   </div>
//                   <div>
//                     <h3 className="font-black text-slate-800 text-lg">{sheet.title}</h3>
//                     <p className="text-xs font-bold text-slate-500 mt-1">{sheet.description}</p>
//                     {sheet.is_free && <span className="inline-block mt-2 text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-200">مجاني 🎁</span>}
//                   </div>
//                 </div>

//                 {isAuthorized ? (
//                   <button 
//                     onClick={() => setSelectedSheet(sheet)}
//                     className="shrink-0 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 px-4 py-2.5 rounded-xl font-bold text-sm transition-all"
//                   >
//                     <FaBookOpen className="inline ml-2" />
//                     قراءة
//                   </button>
//                 ) : (
//                   <Link 
//                     to="/pricing"
//                     className="shrink-0 bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
//                   >
//                     <FaLock />
//                     مقفول
//                   </Link>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {selectedSheet && (
//         <PdfViewerModal 
//           worksheet={selectedSheet} 
//           onClose={() => setSelectedSheet(null)} 
//         />
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { FaLock, FaBookOpen, FaGraduationCap, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PdfViewerModal from './PdfViewerModal';

export default function Worksheets() {
  const { user } = useAuth();
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl mx-auto px-4 py-8 dir-rtl font-sans"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 p-3 rounded-2xl mb-3 shadow-sm">
          <FaGraduationCap size={28} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-2">ملخصات الدروس</h1>
        <p className="text-slate-600 font-bold text-sm">راجع الدروس ديالك عن طريق سلايدات تفاعلية.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-500 font-bold">
          <FaSpinner className="animate-spin text-2xl text-blue-600" />
          <span>جاري التحميل...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {worksheets.map((sheet, index) => {
            const isAuthorized = sheet.is_free || user?.role === 'admin' || user?.plan === 'Premium';

            return (
              <motion.div 
                key={sheet.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white border-2 border-slate-100 p-5 rounded-2xl shadow-sm hover:border-blue-200 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${sheet.is_free ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{sheet.title}</h3>
                    <p className="text-xs font-bold text-slate-500 mt-1">{sheet.description}</p>
                    {sheet.is_free && (
                      <span className="inline-block mt-2 text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        مجاني
                      </span>
                    )}
                  </div>
                </div>

                {isAuthorized ? (
                  <button 
                    onClick={() => setSelectedSheet(sheet)}
                    className="shrink-0 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <FaBookOpen />
                    قراءة
                  </button>
                ) : (
                  <Link 
                    to="/pricing"
                    className="shrink-0 bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <FaLock />
                    مقفول
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {selectedSheet && (
        <PdfViewerModal 
          worksheet={selectedSheet} 
          onClose={() => setSelectedSheet(null)} 
        />
      )}
    </motion.div>
  );
}