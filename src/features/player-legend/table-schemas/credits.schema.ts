import type { PlayerLegendCardRow } from '@/features/player-legend/types';
import type { HorizontalTableSchema } from '@/features/tables/models';

const CREDITS_ORDER = [
  'realEstate',
  'car',
  'machinery',
  'furniture',
  'otherCredits',
] as const;

type CreditKey = (typeof CREDITS_ORDER)[number];

const creditLabels: Record<CreditKey, string> = {
  realEstate: 'На нерухомість',
  car: 'На автомобіль',
  machinery: 'На побутову техніку',
  furniture: 'На меблі',
  otherCredits: 'Інші кредити, 3%',
} as const;

export type CreditTableRow = {
  name: string;
  amountOfCredit: number;
  interest: number;
};

export const createCreditsTableSchema = (
  data: PlayerLegendCardRow['data']['expenses']['credits']
): HorizontalTableSchema<CreditTableRow> => ({
  caption: 'Таблиця кредитів',
  columns: [
    { key: 'name', label: 'Найменування кредитів (пасиви)' },
    { key: 'amountOfCredit', label: 'Сума кредитів' },
    { key: 'interest', label: 'Сплата, %' },
  ],
  rows: CREDITS_ORDER.map((key) => {
    const credit = data[key];

    return {
      id: key,
      data: {
        name: creditLabels[key],
        amountOfCredit: credit.amountOfCredit,
        interest: credit.interest,
      },
    };
  }),
});
