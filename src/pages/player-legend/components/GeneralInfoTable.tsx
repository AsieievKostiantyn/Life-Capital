import { Table, type TableProps } from '@mantine/core';

import type { GeneralInfoTableRowValue } from '@/features/player-legend/table-schemas/generalInfo.schema';
import type { VerticalTableSchema } from '@/features/tables/models';

interface GeneralInfoTableProps extends Omit<TableProps, 'data'> {
  data: VerticalTableSchema<GeneralInfoTableRowValue>;
}

export const GeneralInfoTable = ({ data, ...props }: GeneralInfoTableProps) => {
  return (
    <Table variant="vertical" {...props}>
      <Table.Caption>{data.caption}</Table.Caption>

      <Table.Tbody>
        {data.rows.map((row) => (
          <Table.Tr key={row.label}>
            <Table.Th w={320}>{row.label}</Table.Th>
            <Table.Td>{row.value}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
