import { Table, type TableProps } from '@mantine/core';

import type { VerticalRow } from '@/features/player-legend/types';

interface GeneralInfoTableProps extends TableProps {
  rows: VerticalRow[];
}

export const ExpansesTable = ({ rows, ...props }: GeneralInfoTableProps) => {
  return (
    <Table variant="vertical" {...props}>
      <Table.Caption>Таблиця витрат</Table.Caption>

      <Table.Tbody>
        {rows.map((row) => (
          <Table.Tr key={row.label}>
            <Table.Th w={320}>{row.label}</Table.Th>
            <Table.Td>{row.value}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
