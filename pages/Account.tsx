
import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Trash2, 
  LogOut, 
  Phone, 
  Mail, 
  Save, 
  AlertCircle, 
  CreditCard, 
  ChevronLeft, 
  Sparkles, 
  Store, 
  MapPin, 
  Edit, 
  X, 
  Lock, 
  Eye, 
  EyeOff,
  Navigation
} from 'lucide-react';
import { UserProfile } from '../types';

interface AccountProps {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

const Account: React.FC<AccountProps> = ({ user, setUser, onNavigate, onLogout }) => {
  // State for Edit Modes
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingRestaurant, setIsEditingRestaurant] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Form States
  const [personalForm, setPersonalForm] = useState({ fullName: user.fullName });
  const [restaurantForm, setRestaurantForm] = useState({ 
    restaurantName: user.restaurantName, 
    address: user.address,
    locationLink: user.locationLink 
  });
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const handleSavePersonal = () => {
    setUser({ ...user, ...personalForm });
    setIsEditingPersonal(false);
    alert('تم تحديث البيانات الشخصية بنجاح!');
  };

  const handleSaveRestaurant = () => {
    setUser({ ...user, ...restaurantForm });
    setIsEditingRestaurant(false);
    alert('تم تحديث بيانات المطعم بنجاح!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      alert('كلمة المرور الجديدة غير متطابقة!');
      return;
    }
    alert('تم تغيير كلمة المرور بنجاح!');
    setIsPasswordModalOpen(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handleDelete = () => {
    if (deleteConfirm === 'حذف') {
      alert('سيتم حذف الحساب نهائياً وإعادة توجيهك...');
      onLogout();
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-800">إعدادات الحساب والمنشأة</h1>
        <p className="text-slate-400 font-bold uppercase text-xs">Manage your profile, restaurant identity, and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Personal Info */}
          <div className="glass-card rounded-[2.5rem] border border-white p-10 space-y-8 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-blue-600">
                <User size={24} />
                <h3 className="text-xl font-black">البيانات الشخصية</h3>
              </div>
              {!isEditingPersonal ? (
                <button 
                  onClick={() => setIsEditingPersonal(true)}
                  className="flex items-center gap-2 text-xs font-black text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
                >
                  <Edit size={16} /> تعديل
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditingPersonal(false)} className="px-4 py-2 text-xs font-black text-slate-400">إلغاء</button>
                  <button onClick={handleSavePersonal} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-600/20">حفظ</button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">الاسم الكامل</label>
                <input 
                  type="text" 
                  value={personalForm.fullName}
                  onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                  disabled={!isEditingPersonal}
                  className={`w-full px-6 py-4 rounded-2xl font-bold transition-all outline-none ${isEditingPersonal ? 'bg-slate-50 border border-blue-100 focus:ring-4 focus:ring-blue-100' : 'bg-slate-100/50 border border-transparent cursor-not-allowed'}`} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  value="ahmed@example.iq" 
                  disabled 
                  className="w-full px-6 py-4 bg-slate-100/50 border border-transparent rounded-2xl font-bold text-slate-400 cursor-not-allowed" 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Restaurant Identity */}
          <div className="glass-card rounded-[2.5rem] border border-white p-10 space-y-8 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-emerald-600">
                <Store size={24} />
                <h3 className="text-xl font-black text-slate-800">هوية المطعم</h3>
              </div>
              {!isEditingRestaurant ? (
                <button 
                  onClick={() => setIsEditingRestaurant(true)}
                  className="flex items-center gap-2 text-xs font-black text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all"
                >
                  <Edit size={16} /> تعديل
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditingRestaurant(false)} className="px-4 py-2 text-xs font-black text-slate-400">إلغاء</button>
                  <button onClick={handleSaveRestaurant} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20">حفظ البيانات</button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">اسم المنشأة / المطعم</label>
                <input 
                  type="text" 
                  value={restaurantForm.restaurantName}
                  onChange={(e) => setRestaurantForm({ ...restaurantForm, restaurantName: e.target.value })}
                  disabled={!isEditingRestaurant}
                  className={`w-full px-6 py-4 rounded-2xl font-bold transition-all outline-none ${isEditingRestaurant ? 'bg-slate-50 border border-emerald-100 focus:ring-4 focus:ring-emerald-100' : 'bg-slate-100/50 border border-transparent'}`} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">العنوان بالتفصيل</label>
                  <textarea 
                    value={restaurantForm.address}
                    onChange={(e) => setRestaurantForm({ ...restaurantForm, address: e.target.value })}
                    disabled={!isEditingRestaurant}
                    rows={3}
                    className={`w-full px-6 py-4 rounded-2xl font-bold transition-all outline-none resize-none ${isEditingRestaurant ? 'bg-slate-50 border border-emerald-100 focus:ring-4 focus:ring-emerald-100' : 'bg-slate-100/50 border border-transparent'}`} 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">الموقع الجغرافي (رابط خرائط جوجل)</label>
                  <div className="relative">
                    <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={restaurantForm.locationLink}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, locationLink: e.target.value })}
                      disabled={!isEditingRestaurant}
                      placeholder="https://maps.google.com/..."
                      className={`w-full pr-12 pl-6 py-4 rounded-2xl font-bold transition-all outline-none ${isEditingRestaurant ? 'bg-slate-50 border border-emerald-100 focus:ring-4 focus:ring-emerald-100' : 'bg-slate-100/50 border border-transparent'}`} 
                    />
                  </div>
                  {/* Visual Map Placeholder */}
                  <div className="h-28 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-slate-50 transition-all">
                    <Navigation size={24} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">عرض الموقع على الخريطة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security & Subscription */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Subscription Card */}
          <div className="glass-card rounded-[2.5rem] border border-white p-8 space-y-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-full h-1.5 bg-blue-600"></div>
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-600" />
                الاشتراك
              </h3>
              <button 
                onClick={() => onNavigate('billing')}
                className="text-[10px] font-black text-blue-600 flex items-center gap-1 hover:underline"
              >
                إدارة <ChevronLeft size={12} />
              </button>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-black uppercase">الخطة</span>
                <span className="text-xs font-black text-slate-800">{user.plan}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-black uppercase">الحالة</span>
                <span className="bg-emerald-100 text-emerald-600 text-[8px] px-2 py-0.5 rounded-full font-black uppercase">Active</span>
              </div>
            </div>
          </div>

          {/* Security & Logout Tools */}
          <div className="glass-card rounded-[2.5rem] border border-white p-8 space-y-4">
            <h3 className="font-black text-slate-800 flex items-center gap-2 mb-2">
              <Shield size={18} className="text-slate-700" />
              الأمان والجلسة
            </h3>
            <button 
              onClick={() => setIsPasswordModalOpen(true)}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
            >
              <Lock size={16} />
              تغيير كلمة المرور
            </button>
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-100 transition-all"
            >
              <LogOut size={16} />
              تسجيل الخروج
            </button>
          </div>

          {/* Danger Zone */}
          <div className="glass-card rounded-[2.5rem] border border-rose-100 bg-rose-50/20 p-8 space-y-6">
            <h3 className="font-black text-rose-600 flex items-center gap-2">
              <Trash2 size={18} />
              منطقة الخطر
            </h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder='اكتب كلمة "حذف" للتأكيد'
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-rose-100 rounded-xl font-bold text-rose-600 focus:ring-4 focus:ring-rose-100 outline-none text-center text-xs" 
              />
              <button 
                onClick={handleDelete}
                disabled={deleteConfirm !== 'حذف'}
                className="w-full py-3 bg-rose-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-600/20 disabled:opacity-50"
              >
                حذف الحساب
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-white p-10 space-y-8 relative overflow-hidden">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                    <Lock className="text-blue-600" size={24} />
                    تغيير كلمة المرور
                 </h3>
                 <button onClick={() => setIsPasswordModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={24} />
                 </button>
              </div>
              
              <form onSubmit={handleChangePassword} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">كلمة المرور الحالية</label>
                    <div className="relative">
                       <input 
                        type={showPassword ? "text" : "password"} 
                        value={passwordForm.current}
                        onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                        required
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                       />
                       <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"
                       >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                       </button>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">كلمة المرور الجديدة</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={passwordForm.new}
                      onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                      required
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest mr-2">تأكيد كلمة المرور</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={passwordForm.confirm}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                      required
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-100 outline-none" 
                    />
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95"
                 >
                   تحديث كلمة المرور
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Account;
