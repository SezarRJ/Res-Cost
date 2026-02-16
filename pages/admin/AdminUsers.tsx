
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Edit, 
  Shield, 
  Trash2, 
  X, 
  UserMinus, 
  UserCheck, 
  Eye, 
  Download, 
  Lock,
  ChevronLeft,
  Clock,
  Zap,
  CreditCard,
  ChefHat,
  Key,
  ShieldAlert,
  ShoppingCart,
  History,
  UploadCloud,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, UserRole, SubscriptionPlan } from '../../types';

const AdminUsers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const [users, setUsers] = useState<UserProfile[]>([
    { id: 'usr-001', fullName: 'أحمد العراقي', email: 'ahmed@burger.iq', phone: '07800000000', restaurantName: 'برجر هاوس', restaurantId: 'r1', plan: SubscriptionPlan.ELITE, status: 'active', role: UserRole.OWNER, address: 'بغداد، المنصور', locationLink: '', baselineMonthlyPlates: 1200, targetMarginPercent: 65, createdAt: '2024-02-12', lastLogin: 'منذ 5 د' },
    { id: 'usr-002', fullName: 'زياد محمد', email: 'ziad@fastfood.iq', phone: '07700000000', restaurantName: 'بيتزا كينج', restaurantId: 'r2', plan: SubscriptionPlan.PRO, status: 'active', role: UserRole.OWNER, address: 'أربيل، عنكاوا', locationLink: '', baselineMonthlyPlates: 800, targetMarginPercent: 60, createdAt: '2024-03-01', lastLogin: 'منذ ساعة' },
    { id: 'usr-003', fullName: 'مصطفى كامل', email: 'mustafa@admin.iq', phone: '07900000000', restaurantName: 'MenuProfit HQ', restaurantId: 'r3', plan: SubscriptionPlan.ELITE, status: 'active', role: UserRole.ADMIN, address: '', locationLink: '', baselineMonthlyPlates: 0, targetMarginPercent: 0, createdAt: '2024-01-01', lastLogin: 'الآن' },
    { id: 'usr-004', fullName: 'رامي سعيد', email: 'rami@cafe.iq', phone: '07500000000', restaurantName: 'ريلاكس كافيه', restaurantId: 'r4', plan: SubscriptionPlan.FREE, status: 'disabled', role: UserRole.OWNER, address: 'البصرة، العشار', locationLink: '', baselineMonthlyPlates: 400, targetMarginPercent: 70, createdAt: '2024-04-15', lastLogin: 'منذ يومين' },
  ]);

  const handleImpersonate = (userId: string) => {
    setIsProcessing(`impersonate-${userId}`);
    setTimeout(() => {
      setIsProcessing(null);
      alert(`تم الدخول بنجاح كـ مستخدم. يتم الآن إعادة توجيهك للوحة تحكم المطعم في وضع المحاكاة.`);
    }, 1500);
  };

  const handleResetPassword = (userId: string) => {
    setIsProcessing(`password-${userId}`);
    setTimeout(() => {
      setIsProcessing(null);
      alert(`تم إرسال رابط إعادة تعيين كلمة المرور إلى البريد الإلكتروني للمستخدم بنجاح.`);
    }, 1500);
  };

  const handleDelete = (userId: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم نهائياً؟ لا يمكن التراجع عن هذا الإجراء.')) return;
    setIsProcessing(`delete-${userId}`);
    setTimeout(() => {
      setUsers(prev => prev.filter(u => u.id !== userId));
      setIsProcessing(null);
      setSelectedUser(null);
    }, 1500);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('تم تجهيز ملف المستخدمين (CSV). جاري التحميل...');
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">إدارة المستخدمين</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Platform Identity & Access Control</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-black text-sm shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
           {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
           تصدير CSV
        </button>
      </div>

      <div className="glass-card rounded-[2.5rem] shadow-sm border border-white overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center gap-6">
           <div className="relative flex-1 group">
             <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
             <input
               type="text"
               placeholder="ابحث عن مستخدم بالاسم أو البريد..."
               className="w-full pr-14 pl-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-bold shadow-inner focus:ring-4 focus:ring-blue-100 transition-all"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-black text-slate-500 uppercase tracking-widest active:scale-95">
             <Filter size={18} /> تصفية النتائج
           </button>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-right">
              <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                 <tr>
                    <th className="px-8 py-6">User ID / الاسم</th>
                    <th className="px-8 py-6 text-center">المطعم / الخطة</th>
                    <th className="px-8 py-6 text-center">الرتبة</th>
                    <th className="px-8 py-6 text-center">الحالة</th>
                    <th className="px-8 py-6 text-center text-left">الإجراءات</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {users.map(u => (
                   <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedUser(u)}>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                               {u.fullName.charAt(0)}
                            </div>
                            <div>
                               <h5 className="text-sm font-black text-slate-800">{u.fullName}</h5>
                               <p className="text-[9px] text-slate-400 font-bold">{u.id} • {u.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <p className="text-xs font-black text-slate-700">{u.restaurantName}</p>
                         <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${u.plan === SubscriptionPlan.ELITE ? 'bg-amber-100 text-amber-600' : u.plan === SubscriptionPlan.PRO ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                            {u.plan}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase border ${u.role === UserRole.ADMIN ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}>
                            {u.role}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                         <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${u.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {u.status === 'active' ? 'نشط' : 'معطل'}
                         </span>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                            <button 
                              onClick={() => handleImpersonate(u.id)} 
                              title="انتحال الشخصية" 
                              className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
                            >
                               {isProcessing === `impersonate-${u.id}` ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
                            </button>
                            <button 
                              onClick={() => handleResetPassword(u.id)}
                              title="تصفير الرمز" 
                              className="p-2 text-slate-400 hover:text-amber-600 transition-colors"
                            >
                               {isProcessing === `password-${u.id}` ? <Loader2 size={16} className="animate-spin" /> : <Key size={16} />}
                            </button>
                            <button 
                              onClick={() => handleDelete(u.id)}
                              title="حذف نهائي" 
                              className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                            >
                               {isProcessing === `delete-${u.id}` ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                            </button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* User Detail Drawer */}
      {selectedUser && (
        <div className="fixed inset-0 z-[150] flex justify-end">
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)}></div>
           <div className="w-full max-w-lg bg-white h-full shadow-2xl relative flex flex-col animate-in slide-in-from-left duration-500">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-600/20">
                       {selectedUser.fullName.charAt(0)}
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-800">{selectedUser.fullName}</h3>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">User ID: {selectedUser.id}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedUser(null)} className="w-10 h-10 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                    <X size={24} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                 {/* Quick Metrics */}
                 <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl text-center space-y-1">
                       <span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter">الاشتراك</span>
                       <p className="text-xs font-black text-blue-600">{selectedUser.plan}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl text-center space-y-1">
                       <span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter">الدور</span>
                       <p className="text-xs font-black text-slate-800">{selectedUser.role}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl text-center space-y-1">
                       <span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter">الحالة</span>
                       <p className="text-xs font-black text-emerald-600">{selectedUser.status}</p>
                    </div>
                 </div>

                 {/* Usage Metrics */}
                 <section className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-2">تفاصيل الاستخدام</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                          { l: 'المواد الخام', v: '124', i: <ShoppingCart size={14} />, c: 'blue' },
                          { l: 'الوصفات', v: '32', i: <ChefHat size={14} />, c: 'emerald' },
                          { l: 'طلبات الـ AI', v: '85', i: <Zap size={14} />, c: 'amber' },
                          { l: 'صفوف الاستيراد', v: '4.2k', i: <UploadCloud size={14} />, c: 'indigo' },
                       ].map((item, i) => (
                          <div key={i} className={`p-4 bg-${item.c}-50/50 rounded-2xl border border-${item.c}-100 flex flex-col gap-2`}>
                             <div className={`text-${item.c}-600`}>{item.i}</div>
                             <div>
                                <span className="text-[8px] text-slate-400 font-black uppercase">{item.l}</span>
                                <p className="text-lg font-black text-slate-800">{item.v}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </section>

                 <section className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-2">سجل التدقيق الأخير</h4>
                    <div className="space-y-4">
                       {[
                          { a: 'تغيير رتبة الموظف "زيد"', d: 'منذ ساعتين', i: <Shield size={14} /> },
                          { a: 'رفع ملف مبيعات "May_POS.csv"', d: 'منذ يوم', i: <UploadCloud size={14} /> },
                       ].map((log, i) => (
                          <div key={i} className="flex gap-4 group">
                             <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                {log.i}
                             </div>
                             <div>
                                <p className="text-xs font-black text-slate-700 leading-tight">{log.a}</p>
                                <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{log.d}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </section>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50 grid grid-cols-2 gap-4">
                 <button 
                   onClick={() => handleImpersonate(selectedUser.id)}
                   disabled={isProcessing === `impersonate-${selectedUser.id}`}
                   className="py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 disabled:opacity-50"
                 >
                    {isProcessing === `impersonate-${selectedUser.id}` ? <Loader2 size={14} className="animate-spin" /> : <Eye size={14} />}
                    انتحال الهوية
                 </button>
                 <button 
                   onClick={() => handleResetPassword(selectedUser.id)}
                   disabled={isProcessing === `password-${selectedUser.id}`}
                   className="py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                 >
                    {isProcessing === `password-${selectedUser.id}` ? <Loader2 size={14} className="animate-spin" /> : <Key size={14} />}
                    تصفير الرمز
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
