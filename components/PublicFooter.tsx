
import React from 'react';

interface PublicFooterProps {
  onNavigate: (path: string) => void;
}

const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl text-white">M</div>
            <h1 className="text-2xl font-black tracking-tight">MenuProfit</h1>
          </div>
          <p className="text-slate-400 font-bold leading-relaxed">المنصة الأولى في العراق والشرق الأوسط لتحليل تكاليف وتسعير المطاعم باستخدام الذكاء الاصطناعي.</p>
        </div>

        <div>
          <h4 className="font-black mb-8 text-blue-400 uppercase tracking-widest text-sm">التطبيق</h4>
          <ul className="space-y-4">
            <li><button onClick={() => onNavigate('features')} className="text-slate-400 hover:text-white transition-colors">الميزات</button></li>
            <li><button onClick={() => onNavigate('pricing')} className="text-slate-400 hover:text-white transition-colors">التسعير</button></li>
            <li><button onClick={() => onNavigate('dashboard')} className="text-slate-400 hover:text-white transition-colors">لوحة التحكم</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-8 text-blue-400 uppercase tracking-widest text-sm">الدعم</h4>
          <ul className="space-y-4">
            <li><button onClick={() => onNavigate('contact')} className="text-slate-400 hover:text-white transition-colors">تواصل معنا</button></li>
            <li><button onClick={() => onNavigate('contact')} className="text-slate-400 hover:text-white transition-colors">الأسئلة الشائعة</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-8 text-blue-400 uppercase tracking-widest text-sm">قانوني</h4>
          <ul className="space-y-4">
            <li><button onClick={() => onNavigate('terms')} className="text-slate-400 hover:text-white transition-colors">الشروط والأحكام</button></li>
            <li><button onClick={() => onNavigate('privacy')} className="text-slate-400 hover:text-white transition-colors">سياسة الخصوصية</button></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm font-bold">© {new Date().getFullYear()} MenuProfit. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};

export default PublicFooter;
