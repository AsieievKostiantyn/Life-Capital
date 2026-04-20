interface BaseInvestment {
  id: string;
  title: string;
  description: string;
}

export interface BusinessInvestment extends BaseInvestment {
  type: 'business';
  code: string;
  cost: number;
  firstPayment: number;
  credit: number;
  passiveIncome: number;
}

export interface CurrencyInvestment extends BaseInvestment {
  type: 'currency';
  exchangeRate: string;
  priceRange: string;
}

export interface ShareInvestment extends BaseInvestment {
  type: 'shares';
  currentlyPrice: number;
  priceRange: string;
}

export type Investment =
  | BusinessInvestment
  | CurrencyInvestment
  | ShareInvestment;
