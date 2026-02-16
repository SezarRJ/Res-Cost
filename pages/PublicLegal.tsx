
import React from 'react';
import { ScrollText, ShieldCheck, Scale, Info } from 'lucide-react';

interface PublicLegalProps {
  type: 'terms' | 'privacy';
}

const PublicLegal: React.FC<PublicLegalProps> = ({ type }) => {
  const content = type === 'terms' ? {
    title: 'الشروط والأحكام',
    subtitle: 'شروط استخدام منصة MenuProfit - آخر تحديث: يونيو 2024',
    icon: <Scale className="text-blue-600" size={32} />,
    sections: [
      { t: '1. قبول الشروط', c: 'باستخدامك لمنصة MenuProfit، فإنك توافق على الالتزام بكافة الشروط المذكورة هنا. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام المنصة.' },
      { t: '2. طبيعة الخدمة', c: 'MenuProfit هي منصة لإدارة تكاليف وتسعير المطاعم. النتائج المقدمة من أدوات الذكاء الاصطناعي هي توصيات استشارية ويظل القرار النهائي بيد مالك المنشأة.' },
      { t: '3. الاشتراكات والدفع', c: 'تتم معالجة المدفوعات شهرياً. يحق للمستخدم إلغاء الاشتراك في أي وقت، وستظل الميزات فعالة حتى نهاية الفترة المدفوعة. لا يتم استرداد المبالغ المدفوعة عن فترات مستخدمة.' },
      { t: '4. الملكية الفكرية والبيانات', c: 'كافة البيانات والوصفات التي تدخلها هي ملكية خاصة لك ولنشاطك التجاري. تلتزم المنصة بتوفير الأدوات اللازمة للتحليل دون التدخل في ملكية المحتوى.' },
      { t: '5. المسؤولية القانونية', c: 'MenuProfit غير مسؤولة عن أي خسائر مالية ناتجة عن أخطاء في إدخال البيانات من قبل المستخدم أو عن قرارات تسعير خاطئة.' },
    ]
  } : {
    title: 'سياسة الخصوصية',
    subtitle: 'كيف نحمي بيانات مطعمك - آخر تحديث: يونيو 2024',
    icon: <ShieldCheck className="text-emerald-600" size={32} />,
    sections: [
      { t: '1. جمع البيانات واستخدامها', c: 'نحن نجمع البيانات الضرورية فقط لتقديم خدمات تحليل التكاليف والتسعير بشكل دقيق، مثل أسماء المكونات وأسعار الموردين التي تزودنا بها.' },
      { t: '2. أمن البيانات وحمايتها', c: 'نستخدم بروتوكولات تشفير متقدمة (SSL/TLS) لحماية بياناتك من أي وصول غير مصرح به. يتم تخزين البيانات في بيئات سحابية معزولة تماماً.' },
      { t: '3. سرية الوصفات (سر الصنعة)', c: 'ندرك أن وصفاتك هي قلب عملك. نحن لا نقوم ببيع أو مشاركة بيانات مطعمك أو وصفاتك مع أي طرف ثالث أو استخدامها في تدريب نماذج الذكاء الاصطناعي بشكل عام.' },
      { t: '4. الكوكيز (Cookies)', c: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك في تسجيل الدخول وحفظ إعدادات لوحة التحكم الخاصة بك.' },
      { t: '5. التواصل', c: 'قد نستخدم بريدك الإلكتروني لإرسال تنبيهات هامة بخصوص حسابك أو فواتيرك، أو تحديثات أمنية للمنصة.' },
    ]
  };

  return (
    <div className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16 border-b border-slate-100 pb-10 flex items-center gap-8">
           <div className="p-5 bg-slate-50 rounded-[2rem] shadow-inner shrink-0">
             {content.icon}
           </div>
           <div>
             <h1 className="text-4xl font-black text-slate-800 mb-2">{content.title}</h1>
             <p className="text-slate-400 font-bold">{content.subtitle}</p>
           </div>
        </div>
        
        <div className="space-y-16">
           {content.sections.map((sec, i) => (
             <div key={i} className="space-y-4 group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">{sec.t}</h3>
                </div>
                <p className="text-slate-500 font-bold leading-relaxed text-lg pr-11">{sec.c}</p>
             </div>
           ))}
        </div>

        <div className="mt-20 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex items-start gap-6">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm shrink-0">
            <Info size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="font-black text-slate-800">هل لديك استفسار قانوني؟</h4>
            <p className="text-sm text-slate-500 font-bold leading-relaxed">
              إذا كنت بحاجة إلى مزيد من التوضيح بخصوص شروطنا أو كيف نتعامل مع بياناتك الحساسة، يرجى التواصل مع فريقنا القانوني عبر البريد: legal@menuprofit.iq
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLegal;
