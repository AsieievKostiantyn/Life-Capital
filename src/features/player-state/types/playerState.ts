export type PlayerState = {
  id: string;
  gameSessionUsersId: string;
  playerLegendId: string;

  finances: FinancesState;
};

export type FinancesPath = string;

export type FinancesState = {
  generalInfo?: {
    profession?: string;
    children?: number;
    cash?: number;
    monthlyTotalIncome?: number;
    monthlyTotalExpenses?: number;
    monthlyFreeFunds?: number;
  };

  expenses?: {
    incomeTax?: number;
    utilities?: number;
    householdExpenses?: number;
    otherExpenses?: number;
    childExpenses?: number;
  };

  assets?: {
    deposit?: AssetItem;
    gold?: AssetItem;
    savingsInsurance?: AssetItem;
    riskInsurance?: AssetItem;
    intellectualProperty?: AssetItem;
  };

  business?: Record<
    number,
    {
      code?: string;
      firstPayment?: number;
      credit?: number;
      cost?: number;
      passiveIncome?: number;
    }
  >;
};

type AssetItem = {
  assetAmount: number;
  assetIncome: number;
};
