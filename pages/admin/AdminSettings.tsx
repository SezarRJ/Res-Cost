
import React, { useState } from 'react';
import { Settings, ShieldAlert, Megaphone, Zap, Save, Globe, Lock, Cpu, Info, AlertTriangle } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [maintenance, setMaintenance] = useState(false);
  const [announcement, setAnnouncement] = useState('أهلاً بك في التحديث الجديد لـ MenuProfit! تم إضافة ميزات AI جديدة.');
  const [trialDays, setTrialDays] = useState(7);

  const handleSave = () => {
    alert('تم حفظ إعدادات النظام بنجاح وتعميمها على كافة المستخدمين.');
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800">إعدادات النظام</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Global Platform Configuration & Maintenance</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all flex items-center gap-3 active:scale-95"
        >
          <Save size={18} /> حفظ الإعدادات
        </button>
      </div>

      <div className="space-y-8">
         {/* Maintenance Mode */}
         <div className="glass-card p-10 rounded-[3rem] border border-white shadow-sm flex flex-col md:flex-row items-center gap-10">
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 transition-colors ${maintenance ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
               <ShieldAlert size={40} />
            </div>
            <div className="flex-1 space-y-2">
               <h3 className="text-xl font-black text-slate-800">وضع الصيانة (Maintenance Mode)</h3>
               <p className="text-sm text-slate-500 font-bold leading-relaxed">عند التفعيل، سيتم حظر كافة المستخدمين من الوصول للوحة التحكم وسيظهر لهم إشعار الصيانة فقط.</p>
            </div>
            <button 
              onClick={() => setMaintenance(!maintenance)}
              className={`w-16 h-8 rounded-full relative transition-colors ${maintenance ? 'bg-rose-600' : 'bg-slate-200'}`}
            >
               <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${maintenance ? 'left-1' : 'left-9'}`}></div>
            </button>
         </div>

         {/* Global Announcement */}
         <div className="glass-card p-10 rounded-[3rem] border border-white shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-amber-600">
               <Megaphone size={24} />
               <h3 className="text-xl font-black text-slate-800">إعلان عام للنظام</h3>
            </div>
            <p className="text-sm text-slate-500 font-bold">سيظهر هذا النص في شريط علوي لكافة المستخدمين في لوحة التحكم الخاصة بهم.</p>
            <textarea 
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              rows={3}
              className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] font-bold text-slate-800 outline-none focus:ring-4 focus:ring-blue-100 resize-none"
            />
         </div>

         {/* Trial Configuration */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-10 rounded-[3rem] border border-white shadow-sm space-y-6">
               <div className="flex items-center gap-3 text-blue-600">
                  <Zap size={24} />
                  <h3 className="text-lg font-black text-slate-800">أيام التجربة المجانية</h3>
               </div>
               <div className="relative">
                  <input 
                    type="number" 
                    value={trialDays}
                    onChange={(e) => setTrialDays(Number(e.target.value))}
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-2xl outline-none focus:ring-4 focus:ring-blue-100"
                  />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xs">أيام</span>
               </div>
               <p className="text-[10px] text-slate-400 font-bold leading-relaxed">تنطبق على خطتي PRO و ELITE عند التسجيل لأول مرة.</p>
            </div>

            <div className="glass-card p-10 rounded-[3rem] border border-white shadow-sm space-y-6 bg-slate-50/50">
               <div className="flex items-center gap-3 text-slate-500">
                  <Cpu size={24} />
                  <h3 className="text-lg font-black text-slate-800">نسخة النظام</h3>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold">
                     <span className="text-slate-400">الإصدار الحالي:</span>
                     <span className="bg-white px-3 py-1 rounded-lg shadow-sm">v2.4.0-production</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold">
                     <span className="text-slate-400">آخر تحديث:</span>
                     <span className="text-slate-800">12 يونيو 2024</span>
                  </div>
                  <button className="w-full py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-sm">
                     تحقق من وجود تحديثات
                  </button>
               </div>
            </div>
         </div>

         {/* Danger Area */}
         <div className="p-10 bg-rose-50 rounded-[3rem] border border-rose-100 space-y-6">
            <div className="flex items-center gap-3 text-rose-600">
               <AlertTriangle size={24} />
               <h3 className="text-xl font-black">منطقة التحكم الحساسة</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <button className="py-4 bg-white border border-rose-100 text-rose-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95">
                  إعادة تهيئة مخزن الـ Cache
               </button>
               <button className="py-4 bg-white border border-rose-100 text-rose-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95">
                  فصل كافة الجلسات النشطة
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminSettings;
