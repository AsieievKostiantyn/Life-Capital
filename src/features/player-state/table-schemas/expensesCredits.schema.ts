import type { EditableHorizontalTableSchema } from '@/features/tables/models';

export type ExpensesCreditsTableRow = {
  name: string;
  amountOfCredit: null;
  interest: null;
};

const CREDITS_ORDER = [
  'realEstate',
  'car',
  'machinery',
  'furniture',
  'otherCredits',
] as const;

type AssetKey = (typeof CREDITS_ORDER)[number];

const assetLabels: Record<AssetKey, string> = {
  realEstate: 'На нерухомість',
  car: 'На автомобіль',
  machinery: 'На побутову техніку',
  furniture: 'На меблі',
  otherCredits: 'Інші кредити 3%',
};

export const createExpensesCreditsEditableTableSchema =
  (): EditableHorizontalTableSchema<ExpensesCreditsTableRow> => ({
    caption: 'Таблиця кредитів',

    columns: [
      {
        key: 'name',
        label: 'Найменування кредитів (пасиви)',
      },
      {
        key: 'amountOfCredit',
        label: 'Сума кредитів',
        editable: true,
        getPath: (assetKey) => `credits.${assetKey}.amountOfCredit`,
        getHintPath: (assetKey) =>
          `expenses.credits.${assetKey}.amountOfCredit`,
      },
      {
        key: 'interest',
        label: 'Сплата, %',
        editable: true,
        getPath: (assetKey) => `credits.${assetKey}.interest`,
        getHintPath: (assetKey) => `expenses.credits.${assetKey}.interest`,
      },
    ],

    rows: CREDITS_ORDER.map((key) => ({
      id: key,
      data: {
        name: assetLabels[key],
        amountOfCredit: null,
        interest: null,
      },
    })),
  });
