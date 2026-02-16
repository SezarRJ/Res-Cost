
import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const PublicContact: React.FC = () => {
  return (
    <div className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
           <div className="space-y-4">
              <h1 className="text-5xl font-black text-slate-900">نحن هنا لمساعدتك</h1>
              <p className="text-xl text-slate-500 font-bold">هل لديك استفسار؟ فريقنا مستعد للإجابة على كافة تساؤلاتك ودعم رحلتك.</p>
           </div>

           <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">البريد الإلكتروني</p>
                    <p className="text-lg font-black text-slate-800">support@menuprofit.iq</p>
                 </div>
              </div>
              <div className="flex items-center gap-6 group">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Phone size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">واتساب / هاتف</p>
                    <p className="text-lg font-black text-slate-800" dir="ltr">+964 780 000 0000</p>
                 </div>
              </div>
              <div className="flex items-center gap-6 group">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">الموقع</p>
                    <p className="text-lg font-black text-slate-800">العراق - بغداد / أربيل</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-xl">
           <h3 className="text-2xl font-black text-slate-800 mb-10">أرسل لنا رسالة</h3>
           <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'); }}>
              <div className="space-y-2">
                 <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">الاسم</label>
                 <input type="text" placeholder="اسمك الكريم" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" required />
              </div>
              <div className="space-y-2">
                 <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">البريد الإلكتروني</label>
                 <input type="email" placeholder="example@email.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" required />
              </div>
              <div className="space-y-2">
                 <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">الرسالة</label>
                 <textarea placeholder="كيف يمكننا مساعدتك اليوم؟" rows={4} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none resize-none" required></textarea>
              </div>
              <button className="w-full py-5 bg-blue-600 text-white rounded-2xl text-lg font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                 <Send size={20} className="rotate-180" />
                 إرسال الرسالة
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default PublicContact;
