
import React, { useState } from 'react';
import { 
  Database, 
  MapPin, 
  Scale, 
  ChefHat, 
  HelpCircle, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  Layers,
  Search,
  Globe,
  DollarSign
} from 'lucide-react';

const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cities' | 'units' | 'categories' | 'faq'>('cities');

  const contentLists = {
    cities: [
      { id: 1, name: 'بغداد', country: 'العراق', status: 'published' },
      { id: 2, name: 'أربيل', country: 'العراق', status: 'published' },
      { id: 3, name: 'البصرة', country: 'العراق', status: 'published' },
      { id: 4, name: 'الموصل', country: 'العراق', status: 'draft' },
    ],
    units: [
      { id: 1, name: 'كيلو غرام', code: 'kg', status: 'published' },
      { id: 2, name: 'لتر', code: 'L', status: 'published' },
      { id: 3, name: 'قطعة', code: 'pcs', status: 'published' },
    ],
    categories: [
      { id: 1, name: 'مقبلات', recipes: 12, status: 'published' },
      { id: 2, name: 'وجبات رئيسية', recipes: 45, status: 'published' },
      { id: 3, name: 'مشروبات', recipes: 8, status: 'published' },
    ],
    faq: [
      { id: 1, q: 'كيف أحسب التكلفة الحقيقية؟', a: 'من خلال ربط المكونات بالوصفة ودمج المصاريف...', status: 'published' },
    ]
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">إدارة المحتوى</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Reference Data & CMS Controls</p>
        </div>
        <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-3">
           <Plus size={20} /> إضافة عنصر جديد
        </button>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-slate-200/50 rounded-[1.5rem] w-fit">
        {[
          { id: 'cities', label: 'المدن', icon: <MapPin size={16} /> },
          { id: 'units', label: 'الوحدات', icon: <Scale size={16} /> },
          { id: 'categories', label: 'الأصناف', icon: <ChefHat size={16} /> },
          { id: 'faq', label: 'الأسئلة الشائعة', icon: <HelpCircle size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-2xl text-xs font-black transition-all
              ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}
            `}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
         <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest">{activeTab} List</h3>
            <div className="relative w-full md:w-64">
               <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
               <input type="text" placeholder="ابحث..." className="w-full pr-12 pl-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none" />
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-right">
               <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <tr>
                     <th className="px-8 py-6">الاسم / العنوان</th>
                     <th className="px-8 py-6 text-center">تفاصيل إضافية</th>
                     <th className="px-8 py-6 text-center">الحالة</th>
                     <th className="px-8 py-6">الإجراءات</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {contentLists[activeTab].map((item: any) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-8 py-6 font-black text-slate-800">{item.name || item.q}</td>
                       <td className="px-8 py-6 text-center text-xs font-bold text-slate-400">
                          {item.country || item.code || `${item.recipes} وصفة` || 'Content...'}
                       </td>
                       <td className="px-8 py-6 text-center">
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase border ${item.status === 'published' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                             {item.status}
                          </span>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-2 text-slate-300 hover:text-blue-500 transition-colors"><Edit2 size={16} /></button>
                             <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default AdminContent;
