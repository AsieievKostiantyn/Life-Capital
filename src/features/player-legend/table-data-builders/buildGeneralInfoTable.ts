import type { PlayerLegendData } from '@/features/player-legend/types';

import type { VerticalTableBuilder } from '../types';

export const buildGeneralInfoTable: VerticalTableBuilder<PlayerLegendData> = (
  data
) => [
  { label: 'Професія', value: data.profession },
  { label: 'Оплата праці', value: data.salary },
  { label: 'Кількість дітей', value: data.children },
  { label: 'Щомісячні загальні доходи (ЗД)', value: data.monthlyTotalIncome },
  {
    label: 'Щомісячні загальні витрати (ЗВ)',
    value: data.monthlyTotalExpenses,
  },
  { label: 'Щомісячні вільні кошти (ВК)', value: data.monthlyFreeFunds },
];
