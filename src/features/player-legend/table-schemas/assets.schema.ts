import type { PlayerLegendCardRow } from '@/features/player-legend/types';
import type { HorizontalTableSchema } from '@/features/tables/models';

const ASSETS_ORDER = [
  'deposit',
  'gold',
  'savingsInsurance',
  'riskInsurance',
  'intellectualProperty',
] as const;

type AssetKey = (typeof ASSETS_ORDER)[number];

const assetLabels: Record<AssetKey, string> = {
  deposit: 'Депозитний банківський рахунок 2%',
  gold: 'Банківське золото 1%',
  savingsInsurance: 'Накопичувальне страхування',
  riskInsurance: 'Ризикове страхування',
  intellectualProperty: 'Інтелектуальна власність',
} as const;

export type AssetTableRow = {
  name: string;
  assetAmount: number;
  assetIncome: number;
};

export const createAssetsTableSchema = (
  data: PlayerLegendCardRow['data']['assets']
): HorizontalTableSchema<AssetTableRow> => ({
  caption: 'Таблиця активів',
  columns: [
    { key: 'name', label: 'Активи' },
    { key: 'assetAmount', label: 'Сума активів' },
    { key: 'assetIncome', label: 'Пасивний дохід (ПД)' },
  ],
  rows: ASSETS_ORDER.map((key) => {
    const asset = data[key];

    return {
      id: key,
      data: {
        name: assetLabels[key],
        assetAmount: asset.assetAmount,
        assetIncome: asset.assetIncome,
      },
    };
  }),
});
