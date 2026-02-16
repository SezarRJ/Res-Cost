
import React from 'react';
import { Check, Zap, Crown, Award } from 'lucide-react';
import { SubscriptionPlan } from '../types';

interface BillingProps {
  currentPlan: SubscriptionPlan;
}

const Billing: React.FC<BillingProps> = ({ currentPlan }) => {
  const plans = [
    {
      name: SubscriptionPlan.FREE,
      price: '0',
      features: ['مطعم واحد', 'حتى 30 مادة خام', 'حتى 20 وصفة', 'حساب التكاليف الأساسي'],
      icon: <Award className="text-slate-400" />,
      color: 'bg-slate-50',
      buttonText: 'خطتك الحالية',
      active: currentPlan === SubscriptionPlan.FREE
    },
    {
      name: SubscriptionPlan.PRO,
      price: '45,000',
      features: ['مواد/وصفات غير محدودة', 'استيراد المبيعات (Excel)', 'أسعار المنافسين', 'تقارير PDF احترافية'],
      icon: <Zap className="text-blue-600" />,
      color: 'bg-blue-50',
      buttonText: 'ترقية إلى PRO',
      active: currentPlan === SubscriptionPlan.PRO,
      popular: true
    },
    {
      name: SubscriptionPlan.ELITE,
      price: '85,000',
      features: ['كل مميزات PRO', 'تحليل الذكاء الاصطناعي', 'تعدد المستخدمين (5)', 'دعم فني مخصص'],
      icon: <Crown className="text-amber-500" />,
      color: 'bg-amber-50',
      buttonText: 'ترقية إلى ELITE',
      active: currentPlan === SubscriptionPlan.ELITE
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">باقات الاشتراك</h1>
        <p className="text-slate-500">اختر الباقة التي تناسب حجم نشاطك التجاري</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`
              relative bg-white rounded-3xl border-2 p-8 transition-all hover:shadow-xl
              ${plan.active ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-100'}
              ${plan.popular ? 'scale-105 z-10' : ''}
            `}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                الأكثر طلباً
              </div>
            )}
            
            <div className={`w-14 h-14 rounded-2xl ${plan.color} flex items-center justify-center mb-6`}>
              {plan.icon}
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-black text-slate-900">{plan.price}</span>
              <span className="text-slate-500 text-sm">د.ع / شهر</span>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                  <div className="mt-1 bg-emerald-100 text-emerald-600 rounded-full p-0.5">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              className={`
                w-full py-3 rounded-2xl font-bold transition-all
                ${plan.active 
                  ? 'bg-slate-100 text-slate-400 cursor-default' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'}
              `}
              disabled={plan.active}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-bold text-slate-800 text-lg">هل تحتاج إلى باقة مخصصة؟</h4>
          <p className="text-slate-500 text-sm">للمطاعم الكبرى والامتيازات (Franchise) نوفر حلولاً مخصصة لاحتياجاتكم.</p>
        </div>
        <button className="whitespace-nowrap px-8 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
          تواصل معنا
        </button>
      </div>
    </div>
  );
};

export default Billing;
