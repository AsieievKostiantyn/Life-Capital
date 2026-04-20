export type PlayerState = {
  id: string;
  gameSessionUsersId: string;
  playerLegendId: string;

  finances: FinancesState;
  expensesList: string[];
  metadata: PlayerMetaData;

  investmentDealIds: string[];
};

type PlayerMetaData = {
  lastSeenNewsAt?: string;
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

  credits?: {
    realEstate?: CreditItem;
    car?: CreditItem;
    machinery?: CreditItem;
    furniture?: CreditItem;
    otherCredits?: CreditItem;
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

  shares?: Record<
    number,
    {
      code?: string;
      costOfTheSharePackage?: number;
      costPerShare?: number;
      numberOfShares?: number;
    }
  >;

  airbagAmount?: number;
  airbag?: Record<
    number,
    {
      sourceOfIncome?: string;
      replenishment?: number;
      accumulatedAmount?: number;
    }
  >;
};

type AssetItem = {
  assetAmount: number;
  assetIncome: number;
};

type CreditItem = {
  amountOfCredit: number;
  interest: number;
};
