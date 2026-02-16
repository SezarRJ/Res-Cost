
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, ADMIN_NAV_ITEMS } from '../constants';
import { Menu, X, LogOut, Bell, User, ChevronLeft, AlertCircle, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  userProfile: any;
}

const Layout: React.FC<LayoutProps> = ({ children, activePath, onNavigate, onLogout, userProfile }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isAdminView = activePath.startsWith('admin');
  const currentNav = isAdminView ? ADMIN_NAV_ITEMS : NAV_ITEMS;

  // Close mobile menu on navigate
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activePath]);

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden" dir="rtl">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile Drawer / Desktop Fixed */}
      <aside className={`
        fixed inset-y-0 right-0 z-[60] w-72 sidebar-gradient text-white transform transition-transform duration-500 ease-in-out shadow-2xl
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        md:relative md:translate-x-0 flex flex-col border-l border-slate-800
      `}>
        <div className="p-6 md:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${isAdminView ? 'bg-slate-700' : 'bg-blue-600'} rounded-xl flex items-center justify-center font-black text-xl shadow-lg shrink-0`}>M</div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-xl font-black tracking-tight leading-none truncate">MenuProfit</h1>
              <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest mt-1 opacity-70">
                {isAdminView ? 'Central Master Admin' : 'AI Costing Hub'}
              </span>
            </div>
          </div>
          <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)} aria-label="إغلاق القائمة">
            <X size={24} />
          </button>
        </div>

        {/* View Switcher for Admins */}
        {userProfile.role === UserRole.ADMIN && (
          <div className="px-6 pb-4">
             <button 
               onClick={() => onNavigate(isAdminView ? 'dashboard' : 'admin/dashboard')}
               className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
             >
                {isAdminView ? <LayoutDashboard size={14} /> : <ShieldCheck size={14} />}
                {isAdminView ? 'لوحة المستخدم' : 'لوحة الإدارة'}
             </button>
          </div>
        )}

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto no-scrollbar">
          {currentNav.map((item) => (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${activePath === item.path 
                  ? (isAdminView ? 'bg-slate-700' : 'bg-blue-600') + ' text-white shadow-xl shadow-black/20 translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white hover:translate-x-1'}
              `}
            >
              <span className={`transition-colors shrink-0 ${activePath === item.path ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`}>
                {item.icon}
              </span>
              <span className="font-bold text-sm truncate">{item.label}</span>
              {activePath === item.path && <ChevronLeft size={14} className="mr-auto opacity-50 shrink-0" />}
            </button>
          ))}
        </nav>

        <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 mb-3 overflow-hidden">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${isAdminView ? 'from-slate-500 to-slate-700' : 'from-blue-500 to-blue-700'} flex items-center justify-center text-white shadow-inner shrink-0`}>
              {isAdminView ? <ShieldCheck size={20} /> : <User size={20} strokeWidth={2.5} />}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold truncate text-slate-100">{userProfile.fullName}</span>
              <span className="text-[9px] text-blue-400 font-black uppercase truncate">{userProfile.role}</span>
            </div>
          </div>
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all font-bold text-xs"
          >
            <LogOut size={16} />
            <span>خروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        {/* Responsive Header */}
        <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 flex items-center justify-between z-40 sticky top-0 shrink-0">
          <div className="flex items-center gap-3 md:gap-6 min-w-0">
            <button 
              className="md:hidden p-2 text-slate-600 bg-slate-100 rounded-xl active:scale-90 transition-transform" 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="فتح القائمة"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5 truncate shrink-0">
                {isAdminView ? 'ADMIN PANEL' : 'صفحة المطعم'}
              </span>
              <h2 className="text-sm md:text-xl font-black text-slate-800 truncate">
                {currentNav.find(n => n.path === activePath)?.label || 'لوحة التحكم'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
             <div className="hidden lg:flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">
                  {isAdminView ? 'النظام' : 'المطعم النشط'}
                </span>
                <span className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <span className={`w-2 h-2 ${isAdminView ? 'bg-blue-600' : 'bg-emerald-500'} rounded-full animate-pulse`}></span>
                  {isAdminView ? 'إدارة الماستر' : userProfile.restaurantName}
                </span>
             </div>
             <div className="h-8 md:h-10 w-px bg-slate-200 hidden md:block"></div>
             <div className="flex items-center gap-2">
                <button className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative shadow-sm shrink-0">
                  <Bell size={18} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full group-hover:scale-110 transition-transform"></span>
                </button>
                <button 
                  onClick={() => onNavigate('account')}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center hover:bg-blue-50 transition-all shrink-0 active:scale-95"
                >
                   <User size={18} className="text-slate-400 hover:text-blue-600" />
                </button>
             </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-10 pb-24 custom-scrollbar bg-slate-50/50">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-10">
            {children}
          </div>
        </div>
      </main>

      {/* Logout Confirmation */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-white p-10 text-center space-y-8 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[2rem] flex items-center justify-center mx-auto">
                 <AlertCircle size={40} />
              </div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-black text-slate-800">تسجيل الخروج؟</h3>
                 <p className="text-sm text-slate-500 font-medium">هل أنت متأكد من رغبتك في الخروج؟</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setIsLogoutModalOpen(false)} className="py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">إلغاء</button>
                 <button onClick={() => { setIsLogoutModalOpen(false); onLogout(); }} className="py-4 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-600/20">خروج</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
