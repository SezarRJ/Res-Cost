
import React, { useState } from 'react';
import { Zap, Sparkles, ChefHat, DollarSign, Activity, Eraser, Check, Loader2, ArrowRight } from 'lucide-react';

const AIHub: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    { 
      id: 'recipe', 
      title: 'مساعد الوصفات الذكي', 
      desc: 'اقترح مكونات وكميات لأطباق جديدة بناءً على نوع المطبخ.', 
      icon: <ChefHat size={32} />, 
      color: 'blue' 
    },
    { 
      id: 'pricing', 
      title: 'التسعير الاستراتيجي', 
      desc: 'تحليل تكاليف منيو كامل واقتراح تعديلات لتعظيم الربح.', 
      icon: <DollarSign size={32} />, 
      color: 'emerald' 
    },
    { 
      id: 'offers', 
      title: 'استراتيجية العروض', 
      desc: 'تحليل المبيعات الأسبوعية لاقتراح أفضل الخصومات الجذابة.', 
      icon: <Activity size={32} />, 
      color: 'amber' 
    },
    { 
      id: 'cleanup', 
      title: 'تنظيف البيانات', 
      desc: 'مطابقة تلقائية لأسماء الأطباق في تقارير POS مع وصفاتك.', 
      icon: <Eraser size={32} />, 
      color: 'indigo' 
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-4">
           <Zap className="text-blue-600" />
           مركز المساعد الذكي
        </h1>
        <p className="text-slate-400 font-bold uppercase text-xs">Premium AI-Powered Intelligence Tools for Restaurant Growth</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tools.map((tool) => (
          <div 
            key={tool.id} 
            onClick={() => setActiveTool(tool.id)}
            className="glass-card p-10 rounded-[3rem] border border-white hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group flex flex-col items-center text-center gap-6"
          >
             <div className={`w-20 h-20 bg-${tool.color}-50 text-${tool.color}-600 rounded-[2rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                {tool.icon}
             </div>
             <div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">{tool.title}</h3>
                <p className="text-sm text-slate-400 font-bold leading-relaxed px-6">{tool.desc}</p>
             </div>
             <div className="w-full mt-4 pt-8 border-t border-slate-100 flex items-center justify-between text-blue-600 font-black text-xs uppercase tracking-widest">
                <span>تشغيل الأداة الآن</span>
                <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
             </div>
          </div>
        ))}
      </div>

      {activeTool && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[3rem] shadow-2xl border border-white flex flex-col overflow-hidden relative">
              <div className="p-8 bg-slate-900 text-white flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <Sparkles className="text-amber-400" />
                    <h3 className="text-xl font-black">{tools.find(t => t.id === activeTool)?.title}</h3>
                 </div>
                 <button onClick={() => setActiveTool(null)} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                    <Check size={24} />
                 </button>
              </div>
              <div className="flex-1 p-12 flex flex-col items-center justify-center text-center gap-6">
                 <Loader2 size={48} className="animate-spin text-blue-600" />
                 <p className="text-slate-500 font-bold">هذه الأداة متوفرة في الإصدار الكامل. يتم الآن تحليل بيانات مطعمك...</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AIHub;
