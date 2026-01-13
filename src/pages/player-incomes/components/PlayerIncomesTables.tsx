import { Flex, NumberInput, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { cardsQueryOptions } from '@/features/cards/query-options';
import {
  usePlayerFinances,
  usePlayerMeta,
} from '@/features/player-state/stores';
import { createEditableAssetsTableSchema } from '@/features/player-state/table-schemas/incomesAssets.schema';
import { createPlayerBusinessEditableTableSchema } from '@/features/player-state/table-schemas/incomesBusiness.shema';
import { createIncomesGeneralEditableTableSchema } from '@/features/player-state/table-schemas/incomesGeneral.schema';

import { IncomesGeneralEditableTable } from './IncomesGeneralEditableTable';
import { PlayerAssetsEditableTable } from './PlayerAssetsEditableTable';
import { PlayerBusinessEditableTable } from './PlayerBusinessEditableTable';

export const PlayerIncomesTables = () => {
  const setValueByPath = usePlayerFinances((s) => s.setValueByPath);
  const monthlyTotalIncomes = usePlayerFinances(
    (s) => s.draft.generalInfo?.monthlyTotalIncome
  );
  const playerLegendId = usePlayerMeta((state) => state.playerLegendId);

  const { data: playerLegendCardsRow } = useQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...cardsQueryOptions.getCardByIdQueryOption(playerLegendId!),
    enabled: !!playerLegendId,
  });

  const businessTableRowCount =
    usePlayerFinances((s) => Object.keys(s.draft.business ?? {}).length) + 1;

  return (
    <>
      <Flex direction="column" gap="xl" wrap="wrap">
        <IncomesGeneralEditableTable
          data={createIncomesGeneralEditableTableSchema()}
          withTableBorder
          withColumnBorders
        />
        <PlayerAssetsEditableTable
          data={createEditableAssetsTableSchema()}
          withTableBorder
          withColumnBorders
        />
        <PlayerBusinessEditableTable
          schema={createPlayerBusinessEditableTableSchema(
            businessTableRowCount
          )}
          withTableBorder
          withColumnBorders
        />
        <Table variant="vertical" withTableBorder withColumnBorders>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>Щомісячні загальні доходи (ЗД)</Table.Th>
              <Table.Td>
                <NumberInput
                  hideControls
                  value={monthlyTotalIncomes ?? ''}
                  placeholder={playerLegendCardsRow?.data.monthlyTotalIncome}
                  onChange={(v) =>
                    setValueByPath('generalInfo.monthlyTotalIncome', v)
                  }
                />
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Flex>
    </>
  );
};
