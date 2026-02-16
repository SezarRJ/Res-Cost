
import React from 'react';
import { 
  LayoutDashboard, 
  ChefHat, 
  Settings, 
  TrendingUp, 
  CreditCard,
  ShoppingCart,
  Percent,
  Calculator,
  DollarSign,
  UploadCloud,
  User,
  Zap,
  ShieldCheck,
  BarChart3,
  Users,
  Store,
  History,
  Lock,
  Megaphone,
  Activity,
  Cpu,
  LifeBuoy,
  Layers,
  Database,
  FileSearch,
  Ticket,
  Link2
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'لوحة التحكم', path: 'dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'مصاريف التشغيل', path: 'costs', icon: <Calculator size={20} /> },
  { label: 'المواد الخام', path: 'ingredients', icon: <ShoppingCart size={20} /> },
  { label: 'الوصفات', path: 'recipes', icon: <ChefHat size={20} /> },
  { label: 'استيراد المبيعات', path: 'sales-import', icon: <UploadCloud size={20} />, plan: 'PRO' },
  { label: 'توصيات التسعير', path: 'pricing-recs', icon: <DollarSign size={20} />, plan: 'ELITE' },
  { label: 'قواعد العروض', path: 'offers', icon: <Percent size={20} />, plan: 'PRO' },
  { label: 'التقارير والتحليلات', path: 'reports', icon: <BarChart3 size={20} />, plan: 'PRO' },
  { label: 'مركز الذكاء الاصطناعي', path: 'ai-hub', icon: <Zap size={20} />, plan: 'ELITE' },
  { label: 'الاشتراك والفواتير', path: 'billing', icon: <CreditCard size={20} /> },
  { label: 'الملف الشخصي', path: 'account', icon: <User size={20} /> },
];

export const ADMIN_NAV_ITEMS = [
  { label: 'الرئيسية', path: 'admin/dashboard', icon: <Activity size={20} /> },
  { label: 'المستخدمين', path: 'admin/users', icon: <Users size={20} /> },
  { label: 'المطاعم', path: 'admin/restaurants', icon: <Store size={20} /> },
  { label: 'الاشتراكات', path: 'admin/subscriptions', icon: <ShieldCheck size={20} /> },
  { label: 'الفوترة والمدفوعات', path: 'admin/billing', icon: <CreditCard size={20} /> },
  { label: 'الاستخدام والحدود', path: 'admin/usage', icon: <Layers size={20} /> },
  { label: 'وحدة الـ AI', path: 'admin/ai', icon: <Cpu size={20} /> },
  { label: 'الربط والتكامل', path: 'admin/integrations', icon: <Link2 size={20} /> },
  { label: 'الاستيرادات والملفات', path: 'admin/imports', icon: <FileSearch size={20} /> },
  { label: 'تذاكر الدعم', path: 'admin/support', icon: <Ticket size={20} /> },
  { label: 'إدارة المحتوى', path: 'admin/content', icon: <Database size={20} /> },
  { label: 'سجل التدقيق', path: 'admin/audit', icon: <History size={20} /> },
  { label: 'الإعلانات', path: 'admin/announcements', icon: <Megaphone size={20} /> },
  { label: 'إعدادات النظام', path: 'admin/settings', icon: <Settings size={20} /> },
];

export const PLAN_LIMITS_DEFAULTS = {
  FREE: { ingredients: 30, recipes: 20, salesImport: false, staff: 1, aiRequests: 0, uploadLimit: '5MB' },
  PRO: { ingredients: Infinity, recipes: Infinity, salesImport: true, staff: 2, aiRequests: 50, uploadLimit: '20MB' },
  ELITE: { ingredients: Infinity, recipes: Infinity, salesImport: true, staff: 5, aiRequests: 1000, uploadLimit: '100MB' },
};
