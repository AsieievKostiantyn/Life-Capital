import { Container, Title } from '@mantine/core';

import { PlayerIncomesTables } from './components';

export const PlayerIncomesPage = () => {
  return (
    <>
      <Container maw={600} w="100%" px="0">
        <Title order={2} ta="center" my="sm">
          Доходи
        </Title>
        <PlayerIncomesTables />
      </Container>
    </>
  );
};
