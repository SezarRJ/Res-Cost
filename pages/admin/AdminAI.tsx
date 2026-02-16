
import React, { useState } from 'react';
import { 
  Cpu, 
  Zap, 
  DollarSign, 
  ShieldAlert, 
  Loader2, 
  BarChart3, 
  Search, 
  Filter, 
  Activity, 
  Terminal,
  Settings,
  ShieldCheck,
  X,
  FileCode,
  ShieldEllipsis,
  MessageSquareQuote,
  Target
} from 'lucide-react';
import { AIUsageLog } from '../../types';

const AdminAI: React.FC = () => {
  const [globalEnabled, setGlobalEnabled] = useState(true);
  
  const aiLogs: AIUsageLog[] = [
    { id: 'log-01', restaurantName: 'برجر هاوس', userName: 'أحمد', feature: 'Pricing Guidance', tokens: 850, cost: 0.017, timestamp: 'منذ دقيقة', status: 'success' },
    { id: 'log-02', restaurantName: 'أرز لبنان', userName: 'محمد', feature: 'Recipe Assistant', tokens: 1200, cost: 0.024, timestamp: 'منذ 5 دقائق', status: 'success' },
    { id: 'log-03', restaurantName: 'بيتزا كينج', userName: 'زياد', feature: 'Offer Strategy', tokens: 2100, cost: 0.042, timestamp: 'منذ 12 دقيقة', status: 'success' },
  ];

  const features = [
    { id: 'pricing', name: 'توصيات التسعير', model: 'gemini-3-flash-preview', enabled: true },
    { id: 'recipe', name: 'مساعد الوصفات', model: 'gemini-3-flash-preview', enabled: true },
    { id: 'strategy', name: 'تحليل الاستراتيجية', model: 'gemini-3-pro-preview', enabled: false },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">وحدة مراقبة الـ AI</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Artificial Intelligence Cost & Quality Control</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">حالة الذكاء الاصطناعي:</span>
           <button 
             onClick={() => setGlobalEnabled(!globalEnabled)}
             className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${globalEnabled ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}
           >
              {globalEnabled ? 'نشط عالمياً' : 'معطل مؤقتاً'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="glass-card p-6 rounded-[2rem] border border-white flex flex-col gap-4">
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">إجمالي التكلفة (7 أيام)</span>
            <p className="text-3xl font-black text-slate-800">$42.85</p>
            <span className="text-[9px] text-emerald-500 font-black">ضمن الميزانية المقررة</span>
         </div>
         <div className="glass-card p-6 rounded-[2rem] border border-white flex flex-col gap-4">
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">التوكنات المستهلكة</span>
            <p className="text-3xl font-black text-slate-800">12.4M</p>
            <span className="text-[9px] text-slate-400 font-bold">عبر 312 مستأجر نشط</span>
         </div>
         <div className="glass-card p-6 rounded-[2rem] border border-white flex flex-col gap-4">
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">أداء الميزات</span>
            <p className="text-3xl font-black text-slate-800">99.2%</p>
            <span className="text-[9px] text-slate-400 font-bold">معدل الاستجابة الناجحة</span>
         </div>
         <div className="glass-card p-6 rounded-[2rem] border border-white flex flex-col justify-center bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
            <div className="relative z-10 flex items-center justify-between">
               <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest">إدارة القوالب</span>
               <MessageSquareQuote size={18} className="text-blue-400" />
            </div>
            <p className="relative z-10 text-lg font-black mt-2">12 قوالب نشطة</p>
            <button className="relative z-10 text-[8px] font-black uppercase text-blue-400 hover:underline mt-2">فتح مدير الـ Prompts</button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-4 space-y-8">
            {/* Feature Toggles & Model Selection */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-white shadow-sm space-y-8">
               <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
                  <Settings size={20} className="text-slate-600" /> التحكم بالميزات
               </h3>
               <div className="space-y-6">
                  {features.map(f => (
                    <div key={f.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                       <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-700">{f.name}</span>
                          <button className={`w-10 h-5 rounded-full relative transition-colors ${f.enabled ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                             <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${f.enabled ? 'left-1' : 'left-6'}`}></div>
                          </button>
                       </div>
                       <select defaultValue={f.model} className="w-full bg-white border border-slate-200 p-3 rounded-xl text-[10px] font-bold outline-none focus:ring-4 focus:ring-blue-100">
                          <option value="gemini-3-flash-preview">Gemini 3 Flash (Fast)</option>
                          <option value="gemini-3-pro-preview">Gemini 3 Pro (Smart)</option>
                       </select>
                    </div>
                  ))}
               </div>
            </div>

            {/* Safety & Filters */}
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 space-y-6 shadow-inner">
               <div className="flex items-center gap-3 text-rose-600">
                  <ShieldEllipsis size={24} />
                  <h4 className="font-black">فلاتر الأمان (Safety)</h4>
               </div>
               <div className="space-y-4">
                  <div className="space-y-1">
                     <label className="text-[9px] font-black text-slate-400 uppercase px-2">الكلمات المحظورة</label>
                     <textarea placeholder="كلمة1, كلمة2..." className="w-full p-4 bg-white border border-slate-100 rounded-xl text-xs font-bold resize-none h-20" />
                  </div>
                  <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">حفظ فلاتر الأمان</button>
               </div>
            </div>
         </div>

         <div className="lg:col-span-8 glass-card rounded-[2.5rem] border border-white overflow-hidden shadow-sm flex flex-col">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
               <h3 className="text-xl font-black text-slate-800">سجل طلبات الـ AI (Debug View)</h3>
               <div className="flex gap-2">
                  <button className="p-2 bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-all"><Filter size={18} /></button>
               </div>
            </div>
            <div className="overflow-x-auto flex-1">
               <table className="w-full text-right">
                  <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                     <tr>
                        <th className="px-6 py-4">المطعم / المستخدم</th>
                        <th className="px-6 py-4 text-center">الميزة</th>
                        <th className="px-6 py-4 text-center">التوكنات</th>
                        <th className="px-6 py-4 text-center">التكلفة</th>
                        <th className="px-6 py-4 text-center">الوقت</th>
                        <th className="px-8 py-4 text-center">الحالة</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {aiLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                           <td className="px-6 py-4">
                              <p className="text-xs font-black text-slate-800 group-hover:text-blue-600">{log.restaurantName}</p>
                              <p className="text-[9px] text-slate-400 font-bold">{log.userName}</p>
                           </td>
                           <td className="px-6 py-4 text-center text-[10px] font-bold text-indigo-600">{log.feature}</td>
                           <td className="px-6 py-4 text-center text-xs font-black text-slate-600">{log.tokens.toLocaleString()}</td>
                           <td className="px-6 py-4 text-center text-[10px] font-black text-slate-900">${log.cost}</td>
                           <td className="px-6 py-4 text-center text-[10px] font-bold text-slate-400">{log.timestamp}</td>
                           <td className="px-6 py-4 text-center">
                              <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase border ${log.status === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                 {log.status}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
               <div className="flex gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center min-w-[120px]">
                     <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">أعلى المستهلكين</span>
                     <p className="text-xs font-black text-slate-800">برجر هاوس</p>
                  </div>
               </div>
               <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">عرض التقارير التفصيلية للـ AI</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminAI;
