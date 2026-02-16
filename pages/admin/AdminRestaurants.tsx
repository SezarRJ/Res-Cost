
import React from 'react';
import { Store, MapPin, Calculator, ChefHat, TrendingUp, Search, Filter, ArrowUpRight, ChevronLeft } from 'lucide-react';

const AdminRestaurants: React.FC = () => {
  const restaurants = [
    { id: '1', name: 'مطعم أرز لبنان', owner: 'محمد حسان', city: 'بغداد', plan: 'ELITE', recipes: 45, ingredients: 120, margin: '68%', mrr: '85,000' },
    { id: '2', name: 'برجر هاوس', owner: 'أحمد العراقي', city: 'أربيل', plan: 'ELITE', recipes: 28, ingredients: 85, margin: '62%', mrr: '85,000' },
    { id: '3', name: 'بيتزا كينج', owner: 'زياد محمد', city: 'البصرة', plan: 'PRO', recipes: 12, ingredients: 40, margin: '58%', mrr: '45,000' },
    { id: '4', name: 'فلافل بغداد', owner: 'سالم علي', city: 'بغداد', plan: 'FREE', recipes: 5, ingredients: 12, margin: '74%', mrr: '0' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800">إدارة المطاعم</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Tenant Overview & Business Intelligence</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
         {restaurants.map(r => (
           <div key={r.id} className="glass-card p-8 rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col gap-6">
              <div className="flex items-center justify-between">
                 <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                    <Store size={24} />
                 </div>
                 <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${r.plan === 'ELITE' ? 'bg-amber-100 text-amber-600' : r.plan === 'PRO' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    {r.plan}
                 </span>
              </div>

              <div>
                 <h4 className="text-xl font-black text-slate-800 mb-1">{r.name}</h4>
                 <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <MapPin size={12} /> {r.city}
                    <span className="mx-2">•</span>
                    {r.owner}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                 <div className="space-y-1">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block">الوصفات</span>
                    <p className="font-black text-slate-800 flex items-center gap-2">
                       <ChefHat size={14} className="text-blue-500" /> {r.recipes}
                    </p>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block">الهامش المتوسط</span>
                    <p className="font-black text-emerald-600 flex items-center gap-2">
                       <TrendingUp size={14} /> {r.margin}
                    </p>
                 </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                 <div>
                    <span className="text-[10px] text-slate-400 font-black uppercase">إيراد العميل</span>
                    <p className="font-black text-slate-800">{Number(r.mrr).toLocaleString()} د.ع</p>
                 </div>
                 <button className="w-10 h-10 bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm">
                    <ChevronLeft size={18} />
                 </button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default AdminRestaurants;
