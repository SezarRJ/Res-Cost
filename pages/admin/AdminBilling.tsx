
import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  History,
  ShieldAlert,
  ArrowRight,
  Loader2
} from 'lucide-react';

const AdminBilling: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  
  const invoices = [
    { id: 'inv_01', restaurant: 'برجر هاوس', date: '2024-06-01', amount: '85,000 د.ع', status: 'paid', stripeId: 'in_882' },
    { id: 'inv_02', restaurant: 'أرز لبنان', date: '2024-06-05', amount: '85,000 د.ع', status: 'failed', stripeId: 'in_441' },
    { id: 'inv_03', restaurant: 'بيتزا كينج', date: '2024-06-10', amount: '45,000 د.ع', status: 'paid', stripeId: 'in_002' },
  ];

  const failedPayments = [
    { id: 'f1', restaurant: 'ريلاكس كافيه', reason: 'Insufficient funds', date: 'منذ يومين' },
    { id: 'f2', restaurant: 'مطعم أرز لبنان', reason: 'Card expired', date: 'منذ ساعة' },
  ];

  const handleDownload = (id: string) => {
    setIsProcessing(`download-${id}`);
    setTimeout(() => {
      setIsProcessing(null);
      alert(`جاري تحميل الفاتورة ${id} بصيغة PDF...`);
    }, 1500);
  };

  const handleSendMail = (id: string) => {
    setIsProcessing(`mail-${id}`);
    setTimeout(() => {
      setIsProcessing(null);
      alert(`تم إرسال الفاتورة والرسالة التذكيرية للمطعم بنجاح.`);
    }, 1500);
  };

  const handleUpdateNotice = (id: string) => {
    setIsProcessing(`notice-${id}`);
    setTimeout(() => {
      setIsProcessing(null);
      alert(`تم إرسال تنبيه "تحديث بيانات الدفع" لصاحب المطعم.`);
    }, 1500);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">الفوترة والمدفوعات</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Stripe Invoice Monitoring & Risk Management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-card rounded-[2.5rem] border border-white overflow-hidden shadow-sm flex flex-col">
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
               <h3 className="text-xl font-black text-slate-800">قائمة الفواتير</h3>
               <div className="relative w-full md:w-64">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input type="text" placeholder="ابحث عن فاتورة..." className="w-full pr-12 pl-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none" />
               </div>
            </div>
            <div className="overflow-x-auto flex-1">
               <table className="w-full text-right">
                  <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                     <tr>
                        <th className="px-8 py-6">المطعم</th>
                        <th className="px-8 py-6 text-center">التاريخ</th>
                        <th className="px-8 py-6 text-center">المبلغ</th>
                        <th className="px-8 py-6 text-center">الحالة</th>
                        <th className="px-8 py-6"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {invoices.map(inv => (
                        <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-8 py-6">
                              <p className="text-xs font-black text-slate-800">{inv.restaurant}</p>
                              <span className="text-[9px] text-slate-400 font-bold uppercase">{inv.stripeId}</span>
                           </td>
                           <td className="px-8 py-6 text-center text-[10px] font-bold text-slate-400">{inv.date}</td>
                           <td className="px-8 py-6 text-center text-xs font-black text-slate-700">{inv.amount}</td>
                           <td className="px-8 py-6 text-center">
                              <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase border ${inv.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                 {inv.status}
                              </span>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex items-center justify-end gap-2">
                                 <button 
                                   onClick={() => handleSendMail(inv.id)}
                                   disabled={!!isProcessing}
                                   title="إرسال عبر البريد" 
                                   className="p-2 text-slate-300 hover:text-blue-500 transition-colors disabled:opacity-50"
                                 >
                                    {isProcessing === `mail-${inv.id}` ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                                 </button>
                                 <button 
                                   onClick={() => handleDownload(inv.id)}
                                   disabled={!!isProcessing}
                                   title="تحميل PDF" 
                                   className="p-2 text-slate-300 hover:text-slate-600 transition-colors disabled:opacity-50"
                                 >
                                    {isProcessing === `download-${inv.id}` ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <div className="space-y-8">
            <div className="glass-card p-8 rounded-[2.5rem] border border-white shadow-sm">
               <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                  <XCircle size={20} className="text-rose-500" />
                  مدفوعات فشلت
               </h3>
               <div className="space-y-4">
                  {failedPayments.map((f, i) => (
                    <div key={i} className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl space-y-2">
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-slate-800">{f.restaurant}</span>
                          <span className="text-[9px] text-slate-400 font-bold">{f.date}</span>
                       </div>
                       <p className="text-[10px] text-rose-600 font-bold leading-none">{f.reason}</p>
                       <button 
                         onClick={() => handleUpdateNotice(f.id)}
                         disabled={!!isProcessing}
                         className="text-[9px] font-black text-blue-600 uppercase hover:underline disabled:opacity-50"
                       >
                          {isProcessing === `notice-${f.id}` ? 'جاري الإرسال...' : 'طلب تحديث الدفع'}
                       </button>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden space-y-6">
               <div className="flex items-center gap-3 text-amber-500">
                  <ShieldAlert size={28} />
                  <h4 className="font-black text-lg">نشاطات مشبوهة</h4>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed font-medium">نظام المراقبة يحلل عمليات الشحن المرتجع (Chargebacks) والأنشطة عالية المخاطر.</p>
               <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">بلاغات Chargebacks</span>
                  <p className="text-2xl font-black text-white">0</p>
               </div>
               <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">مراجعة المخاطر</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminBilling;
