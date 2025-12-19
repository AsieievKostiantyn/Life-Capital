import type { PlayerLegendData } from '@/features/player-legend/types';
import type { VerticalTableSchema } from '@/features/tables/models';

const EXPENSES_ORDER = [
  'incomeTax',
  'utilities',
  'householdExpenses',
  'otherExpenses',
  'childExpenses',
] as const;

type ExpenseKey = (typeof EXPENSES_ORDER)[number];

const ExpenseLabels: Record<ExpenseKey, string> = {
  incomeTax: 'Податок на доходи',
  utilities: 'Оплата комунальних послуг',
  householdExpenses: 'Щомісячні побутові витрати',
  otherExpenses: 'Інші витрати',
  childExpenses: 'Витрати на одну дитину',
} as const;

export type CreditTableRowValue = number;

export const createExpensesTableSchema = (
  data: Omit<PlayerLegendData['expenses'], 'credits'>
): VerticalTableSchema<CreditTableRowValue> => ({
  caption: 'Таблиця витрат',
  rows: EXPENSES_ORDER.map((key) => {
    const expense = data[key];

    return {
      key: key,
      label: ExpenseLabels[key],
      value: expense,
    };
  }),
});
