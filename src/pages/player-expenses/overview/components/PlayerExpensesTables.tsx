import { Flex, NumberInput, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { CARD_TYPES } from '@/features/cards/constants/constants';
import { cardsQueryOptions } from '@/features/cards/query-options';
import {
  usePlayerFinances,
  usePlayerMeta,
} from '@/features/player-state/stores';
import { createExpensesCreditsEditableTableSchema } from '@/features/player-state/table-schemas/expensesCredits.schema';
import { createExpensesGeneralEditableTableSchema } from '@/features/player-state/table-schemas/expensesGeneral.schema';

import { ExpensesCreditsEditableTable } from './ExpensesCreditsEditableTable';
import { ExpensesGeneralEditableTable } from './ExpensesGeneralEditableTable';

export const PlayerExpensesTables = () => {
  const setValueByPath = usePlayerFinances((s) => s.setValueByPath);
  const monthlyTotalExpenses = usePlayerFinances(
    (s) => s.draft.generalInfo?.monthlyTotalExpenses
  );
  const playerLegendId = usePlayerMeta((state) => state.playerLegendId);

  const { data: playerLegendCardsRow } = useQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...cardsQueryOptions.getCardByIdQueryOption(playerLegendId!),
    enabled: !!playerLegendId,
  });

  return (
    <Flex direction="column" gap="xl" wrap="wrap">
      <ExpensesGeneralEditableTable
        schema={createExpensesGeneralEditableTableSchema()}
        withTableBorder
        withColumnBorders
      />
      <ExpensesCreditsEditableTable
        schema={createExpensesCreditsEditableTableSchema()}
        withTableBorder
        withColumnBorders
      />
      <Table variant="vertical" withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>Щомісячні загальні витрати (ЗВ)</Table.Th>
            <Table.Td>
              <NumberInput
                hideControls
                value={monthlyTotalExpenses ?? ''}
                placeholder={
                  playerLegendCardsRow &&
                  playerLegendCardsRow.type === CARD_TYPES.PLAYER_LEGEND
                    ? String(playerLegendCardsRow.data.monthlyTotalIncome)
                    : ''
                }
                onChange={(v) =>
                  setValueByPath('generalInfo.monthlyTotalExpenses', v)
                }
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Flex>
  );
};
