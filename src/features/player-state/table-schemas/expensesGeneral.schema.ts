import type {
  EditableVerticalTableRow,
  EditableVerticalTableSchema,
} from '@/features/tables/models';

const EXPENSES_GENERAL_ROWS = [
  {
    path: 'expenses.incomeTax',
    label: 'Податок на доходи',
    hintPath: 'expenses.incomeTax',
  },
  {
    path: 'expenses.utilities',
    label: 'Оплата комунальних послуг',
    hintPath: 'expenses.utilities',
  },
  {
    path: 'expenses.householdExpenses',
    label: 'Щомісячні побутові витрати',
    hintPath: 'expenses.householdExpenses',
  },
  {
    path: 'expenses.otherExpenses',
    label: 'Додаткові витрати',
    hintPath: 'expenses.otherExpenses',
  },
  {
    path: 'expenses.childExpenses',
    label: 'Витрати на дітей',
    hintPath: 'expenses.childExpenses',
  },
] satisfies EditableVerticalTableRow[];

export const createExpensesGeneralEditableTableSchema =
  (): EditableVerticalTableSchema => ({
    caption: 'Таблиця з загальними витратами',
    rows: EXPENSES_GENERAL_ROWS,
  });
