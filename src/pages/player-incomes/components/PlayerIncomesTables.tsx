import { Flex, NumberInput, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { CARD_TYPES } from '@/features/cards/constants/constants';
import { cardsQueryOptions } from '@/features/cards/query-options';
import { PlayerBusinessEditableTable } from '@/features/investments';
import {
  usePlayerFinances,
  usePlayerMeta,
} from '@/features/player-state/stores';
import { createEditableAssetsTableSchema } from '@/features/player-state/table-schemas/incomesAssets.schema';
import { createIncomesGeneralEditableTableSchema } from '@/features/player-state/table-schemas/incomesGeneral.schema';

import { IncomesGeneralEditableTable } from './IncomesGeneralEditableTable';
import { PlayerAssetsEditableTable } from './PlayerAssetsEditableTable';

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
        <PlayerBusinessEditableTable />
        <Table variant="vertical" withTableBorder withColumnBorders>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>Щомісячні загальні доходи (ЗД)</Table.Th>
              <Table.Td>
                <NumberInput
                  hideControls
                  value={monthlyTotalIncomes ?? ''}
                  placeholder={
                    playerLegendCardsRow &&
                    playerLegendCardsRow.type === CARD_TYPES.PLAYER_LEGEND
                      ? String(playerLegendCardsRow.data.monthlyTotalIncome)
                      : ''
                  }
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
