import type { TableData } from '@mantine/core';

type CreditItem = {
  amountOfCredit: number;
  interest: number;
};
type AssetItem = {
  assetAmount: number;
  assetIncome: number;
};

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

export type VerticalRow = {
  label: string;
  value: React.ReactNode;
};

export type TableBuilder<T> = (data: T) => TableData;
export type VerticalTableBuilder<T> = (data: T) => VerticalRow[];
