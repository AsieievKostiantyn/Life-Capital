import type { EditableHorizontalTableSchema } from '@/features/tables/models';

export type AirbagEditableTableRow = {
  rowNumber: number;
  sourceOfIncome: string;
  replenishment: number;
  accumulatedAmount: number;
};

export const createAirbagEditableTableSchema =
  (): EditableHorizontalTableSchema<AirbagEditableTableRow> => {
    return {
      caption: 'Таблиця подушки безпеки',
      columns: [
        {
          key: 'rowNumber',
          label: '№',
        },
        {
          key: 'sourceOfIncome',
          label: 'Джерело доходу',
          editable: true,
          getPath: (rowId) => `airbag.${rowId}.sourceOfIncome`,
        },
        {
          key: 'replenishment',
          label: 'Поповнення',
          editable: true,
          getPath: (rowId) => `airbag.${rowId}.replenishment`,
        },
        {
          key: 'accumulatedAmount',
          label: 'Накопичувальна сума',
          editable: true,
          getPath: (rowId) => `airbag.${rowId}.accumulatedAmount`,
        },
      ],
      rows: Array.from({ length: 10 }, (_, index) => ({
        id: String(index),
        rowNumber: index,
      })),
    };
  };
