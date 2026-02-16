
import React from 'react';
import { TrendingUp, ShoppingBag, DollarSign, Activity, ChevronLeft, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';

const data = [
  { name: 'سبت', sales: 4000, cost: 2400 },
  { name: 'أحد', sales: 3000, cost: 1398 },
  { name: 'اثنين', sales: 2000, cost: 9800 },
  { name: 'ثلاثاء', sales: 2780, cost: 3908 },
  { name: 'أربعاء', sales: 1890, cost: 4800 },
  { name: 'خميس', sales: 2390, cost: 3800 },
  { name: 'جمعة', sales: 3490, cost: 4300 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي التكاليف', value: '450,000', currency: 'د.ع', change: '+12.5%', isUp: true, icon: <DollarSign size={24} />, color: 'blue' },
          { label: 'متوسط الهامش', value: '62', currency: '%', change: '+2.1%', isUp: true, icon: <TrendingUp size={24} />, color: 'emerald' },
          { label: 'الوجبات المباعة', value: '1,240', currency: 'وجبة', change: '+5.3%', isUp: true, icon: <ShoppingBag size={24} />, color: 'indigo' },
          { label: 'نقطة التعادل', value: '850', currency: 'وجبة', change: '-10.2%', isUp: false, icon: <Activity size={24} />, color: 'amber' },
        ].map((metric, i) => (
          <div key={i} className="group glass-card p-7 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${metric.color}-500/5 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="flex items-center justify-between mb-6 relative">
              <div className={`w-14 h-14 rounded-2xl bg-${metric.color}-50 text-${metric.color}-600 flex items-center justify-center shadow-inner`}>
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black ${metric.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {metric.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {metric.change}
              </div>
            </div>
            <div className="relative">
              <h4 className="text-slate-500 text-xs font-black uppercase tracking-wider mb-1">{metric.label}</h4>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-black text-slate-800 leading-none tracking-tight">{metric.value}</p>
                <span className="text-xs font-bold text-slate-400">{metric.currency}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-8 glass-card p-8 rounded-[2rem] shadow-sm border border-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-800">أداء المبيعات والتكاليف</h3>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Weekly Performance Analytics</p>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl self-start">
               {['7 أيام', '30 يوم', '90 يوم'].map((t) => (
                 <button key={t} className={`px-5 py-2 text-[11px] font-black rounded-xl transition-all ${t === '7 أيام' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
                   {t}
                 </button>
               ))}
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ stroke: '#2563eb', strokeWidth: 1, strokeDasharray: '3 3' }} 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '16px' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="cost" stroke="#94a3b8" strokeWidth={2} strokeDasharray="8 8" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-8">
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                <span className="text-xs font-bold text-slate-500">إجمالي المبيعات</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-slate-300 rounded-full"></span>
                <span className="text-xs font-bold text-slate-500">إجمالي التكاليف</span>
             </div>
          </div>
        </div>

        {/* Top Cost Recipes */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="glass-card p-8 rounded-[2rem] shadow-sm flex-1">
            <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
              الأصناف الأكثر ربحية
              <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase">Live</span>
            </h3>
            <div className="space-y-4">
              {[
                { name: 'برجر لحم دبل', cost: '8,500', margin: '45%', color: 'rose' },
                { name: 'باستا الفريدو', cost: '6,200', margin: '55%', color: 'blue' },
                { name: 'شاورما دجاج', cost: '3,100', margin: '68%', color: 'emerald' },
                { name: 'بيتزا مارغريتا', cost: '4,800', margin: '72%', color: 'indigo' },
              ].map((recipe, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-slate-400 text-sm shadow-sm group-hover:scale-110 transition-transform">{i + 1}</div>
                    <div>
                      <h5 className="text-sm font-black text-slate-800">{recipe.name}</h5>
                      <div className="flex items-center gap-1.5 mt-0.5">
                         <span className={`w-1.5 h-1.5 rounded-full bg-${recipe.color}-500`}></span>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Margin: {recipe.margin}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left flex flex-col items-end">
                    <p className="text-sm font-black text-slate-800">{recipe.cost}</p>
                    <span className="text-[9px] font-black text-slate-300 uppercase">IQD</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 text-xs font-black text-blue-600 bg-blue-50/50 border border-blue-100/50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 group">
              تحليل كافة الوصفات
              <ChevronLeft size={16} className="inline-block mr-2 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

          {/* AI Helper Teaser */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden group cursor-pointer">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent)] translate-x-10 translate-y-10 group-hover:scale-150 transition-transform duration-1000"></div>
             <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                   <Activity size={28} className="text-white" />
                </div>
                <h4 className="text-lg font-black mb-2">مساعد الذكاء الاصطناعي</h4>
                <p className="text-sm text-blue-100/80 font-medium leading-relaxed">اكتشف فرصاً جديدة لزيادة أرباحك بنسبة تصل إلى 15% من خلال تحسين أسعار المنيو.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;