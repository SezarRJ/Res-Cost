
import React from 'react';
import { 
  Users, 
  Store, 
  CreditCard, 
  Cpu, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity, 
  AlertCircle,
  FileText,
  UploadCloud,
  Megaphone,
  UserPlus,
  AlertTriangle,
  Download,
  // Fix: Added missing ShieldCheck icon import
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'إجمالي المستخدمين', value: '1,248', growth: '+12%', icon: <Users size={24} />, color: 'blue' },
    { label: 'إجمالي المطاعم', value: '852', growth: '+8%', icon: <Store size={24} />, color: 'indigo' },
    { label: 'اشتراكات نشطة', value: '312', sub: 'Pro/Elite', icon: <ShieldCheck size={24} />, color: 'emerald' },
    { label: 'MRR (الإيرادات)', value: '18.5M', currency: 'د.ع', icon: <TrendingUp size={24} />, color: 'amber' },
    { label: 'معدل الانقطاع (Churn)', value: '1.2%', growth: '-0.4%', icon: <Activity size={24} />, color: 'rose' },
    { label: 'الاستيرادات (7 أيام)', value: '240', icon: <UploadCloud size={24} />, color: 'slate' },
    { label: 'طلبات AI (7 أيام)', value: '4,102', sub: 'Est: $82', icon: <Cpu size={24} />, color: 'violet' },
    { label: 'معدل الأخطاء (Sentry)', value: '0.04%', icon: <AlertCircle size={24} />, color: 'rose' },
  ];

  const trendData = [
    { name: 'السبت', signups: 12, restaurants: 5, mrr: 12.5 },
    { name: 'الأحد', signups: 18, restaurants: 8, mrr: 14.2 },
    { name: 'الاثنين', signups: 15, restaurants: 4, mrr: 13.8 },
    { name: 'الثلاثاء', signups: 22, restaurants: 10, mrr: 15.9 },
    { name: 'الأربعاء', signups: 25, restaurants: 12, mrr: 18.5 },
    { name: 'الخميس', signups: 30, restaurants: 15, mrr: 21.0 },
    { name: 'الجمعة', signups: 28, restaurants: 13, mrr: 19.8 },
  ];

  const riskAccounts = [
    { name: 'مطعم أرز لبنان', email: 'owner@lebnan.iq', plan: 'ELITE', status: 'past_due', amount: '85,000 د.ع' },
    { name: 'برجر تايم', email: 'ziad@burger.iq', plan: 'PRO', status: 'past_due', amount: '45,000 د.ع' },
    { name: 'بيتزا كينج', email: 'ahmed@pizza.iq', plan: 'PRO', status: 'past_due', amount: '45,000 د.ع' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">التحكم المركزي</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Platform Master Metrics & Insights</p>
        </div>
        <div className="flex gap-3 flex-wrap">
           <button className="flex items-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-xl font-black text-xs shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <Megaphone size={16} className="text-blue-500" /> إعلان جديد
           </button>
           <button className="flex items-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-xl font-black text-xs shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <UserPlus size={16} className="text-indigo-500" /> إضافة أدمن
           </button>
           <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-xs shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all">
              <Download size={16} /> تصدير تقرير الشهري (CSV)
           </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-[2rem] border border-white hover:shadow-xl transition-all relative overflow-hidden group">
            <div className={`absolute -top-4 -right-4 w-20 h-20 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform`}></div>
            <div className="flex items-center justify-between mb-6">
               <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center shadow-inner`}>
                  {stat.icon}
               </div>
               {stat.growth && (
                 <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full border ${stat.growth.startsWith('+') ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : 'text-rose-500 bg-rose-50 border-rose-100'}`}>
                    {stat.growth.startsWith('+') ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {stat.growth}
                 </div>
               )}
            </div>
            <div className="space-y-0.5">
               <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{stat.label}</span>
               <div className="flex items-baseline gap-1">
                 <p className="text-2xl font-black text-slate-800 tracking-tighter">{stat.value}</p>
                 {stat.currency && <span className="text-[10px] text-slate-400 font-bold">{stat.currency}</span>}
                 {stat.sub && <span className="text-[10px] text-slate-400 font-bold">({stat.sub})</span>}
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Main Chart */}
         <div className="lg:col-span-8 glass-card p-8 rounded-[2.5rem] border border-white shadow-sm">
            <h3 className="text-xl font-black text-slate-800 mb-10">إحصائيات النمو والأداء</h3>
            <div className="h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                     <defs>
                        <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                     <Tooltip contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                     <Legend verticalAlign="top" align="right" height={36}/>
                     <Area name="التسجيلات" type="monotone" dataKey="signups" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorSignups)" />
                     <Area name="المطاعم الجديدة" type="monotone" dataKey="restaurants" stroke="#10b981" strokeWidth={4} fillOpacity={0} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Side Widgets */}
         <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 rounded-[2.5rem] border border-white shadow-sm">
               <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-rose-500" />
                  حسابات تحت الخطر (Past Due)
               </h3>
               <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
                  {riskAccounts.map((acc, i) => (
                    <div key={i} className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl flex items-center justify-between group">
                       <div>
                          <p className="text-xs font-black text-slate-800">{acc.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold">{acc.email}</p>
                       </div>
                       <div className="text-left">
                          <p className="text-xs font-black text-rose-600">{acc.amount}</p>
                          <button className="text-[9px] font-black text-blue-600 uppercase hover:underline opacity-0 group-hover:opacity-100 transition-opacity">تنبيه</button>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">عرض كافة المتأخرين</button>
            </div>

            <div className="p-8 bg-indigo-600 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-lg">أخطاء Sentry الحرجة</h4>
                    <Activity size={18} className="animate-pulse" />
                  </div>
                  <div className="space-y-3">
                     {[
                        { t: 'Stripe Webhook Timeout', date: 'منذ 5 د', count: 12 },
                        { t: 'AI API Rate Limit', date: 'منذ 12 د', count: 45 }
                     ].map((err, i) => (
                        <div key={i} className="flex justify-between text-[10px] font-bold border-b border-white/10 pb-2">
                           <span className="flex-1 truncate">{err.t}</span>
                           <span className="bg-white/20 px-2 py-0.5 rounded-lg ml-2">{err.count}</span>
                        </div>
                     ))}
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest bg-white text-indigo-600 hover:bg-slate-50 px-6 py-3 rounded-xl transition-all shadow-lg">فتح لوحة Sentry</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
