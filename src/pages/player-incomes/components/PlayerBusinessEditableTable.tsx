import { Table, type TableProps } from '@mantine/core';

import type { PlayerBusinessEditableTableRow } from '@/features/player-state/table-schemas/incomesBusiness.shema';
import { EditableCell } from '@/features/tables/components/EditableCell';
import type { EditableHorizontalTableSchema } from '@/features/tables/models';

interface PlayerBusinessEditableTableProps extends Omit<TableProps, 'data'> {
  schema: EditableHorizontalTableSchema<PlayerBusinessEditableTableRow>;
}

export const PlayerBusinessEditableTable = ({
  schema,
  ...props
}: PlayerBusinessEditableTableProps) => {
  return (
    <>
      <Table {...props}>
        {schema.caption && <Table.Caption>{schema.caption}</Table.Caption>}

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
                const path = col.getPath?.(row.id);

                if (!col.editable || !path) {
                  return <Table.Td key={col.key} />;
                }

                return (
                  <Table.Td key={col.key}>
                    <EditableCell
                      path={path}
                      type={col.key === 'code' ? 'text' : 'number'}
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
