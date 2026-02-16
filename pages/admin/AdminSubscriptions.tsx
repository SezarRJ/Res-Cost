
import React from 'react';
import { CreditCard, ExternalLink, Calendar, ShieldCheck, Mail, Zap, Crown, UserMinus, UserCheck, Download } from 'lucide-react';
import { SubscriptionPlan, SubscriptionStatus } from '../../types';

const AdminSubscriptions: React.FC = () => {
  const subscriptions = [
    { id: 'sub_123', restaurant: 'برجر هاوس', plan: SubscriptionPlan.ELITE, status: SubscriptionStatus.ACTIVE, stripeId: 'si_8828', periodEnd: '2024-07-12', cancelAtEnd: false },
    { id: 'sub_456', restaurant: 'أرز لبنان', plan: SubscriptionPlan.ELITE, status: SubscriptionStatus.PAST_DUE, stripeId: 'si_4412', periodEnd: '2024-06-10', cancelAtEnd: false },
    { id: 'sub_789', restaurant: 'بيتزا كينج', plan: SubscriptionPlan.PRO, status: SubscriptionStatus.TRIALING, stripeId: 'si_0021', periodEnd: '2024-06-25', cancelAtEnd: true },
  ];

  const getStatusColor = (s: SubscriptionStatus) => {
    switch (s) {
      case SubscriptionStatus.ACTIVE: return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case SubscriptionStatus.PAST_DUE: return 'text-rose-600 bg-rose-50 border-rose-100';
      case SubscriptionStatus.TRIALING: return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-slate-400 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">إدارة الاشتراكات</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Stripe Sync & Plan Lifecycle Management</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-600/20">
              <Mail size={16} /> مراسلة الحسابات المتأخرة
           </button>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
           <table className="w-full text-right">
              <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                 <tr>
                    <th className="px-8 py-6">المطعم</th>
                    <th className="px-8 py-6 text-center">الخطة</th>
                    <th className="px-8 py-6 text-center">الحالة</th>
                    <th className="px-8 py-6 text-center">Stripe ID</th>
                    <th className="px-8 py-6 text-center">نهاية الفترة</th>
                    <th className="px-8 py-6 text-center">إلغاء لاحقاً؟</th>
                    <th className="px-8 py-6"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {subscriptions.map(s => (
                   <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6 font-black text-slate-800">{s.restaurant}</td>
                      <td className="px-8 py-6 text-center">
                         <div className="flex items-center justify-center gap-2">
                            {s.plan === SubscriptionPlan.ELITE ? <Crown size={14} className="text-amber-500" /> : <Zap size={14} className="text-blue-500" />}
                            <span className="text-[10px] font-black uppercase">{s.plan}</span>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase border ${getStatusColor(s.status)}`}>
                            {s.status}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <button className="flex items-center justify-center gap-2 text-[10px] font-bold text-blue-600 mx-auto hover:underline">
                            {s.stripeId} <ExternalLink size={10} />
                         </button>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500">
                            <Calendar size={12} /> {s.periodEnd}
                         </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                         {s.cancelAtEnd ? <span className="text-[9px] font-black text-rose-500 uppercase">نعم</span> : <span className="text-[9px] font-black text-slate-300 uppercase">لا</span>}
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center justify-end gap-2">
                            <button title="إلغاء الاشتراك" className="p-2 text-slate-300 hover:text-rose-500"><UserMinus size={16} /></button>
                            <button title="منح شهر مجاني" className="p-2 text-slate-300 hover:text-emerald-500"><ShieldCheck size={16} /></button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
