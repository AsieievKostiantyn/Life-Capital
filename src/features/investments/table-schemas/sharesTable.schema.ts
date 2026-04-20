import type { EditableHorizontalTableSchema } from '@/features/tables/models';

export type PlayerSharesEditableTableRow = {
  code: string;
  costOfTheSharePackage: number;
  costPerShare: number;
  numberOfShares: number;
};

export const createPlayerSharesEditableTableSchema = (
  rowsCount: number
): EditableHorizontalTableSchema<PlayerSharesEditableTableRow> => {
  return {
    caption: 'Таблиця цінних паперів',
    columns: [
      {
        key: 'code',
        label: 'Код',
        editable: true,
        getPath: (rowId) => `shares.${rowId}.code`,
      },
      {
        key: 'costOfTheSharePackage',
        label: 'Вартість пакета',
        editable: true,
        getPath: (rowId) => `shares.${rowId}.costOfTheSharePackage`,
      },
      {
        key: 'costPerShare',
        label: 'Вартість однієї акції (пая)',
        editable: true,
        getPath: (rowId) => `shares.${rowId}.costPerShare`,
      },
      {
        key: 'numberOfShares',
        label: 'Кількість',
        editable: true,
        getPath: (rowId) => `shares.${rowId}.numberOfShares`,
      },
    ],
    rows: Array.from({ length: rowsCount }, (_, index) => ({
      id: String(index),
    })),
  };
};
