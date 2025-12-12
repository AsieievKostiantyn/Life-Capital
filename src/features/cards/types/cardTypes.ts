type CreditItem = {
  amountOfCredit: number;
  interest: number;
};
type AssetItem = {
  assetAmount: number;
  assetIncome: number;
};

export type PlayerLegendType = {
  profession: string;
  salary: number;
  children: number;
  monthlyTotalIncome: number;
  monthlyTotalExpenses: number;
  monthlyFreeFunds: number;
  assets: {
    deposit: AssetItem;
    gold: AssetItem;
    savingsInsurance: AssetItem;
    riskInsurance: AssetItem;
    intellectualProperty: AssetItem;
  };
  expenses: {
    incomeTax: number;
    utilities: number;
    householdExpenses: number;
    otherExpenses: number;
    childExpenses: number;
    credits: {
      realEstate: CreditItem;
      car: CreditItem;
      machinery: CreditItem;
      furniture: CreditItem;
      otherCredits: CreditItem;
    };
  };
};
