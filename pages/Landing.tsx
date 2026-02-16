import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  ChevronLeft, 
  ArrowRight, 
  CheckCircle2, 
  Calculator, 
  Play, 
  Star,
  ShoppingCart 
} from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-64 overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[120px] opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest mb-10 border border-blue-100 animate-in fade-in slide-in-from-top-4 duration-700">
              <Sparkles size={16} />
              الذكاء الاصطناعي وصل إلى مطبخك العراقي
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              حوّل مطعمك إلى <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">منظومة ربح ذكية</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-bold max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000">
              MenuProfit يساعدك في حساب تكاليف الوجبات بدقة، تحسين قائمة الطعام، واختيار الأسعار المناسبة لزبائنك باستخدام أحدث تقنيات الذكاء الاصطناعي.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <button 
                onClick={onGetStarted}
                className="w-full sm:w-auto bg-blue-600 text-white px-12 py-6 rounded-2xl text-lg font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                ابدأ رحلتك مجاناً
                <ArrowRight size={20} className="rotate-180" />
              </button>
              <button className="w-full sm:w-auto bg-white border-2 border-slate-100 text-slate-800 px-12 py-6 rounded-2xl text-lg font-black hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-3">
                <Play size={20} fill="currentColor" />
                شاهد الفيديو
              </button>
            </div>
            
            {/* Trusted By */}
            <div className="mt-24 pt-10 border-t border-slate-50 w-full max-w-4xl opacity-60">
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-8">موثوق به من قبل أفضل المطاعم في بغداد وأربيل</p>
               <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale brightness-150 contrast-50">
                  <span className="text-2xl font-black tracking-tighter">RESTO.IQ</span>
                  <span className="text-2xl font-black tracking-tighter">BURGER.HOUSE</span>
                  <span className="text-2xl font-black tracking-tighter">BAGHDAD.GRIL</span>
                  <span className="text-2xl font-black tracking-tighter">ERBIL.SWEETS</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Step Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
             <h2 className="text-4xl font-black text-slate-800">3 خطوات بسيطة لزيادة أرباحك</h2>
             <p className="text-lg text-slate-500 font-bold">بساطة في الاستخدام، قوة في النتائج.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               // Added missing ShoppingCart icon usage
               { step: '01', title: 'أدخل المكونات', desc: 'قم بإضافة المواد الخام وأسعارها من الموردين (بالدينار أو الدولار).', icon: <ShoppingCart className="text-blue-600" size={32} /> },
               { step: '02', title: 'صمم الوصفة', desc: 'اربط المكونات بوجباتك، وسيقوم النظام بحساب التكلفة الحقيقية والفاقد.', icon: <Calculator className="text-indigo-600" size={32} /> },
               { step: '03', title: 'حسّن أرباحك', desc: 'دع الذكاء الاصطناعي يقترح الأسعار المثالية لزيادة هامش ربحك بنسبة تصل إلى 20%.', icon: <TrendingUp className="text-emerald-600" size={32} /> },
             ].map((item, i) => (
               <div key={i} className="relative group p-10 bg-white rounded-[3rem] shadow-sm border border-white hover:shadow-xl transition-all hover:-translate-y-2">
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-3xl font-black text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    {item.step}
                  </div>
                  <div className="mb-8 p-6 bg-slate-50 rounded-2xl w-fit group-hover:rotate-12 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4">{item.title}</h3>
                  <p className="text-slate-500 font-bold leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                 <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">صُمم خصيصاً ليناسب <br /> السوق العراقي</h2>
                    <p className="text-lg text-slate-500 font-bold leading-relaxed">تجاوزنا حدود البرامج التقليدية لنقدم لك حلاً يفهم لغة عملك، من تقلبات صرف العملة إلى تنوع الموردين.</p>
                 </div>

                 <div className="space-y-6">
                    {[
                      { t: 'دعم العملتين (IQD/USD)', c: 'إدخال الأسعار بالدولار وتحويلها تلقائياً حسب سعر السوق المحلي.' },
                      { t: 'مطابقة أنظمة الكاشير (POS)', c: 'ارفع تقارير مبيعاتك من أي نظام POS عراقي وحللها بضغطة زر.' },
                      { t: 'تتبع أسعار الموردين', c: 'اعرف متى يرتفع سعر اللحم أو الطحين وكيف يؤثر ذلك على ربح وجباتك.' },
                      { t: 'تقارير قانونية ومالية', c: 'استخرج تقارير PDF جاهزة للمحاسبين أو لمالكي المطعم.' },
                    ].map((feat, i) => (
                      <div key={i} className="flex gap-4 group">
                         <div className="mt-1">
                            <CheckCircle2 className="text-blue-600 group-hover:scale-110 transition-transform" size={24} />
                         </div>
                         <div>
                            <h4 className="font-black text-slate-800 text-lg">{feat.t}</h4>
                            <p className="text-sm text-slate-400 font-bold">{feat.c}</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 <button 
                  onClick={onGetStarted}
                  className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all flex items-center gap-3"
                 >
                    اكتشف كافة الميزات
                    <ArrowRight size={20} className="rotate-180" />
                 </button>
              </div>

              <div className="relative">
                 <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[3rem] blur-2xl opacity-10"></div>
                 <div className="relative glass-card border border-slate-200 rounded-[3rem] shadow-2xl overflow-hidden aspect-square flex items-center justify-center p-12">
                    <div className="text-center space-y-6">
                       <div className="w-24 h-24 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl animate-pulse mx-auto">
                          <Zap size={48} />
                       </div>
                       <h3 className="text-3xl font-black text-slate-800">تحليلات المنيو لحظة بلحظة</h3>
                       <p className="text-slate-400 font-bold">نظام ذكي يتنبأ بأرباحك الشهرية بدقة 99%</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
           <h2 className="text-4xl font-black mb-20">ماذا يقول عملاؤنا؟</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { name: 'علي جاسم', role: 'مالك مطعم برجر', text: 'MenuProfit غيّر طريقة تفكيري في الربح. اكتشفت أن وجبتي الأكثر مبيعاً كانت تخسرني مالاً بسبب هدر الصوصات!' },
                { name: 'سارة أربيل', role: 'مديرة مطبخ مركزي', text: 'تتبع أسعار الموردين والعملة في هذا البرنامج لا يقدر بثمن، خاصة مع تقلبات السوق العراقي الأخيرة.' },
                { name: 'محمد الفياض', role: 'شيف تنفيذي', text: 'بساطة إضافة الوصفات وحساب التكلفة الحقيقية جعلتني أركز أكثر على جودة الطعام بدلاً من الأرقام.' },
              ].map((test, i) => (
                <div key={i} className="p-10 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 text-right space-y-6">
                   <div className="flex gap-1 text-amber-400">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                   </div>
                   <p className="text-lg text-slate-300 font-bold italic leading-relaxed">"{test.text}"</p>
                   <div className="pt-6 border-t border-white/10">
                      <h5 className="font-black text-blue-400">{test.name}</h5>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{test.role}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-white">
         <div className="max-w-6xl mx-auto px-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/30">
               <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
               <div className="relative z-10 space-y-10">
                  <h2 className="text-4xl md:text-6xl font-black">هل أنت جاهز لتغيير <br /> مستقبل مطعمك؟</h2>
                  <p className="text-xl text-blue-100 font-bold max-w-2xl mx-auto">انضم إلى مئات المطاعم الناجحة وابدأ رحلة الربحية اليوم. لا تحتاج لبطاقة ائتمان للبدء.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button 
                      onClick={onGetStarted}
                      className="w-full sm:w-auto bg-white text-blue-600 px-12 py-6 rounded-2xl text-xl font-black hover:bg-blue-50 transition-all shadow-2xl active:scale-95"
                    >
                      ابدأ تجربتك المجانية الآن
                    </button>
                    <button className="text-white font-black hover:underline uppercase tracking-widest text-xs">تواصل مع المبيعات</button>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Landing;