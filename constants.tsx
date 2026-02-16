
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
  BarChart3
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

export const PLAN_LIMITS = {
  FREE: { ingredients: 30, recipes: 20, salesImport: false },
  PRO: { ingredients: Infinity, recipes: Infinity, salesImport: true },
  ELITE: { ingredients: Infinity, recipes: Infinity, salesImport: true, aiHub: true },
};
