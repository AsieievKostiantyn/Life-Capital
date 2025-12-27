import type {
  EditableVerticalTableRow,
  EditableVerticalTableSchema,
} from '@/features/tables/models';

const GENERAL_INFO_ROWS = [
  {
    path: 'generalInfo.salary',
    label: 'Заробітня плата',
    hintPath: 'salary',
  },
  {
    path: 'generalInfo.childSupport',
    label: 'Допомога на дітей',
  },
] satisfies EditableVerticalTableRow[];

export const createIncomesGeneralEditableTableSchema =
  (): EditableVerticalTableSchema => ({
    caption: 'Таблиця з загальними доходами',
    rows: GENERAL_INFO_ROWS,
  });
