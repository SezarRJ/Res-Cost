
import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import PublicNav from './components/PublicNav';
import PublicFooter from './components/PublicFooter';
import Landing from './pages/Landing';
import PublicPricing from './pages/PublicPricing';
import PublicFeatures from './pages/PublicFeatures';
import PublicContact from './pages/PublicContact';
import PublicLegal from './pages/PublicLegal';
import Login from './pages/Login';
import Register from './pages/Register';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';
import Ingredients from './pages/Ingredients';
import Recipes from './pages/Recipes';
import RecipeNew from './pages/RecipeNew';
import RecipeDetail from './pages/RecipeDetail';
import OperatingCosts from './pages/OperatingCosts';
import Billing from './pages/Billing';
import PricingRecommendations from './pages/PricingRecommendations';
import SalesImport from './pages/SalesImport';
import AIHub from './pages/AIHub';
import Account from './pages/Account';
import OffersRules from './pages/OffersRules';
import Reports from './pages/Reports';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminRestaurants from './pages/admin/AdminRestaurants';
import AdminAI from './pages/admin/AdminAI';
import AdminAudit from './pages/admin/AdminAudit';
import AdminSettings from './pages/admin/AdminSettings';

import { AIChatPanel } from './components/AIChatPanel';
import { UserProfile, UserRole, SubscriptionPlan, SubscriptionStatus, Ingredient, OperatingCost, Currency, Recipe } from './types';
import { Sparkles, ShieldCheck } from 'lucide-react';

const MOCK_USER: UserProfile = {
  id: 'user-admin',
  fullName: 'مدير النظام',
  role: UserRole.ADMIN,
  plan: SubscriptionPlan.ELITE,
  restaurantId: 'rest-admin',
  restaurantName: 'التحكم المركزي',
  address: 'بغداد، المنصور',
  locationLink: '',
  baselineMonthlyPlates: 0,
  targetMarginPercent: 60,
  subscription: {
    plan: SubscriptionPlan.ELITE,
    status: SubscriptionStatus.ACTIVE,
    renewalDate: '2099-01-01',
    paymentMethod: { brand: 'MasterCard', last4: '8888' },
    invoices: []
  }
};

const INITIAL_INGREDIENTS: Ingredient[] = [
  { id: '1', name: 'طحين فاخر (تركي)', unit: 'كغم', pricePerUnit: 1250, currency: Currency.IQD, category: 'مخزن' },
  { id: '2', name: 'زيت نباتي صني', unit: 'لتر', pricePerUnit: 2500, currency: Currency.IQD, category: 'مخزن' },
  { id: '3', name: 'لحم بقري مفروم (محلي)', unit: 'كغم', pricePerUnit: 14000, currency: Currency.IQD, category: 'بروتين' },
];

const INITIAL_COSTS: OperatingCost[] = [
  { id: '1', name: 'إيجار المحل', amount: 2000000, frequency: 'monthly' },
  { id: '2', name: 'رواتب الموظفين', amount: 5500000, frequency: 'monthly' },
];

const INITIAL_RECIPES: Recipe[] = [
  { id: '1', name: 'برجر كلاسيك العائلي', ingredients: [{ ingredientId: '3', quantity: 0.15, cost: 2100 }], sellingPrice: 12000, currency: Currency.IQD, category: 'وجبات رئيسية', competitors: [] },
  { id: '2', name: 'بيتزا دجاج سبايسي', ingredients: [], sellingPrice: 0, currency: Currency.IQD, category: 'بيتزا', competitors: [] },
];

