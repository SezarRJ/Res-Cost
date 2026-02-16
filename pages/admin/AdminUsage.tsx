
import React from 'react';
import { 
  Layers, 
  Zap, 
  ChefHat, 
  ShoppingCart, 
  UserPlus, 
  HardDrive, 
  Edit2, 
  RotateCcw,
  ShieldAlert,
  ArrowUpRight,
  Info,
  // Fix: Added missing UploadCloud icon import
  UploadCloud
} from 'lucide-react';
import { PLAN_LIMITS_DEFAULTS } from '../../constants';

const AdminUsage: React.FC = () => {
  const restaurantUsage = [
    { name: 'برجر هاوس', ingredients: 120, recipes: 32, imports: 850, aiReqs: 42, storage: '12.5 MB', plan: 'ELITE' },
    { name: 'أرز لبنان', ingredients: 240, recipes: 48, imports: 2100, aiReqs: 112, storage: '24.1 MB', plan: 'ELITE' },
    { name: 'بيتزا كينج', ingredients: 40, recipes: 12, imports: 210, aiReqs: 15, storage: '4.8 MB', plan: 'PRO' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">الاستخدام والحدود</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Platform Quotas & Plan Constraints</p>
        </div>
      </div>

      {/* Global Plan Configuration */}
      <section className="space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
               <Layers size={24} className="text-blue-600" /> إعدادات الخطط العالمية
            </h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(PLAN_LIMITS_DEFAULTS).map(([plan, limits]) => (
              <div key={plan} className="glass-card p-8 rounded-[2.5rem] border border-white shadow-sm space-y-6 relative overflow-hidden group">
                 <div className="flex items-center justify-between">
                    <h4 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{plan}</h4>
                    <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors"><Edit2 size={16} /></button>
                 </div>
                 <div className="space-y-4">
                    {[
                      { l: 'المواد الخام القصوى', v: limits.ingredients, i: <ShoppingCart size={14} /> },
                      { l: 'الوصفات القصوى', v: limits.recipes, i: <ChefHat size={14} /> },
                      { l: 'صفوف الاستيراد/شهر', v: plan === 'FREE' ? '0' : '50k', i: <UploadCloud size={14} /> },
                      { l: 'طلبات AI (Elite)', v: limits.aiRequests, i: <Zap size={14} /> },
                      { l: 'عدد الموظفين المسموح', v: limits.staff, i: <UserPlus size={14} /> },
                      { l: 'حجم الملف الأقصى', v: limits.uploadLimit, i: <HardDrive size={14} /> },
                    ].map((row, j) => (
                      <div key={j} className="flex justify-between items-center text-xs">
                         <span className="text-slate-500 font-bold flex items-center gap-2">{row.i} {row.l}</span>
                         <span className="font-black text-slate-800">{row.v === Infinity ? '∞' : row.v}</span>
                      </div>
                    ))}
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Tenant Usage Control */}
      <section className="space-y-6">
         <div className="glass-card rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
           <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h3 className="text-xl font-black text-slate-800">استهلاك المستأجرين (Tenants)</h3>
              <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase bg-slate-50 px-4 py-2 rounded-xl">
                 <Info size={14} className="text-blue-500" /> العدادات تتصفر تلقائياً كل 30 يوم
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-right">
                 <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <tr>
                       <th className="px-8 py-6">المطعم</th>
                       <th className="px-8 py-6 text-center">المواد</th>
                       <th className="px-8 py-6 text-center">الوصفات</th>
                       <th className="px-8 py-6 text-center">الاستيرادات/شهر</th>
                       <th className="px-8 py-6 text-center">طلبات AI/شهر</th>
                       <th className="px-8 py-6 text-center">تخزين البيانات</th>
                       <th className="px-8 py-6">التحكم</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {restaurantUsage.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                         <td className="px-8 py-6">
                            <span className="text-sm font-black text-slate-800">{r.name}</span>
                            <span className="text-[8px] font-black text-blue-500 uppercase block">{r.plan}</span>
                         </td>
                         <td className="px-8 py-6 text-center font-bold text-slate-600">{r.ingredients}</td>
                         <td className="px-8 py-6 text-center font-bold text-slate-600">{r.recipes}</td>
                         <td className="px-8 py-6 text-center font-black text-indigo-600">{r.imports.toLocaleString()}</td>
                         <td className="px-8 py-6 text-center font-black text-amber-600">{r.aiReqs}</td>
                         <td className="px-8 py-6 text-center text-[10px] font-bold text-slate-400">{r.storage}</td>
                         <td className="px-8 py-6">
                            <div className="flex items-center justify-end gap-2">
                               <button title="تصفير العدادات" className="p-2 text-slate-300 hover:text-blue-500 transition-colors"><RotateCcw size={16} /></button>
                               <button title="تجاوز الحدود مؤقتاً" className="p-2 text-slate-300 hover:text-emerald-500 transition-colors"><Zap size={16} /></button>
                               <button title="تعطيل الاستيراد لهذا المستأجر" className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><ShieldAlert size={16} /></button>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
         </div>
      </section>
    </div>
  );
};

export default AdminUsage;
