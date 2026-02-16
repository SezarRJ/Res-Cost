
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

export enum SubscriptionStatus {
  ACTIVE = 'active',
  TRIALING = 'trialing',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete'
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

export interface CompetitorPrice {
  id: string;
  name: string;
  price: number;
  updatedAt: Date;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
  sellingPrice: number;
  currency: Currency;
  category?: string;
  description?: string;
  competitors: CompetitorPrice[];
}

export interface OperatingCost {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  pdfUrl: string;
}

export interface VolumeDiscountRule {
  id: string;
  name: string;
  threshold: number;
  discountPercent: number;
  minMarginPercent: number;
  isActive: boolean;
}

export interface SubscriptionDetails {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  renewalDate: string;
  paymentMethod: {
    brand: string;
    last4: string;
  };
  invoices: Invoice[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  plan: SubscriptionPlan;
  restaurantId: string;
  restaurantName: string;
  address: string;
  locationLink: string;
  baselineMonthlyPlates: number;
  targetMarginPercent: number;
  subscription?: SubscriptionDetails;
}

export interface AIPriceRecommendation {
  conservative: number;
  balanced: number;
  aggressive: number;
  reasoning: string;
}

// Admin Specific Types
export interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  action: string;
  entityType: string;
  entityName: string;
  metadata: any;
}

export interface AIUsageLog {
  id: string;
  restaurantName: string;
  feature: string;
  tokens: number;
  cost: number;
  timestamp: string;
}

export interface SystemConfig {
  maintenanceMode: boolean;
  globalAnnouncement: string;
  aiFeaturesEnabled: boolean;
  eliteTrialDays: number;
}
