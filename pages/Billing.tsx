
import React, { useState } from 'react';
import { 
  Check, 
  Zap, 
  Crown, 
  Award, 
  CreditCard, 
  Calendar, 
  Download, 
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  FileText,
  X,
  ChevronLeft,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { UserProfile, SubscriptionPlan, SubscriptionStatus } from '../types';

interface BillingProps {
  user: UserProfile;
}

const PLANS_DATA = [
  {
    id: SubscriptionPlan.FREE,
    name: 'المجانية',
    price: 0,
    features: ['مطعم واحد', '30 مادة خام', '20 وصفة', 'حساب تكاليف أساسي'],
    icon: <Award size={24} />,
    color: 'slate'
  },
  {
    id: SubscriptionPlan.PRO,
    name: 'المحترفين (PRO)',
    price: 45000,
    features: ['غير محدود من المواد', 'غير محدود من الوصفات', 'استيراد مبيعات Excel', 'تقارير PDF', 'أسعار المنافسين'],
    icon: <Zap size={24} />,
    color: 'blue'
  },
  {
    id: SubscriptionPlan.ELITE,
    name: 'النخبة (ELITE)',
    price: 85000,
    features: ['كل مميزات PRO', 'مساعد الذكاء الاصطناعي', '5 مستخدمين للمطعم', 'تحليل استراتيجي متقدم', 'دعم فني 24/7'],
    icon: <Crown size={24} />,
    color: 'amber'
  }
];

const Billing: React.FC<BillingProps> = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState<'current' | 'history'>('current');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  
  const sub = user.subscription;

  const handleUpgrade = (planId: string) => {
    alert(`جاري توجيهك لـ Stripe Checkout للاشتراك في باقة ${planId}...`);
    setIsUpgradeModalOpen(false);
  };

  const handleCancel = () => {
    alert('تم استقبال طلب إلغاء الاشتراك. سيظل اشتراكك فعالاً حتى نهاية الفترة الحالية.');
    setIsCancelModalOpen(false);
  };

  const handleOpenStripePortal = () => {
    alert('سيتم توجيهك الآن إلى بوابة عملاء Stripe الآمنة لتحديث بيانات الدفع.');
  };

  const getStatusBadge = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Active</span>;
      case SubscriptionStatus.PAST_DUE:
        return <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Past Due</span>;
      default:
        return <span className="bg-slate-100 text-slate-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{status}</span>;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">الاشتراك والفواتير</h1>
        <p className="text-slate-400 font-bold uppercase text-xs">Manage your subscription, payments, and billing history</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Plan & Payment */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* A) Current Plan Section */}
          <div className="glass-card rounded-[2.5rem] border border-white p-10 shadow-sm space-y-10 relative overflow-hidden">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                      {user.plan === SubscriptionPlan.ELITE ? <Crown size={32} /> : user.plan === SubscriptionPlan.PRO ? <Zap size={32} /> : <Award size={32} />}
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-800">خطتك الحالية: {PLANS_DATA.find(p => p.id === user.plan)?.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                         {getStatusBadge(sub?.status || SubscriptionStatus.ACTIVE)}
                         <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                            <Calendar size={12} />
                            تاريخ التجديد القادم: {sub?.renewalDate || 'N/A'}
                         </span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="py-4 px-6 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                >
                   ترقية الخطة أو تغييرها
                </button>
                <button 
                  onClick={() => setIsCancelModalOpen(true)}
                  className="py-4 px-6 text-rose-400 font-black text-xs uppercase tracking-widest hover:text-rose-600 transition-all border border-rose-50 rounded-2xl hover:bg-rose-50"
                >
                   إلغاء الاشتراك
                </button>
             </div>
          </div>

          {/* B) Payment Method Section */}
          <div className="glass-card rounded-[2.5rem] border border-white p-10 shadow-sm space-y-8">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                   <CreditCard className="text-blue-600" size={24} />
                   طريقة الدفع
                </h3>
                <button 
                  onClick={handleOpenStripePortal}
                  className="flex items-center gap-2 text-xs font-black text-blue-600 hover:underline"
                >
                   تحديث في Stripe <ExternalLink size={14} />
                </button>
             </div>

             <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between group">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-black text-slate-400 italic">
                      {sub?.paymentMethod.brand || 'VISA'}
                   </div>
                   <div>
                      <p className="font-black text-slate-800 text-lg">•••• •••• •••• {sub?.paymentMethod.last4 || '4242'}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">تاريخ الانتهاء: 12 / 2026</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                   <ShieldCheck size={14} />
                   Secure by Stripe
                </div>
             </div>
          </div>

          {/* C) Invoices Section */}
          <div className="glass-card rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
             <div className="p-8 border-b border-slate-50">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                   <FileText className="text-blue-600" size={24} />
                   سجل الفواتير
                </h3>
             </div>
             <table className="w-full text-right">
                <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                   <tr>
                      <th className="px-8 py-6">التاريخ</th>
                      <th className="px-8 py-6 text-center">المبلغ</th>
                      <th className="px-8 py-6 text-center">الحالة</th>
                      <th className="px-8 py-6 text-left"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {sub?.invoices.map(inv => (
                     <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6 font-bold text-slate-700">{inv.date}</td>
                        <td className="px-8 py-6 text-center font-black text-slate-900">{inv.amount.toLocaleString()} د.ع</td>
                        <td className="px-8 py-6 text-center">
                           <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${inv.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                              {inv.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-left">
                           <button className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 mr-auto">
                              <Download size={16} />
                              <span className="text-[10px] font-black uppercase">PDF</span>
                           </button>
                        </td>
                     </tr>
                   ))}
                   {(!sub?.invoices || sub.invoices.length === 0) && (
                     <tr>
                        <td colSpan={4} className="px-8 py-12 text-center text-slate-400 font-bold italic">لا توجد فواتير مسجلة بعد.</td>
                     </tr>
                   )}
                </tbody>
             </table>
          </div>
        </div>

        {/* Right Column: Info & Security */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent"></div>
              
              <div className="flex items-center gap-3 text-blue-400">
                 <ShieldCheck size={28} strokeWidth={2.5} />
                 <h4 className="text-lg font-black">أمان الدفع</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                 نحن نستخدم <span className="text-white">Stripe</span> لمعالجة كافة المدفوعات. لا يتم تخزين أي بيانات حساسة لبطاقتك الائتمانية على خوادمنا. كافة العمليات مشفرة بمعيار PCI-DSS.
              </p>
              <div className="pt-6 border-t border-slate-800">
                 <button 
                  onClick={handleOpenStripePortal}
                  className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                 >
                    بوابة Stripe الآمنة
                 </button>
              </div>
           </div>

           <div className="glass-card p-10 rounded-[3rem] border border-white shadow-sm space-y-6">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                 <AlertCircle size={24} />
              </div>
              <h4 className="text-lg font-black text-slate-800">هل تحتاج للمساعدة؟</h4>
              <p className="text-xs text-slate-500 font-bold leading-relaxed">
                 إذا كان لديك استفسار بخصوص فواتيرك أو ترغب في الحصول على عرض مخصص لمجموعة مطاعم، لا تتردد في التواصل معنا.
              </p>
              <button className="text-xs font-black text-blue-600 uppercase hover:underline">
                 تواصل مع الدعم الفني
              </button>
           </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl border border-white p-10 space-y-10">
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                 <div>
                   <h3 className="text-2xl font-black text-slate-800">اختر خطة الاشتراك</h3>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Upgrade or Change your membership plan</p>
                 </div>
                 <button onClick={() => setIsUpgradeModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={24} />
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {PLANS_DATA.map(plan => (
                   <div key={plan.id} className={`p-8 rounded-[2.5rem] border-2 flex flex-col gap-6 transition-all ${user.plan === plan.id ? 'border-blue-600 bg-blue-50/20' : 'border-slate-100'}`}>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${plan.id === user.plan ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                         {plan.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-lg">{plan.name}</h4>
                        <div className="flex items-baseline gap-1 mt-1">
                           <span className="text-2xl font-black text-slate-900">{plan.price.toLocaleString()}</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase">IQD / mo</span>
                        </div>
                      </div>
                      <ul className="space-y-3 flex-1">
                         {plan.features.map((f, i) => (
                           <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                              <Check size={14} className="text-blue-500" />
                              {f}
                           </li>
                         ))}
                      </ul>
                      <button 
                        disabled={user.plan === plan.id}
                        onClick={() => handleUpgrade(plan.id)}
                        className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${user.plan === plan.id ? 'bg-blue-100 text-blue-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
                      >
                         {user.plan === plan.id ? 'خطتك الحالية' : 'اختيار الخطة'}
                      </button>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Cancel Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white p-12 text-center space-y-8">
              <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto">
                 <ShieldAlert size={40} />
              </div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-black text-slate-800">هل أنت متأكد من الإلغاء؟</h3>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed">بإلغاء اشتراكك، ستفقد إمكانية الوصول إلى ميزات المساعد الذكي AI، استيراد المبيعات، والتقارير المتقدمة في نهاية الفترة الحالية.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setIsCancelModalOpen(false)} className="py-4 bg-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest">تراجع</button>
                 <button onClick={handleCancel} className="py-4 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-600/20">تأكيد الإلغاء</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
