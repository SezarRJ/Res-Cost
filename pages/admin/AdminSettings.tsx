
import React, { useState } from 'react';
import { 
  Settings, 
  ShieldAlert, 
  Megaphone, 
  Zap, 
  Save, 
  Globe, 
  Lock, 
  Cpu, 
  Info, 
  AlertTriangle,
  UploadCloud,
  FileSearch,
  Activity,
  Server,
  Database,
  Webhook,
  Languages,
  Loader2,
  Mail,
  Edit3,
  CheckCircle2
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [maintenance, setMaintenance] = useState(false);
  const [primaryLanguage, setPrimaryLanguage] = useState('ar');
  const [isRescanning, setIsRescanning] = useState(false);
  const [flags, setFlags] = useState({
    salesImport: true,
    pdfExport: true,
    aiHub: true,
    betaReports: false
  });

  const handleSave = () => {
    alert('تم حفظ إعدادات النظام وتحديث أعلام الميزات واللغة فوراً لكافة المستخدمين.');
  };

  const handleRescan = () => {
    setIsRescanning(true);
    setTimeout(() => {
      setIsRescanning(false);
      alert('تمت عملية إعادة فحص الأنظمة بنجاح. كافة الاتصالات مستقرة.');
    }, 2000);
  };

  const diagnostics = [
    { n: 'Database Connection', s: 'healthy', i: <Database size={16} /> },
    { n: 'Stripe Webhook', s: 'healthy', i: <Webhook size={16} /> },
    { n: 'Gemini AI Provider', s: 'healthy', i: <Cpu size={16} /> },
    { n: 'S3 Storage (Files)', s: 'healthy', i: <Server size={16} /> },
  ];

  const emailTemplates = [
    { id: 'welcome', name: 'Welcome Email', icon: <Mail size={16} />, desc: 'يرسل عند تسجيل مستخدم جديد.' },
    { id: 'reset', name: 'Password Reset', icon: <Lock size={16} />, desc: 'يرسل عند طلب استعادة الرمز.' },
    { id: 'failed', name: 'Payment Failed', icon: <AlertTriangle size={16} />, desc: 'يرسل عند فشل عملية الدفع.' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">إعدادات النظام</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Global Platform Infrastructure & Maintenance</p>
        </div>
        <button 
          onClick={handleSave}
          className="w-full md:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <Save size={18} /> حفظ التغييرات عالمياً
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 space-y-10">
            
            {/* Improved Language Selection */}
            <div className="glass-card p-10 rounded-[3rem] border border-white shadow-sm space-y-8">
               <div className="flex items-center gap-3 text-indigo-600">
                  <Languages size={24} />
                  <h3 className="text-xl font-black text-slate-800">لغة المنصة الافتراضية</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'ar', label: 'العربية (RTL)', flag: '🇮🇶', desc: 'اللغة الأساسية' },
                    { id: 'en', label: 'English (LTR)', flag: '🇺🇸', desc: 'Standard English' },
                    { id: 'ku', label: 'Kurdish / كوردی', flag: '☀️', desc: 'سۆرانى / بادينى' },
                  ].map(lang => (
                    <button
                      key={lang.id}
                      onClick={() => setPrimaryLanguage(lang.id)}
                      className={`group p-6 rounded-[2rem] border-2 flex flex-col items-center text-center gap-3 transition-all relative overflow-hidden ${primaryLanguage === lang.id ? 'border-blue-600 bg-blue-50/50 shadow-md scale-[1.02]' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-blue-200'}`}
                    >
                       <span className={`text-3xl transition-transform duration-500 group-hover:scale-125 ${primaryLanguage === lang.id ? 'animate-bounce' : ''}`}>{lang.flag}</span>
                       <div className="space-y-1">
                          <span className="text-xs font-black uppercase tracking-tight block">{lang.label}</span>
                          <span className="text-[8px] font-bold text-slate-400 block">{lang.desc}</span>
                       </div>
                       {primaryLanguage === lang.id && (
                         <div className="absolute top-2 left-2 text-blue-600">
                            <CheckCircle2 size={16} />
                         </div>
                       )}
                    </button>
                  ))}
               </div>
               <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4 items-start">
                  <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
                     تغيير اللغة الافتراضية سيقوم بإعادة تحميل واجهة المستخدم لكافة المستأجرين (Tenants) النشطين وتعديل اتجاه الصفحة (RTL/LTR) بناءً على الاختيار.
                  </p>
               </div>
            </div>

            {/* Email Templates Selection */}
            <div className="glass-card p-10 rounded-[3rem] border border-white shadow-sm space-y-8">
               <div className="flex items-center gap-3 text-blue-600">
                  <Mail size={24} />
                  <h3 className="text-xl font-black text-slate-800">إدارة قوالب البريد الإلكتروني</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {emailTemplates.map(template => (
                    <div key={template.id} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col gap-4 group hover:bg-white hover:border-blue-200 transition-all cursor-pointer">
                       <div className="flex items-center justify-between">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                             {template.icon}
                          </div>
                          <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                             <Edit3 size={16} />
                          </button>
                       </div>
                       <div>
                          <h4 className="text-sm font-black text-slate-800">{template.name}</h4>
                          <p className="text-[10px] text-slate-400 font-bold mt-1">{template.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Maintenance Mode */}
            <div className={`p-10 rounded-[3rem] border flex flex-col md:flex-row items-center gap-10 transition-all duration-500 ${maintenance ? 'bg-rose-50 border-rose-100 shadow-xl' : 'glass-card border-white shadow-sm'}`}>
               <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 transition-colors ${maintenance ? 'bg-rose-600 text-white animate-pulse' : 'bg-blue-50 text-blue-600'}`}>
                  <ShieldAlert size={40} />
               </div>
               <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-black text-slate-800">وضع الصيانة (Maintenance Mode)</h3>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">عند التفعيل، سيظهر للمستخدمين صفحة ثابتة تشير إلى وجود صيانة، وسيتم حظر كافة عمليات الـ API باستثناء الأدمن.</p>
               </div>
               <button 
                 onClick={() => setMaintenance(!maintenance)}
                 className={`w-16 h-8 rounded-full relative transition-colors ${maintenance ? 'bg-rose-600' : 'bg-slate-200'}`}
               >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${maintenance ? 'left-1' : 'left-9'}`}></div>
               </button>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-10">
            {/* Environment Diagnostics with Loading State */}
            <div className="glass-card p-8 rounded-[3rem] border border-white shadow-sm space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
                    <Activity size={20} className="text-emerald-500" /> تشخيص البيئة
                  </h3>
                  {isRescanning && <Loader2 size={16} className="text-blue-600 animate-spin" />}
               </div>
               <div className="space-y-4">
                  {diagnostics.map((d, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">{d.i}</div>
                          <span className="text-[10px] font-bold text-slate-600">{d.n}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isRescanning ? 'bg-blue-400 animate-pulse' : 'bg-emerald-500'}`}></span>
                          <span className={`text-[10px] font-black uppercase ${isRescanning ? 'text-blue-400' : 'text-emerald-600'}`}>{isRescanning ? 'Checking...' : d.s}</span>
                       </div>
                    </div>
                  ))}
               </div>
               <button 
                onClick={handleRescan}
                disabled={isRescanning}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
               >
                  {isRescanning ? <Loader2 size={14} className="animate-spin" /> : <Activity size={14} />}
                  إعادة فحص الأنظمة
               </button>
            </div>

            {/* Feature Flags */}
            <div className="glass-card p-8 rounded-[3rem] border border-white shadow-sm space-y-6">
               <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
                  <Zap size={20} className="text-amber-500" /> أعلام الميزات
               </h3>
               <div className="space-y-4">
                  {Object.entries(flags).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                       <span className="text-[10px] font-black text-slate-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                       <button 
                        onClick={() => setFlags({...flags, [key]: !val})}
                        className={`w-10 h-5 rounded-full relative transition-colors ${val ? 'bg-blue-600' : 'bg-slate-300'}`}
                       >
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${val ? 'left-1' : 'left-6'}`}></div>
                       </button>
                    </div>
                  ))}
               </div>
            </div>

            {/* Global Limits */}
            <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-200 space-y-6 shadow-inner">
               <div className="flex items-center gap-3 text-slate-500">
                  <UploadCloud size={24} />
                  <h4 className="font-black text-lg">قيود الرفع</h4>
               </div>
               <div className="space-y-4">
                  <div className="space-y-1">
                     <label className="text-[9px] font-black text-slate-400 uppercase px-2">الحجم الأقصى (MB)</label>
                     <input type="number" defaultValue={100} className="w-full p-4 bg-white border border-slate-100 rounded-xl text-lg font-black outline-none" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminSettings;
