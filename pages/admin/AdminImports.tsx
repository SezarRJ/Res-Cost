
import React, { useState } from 'react';
import { 
  FileSearch, 
  UploadCloud, 
  FileText, 
  Download, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  RotateCcw,
  ShieldAlert,
  Info,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import { ImportLog } from '../../types';

const AdminImports: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [imports, setImports] = useState<ImportLog[]>([
    { id: 'imp-01', restaurantName: 'برجر هاوس', fileName: 'May_Sales_Final.xlsx', type: 'monthly', rowsCount: 4200, timestamp: 'اليوم، 11:00 ص', status: 'success', anomalies: [] },
    { id: 'imp-02', restaurantName: 'أرز لبنان', fileName: 'Daily_POS_Report.csv', type: 'daily', rowsCount: 450, timestamp: 'أمس، 9:30 م', status: 'success', anomalies: ['2 invalid dates', '1 qty outlier'] },
    { id: 'imp-03', restaurantName: 'بيتزا كينج', fileName: 'Sales_Backup.csv', type: 'weekly', rowsCount: 120, timestamp: 'منذ يومين', status: 'fail', anomalies: ['File corrupted', 'Header mismatch'] },
  ]);

  const handleDownload = (id: string) => {
    setIsProcessing(`download-${id}`);
    setTimeout(() => {
      setIsProcessing(null);
      alert('جاري تحميل الملف الأصلي المرفوع من قبل العميل...');
    }, 1500);
  };

  const handleReprocess = (id: string) => {
    setIsProcessing(`reprocess-${id}`);
    setTimeout(() => {
      setIsProcessing(null);
      alert('تمت إعادة جدولة عملية معالجة البيانات لهذا الملف.');
    }, 2000);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('حذف هذا الاستيراد سيؤدي لمسح كافة مبيعاته المرتبطة. هل أنت متأكد؟')) return;
    setIsProcessing(`delete-${id}`);
    setTimeout(() => {
      setImports(prev => prev.filter(i => i.id !== id));
      setIsProcessing(null);
    }, 1000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">الاستيرادات والملفات</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Monitor File Health & Sales Data Integrity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="glass-card p-6 rounded-[2rem] border border-white flex flex-col gap-4">
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">إجمالي الصفوف المستوردة (شهر)</span>
            <p className="text-3xl font-black text-slate-800">2.1M</p>
            <div className="flex items-center gap-1 text-emerald-500 text-[9px] font-black uppercase"><ArrowUpRight size={10} /> +12% عن الشهر الماضي</div>
         </div>
         <div className="glass-card p-6 rounded-[2rem] border border-white flex flex-col gap-4">
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">معدل مطابقة الأصناف</span>
            <p className="text-3xl font-black text-slate-800">84.5%</p>
            <span className="text-[9px] text-slate-400 font-bold">أصناف مجهولة تحتاج ربط</span>
         </div>
         <div className="glass-card p-6 rounded-[2rem] border border-white flex flex-col justify-center bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-rose-600/10 to-transparent"></div>
            <div className="relative z-10 flex items-center justify-between">
               <span className="text-[9px] text-rose-400 font-black uppercase tracking-widest">شواذ البيانات (Anomalies)</span>
               <AlertTriangle size={18} className="text-rose-400" />
            </div>
            <p className="relative z-10 text-xl font-black mt-2">124 صف مشتبه به</p>
            <button className="relative z-10 text-[8px] font-black uppercase text-rose-400 hover:underline mt-2">مراجعة القيم الشاذة</button>
         </div>
         <div className="glass-card p-6 rounded-[2rem] border border-white flex flex-col justify-center shadow-inner group">
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">التخزين المستخدم</span>
            <p className="text-3xl font-black text-slate-800">4.2 GB</p>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden shadow-inner">
               <div className="h-full bg-blue-600 w-1/3 transition-all duration-1000"></div>
            </div>
         </div>
      </div>

      <div className="glass-card rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="relative w-full md:w-96 group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input type="text" placeholder="ابحث في سجلات الاستيراد..." className="w-full pr-12 pl-6 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
           </div>
           <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest active:scale-95"><Filter size={14} /> تصفية</button>
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-right">
              <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                 <tr>
                    <th className="px-8 py-6">المطعم</th>
                    <th className="px-8 py-6 text-center">الملف / النوع</th>
                    <th className="px-8 py-6 text-center">الصفوف</th>
                    <th className="px-8 py-6 text-center">الوقت</th>
                    <th className="px-8 py-6 text-center text-left">الإجراءات</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {imports.map(log => (
                   <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6 font-black text-slate-800">{log.restaurantName}</td>
                      <td className="px-8 py-6 text-center">
                         <div className="flex flex-col items-center">
                            <span className="text-blue-600 font-bold text-[10px] flex items-center gap-1"><FileText size={12} /> {log.fileName}</span>
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase border mt-1 ${log.status === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>{log.status}</span>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-center font-black text-slate-700">{log.rowsCount.toLocaleString()}</td>
                      <td className="px-8 py-6 text-center text-[10px] font-bold text-slate-400">{log.timestamp}</td>
                      <td className="px-8 py-6">
                         <div className="flex items-center justify-end gap-1">
                            <button 
                              onClick={() => handleDownload(log.id)}
                              disabled={!!isProcessing}
                              title="تحميل الملف الأصلي" 
                              className="p-2 text-slate-300 hover:text-blue-500 transition-all active:scale-90 disabled:opacity-50"
                            >
                               {isProcessing === `download-${log.id}` ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                            </button>
                            <button 
                              onClick={() => handleReprocess(log.id)}
                              disabled={!!isProcessing}
                              title="إعادة تشغيل المعالجة" 
                              className="p-2 text-slate-300 hover:text-indigo-500 transition-all active:scale-90 disabled:opacity-50"
                            >
                               {isProcessing === `reprocess-${log.id}` ? <Loader2 size={16} className="animate-spin" /> : <RotateCcw size={16} />}
                            </button>
                            <button 
                              onClick={() => handleDelete(log.id)}
                              disabled={!!isProcessing}
                              title="حذف والصفوف المرتبطة" 
                              className="p-2 text-slate-300 hover:text-rose-500 transition-all active:scale-90 disabled:opacity-50"
                            >
                               {isProcessing === `delete-${log.id}` ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                            </button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
           <ShieldAlert size={16} className="text-amber-500" />
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">تنبيه: حذف استيراد سيؤدي لحذف كافة مبيعاته المرتبطة وسيتأثر أداء المنيو للمطعم.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminImports;
