
import React from 'react';
import { 
  Users, 
  Store, 
  CreditCard, 
  Cpu, 
  TrendingUp, 
  ArrowUpRight, 
  Activity, 
  Globe, 
  AlertCircle,
  Clock
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
  Bar
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'إجمالي المستخدمين', value: '1,248', growth: '+12%', icon: <Users size={24} />, color: 'blue' },
    { label: 'المطاعم النشطة', value: '852', growth: '+8%', icon: <Store size={24} />, color: 'emerald' },
    { label: 'الإيرادات الشهرية (MRR)', value: '18.5M', growth: '+15%', icon: <CreditCard size={24} />, color: 'amber' },
    { label: 'طلبات الـ AI (اليوم)', value: '4,102', growth: '+22%', icon: <Cpu size={24} />, color: 'indigo' },
  ];

  const revenueData = [
    { name: 'يناير', revenue: 12500000 },
    { name: 'فبراير', revenue: 14200000 },
    { name: 'مارس', revenue: 13800000 },
    { name: 'أبريل', revenue: 15900000 },
    { name: 'مايو', revenue: 18500000 },
  ];

  const recentUsers = [
    { name: 'مطعم أرز لبنان', owner: 'محمد حسان', plan: 'ELITE', date: 'منذ 5 دقائق' },
    { name: 'برجر تايم', owner: 'زياد خالد', plan: 'PRO', date: 'منذ 12 دقيقة' },
    { name: 'بيتزا كينج', owner: 'أحمد علي', plan: 'FREE', date: 'منذ ساعة' },
    { name: 'شاورما دمشق', owner: 'رامي سعيد', plan: 'ELITE', date: 'منذ ساعتين' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-800">التحكم المركزي</h1>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Platform Master Metrics & Insights</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-8 rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className={`absolute -top-4 -right-4 w-24 h-24 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform`}></div>
            <div className="flex items-center justify-between mb-8">
               <div className={`w-14 h-14 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center shadow-inner`}>
                  {stat.icon}
               </div>
               <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <ArrowUpRight size={10} />
                  {stat.growth}
               </div>
            </div>
            <div className="space-y-1">
               <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{stat.label}</span>
               <p className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Revenue Chart */}
         <div className="lg:col-span-8 glass-card p-10 rounded-[3rem] border border-white shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-black text-slate-800">نمو الإيرادات الشهري</h3>
               <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold outline-none">
                  <option>آخر 6 أشهر</option>
                  <option>السنة الحالية</option>
               </select>
            </div>
            <div className="h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                     <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} tickFormatter={(v) => `${v/1000000}M`} />
                     <Tooltip contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                     <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Recent Onboarding */}
         <div className="lg:col-span-4 glass-card p-10 rounded-[3rem] border border-white shadow-sm flex flex-col">
            <h3 className="text-xl font-black text-slate-800 mb-8">مطاعم انضمت حديثاً</h3>
            <div className="space-y-6 flex-1">
               {recentUsers.map((user, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group cursor-pointer border border-transparent hover:border-slate-100">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                       {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                       <h5 className="text-sm font-black text-slate-800 truncate">{user.name}</h5>
                       <p className="text-[10px] text-slate-400 font-bold">{user.owner}</p>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                       <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${user.plan === 'ELITE' ? 'bg-amber-100 text-amber-600' : user.plan === 'PRO' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                          {user.plan}
                       </span>
                       <span className="text-[9px] text-slate-400 mt-1">{user.date}</span>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
               عرض كافة المطاعم
            </button>
         </div>
      </div>

      {/* System Status Banner */}
      <div className="p-8 bg-blue-600 text-white rounded-[2.5rem] flex items-center justify-between gap-8 relative overflow-hidden shadow-xl shadow-blue-600/20">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
               <Globe size={28} />
            </div>
            <div className="space-y-1">
               <h4 className="text-lg font-black">حالة المنصة مستقرة</h4>
               <p className="text-sm text-blue-100 font-medium">كافة الأنظمة تعمل بكفاءة (Uptime: 99.98%). لا توجد بلاغات نشطة.</p>
            </div>
         </div>
         <div className="flex gap-4 relative z-10 shrink-0">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-xl text-xs font-black">
               <Activity size={16} className="animate-pulse text-emerald-400" />
               Live
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
