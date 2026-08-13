export type Currency = string;
export type Language = string;
export type ToneStyle = 'formal' | 'casual' | 'simple';

export interface CapexItem {
  id: string;
  item: string;
  cost: number;
}

export interface OpexItem {
  id: string;
  item: string;
  cost: number; // Monthly cost
}

export interface RevenueStream {
  id: string;
  name: string;
  pricePerUnit: number;
  expectedMonthlyVolume: number;
  cogsPercent: number; // e.g. 35 = 35%
}

export interface FinancialModel {
  currency: Currency;
  initialCapital: number;
  capexItems: CapexItem[];
  opexItems: OpexItem[];
  revenueStreams: RevenueStream[];
  monthlyGrowthRate: number; // e.g. 5 = 5% monthly growth
  taxRate: number; // e.g. 0.5 = 0.5% UMKM or 11% corporate
  financialSummaryNotes?: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface PestelAnalysis {
  political: string;
  economic: string;
  social: string;
  technological: string;
  environmental: string;
  legal: string;
}

export interface PortersFiveForces {
  competitiveRivalry: string;
  threatOfNewEntrants: string;
  threatOfSubstitutes: string;
  bargainingPowerOfSuppliers: string;
  bargainingPowerOfBuyers: string;
}

export interface MarketAnalysis {
  industryOverview: string;
  targetAudience: string;
  swot: SwotAnalysis;
  pestel: PestelAnalysis;
  portersFiveForces: PortersFiveForces;
}

export interface MarketingAndOperations {
  marketingStrategy: string;
  salesChannels: string[];
  operationalPlan: string;
  keyMetricsKPIs: string[];
}

export interface RiskItem {
  id: string;
  risk: string;
  impact: 'Tinggi' | 'Sedang' | 'Rendah' | 'High' | 'Medium' | 'Low';
  mitigation: string;
}

export interface BusinessMilestone {
  id: string;
  title: string;
  targetDate: string; // e.g. "Q1 2026", "Maret 2026"
  description: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  category?: 'Peluncuran' | 'Finansial' | 'Produk' | 'Pemasaran' | 'Operasional';
}

export interface KeywordTrendItem {
  keyword: string;
  monthlyVolume: string;
  competition: 'Tinggi' | 'Sedang' | 'Rendah' | 'High' | 'Medium' | 'Low';
  trend: 'Meningkat 📈' | 'Stabil ➡️' | 'Sangat Viral 🔥' | string;
}

export interface TrafficConversionGuide {
  estimatedMonthlySearchers: number;
  clickThroughRatePercent: number; // e.g. 5%
  conversionRatePercent: number; // e.g. 2.5%
  avgOrderValue: number; // e.g. 25000
  estimatedMonthlySales: number;
  estimatedMonthlyRevenue: number;
}

export interface GoogleTrafficInsights {
  searchInterestScore: number; // 0-100 score
  searchVolumeSummary: string;
  topKeywords: KeywordTrendItem[];
  trendingQueries: string[];
  conversionGuide: TrafficConversionGuide;
  googleStrategy: string;
}

export interface AnalogyItem {
  concept: string;
  plainExplanation: string;
  simpleAnalogy: string;
}

export interface CalculationGuideItem {
  metricName: string;
  formulaSimple: string;
  stepByStepExample: string;
}

export interface BeginnerGlossaryItem {
  term: string;
  simpleMeaning: string;
  whyItMatters: string;
}

export interface BeginnerGuide {
  simpleSummary: string;
  analogies: AnalogyItem[];
  calculationGuides: CalculationGuideItem[];
  beginnerGlossary: BeginnerGlossaryItem[];
}

export interface CompetitorInfo {
  name: string;
  type: string;
  marketShare: string;
  pricingStrategy: string;
  keyStrengths: string[];
  keyWeaknesses: string[];
  threatLevel: 'Tinggi' | 'Sedang' | 'Rendah';
  differentiationStrategy: string;
}

export interface CompetitorAnalysisData {
  summary: string;
  ourStrengths: string[];
  ourWeaknesses: string[];
  competitors: CompetitorInfo[];
  strategicRecommendations: string[];
}

export interface BusinessPlanData {
  id: string;
  businessName: string;
  industry: string;
  tagline: string;
  executiveSummary: string;
  marketAnalysis: MarketAnalysis;
  marketingAndOperations: MarketingAndOperations;
  financialModel: FinancialModel;
  riskManagement: RiskItem[];
  milestones?: BusinessMilestone[];
  googleTraffic?: GoogleTrafficInsights;
  beginnerGuide?: BeginnerGuide;
  competitorAnalysis?: CompetitorAnalysisData;
  createdAt: string;
  updatedAt: string;
}

export type GoogleTrafficData = GoogleTrafficInsights;

export interface PitchSlide {
  id: string;
  slideNumber: number;
  title: string;
  headline: string;
  bullets: string[];
  presenterNotes: string;
}

export interface PitchDeckData {
  id: string;
  planId?: string;
  businessName: string;
  tagline: string;
  targetAsk: number;
  currency: Currency;
  slides: PitchSlide[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
