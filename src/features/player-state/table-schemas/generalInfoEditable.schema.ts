import type {
  EditableVerticalTableRow,
  EditableVerticalTableSchema,
} from '@/features/tables/models';

const GENERAL_INFO_ROWS = [
  {
    path: 'generalInfo.cash',
    label: 'Готівка',
  },
  {
    path: 'generalInfo.children',
    label: 'Кількість дітей',
    hintPath: 'children',
  },
  {
    path: 'generalInfo.monthlyTotalIncome',
    label: 'Щомісячні загальні доходи (ЗД)',
    hintPath: 'monthlyTotalIncome',
  },
  {
    path: 'generalInfo.monthlyTotalExpenses',
    label: 'Щомісячні загальні витрати (ЗВ)',
    hintPath: 'monthlyTotalExpenses',
  },
  {
    path: 'generalInfo.monthlyFreeFunds',
    label: 'Щомісячні вільні кошти (ВК)',
    hintPath: 'monthlyFreeFunds',
  },
] satisfies EditableVerticalTableRow[];

export const createGeneralInfoEditableTableSchema =
  (): EditableVerticalTableSchema => ({
    caption: 'Таблиця з загальною інформацією',
    rows: GENERAL_INFO_ROWS,
  });
