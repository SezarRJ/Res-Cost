
import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, ChevronLeft, Table, ArrowRight, Loader2, Sparkles, X, ChevronRight } from 'lucide-react';

const SalesImport: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setIsUploading(true);
    setProgress(10);
    
    // Simulate real file processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setStep(2);
          }, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 max-w-5xl mx-auto">
      <div className="flex flex-col gap-1 px-2 md:px-0">
        <h1 className="text-2xl md:text-3xl font-black text-slate-800">استيراد المبيعات</h1>
        <p className="text-slate-400 font-bold uppercase text-[9px] md:text-xs">Upload POS reports to sync menu performance</p>
      </div>

      {/* Responsive Stepper */}
      <div className="flex items-center justify-center gap-3 md:gap-6 mb-8 px-4">
         {[1, 2, 3].map((s) => (
           <React.Fragment key={s}>
             <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center font-black transition-all shrink-0 ${step >= s ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-200 text-slate-400'}`}>
               {step > s ? <CheckCircle2 size={18} /> : s}
             </div>
             {s < 3 && <div className={`flex-1 max-w-[60px] md:max-w-[100px] h-1 rounded-full ${step > s ? 'bg-blue-600' : 'bg-slate-200'}`}></div>}
           </React.Fragment>
         ))}
      </div>

      {step === 1 && (
        <div className="glass-card rounded-[2rem] md:rounded-[3rem] border border-white p-8 md:p-16 space-y-8 md:space-y-12 text-center flex flex-col items-center shadow-xl">
           <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-50 text-blue-600 rounded-[1.8rem] md:rounded-[2.5rem] flex items-center justify-center shadow-inner group">
              {/* Fixed: Removed non-existent responsive size prop 'md:size' and used a balanced fixed size */}
              <UploadCloud size={48} className="group-hover:translate-y-[-4px] transition-transform duration-500" />
           </div>
           <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-black text-slate-800">ارفع ملف المبيعات</h3>
              <p className="text-xs md:text-sm text-slate-400 font-bold max-w-xs mx-auto leading-relaxed">يدعم ملفات CSV و XLSX من كافة أنظمة الـ POS.</p>
           </div>
           
           <div className="w-full max-w-md p-8 md:p-12 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer relative group active:scale-95">
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" id="fileInput" onChange={handleUpload} accept=".csv, .xlsx" />
              <div className="flex flex-col items-center gap-4">
                 {/* Fixed: Removed non-existent responsive size prop 'md:size' */}
                 <FileText className="text-slate-300 group-hover:text-blue-400 transition-colors" size={32} />
                 <span className="font-black text-slate-500 text-sm md:text-base">اضغط لاختيار ملف</span>
                 <span className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">الحجم الأقصى: 10MB</span>
              </div>
           </div>
           
           {isUploading && (
             <div className="w-full max-w-sm space-y-4 animate-in fade-in">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-blue-600 px-2">
                   <span>جاري التحليل...</span>
                   <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                   <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
             </div>
           )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in slide-in-from-left-4">
           <div className="glass-card rounded-[2rem] md:rounded-[2.5rem] border border-white overflow-hidden shadow-2xl">
              <div className="p-6 md:p-8 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div className="flex flex-col">
                    <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest mb-1">Configuration</span>
                    <h3 className="text-base md:text-lg font-black">مطابقة بيانات الأعمدة</h3>
                 </div>
                 <div className="flex gap-2">
                    <button className="flex-1 md:flex-none px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs active:scale-95 transition-all" onClick={() => setStep(1)}>إلغاء</button>
                    <button className="flex-1 md:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-black text-xs shadow-lg shadow-blue-600/20 active:scale-95 transition-all" onClick={() => setStep(3)}>حفظ واستيراد</button>
                 </div>
              </div>
              <div className="p-6 md:p-10 space-y-8">
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                    {['التاريخ', 'اسم الطبق', 'الكمية'].map((col, i) => (
                      <div key={i} className="space-y-2">
                         <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">{col}</label>
                         <div className="relative">
                            <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-xs outline-none focus:ring-4 focus:ring-blue-100 appearance-none transition-all">
                               <option selected={i === 0}>Sale Date</option>
                               <option selected={i === 1}>Item Name</option>
                               <option selected={i === 2}>Qty Sold</option>
                            </select>
                            <ChevronLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 {/* Mobile Row Preview */}
                 <div className="space-y-3">
                    <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-4">معاينة أول 50 صفاً</h4>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar pb-6">
                       {[1,2,3,4,5].map(r => (
                         <div key={r} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between text-[11px] font-bold group hover:border-blue-200 transition-colors">
                            <div className="flex flex-col gap-1">
                               <span className="text-slate-800 font-black">برجر لحم مشوي {r}</span>
                               <span className="text-slate-400">2024-05-{r+10}</span>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                               <span className="bg-white px-2 py-0.5 rounded-lg border border-slate-100 shadow-sm">{r * 8} قطعة</span>
                               <span className="text-blue-600 font-black">12,000 د.ع</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {step === 3 && (
        <div className="glass-card rounded-[2.5rem] md:rounded-[3.5rem] border border-white p-10 md:p-20 text-center space-y-8 md:space-y-12 animate-in zoom-in-95 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-50 text-emerald-600 rounded-[2.2rem] md:rounded-[3rem] flex items-center justify-center mx-auto shadow-inner relative z-10">
              <Sparkles size={56} className="animate-pulse" />
           </div>
           <div className="space-y-4 relative z-10">
              <h3 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight">تم الاستيراد بنجاح!</h3>
              <p className="text-xs md:text-base text-slate-400 font-bold max-w-sm mx-auto leading-relaxed">تمت معالجة بيانات المبيعات وربطها بالوصفات. يمكنك الآن مراجعة تقارير الأداء.</p>
           </div>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button 
                onClick={() => window.location.hash = 'reports'}
                className="flex-1 md:flex-none px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-95"
              >
                 عرض التقارير
              </button>
              <button 
                onClick={() => window.location.hash = 'dashboard'}
                className="flex-1 md:flex-none px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
              >
                 لوحة التحكم
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default SalesImport;
