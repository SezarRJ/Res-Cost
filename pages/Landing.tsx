
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
  ShoppingCart,
  Layers,
  Cpu,
  ChefHat,
  // Fix: Added missing icon imports
  DollarSign,
  Target,
  User
} from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 lg:pt-56 lg:pb-72 overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[160px] animate-pulse duration-[10s]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[160px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-3 bg-blue-50/80 backdrop-blur-sm text-blue-600 px-8 py-3 rounded-full text-sm font-black uppercase tracking-[0.2em] mb-12 border border-blue-100 shadow-sm animate-in fade-in slide-in-from-top-6 duration-1000">
              <Sparkles size={18} className="animate-spin-slow" />
              الذكاء الاصطناعي وصل إلى مطبخك العراقي
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-slate-900 leading-[0.9] mb-10 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
              حوّل مطعمك إلى <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">منظومة ربح ذكية</span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-500 font-medium max-w-5xl mx-auto mb-16 leading-[1.6] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              MenuProfit يساعدك في حساب تكاليف الوجبات بدقة، تحسين قائمة الطعام، واختيار الأسعار المناسبة لزبائنك باستخدام أحدث تقنيات الذكاء الاصطناعي.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <button 
                onClick={onGetStarted}
                className="w-full sm:w-auto bg-blue-600 text-white px-16 py-8 rounded-[2rem] text-xl lg:text-2xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-2 hover:shadow-blue-600/50 transition-all duration-500 flex items-center justify-center gap-4 active:scale-95 group"
              >
                ابدأ رحلتك مجاناً
                <ArrowRight size={28} className="rotate-180 group-hover:-translate-x-2 transition-transform duration-500" />
              </button>
              <button className="w-full sm:w-auto bg-white border-[3px] border-slate-100 text-slate-800 px-16 py-8 rounded-[2rem] text-xl lg:text-2xl font-black hover:bg-slate-50 hover:border-slate-200 transition-all duration-500 flex items-center justify-center gap-4 group">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={20} fill="currentColor" className="mr-1" />
                </div>
                شاهد الفيديو
              </button>
            </div>
            
            {/* Trusted By - Enhanced */}
            <div className="mt-32 pt-16 border-t border-slate-100 w-full max-w-6xl opacity-70">
               <p className="text-xs text-slate-400 font-black uppercase tracking-[0.4em] mb-12">موثوق به من قبل أفضل المطاعم في بغداد وأربيل</p>
               <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 grayscale opacity-40 hover:opacity-100 transition-opacity duration-700">
                  <span className="text-3xl font-black tracking-tighter">RESTO.IQ</span>
                  <span className="text-3xl font-black tracking-tighter">BURGER.HOUSE</span>
                  <span className="text-3xl font-black tracking-tighter">BAGHDAD.GRIL</span>
                  <span className="text-3xl font-black tracking-tighter">ERBIL.SWEETS</span>
                  <span className="text-3xl font-black tracking-tighter">MOSUL.DINE</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Breakdown Section */}
      <section className="py-24 bg-blue-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'زيادة في الأرباح', val: '+25%' },
            { label: 'توفير في الهدر', val: '15%' },
            { label: 'مطعم نشط', val: '500+' },
            { label: 'دقة الحسابات', val: '100%' },
          ].map((s, i) => (
            <div key={i} className="space-y-2">
              <p className="text-5xl md:text-6xl font-black tracking-tighter">{s.val}</p>
              <p className="text-sm font-black uppercase tracking-widest text-blue-200">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Step Section */}
      <section className="py-40 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-28 space-y-6">
             <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight">3 خطوات بسيطة لزيادة أرباحك</h2>
             <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto">صممنا العملية لتكون بديهية جداً، بحيث لا تحتاج لأي خبرة محاسبية.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
             {[
               { step: '01', title: 'أدخل المكونات', desc: 'قم بإضافة المواد الخام وأسعارها من الموردين (بالدينار أو الدولار) مع ميزة تحديث الأسعار اللحظية.', icon: <ShoppingCart className="text-blue-600" size={48} />, bg: 'bg-blue-50' },
               { step: '02', title: 'صمم الوصفة', desc: 'اربط المكونات بوجباتك، وسيقوم النظام بحساب التكلفة الحقيقية والفاقد وحصة المصاريف التشغيلية.', icon: <Calculator className="text-indigo-600" size={48} />, bg: 'bg-indigo-50' },
               { step: '03', title: 'حسّن أرباحك', desc: 'دع الذكاء الاصطناعي يحلل المنيو ويقترح الأسعار المثالية لزيادة هامش ربحك بنسبة تصل إلى 20%.', icon: <TrendingUp className="text-emerald-600" size={48} />, bg: 'bg-emerald-50' },
             ].map((item, i) => (
               <div key={i} className="relative group p-14 bg-white rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-white hover:shadow-blue-600/10 transition-all duration-700 hover:-translate-y-4">
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center text-4xl font-black group-hover:bg-blue-600 group-hover:rotate-12 transition-all duration-700 shadow-xl">
                    {item.step}
                  </div>
                  <div className={`mb-10 p-8 ${item.bg} rounded-[2.5rem] w-fit group-hover:scale-110 transition-transform duration-700 shadow-inner`}>
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-6">{item.title}</h3>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Features Showcase - Premium Grid */}
      <section className="py-48 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div className="space-y-16">
                 <div className="space-y-6">
                    <h2 className="text-5xl md:text-[5.5rem] font-black text-slate-900 leading-[0.95] tracking-tight">صُمم خصيصاً ليناسب <br /> السوق العراقي</h2>
                    <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">تجاوزنا حدود البرامج التقليدية لنقدم لك حلاً يفهم لغة عملك، من تقلبات صرف العملة إلى تنوع الموردين.</p>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    {[
                      { t: 'دعم العملتين (IQD/USD)', c: 'إدخال الأسعار بالدولار وتحويلها تلقائياً حسب سعر السوق المحلي.', icon: <DollarSign size={24} /> },
                      { t: 'مطابقة أنظمة POS', c: 'ارفع تقارير مبيعاتك من أي نظام POS عراقي وحللها بضغطة زر.', icon: <Cpu size={24} /> },
                      { t: 'تتبع أسعار الموردين', c: 'اعرف متى يرتفع سعر اللحم أو الطحين وكيف يؤثر ذلك على ربحك.', icon: <TrendingUp size={24} /> },
                      { t: 'تقارير احترافية PDF', c: 'استخرج تقارير جاهزة للمحاسبين أو لمالكي المطعم بلمسة واحدة.', icon: <BarChart3 size={24} /> },
                    ].map((feat, i) => (
                      <div key={i} className="flex flex-col gap-5 group">
                         <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100">
                            {feat.icon}
                         </div>
                         <div>
                            <h4 className="font-black text-slate-900 text-xl mb-2">{feat.t}</h4>
                            <p className="text-base text-slate-400 font-medium leading-relaxed">{feat.c}</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 <button 
                  onClick={onGetStarted}
                  className="inline-flex bg-slate-900 text-white px-14 py-7 rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:bg-blue-600 transition-all duration-500 items-center gap-4 group"
                 >
                    اكتشف كافة الميزات
                    <ArrowRight size={24} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
                 </button>
              </div>

              <div className="relative">
                 {/* Visual Interface Preview Placeholder */}
                 <div className="absolute -inset-10 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent rounded-full blur-[100px] animate-pulse"></div>
                 <div className="relative bg-slate-900 rounded-[4rem] p-12 lg:p-20 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent)]"></div>
                    <div className="relative space-y-12">
                       <div className="flex justify-between items-start">
                          <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)]">
                             <Zap size={40} />
                          </div>
                          <div className="flex gap-2">
                             <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                             <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                             <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          </div>
                       </div>
                       <div className="space-y-6">
                          <div className="h-6 w-3/4 bg-white/10 rounded-full"></div>
                          <div className="h-6 w-1/2 bg-white/5 rounded-full"></div>
                          <div className="h-40 w-full bg-white/[0.03] border border-white/5 rounded-[2rem] flex items-center justify-center">
                             <TrendingUp size={48} className="text-blue-500 opacity-50" />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                             <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Profit Margin</p>
                             <p className="text-3xl font-black text-emerald-400">72.4%</p>
                          </div>
                          <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                             <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Food Cost</p>
                             <p className="text-3xl font-black text-blue-400">2,450</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* AI Assistant Specific Section */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
           <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[180px]"></div>
           <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="bg-white/5 backdrop-blur-3xl rounded-[5rem] p-16 md:p-32 border border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                 <div className="inline-flex items-center gap-2 text-amber-400 bg-amber-400/10 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] border border-amber-400/20">
                    <Sparkles size={16} />
                    The Future of Kitchens
                 </div>
                 <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">مساعد الشيف <br /> الذكي متاح الآن</h2>
                 <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed">
                    وداعاً للتخمين. دع الذكاء الاصطناعي يراجع وصفاتك، يقترح بدائل للمكونات، ويحدد نقاط الضعف في هوامش ربحك قبل أن تخسر أي دينار.
                 </p>
                 <div className="flex flex-wrap gap-8 pt-6">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400">
                          <ChefHat size={32} />
                       </div>
                       <span className="font-black text-lg text-white">تحسين الوصفات</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400">
                          <Target size={32} />
                       </div>
                       <span className="font-black text-lg text-white">استهداف الأرباح</span>
                    </div>
                 </div>
              </div>
              <div className="relative flex justify-center">
                 <div className="w-full max-w-md aspect-square bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] flex flex-col items-center justify-center p-12 text-center gap-8 shadow-[0_0_100px_rgba(37,99,235,0.3)] animate-float">
                    <Sparkles size={100} className="text-white animate-pulse" />
                    <div className="space-y-2">
                       <p className="text-3xl font-black text-white">تحليل المنيو نشط</p>
                       <p className="text-blue-100 font-medium">جاري فحص تكاليف 24 طبق...</p>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                       <div className="h-full bg-white w-2/3 animate-progress"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Testimonials - Enhanced Hierarchy */}
      <section className="py-48 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-32 tracking-tight">ماذا يقول عملاؤنا؟</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { name: 'علي جاسم', role: 'مالك مطعم برجر', text: 'MenuProfit غيّر طريقة تفكيري في الربح. اكتشفت أن وجبتي الأكثر مبيعاً كانت تخسرني مالاً بسبب هدر الصوصات الخفي!' },
                { name: 'سارة أربيل', role: 'مديرة مطبخ مركزي', text: 'تتبع أسعار الموردين والعملة في هذا البرنامج لا يقدر بثمن، خاصة مع تقلبات السوق العراقي الأخيرة.' },
                { name: 'محمد الفياض', role: 'شيف تنفيذي', text: 'بساطة إضافة الوصفات وحساب التكلفة الحقيقية جعلتني أركز أكثر على جودة الطعام بدلاً من الأرقام المعقدة.' },
              ].map((test, i) => (
                <div key={i} className="p-12 bg-slate-50/50 rounded-[4rem] border border-slate-100 text-right space-y-8 hover:bg-white hover:shadow-2xl transition-all duration-700 group">
                   <div className="flex gap-1 text-amber-400 group-hover:scale-110 transition-transform duration-500">
                      {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
                   </div>
                   <p className="text-xl lg:text-2xl text-slate-600 font-medium italic leading-relaxed">"{test.text}"</p>
                   <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <h5 className="font-black text-slate-900 text-lg">{test.name}</h5>
                        <span className="text-[10px] text-blue-600 font-black uppercase tracking-[0.3em]">{test.role}</span>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-200 shadow-inner">
                        <User size={24} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section - Massive Design */}
      <section className="py-40 bg-white px-6">
         <div className="max-w-[1440px] mx-auto">
            <div className="bg-slate-900 rounded-[5rem] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.4)]">
               <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/2"></div>
               <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[180px] translate-y-1/2 -translate-x-1/2"></div>
               
               <div className="relative z-10 space-y-16">
                  <h2 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight">هل أنت جاهز لتغيير <br /> مستقبل مطعمك؟</h2>
                  <p className="text-xl md:text-3xl text-blue-100 font-medium max-w-4xl mx-auto leading-relaxed">انضم إلى مئات المطاعم الناجحة وابدأ رحلة الربحية اليوم. لا تحتاج لبطاقة ائتمان للبدء في النسخة المجانية.</p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                    <button 
                      onClick={onGetStarted}
                      className="w-full sm:w-auto bg-blue-600 text-white px-20 py-10 rounded-[3rem] text-2xl font-black hover:bg-blue-500 hover:-translate-y-3 transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] active:scale-95"
                    >
                      ابدأ تجربتك المجانية الآن
                    </button>
                    <button className="text-slate-400 font-black hover:text-white transition-colors uppercase tracking-[0.4em] text-sm">تواصل مع المبيعات</button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final Mini Footer */}
      <section className="py-20 bg-slate-900 border-t border-white/5 text-center">
         <p className="text-slate-500 text-xs font-black uppercase tracking-[0.5em]">MenuProfit Infrastructure • Serving Iraq & MENA</p>
      </section>
    </div>
  );
};

export default Landing;
