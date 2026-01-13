import { NumberInput, Table, type TableProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { cardsQueryOptions } from '@/features/cards/query-options';
import {
  usePlayerFinances,
  usePlayerMeta,
} from '@/features/player-state/stores';
import type { ExpensesCreditsTableRow } from '@/features/player-state/table-schemas/expensesCredits.schema';
import type { EditableHorizontalTableSchema } from '@/features/tables/models';

import { getByPath } from '@/shared/utils/path';

interface ExpensesCreditsEditableTableProps extends Omit<TableProps, 'data'> {
  schema: EditableHorizontalTableSchema<ExpensesCreditsTableRow>;
}

export const ExpensesCreditsEditableTable = ({
  schema,
  ...props
}: ExpensesCreditsEditableTableProps) => {
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
      <Table {...props}>
        <Table.Caption>{schema.caption}</Table.Caption>

        <Table.Thead>
          <Table.Tr>
            {schema.columns.map((col) => (
              <Table.Th key={col.key}>{col.label}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {schema.rows.map((row) => (
            <Table.Tr key={row.id}>
              {schema.columns.map((col) => {
                if (!col.editable) {
                  const value = row.data?.[col.key];
                  return <Table.Td key={col.key}>{value}</Table.Td>;
                }

                const path = col.getPath?.(row.id);
                if (!path) return <Table.Td key={col.key} />;

                const value = getValueByPath<number>(path);
                const hint = col.getHintPath
                  ? getByPath(
                      playerLegendCardsRow?.data,
                      col.getHintPath(row.id)
                    )
                  : undefined;

                return (
                  <Table.Td key={col.key}>
                    <NumberInput
                      hideControls
                      value={value ?? ''}
                      placeholder={hint}
                      onChange={(value) => setValueByPath(path, value)}
                    />
                  </Table.Td>
                );
              })}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};
