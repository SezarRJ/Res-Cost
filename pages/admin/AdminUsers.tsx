
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Edit, Shield, Trash2, Mail, Phone, ChevronRight, X, ShieldCheck, UserMinus, UserCheck } from 'lucide-react';

const AdminUsers: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const users = [
    { id: '1', name: 'أحمد العراقي', email: 'ahmed@burger.iq', phone: '07800000000', restaurant: 'برجر هاوس', plan: 'ELITE', status: 'active', role: 'owner' },
    { id: '2', name: 'زياد محمد', email: 'ziad@fastfood.iq', phone: '07700000000', restaurant: 'بيتزا كينج', plan: 'PRO', status: 'active', role: 'owner' },
    { id: '3', name: 'مصطفى كامل', email: 'mustafa@admin.iq', phone: '07900000000', restaurant: 'التحكم المركزي', plan: 'ELITE', status: 'active', role: 'admin' },
    { id: '4', name: 'رامي سعيد', email: 'rami@cafe.iq', phone: '07500000000', restaurant: 'ريلاكس كافيه', plan: 'FREE', status: 'suspended', role: 'owner' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800">إدارة المستخدمين</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Manage all platform identities & roles</p>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] shadow-sm border border-white overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center gap-6">
           <div className="relative flex-1 group">
             <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
             <input
               type="text"
               placeholder="ابحث عن مستخدم بالاسم أو البريد..."
               className="w-full pr-14 pl-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-bold shadow-inner focus:ring-4 focus:ring-blue-100 transition-all"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-black text-slate-500 uppercase">
             <Filter size={18} /> تصفية النتائج
           </button>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-right">
              <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                 <tr>
                    <th className="px-8 py-6">المستخدم</th>
                    <th className="px-8 py-6 text-center">المطعم</th>
                    <th className="px-8 py-6 text-center">الخطة</th>
                    <th className="px-8 py-6 text-center">الرتبة</th>
                    <th className="px-8 py-6 text-center">الحالة</th>
                    <th className="px-8 py-6"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {users.map(u => (
                   <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                               {u.name.charAt(0)}
                            </div>
                            <div>
                               <h5 className="text-sm font-black text-slate-800">{u.name}</h5>
                               <p className="text-[10px] text-slate-400 font-bold">{u.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-center text-sm font-bold text-slate-600">{u.restaurant}</td>
                      <td className="px-8 py-6 text-center">
                         <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${u.plan === 'ELITE' ? 'bg-amber-100 text-amber-600' : u.plan === 'PRO' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                            {u.plan}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase border ${u.role === 'admin' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}>
                            {u.role}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${u.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {u.status}
                         </span>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit size={16} /></button>
                            <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><Shield size={16} /></button>
                            <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
