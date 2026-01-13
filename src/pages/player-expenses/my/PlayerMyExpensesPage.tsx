import { useState } from 'react';

import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Indicator,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { cardsQueryOptions } from '@/features/cards/query-options';
import type { CardsRow, ExpenseCard } from '@/features/cards/types/cardTypes';
import { useGameSessionId } from '@/features/game-session/hooks';
import { playerStateMutationOptions } from '@/features/player-state/mutation-options';
import { usePlayerMeta } from '@/features/player-state/stores';

export const PlayerMyExpensesPage = () => {
  const [isBigExpensesUsed] = useState(false);
  const gameSessionId = useGameSessionId();
  const { user } = useAuthStrict();
  const expensesList = usePlayerMeta((state) => state.expensesList);

  const expensesOrderMap = new Map(
    expensesList.map((id, index) => [id, index])
  );

  const { data: expensesRowsList } = useQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...cardsQueryOptions.getCardsByIdQueryOption(expensesList!),
    enabled: !!expensesList,
  });

  let sortedExpensesRowsList: CardsRow<ExpenseCard>[] = [];

  if (expensesRowsList) {
    sortedExpensesRowsList = [...expensesRowsList].sort(
      (a, b) =>
        (expensesOrderMap.get(a.id) ?? 0) - (expensesOrderMap.get(b.id) ?? 0)
    );
  }

  const setExpenseMutation = useMutation({
    ...playerStateMutationOptions.setExpenseMutationOption,
  });

  const setBigExpenseMutation = useMutation({
    ...playerStateMutationOptions.setBigExpenseMutationOption,
  });

  const handleSetExpense = () => {
    if (isBigExpensesUsed) {
      setBigExpenseMutation.mutate({
        gameSessionId,
        userId: user.id,
      });
    } else {
      setExpenseMutation.mutate({
        gameSessionId,
        userId: user.id,
      });
    }
  };

  return (
    <>
      <Container maw={800} w="100%" px="0" mt="md">
        <Stack gap="md">
          <Flex justify="center">
            <Button
              variant="default"
              onClick={handleSetExpense}
              disabled={setExpenseMutation.isPending}
            >
              Отримати витрату
            </Button>
          </Flex>

          <Divider />

          {sortedExpensesRowsList && sortedExpensesRowsList.length === 0 ? (
            <Text c="dimmed" ta="center">
              У вас немає витрат
            </Text>
          ) : (
            <Flex gap="sm" direction={'column-reverse'}>
              {sortedExpensesRowsList?.map((card, index) => {
                const { amountOfExpenses, description } = card.data;

                return (
                  <Indicator
                    disabled={sortedExpensesRowsList.length - 1 !== index}
                    key={card.id}
                    position="top-center"
                    inline
                    color="red"
                    label="Остання витрата"
                    size={16}
                  >
                    <Paper key={card.id} withBorder radius="md" p="sm">
                      <Group justify="space-between" align="flex-start">
                        <Text maw="80%" w="100%" fw={500}>
                          {description}
                        </Text>

                        <Text c="red" fw={600}>
                          −{amountOfExpenses}
                        </Text>
                      </Group>
                    </Paper>
                  </Indicator>
                );
              })}
            </Flex>
          )}
        </Stack>
      </Container>
    </>
  );
};
