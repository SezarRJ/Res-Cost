
import React from 'react';
import { ChefHat, Search, Plus, Filter, Zap, TrendingUp, BarChart2 } from 'lucide-react';

interface RecipesProps {
  onRecipeSelect?: (id: string) => void;
}

const Recipes: React.FC<RecipesProps> = ({ onRecipeSelect }) => {
  const recipes = [
    { id: '1', name: 'برجر كلاسيك العائلي', cost: 4250, price: 12000, margin: 64, status: 'مربح جداً', color: 'emerald' },
    { id: '2', name: 'بيتزا دجاج سبايسي (وسط)', cost: 6800, price: 15000, margin: 55, status: 'مستقر', color: 'blue' },
    { id: '3', name: 'باستا الفريدو كريمي', cost: 5900, price: 11000, margin: 46, status: 'هامش منخفض', color: 'rose' },
    { id: '4', name: 'سلطة سيزر الأصلية', cost: 2100, price: 8000, margin: 74, status: 'مربح جداً', color: 'emerald' },
  ];

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
          <button className="flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all duration-500 active:scale-95">
            <Plus size={20} />
            إضافة منتج جديد
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
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-[1.5rem] text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">
            <Filter size={18} />
            Category
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-[1.5rem] text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">
            <BarChart2 size={18} />
            Metrics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            onClick={() => onRecipeSelect?.(recipe.id)}
            className="group glass-card rounded-[2.5rem] border border-white overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 cursor-pointer flex flex-col hover:-translate-y-2"
          >
            <div className="aspect-[16/10] relative overflow-hidden">
               <img 
                src={`https://picsum.photos/seed/${recipe.id}/600/400`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                alt={recipe.name} 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
               <div className="absolute top-5 right-5">
                 <span className={`
                    px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl
                    ${recipe.color === 'emerald' ? 'bg-emerald-500 text-white' : recipe.color === 'blue' ? 'bg-blue-600 text-white' : 'bg-rose-500 text-white'}
                 `}>
                   {recipe.status}
                 </span>
               </div>
               <div className="absolute bottom-5 right-5 flex items-center gap-2">
                 <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500">
                    <TrendingUp size={18} />
                 </div>
               </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-slate-800 mb-6 group-hover:text-blue-600 transition-colors">{recipe.name}</h3>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Cost Analysis</p>
                  <p className="font-black text-slate-700 text-lg leading-none">{recipe.cost.toLocaleString()}</p>
                </div>
                <div className="space-y-1 text-left">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Listing Price</p>
                  <p className="font-black text-blue-600 text-lg leading-none">{recipe.price.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Profit Margin</span>
                  <span className="font-black text-slate-800 text-sm tracking-tighter">{recipe.margin}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:opacity-100 ${recipe.margin > 60 ? 'bg-emerald-500' : recipe.margin > 50 ? 'bg-blue-600' : 'bg-rose-500'}`}
                    style={{ width: `${recipe.margin}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Create New Placeholder */}
        <div className="group glass-card rounded-[2.5rem] border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50/20 transition-all duration-500 cursor-pointer min-h-[400px]">
           <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-blue-100 group-hover:text-blue-500 group-hover:rotate-90 transition-all duration-700">
              <Plus size={40} />
           </div>
           <h4 className="text-lg font-black text-slate-800 mb-2">إضافة منتج جديد</h4>
           <p className="text-xs text-slate-400 font-bold max-w-[200px] leading-relaxed">قم ببناء هيكل تكاليف جديد لمنتجك القادم بضغطة زر</p>
        </div>
      </div>
    </div>
  );
};

export default Recipes;