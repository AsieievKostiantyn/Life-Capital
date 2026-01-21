import { Table } from '@mantine/core';

import { usePlayerFinances } from '@/features/player-state/stores';
import { EditableCell } from '@/features/tables/components/EditableCell';

import { createPlayerBusinessEditableTableSchema } from '../table-schemas';

export const PlayerBusinessEditableTable = () => {
  const businessTableRowCount =
    usePlayerFinances((s) => Object.keys(s.draft.business ?? {}).length) + 1;

  const schema = createPlayerBusinessEditableTableSchema(businessTableRowCount);

  return (
    <>
      <Table withTableBorder withColumnBorders>
        {schema.caption && <Table.Caption>{schema.caption}</Table.Caption>}

        <Table.Thead>
          <Table.Tr>
            {schema.columns.map((col) => (
              <Table.Th key={col.key} ta="center">
                {col.label}
              </Table.Th>
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
