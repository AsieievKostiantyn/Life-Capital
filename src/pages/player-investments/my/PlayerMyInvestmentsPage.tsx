import { Container, Flex, Title } from '@mantine/core';

import {
  PlayerBusinessEditableTable,
  PlayerSharesEditableTable,
} from '@/features/investments';

export const PlayerMyInvestmentsPage = () => {
  return (
    <Container maw={600} w="100%" px="0">
      <Title order={2} ta="center" my="sm">
        Мої інвестиції
      </Title>
      <Flex direction="column" gap="xl" wrap="wrap">
        <PlayerBusinessEditableTable />
        <PlayerSharesEditableTable />
      </Flex>
    </Container>
  );
};
