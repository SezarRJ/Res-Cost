
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, ChevronLeft, Zap, MessageSquare, TrendingUp, PieChart } from 'lucide-react';

interface Message {
  id: string;
  type: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "حلل تكاليف جميع أطباقي واقترح تحسينات",
  "ما هي الأطباق ذات أقل هامش ربح؟",
  "اقترح أسعار بيع مناسبة لأطباقي",
  "كيف أقلل تكاليف التشغيل؟"
];

export const AIChatPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: 'مرحباً! أنا مساعدك الذكي في MenuProfit. يمكنني تحليل تكاليف أطباقك، اقتراح أسعار مناسبة، وتقديم نصائح لزيادة الربحية. كيف أساعدك اليوم؟',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), type: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        type: 'ai', 
        text: 'بناءً على تحليلي لبياناتك الحالية، نلاحظ أن طبق "باستا الفريدو" لديه هامش ربح 46% وهو أقل من المستهدف (60%). أنصح بمراجعة كمية الكريمة المستخدمة أو رفع السعر بمقدار 1,000 د.ع لتعويض ارتفاع أسعار الألبان.',
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 md:p-10 pointer-events-none">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm pointer-events-auto" onClick={onClose}></div>
      
      <div className="w-full max-w-2xl h-[85vh] bg-white rounded-[2.5rem] shadow-2xl border border-white flex flex-col overflow-hidden pointer-events-auto animate-in slide-in-from-bottom-10 duration-500 relative">
        {/* Header */}
        <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
              <Bot size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black">المساعد الذكي</h3>
              <p className="text-[10px] text-blue-100 font-black uppercase tracking-widest">Business Intelligence Hub</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-start' : 'justify-end'} animate-in fade-in duration-300`}>
              <div className={`flex gap-4 max-w-[85%] ${msg.type === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${msg.type === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-slate-900 text-white'}`}>
                  {msg.type === 'user' ? <User size={20} /> : <Sparkles size={18} />}
                </div>
                <div className={`p-5 rounded-3xl text-sm font-bold leading-relaxed ${msg.type === 'user' ? 'bg-white border border-slate-100 text-slate-800 rounded-tr-none shadow-sm' : 'bg-blue-600 text-white rounded-tl-none shadow-xl shadow-blue-600/20'}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-end animate-in fade-in">
              <div className="bg-blue-600/10 p-4 rounded-2xl flex gap-2 items-center">
                 <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                 <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input & Suggestions */}
        <div className="p-8 border-t border-slate-100 bg-white">
          <div className="flex flex-wrap gap-2 mb-6">
            {SUGGESTIONS.map((s, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(s)}
                className="text-[11px] font-black text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full transition-all border border-blue-100 active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
          
          <div className="relative group">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اسألني عن تكاليف مطعمك..."
              className="w-full pr-6 pl-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all group-focus-within:bg-white group-focus-within:border-blue-200"
            />
            <button 
              onClick={() => handleSend()}
              className="absolute left-2 top-2 bottom-2 w-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-90"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
