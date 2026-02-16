
import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password') {
        onLogin();
      } else {
        setError('خطأ في البريد الإلكتروني أو كلمة المرور. جرب demo@example.com / password');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-2xl shadow-blue-600/30 mx-auto mb-6">M</div>
          <h1 className="text-3xl font-black text-slate-800">مرحباً بك مجدداً</h1>
          <p className="text-slate-500 font-bold mt-2">قم بتسجيل الدخول لإدارة أرباح مطعمك</p>
        </div>

        <div className="glass-card rounded-[2.5rem] border border-white p-10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between items-center mr-2">
                <label className="text-xs text-slate-400 font-black uppercase tracking-widest">كلمة المرور</label>
                <button type="button" className="text-[10px] text-blue-600 font-black uppercase">نسيت كلمة المرور؟</button>
              </div>
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

            {error && (
              <div className="p-4 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100 animate-in fade-in zoom-in-95">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl text-lg font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500 font-bold">
              ليس لديك حساب؟{' '}
              <button onClick={() => window.location.hash = 'register'} className="text-blue-600 font-black">إنشاء حساب جديد</button>
            </p>
          </div>
        </div>

        <button 
          onClick={() => window.location.hash = 'landing'}
          className="mt-8 mx-auto flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-black text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
};

export default Login;
