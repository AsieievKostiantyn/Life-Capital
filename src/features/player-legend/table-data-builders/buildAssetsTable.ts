import type { PlayerLegendData } from '@/features/cards/types/cardTypes';

import type { TableBuilder } from '../types';

const assetNames = [
  'Депозитний банківський рахунок 2%',
  'Банківське золото 1%',
  'Накопичувальне страхування',
  'Ризикове страхування',
  'Інтелектуальна власність',
];

export const buildAssetsTable: TableBuilder<PlayerLegendData> = (data) => ({
  caption: 'Таблиця Активів',
  head: ['Активи', 'Сума активів', 'Пасивний дохід (ПД)'],
  body: Object.values(data.assets).map((asset, index) => [
    assetNames[index],
    asset.assetAmount,
    asset.assetIncome,
  ]),
});
