import { Button, NumberInput, Table, type TableProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { cardsQueryOptions } from '@/features/cards/query-options';
import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { usePlayerMeta } from '@/features/player-state/stores';
import { usePlayerFinances } from '@/features/player-state/stores/playerFinancesStore';
import type { EditableVerticalTableSchema } from '@/features/tables/models';

import { getByPath } from '@/shared/utils/path';

interface GeneralInfoEditableTableProps extends Omit<TableProps, 'data'> {
  data: EditableVerticalTableSchema;
}

export const GeneralInfoEditableTable = ({
  data,
  ...props
}: GeneralInfoEditableTableProps) => {
  const store = usePlayerFinances();
  const gameSessionUsersId = useGameSessionUsersId();
  const playerLegendId = usePlayerMeta((state) => state.playerLegendId);

  const { data: playerLegendCardsRow } = useQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...cardsQueryOptions.getCardByIdQueryOption(playerLegendId!),
    enabled: !!playerLegendId,
  });

  return (
    <>
      <Button
        variant="default"
        onClick={() => store.save(gameSessionUsersId)}
        disabled={!store.isDirty}
      >
        Зберегти
      </Button>
      <Table variant="vertical" {...props}>
        <Table.Caption>{data.caption}</Table.Caption>

        <Table.Tbody>
          {data.rows.map((row) => (
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
