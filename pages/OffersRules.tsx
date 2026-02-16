
import React, { useState } from 'react';
import { Percent, Plus, Trash2, ArrowRight, TrendingUp, Info, X, Save, Target } from 'lucide-react';
import { VolumeDiscountRule } from '../types';

const INITIAL_RULES: VolumeDiscountRule[] = [
  { id: '1', name: 'عرض الحجم الكبير', threshold: 50, discountPercent: 15, minMarginPercent: 45, isActive: true },
  { id: '2', name: 'خصم نهاية الأسبوع', threshold: 100, discountPercent: 20, minMarginPercent: 50, isActive: true },
  { id: '3', name: 'تحفيز الأصناف البطيئة', threshold: 20, discountPercent: 10, minMarginPercent: 40, isActive: true },
];

const OffersRules: React.FC = () => {
  const [rules, setRules] = useState<VolumeDiscountRule[]>(INITIAL_RULES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRule, setNewRule] = useState<Partial<VolumeDiscountRule>>({
    name: '',
    threshold: 0,
    discountPercent: 0,
    minMarginPercent: 40,
    isActive: true
  });

  const handleAddRule = () => {
    if (!newRule.name || !newRule.threshold || !newRule.discountPercent) {
      alert('يرجى إكمال جميع الحقول المطلوبة');
      return;
    }

    const rule: VolumeDiscountRule = {
      id: Date.now().toString(),
      name: newRule.name!,
      threshold: Number(newRule.threshold),
      discountPercent: Number(newRule.discountPercent),
      minMarginPercent: Number(newRule.minMarginPercent),
      isActive: true
    };

    setRules([rule, ...rules]);
    setIsModalOpen(false);
    setNewRule({ name: '', threshold: 0, discountPercent: 0, minMarginPercent: 40, isActive: true });
  };

  const handleDeleteRule = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه القاعدة؟')) {
      setRules(rules.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-3">قواعد العروض</h1>
          <p className="text-slate-400 font-bold tracking-wide uppercase text-xs">Define automated discount thresholds based on sales volume</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Plus size={20} />
          إضافة قاعدة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
         {rules.map((rule) => (
           <div key={rule.id} className="glass-card p-10 rounded-[3rem] border border-white flex flex-col gap-6 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="flex items-center justify-between">
                 <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Percent size={28} />
                 </div>
                 <button 
                   onClick={() => handleDeleteRule(rule.id)}
                   className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                 >
                    <Trash2 size={20} />
                 </button>
              </div>
              
              <div>
                 <h4 className="text-xl font-black text-slate-800 mb-2">{rule.name}</h4>
                 <div className="flex items-center gap-3 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <span>الحد الأدنى: {rule.threshold} طبق</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-emerald-500">نشط</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                 <div>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">نسبة الخصم</span>
                    <span className="text-2xl font-black text-blue-600">{rule.discountPercent}%</span>
                 </div>
                 <div>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">أقل هامش مسموح</span>
                    <span className="text-2xl font-black text-emerald-600">{rule.minMarginPercent}%</span>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {rules.length === 0 && (
        <div className="py-20 text-center glass-card rounded-[3rem] border border-dashed border-slate-200">
          <p className="text-slate-400 font-bold italic">لا توجد قواعد مسجلة. ابدأ بإضافة قاعدتك الأولى.</p>
        </div>
      )}

      {/* Add Rule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white p-10 space-y-8 relative overflow-hidden">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-slate-800">قاعدة عرض جديدة</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">اسم القاعدة</label>
                    <input 
                      type="text" 
                      placeholder="مثلاً: خصم الجمعة"
                      value={newRule.name}
                      onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">حد المبيعات (طبق)</label>
                       <input 
                        type="number" 
                        value={newRule.threshold}
                        onChange={(e) => setNewRule({...newRule, threshold: Number(e.target.value)})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">نسبة الخصم %</label>
                       <input 
                        type="number" 
                        value={newRule.discountPercent}
                        onChange={(e) => setNewRule({...newRule, discountPercent: Number(e.target.value)})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between">
                       <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">أقل هامش مسموح (أمان)</label>
                       <span className="text-xs font-black text-blue-600">{newRule.minMarginPercent}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="70" 
                      step="5"
                      value={newRule.minMarginPercent}
                      onChange={(e) => setNewRule({...newRule, minMarginPercent: Number(e.target.value)})}
                      className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                 </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                 <button 
                   onClick={() => setIsModalOpen(false)}
                   className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                 >
                   إلغاء
                 </button>
                 <button 
                   onClick={handleAddRule}
                   className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
                 >
                   <Save size={16} />
                   حفظ القاعدة
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className="p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl flex flex-col md:flex-row gap-10 items-center overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
         <div className="w-20 h-20 bg-white/10 text-amber-400 rounded-3xl flex items-center justify-center shrink-0">
            <TrendingUp size={40} />
         </div>
         <div className="space-y-4 relative z-10">
            <h3 className="text-2xl font-black">كيف تعمل توصيات العروض؟</h3>
            <p className="text-slate-400 font-medium leading-relaxed max-w-2xl">يقوم النظام بمقارنة مبيعاتك الأسبوعية المستوردة مع هذه القواعد. إذا تجاوز صنف معين عدد الصحون المحدد، سيقترح عليك المساعد الذكي تطبيق الخصم المناسب لزيادة الحصة السوقية مع الحفاظ على الهامش الآمن.</p>
         </div>
      </div>
    </div>
  );
};

export default OffersRules;
