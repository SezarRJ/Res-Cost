
import React from 'react';
import { History, Shield, Search, Filter, Clock, User, FileText, ArrowRight } from 'lucide-react';

const AdminAudit: React.FC = () => {
  const logs = [
    { id: '1', actor: 'مصطفى كامل', role: 'admin', action: 'تغيير خطة مطعم "أرز لبنان"', entity: 'Subscription', date: 'منذ دقيقة', status: 'success' },
    { id: '2', actor: 'أحمد العراقي', role: 'owner', action: 'تحديث سعر مادة "لحم بقري"', entity: 'Ingredient', date: 'منذ 5 دقائق', status: 'success' },
    { id: '3', actor: 'زياد محمد', role: 'owner', action: 'فشل محاولة تسجيل دخول', entity: 'Auth', date: 'منذ 12 دقيقة', status: 'failed' },
    { id: '4', actor: 'النظام', role: 'system', action: 'إنشاء نسخة احتياطية للقاعدة', entity: 'System', date: 'منذ ساعة', status: 'success' },
    { id: '5', actor: 'مدير النظام', role: 'admin', action: 'تعديل الإعدادات العالمية للـ AI', entity: 'Config', date: 'منذ ساعتين', status: 'success' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800">سجل التدقيق (Audit Logs)</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Platform Transparency & Security Monitoring</p>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] shadow-sm border border-white overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center gap-6">
           <div className="relative flex-1 group">
             <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
             <input
               type="text"
               placeholder="ابحث في السجلات (الممثل، الإجراء، الكيان)..."
               className="w-full pr-14 pl-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-bold shadow-inner focus:ring-4 focus:ring-blue-100 transition-all"
             />
           </div>
        </div>

        <div className="space-y-2 p-4 bg-slate-50/50">
           {logs.map(log => (
             <div key={log.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all group">
                <div className="flex items-center gap-6">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${log.status === 'success' ? 'bg-slate-50 text-slate-400' : 'bg-rose-50 text-rose-500 animate-pulse'}`}>
                      {log.role === 'admin' ? <Shield size={20} /> : log.role === 'system' ? <History size={20} /> : <User size={20} />}
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-3">
                         <span className="text-sm font-black text-slate-800">{log.actor}</span>
                         <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${log.role === 'admin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {log.role}
                         </span>
                      </div>
                      <p className="text-xs text-slate-500 font-bold">{log.action}</p>
                   </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-12">
                   <div className="flex flex-col items-end">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{log.entity}</span>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                         <Clock size={12} />
                         {log.date}
                      </div>
                   </div>
                   <button className="text-blue-600 hover:text-blue-800 transition-colors opacity-0 group-hover:opacity-100">
                      <FileText size={20} />
                   </button>
                </div>
             </div>
           ))}
        </div>
        
        <div className="p-8 border-t border-slate-50 text-center">
           <button className="text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest">عرض السجلات السابقة</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAudit;
