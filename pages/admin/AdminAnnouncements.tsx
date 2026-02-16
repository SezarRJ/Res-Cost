
import React, { useState } from 'react';
import { Megaphone, Plus, Trash2, Edit, Save, X, Calendar, Target, Globe } from 'lucide-react';
import { Announcement, SubscriptionPlan } from '../../types';

const AdminAnnouncements: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const announcements: Announcement[] = [
    { id: '1', title: 'ميزات الذكاء الاصطناعي الجديدة', body: 'تم إضافة محسن الأسعار لمشتركي ELITE.', targetPlan: SubscriptionPlan.ELITE, targetRegion: 'Iraq', startTime: '2024-06-01', endTime: '2024-06-30' },
    { id: '2', title: 'تحديث شروط الخدمة', body: 'يرجى مراجعة سياسة الخصوصية الجديدة.', targetPlan: 'all', targetRegion: 'all', startTime: '2024-06-10', endTime: '2024-07-10' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">إعلانات المنصة</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">In-app Banners & Broadcasts</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-3"
        >
          <Plus size={20} /> إنشاء إعلان جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {announcements.map(a => (
            <div key={a.id} className="glass-card p-8 rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl transition-all flex flex-col gap-6 relative overflow-hidden group">
               <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                     <Megaphone size={24} />
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 text-slate-300 hover:text-blue-600"><Edit size={16} /></button>
                     <button className="p-2 text-slate-300 hover:text-rose-500"><Trash2 size={16} /></button>
                  </div>
               </div>
               <div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">{a.title}</h3>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">{a.body}</p>
               </div>
               <div className="pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                     <Target size={12} /> الخطة: {a.targetPlan}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                     <Globe size={12} /> المنطقة: {a.targetRegion}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                     <Calendar size={12} /> تنتهي: {a.endTime}
                  </div>
               </div>
            </div>
         ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white p-10 space-y-8 animate-in zoom-in-95">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-slate-800">إنشاء إعلان جديد</h3>
                 <button onClick={() => setIsModalOpen(false)}><X size={24} className="text-slate-400" /></button>
              </div>
              <div className="space-y-6">
                 <input type="text" placeholder="عنوان الإعلان" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" />
                 <textarea placeholder="نص الإعلان..." rows={3} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold resize-none" />
                 <div className="grid grid-cols-2 gap-4">
                    <select className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none">
                       <option>كافة الخطط</option>
                       <option>Elite فقط</option>
                       <option>Pro فقط</option>
                    </select>
                    <input type="date" className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none" />
                 </div>
              </div>
              <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 active:scale-95 transition-all">نشر الإعلان الآن</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
