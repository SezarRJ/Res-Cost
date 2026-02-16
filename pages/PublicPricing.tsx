
import React from 'react';
import { Check, Sparkles, AlertCircle, HelpCircle, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { SubscriptionPlan } from '../types';

interface PublicPricingProps {
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

const PublicPricing: React.FC<PublicPricingProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      name: SubscriptionPlan.FREE,
      price: '0',
      desc: 'للمطاعم والمطابخ المنزلية الناشئة التي تريد التنظيم.',
      features: ['مطعم واحد', 'حتى 30 مادة خام', 'حتى 20 وصفة', 'حساب التكاليف الأساسي', 'دعم عبر البريد'],
      button: 'ابدأ مجاناً',
      color: 'slate',
      accent: 'bg-slate-50'
    },
    {
      name: SubscriptionPlan.PRO,
      price: '45,000',
      popular: true,
      desc: 'للمطاعم المحترفة التي تطمح للنمو الفعلي.',
      features: ['مواد/وصفات غير محدودة', 'استيراد المبيعات (CSV/Excel)', 'أسعار المنافسين في السوق', 'تقارير PDF احترافية', 'دعم فني سريع عبر واتساب'],
      button: 'تجربة PRO مجانية',
      color: 'blue',
      accent: 'bg-blue-50'
    },
    {
      name: SubscriptionPlan.ELITE,
      price: '85,000',
      desc: 'للمجموعات والمطاعم الكبيرة المتكاملة.',
      features: ['كل مميزات PRO', 'تحليل الذكاء الاصطناعي (AI Hub)', 'تعدد المستخدمين (5 موظفين)', 'دعم فني مخصص 24/7', 'تدريب مباشر للفريق'],
      button: 'اطلب ELITE الآن',
      color: 'amber',
      accent: 'bg-amber-50'
    }
  ];

  const faqs = [
    { q: 'هل يمكنني التبديل بين الخطط لاحقاً؟', a: 'نعم، يمكنك الترقية أو التخفيض في أي وقت من إعدادات حسابك.' },
    { q: 'هل بيانات وصفاتي آمنة وسرية؟', a: 'بالتأكيد. تشفيرنا يضمن أنك الوحيد الذي يمكنه الوصول لبياناتك وتكاليفك.' },
    { q: 'ما هي طرق الدفع المتوفرة في العراق؟', a: 'ندعم زين كاش، ماستر كارد الرافدين والرشيد، فيزا كارد، وطرق الدفع الدولية عبر Stripe.' },
    { q: 'هل أحتاج لتركيب أجهزة خاصة؟', a: 'لا، MenuProfit هو تطبيق سحابي يعمل على أي متصفح في الهاتف أو الحاسوب.' }
  ];

  return (
    <div className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-blue-600 bg-blue-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">Pricing Plans</div>
          <h1 className="text-5xl font-black text-slate-900 leading-tight">استثمر في مستقبل مطعمك بذكاء</h1>
          <p className="text-xl text-slate-500 font-bold leading-relaxed">خطط مرنة تناسب جميع أحجام المطاعم، من العربة المتنقلة إلى السلاسل الكبيرة.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {plans.map((plan, i) => (
             <div 
               key={i} 
               className={`bg-white rounded-[3rem] p-12 border-2 transition-all hover:shadow-2xl relative flex flex-col ${plan.popular ? 'border-blue-600 scale-105 z-10 shadow-xl' : 'border-slate-100 hover:border-blue-200'}`}
             >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                    <Sparkles size={12} />
                    الباقة الأكثر طلباً في العراق
                  </div>
                )}
                
                <div className="mb-10 text-center">
                   <h3 className="text-2xl font-black text-slate-800 mb-2">{plan.name}</h3>
                   <p className="text-xs text-slate-400 font-bold leading-relaxed">{plan.desc}</p>
                </div>

                <div className="text-center mb-12">
                   <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                      <div className="flex flex-col items-start">
                         <span className="text-slate-500 font-black text-sm leading-none">د.ع</span>
                         <span className="text-slate-400 font-bold text-[10px] uppercase">شهرياً</span>
                      </div>
                   </div>
                </div>

                <ul className="space-y-6 mb-12 flex-1">
                   {plan.features.map((f, j) => (
                     <li key={j} className="flex items-start gap-4 text-slate-600 font-bold text-sm leading-relaxed">
                        <div className={`mt-1 ${plan.accent} text-blue-600 rounded-full p-1 shrink-0`}>
                           <Check size={14} strokeWidth={4} />
                        </div>
                        {f}
                     </li>
                   ))}
                </ul>

                <button 
                  onClick={() => onSelectPlan(plan.name as SubscriptionPlan)}
                  className={`w-full py-5 rounded-2xl text-lg font-black transition-all ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20' : 'bg-slate-50 text-slate-800 hover:bg-slate-100'}`}
                >
                   {plan.button}
                </button>
             </div>
           ))}
        </div>

        {/* Local Payment Methods Info */}
        <div className="mt-24 p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="space-y-6 lg:max-w-xl">
                 <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                   <ShieldCheck size={32} />
                 </div>
                 <h4 className="text-2xl font-black text-slate-800">طرق دفع آمنة ومحلية</h4>
                 <p className="text-slate-500 font-bold leading-relaxed">نحن نفهم تحديات الدفع في العراق، لذلك وفرنا لك كافة الخيارات لتسهيل اشتراكك والاستمرار في تنمية عملك.</p>
                 <div className="flex flex-wrap gap-4 pt-4 grayscale opacity-60">
                    <span className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-black uppercase">ZainCash</span>
                    <span className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-black uppercase">MasterCard</span>
                    <span className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-black uppercase">VisaCard</span>
                    <span className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-black uppercase">AsiaHawala</span>
                 </div>
              </div>
              <div className="w-full lg:w-96 p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl space-y-6">
                 <h5 className="font-black text-lg">تحتاج المساعدة؟</h5>
                 <p className="text-sm text-slate-400 font-bold leading-relaxed">فريق المبيعات جاهز لمساعدتك في اختيار الخطة الأنسب لمطعمك.</p>
                 <button className="w-full py-4 bg-white text-slate-900 rounded-xl font-black text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                    تواصل معنا عبر واتساب
                    <ArrowRight size={18} className="rotate-180" />
                 </button>
              </div>
           </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 space-y-16">
           <div className="text-center space-y-4">
              <h2 className="text-3xl font-black text-slate-800">الأسئلة الشائعة</h2>
              <p className="text-slate-500 font-bold">كل ما تريد معرفته عن MenuProfit.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-blue-100 transition-all">
                   <div className="flex gap-4">
                      <HelpCircle className="text-blue-600 shrink-0" size={24} />
                      <div className="space-y-2">
                         <h4 className="font-black text-slate-800">{faq.q}</h4>
                         <p className="text-sm text-slate-500 font-bold leading-relaxed">{faq.a}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPricing;
