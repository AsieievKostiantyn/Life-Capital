import { NumberInput, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { cardsQueryOptions } from '@/features/cards/query-options';
import { usePlayerMeta } from '@/features/player-state/stores';
import { usePlayerFinances } from '@/features/player-state/stores/playerFinancesStore';
import { createGeneralInfoEditableTableSchema } from '@/features/player-state/table-schemas/generalInfoEditable.schema';

import { getByPath } from '@/shared/utils/path';

export const GeneralInfoEditableTable = () => {
  const store = usePlayerFinances();
  const playerLegendId = usePlayerMeta((state) => state.playerLegendId);
  const schema = createGeneralInfoEditableTableSchema();

  const { data: playerLegendCardsRow } = useQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...cardsQueryOptions.getCardByIdQueryOption(playerLegendId!),
    enabled: !!playerLegendId,
  });

  return (
    <>
      <Table variant="vertical" withTableBorder withColumnBorders>
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
                      ? getByPath(playerLegendCardsRow?.data, row.hintPath)
                      : ''
                  }
                  value={store.getValueByPath(row.path)}
                  onChange={(v) => store.setValueByPath(row.path, v)}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};
