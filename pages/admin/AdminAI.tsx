
import React, { useState } from 'react';
import { Cpu, Zap, Activity, DollarSign, ShieldAlert, Check, X, Loader2, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const AdminAI: React.FC = () => {
  const [globalEnabled, setGlobalEnabled] = useState(true);

  const usageData = [
    { name: 'Pricing Recs', usage: 1250, cost: 2.5 },
    { name: 'Recipe Assistant', usage: 850, cost: 1.8 },
    { name: 'Offer Strategy', usage: 420, cost: 0.9 },
    { name: 'Data Cleanup', usage: 2100, cost: 4.2 },
  ];

  const logs = [
    { id: '1', restaurant: 'برجر هاوس', feature: 'Pricing Guidance', tokens: 850, cost: '$0.017', date: 'منذ دقيقة' },
    { id: '2', restaurant: 'أرز لبنان', feature: 'Recipe Assistant', tokens: 1200, cost: '$0.024', date: 'منذ 5 دقائق' },
    { id: '3', restaurant: 'بيتزا كينج', feature: 'Data Cleanup', tokens: 400, cost: '$0.008', date: 'منذ 15 دقيقة' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800">مراقبة الـ AI والتكاليف</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Artificial Intelligence Usage & Billing Oversight</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
           <span className="text-xs font-black text-slate-500 uppercase">الحالة العالمية للـ AI:</span>
           <button 
             onClick={() => setGlobalEnabled(!globalEnabled)}
             className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${globalEnabled ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}
           >
              {globalEnabled ? 'نشط' : 'معطل'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="glass-card p-10 rounded-[3rem] border border-white shadow-sm flex flex-col gap-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
               <DollarSign size={28} />
            </div>
            <div>
               <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">إجمالي التكلفة (هذا الشهر)</span>
               <p className="text-4xl font-black text-slate-800 tracking-tighter">$428.50</p>
               <span className="text-[10px] text-emerald-500 font-black">Within Budget</span>
            </div>
         </div>
         <div className="glass-card p-10 rounded-[3rem] border border-white shadow-sm flex flex-col gap-6">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
               <Zap size={28} />
            </div>
            <div>
               <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">إجمالي التوكنات المستهلكة</span>
               <p className="text-4xl font-black text-slate-800 tracking-tighter">21.4M</p>
               <span className="text-[10px] text-slate-400 font-black">Across 852 tenants</span>
            </div>
         </div>
         <div className="glass-card p-10 rounded-[3rem] border border-white shadow-sm flex flex-col justify-center gap-4 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent"></div>
            <div className="flex items-center gap-3 relative z-10">
               <ShieldAlert className="text-amber-500" />
               <h4 className="font-black text-lg">تحكم الميزات</h4>
            </div>
            <div className="space-y-3 relative z-10">
               {['Pricing Guidance', 'Recipe Optimization', 'Data Mapping'].map(feat => (
                 <div key={feat} className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-xs">
                    <span className="font-bold">{feat}</span>
                    <div className="w-8 h-4 bg-emerald-500 rounded-full"></div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 glass-card p-10 rounded-[3rem] border border-white shadow-sm">
            <h3 className="text-xl font-black text-slate-800 mb-8">توزيع الاستخدام حسب الميزة</h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                     <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                     <Bar dataKey="usage" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="lg:col-span-4 glass-card p-10 rounded-[3rem] border border-white shadow-sm flex flex-col">
            <h3 className="text-xl font-black text-slate-800 mb-8">آخر طلبات الـ AI</h3>
            <div className="space-y-6 flex-1">
               {logs.map(log => (
                 <div key={log.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-800 uppercase truncate">{log.restaurant}</span>
                       <span className="text-[9px] text-slate-400">{log.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] text-blue-600 font-bold">{log.feature}</span>
                       <span className="text-[10px] font-black text-slate-900">{log.cost}</span>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-8 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
               عرض السجلات الكاملة
            </button>
         </div>
      </div>
    </div>
  );
};

export default AdminAI;
