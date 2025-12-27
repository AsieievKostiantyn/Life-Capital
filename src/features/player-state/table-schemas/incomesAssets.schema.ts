import type { EditableHorizontalTableSchema } from '@/features/tables/models';

export type EditableIncomeAssetsTableRow = {
  name: string;
  assetAmount: null;
  assetIncome: null;
};

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
};

export const createEditableAssetsTableSchema =
  (): EditableHorizontalTableSchema<EditableIncomeAssetsTableRow> => ({
    caption: 'Таблиця активів',

    columns: [
      {
        key: 'name',
        label: 'Актив',
      },
      {
        key: 'assetAmount',
        label: 'Сума',
        editable: true,
        getPath: (assetKey) => `assets.${assetKey}.assetAmount`,
        getHintPath: (assetKey) => `assets.${assetKey}.assetAmount`,
      },
      {
        key: 'assetIncome',
        label: 'Пасивний дохід',
        editable: true,
        getPath: (assetKey) => `assets.${assetKey}.assetIncome`,
        getHintPath: (assetKey) => `assets.${assetKey}.assetIncome`,
      },
    ],

    rows: ASSETS_ORDER.map((key) => ({
      id: key,
      data: {
        name: assetLabels[key],
        assetAmount: null,
        assetIncome: null,
      },
    })),
  });
