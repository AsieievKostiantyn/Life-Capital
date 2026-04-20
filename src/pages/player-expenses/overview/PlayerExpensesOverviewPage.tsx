import { Container, Title } from '@mantine/core';

import { PlayerExpensesTables } from './components/PlayerExpensesTables';

export const PlayerExpensesOverviewPage = () => {
  return (
    <>
      <Container maw={600} w="100%" px="0">
        <Title order={2} ta="center" my="sm">
          Загальні Витрати
        </Title>
        <PlayerExpensesTables />
      </Container>
    </>
  );
};
