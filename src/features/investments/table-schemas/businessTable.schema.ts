import type { EditableHorizontalTableSchema } from '@/features/tables/models';

export type PlayerBusinessEditableTableRow = {
  code: string;
  firstPayment: number;
  credit: number;
  cost: number;
  passiveIncome: number;
};

export const createPlayerBusinessEditableTableSchema = (
  rowsCount: number
): EditableHorizontalTableSchema<PlayerBusinessEditableTableRow> => {
  return {
    caption: 'Бізнес і нерухомість',
    columns: [
      {
        key: 'code',
        label: 'Код',
        editable: true,
        getPath: (rowId) => `business.${rowId}.code`,
      },
      {
        key: 'firstPayment',
        label: 'Перший внесок',
        editable: true,
        getPath: (rowId) => `business.${rowId}.firstPayment`,
      },
      {
        key: 'credit',
        label: 'Кредит',
        editable: true,
        getPath: (rowId) => `business.${rowId}.credit`,
      },
      {
        key: 'cost',
        label: 'Вартість',
        editable: true,
        getPath: (rowId) => `business.${rowId}.cost`,
      },
      {
        key: 'passiveIncome',
        label: 'Пасивний дохід',
        editable: true,
        getPath: (rowId) => `business.${rowId}.passiveIncome`,
      },
    ],
    rows: Array.from({ length: rowsCount }, (_, index) => ({
      id: String(index),
    })),
  };
};
