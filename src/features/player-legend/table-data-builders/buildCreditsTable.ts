import type { PlayerLegendData } from '@/features/cards/types/cardTypes';

import type { TableBuilder } from '../types';

const creditNames = [
  'На нерухомість',
  'На автомобіль',
  'На побутову техніку',
  'На меблі',
  'Інші кредити, 3%',
];

export const buildCreditsTable: TableBuilder<PlayerLegendData> = (data) => ({
  caption: 'Таблиця кредитів',
  head: ['Найменування кредитів', 'Сума кредита', 'Сплата, %'],
  body: [
    ...Object.values(data.expenses.credits).map((credit, index) => [
      creditNames[index],
      credit.amountOfCredit,
      credit.interest,
    ]),
  ],
});
