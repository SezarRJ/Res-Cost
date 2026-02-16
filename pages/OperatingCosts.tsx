
import React, { useState } from 'react';
import { Plus, Trash2, Home, Power, Users, CreditCard, PieChart, TrendingDown, Target, Zap, X } from 'lucide-react';
import { OperatingCost } from '../types';

interface OperatingCostsProps {
  costs: OperatingCost[];
  setCosts: React.Dispatch<React.SetStateAction<OperatingCost[]>>;
}

const OperatingCosts: React.FC<OperatingCostsProps> = ({ costs, setCosts }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCost, setNewCost] = useState<Partial<OperatingCost>>({
    name: '',
    amount: 0,
    frequency: 'monthly'
  });

  const totalMonthly = costs.reduce((sum, c) => sum + (c.frequency === 'monthly' ? c.amount : c.amount / 12), 0);

  const handleAdd = () => {
    if (!newCost.name || !newCost.amount) return;
    const item: OperatingCost = {
      id: Date.now().toString(),
      name: newCost.name!,
      amount: Number(newCost.amount),
      frequency: newCost.frequency! as any
    };
    setCosts([item, ...costs]);
    setIsAddModalOpen(false);
    setNewCost({ name: '', amount: 0, frequency: 'monthly' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المصروف؟')) {
      setCosts(costs.filter(c => c.id !== id));
    }
  };

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
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Plus size={20} />
          إضافة مصروف جديد
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {costs.map((cost) => (
              <div key={cost.id} className="glass-card p-8 rounded-[2.5rem] border border-white hover:border-blue-200 shadow-sm transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-blue-500 transition-colors"></div>
                <div className="flex justify-between items-start mb-10">
                  <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                    {getIcon(cost.name)}
                  </div>
                  <button 
                    onClick={() => handleDelete(cost.id)}
                    className="w-10 h-10 flex items-center justify-center text-slate-300 hover:bg-rose-50 hover:text-rose-500 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
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
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 space-y-10">
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
              </div>
           </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white p-10 space-y-8 relative overflow-hidden">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-slate-800">إضافة مصروف جديد</h3>
                 <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">اسم المصروف</label>
                    <input 
                      type="text" 
                      value={newCost.name}
                      onChange={(e) => setNewCost({...newCost, name: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">المبلغ</label>
                       <input 
                        type="number" 
                        value={newCost.amount}
                        onChange={(e) => setNewCost({...newCost, amount: Number(e.target.value)})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">التكرار</label>
                       <select 
                        value={newCost.frequency}
                        onChange={(e) => setNewCost({...newCost, frequency: e.target.value as any})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                       >
                         <option value="monthly">شهري</option>
                         <option value="yearly">سنوي</option>
                       </select>
                    </div>
                 </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                 <button 
                   onClick={() => setIsAddModalOpen(false)}
                   className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                 >
                   إلغاء
                 </button>
                 <button 
                   onClick={handleAdd}
                   className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                 >
                   حفظ المصروف
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default OperatingCosts;
