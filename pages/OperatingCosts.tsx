
import React, { useState } from 'react';
import { Plus, Trash2, Home, Power, Users, CreditCard, PieChart, TrendingDown, Target, Zap } from 'lucide-react';
import { OperatingCost } from '../types';

const INITIAL_COSTS: OperatingCost[] = [
  { id: '1', name: 'إيجار المحل', amount: 2000000, frequency: 'monthly' },
  { id: '2', name: 'كهرباء ومولد', amount: 450000, frequency: 'monthly' },
  { id: '3', name: 'رواتب الموظفين', amount: 5500000, frequency: 'monthly' },
  { id: '4', name: 'تسويق واعلانات', amount: 300000, frequency: 'monthly' },
];

const OperatingCosts: React.FC = () => {
  const [costs, setCosts] = useState<OperatingCost[]>(INITIAL_COSTS);
  const totalMonthly = costs.reduce((sum, c) => sum + (c.frequency === 'monthly' ? c.amount : c.amount / 12), 0);

  const getIcon = (name: string) => {
    if (name.includes('إيجار')) return <Home className="text-blue-500" />;
    if (name.includes('كهرباء') || name.includes('مولد')) return <Power className="text-amber-500" />;
    if (name.includes('رواتب')) return <Users className="text-emerald-500" />;
    return <CreditCard className="text-slate-500" />;
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-3">مصاريف التشغيل (Overhead)</h1>
          <p className="text-slate-400 font-bold tracking-wide uppercase text-xs">Define fixed costs to calculate true break-even points</p>
        </div>
        <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95">
          <Plus size={20} />
          إضافة مصروف جديد
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Main List */}
        <div className="xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {costs.map((cost) => (
              <div key={cost.id} className="glass-card p-8 rounded-[2.5rem] border border-white hover:border-blue-200 shadow-sm transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-blue-500 transition-colors"></div>
                <div className="flex justify-between items-start mb-10">
                  <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                    {getIcon(cost.name)}
                  </div>
                  <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:bg-rose-50 hover:text-rose-500 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <h4 className="text-xl font-black text-slate-800 mb-2">{cost.name}</h4>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">
                   Frequency: {cost.frequency === 'monthly' ? 'شهري' : 'سنوي'}
                </p>
                
                <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-black text-slate-900 leading-none">{cost.amount.toLocaleString()}</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IQD</span>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                   <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Impact Weight</span>
                   <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(cost.amount / totalMonthly) * 100}%` }}></div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="xl:col-span-4 space-y-10">
           {/* Total Card */}
           <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              
              <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
                 <PieChart size={16} />
                 Budget Summary
              </h3>

              <div className="space-y-10 relative z-10">
                <div className="flex flex-col gap-2">
                   <span className="text-slate-500 text-xs font-bold uppercase">إجمالي المصاريف الشهرية</span>
                   <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-black text-white tracking-tighter">{totalMonthly.toLocaleString()}</span>
                      <span className="text-blue-500 font-black text-sm">IQD</span>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 border-t border-slate-800 pt-10">
                   <div>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2 block">تكلفة اليوم</span>
                      <p className="text-lg font-black text-slate-200">{(totalMonthly / 30).toLocaleString()} <span className="text-[10px]">IQD</span></p>
                   </div>
                   <div>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2 block">النسبة للأرباح</span>
                      <p className="text-lg font-black text-emerald-500">22%</p>
                   </div>
                </div>
              </div>
           </div>

           {/* AI Insight Box */}
           <div className="glass-card p-10 rounded-[3rem] border border-white space-y-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                <Zap size={32} strokeWidth={2.5} />
              </div>
              <div className="space-y-3">
                 <h4 className="text-xl font-black text-slate-800">تحسين التكاليف AI</h4>
                 <p className="text-sm text-slate-400 font-medium leading-relaxed">بناءً على حجم مطعمك، مصاريف الرواتب أعلى بنسبة 12% من متوسط السوق المحلي. هل ترغب في اقتراح هيكلة جديدة؟</p>
              </div>
              <button className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                 بدء التحليل الذكي
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OperatingCosts;
