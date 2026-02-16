
import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  Save, 
  Plus, 
  Trash2, 
  ShoppingCart, 
  Calculator, 
  TrendingUp, 
  Zap, 
  Sparkles,
  Info
} from 'lucide-react';
import { Ingredient, Recipe, RecipeIngredient, Currency } from '../types';

interface RecipeNewProps {
  ingredientsList: Ingredient[];
  overheadPerDish: number;
  targetMargin: number;
  onSave: (recipe: Recipe) => void;
  onBack: () => void;
}

const RecipeNew: React.FC<RecipeNewProps> = ({ 
  ingredientsList, 
  overheadPerDish, 
  targetMargin, 
  onSave, 
  onBack 
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>(Currency.IQD);
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
  
  // Selection state
  const [selectedIngId, setSelectedIngId] = useState('');
  const [selectedQty, setSelectedQty] = useState<number>(0);

  const foodCost = useMemo(() => {
    return recipeIngredients.reduce((sum, ri) => sum + ri.cost, 0);
  }, [recipeIngredients]);

  const trueCost = foodCost + overheadPerDish;
  const suggestedPrice = trueCost / (1 - targetMargin / 100);

  const addIngredient = () => {
    if (!selectedIngId || selectedQty <= 0) return;
    const ing = ingredientsList.find(i => i.id === selectedIngId);
    if (!ing) return;

    const newItem: RecipeIngredient = {
      ingredientId: selectedIngId,
      quantity: selectedQty,
      cost: ing.pricePerUnit * selectedQty
    };

    setRecipeIngredients([...recipeIngredients, newItem]);
    setSelectedIngId('');
    setSelectedQty(0);
  };

  const removeIngredient = (idx: number) => {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (!name) return alert('يرجى إدخال اسم الوصفة');
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      name,
      category,
      sellingPrice,
      currency,
      ingredients: recipeIngredients,
      competitors: []
    };
    onSave(newRecipe);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">
            <ArrowRight size={24} className="rotate-0" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-800">إنشاء وصفة جديدة</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Design your menu item cost structure</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-3"
        >
          <Save size={18} />
          حفظ الوصفة
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-8">
          {/* Basic Info */}
          <div className="glass-card p-10 rounded-[2.5rem] border border-white space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">اسم الوصفة</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثلاً: كريسبي تشيكن برجر"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">التصنيف</label>
                <input 
                  type="text" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="مثلاً: وجبات سريعة"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">سعر البيع المقترح (اختياري)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={sellingPrice || ''}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                  />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xs">{currency}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="glass-card rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
            <div className="p-8 bg-slate-50/50 border-b border-slate-100">
               <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                 <ShoppingCart size={24} className="text-blue-600" />
                 مكونات الوصفة
               </h3>
            </div>
            
            <div className="p-8 space-y-8">
              {/* Add Bar */}
              <div className="flex flex-col md:flex-row gap-4">
                 <div className="flex-1">
                    <select 
                      value={selectedIngId}
                      onChange={(e) => setSelectedIngId(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">اختر مادة خام...</option>
                      {ingredientsList.map(i => (
                        <option key={i.id} value={i.id}>{i.name} ({i.unit})</option>
                      ))}
                    </select>
                 </div>
                 <div className="md:w-32">
                    <input 
                      type="number" 
                      placeholder="الكمية"
                      value={selectedQty || ''}
                      onChange={(e) => setSelectedQty(Number(e.target.value))}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-100"
                    />
                 </div>
                 <button 
                  onClick={addIngredient}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all active:scale-95"
                 >
                    إضافة
                 </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                 <table className="w-full text-right">
                    <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                       <tr>
                          <th className="px-6 py-4">المادة</th>
                          <th className="px-6 py-4 text-center">الكمية</th>
                          <th className="px-6 py-4 text-left">التكلفة</th>
                          <th className="px-6 py-4 w-10"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {recipeIngredients.map((ri, idx) => {
                         const ing = ingredientsList.find(i => i.id === ri.ingredientId);
                         return (
                           <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-700">{ing?.name}</td>
                              <td className="px-6 py-4 text-center font-bold">{ri.quantity} {ing?.unit}</td>
                              <td className="px-6 py-4 text-left font-black text-blue-600">{ri.cost.toLocaleString()} د.ع</td>
                              <td className="px-6 py-4">
                                 <button onClick={() => removeIngredient(idx)} className="text-slate-300 hover:text-rose-500">
                                    <Trash2 size={16} />
                                 </button>
                              </td>
                           </tr>
                         );
                       })}
                       {recipeIngredients.length === 0 && (
                         <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-bold italic">لا توجد مكونات مضافة لهذه الوصفة بعد.</td>
                         </tr>
                       )}
                    </tbody>
                 </table>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Calculator */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl space-y-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent"></div>
              
              <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                 <Calculator size={16} />
                 Live Cost Calculation
              </h3>

              <div className="space-y-6 relative z-10">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">تكلفة المواد (Food Cost):</span>
                    <span className="font-black">{foodCost.toLocaleString()} د.ع</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">مصاريف التشغيل للطبق:</span>
                    <span className="font-black">{Math.round(overheadPerDish).toLocaleString()} د.ع</span>
                 </div>
                 
                 <div className="pt-6 border-t border-slate-800 space-y-2">
                    <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">إجمالي التكلفة الحقيقية</span>
                    <div className="text-4xl font-black">{Math.round(trueCost).toLocaleString()} <span className="text-xs text-slate-500">د.ع</span></div>
                 </div>

                 <div className="pt-8 space-y-4">
                    <div className="flex items-center gap-2 bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
                       <Sparkles size={18} className="text-amber-400" />
                       <div className="flex flex-col">
                          <span className="text-[9px] text-blue-300 font-black uppercase tracking-widest">السعر المقترح (Target {targetMargin}%)</span>
                          <span className="text-xl font-black text-white">{Math.ceil(suggestedPrice / 250) * 250} د.ع</span>
                       </div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold italic leading-relaxed">
                       * تم تقريب السعر المقترح لأقرب 250 د.ع لتناسب السوق العراقي.
                    </p>
                 </div>
              </div>
           </div>

           <div className="glass-card p-8 rounded-[2.5rem] border border-white flex gap-4 items-start shadow-sm">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                <Info size={20} />
              </div>
              <p className="text-xs text-slate-500 font-bold leading-relaxed">
                 تذكر أن "التكلفة الحقيقية" تشمل حصة هذا الطبق من الإيجار، الرواتب، والكهرباء بناءً على عدد الصحون المتوقع شهرياً.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeNew;
