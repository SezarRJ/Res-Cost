
import React from 'react';
import { Menu, X } from 'lucide-react';

interface PublicNavProps {
  activePath: string;
  onNavigate: (path: string) => void;
}

const PublicNav: React.FC<PublicNavProps> = ({ activePath, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { label: 'الرئيسية', path: 'landing' },
    { label: 'الميزات', path: 'features' },
    { label: 'التسعير', path: 'pricing' },
    { label: 'تواصل معنا', path: 'contact' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-600/30">M</div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">MenuProfit</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => onNavigate(link.path)}
              className={`text-sm font-black transition-colors ${activePath === link.path ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="text-sm font-black text-slate-600 px-6 py-2.5 rounded-xl hover:bg-slate-100 transition-all"
          >
            تسجيل الدخول
          </button>
          <button 
            onClick={() => onNavigate('dashboard')}
            className="bg-blue-600 text-white px-8 py-2.5 rounded-xl text-sm font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all"
          >
            ابدأ مجاناً
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-6 flex flex-col gap-6 animate-in slide-in-from-top-4">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                onNavigate(link.path);
                setIsOpen(false);
              }}
              className={`text-lg font-black text-right ${activePath === link.path ? 'text-blue-600' : 'text-slate-500'}`}
            >
              {link.label}
            </button>
          ))}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
             <button onClick={() => onNavigate('dashboard')} className="py-3 bg-slate-100 rounded-xl font-black text-slate-600">دخول</button>
             <button onClick={() => onNavigate('dashboard')} className="py-3 bg-blue-600 rounded-xl font-black text-white">ابدأ الآن</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNav;
