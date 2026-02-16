
import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Calculator, 
  ChefHat, 
  ShoppingCart, 
  AlertTriangle, 
  Plus, 
  UploadCloud, 
  History, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Ingredient, OperatingCost, Recipe } from '../types';

interface DashboardProps {
  ingredients: Ingredient[];
  costs: OperatingCost[];
  recipes: Recipe[];
  onNavigate: (path: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ ingredients, costs, recipes, onNavigate }) => {
  // Calculations
  const totalMonthlyCosts = costs.reduce((sum, c) => sum + (c.frequency === 'monthly' ? c.amount : c.amount / 12), 0);
  const avgMargin = recipes.length > 0 ? 58 : 0; // Mock average for now

  // Alerts Logic
  const recipesWithoutPrice = recipes.filter(r => r.sellingPrice === 0).length;
  const recipesWithoutIngredients = recipes.filter(r => r.ingredients.length === 0).length;
  const ingredientsWithoutPrice = ingredients.filter(i => i.pricePerUnit === 0).length;

  const hasAlerts = recipesWithoutPrice > 0 || recipesWithoutIngredients > 0 || ingredientsWithoutPrice > 0;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Alert Banner if needed */}
      {hasAlerts && (
        <div className="p-6 bg-rose-50 border border-rose-100 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 animate-in slide-in-from-top-4">
           <div className="w-12 h-12 bg-rose-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-rose-600/20">
              <AlertTriangle size={24} />
           </div>
           <div className="flex-1 space-y-1">
              <h4 className="font-black text-rose-900">تنبيهات البيانات المفقودة</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-rose-700 font-bold">
                 {recipesWithoutPrice > 0 && <span>• يوجد {recipesWithoutPrice} وصفات بلا سعر بيع.</span>}
                 {recipesWithoutIngredients > 0 && <span>• يوجد {recipesWithoutIngredients} وصفات بلا مكونات مسجلة.</span>}
                 {ingredientsWithoutPrice > 0 && <span>• يوجد {ingredientsWithoutPrice} مواد خام بلا سعر تكلفة.</span>}
              </div>
           </div>
           <button onClick={() => onNavigate('recipes')} className="px-6 py-2 bg-rose-600 text-white rounded-xl text-xs font-black hover:bg-rose-700 transition-all">
              إصلاح البيانات
           </button>
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي المصاريف الشهرية', value: totalMonthlyCosts.toLocaleString(), currency: 'د.ع', icon: <Calculator size={24} />, color: 'blue' },
          { label: 'عدد المواد الخام', value: ingredients.length.toString(), currency: 'مادة', icon: <ShoppingCart size={24} />, color: 'indigo' },
          { label: 'إجمالي الوصفات', value: recipes.length.toString(), currency: 'وصفة', icon: <ChefHat size={24} />, color: 'emerald' },
          { label: 'متوسط هامش الربح', value: avgMargin.toString(), currency: '%', icon: <TrendingUp size={24} />, color: 'amber' },
        ].map((metric, i) => (
          <div key={i} className="group glass-card p-7 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${metric.color}-500/5 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="flex items-center justify-between mb-6 relative">
              <div className={`w-14 h-14 rounded-2xl bg-${metric.color}-50 text-${metric.color}-600 flex items-center justify-center shadow-inner`}>
                {metric.icon}
              </div>
            </div>
            <div className="relative">
              <h4 className="text-slate-500 text-xs font-black uppercase tracking-wider mb-1">{metric.label}</h4>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-black text-slate-800 leading-none tracking-tight">{metric.value}</p>
                <span className="text-xs font-bold text-slate-400">{metric.currency}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Quick Actions */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-card p-10 rounded-[2.5rem] border border-white">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-800">إجراءات سريعة</h3>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Efficiency Shortcuts</span>
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { label: 'إضافة مصروف', icon: <Calculator size={24} />, path: 'costs', color: 'blue' },
                  { label: 'إضافة مادة', icon: <ShoppingCart size={24} />, path: 'ingredients', color: 'indigo' },
                  { label: 'إضافة وصفة', icon: <ChefHat size={24} />, path: 'recipes', color: 'emerald' },
                  { label: 'رفع مبيعات', icon: <UploadCloud size={24} />, path: 'sales-import', color: 'amber' },
                ].map((action, i) => (
                  <button 
                    key={i} 
                    onClick={() => onNavigate(action.path)}
                    className="flex flex-col items-center gap-4 p-6 rounded-[2rem] bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all group"
                  >
                     <div className={`w-14 h-14 bg-${action.color}-50 text-${action.color}-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                        {action.icon}
                     </div>
                     <span className="text-xs font-black text-slate-800">{action.label}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* Activity Logs (Mocked) */}
          <div className="glass-card p-10 rounded-[2.5rem] border border-white">
             <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                      <History size={20} />
                   </div>
                   <h3 className="text-xl font-black text-slate-800">آخر النشاطات</h3>
                </div>
                <button className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest">عرض الكل</button>
             </div>
             
             <div className="space-y-6">
                {[
                  { title: 'استيراد مبيعات أسبوعي', desc: 'تم استيراد 240 عملية مبيعات بنجاح', time: 'منذ ساعتين', icon: <UploadCloud className="text-blue-500" /> },
                  { title: 'تعديل تكلفة: لحم بقري', desc: 'تغير السعر من 13,000 إلى 14,000 د.ع', time: 'منذ 5 ساعات', icon: <TrendingUp className="text-amber-500" /> },
                  { title: 'وصفة جديدة: بيتزا مارغريتا', desc: 'تم إنشاء هيكل التكاليف الأولي', time: 'أمس الساعة 4:30 م', icon: <ChefHat className="text-emerald-500" /> },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group">
                     <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-all">
                        {log.icon}
                     </div>
                     <div className="flex-1">
                        <h5 className="text-sm font-black text-slate-800">{log.title}</h5>
                        <p className="text-xs text-slate-400 font-bold mt-0.5">{log.desc}</p>
                     </div>
                     <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase">
                        <Clock size={12} />
                        {log.time}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Side Panel: Quick Tips / AI Insight */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
             <div className="relative z-10 space-y-8">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-blue-400">
                   <TrendingUp size={28} />
                </div>
                <div className="space-y-2">
                   <h4 className="text-xl font-black">نصيحة الربحية</h4>
                   <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      بناءً على مبيعات الأسبوع الماضي، طبق "باستا الفريدو" يحقق مبيعات عالية ولكن بهامش منخفض (46%). 
                      <span className="text-blue-400"> جرب رفع السعر بنسبة 10% </span> لزيادة الربح الشهري المتوقع بمقدار 120,000 د.ع.
                   </p>
                </div>
                <button 
                  onClick={() => onNavigate('pricing-recs')}
                  className="w-full py-4 bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                   اذهب للمحسن الذكي
                   <ArrowRight size={16} className="rotate-180" />
                </button>
             </div>
          </div>

          <div className="glass-card p-10 rounded-[3rem] border border-white flex-1">
             <h4 className="text-lg font-black text-slate-800 mb-8">توزيع التكاليف</h4>
             <div className="space-y-6">
                {[
                  { label: 'مواد أولية', val: '72%', color: 'blue' },
                  { label: 'رواتب', val: '18%', color: 'emerald' },
                  { label: 'إيجار ومرافق', val: '10%', color: 'amber' },
                ].map((bar, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">{bar.label}</span>
                        <span className="text-slate-800">{bar.val}</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-${bar.color}-500 transition-all duration-1000`}
                          style={{ width: bar.val }}
                        ></div>
                     </div>
                  </div>
                ))}
             </div>
             <p className="mt-8 text-[10px] text-slate-400 font-bold italic text-center">يتم تحديث هذه البيانات تلقائياً بناءً على مصاريف التشغيل والمواد المسجلة.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
