import { NumberInput, Table, type TableProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { cardsQueryOptions } from '@/features/cards/query-options';
import {
  usePlayerFinances,
  usePlayerMeta,
} from '@/features/player-state/stores';
import type { EditableVerticalTableSchema } from '@/features/tables/models';

import { getByPath } from '@/shared/utils/path';

interface ExpensesGeneralEditableTableProps extends Omit<TableProps, 'data'> {
  schema: EditableVerticalTableSchema;
}

export const ExpensesGeneralEditableTable = ({
  schema,
  ...props
}: ExpensesGeneralEditableTableProps) => {
  const getValueByPath = usePlayerFinances((s) => s.getValueByPath);
  const setValueByPath = usePlayerFinances((s) => s.setValueByPath);

  const playerLegendId = usePlayerMeta((state) => state.playerLegendId);

  const { data: playerLegendCardsRow } = useQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...cardsQueryOptions.getCardByIdQueryOption(playerLegendId!),
    enabled: !!playerLegendId,
  });

  return (
    <>
      <Table variant="vertical" {...props}>
        <Table.Caption>{schema.caption}</Table.Caption>

        <Table.Tbody>
          {schema.rows.map((row) => (
            <Table.Tr key={row.label}>
              <Table.Th w={320}>{row.label}</Table.Th>
              <Table.Td>
                <NumberInput
                  hideControls
                  placeholder={
                    row.hintPath
                      ? row.hintPath === 'expenses.childExpenses'
                        ? `${playerLegendCardsRow?.data.children} * ${getByPath(playerLegendCardsRow?.data, row.hintPath)}`
                        : getByPath(playerLegendCardsRow?.data, row.hintPath)
                      : ''
                  }
                  value={getValueByPath(row.path)}
                  onChange={(v) => setValueByPath(row.path, v)}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};
