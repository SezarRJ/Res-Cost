
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Ingredients from './pages/Ingredients';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import OperatingCosts from './pages/OperatingCosts';
import Billing from './pages/Billing';
import PricingRecommendations from './pages/PricingRecommendations';
import { AIChatPanel } from './components/AIChatPanel';
import { UserProfile, UserRole, SubscriptionPlan } from './types';
import { Sparkles } from 'lucide-react';

const MOCK_USER: UserProfile = {
  id: 'user-1',
  fullName: 'أحمد العراقي',
  role: UserRole.OWNER,
  plan: SubscriptionPlan.ELITE, // Changed to ELITE to see pricing-recs
  restaurantId: 'rest-1'
};

const App: React.FC = () => {
  const [activePath, setActivePath] = useState('dashboard');
  const [userProfile] = useState<UserProfile>(MOCK_USER);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  // Simple Router based on state
  const renderPage = () => {
    if (activePath.startsWith('recipes/')) {
      const id = activePath.split('/')[1];
      return <RecipeDetail recipeId={id} onBack={() => handleNavigate('recipes')} />;
    }

    switch (activePath) {
      case 'dashboard': return <Dashboard />;
      case 'ingredients': return <Ingredients />;
      case 'recipes': return <Recipes onRecipeSelect={(id) => handleNavigate(`recipes/${id}`)} />;
      case 'pricing-recs': return <PricingRecommendations />;
      case 'costs': return <OperatingCosts />;
      case 'billing': return <Billing currentPlan={userProfile.plan} />;
      default: return <Dashboard />;
    }
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) setActivePath(hash);
  }, []);

  const handleNavigate = (path: string) => {
    setActivePath(path);
    window.location.hash = path;
  };

  return (
    <>
      <Layout 
        activePath={activePath.startsWith('recipes/') ? 'recipes' : activePath} 
        onNavigate={handleNavigate} 
        userProfile={userProfile}
      >
        {renderPage()}
      </Layout>

      {/* Global AI Assistant Button */}
      <button 
        onClick={() => setIsAiPanelOpen(true)}
        className="fixed bottom-8 left-8 z-50 w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-4 bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-black shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-blue-50">
          المساعد الذكي
        </span>
      </button>

      <AIChatPanel isOpen={isAiPanelOpen} onClose={() => setIsAiPanelOpen(false)} />
    </>
  );
};

export default App;
