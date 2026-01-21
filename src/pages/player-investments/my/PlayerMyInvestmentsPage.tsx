import { Container, Title } from '@mantine/core';

import { PlayerBusinessEditableTable } from '@/features/investments';

export const PlayerMyInvestmentsPage = () => {
  return (
    <Container maw={600} w="100%" px="0">
      <Title order={2} ta="center" my="sm">
        Мої інвестиції
      </Title>
      <PlayerBusinessEditableTable />
    </Container>
  );
};
