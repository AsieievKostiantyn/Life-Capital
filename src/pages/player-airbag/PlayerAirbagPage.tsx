import { Container, Flex, NumberInput, Table, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { CARD_TYPES } from '@/features/cards/constants/constants';
import { cardsQueryOptions } from '@/features/cards/query-options';
import {
  usePlayerFinances,
  usePlayerMeta,
} from '@/features/player-state/stores';
import { createAirbagEditableTableSchema } from '@/features/player-state/table-schemas/airbag.schema';
import { EditableCell } from '@/features/tables/components/EditableCell';

export const PlayerAirbagPage = () => {
  const schema = createAirbagEditableTableSchema();
  const setValueByPath = usePlayerFinances((s) => s.setValueByPath);
  const airbagAmount = usePlayerFinances((s) => s.draft.airbagAmount);
  const playerLegendId = usePlayerMeta((state) => state.playerLegendId);

  const { data: playerLegendCardsRow } = useQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...cardsQueryOptions.getCardByIdQueryOption(playerLegendId!),
    enabled: !!playerLegendId,
  });

  return (
    <>
      <Container maw={600} w="100%" px="0">
        <Title order={2} ta="center" my="sm">
          Подушка безпеки
        </Title>
        <Flex direction="column" gap="xl" wrap="wrap">
          <Table>
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
                    if (!col.editable) {
                      return <Table.Td key={col.key}>{row.id}</Table.Td>;
                    }

                    const path = col.getPath?.(row.id);

                    if (!col.editable || !path) {
                      return <Table.Td key={col.key} />;
                    }

                    return (
                      <Table.Td key={col.key}>
                        <EditableCell
                          path={path}
                          type={
                            col.key === 'sourceOfIncome' ? 'text' : 'number'
                          }
                        />
                      </Table.Td>
                    );
                  })}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Table variant="vertical" withTableBorder withColumnBorders>
            <Table.Tbody>
              <Table.Tr>
                <Table.Th>Значення подушки безпеки</Table.Th>
                <Table.Td>
                  {playerLegendCardsRow?.type === CARD_TYPES.PLAYER_LEGEND && (
                    <NumberInput
                      hideControls
                      value={airbagAmount ?? ''}
                      placeholder={`6 * ${playerLegendCardsRow?.data.monthlyTotalExpenses}`}
                      onChange={(v) => setValueByPath('airbagAmount', v)}
                    />
                  )}
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Flex>
      </Container>
    </>
  );
};
