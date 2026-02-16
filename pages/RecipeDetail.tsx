
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Save, 
  Sparkles, 
  Check, 
  X, 
  Info, 
  AlertCircle, 
  Loader2, 
  TrendingUp, 
  DollarSign,
  AlertTriangle,
  Lightbulb,
  Settings,
  Zap,
  ChevronLeft,
  ChefHat
} from 'lucide-react';
import { 
  getAIRecipeAssistantSuggestions, 
  getAIPriceGuidance, 
  AISuggestion 
} from '../services/gemini';
import { AIPriceRecommendation } from '../types';

interface RecipeDetailProps {
  recipeId: string;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipeId, onBack }) => {
  const [recipeName, setRecipeName] = useState('برجر كلاسيك العائلي');
  const [targetMargin, setTargetMargin] = useState(60);
  const [ingredients, setIngredients] = useState([
    { name: 'لحم بقري مفروم (خشن)', quantity: 150, unit: 'غم', cost: 2100 },
    { name: 'خبز برجر بريوش', quantity: 1, unit: 'قطعة', cost: 500 },
    { name: 'جبن شيدر طبيعي', quantity: 0, unit: '', cost: 450 },
    { name: 'صوص منيو بروفيت الخاص', quantity: 30, unit: 'مل', cost: 300 },
  ]);

  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  
  const [pricingRecs, setPricingRecs] = useState<AIPriceRecommendation | null>(null);
  const [isPricingLoading, setIsPricingLoading] = useState(false);

  const totalCost = ingredients.reduce((sum, ing) => sum + ing.cost, 0);
  const overheadCost = 1200; 
  const trueCost = totalCost + overheadCost;

  const runAiAssistant = async () => {
    setIsAiLoading(true);
    setShowAiPanel(true);
    try {
      const suggestions = await getAIRecipeAssistantSuggestions(recipeName, ingredients);
      setAiSuggestions(suggestions);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const runPricingAssistant = async () => {
    setIsPricingLoading(true);
    try {
      const recs = await getAIPriceGuidance(recipeName, trueCost, 'IQD', targetMargin);
      setPricingRecs(recs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPricingLoading(false);
    }
  };

  const applySuggestion = (suggestion: AISuggestion) => {
    const isConfirmed = window.confirm(`هل أنت متأكد من تطبيق اقتراح الذكاء الاصطناعي لـ "${suggestion.originalName}"؟\nالكمية المقترحة: ${suggestion.suggestedQuantity} ${suggestion.suggestedUnit}`);
    
    if (isConfirmed) {
      const newIngredients = [...ingredients];
      newIngredients[suggestion.ingredientIndex] = {
        ...newIngredients[suggestion.ingredientIndex],
        quantity: suggestion.suggestedQuantity,
        unit: suggestion.suggestedUnit
      };
      setIngredients(newIngredients);
      setAiSuggestions(prev => prev.filter(s => s.ingredientIndex !== suggestion.ingredientIndex));
    }
  };

  const applyAllSuggestions = () => {
    const isConfirmed = window.confirm(`تطبيق جميع اقتراحات الذكاء الاصطناعي؟`);
    if (isConfirmed) {
      const newIngredients = [...ingredients];
      aiSuggestions.forEach(s => {
        newIngredients[s.ingredientIndex] = {
          ...newIngredients[s.ingredientIndex],
          quantity: s.suggestedQuantity,
          unit: s.suggestedUnit
        };
      });
      setIngredients(newIngredients);
      setAiSuggestions([]);
    }
  };

  const handleSave = () => {
    if (aiSuggestions.length > 0) {
      const isConfirmed = window.confirm(`تنبيه: يوجد ${aiSuggestions.length} اقتراحات لم تتم مراجعتها. هل تود الحفظ؟`);
      if (!isConfirmed) {
        setShowAiPanel(true);
        return;
      }
    }
    alert('تم الحفظ بنجاح!');
    onBack();
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      {/* Header Actions */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="w-14 h-14 bg-white shadow-md hover:shadow-xl rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all duration-300 border border-slate-100 group">
            <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">{recipeName}</h1>
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest">Active Recipe</div>
            </div>
            <p className="text-slate-400 font-bold tracking-wide">ID: #REC-82921 • تم التحديث قبل ساعتين</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={onBack} className="px-8 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-200 transition-all text-sm uppercase">إلغاء</button>
           <button 
              onClick={handleSave}
              className={`
                group relative flex items-center gap-3 px-10 py-4 rounded-2xl font-black shadow-2xl transition-all duration-500 overflow-hidden
                ${aiSuggestions.length > 0 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/30' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-blue-600/30'}
              `}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              {aiSuggestions.length > 0 ? <Sparkles size={20} className="animate-spin-slow" /> : <Save size={20} />}
              <span className="relative z-10 uppercase tracking-widest text-sm">حفظ الوصفة</span>
              {aiSuggestions.length > 0 && (
                <span className="relative z-10 bg-white text-amber-600 text-[11px] w-6 h-6 flex items-center justify-center rounded-full font-black shadow-sm">
                  {aiSuggestions.length}
                </span>
              )}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-10">
          {/* Ingredients Table */}
          <div className="glass-card rounded-[2.5rem] shadow-sm border border-white overflow-hidden">
            <div className="p-8 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                  {/* Fixed ChefHat missing import */}
                  <ChefHat className="text-blue-600" size={24} />
                  هيكل المكونات
                </h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Detailed Ingredients Breakdown</p>
              </div>
              <button 
                onClick={runAiAssistant}
                disabled={isAiLoading}
                className="group flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
              >
                {isAiLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} className="text-amber-400 group-hover:rotate-12 transition-transform" />}
                مساعد التكاليف الذكي
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                    <th className="px-8 py-6">المادة</th>
                    <th className="px-8 py-6 text-center">الكمية</th>
                    <th className="px-8 py-6 text-center">الوحدة</th>
                    <th className="px-8 py-6 text-left">التكلفة (IQD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50/50">
                  {ingredients.map((ing, idx) => {
                    const hasSuggestion = aiSuggestions.some(s => s.ingredientIndex === idx);
                    return (
                      <tr key={idx} className={`group transition-all duration-300 hover:bg-blue-50/30 ${hasSuggestion ? 'bg-amber-50/30' : ''}`}>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-2.5 h-2.5 rounded-full transition-all ${ing.quantity === 0 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : hasSuggestion ? 'bg-amber-500 animate-pulse' : 'bg-slate-200 group-hover:bg-blue-400'}`}></div>
                            <span className="font-black text-slate-700 text-base">{ing.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <input 
                            type="number" 
                            value={ing.quantity} 
                            onChange={(e) => {
                              const newIngs = [...ingredients];
                              newIngs[idx].quantity = Number(e.target.value);
                              setIngredients(newIngs);
                            }}
                            className={`w-28 text-center py-2.5 rounded-2xl border-2 transition-all font-black focus:ring-4 focus:ring-blue-100 outline-none ${ing.quantity === 0 ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-slate-50/50 border-transparent text-slate-700 hover:bg-white hover:border-slate-100'}`}
                          />
                        </td>
                        <td className="px-8 py-6 text-center">
                          <input 
                            type="text" 
                            value={ing.unit} 
                            onChange={(e) => {
                              const newIngs = [...ingredients];
                              newIngs[idx].unit = e.target.value;
                              setIngredients(newIngs);
                            }}
                            placeholder="الوحدة"
                            className={`w-24 text-center py-2.5 rounded-2xl border-2 transition-all font-black focus:ring-4 focus:ring-blue-100 outline-none ${!ing.unit ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-slate-50/50 border-transparent text-slate-700 hover:bg-white hover:border-slate-100'}`}
                          />
                        </td>
                        <td className="px-8 py-6 text-left">
                          <div className="flex flex-col">
                             <span className="font-black text-slate-800 text-lg tracking-tight">{ing.cost.toLocaleString()}</span>
                             <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">IQD Total</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-8 bg-slate-900 text-white flex justify-between items-center shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="flex flex-col relative z-10">
                 <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-1">Subtotal Materials</span>
                 <span className="text-3xl font-black">{totalCost.toLocaleString()} <span className="text-sm font-bold text-slate-500">IQD</span></span>
               </div>
               <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 backdrop-blur-md">
                    <Zap size={24} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col text-left">
                     <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Pricing Efficiency</span>
                     <span className="text-xl font-black">Optimum</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Pricing AI Section */}
          <div className="glass-card rounded-[2.5rem] shadow-sm border border-white p-10">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-[1.25rem] flex items-center justify-center shadow-inner">
                    <TrendingUp size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">تحليل التسعير المقترح</h3>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">AI-Driven Strategic Pricing Models</p>
                  </div>
                </div>
                <button 
                  onClick={runPricingAssistant}
                  disabled={isPricingLoading}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-2xl text-xs font-black hover:bg-emerald-700 transition-all flex items-center gap-3 shadow-xl shadow-emerald-600/20 active:scale-95"
                >
                  {isPricingLoading ? <Loader2 size={20} className="animate-spin" /> : <DollarSign size={20} />}
                  توليد الأسعار الذكية
                </button>
             </div>
             
             {!pricingRecs && !isPricingLoading ? (
                <div className="py-20 flex flex-col items-center text-center max-w-sm mx-auto">
                   <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-slate-200">
                      <DollarSign size={40} />
                   </div>
                   <h4 className="font-black text-slate-800 text-lg mb-2">في انتظار التحليل</h4>
                   <p className="text-sm text-slate-400 font-bold leading-relaxed">اضغط على زر التوليد للسماح لمساعدنا الذكي بتحليل تكاليف الطبق واقتراح الأسعار الأفضل للسوق العراقي.</p>
                </div>
             ) : isPricingLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                   <div className="relative">
                      <div className="w-20 h-20 border-4 border-emerald-100 rounded-full animate-pulse"></div>
                      <Loader2 size={40} className="animate-spin text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                   </div>
                   <p className="text-sm font-black text-slate-800 uppercase tracking-widest animate-pulse">Analyzing Market Trends...</p>
                </div>
             ) : (
                <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { label: 'سعر محافظ', sub: 'Conservative', value: pricingRecs!.conservative, color: 'slate' },
                        { label: 'سعر متوازن', sub: 'Balanced', value: pricingRecs!.balanced, color: 'blue' },
                        { label: 'سعر هجومي', sub: 'Aggressive', value: pricingRecs!.aggressive, color: 'rose' },
                      ].map((tier, i) => (
                        <div key={i} className={`bg-${tier.color}-50/50 p-8 rounded-[2rem] border-2 border-transparent hover:border-${tier.color}-200 transition-all group cursor-pointer relative overflow-hidden active:scale-95`}>
                           <div className="relative z-10">
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">{tier.sub}</p>
                              <h5 className={`text-lg font-black text-${tier.color}-700 mb-6`}>{tier.label}</h5>
                              <div className="flex items-baseline gap-2">
                                <span className={`text-3xl font-black text-slate-900`}>{tier.value.toLocaleString()}</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase">IQD</span>
                              </div>
                              <div className="mt-8 pt-6 border-t border-slate-200/50 flex items-center justify-between text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[11px] font-black uppercase tracking-widest">Apply Now</span>
                                <ChevronLeft size={16} />
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex gap-6 items-start">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                        <Lightbulb size={24} />
                      </div>
                      <div className="space-y-2">
                         <h6 className="text-sm font-black text-blue-900 uppercase tracking-widest">AI Strategic Insights:</h6>
                         <p className="text-base text-blue-700/80 leading-relaxed font-medium">{pricingRecs!.reasoning}</p>
                      </div>
                   </div>
                </div>
             )}
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="xl:col-span-4 space-y-10">
          {/* Cost Summary Card */}
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
            
            <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
               <span className="w-8 h-px bg-slate-700"></span>
               Final Cost Matrix
            </h3>

            <div className="space-y-8 relative z-10">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                   <span className="text-xs text-slate-500 font-bold mb-1">Raw Materials</span>
                   <span className="text-xl font-black tracking-tight">{totalCost.toLocaleString()}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold mb-1">IQD</span>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                   <span className="text-xs text-slate-500 font-bold mb-1">Fixed Overhead</span>
                   <span className="text-xl font-black tracking-tight">{overheadCost.toLocaleString()}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold mb-1">IQD</span>
              </div>
              
              <div className="py-10 border-t border-slate-800 flex flex-col gap-2">
                 <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Break-even Point</span>
                 <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black text-white tracking-tighter">{(totalCost + overheadCost).toLocaleString()}</span>
                    <span className="text-amber-500 font-black text-sm">IQD</span>
                 </div>
                 <p className="text-[10px] text-slate-500 font-bold mt-2 leading-relaxed italic">يجب بيع الطبق بهذا السعر على الأقل لتغطية كافة التكاليف والمصاريف التشغيلية.</p>
              </div>
            </div>
          </div>

          {/* AI Suggestions Floating Panel */}
          {showAiPanel && (
            <div className="glass-card rounded-[2.5rem] shadow-2xl border border-blue-100 overflow-hidden ring-1 ring-blue-50 animate-in slide-in-from-left-8 duration-500">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-black text-sm tracking-tight">اقتراحات التحسين الذكية</h3>
                    <span className="text-[9px] font-black text-blue-200 uppercase tracking-widest">Optimized suggestions</span>
                  </div>
                </div>
                <button onClick={() => setShowAiPanel(false)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
                {isAiLoading ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-blue-500" size={32} />
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Processing Recipe Data...</p>
                  </div>
                ) : aiSuggestions.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center mb-4 px-2">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{aiSuggestions.length} Opportunities found</span>
                      <button onClick={applyAllSuggestions} className="text-xs font-black text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">Apply All</button>
                    </div>
                    {aiSuggestions.map((suggestion, i) => (
                      <div key={i} className="p-6 bg-blue-50/50 rounded-[1.5rem] border border-blue-100 space-y-4 group hover:bg-white hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-3 text-blue-800 font-black">
                           <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs">{i+1}</div>
                           <span className="text-sm">{suggestion.originalName}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium italic">"{suggestion.reason}"</p>
                        <div className="flex items-center justify-between pt-4 border-t border-blue-100/50">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Suggested Change</span>
                            <span className="font-black text-blue-700 text-base">{suggestion.suggestedQuantity} {suggestion.suggestedUnit}</span>
                          </div>
                          <button 
                            onClick={() => applySuggestion(suggestion)}
                            className="bg-white border-2 border-blue-100 text-blue-600 px-5 py-2 rounded-xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                          >
                            تطبيق
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="py-16 text-center space-y-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-slate-200">
                       <Check className="text-slate-300" size={32} />
                    </div>
                    <p className="text-sm text-slate-400 font-bold leading-relaxed px-4">وصفتك مكتملة واحترافية! المساعد الذكي لم يجد أي أخطاء أو نواقص حالياً.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Configuration Card */}
          <div className="glass-card p-10 rounded-[3rem] shadow-sm border border-white">
             <h3 className="text-slate-800 text-sm font-black uppercase tracking-widest mb-10 flex items-center gap-3">
                <Settings size={20} className="text-slate-400" />
                هوامش الربح المستهدفة
             </h3>
             <div className="space-y-10">
                <div className="space-y-6">
                   <div className="flex justify-between items-end">
                      <label className="text-xs text-slate-400 font-black uppercase tracking-widest">Target Margin (%)</label>
                      <span className="text-3xl font-black text-blue-600 tracking-tighter">{targetMargin}%</span>
                   </div>
                   <input 
                      type="range" 
                      min="10" 
                      max="90" 
                      step="5"
                      value={targetMargin}
                      onChange={(e) => setTargetMargin(Number(e.target.value))}
                      className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                   />
                </div>
                <div className="p-6 bg-amber-50 rounded-3xl text-xs text-amber-700 leading-relaxed font-bold border border-amber-100">
                   تغيير هذا الهامش يؤدي إلى إعادة حساب مقترحات التسعير والتحليل المالي للوصفة بشكل فوري.
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
