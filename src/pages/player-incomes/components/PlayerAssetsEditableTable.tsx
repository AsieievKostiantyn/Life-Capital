import { NumberInput, Table, type TableProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { cardsQueryOptions } from '@/features/cards/query-options';
import {
  usePlayerFinances,
  usePlayerMeta,
} from '@/features/player-state/stores';
import type { EditableIncomeAssetsTableRow } from '@/features/player-state/table-schemas/incomesAssets.schema';
import type { EditableHorizontalTableSchema } from '@/features/tables/models';

import { getByPath } from '@/shared/utils/path';

interface PlayerAssetsEditableTableProps extends Omit<TableProps, 'data'> {
  data: EditableHorizontalTableSchema<EditableIncomeAssetsTableRow>;
}

export const PlayerAssetsEditableTable = ({
  data,
  ...props
}: PlayerAssetsEditableTableProps) => {
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
        <Table.Caption>{data.caption}</Table.Caption>

        <Table.Thead>
          <Table.Tr>
            {data.columns.map((col) => (
              <Table.Th key={col.key}>{col.label}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data.rows.map((row) => (
            <Table.Tr key={row.id}>
              {data.columns.map((col) => {
                if (!col.editable) {
                  const value = row.data?.[col.key];
                  return <Table.Td key={col.key}>{value}</Table.Td>;
                }

                const path = col.getPath?.(row.id);
                if (!path) return <Table.Td key={col.key} />;

                const value = getValueByPath<number>(path);
                const hint = col.getHintPath
                  ? getByPath?.(
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
