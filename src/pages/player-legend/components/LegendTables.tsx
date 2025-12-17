import { Flex, Table } from '@mantine/core';

import {
  buildAssetsTable,
  buildCreditsTable,
  buildExpensesTable,
  buildGeneralInfoTable,
} from '@/features/player-legend/table-data-builders';
import type { PlayerLegendData } from '@/features/player-legend/types';

import { ExpansesTable } from './ExpensesTable';
import { GeneralInfoTable } from './GeneralInfoTable';

interface LegendTablesProps {
  playerLegend: PlayerLegendData;
}

export const LegendTables = ({ playerLegend }: LegendTablesProps) => {
  return (
    <>
      <Flex direction="column" gap="xl" wrap="wrap">
        <GeneralInfoTable
          rows={buildGeneralInfoTable(playerLegend)}
          withTableBorder
          withColumnBorders
        />
        <Table
          data={buildAssetsTable(playerLegend)}
          withTableBorder
          withColumnBorders
        />
        <ExpansesTable
          rows={buildExpensesTable(playerLegend)}
          withTableBorder
          withColumnBorders
        />
        <Table
          data={buildCreditsTable(playerLegend)}
          withTableBorder
          withColumnBorders
        />
      </Flex>
    </>
  );
};
