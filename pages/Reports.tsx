
import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Download, 
  FileText, 
  ChefHat, 
  Calculator, 
  ArrowUpRight, 
  Calendar,
  Search,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Recipe, Ingredient, OperatingCost } from '../types';

interface ReportsProps {
  recipes: Recipe[];
  ingredients: Ingredient[];
  costs: OperatingCost[];
  overheadPerDish: number;
}

const Reports: React.FC<ReportsProps> = ({ recipes, ingredients, costs, overheadPerDish }) => {
  const [activeTab, setActiveTab] = useState<'dishes' | 'expenses' | 'performance'>('dishes');
  const [search, setSearch] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const dishReportData = useMemo(() => {
    return recipes.map(recipe => {
      const foodCost = recipe.ingredients.reduce((sum, ri) => {
        const ing = ingredients.find(i => i.id === ri.ingredientId);
        return sum + (ing ? ing.pricePerUnit * ri.quantity : 0);
      }, 0);
      const trueCost = foodCost + overheadPerDish;
      const margin = recipe.sellingPrice > 0 ? ((recipe.sellingPrice - foodCost) / recipe.sellingPrice) * 100 : 0;
      return {
        id: recipe.id,
        name: recipe.name,
        category: recipe.category,
        foodCost,
        trueCost,
        price: recipe.sellingPrice,
        margin: margin.toFixed(1)
      };
    }).filter(d => d.name.includes(search));
  }, [recipes, ingredients, overheadPerDish, search]);

  const expenseChartData = useMemo(() => {
    return costs.map(c => ({
      name: c.name,
      value: c.frequency === 'monthly' ? c.amount : c.amount / 12
    }));
  }, [costs]);

  const performanceData = [
    { name: 'السبت', sales: 420000 },
    { name: 'الأحد', sales: 380000 },
    { name: 'الاثنين', sales: 310000 },
    { name: 'الثلاثاء', sales: 350000 },
    { name: 'الأربعاء', sales: 480000 },
    { name: 'الخميس', sales: 620000 },
    { name: 'الجمعة', sales: 550000 },
  ];

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const exportMenuSummary = () => {
    setIsExporting(true);
    setExportProgress(10);
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            setExportProgress(0);
            alert('تم تصدير تقرير ملخص المنيو بنجاح (Menu_Summary.pdf)');
          }, 500);
          return 100;
        }
        return prev + 15;
      });
    }, 400);
  };

  const exportDishReport = (id: string) => {
    const dish = recipes.find(r => r.id === id);
    setIsExporting(true);
    setExportProgress(20);
    setTimeout(() => {
       setExportProgress(100);
       setTimeout(() => {
         setIsExporting(false);
         setExportProgress(0);
         alert(`تم تصدير التقرير التفصيلي لطبق "${dish?.name}" بنجاح.`);
       }, 500);
    }, 1500);
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none mb-2">التقارير والتحليلات</h1>
          <p className="text-slate-400 font-bold tracking-wide uppercase text-[10px] md:text-xs">Deep dive into profitability and performance</p>
        </div>
        <button 
          onClick={exportMenuSummary}
          disabled={isExporting}
          className="flex items-center justify-center gap-3 bg-white text-slate-700 w-full md:w-auto px-6 py-4 rounded-2xl font-black text-sm shadow-sm border border-slate-100 active:scale-95 disabled:opacity-50 transition-all shrink-0"
        >
          {isExporting ? <Loader2 size={18} className="animate-spin text-blue-600" /> : <Download size={18} className="text-blue-500" />}
          تصدير ملخص المنيو (PDF)
        </button>
      </div>

      {isExporting && (
        <div className="p-4 md:p-6 bg-blue-600 text-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl animate-in slide-in-from-top-4 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4 w-full md:w-auto">
              <Loader2 size={24} className="animate-spin shrink-0" />
              <div>
                <h4 className="font-black text-xs md:text-sm">جاري إنشاء ملف الـ PDF...</h4>
                <p className="text-[8px] md:text-[10px] text-blue-100 font-bold uppercase tracking-widest">Processing pages</p>
              </div>
           </div>
           <div className="flex items-center gap-4 w-full md:flex-1 md:max-w-xs">
              <div className="flex-1 bg-blue-700 h-2 rounded-full overflow-hidden">
                 <div className="h-full bg-white transition-all duration-300" style={{ width: `${exportProgress}%` }}></div>
              </div>
              <span className="font-black text-xs">{exportProgress}%</span>
           </div>
        </div>
      )}

      {/* Tabs Container - Scrollable on mobile */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/50 rounded-[1.2rem] md:rounded-[1.5rem] w-full md:w-fit overflow-x-auto no-scrollbar">
        {[
          { id: 'dishes', label: 'الأطباق', icon: <ChefHat size={16} /> },
          { id: 'expenses', label: 'المصاريف', icon: <Calculator size={16} /> },
          { id: 'performance', label: 'الأداء', icon: <TrendingUp size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              flex items-center justify-center gap-2 px-6 py-3 rounded-xl md:rounded-2xl text-xs font-black transition-all shrink-0 flex-1 md:flex-none
              ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}
            `}
          >
            {tab.icon}
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-6 md:space-y-8">
        {activeTab === 'dishes' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
            <div className="relative group w-full">
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="ابحث عن طبق..."
                className="w-full pr-14 pl-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Mobile View: Cards / Desktop: Table */}
            <div className="block lg:hidden space-y-4">
              {dishReportData.map((d) => (
                <div key={d.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4 active:scale-[0.98] transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-slate-800 text-base">{d.name}</h4>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{d.category || 'بدون تصنيف'}</span>
                    </div>
                    <button 
                      onClick={() => exportDishReport(d.id)}
                      className="p-3 bg-blue-50 text-blue-600 rounded-xl"
                    >
                      <FileText size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-50">
                    <div className="space-y-1">
                      <span className="text-[8px] text-slate-400 font-black uppercase">Food Cost</span>
                      <p className="font-black text-blue-600 text-sm">{d.foodCost.toLocaleString()} د.ع</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[8px] text-slate-400 font-black uppercase">هامش الربح</span>
                      <p className={`font-black text-sm ${Number(d.margin) < 50 ? 'text-rose-500' : 'text-emerald-500'}`}>{d.margin}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:block glass-card rounded-[2.5rem] border border-white shadow-sm overflow-hidden">
               <table className="w-full text-right">
                  <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                     <tr>
                        <th className="px-8 py-6">الطبق</th>
                        <th className="px-8 py-6 text-center">Food Cost</th>
                        <th className="px-8 py-6 text-center">True Cost</th>
                        <th className="px-8 py-6 text-center">السعر</th>
                        <th className="px-8 py-6 text-center">الهامش %</th>
                        <th className="px-8 py-6"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {dishReportData.map((d) => (
                       <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6 font-black text-slate-800">{d.name}</td>
                          <td className="px-8 py-6 text-center font-bold text-blue-600">{d.foodCost.toLocaleString()}</td>
                          <td className="px-8 py-6 text-center font-bold text-slate-700">{Math.round(d.trueCost).toLocaleString()}</td>
                          <td className="px-8 py-6 text-center font-black">{d.price.toLocaleString()}</td>
                          <td className="px-8 py-6 text-center font-black text-emerald-500">{d.margin}%</td>
                          <td className="px-8 py-6">
                             <button onClick={() => exportDishReport(d.id)} className="text-blue-600 hover:underline font-black text-[10px] uppercase">PDF</button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 animate-in fade-in slide-in-from-left-4">
             <div className="glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white shadow-sm">
                <h3 className="text-lg md:text-xl font-black text-slate-800 mb-6 md:mb-10">توزيع المصاريف</h3>
                <div className="h-[250px] md:h-[350px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie data={expenseChartData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                            {expenseChartData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                         </Pie>
                         <Tooltip />
                      </PieChart>
                   </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                   {expenseChartData.map((e, i) => (
                     <div key={i} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                        <span className="text-[10px] md:text-xs font-bold text-slate-600 truncate">{e.name}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="space-y-4">
                {costs.map((cost, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 flex justify-between items-center shadow-sm">
                     <div>
                        <h4 className="font-black text-slate-800 text-sm">{cost.name}</h4>
                        <span className="text-[9px] text-slate-400 font-bold uppercase">{cost.frequency}</span>
                     </div>
                     <span className="font-black text-slate-900">{cost.amount.toLocaleString()} د.ع</span>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
            <div className="glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white shadow-sm">
               <h3 className="text-lg md:text-xl font-black text-slate-800 mb-8">المبيعات الأسبوعية</h3>
               <div className="h-[250px] md:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} tickFormatter={(val) => `${val/1000}k`} />
                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={30} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;