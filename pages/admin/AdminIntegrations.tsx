
import React, { useState } from 'react';
import { 
  Link2, 
  CreditCard, 
  Cpu, 
  MessageSquare, 
  Cloud, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Settings2, 
  RefreshCcw, 
  Key,
  Database,
  X,
  Plus,
  Loader2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const AdminIntegrations: React.FC = () => {
  const [isRescanning, setIsRescanning] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [integrations, setIntegrations] = useState([
    { 
      id: 'stripe', 
      name: 'Stripe Payments', 
      type: 'Payment Gateway', 
      status: 'connected', 
      icon: <CreditCard size={24} />, 
      lastSync: 'منذ دقيقة',
      description: 'معالجة الاشتراكات، الفواتير، والمدفوعات الآلية.'
    },
    { 
      id: 'gemini', 
      name: 'Google Gemini AI', 
      type: 'AI Engine', 
      status: 'connected', 
      icon: <Cpu size={24} />, 
      lastSync: 'منذ 5 ثواني',
      description: 'توفير ميزات تحليل الأسعار ومساعد الوصفات الذكي.'
    },
    { 
      id: 'twilio', 
      name: 'Twilio SMS', 
      type: 'Messaging', 
      status: 'disconnected', 
      icon: <MessageSquare size={24} />, 
      lastSync: 'N/A',
      description: 'إرسال تنبيهات الدفع ورموز التحقق عبر الرسائل القصيرة.'
    },
    { 
      id: 'pocketbase', 
      name: 'PocketBase', 
      type: 'Database / Auth', 
      status: 'connected', 
      icon: <Database size={24} />, 
      lastSync: 'الآن',
      description: 'تخزين بيانات المستخدمين والمطاعم وسجلات التدقيق.'
    },
    { 
      id: 's3', 
      name: 'S3 Object Storage', 
      type: 'Storage', 
      status: 'warning', 
      icon: <Cloud size={24} />, 
      lastSync: 'منذ ساعة',
      description: 'تخزين ملفات الـ Excel المرفوعة وتقارير الـ PDF.'
    },
  ]);

  const handleRescan = () => {
    setIsRescanning(true);
    setTimeout(() => {
      setIsRescanning(false);
      // Simulate status refresh
      setIntegrations(prev => prev.map(i => i.id === 'twilio' ? {...i, status: 'connected', lastSync: 'الآن'} : i));
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <span className="bg-emerald-50 text-emerald-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase border border-emerald-100 flex items-center gap-1"><CheckCircle2 size={10} /> متصل</span>;
      case 'warning':
        return <span className="bg-amber-50 text-amber-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase border border-amber-100 flex items-center gap-1">تنبيه</span>;
      default:
        return <span className="bg-rose-50 text-rose-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase border border-rose-100 flex items-center gap-1"><XCircle size={10} /> غير متصل</span>;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">الربط والتكامل (Integrations)</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Manage External Services & API Connections</p>
        </div>
        <button 
          onClick={handleRescan}
          disabled={isRescanning}
          className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
        >
           {isRescanning ? <Loader2 size={18} className="animate-spin" /> : <RefreshCcw size={18} />}
           {isRescanning ? 'جاري الفحص...' : 'إعادة فحص كافة الاتصالات'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
         {integrations.map(item => (
           <div key={item.id} className="glass-card p-10 rounded-[3rem] border border-white shadow-sm hover:shadow-xl transition-all group flex flex-col gap-8 relative overflow-hidden">
              <div className="flex justify-between items-start">
                 <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner ${item.status === 'connected' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                    {item.icon}
                 </div>
                 {getStatusBadge(item.status)}
              </div>

              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-800">{item.name}</h3>
                    <span className="text-[8px] font-black text-slate-400 uppercase bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{item.type}</span>
                 </div>
                 <p className="text-xs text-slate-500 font-bold leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                 <div className="space-y-1">
                    <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest block">آخر مزامنة</span>
                    <p className="text-[10px] font-black text-slate-700">{item.lastSync}</p>
                 </div>
                 <div className="flex gap-2">
                    <button title="إدارة المفاتيح" className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90"><Key size={16} /></button>
                    <button title="الإعدادات" className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all active:scale-90"><Settings2 size={16} /></button>
                 </div>
              </div>
           </div>
         ))}

         {/* Add New Integration Action */}
         <div 
           onClick={() => setIsAddModalOpen(true)}
           className="border-2 border-dashed border-slate-200 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center gap-4 hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer group active:scale-[0.98]"
         >
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-blue-500 group-hover:rotate-90 transition-all duration-500">
               <Plus size={32} />
            </div>
            <div>
               <h4 className="font-black text-slate-800">إضافة ربط جديد</h4>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Discover API Marketplace</p>
            </div>
         </div>
      </div>

      {/* Webhook Status Info */}
      <div className="p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
         <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-blue-400 shrink-0">
            <RefreshCcw size={40} className="animate-spin-slow" />
         </div>
         <div className="space-y-3 relative z-10">
            <h3 className="text-2xl font-black">مراقبة الـ Webhooks لحظة بلحظة</h3>
            <p className="text-slate-400 font-bold text-sm leading-relaxed max-w-2xl">
               تتم مراقبة كافة أحداث Stripe وطلبات الذكاء الاصطناعي بشكل مستمر. في حال حدوث انقطاع في أي خدمة، سيتم تنبيهك فوراً عبر البريد الإلكتروني ولوحة التحكم.
            </p>
            <button className="flex items-center gap-2 text-xs font-black text-blue-400 hover:underline">عرض سجل الـ Webhook <ExternalLink size={14} /></button>
         </div>
      </div>

      {/* Add Integration Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                 <div className="flex items-center gap-4 text-blue-600">
                    <Link2 size={24} />
                    <h3 className="text-xl font-black text-slate-800">سوق الإضافات والتكامل</h3>
                 </div>
                 <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar max-h-[60vh]">
                 {[
                   { name: 'WhatsApp Business', desc: 'إرسال تنبيهات المبيعات والتقارير عبر الواتساب.', icon: <MessageSquare className="text-emerald-500" /> },
                   { name: 'Google Sheets', desc: 'تصدير تلقائي للبيانات إلى جداول جوجل.', icon: <Database className="text-blue-500" /> },
                   { name: 'Sentry Logs', desc: 'مراقبة أخطاء النظام للمطورين.', icon: <ShieldCheck className="text-rose-500" /> },
                   { name: 'Mailgun', desc: 'خدمة البريد الإلكتروني الموثوقة.', icon: <ExternalLink className="text-amber-500" /> },
                 ].map((app, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-blue-200 hover:shadow-md transition-all group">
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            {app.icon}
                         </div>
                         <div>
                            <h4 className="font-black text-slate-800">{app.name}</h4>
                            <p className="text-xs text-slate-400 font-bold">{app.desc}</p>
                         </div>
                      </div>
                      <button className="flex items-center gap-2 bg-white text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                         ربط الخدمة <ChevronRight size={14} className="rotate-180" />
                      </button>
                   </div>
                 ))}
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">More coming soon...</p>
                 <button 
                   onClick={() => setIsAddModalOpen(false)}
                   className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all"
                 >
                    إغلاق
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminIntegrations;
