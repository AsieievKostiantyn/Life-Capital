import type { PlayerLegendData } from '@/features/cards/types/cardTypes';

import type { VerticalTableBuilder } from '../types';

export const buildExpensesTable: VerticalTableBuilder<PlayerLegendData> = (
  data
) => [
  { label: 'Податок на доходи', value: data.expenses.incomeTax },
  { label: 'Оплата комунальних послуг', value: data.expenses.utilities },
  {
    label: 'Щомісячні побутові витрати',
    value: data.expenses.householdExpenses,
  },
  {
    label: 'Інші витрати',
    value: data.expenses.otherExpenses,
  },
  { label: 'Витрати на одну дитину', value: data.expenses.childExpenses },
];
