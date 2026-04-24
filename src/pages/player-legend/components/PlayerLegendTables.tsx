import { Flex } from '@mantine/core';

import {
  createAssetsTableSchema,
  createCreditsTableSchema,
  createExpensesTableSchema,
  createGeneralInfoTableSchema,
} from '@/features/player-legend/table-schemas';
import type { PlayerLegendCardRow } from '@/features/player-legend/types';

import { AssetsTable } from './AssetsTable';
import { CreditsTable } from './CreditsTable';
import { ExpansesTable } from './ExpensesTable';
import { GeneralInfoTable } from './GeneralInfoTable';

interface LegendTablesProps {
  playerLegend: PlayerLegendCardRow['data'];
}

export const PlayerLegendTables = ({ playerLegend }: LegendTablesProps) => {
  return (
    <>
      <Flex direction="column" gap="xl" wrap="wrap">
        <GeneralInfoTable
          data={createGeneralInfoTableSchema(playerLegend)}
          withTableBorder
          withColumnBorders
        />
        <AssetsTable
          data={createAssetsTableSchema(playerLegend.assets)}
          withTableBorder
          withColumnBorders
        />
        <ExpansesTable
          data={createExpensesTableSchema(playerLegend.expenses)}
          withTableBorder
          withColumnBorders
        />
        <CreditsTable
          data={createCreditsTableSchema(playerLegend.expenses.credits)}
          withTableBorder
          withColumnBorders
        />
      </Flex>
    </>
  );
};
