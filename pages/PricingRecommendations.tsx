
import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Sparkles, 
  Loader2, 
  Check, 
  AlertTriangle, 
  ArrowUpRight, 
  ChevronLeft,
  Search,
  Filter,
  BarChart3,
  Target
} from 'lucide-react';
import { getAIPriceGuidance } from '../services/gemini';
import { AIPriceRecommendation } from '../types';

interface MenuRecommendation extends AIPriceRecommendation {
  recipeId: string;
  recipeName: string;
  currentPrice: number;
  cost: number;
  currentMargin: number;
  loading: boolean;
}

const INITIAL_DATA: Partial<MenuRecommendation>[] = [
  { recipeId: '1', recipeName: 'برجر كلاسيك العائلي', cost: 4250, currentPrice: 12000, currentMargin: 64 },
  { recipeId: '2', recipeName: 'بيتزا دجاج سبايسي (وسط)', cost: 6800, currentPrice: 15000, currentMargin: 55 },
  { recipeId: '3', recipeName: 'باستا الفريدو كريمي', cost: 5900, currentPrice: 11000, currentMargin: 46 },
  { recipeId: '4', recipeName: 'سلطة سيزر الأصلية', cost: 2100, currentPrice: 8000, currentMargin: 74 },
];

const PricingRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<MenuRecommendation[]>(
    INITIAL_DATA.map(d => ({ 
      ...d, 
      loading: false, 
      conservative: 0, 
      balanced: 0, 
      aggressive: 0, 
      reasoning: '' 
    } as MenuRecommendation))
  );
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const targetMargin = 60;

  const getRecommendation = async (id: string) => {
    setRecommendations(prev => prev.map(r => r.recipeId === id ? { ...r, loading: true } : r));
    const item = recommendations.find(r => r.recipeId === id);
    if (!item) return;

    try {
      const rec = await getAIPriceGuidance(item.recipeName, item.cost, 'IQD', targetMargin);
      setRecommendations(prev => prev.map(r => r.recipeId === id ? { ...r, ...rec, loading: false } : r));
    } catch (error) {
      console.error(error);
      setRecommendations(prev => prev.map(r => r.recipeId === id ? { ...r, loading: false } : r));
    }
  };

  const runBulkOptimization = async () => {
    setIsBulkLoading(true);
    // Sequence the calls to avoid overwhelming the API and provide immediate feedback
    for (const item of recommendations) {
      await getRecommendation(item.recipeId);
    }
    setIsBulkLoading(false);
  };

  const applyNewPrice = (recipeId: string, price: number) => {
    alert(`تم تحديث سعر "${recommendations.find(r => r.recipeId === recipeId)?.recipeName}" إلى ${price.toLocaleString()} د.ع بنجاح!`);
    // In a real app, this would trigger a database update
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header section */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-3">محسن هوامش الربح</h1>
          <p className="text-slate-400 font-bold tracking-wide uppercase text-xs">AI-Powered Pricing Strategy & Margin Optimization</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={runBulkOptimization}
             disabled={isBulkLoading}
             className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-50 transition-all"
           >
             {isBulkLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} className="text-amber-400 group-hover:rotate-12 transition-transform" />}
             تحليل كامل المنيو
           </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-[2.5rem] shadow-sm flex flex-col gap-4 border border-white">
           <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <BarChart3 size={24} />
           </div>
           <div>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">متوسط هامش المنيو</span>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-slate-800">59.7%</p>
                <span className="text-[10px] text-rose-500 font-black flex items-center gap-0.5">
                   <ArrowUpRight size={10} className="rotate-180" /> 0.3% تحت الهدف
                </span>
              </div>
           </div>
        </div>
        <div className="glass-card p-8 rounded-[2.5rem] shadow-sm flex flex-col gap-4 border border-white">
           <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <Target size={24} />
           </div>
           <div>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">الهامش المستهدف</span>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-slate-800">{targetMargin}%</p>
                <span className="text-xs font-bold text-slate-400">حسب الإعدادات</span>
              </div>
           </div>
        </div>
        <div className="glass-card p-8 rounded-[2.5rem] shadow-sm flex flex-col gap-4 border border-white">
           <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
              <TrendingUp size={24} />
           </div>
           <div>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">الربح المفقود المتوقع</span>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-slate-800">1,250,000</p>
                <span className="text-[10px] text-slate-400 font-black uppercase">IQD / شهر</span>
              </div>
           </div>
        </div>
      </div>

      {/* Main Table section */}
      <div className="glass-card rounded-[2.5rem] shadow-sm border border-white overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="ابحث عن أطباق تحتاج لتحسين التسعير..."
              className="w-full pr-14 pl-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-200 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">
               <Filter size={18} />
               الفلترة
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-right border-collapse">
              <thead>
                 <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="px-8 py-6">الطبق</th>
                    <th className="px-8 py-6 text-center">التكلفة</th>
                    <th className="px-8 py-6 text-center">السعر الحالي</th>
                    <th className="px-8 py-6 text-center">الهامش</th>
                    <th className="px-8 py-6 text-left">توصية الذكاء الاصطناعي</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50/50">
                 {recommendations.map((item) => (
                    <tr key={item.recipeId} className="group hover:bg-slate-50/50 transition-all duration-300">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className={`w-2.5 h-2.5 rounded-full ${item.currentMargin < targetMargin ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                             <span className="font-black text-slate-800 text-base">{item.recipeName}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-center">
                          <div className="flex flex-col items-center">
                             <span className="font-bold text-slate-600">{item.cost.toLocaleString()}</span>
                             <span className="text-[9px] text-slate-400 uppercase">IQD</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-center">
                          <div className="flex flex-col items-center">
                             <span className="font-bold text-slate-600">{item.currentPrice.toLocaleString()}</span>
                             <span className="text-[9px] text-slate-400 uppercase">IQD</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-center">
                          <div className="flex flex-col items-center gap-1">
                             <span className={`font-black text-sm ${item.currentMargin < targetMargin ? 'text-rose-600' : 'text-emerald-600'}`}>
                                {item.currentMargin}%
                             </span>
                             <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${item.currentMargin < targetMargin ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                  style={{ width: `${item.currentMargin}%` }}
                                ></div>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-left">
                          {item.loading ? (
                             <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                                <Loader2 size={16} className="animate-spin" />
                                جاري التحليل...
                             </div>
                          ) : item.balanced > 0 ? (
                             <div className="flex items-center justify-end gap-6 animate-in fade-in slide-in-from-left-4">
                                <div className="flex flex-col items-end">
                                   <div className="flex items-baseline gap-1">
                                      <span className="font-black text-emerald-600 text-lg">{item.balanced.toLocaleString()}</span>
                                      <span className="text-[10px] text-slate-400 font-bold uppercase">IQD</span>
                                   </div>
                                   <button 
                                      onClick={() => setShowReasoning(item.recipeId)}
                                      className="text-[9px] font-black text-blue-500 uppercase hover:underline"
                                   >
                                      عرض الأسباب
                                   </button>
                                </div>
                                <button 
                                  onClick={() => applyNewPrice(item.recipeId, item.balanced)}
                                  className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center gap-2"
                                >
                                   <Check size={14} />
                                   تطبيق
                                </button>
                             </div>
                          ) : (
                             <button 
                               onClick={() => getRecommendation(item.recipeId)}
                               className="px-6 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                             >
                                الحصول على توصية
                             </button>
                          )}
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Reasoning Help Section */}
      <div className="p-10 glass-card rounded-[3rem] border border-white flex flex-col md:flex-row gap-10">
         <div className="md:w-1/3 flex flex-col gap-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
               <AlertTriangle size={32} />
            </div>
            <div>
               <h3 className="text-xl font-black text-slate-800 mb-2">كيف تعمل التوصيات؟</h3>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">يعتمد الذكاء الاصطناعي في MenuProfit على تحليل التكاليف الحقيقية، الهوامش المستهدفة، وعلم النفس في التسعير لاقتراح السعر الأمثل لكل طبق.</p>
            </div>
         </div>
         <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'تسعير محافظ', desc: 'يركز على جذب الزبائن بأقل زيادة ممكنة في السعر لتحسين الهامش.', icon: <Check className="text-emerald-500" /> },
              { title: 'تسعير هجومي', desc: 'يركز على تعظيم الأرباح بناءً على القيمة المدركة للطبق في السوق.', icon: <ArrowUpRight className="text-rose-500" /> },
            ].map((box, i) => (
              <div key={i} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 space-y-3">
                 <div className="flex items-center gap-2">
                    {box.icon}
                    <h5 className="font-black text-slate-800 text-sm">{box.title}</h5>
                 </div>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium">{box.desc}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

// Internal utility to mock state for the demo
function setShowReasoning(id: string) {
   // In a full implementation, this would open a modal with item.reasoning
   const rec = INITIAL_DATA.find(d => d.recipeId === id);
   alert(`تحليل طبق ${rec?.recipeName}:\n\nبناءً على التكلفة الحالية (${rec?.cost} د.ع)، السعر المقترح يحسن هامش الربح ليتناسب مع هدف الـ 60%. السعر المقترح يأخذ بعين الاعتبار القوة الشرائية وتغطية المصاريف التشغيلية.`);
}

export default PricingRecommendations;