const App: React.FC = () => {
  const [activePath, setActivePath] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('mp_session') === 'active');
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS);
  const [costs, setCosts] = useState<OperatingCost[]>(INITIAL_COSTS);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);

  // Derived Values
  const monthlyOverhead = useMemo(() => {
    return costs.reduce((sum, c) => sum + (c.frequency === 'monthly' ? c.amount : c.amount / 12), 0);
  }, [costs]);

  const overheadPerDish = useMemo(() => {
    return userProfile.baselineMonthlyPlates > 0 ? monthlyOverhead / userProfile.baselineMonthlyPlates : 0;
  }, [monthlyOverhead, userProfile.baselineMonthlyPlates]);

  const handleNavigate = (path: string) => {
    setActivePath(path);
    window.location.hash = path;
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    localStorage.setItem('mp_session', 'active');
    setIsLoggedIn(true);
    // If admin, go to admin dashboard, else go to normal dashboard
    if (userProfile.role === UserRole.ADMIN) {
      handleNavigate('admin/dashboard');
    } else {
      handleNavigate('dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mp_session');
    localStorage.removeItem('mp_setup_complete');
    setIsLoggedIn(false);
    handleNavigate('landing');
  };

  const handleSetupComplete = () => {
    localStorage.setItem('mp_setup_complete', 'true');
    localStorage.setItem('mp_session', 'active');
    setIsLoggedIn(true);
    handleNavigate('dashboard');
  };

  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash.replace('#', '');
      if (!hash) hash = 'landing';
      
      const appPaths = ['dashboard', 'ingredients', 'recipes', 'pricing-recs', 'sales-import', 'ai-hub', 'account', 'offers', 'costs', 'billing', 'reports'];
      const adminPaths = ['admin/dashboard', 'admin/users', 'admin/restaurants', 'admin/subscriptions', 'admin/ai', 'admin/audit', 'admin/announcements', 'admin/settings'];
      const authPaths = ['login', 'register', 'setup'];
      
      const isTryingToAccessApp = appPaths.some(p => hash.startsWith(p));
      const isTryingToAccessAdmin = adminPaths.some(p => hash.startsWith(p));
      const hasSession = localStorage.getItem('mp_session') === 'active';
      const setupComplete = localStorage.getItem('mp_setup_complete') === 'true';

      // Security checks
      if ((isTryingToAccessApp || isTryingToAccessAdmin) && !hasSession) {
        handleNavigate('login');
        return;
      }

      if (isTryingToAccessAdmin && userProfile.role !== UserRole.ADMIN) {
        handleNavigate('dashboard');
        return;
      }

      if (hasSession && !setupComplete && !isTryingToAccessAdmin && hash !== 'setup' && userProfile.role !== UserRole.ADMIN) {
        handleNavigate('setup');
        return;
      }

      setActivePath(hash);
      setIsLoggedIn(hasSession);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [userProfile.role]);

  const renderPublicPage = () => {
    switch (activePath) {
      case 'landing': return <Landing onGetStarted={() => handleNavigate('register')} />;
      case 'pricing': return <PublicPricing onSelectPlan={() => handleNavigate('register')} />;
      case 'features': return <PublicFeatures />;
      case 'contact': return <PublicContact />;
      case 'terms': return <PublicLegal type="terms" />;
      case 'privacy': return <PublicLegal type="privacy" />;
      case 'login': return <Login onLogin={handleLogin} />;
      case 'register': return <Register onRegister={() => handleNavigate('setup')} />;
      case 'setup': return <Setup onComplete={handleSetupComplete} />;
      default: return <Landing onGetStarted={() => handleNavigate('register')} />;
    }
  };

  const renderAppPage = () => {
    // Admin Routes
    if (activePath === 'admin/dashboard') return <AdminDashboard />;
    if (activePath === 'admin/users') return <AdminUsers />;
    if (activePath === 'admin/restaurants') return <AdminRestaurants />;
    if (activePath === 'admin/ai') return <AdminAI />;
    if (activePath === 'admin/audit') return <AdminAudit />;
    if (activePath === 'admin/settings') return <AdminSettings />;
    if (activePath === 'admin/announcements') return <AdminSettings />; // Shares view for now

    // Standard Routes
    if (activePath === 'recipes/new') {
      return (
        <RecipeNew 
          ingredientsList={ingredients} 
          overheadPerDish={overheadPerDish}
          targetMargin={userProfile.targetMarginPercent}
          onSave={(newRecipe) => {
            setRecipes([...recipes, newRecipe]);
            handleNavigate('recipes');
          }}
          onBack={() => handleNavigate('recipes')}
        />
      );
    }

    if (activePath.startsWith('recipes/')) {
      const id = activePath.split('/')[1];
      const recipe = recipes.find(r => r.id === id);
      if (!recipe) return <Recipes recipes={recipes} ingredients={ingredients} overheadPerDish={overheadPerDish} onRecipeSelect={(id) => handleNavigate(`recipes/${id}`)} onAddNew={() => handleNavigate('recipes/new')} />;
      
      return (
        <RecipeDetail 
          recipe={recipe} 
          ingredientsList={ingredients}
          overheadPerDish={overheadPerDish}
          userProfile={userProfile}
          onUpdate={(updatedRecipe) => {
            setRecipes(recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
          }}
          onBack={() => handleNavigate('recipes')} 
        />
      );
    }

    switch (activePath) {
      case 'dashboard': return <Dashboard ingredients={ingredients} costs={costs} recipes={recipes} onNavigate={handleNavigate} />;
      case 'ingredients': return <Ingredients ingredients={ingredients} setIngredients={setIngredients} />;
      case 'recipes': return <Recipes recipes={recipes} ingredients={ingredients} overheadPerDish={overheadPerDish} onRecipeSelect={(id) => handleNavigate(`recipes/${id}`)} onAddNew={() => handleNavigate('recipes/new')} />;
      case 'pricing-recs': return <PricingRecommendations />;
      case 'sales-import': return <SalesImport />;
      case 'ai-hub': return <AIHub />;
      case 'account': return <Account user={userProfile} setUser={(u) => setUserProfile(u as UserProfile)} onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'offers': return <OffersRules />;
      case 'costs': return <OperatingCosts costs={costs} setCosts={setCosts} />;
      case 'billing': return <Billing user={userProfile} />;
      case 'reports': return <Reports recipes={recipes} ingredients={ingredients} costs={costs} overheadPerDish={overheadPerDish} />;
      default: return <Dashboard ingredients={ingredients} costs={costs} recipes={recipes} onNavigate={handleNavigate} />;
    }
  };

  const authPaths = ['login', 'register', 'setup'];
  const isAdminPath = activePath.startsWith('admin/');
  const isInsideApp = activePath.startsWith('dashboard') || 
                      activePath.startsWith('ingredients') || 
                      activePath.startsWith('recipes') || 
                      activePath.startsWith('pricing-recs') || 
                      activePath.startsWith('sales-import') || 
                      activePath.startsWith('ai-hub') || 
                      activePath.startsWith('account') || 
                      activePath.startsWith('offers') || 
                      activePath.startsWith('costs') || 
                      activePath.startsWith('billing') || 
                      activePath.startsWith('reports') ||
                      isAdminPath;

  if (!isLoggedIn || !isInsideApp) {
    if (authPaths.includes(activePath)) return <div className="min-h-screen bg-slate-50">{renderPublicPage()}</div>;
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <PublicNav activePath={activePath} onNavigate={handleNavigate} />
        <main className="flex-1">{renderPublicPage()}</main>
        <PublicFooter onNavigate={handleNavigate} />
      </div>
    );
  }

  return (
    <>
      <Layout 
        activePath={activePath.startsWith('recipes') ? 'recipes' : activePath} 
        onNavigate={handleNavigate} 
        onLogout={handleLogout}
        userProfile={userProfile}
      >
        {renderAppPage()}
      </Layout>

      {/* Admin Quick Switch (For Demo Only) */}
      {userProfile.role === UserRole.ADMIN && (
        <div className="fixed bottom-24 left-8 z-[100] flex flex-col gap-2">
           <button 
             onClick={() => handleNavigate(isAdminPath ? 'dashboard' : 'admin/dashboard')}
             className="w-16 h-16 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
             title={isAdminPath ? "العودة للوحة صاحب المطعم" : "الدخول للوحة الإدارة"}
           >
              {isAdminPath ? <Sparkles size={24} /> : <ShieldCheck size={24} />}
           </button>
        </div>
      )}

      {!isAdminPath && (
        <button 
          onClick={() => setIsAiPanelOpen(true)}
          className="fixed bottom-8 left-8 z-50 w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all duration-300 group"
        >
          <Sparkles size={28} />
        </button>
      )}

      <AIChatPanel isOpen={isAiPanelOpen} onClose={() => setIsAiPanelOpen(false)} />
    </>
  );
};

export default App;
