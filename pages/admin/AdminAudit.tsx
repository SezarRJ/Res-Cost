
import React, { useState } from 'react';
import { 
  History, 
  Shield, 
  Search, 
  Filter, 
  Clock, 
  User, 
  FileText, 
  ArrowRight,
  Store,
  Zap,
  CreditCard,
  Download,
  Calendar,
  ShoppingCart,
  Loader2
} from 'lucide-react';
import { AuditLog } from '../../types';

const AdminAudit: React.FC = () => {
  const [filterType, setFilterType] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  const logs: AuditLog[] = [
    { id: '1', timestamp: 'منذ دقيقة', actorName: 'مصطفى كامل', action: 'تغيير خطة المطعم', entityType: 'Subscription', entityName: 'أرز لبنان', metadata: { old: 'FREE', new: 'PRO' } },
    { id: '2', timestamp: 'منذ 5 دقائق', actorName: 'أحمد العراقي', action: 'تحديث سعر مادة خام', entityType: 'Ingredient', entityName: 'لحم بقري', metadata: { old: 13000, new: 14000 } },
    { id: '3', timestamp: 'منذ 12 دقيقة', actorName: 'زياد محمد', action: 'فشل دخول (Brute force?)', entityType: 'Auth', entityName: 'Security', metadata: { ip: '192.168.1.1' } },
    { id: '4', timestamp: 'منذ ساعة', actorName: 'النظام', action: 'نسخة احتياطية دورية', entityType: 'System', entityName: 'Backup', metadata: {} },
    { id: '5', timestamp: 'منذ ساعتين', actorName: 'مدير النظام', action: 'تعديل أسعار الباقات', entityType: 'Config', entityName: 'Global Settings', metadata: {} },
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('تم إنشاء تقرير سجلات التدقيق بنجاح. جاري بدء التحميل...');
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">سجل التدقيق (Audit Logs)</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Platform Accountability & Security Trail</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-black text-sm uppercase shadow-sm active:scale-95 disabled:opacity-50"
        >
           {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
           تصدير السجلات المفلترة
        </button>
      </div>

      <div className="glass-card rounded-[2.5rem] shadow-sm border border-white overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center gap-6">
           <div className="relative flex-1 group">
             <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
             <input
               type="text"
               placeholder="ابحث حسب المطعم، المستخدم، أو نوع الإجراء..."
               className="w-full pr-14 pl-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-bold shadow-inner focus:ring-4 focus:ring-blue-100 transition-all"
             />
           </div>
           <div className="flex gap-3">
              <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-2xl">
                 {['الكل', 'أدمن', 'مالك', 'نظام'].map(t => (
                    <button key={t} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterType === t ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>
                 ))}
              </div>
              <button className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest active:scale-95"><Calendar size={14} /> مدى التاريخ</button>
           </div>
        </div>

        <div className="space-y-2 p-4 bg-slate-50/50">
           {logs.map(log => (
             <div key={log.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-xl hover:-translate-y-0.5 transition-all group relative overflow-hidden">
                <div className="flex items-center gap-6">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${log.entityType === 'Auth' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors'}`}>
                      {log.entityType === 'Subscription' ? <CreditCard size={20} /> : log.entityType === 'Ingredient' ? <ShoppingCart size={20} /> : log.entityType === 'Auth' ? <Shield size={20} /> : <History size={20} />}
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-3">
                         <span className="text-sm font-black text-slate-800">{log.actorName}</span>
                         <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${log.entityType === 'Auth' ? 'bg-rose-500 text-white' : 'bg-slate-900 text-white'}`}>
                            {log.entityType}
                         </span>
                      </div>
                      <p className="text-xs text-slate-500 font-bold">{log.action}: <span className="text-slate-800">"{log.entityName}"</span></p>
                   </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-12">
                   <div className="flex flex-col items-end">
                      <div className="flex gap-2 mb-1">
                        {Object.entries(log.metadata).map(([k, v]: any) => (
                           <span key={k} className="text-[7px] font-black bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 uppercase text-slate-500">{k}: {v}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                         <Clock size={12} />
                         {log.timestamp}
                      </div>
                   </div>
                   <button title="عرض التفاصيل" className="text-blue-600 hover:text-blue-800 transition-colors opacity-0 group-hover:opacity-100 p-2 hover:bg-blue-50 rounded-xl active:scale-90">
                      <FileText size={20} />
                   </button>
                </div>
             </div>
           ))}
        </div>
        
        <div className="p-10 border-t border-slate-50 text-center bg-white">
           <button className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-all">تحميل المزيد من السجلات</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAudit;
