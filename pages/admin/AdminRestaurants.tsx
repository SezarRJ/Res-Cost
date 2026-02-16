
import React, { useState } from 'react';
import { 
  Store, 
  MapPin, 
  ChefHat, 
  TrendingUp, 
  Search, 
  Filter, 
  ChevronLeft, 
  X, 
  Calculator, 
  UploadCloud, 
  CreditCard,
  Target,
  FileText,
  ShieldAlert,
  ArrowUpRight,
  Download,
  Calendar,
  Lock,
  Zap,
  DollarSign,
  ShoppingCart,
  Loader2
} from 'lucide-react';
import { SubscriptionPlan } from '../../types';

const AdminRestaurants: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedRest, setSelectedRest] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const [restaurants, setRestaurants] = useState([
    { id: 'r1', name: 'مطعم أرز لبنان', ownerEmail: 'mohammed@lebnan.iq', city: 'بغداد', currency: 'IQD', plan: SubscriptionPlan.ELITE, status: 'active', recipes: 45, ingredients: 120, margin: '68%', mrr: '85,000', baseline: 1200, createdAt: '2023-11-20', salesRows: 14202, latestImport: 'منذ يومين', pdfExports: 85 },
    { id: 'r2', name: 'برجر هاوس', ownerEmail: 'ahmed@burger.iq', city: 'أربيل', currency: 'IQD', plan: SubscriptionPlan.ELITE, status: 'active', recipes: 28, ingredients: 85, margin: '62%', mrr: '85,000', baseline: 1000, createdAt: '2024-02-12', salesRows: 8500, latestImport: 'أمس', pdfExports: 42 },
    { id: 'r3', name: 'بيتزا كينج', ownerEmail: 'ziad@pizza.iq', city: 'البصرة', currency: 'USD', plan: SubscriptionPlan.PRO, status: 'active', recipes: 12, ingredients: 40, margin: '58%', mrr: '45,000', baseline: 600, createdAt: '2024-03-01', salesRows: 2100, latestImport: 'منذ أسبوع', pdfExports: 12 },
    { id: 'r4', name: 'فلافل بغداد', ownerEmail: 'salim@falafel.iq', city: 'بغداد', currency: 'IQD', plan: SubscriptionPlan.FREE, status: 'disabled', recipes: 5, ingredients: 12, margin: '74%', mrr: '0', baseline: 300, createdAt: '2024-04-10', salesRows: 450, latestImport: 'N/A', pdfExports: 0 },
  ]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('تم تصدير ملف بيانات المطاعم الشامل بنجاح.');
    }, 2000);
  };

  const handleToggleStatus = (id: string) => {
    setIsProcessing(`status-${id}`);
    setTimeout(() => {
      setRestaurants(prev => prev.map(r => r.id === id ? {...r, status: r.status === 'active' ? 'disabled' : 'active'} : r));
      if (selectedRest?.id === id) {
         setSelectedRest({...selectedRest, status: selectedRest.status === 'active' ? 'disabled' : 'active'});
      }
      setIsProcessing(null);
    }, 1000);
  };

  const handleComped = (id: string) => {
    setIsProcessing(`comp-${id}`);
    setTimeout(() => {
      alert(`تم منح المطعم "تجاوز باقة" (Comped) بنجاح. يمكنهم الآن استخدام كافة الميزات لفترة محدودة.`);
      setIsProcessing(null);
    }, 1000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">إدارة المطاعم (Tenants)</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Full oversight across all restaurant databases</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-black text-sm uppercase shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50"
        >
           {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
           تصدير كافة بيانات المطاعم
        </button>
      </div>

      <div className="glass-card rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center gap-6">
           <div className="relative flex-1 group">
             <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
             <input
               type="text"
               placeholder="ابحث عن مطعم بالاسم أو بريد المالك..."
               className="w-full pr-14 pl-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-bold shadow-inner focus:ring-4 focus:ring-blue-100 transition-all"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-black text-slate-500 uppercase tracking-widest active:scale-95">
             <Filter size={18} /> تصفية النتائج
           </button>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-right">
              <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                 <tr>
                    <th className="px-8 py-6">المطعم / المالك</th>
                    <th className="px-8 py-6 text-center">المدينة / العملة</th>
                    <th className="px-8 py-6 text-center">الخطة</th>
                    <th className="px-8 py-6 text-center">الحالة</th>
                    <th className="px-8 py-6 text-center">الصحون المتوقعة</th>
                    <th className="px-8 py-6"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {restaurants.map(r => (
                   <tr key={r.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedRest(r)}>
                      <td className="px-8 py-6">
                         <h5 className="text-sm font-black text-slate-800">{r.name}</h5>
                         <p className="text-[9px] text-slate-400 font-bold">{r.ownerEmail}</p>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <p className="text-xs font-black text-slate-700">{r.city}</p>
                         <span className="text-[9px] text-slate-400 font-bold uppercase">{r.currency}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase ${r.plan === SubscriptionPlan.ELITE ? 'bg-amber-100 text-amber-600' : r.plan === SubscriptionPlan.PRO ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                            {r.plan}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${r.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {r.status === 'active' ? 'نشط' : 'قفل مؤقت'}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-center text-xs font-black text-slate-600">{r.baseline.toLocaleString()}</td>
                      <td className="px-8 py-6">
                         <ChevronLeft size={18} className="text-slate-300 group-hover:text-blue-500 group-hover:-translate-x-2 transition-all mr-auto" />
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {selectedRest && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedRest(null)}></div>
           <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/20">
                       <Store size={32} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black">{selectedRest.name}</h3>
                       <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">معرف المستأجر: {selectedRest.id} • منذ {selectedRest.createdAt}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedRest(null)} className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                    <X size={28} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-12">
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                       { l: 'المصاريف', v: '8', i: <Calculator size={18} />, c: 'blue' },
                       { l: 'المواد', v: selectedRest.ingredients, i: <ShoppingCart size={18} />, c: 'emerald' },
                       { l: 'الوصفات', v: selectedRest.recipes, i: <ChefHat size={18} />, c: 'amber' },
                       { l: 'صفوف المبيعات', v: selectedRest.salesRows.toLocaleString(), i: <UploadCloud size={18} />, c: 'indigo' },
                       { l: 'آخر استيراد', v: selectedRest.latestImport, i: <Calendar size={18} />, c: 'violet' },
                       { l: 'تصدير PDF', v: selectedRest.pdfExports, i: <FileText size={18} />, c: 'rose' },
                    ].map((stat, i) => (
                       <div key={i} className={`p-4 bg-${stat.c}-50 rounded-2xl border border-${stat.c}-100 flex flex-col gap-3 group hover:shadow-md transition-shadow`}>
                          <div className={`text-${stat.c}-600 group-hover:scale-110 transition-transform`}>{stat.i}</div>
                          <div>
                             <span className="text-[8px] text-slate-400 font-black uppercase">{stat.l}</span>
                             <p className="text-sm font-black text-slate-800 truncate">{stat.v}</p>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-2">الاشتراك والتحكم بالتجاوزات</h4>
                       <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black text-slate-500 uppercase">الخطة النشطة:</span>
                             <span className="text-xs font-black text-blue-600 uppercase">{selectedRest.plan}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <button 
                               onClick={() => handleComped(selectedRest.id)}
                               disabled={!!isProcessing}
                               className="py-3 bg-amber-50 text-amber-600 rounded-xl font-black text-[9px] uppercase tracking-widest border border-amber-100 hover:bg-amber-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                             >
                                {isProcessing === `comp-${selectedRest.id}` ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
                                تجاوز الخطة (Comped)
                             </button>
                             <button 
                               onClick={() => handleToggleStatus(selectedRest.id)}
                               disabled={!!isProcessing}
                               className={`py-3 rounded-xl font-black text-[9px] uppercase tracking-widest border transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${selectedRest.status === 'active' ? 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'}`}
                             >
                                {isProcessing === `status-${selectedRest.id}` ? <Loader2 size={12} className="animate-spin" /> : (selectedRest.status === 'active' ? <Lock size={12} /> : <Zap size={12} />)}
                                {selectedRest.status === 'active' ? 'قفل (Soft Lock)' : 'تفعيل'}
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end gap-4">
                 <button className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 uppercase active:scale-95 transition-all" onClick={() => setSelectedRest(null)}>إغلاق</button>
                 <button className="px-10 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase shadow-xl shadow-slate-900/10 active:scale-95 transition-all" onClick={() => setSelectedRest(null)}>حفظ التغييرات</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminRestaurants;
