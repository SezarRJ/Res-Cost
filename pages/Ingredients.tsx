
import React, { useState } from 'react';
import { Search, Plus, Filter, Edit2, Trash2, ArrowUpDown, ShoppingCart, Package, TrendingDown, ArrowUpRight, ChevronLeft, X } from 'lucide-react';
import { Ingredient, Currency } from '../types';

interface IngredientsProps {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const Ingredients: React.FC<IngredientsProps> = ({ ingredients, setIngredients }) => {
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState<Partial<Ingredient>>({
    name: '',
    unit: 'كغم',
    pricePerUnit: 0,
    currency: Currency.IQD,
    category: 'مخزن'
  });

  const filtered = ingredients.filter(i => 
    i.name.includes(search) || (i.category && i.category.includes(search))
  );

  const handleAdd = () => {
    if (!newIngredient.name || !newIngredient.pricePerUnit) return;
    const item: Ingredient = {
      id: Date.now().toString(),
      name: newIngredient.name!,
      unit: newIngredient.unit!,
      pricePerUnit: Number(newIngredient.pricePerUnit),
      currency: newIngredient.currency!,
      category: newIngredient.category
    };
    setIngredients([item, ...ingredients]);
    setIsAddModalOpen(false);
    setNewIngredient({ name: '', unit: 'كغم', pricePerUnit: 0, currency: Currency.IQD, category: 'مخزن' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه المادة؟')) {
      setIngredients(ingredients.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-3">قاعدة بيانات المواد الخام</h1>
          <p className="text-slate-400 font-bold tracking-wide uppercase text-xs">Manage supplier prices and inventory units</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-3 bg-white text-slate-700 px-8 py-4 rounded-2xl font-black text-sm shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 active:scale-95">
             <Package size={20} className="text-blue-500" />
             استيراد من Excel
           </button>
           <button 
             onClick={() => setIsAddModalOpen(true)}
             className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95"
           >
             <Plus size={20} />
             إضافة مادة جديدة
           </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'إجمالي المواد', value: ingredients.length.toString(), sub: 'مواد مسجلة', icon: <ShoppingCart size={20} />, color: 'blue' },
           { label: 'أعلى تكلفة', value: Math.max(...ingredients.map(i => i.pricePerUnit)).toLocaleString(), sub: 'د.ع / وحدة', icon: <TrendingDown size={20} />, color: 'rose' },
           { label: 'معدل تقلب الأسعار', value: '3.2%', sub: 'آخر 30 يوم', icon: <ArrowUpRight size={20} />, color: 'emerald' },
         ].map((stat, i) => (
           <div key={i} className="glass-card p-6 rounded-[2rem] border border-white flex items-center gap-6 group hover:shadow-xl transition-all">
              <div className={`w-14 h-14 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">{stat.label}</span>
                <div className="flex items-baseline gap-1">
                   <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                   <span className="text-[10px] text-slate-400 font-bold">{stat.sub}</span>
                </div>
              </div>
           </div>
         ))}
      </div>

      <div className="glass-card rounded-[2.5rem] shadow-sm border border-white overflow-hidden">
        {/* Table Controls */}
        <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="ابحث عن مادة حسب الاسم أو التصنيف..."
              className="w-full pr-14 pl-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-200 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* List View */}
        <div className="p-4 bg-slate-50/30">
          <div className="space-y-4">
            {filtered.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      {item.name.charAt(0)}
                   </div>
                   <div>
                      <h4 className="text-lg font-black text-slate-800 mb-1">{item.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">{item.category}</span>
                        <span className="text-[10px] text-slate-400 font-bold">وحدة القياس: {item.unit}</span>
                      </div>
                   </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-12">
                   <div className="text-left flex flex-col items-end">
                      <div className="flex items-baseline gap-1">
                         <span className="text-2xl font-black text-slate-800">{item.pricePerUnit.toLocaleString()}</span>
                         <span className="text-[10px] text-slate-400 font-black uppercase">{item.currency}</span>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-2 border-r border-slate-100 pr-6">
                      <button className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-rose-600 hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-24 h-24 bg-white border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <Search className="text-slate-200" size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">لم نجد أي مادة</h3>
              <p className="text-sm text-slate-400 font-bold max-w-sm mx-auto">تأكد من كتابة الاسم بشكل صحيح أو قم بإضافة مادة خام جديدة للقاعدة.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white p-10 space-y-8 relative overflow-hidden">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-slate-800">إضافة مادة جديدة</h3>
                 <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">اسم المادة</label>
                    <input 
                      type="text" 
                      value={newIngredient.name}
                      onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">الوحدة</label>
                       <input 
                        type="text" 
                        value={newIngredient.unit}
                        onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">السعر</label>
                       <input 
                        type="number" 
                        value={newIngredient.pricePerUnit}
                        onChange={(e) => setNewIngredient({...newIngredient, pricePerUnit: Number(e.target.value)})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                       />
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
                   حفظ المادة
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Ingredients;
