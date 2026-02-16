
import React, { useState } from 'react';
import { Store, MapPin, DollarSign, Percent, ArrowLeft, Loader2, Sparkles, Target, BarChart3, ChevronLeft, Building2 } from 'lucide-react';
import { Currency } from '../types';

interface SetupProps {
  onComplete: () => void;
}

const Setup: React.FC<SetupProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: 'بغداد',
    currency: Currency.IQD,
    targetMargin: 60,
    baseline: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    setIsLoading(true);
    // Simulate setup processing
    setTimeout(() => {
      // Logic for saving configuration to localStorage/session
      localStorage.setItem('mp_session', 'active');
      localStorage.setItem('mp_setup_complete', 'true');
      
      onComplete(); // Triggers the state change in App.tsx
      
      // Force redirect to prevent loop
      window.location.hash = 'dashboard';
    }, 1500);
  };

  const cities = ['بغداد', 'أربيل', 'البصرة', 'الموصل', 'السليمانية', 'دهوك', 'كركوك', 'النجف', 'كربلاء'];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50" dir="rtl">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 animate-bounce">
            <Sparkles size={14} />
            إعداد منشأتك الجديدة
          </div>
          <h1 className="text-4xl font-black text-slate-800">أهلاً بك في MenuProfit</h1>
          <p className="text-slate-500 font-bold mt-2 leading-relaxed max-w-md mx-auto">لنقم بإعداد القواعد الأساسية لمطعمك لتبدأ في حساب أرباحك بدقة.</p>
        </div>

        <div className="glass-card rounded-[3rem] border border-white p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Restaurant Name */}
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">اسم المطعم</label>
                <div className="relative">
                  <Building2 className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="مثلاً: مطعم بيت العرب"
                    className="w-full pr-12 pl-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                    required
                  />
                </div>
              </div>

              {/* City Dropdown */}
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">المدينة</label>
                <div className="relative">
                  <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <select 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full pr-12 pl-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none" 
                    required
                  >
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Default Currency */}
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">العملة الافتراضية</label>
                <div className="grid grid-cols-2 gap-4">
                  {[Currency.IQD, Currency.USD].map(curr => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setFormData({...formData, currency: curr})}
                      className={`py-4 rounded-2xl font-black text-sm border-2 transition-all ${formData.currency === curr ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-100 border-transparent text-slate-400 hover:border-slate-100'}`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Baseline Monthly Plates */}
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">عدد الوجبات المتوقع شهرياً</label>
                <div className="relative">
                  <BarChart3 className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="number" 
                    value={formData.baseline}
                    onChange={(e) => setFormData({...formData, baseline: e.target.value})}
                    placeholder="مثلاً: 1200"
                    className="w-full pr-12 pl-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold mr-2">يساعد في حساب حصة الطبق من المصاريف الثابتة.</p>
              </div>
            </div>

            {/* Target Margin Slider */}
            <div className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 space-y-6">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-3">
                   <Target className="text-blue-600" size={24} />
                   <div>
                      <h4 className="text-sm font-black text-slate-800">هامش الربح المستهدف</h4>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Target Gross Margin %</p>
                   </div>
                </div>
                <div className="text-3xl font-black text-blue-600 flex items-baseline gap-1">
                  {formData.targetMargin}
                  <span className="text-sm">%</span>
                </div>
              </div>
              <input 
                type="range" 
                min="10" 
                max="90" 
                step="5"
                value={formData.targetMargin}
                onChange={(e) => setFormData({...formData, targetMargin: Number(e.target.value)})}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600 shadow-inner"
              />
              <div className="flex justify-between text-[10px] font-black text-slate-400 px-2">
                <span>10%</span>
                <span>50%</span>
                <span>90%</span>
              </div>
              <p className="text-[11px] text-blue-600/70 font-bold leading-relaxed bg-white/50 p-4 rounded-xl border border-blue-100/50">
                <Sparkles size={12} className="inline mr-1 mb-1" />
                نوصي بهامش ربح يتراوح بين 60-70% لتغطية تكاليف التشغيل وتحقيق صافي ربح مستدام في السوق العراقي.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !formData.name}
              className="w-full py-6 bg-slate-900 text-white rounded-2xl text-lg font-black shadow-2xl shadow-slate-900/30 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  حفظ وبدء الاستخدام
                  <ChevronLeft size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setup;
