import { Table, type TableProps } from '@mantine/core';

import type { CreditTableRow } from '@/features/player-legend/table-schemas/credits.schema';
import type { HorizontalTableSchema } from '@/features/tables/models';

interface CreditsTableProps extends Omit<TableProps, 'data'> {
  data: HorizontalTableSchema<CreditTableRow>;
}

export const CreditsTable = ({ data, ...props }: CreditsTableProps) => {
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
