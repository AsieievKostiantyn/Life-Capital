import type { CardTypes } from '@/shared/types';

type CreditItem = {
  amountOfCredit: number;
  interest: number;
};
type AssetItem = {
  assetAmount: number;
  assetIncome: number;
};

export type CardsRow = {
  id: string;
  type: CardTypes;
  data: CardData;
};

export type CardData = PlayerLegendData;

export type PlayerLegendData = {
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
