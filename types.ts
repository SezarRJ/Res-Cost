
export enum UserRole {
  OWNER = 'owner',
  STAFF = 'staff',
  ADMIN = 'admin'
}

export enum SubscriptionPlan {
  FREE = 'FREE',
  PRO = 'PRO',
  ELITE = 'ELITE'
}

export enum Currency {
  IQD = 'IQD',
  USD = 'USD'
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  pricePerUnit: number;
  currency: Currency;
  category?: string;
}

export interface RecipeIngredient {
  ingredientId: string;
  quantity: number;
  cost: number;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
  sellingPrice: number;
  category?: string;
  description?: string;
}

export interface OperatingCost {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
}

export interface Restaurant {
  id: string;
  name: string;
  city: string;
  currency: Currency;
  targetMarginPercent: number;
  baselineMonthlyPlates: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  role: UserRole;
  plan: SubscriptionPlan;
  restaurantId: string;
}

export interface AIPriceRecommendation {
  conservative: number;
  balanced: number;
  aggressive: number;
  reasoning: string;
}
