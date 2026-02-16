
import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowLeft, Loader2, CheckCircle2, AlertCircle, X, ShieldCheck, FileText, ScrollText } from 'lucide-react';

interface RegisterProps {
  onRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Legal Modals State
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreed) return;
    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة!');
      return;
    }
    
    setIsLoading(true);
    // Simulate API registration
    setTimeout(() => {
      onRegister();
    }, 2000);
  };

  const LegalModal = ({ title, icon, content, isOpen, onClose }: { title: string, icon: React.ReactNode, content: React.ReactNode, isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-[2.5rem] shadow-2xl border border-white flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4 text-blue-600">
              {icon}
              <h3 className="text-xl font-black text-slate-800">{title}</h3>
            </div>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors text-slate-400">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-10 space-y-6 text-right custom-scrollbar">
            {content}
          </div>
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              فهمت ذلك
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-2xl shadow-blue-600/30 mx-auto mb-6">M</div>
          <h1 className="text-3xl font-black text-slate-800">ابدأ رحلة الربحية</h1>
          <p className="text-slate-500 font-bold mt-2">انضم إلى مئات المطاعم الناجحة اليوم</p>
        </div>

        <div className="glass-card rounded-[2.5rem] border border-white p-10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">الاسم الكامل</label>
              <div className="relative">
                <User className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="أحمد محمد"
                  className="w-full pr-12 pl-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pr-12 pl-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">رقم الهاتف</label>
              <div className="relative">
                <Phone className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07XXXXXXXXX"
                  className="w-full pr-12 pl-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-12 pl-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-black uppercase tracking-widest mr-2">تأكيد كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-12 pl-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-3 animate-in shake duration-500">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="flex items-start gap-3 p-2">
              <input 
                type="checkbox" 
                id="terms" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
              />
              <label htmlFor="terms" className="text-xs text-slate-500 font-bold leading-relaxed">
                أوافق على <button onClick={() => setShowTerms(true)} type="button" className="text-blue-600 underline hover:text-blue-800 transition-colors">شروط الخدمة</button> و <button onClick={() => setShowPrivacy(true)} type="button" className="text-blue-600 underline hover:text-blue-800 transition-colors">سياسة الخصوصية</button>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !agreed}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl text-lg font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : 'إنشاء الحساب'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500 font-bold">
              لديك حساب بالفعل؟{' '}
              <button onClick={() => window.location.hash = 'login'} className="text-blue-600 font-black">تسجيل الدخول</button>
            </p>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <LegalModal 
        isOpen={showTerms} 
        onClose={() => setShowTerms(false)} 
        title="شروط الخدمة واستخدام المنصة"
        icon={<ScrollText size={24} />}
        content={
          <div className="space-y-6">
            <section>
              <h4 className="font-black text-slate-800 mb-2">1. القبول والاشتراك</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">باستخدامك لمنصة MenuProfit، فإنك توافق على الالتزام بكافة الشروط المذكورة هنا. المنصة مقدمة كخدمة سحابية (SaaS) للمطاعم في العراق والشرق الأوسط.</p>
            </section>
            <section>
              <h4 className="font-black text-slate-800 mb-2">2. مسؤولية الحساب</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">أنت مسؤول بالكامل عن الحفاظ على سرية معلومات حسابك وكلمة المرور، وعن كافة الأنشطة التي تتم من خلاله.</p>
            </section>
            <section>
              <h4 className="font-black text-slate-800 mb-2">3. الملكية الفكرية</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">تظل الوصفات، التكاليف، وبيانات المبيعات التي تدخلها ملكاً حصرياً لك. المنصة لا تمتلك أي حق في استخدام هذه البيانات خارج إطار تقديم الخدمة لك.</p>
            </section>
            <section>
              <h4 className="font-black text-slate-800 mb-2">4. الدفع والاشتراك</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">تتم معالجة الاشتراكات شهرياً. في حال تعثر الدفع، قد يتم تقييد الوصول إلى الميزات المتقدمة (مثل AI) حتى تسوية المستحقات.</p>
            </section>
          </div>
        }
      />

      {/* Privacy Policy Modal */}
      <LegalModal 
        isOpen={showPrivacy} 
        onClose={() => setShowPrivacy(false)} 
        title="سياسة الخصوصية وحماية البيانات"
        icon={<ShieldCheck size={24} />}
        content={
          <div className="space-y-6">
            <section>
              <h4 className="font-black text-slate-800 mb-2">1. جمع البيانات</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">نحن نجمع فقط البيانات الضرورية لتشغيل حسابك، مثل اسم المطعم، الموقع، المكونات، وأسعار الموردين لضمان دقة التحليلات.</p>
            </section>
            <section>
              <h4 className="font-black text-slate-800 mb-2">2. أمن المعلومات</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">نستخدم تشفيراً بمعيار 256-bit لحماية بياناتك. يتم تخزين البيانات في خوادم آمنة مع نسخ احتياطي دوري لضمان عدم ضياعها.</p>
            </section>
            <section>
              <h4 className="font-black text-slate-800 mb-2">3. سرية العمل</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">نحن نتعهد بعدم مشاركة "سر الصنعة" الخاص بك (الوصفات والتكاليف) مع أي طرف ثالث أو منافس تحت أي ظرف.</p>
            </section>
          </div>
        }
      />
    </div>
  );
};

export default Register;
