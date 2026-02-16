
import React, { useState } from 'react';
import { ChefHat, Search, Plus, Filter, Zap, TrendingUp, AlertTriangle, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { Recipe, Ingredient } from '../types';

interface RecipesProps {
  recipes: Recipe[];
  ingredients: Ingredient[];
  overheadPerDish: number;
  onRecipeSelect?: (id: string) => void;
  onAddNew?: () => void;
}

const Recipes: React.FC<RecipesProps> = ({ recipes, ingredients, overheadPerDish, onRecipeSelect, onAddNew }) => {
  const [search, setSearch] = useState('');

  const filtered = recipes.filter(r => r.name.includes(search) || r.category?.includes(search));

  const calculateFoodCost = (recipe: Recipe) => {
    return recipe.ingredients.reduce((sum, ri) => {
      const ing = ingredients.find(i => i.id === ri.ingredientId);
      return sum + (ing ? ing.pricePerUnit * ri.quantity : 0);
    }, 0);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-3">دليل الوصفات والمنتجات</h1>
          <p className="text-slate-400 font-bold tracking-wide uppercase text-xs">Analyze, Cost, and Optimize your menu items</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center justify-center gap-3 bg-white text-slate-700 px-8 py-4 rounded-2xl font-black text-sm shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group active:scale-95">
            <Zap size={20} className="text-amber-500 group-hover:scale-110 transition-transform" />
            اقتراح وصفات AI
          </button>
          <button 
            onClick={onAddNew}
            className="flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all duration-500 active:scale-95"
          >
            <Plus size={20} />
            إضافة وصفة جديدة
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-1 group w-full">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="ابحث عن وصفة أو مكون ضمن الوصفات..."
            className="w-full pr-14 pl-6 py-4 bg-white border border-slate-100 rounded-[1.5rem] text-sm font-bold shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-[1.5rem] text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">
            <Filter size={18} />
            التصنيف
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filtered.map((recipe) => {
          const foodCost = calculateFoodCost(recipe);
          const trueCost = foodCost + overheadPerDish;
          const profit = recipe.sellingPrice - trueCost;
          const margin = recipe.sellingPrice > 0 ? (profit / recipe.sellingPrice) * 100 : 0;
          const isProfitable = profit > 0;

          return (
            <div 
              key={recipe.id} 
              onClick={() => onRecipeSelect?.(recipe.id)}
              className="group glass-card rounded-[2.5rem] border border-white overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 cursor-pointer flex flex-col hover:-translate-y-2"
            >
              <div className="p-8 flex-1 flex flex-col space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">{recipe.name}</h3>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{recipe.category || 'بدون تصنيف'}</span>
                  </div>
                  {!isProfitable && recipe.sellingPrice > 0 && (
                    <span className="bg-rose-500 text-white text-[9px] font-black px-3 py-1 rounded-full animate-pulse">غير قابل للربح</span>
                  )}
                  {recipe.sellingPrice === 0 && (
                    <span className="bg-slate-100 text-slate-400 text-[9px] font-black px-3 py-1 rounded-full">بدون سعر</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-right">
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">سعر البيع</p>
                    <p className="font-black text-slate-700">{recipe.sellingPrice > 0 ? recipe.sellingPrice.toLocaleString() : '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Food Cost</p>
                    <p className="font-black text-blue-600">{foodCost.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">التكلفة الحقيقية (True Cost):</span>
                    <span className="font-black text-slate-700">{Math.round(trueCost).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">هامش الربح</span>
                    <span className={`font-black text-sm tracking-tighter ${margin > 50 ? 'text-emerald-500' : margin > 0 ? 'text-amber-500' : 'text-rose-500'}`}>
                      {margin.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${margin > 50 ? 'bg-emerald-500' : margin > 0 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${Math.max(0, Math.min(100, margin))}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                   <button className="text-xs font-black text-blue-600 flex items-center gap-1 group-hover:gap-3 transition-all">
                      التفاصيل <ChevronLeft size={14} />
                   </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Create New Placeholder */}
        <div 
          onClick={onAddNew}
          className="group glass-card rounded-[2.5rem] border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50/20 transition-all duration-500 cursor-pointer min-h-[300px]"
        >
           <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 group-hover:text-blue-500 group-hover:rotate-90 transition-all duration-700">
              <Plus size={32} />
           </div>
           <h4 className="text-lg font-black text-slate-800 mb-2">إضافة وصفة جديدة</h4>
           <p className="text-xs text-slate-400 font-bold max-w-[200px] leading-relaxed">قم ببناء هيكل تكاليف جديد لمنتجك القادم بضغطة زر</p>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
