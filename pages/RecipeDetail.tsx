
import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  Save, 
  Sparkles, 
  Check, 
  X, 
  Loader2, 
  TrendingUp, 
  DollarSign,
  AlertTriangle,
  Lightbulb,
  Zap,
  ChevronLeft,
  ChefHat,
  Users,
  Plus,
  Trash2,
  PieChart,
  BarChart2,
  Calculator,
  Info,
  ArrowDownRight,
  ArrowUpRight,
  Target,
  ArrowRightLeft
} from 'lucide-react';
import { 
  getAIRecipeAssistantSuggestions, 
  getAIPriceGuidance, 
  AISuggestion 
} from '../services/gemini';
import { AIPriceRecommendation, Recipe, Ingredient, UserProfile, CompetitorPrice } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  ingredientsList: Ingredient[];
  overheadPerDish: number;
  userProfile: UserProfile;
  onUpdate: (recipe: Recipe) => void;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ 
  recipe, 
  ingredientsList, 
  overheadPerDish, 
  userProfile,
  onUpdate, 
  onBack 
}) => {
  const [activeTab, setActiveTab] = useState<'costs' | 'competitors' | 'pricing' | 'ai'>('costs');
  const [editedRecipe, setEditedRecipe] = useState<Recipe>(recipe);
  
  const [newCompName, setNewCompName] = useState('');
  const [newCompPrice, setNewCompPrice] = useState<number>(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [pricingRecs, setPricingRecs] = useState<AIPriceRecommendation | null>(null);
  const [costingSuggestions, setCostingSuggestions] = useState<AISuggestion[]>([]);

  const foodCost = useMemo(() => {
    return editedRecipe.ingredients.reduce((sum, ri) => {
      const ing = ingredientsList.find(i => i.id === ri.ingredientId);
      return sum + (ing ? ing.pricePerUnit * ri.quantity : 0);
    }, 0);
  }, [editedRecipe.ingredients, ingredientsList]);

  const trueCost = foodCost + overheadPerDish;
  
  const calculateMargin = (price: number) => {
    return price > 0 ? ((price - foodCost) / price) * 100 : 0;
  };

  const currentMargin = calculateMargin(editedRecipe.sellingPrice);

  const handleSave = () => {
    if (costingSuggestions.length > 0) {
      const confirmSave = window.confirm(`يوجد ${costingSuggestions.length} اقتراحات من الذكاء الاصطناعي لم تقم بمراجعتها بعد. هل أنت متأكد من رغبتك في الحفظ دون تطبيق التحسينات؟`);
      if (!confirmSave) {
        setActiveTab('ai');
        return;
      }
    }
    onUpdate(editedRecipe);
    alert('تم حفظ التعديلات بنجاح!');
  };

  const addCompetitor = () => {
    if (!newCompName || newCompPrice <= 0) return;
    const newComp: CompetitorPrice = {
      id: Date.now().toString(),
      name: newCompName,
      price: newCompPrice,
      updatedAt: new Date()
    };
    setEditedRecipe({ ...editedRecipe, competitors: [...editedRecipe.competitors, newComp] });
    setNewCompName('');
    setNewCompPrice(0);
  };

  const removeCompetitor = (id: string) => {
    setEditedRecipe({ ...editedRecipe, competitors: editedRecipe.competitors.filter(c => c.id !== id) });
  };

  const runAICostAnalysis = async () => {
    setIsAiLoading(true);
    try {
      const currentIngredients = editedRecipe.ingredients.map(ri => {
        const ing = ingredientsList.find(i => i.id === ri.ingredientId);
        return { name: ing?.name || '', quantity: ri.quantity, unit: ing?.unit || '' };
      });
      const suggestions = await getAIRecipeAssistantSuggestions(editedRecipe.name, currentIngredients);
      setCostingSuggestions(suggestions);
      setActiveTab('ai');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const generateAIPriceRecs = async () => {
    setIsAiLoading(true);
    try {
      const rec = await getAIPriceGuidance(editedRecipe.name, trueCost, editedRecipe.currency, userProfile.targetMarginPercent);
      setPricingRecs(rec);
      setActiveTab('pricing');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const applyCostingSuggestion = (suggestion: AISuggestion) => {
    const updatedIngredients = [...editedRecipe.ingredients];
    const ing = updatedIngredients[suggestion.ingredientIndex];
    if (ing) {
      ing.quantity = suggestion.suggestedQuantity;
      // Re-calculate cost for this ingredient
      const baseIng = ingredientsList.find(i => i.id === ing.ingredientId);
      if (baseIng) {
        ing.cost = baseIng.pricePerUnit * suggestion.suggestedQuantity;
      }
      setEditedRecipe({ ...editedRecipe, ingredients: updatedIngredients });
      setCostingSuggestions(prev => prev.filter(s => s.ingredientIndex !== suggestion.ingredientIndex));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="w-14 h-14 bg-white shadow-md border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">
            <ArrowRight size={28} />
          </button>
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">{editedRecipe.name}</h1>
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">{editedRecipe.category || 'صنف غير محدد'}</p>
          </div>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={runAICostAnalysis}
             disabled={isAiLoading}
             className="px-8 py-4 bg-white border border-slate-100 text-slate-700 rounded-2xl font-black text-sm shadow-sm hover:shadow-xl transition-all flex items-center gap-3 group"
           >
             {isAiLoading ? <Loader2 size={18} className="animate-spin text-blue-600" /> : <Zap size={18} className="text-amber-500 group-hover:scale-125 transition-transform" />}
             تحسين التكاليف AI
           </button>
           
           <div className="relative group">
              {costingSuggestions.length > 0 && (
                <div className="absolute -top-3 -right-3 z-10 bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg animate-bounce border-2 border-white">
                  {costingSuggestions.length} اقتراحات معلقة
                </div>
              )}
              <button 
                onClick={handleSave}
                className={`px-10 py-4 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center gap-3 active:scale-95 ${
                  costingSuggestions.length > 0 
                  ? 'bg-amber-600 text-white shadow-amber-600/30 ring-4 ring-amber-100 animate-pulse' 
                  : 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700'
                }`}
              >
                <Save size={18} />
                {costingSuggestions.length > 0 ? 'مراجعة وحفظ الوصفة' : 'حفظ الوصفة'}
              </button>
           </div>
        </div>
      </div>

      {/* Tabs Nav */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-[1.5rem] w-fit">
        {[
          { id: 'costs', label: 'التكاليف', icon: <Calculator size={16} /> },
          { id: 'competitors', label: 'المنافسين', icon: <Users size={16} /> },
          { id: 'pricing', label: 'التسعير', icon: <DollarSign size={16} /> },
          { id: 'ai', label: 'تحسين AI', icon: <Sparkles size={16} />, elite: true, hasAlert: costingSuggestions.length > 0 },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-2xl text-xs font-black transition-all relative
              ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}
            `}
          >
            {tab.icon}
            {tab.label}
            {tab.elite && <span className="bg-amber-100 text-amber-600 text-[8px] px-1.5 py-0.5 rounded-full mr-1">Elite</span>}
            {tab.hasAlert && <span className="absolute -top-1 -left-1 w-3 h-3 bg-amber-500 border-2 border-white rounded-full"></span>}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8">
          {activeTab === 'costs' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="glass-card rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
                <table className="w-full text-right">
                  <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-6">المكون</th>
                      <th className="px-8 py-6 text-center">الكمية</th>
                      <th className="px-8 py-6 text-left">التكلفة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {editedRecipe.ingredients.map((ri, idx) => {
                      const ing = ingredientsList.find(i => i.id === ri.ingredientId);
                      return (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6 font-bold text-slate-700">{ing?.name}</td>
                          <td className="px-8 py-6 text-center font-bold">{ri.quantity} {ing?.unit}</td>
                          <td className="px-8 py-6 text-left font-black text-slate-900">{ri.cost.toLocaleString()} د.ع</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="p-8 bg-slate-50 flex justify-between items-center">
                   <span className="font-black text-slate-400 uppercase text-[10px] tracking-widest">إجمالي تكلفة المواد</span>
                   <span className="text-2xl font-black text-blue-600">{foodCost.toLocaleString()} د.ع</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'competitors' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="glass-card p-10 rounded-[2.5rem] border border-white space-y-8">
                <h3 className="text-xl font-black text-slate-800">إضافة سعر منافس</h3>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="اسم المطعم المنافس"
                    value={newCompName}
                    onChange={(e) => setNewCompName(e.target.value)}
                    className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-100"
                  />
                  <input 
                    type="number" 
                    placeholder="السعر"
                    value={newCompPrice || ''}
                    onChange={(e) => setNewCompPrice(Number(e.target.value))}
                    className="w-32 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-100"
                  />
                  <button onClick={addCompetitor} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm">إضافة</button>
                </div>

                <div className="space-y-4">
                  {editedRecipe.competitors.map(comp => (
                    <div key={comp.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <div>
                        <h4 className="font-black text-slate-800">{comp.name}</h4>
                        <span className="text-[10px] text-slate-400 font-bold">آخر تحديث: {new Date(comp.updatedAt).toLocaleDateString('ar-IQ')}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-black text-lg text-slate-900">{comp.price.toLocaleString()} د.ع</span>
                        <button onClick={() => removeCompetitor(comp.id)} className="text-slate-300 hover:text-rose-500">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="glass-card p-10 rounded-[2.5rem] border border-white space-y-10">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-black text-slate-800">تحليل وتسعير الطبق</h3>
                   <button 
                    onClick={generateAIPriceRecs}
                    disabled={isAiLoading}
                    className="text-blue-600 font-black text-xs flex items-center gap-2 hover:underline disabled:opacity-50"
                   >
                     {isAiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                     تحديث توصيات AI
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-4">
                      <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">سعر البيع الحالي</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={editedRecipe.sellingPrice || ''}
                          onChange={(e) => setEditedRecipe({...editedRecipe, sellingPrice: Number(e.target.value)})}
                          className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-3xl font-black focus:ring-8 focus:ring-blue-100 outline-none text-blue-600"
                        />
                        <span className="absolute left-8 top-1/2 -translate-y-1/2 font-black text-slate-400 uppercase tracking-widest">IQD</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex flex-col justify-center">
                         <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest block mb-1">هامش الربح الحالي</span>
                         <span className="text-2xl font-black text-blue-600">{currentMargin.toFixed(1)}%</span>
                      </div>
                      <div className="p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-100 flex flex-col justify-center">
                         <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest block mb-1">الربح الصافي للطبق</span>
                         <span className="text-2xl font-black text-emerald-600">{(editedRecipe.sellingPrice - trueCost).toLocaleString()}</span>
                      </div>
                   </div>
                </div>

                {pricingRecs && (
                  <div className="pt-10 border-t border-slate-100 space-y-8 animate-in zoom-in-95">
                     <div className="flex items-center gap-3">
                        <Sparkles className="text-amber-500" />
                        <h4 className="font-black text-slate-800">خيارات التسعير الذكية (الخيارات المقترحة)</h4>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { label: 'سعر محافظ', price: pricingRecs.conservative, color: 'blue', icon: <ArrowDownRight size={18} />, desc: 'لزيادة حجم المبيعات وجذب زبائن جدد' },
                          { label: 'سعر متوازن', price: pricingRecs.balanced, color: 'indigo', icon: <TrendingUp size={18} />, desc: 'لتحقيق التوازن المثالي بين الربح والمبيعات' },
                          { label: 'سعر هجومي', price: pricingRecs.aggressive, color: 'emerald', icon: <ArrowUpRight size={18} />, desc: 'للمنتجات الفريدة ذات القيمة العالية' },
                        ].map((rec, i) => {
                          const margin = calculateMargin(rec.price);
                          return (
                            <div 
                              key={i} 
                              className={`p-8 bg-${rec.color}-50/40 border-2 border-white hover:border-${rec.color}-200 rounded-[2.5rem] transition-all flex flex-col gap-4 relative group shadow-sm`}
                            >
                               <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{rec.label}</span>
                                  <div className={`p-2 bg-white rounded-xl text-${rec.color}-600 shadow-sm group-hover:scale-110 transition-transform`}>{rec.icon}</div>
                               </div>
                               <div>
                                  <span className="text-2xl font-black text-slate-900">{rec.price.toLocaleString()}</span>
                                  <span className="text-[10px] text-slate-400 font-bold mr-1">IQD</span>
                               </div>
                               <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{rec.desc}</p>
                               <div className="flex items-center justify-between pt-2">
                                  <span className="text-[10px] text-slate-400 font-bold">الهامش المتوقع:</span>
                                  <span className={`text-xs font-black ${margin >= userProfile.targetMarginPercent ? 'text-emerald-600' : 'text-amber-600'}`}>
                                     {margin.toFixed(1)}%
                                  </span>
                               </div>
                               <button 
                                 onClick={() => setEditedRecipe({...editedRecipe, sellingPrice: rec.price})}
                                 className={`mt-2 py-3 bg-white text-${rec.color}-600 border border-${rec.color}-100 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-${rec.color}-600 hover:text-white transition-all`}
                               >
                                  تطبيق هذا السعر
                               </button>
                            </div>
                          );
                        })}
                     </div>
                     <div className="p-8 bg-blue-50/30 rounded-[2rem] border border-blue-100 flex gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                           <Lightbulb size={24} />
                        </div>
                        <div className="space-y-1">
                           <p className="text-xs text-blue-400 font-black uppercase tracking-widest">توضيح السبب (AI Reasoning)</p>
                           <p className="text-sm text-blue-900 font-bold leading-relaxed">{pricingRecs.reasoning}</p>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
               {costingSuggestions.length > 0 ? (
                 <div className="glass-card rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
                    <div className="p-8 bg-amber-50/50 border-b border-amber-100 flex items-center justify-between">
                       <h3 className="text-xl font-black text-amber-900 flex items-center gap-3">
                          <Zap size={24} />
                          اقتراحات تحسين المكونات (AI Analysis)
                       </h3>
                       <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">Elite Feature</span>
                    </div>
                    <div className="overflow-x-auto">
                       <table className="w-full text-right">
                          <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                             <tr>
                                <th className="px-8 py-6">المكون</th>
                                <th className="px-8 py-6 text-center">الوضع الحالي</th>
                                <th className="px-8 py-6 text-center">اقتراح AI</th>
                                <th className="px-8 py-6">السبب والتحليل</th>
                                <th className="px-8 py-6"></th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                             {costingSuggestions.map((suggestion, i) => (
                               <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                  <td className="px-8 py-6 font-bold text-slate-800">{suggestion.originalName}</td>
                                  <td className="px-8 py-6 text-center">
                                     <span className="text-slate-400 font-bold line-through block text-[10px]">الأصلي</span>
                                     <span className="text-slate-500 font-black">
                                        {editedRecipe.ingredients[suggestion.ingredientIndex]?.quantity} {suggestion.suggestedUnit}
                                     </span>
                                  </td>
                                  <td className="px-8 py-6 text-center">
                                     <div className="flex flex-col items-center gap-1">
                                        <ArrowRightLeft size={12} className="text-emerald-400" />
                                        <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-xl font-black text-sm border border-emerald-100 shadow-sm">
                                           {suggestion.suggestedQuantity} {suggestion.suggestedUnit}
                                        </span>
                                     </div>
                                  </td>
                                  <td className="px-8 py-6 text-xs font-bold text-slate-500 max-w-sm leading-relaxed">
                                     <div className="bg-white p-3 rounded-xl border border-slate-100 text-slate-600 italic">
                                        "{suggestion.reason}"
                                     </div>
                                  </td>
                                  <td className="px-8 py-6">
                                     <button 
                                      onClick={() => applyCostingSuggestion(suggestion)}
                                      className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-md active:scale-95"
                                     >
                                        تطبيق <Check size={14} />
                                     </button>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
               ) : (
                 <div className="glass-card p-16 rounded-[3rem] border border-white flex flex-col items-center text-center gap-8">
                    <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-inner group">
                       <Sparkles size={48} className="group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <div className="space-y-4 max-w-sm">
                       <h3 className="text-2xl font-black text-slate-800">مساعد تحسين الوصفات AI</h3>
                       <p className="text-sm text-slate-400 font-bold leading-relaxed">بإمكاني مراجعة كميات المكونات واقتراح تعديلات بناءً على معايير المطاعم الاحترافية لتقليل الهدر وتحسين الربحية.</p>
                    </div>
                    <button 
                      onClick={runAICostAnalysis}
                      disabled={isAiLoading}
                      className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-sm shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center gap-3 disabled:opacity-50 active:scale-95"
                    >
                      {isAiLoading ? <Loader2 size={24} className="animate-spin" /> : <Zap size={24} />}
                      بدء تحليل المكونات الآن
                    </button>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Cost Sidebar Summary */}
        <div className="xl:col-span-4 space-y-10">
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent"></div>
            
            <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
               <PieChart size={16} />
               هيكل التكاليف
            </h3>

            <div className="space-y-8 relative z-10">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                   <span className="text-xs text-slate-500 font-bold mb-1">تكلفة المواد (Food Cost)</span>
                   <span className="text-2xl font-black tracking-tight">{foodCost.toLocaleString()}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">د.ع</span>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                   <span className="text-xs text-slate-500 font-bold mb-1">المصاريف الثابتة للطبق</span>
                   <span className="text-2xl font-black tracking-tight">{Math.round(overheadPerDish).toLocaleString()}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">د.ع</span>
              </div>
              
              <div className="pt-8 border-t border-slate-800 flex flex-col gap-2">
                 <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">التكلفة الحقيقية (Break-even)</span>
                 <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black text-white tracking-tighter">{Math.round(trueCost).toLocaleString()}</span>
                    <span className="text-amber-500 font-black text-sm">IQD</span>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-[2.5rem] border border-white flex gap-4 items-start shadow-sm bg-blue-50/30">
             <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
               <Info size={20} />
             </div>
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">تلميحة ذكية</h5>
                <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                   تقليل تكلفة المكونات بنسبة 5% فقط قد يؤدي إلى زيادة صافي أرباحك السنوية بمقدار مليون دينار عراقي لكل 1000 وجبة.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
