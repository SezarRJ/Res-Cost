
import React from 'react';
import { ChefHat, TrendingUp, BarChart3, Zap, ShieldCheck, ShoppingCart, Percent, Calculator } from 'lucide-react';

const PublicFeatures: React.FC = () => {
  const features = [
    { title: 'إدارة المواد الخام', desc: 'قاعدة بيانات شاملة للمواد، تتبع تقلبات الأسعار من الموردين، وتحويل الوحدات تلقائياً.', icon: <ShoppingCart size={28} /> },
    { title: 'هيكلة الوصفات', desc: 'اربط مكوناتك بوصفاتك واعرف تكلفة كل وجبة بدقة متناهية مع حساب الفاقد.', icon: <ChefHat size={28} /> },
    { title: 'محسن الأسعار بالـ AI', desc: 'خوارزميات ذكية تقترح عليك سعر البيع الأمثل لضمان أعلى ربحية وتنافسية.', icon: <TrendingUp size={28} /> },
    { title: 'تقارير الأداء', desc: 'رسوم بيانية توضح نمو الأرباح، نقطة التعادل، وأداء المنيو أسبوعياً وشهرياً.', icon: <BarChart3 size={28} /> },
    { title: 'استيراد المبيعات الذكي', desc: 'حول تقارير POS المعقدة إلى رؤى واضحة بضغطة زر واحدة.', icon: <Zap size={28} /> },
    { title: 'إدارة التكاليف الثابتة', desc: 'لا تغفل عن الإيجار والرواتب؛ ادمج التكاليف التشغيلية في حساب تكلفة الطبق.', icon: <Calculator size={28} /> },
    { title: 'قواعد العروض والخصومات', desc: 'صمم حملات ترويجية مدروسة تزيد المبيعات دون المساس بهامش الربح الآمن.', icon: <Percent size={28} /> },
    { title: 'أمن البيانات', desc: 'بيانات مطعمك في أيدٍ أمينة مع تشفير عالي المستوى ونسخ احتياطي يومي.', icon: <ShieldCheck size={28} /> },
  ];

  return (
    <div className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 max-w-3xl mx-auto space-y-4">
          <h1 className="text-5xl font-black text-slate-900 leading-tight">كل ما تحتاجه لإدارة <br /> مطبخ رابح في مكان واحد</h1>
          <p className="text-xl text-slate-500 font-bold leading-relaxed">نحن لا نقدم مجرد جداول بيانات، بل نقدم ذكاءً تجارياً يحول مطعمك إلى آلة ربحية منظمة.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {features.map((f, i) => (
             <div key={i} className="space-y-6 group">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                   {f.icon}
                </div>
                <h3 className="text-xl font-black text-slate-800">{f.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed text-sm">{f.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default PublicFeatures;
