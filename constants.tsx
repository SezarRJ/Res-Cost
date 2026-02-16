
import React from 'react';
import { 
  LayoutDashboard, 
  ChefHat, 
  Users, 
  Settings, 
  TrendingUp, 
  FileText, 
  CreditCard,
  ShoppingCart,
  Percent,
  Calculator,
  DollarSign
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'لوحة التحكم', path: 'dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'المواد الخام', path: 'ingredients', icon: <ShoppingCart size={20} /> },
  { label: 'الوصفات', path: 'recipes', icon: <ChefHat size={20} /> },
  { label: 'توصيات التسعير', path: 'pricing-recs', icon: <DollarSign size={20} />, plan: 'ELITE' },
  { label: 'مصاريف التشغيل', path: 'costs', icon: <Calculator size={20} /> },
  { label: 'المبيعات والتقارير', path: 'sales', icon: <TrendingUp size={20} />, plan: 'PRO' },
  { label: 'قواعد الخصومات', path: 'offers', icon: <Percent size={20} />, plan: 'PRO' },
  { label: 'الاشتراك والفواتير', path: 'billing', icon: <CreditCard size={20} /> },
  { label: 'الإعدادات', path: 'settings', icon: <Settings size={20} /> },
];

export const PLAN_LIMITS = {
  FREE: { ingredients: 30, recipes: 20 },
  PRO: { ingredients: Infinity, recipes: Infinity },
  ELITE: { ingredients: Infinity, recipes: Infinity },
};
