import type { PlayerLegendData } from '@/features/player-legend/types';
import type { VerticalTableSchema } from '@/features/tables/models';

const GENERAL_INFO_ORDER = [
  'profession',
  'salary',
  'children',
  'monthlyTotalIncome',
  'monthlyTotalExpenses',
  'monthlyFreeFunds',
] as const;

type GeneralInfoKey = (typeof GENERAL_INFO_ORDER)[number];

const GeneralInfoLabels: Record<GeneralInfoKey, string> = {
  profession: 'Професія',
  salary: 'Оплата праці',
  children: 'Кількість дітей',
  monthlyTotalIncome: 'Щомісячні загальні доходи (ЗД)',
  monthlyTotalExpenses: 'Щомісячні загальні витрати (ЗВ)',
  monthlyFreeFunds: 'Щомісячні вільні кошти (ВК)',
} as const;

export type GeneralInfoTableRowValue = string | number;

export const createGeneralInfoTableSchema = (
  data: Omit<PlayerLegendData, 'assets' | 'expenses'>
): VerticalTableSchema<GeneralInfoTableRowValue> => ({
  caption: 'Таблиця з загальної інформацією',
  rows: GENERAL_INFO_ORDER.map((key) => {
    const expense = data[key];

    return {
      key: key,
      label: GeneralInfoLabels[key],
      value: expense,
    };
  }),
});
