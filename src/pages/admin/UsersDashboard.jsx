import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaEdit, FaUserShield, 
  FaUserGraduate, FaCrown, FaUsers, FaTimes, FaSave,
  FaPhone, FaWhatsapp, FaChalkboardTeacher
} from 'react-icons/fa';

export default function UsersDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');

  const [editingUser, setEditingUser] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setUsers(data);
    } else {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateUser = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('users')
      .update({ 
        role: editingUser.role, 
        plan: editingUser.plan,
        phone: editingUser.phone,
        "whatsapp-groupe": editingUser["whatsapp-groupe"],
        teacher_id: editingUser.teacher_id
      })
      .eq('id', editingUser.id);

    setSaving(false);
    if (!error) {
      setEditingUser(null);
      fetchUsers();
    } else {
      alert("وقع مشكل فالتحديث!");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.full_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (user.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (user.phone || '').includes(searchQuery);
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;

    return matchesSearch && matchesRole && matchesPlan;
  });

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    premium: users.filter(u => u.plan === 'Premium').length,
    free: users.filter(u => u.plan === 'free').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 dir-rtl font-sans text-slate-800">
      <div className="max-w-[90rem] mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
              <FaUsers className="text-blue-600" /> إدارة المستخدمين
            </h1>
            <p className="text-slate-500 font-bold mt-1 text-sm md:text-base">تحكم فالحسابات، المجموعات، والصلاحيات.</p>
          </div>
          <div className="flex gap-2">
             <span className="bg-emerald-50 text-emerald-600 font-black px-4 py-2 rounded-xl text-sm border border-emerald-100">
               {stats.total} مستخدم
             </span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="قلب بالسمية، الإيميل، ولا النمرة..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
            />
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <div className="flex-1 sm:flex-none flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 hover:border-blue-300 transition-colors">
              <FaFilter className="text-slate-400 text-xs" />
              <select 
                value={filterRole} 
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-transparent font-bold text-slate-700 outline-none text-sm cursor-pointer w-full"
              >
                <option value="all">كل الرتب</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex-1 sm:flex-none flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 hover:border-amber-300 transition-colors">
              <FaFilter className="text-slate-400 text-xs" />
              <select 
                value={filterPlan} 
                onChange={(e) => setFilterPlan(e.target.value)}
                className="bg-transparent font-bold text-slate-700 outline-none text-sm cursor-pointer w-full"
              >
                <option value="all">كل الخطط</option>
                <option value="free">Free</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-right border-collapse whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="p-5 font-black text-slate-500 text-sm">المستخدم</th>
                  <th className="p-5 font-black text-slate-500 text-sm">التواصل</th>
                  <th className="p-5 font-black text-slate-500 text-sm">المجموعة (WhatsApp)</th>
                  <th className="p-5 font-black text-slate-500 text-sm">الأستاذ (ID)</th>
                  <th className="p-5 font-black text-slate-500 text-sm">الخطة والرتبة</th>
                  <th className="p-5 font-black text-slate-500 text-sm text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="6" className="p-8 text-center font-bold text-slate-400">جاري التحميل...</td></tr>
                ) : filteredUsers.length === 0 ? (
                  <tr><td colSpan="6" className="p-8 text-center font-bold text-slate-400">مالقينا حتى يوزر بهاد المواصفات</td></tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={user.avatar_url || 'https://via.placeholder.com/40'} alt="avatar" className="w-11 h-11 rounded-xl border border-slate-200 object-cover shadow-sm" />
                        <div>
                          <p className="font-black text-slate-800 text-sm">{user.full_name}</p>
                          <p className="text-[11px] text-slate-500 font-bold dir-ltr mt-0.5">{user.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                          <FaPhone className="text-slate-400 text-xs" />
                          <span dir="ltr">{user.phone || '---'}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {user["whatsapp-groupe"] ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-black">
                            <FaWhatsapp /> {user["whatsapp-groupe"]}
                          </span>
                        ) : (
                          <span className="text-slate-300 font-bold text-xs">غير محدد</span>
                        )}
                      </td>
                      <td className="p-4">
                        {user.teacher_id ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                            <FaChalkboardTeacher /> {user.teacher_id.substring(0, 8)}...
                          </span>
                        ) : (
                          <span className="text-slate-300 font-bold text-xs">غير محدد</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className={`px-3 py-1 rounded-md text-[10px] uppercase tracking-wider font-black ${user.plan === 'Premium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {user.plan}
                          </span>
                          <span className={`px-3 py-1 rounded-md text-[10px] uppercase tracking-wider font-black ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                            {user.role}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => setEditingUser(user)}
                          className="bg-white border border-slate-200 text-blue-600 p-2.5 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-all active:scale-95"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {editingUser && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar"
              >
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-black text-slate-800">تعديل بيانات المشترك</h2>
                    <p className="text-sm font-bold text-slate-500 mt-1">{editingUser.full_name}</p>
                  </div>
                  <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-rose-500 bg-slate-50 p-2.5 rounded-full transition-colors"><FaTimes /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  {/* الرتبة */}
                  <div>
                    <label className="block font-black text-xs uppercase text-slate-500 mb-2">الصلاحية (Role)</label>
                    <select 
                      value={editingUser.role || ''}
                      onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {/* الخطة */}
                  <div>
                    <label className="block font-black text-xs uppercase text-slate-500 mb-2">الخطة (Plan)</label>
                    <select 
                      value={editingUser.plan || ''}
                      onChange={(e) => setEditingUser({...editingUser, plan: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    >
                      <option value="free">Free</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>

                  {/* رقم الهاتف */}
                  <div>
                    <label className="block font-black text-xs uppercase text-slate-500 mb-2">رقم الهاتف (Phone)</label>
                    <input 
                      type="text" 
                      value={editingUser.phone || ''}
                      onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                      placeholder="مثال: 0612345678"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-colors dir-ltr text-right"
                    />
                  </div>

                  {/* مجموعة الواتساب */}
                  <div>
                    <label className="block font-black text-xs uppercase text-slate-500 mb-2">مجموعة الواتساب</label>
                    <input 
                      type="text" 
                      value={editingUser["whatsapp-groupe"] || ''}
                      onChange={(e) => setEditingUser({...editingUser, "whatsapp-groupe": e.target.value})}
                      placeholder="مثال: Group A1"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* ID الأستاذ */}
                  <div className="md:col-span-2">
                    <label className="block font-black text-xs uppercase text-slate-500 mb-2">معرف الأستاذ (Teacher ID)</label>
                    <input 
                      type="text" 
                      value={editingUser.teacher_id || ''}
                      onChange={(e) => setEditingUser({...editingUser, teacher_id: e.target.value})}
                      placeholder="UUID ديال الأستاذ لي مكلف بيه"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-colors dir-ltr text-right"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setEditingUser(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-3.5 rounded-xl transition-all active:scale-95"
                  >
                    إلغاء
                  </button>
                  <button 
                    onClick={handleUpdateUser}
                    disabled={saving}
                    className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <FaSave /> {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}