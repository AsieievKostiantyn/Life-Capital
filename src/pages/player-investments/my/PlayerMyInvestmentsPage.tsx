import { Container, Flex, Stack, Text, Title } from '@mantine/core';

import { usePlayerInvestmentDeals } from '@/features/investment-deals';
import {
  PlayerBusinessEditableTable,
  PlayerSharesEditableTable,
} from '@/features/investments';

import { MyInvestmentsList } from './components';

export const PlayerMyInvestmentsPage = () => {
  const deals = usePlayerInvestmentDeals();
  const confirmedDeals = deals.filter((deal) => deal.status !== 'negotiation');

  return (
    <Container maw={600} w="100%" px="0">
      <Flex direction="column" gap="xl" wrap="wrap">
        <PlayerBusinessEditableTable />
        <PlayerSharesEditableTable />
      </Flex>
      <Title order={2} ta="center" my="sm">
        Мої інвестиції
      </Title>
      {confirmedDeals.length > 0 ? (
        <Stack gap="md">
          <MyInvestmentsList deals={confirmedDeals} />
        </Stack>
      ) : (
        <Text ta="center">У вас немає жодної інвестиції</Text>
      )}
    </Container>
  );
};
