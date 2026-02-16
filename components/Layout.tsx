
import React, { useState } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X, LogOut, Bell, User, ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activePath: string;
  onNavigate: (path: string) => void;
  userProfile: any;
}

const Layout: React.FC<LayoutProps> = ({ children, activePath, onNavigate, userProfile }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-transparent overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 right-0 z-[60] w-72 sidebar-gradient text-white transform transition-all duration-500 ease-in-out shadow-2xl
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        md:relative md:translate-x-0 flex flex-col border-l border-slate-800
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-600/30">M</div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tight leading-none">MenuProfit</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">AI Costing Hub</span>
            </div>
          </div>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${activePath === item.path 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40 translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white hover:translate-x-1'}
              `}
            >
              <span className={`transition-colors ${activePath === item.path ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`}>
                {item.icon}
              </span>
              <span className="font-bold text-sm">{item.label}</span>
              {item.plan === 'PRO' && userProfile.plan === 'FREE' && (
                <span className="mr-auto text-[9px] bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/30 font-black">PRO</span>
              )}
              {activePath === item.path && <ChevronLeft size={14} className="mr-auto opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-inner">
              <User size={20} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold truncate text-slate-100">{userProfile.fullName}</span>
              <span className="text-[10px] text-blue-400 font-black uppercase">{userProfile.plan} PLAN</span>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all font-bold text-sm">
            <LogOut size={18} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between z-40 sticky top-0">
          <div className="flex items-center gap-6">
            <button className="md:hidden p-2 text-slate-600 bg-slate-100 rounded-xl" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">الصفحة الحالية</span>
              <h2 className="text-xl font-black text-slate-800">
                {NAV_ITEMS.find(n => n.path === activePath)?.label || 'الرئيسية'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden lg:flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">المطعم النشط</span>
                <span className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  برجر هاوس - أربيل
                </span>
             </div>
             <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
             <div className="flex items-center gap-3">
                <button className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative group">
                  <Bell size={20} />
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full group-hover:scale-110 transition-transform"></span>
                </button>
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center">
                   <User size={20} className="text-slate-400" />
                </div>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 pb-20 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;