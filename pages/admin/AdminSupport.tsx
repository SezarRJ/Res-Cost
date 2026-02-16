
import React, { useState } from 'react';
import { 
  Ticket, 
  Search, 
  Filter, 
  MessageSquare, 
  User, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Tag,
  ArrowRight,
  Plus,
  MoreVertical,
  ChevronLeft,
  Send,
  UserPlus
} from 'lucide-react';
import { SupportTicket } from '../../types';

const AdminSupport: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [tickets, setTickets] = useState<SupportTicket[]>([
    { id: 'T-101', restaurantName: 'برجر هاوس', userName: 'أحمد', category: 'billing', severity: 'high', status: 'open', message: 'لماذا لم يتم تفعيل اشتراك ELITE بعد الدفع؟', createdAt: 'منذ ساعة' },
    { id: 'T-102', restaurantName: 'أرز لبنان', userName: 'محمد', category: 'import', severity: 'medium', status: 'assigned', message: 'يوجد خطأ عند رفع ملف CSV من نظام POS العراقي.', createdAt: 'منذ 5 ساعات' },
    { id: 'T-103', restaurantName: 'بيتزا كينج', userName: 'زياد', category: 'ai', severity: 'low', status: 'closed', message: 'هل يمكن للـ AI تحليل الهدر بشكل أعمق؟', createdAt: 'منذ يوم' },
  ]);

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const handleCloseTicket = (id: string) => {
    setIsProcessing(`close-${id}`);
    setTimeout(() => {
      setTickets(prev => prev.map(t => t.id === id ? {...t, status: 'closed'} : t));
      if (selectedTicket?.id === id) setSelectedTicket({...selectedTicket, status: 'closed'});
      setIsProcessing(null);
    }, 1000);
  };

  const handleAssign = (id: string) => {
    setIsProcessing(`assign-${id}`);
    setTimeout(() => {
      alert('تم تحويل التذكرة إلى القسم المختص بنجاح.');
      setIsProcessing(null);
    }, 1000);
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    setIsProcessing('reply');
    setTimeout(() => {
      setReplyText('');
      alert('تم إرسال الرد للعميل وتحديث حالة التذكرة.');
      setIsProcessing(null);
    }, 1500);
  };

  const getSeverityColor = (s: string) => {
    switch(s) {
      case 'critical': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  const getStatusIcon = (s: string) => {
    switch(s) {
      case 'open': return <AlertCircle size={14} className="text-rose-500" />;
      case 'assigned': return <Loader2 size={14} className="text-blue-500 animate-spin" />;
      case 'closed': return <CheckCircle2 size={14} className="text-emerald-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">تذاكر الدعم الفني</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Customer Support & Issue Tracking</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-xs uppercase shadow-sm flex items-center gap-2 active:scale-95">
              <Tag size={16} /> القضايا المعروفة
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-4 space-y-6">
            <div className="relative group">
               <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
               <input type="text" placeholder="ابحث في التذاكر..." className="w-full pr-12 pl-4 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold outline-none shadow-sm focus:ring-4 focus:ring-blue-100 transition-all" />
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pb-10">
               {tickets.map(t => (
                  <div 
                    key={t.id} 
                    onClick={() => setSelectedTicket(t)}
                    className={`p-6 rounded-[2rem] border transition-all cursor-pointer group relative overflow-hidden ${selectedTicket?.id === t.id ? 'bg-blue-600 text-white border-blue-600 shadow-xl' : 'bg-white border-slate-100 hover:border-blue-200 shadow-sm'}`}
                  >
                     <div className="flex items-center justify-between mb-4">
                        <span className={`text-[8px] font-black uppercase tracking-widest ${selectedTicket?.id === t.id ? 'text-blue-200' : 'text-slate-400'}`}>{t.id} • {t.category}</span>
                        <div className="flex items-center gap-2">
                           <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase ${selectedTicket?.id === t.id ? 'bg-white/20 text-white' : getSeverityColor(t.severity)}`}>{t.severity}</span>
                           {getStatusIcon(t.status)}
                        </div>
                     </div>
                     <h4 className="text-sm font-black mb-1 leading-tight">{t.message}</h4>
                     <p className={`text-[10px] font-bold ${selectedTicket?.id === t.id ? 'text-blue-100' : 'text-slate-400'}`}>{t.restaurantName} • {t.userName}</p>
                     <div className="mt-4 flex items-center justify-between border-t pt-4 border-white/10">
                        <span className="text-[9px] font-black opacity-60 uppercase">{t.createdAt}</span>
                        <ChevronLeft size={14} className={selectedTicket?.id === t.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-all'} />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-8">
            {selectedTicket ? (
               <div className="glass-card rounded-[3rem] border border-white overflow-hidden shadow-2xl flex flex-col h-full min-h-[600px] animate-in zoom-in-95">
                  <div className="p-8 border-b border-slate-50 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                           {selectedTicket.userName.charAt(0)}
                        </div>
                        <div>
                           <h3 className="text-xl font-black">{selectedTicket.userName}</h3>
                           <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">{selectedTicket.restaurantName}</p>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button 
                          onClick={() => handleAssign(selectedTicket.id)}
                          disabled={!!isProcessing}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                           {isProcessing === `assign-${selectedTicket.id}` ? <Loader2 size={12} className="animate-spin" /> : <UserPlus size={12} />}
                           تحويل لأدمن
                        </button>
                        <button 
                          onClick={() => handleCloseTicket(selectedTicket.id)}
                          disabled={!!isProcessing || selectedTicket.status === 'closed'}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                           {isProcessing === `close-${selectedTicket.id}` ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                           {selectedTicket.status === 'closed' ? 'مغلقة' : 'إغلاق التذكرة'}
                        </button>
                     </div>
                  </div>

                  <div className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar">
                     <div className="flex justify-start">
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] rounded-tr-none max-w-lg shadow-sm">
                           <p className="text-sm font-bold text-slate-700 leading-relaxed">"{selectedTicket.message}"</p>
                           <span className="text-[9px] font-black text-slate-400 uppercase mt-4 block">{selectedTicket.createdAt}</span>
                        </div>
                     </div>

                     <div className="flex justify-end">
                        <div className="bg-blue-600 text-white p-6 rounded-[2rem] rounded-tl-none max-w-lg shadow-xl shadow-blue-600/20">
                           <p className="text-sm font-bold leading-relaxed">أهلاً بك. جاري التحقق من عملية الدفع من خلال بوابة Stripe. سنقوم بتحديثك خلال 30 دقيقة.</p>
                           <span className="text-[9px] font-black text-blue-200 uppercase mt-4 block">قبل 5 دقائق • الأدمن: مصطفى</span>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 border-t border-slate-50 bg-slate-50/50">
                     <div className="relative group">
                        <textarea 
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="اكتب ردك هنا..." 
                          rows={3} 
                          className="w-full pr-6 pl-20 py-4 bg-white border border-slate-200 rounded-[2rem] text-sm font-bold outline-none focus:ring-8 focus:ring-blue-100 transition-all resize-none shadow-inner" 
                        />
                        <button 
                          onClick={handleReply}
                          disabled={!replyText.trim() || isProcessing === 'reply'}
                          className="absolute left-3 bottom-3 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-50"
                        >
                           {isProcessing === 'reply' ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="rotate-180" />}
                        </button>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center glass-card rounded-[3rem] border border-slate-100 p-20 gap-8">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 shadow-inner">
                     <Ticket size={48} />
                  </div>
                  <div className="space-y-3">
                     <h3 className="text-2xl font-black text-slate-800">مركز الدعم الفني</h3>
                     <p className="text-sm text-slate-400 font-bold max-w-xs leading-relaxed">اختر تذكرة من القائمة الجانبية لبدء المحادثة وتقديم الدعم للعميل.</p>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default AdminSupport;
