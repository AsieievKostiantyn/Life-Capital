import { Table, type TableProps } from '@mantine/core';

import type { AssetTableRow } from '@/features/player-legend/table-schemas/assets.schema';
import type { HorizontalTableSchema } from '@/features/tables/models';

interface AssetsTableProps extends Omit<TableProps, 'data'> {
  data: HorizontalTableSchema<AssetTableRow>;
}

export const AssetsTable = ({ data, ...props }: AssetsTableProps) => {
  return (
    <Table {...props}>
      <Table.Caption>{data.caption}</Table.Caption>
      <Table.Thead>
        <Table.Tr>
          {data.columns.map((column) => (
            <Table.Th key={column.key}>{column.label}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {data.rows.map((row) => (
          <Table.Tr key={row.id}>
            {data.columns.map((col) => (
              <Table.Td key={col.key}>{row.data[col.key]}</Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
