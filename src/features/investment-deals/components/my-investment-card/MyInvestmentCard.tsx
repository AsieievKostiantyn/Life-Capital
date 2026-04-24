import { useState } from 'react';

import { Crown } from 'lucide-react';

import { Box, Button, Card, Flex, Group, Text } from '@mantine/core';

import { InvestmentCardBase } from '@/features/investments';

import { ConfirmModal } from '@/shared/ui';

import { useDealMutations, useDealPermissions } from '../../hooks';
import type { InvestmentDealFullView } from '../../types';

interface MyInvestmentCardProps {
  deal: InvestmentDealFullView;
}

export const MyInvestmentCard = ({ deal }: MyInvestmentCardProps) => {
  const [sellInvestmentOpened, setSellInvestmentOpened] = useState(false);
  const permissions = useDealPermissions(deal);

  const { sellInvestment } = useDealMutations(deal.dealId);

  const handleSellInvestment = () => {
    if (!permissions.isOwner) return;

    sellInvestment.mutate(undefined, {
      onSuccess: () => setSellInvestmentOpened(false),
    });
  };

  if (deal.status === 'sold')
    return (
      <Card bd="1px solid rgba(221, 146, 6, 0.845)" radius="md" p="md">
        <Flex justify="space-between" align="center">
          <Text fw={800} size="lg">
            {deal.card.data.title}
          </Text>
          <Text w={'fit-content'} size="lg" c={'green'}>
            Продано
          </Text>
        </Flex>
      </Card>
    );

  return (
    <>
      <ConfirmModal
        opened={sellInvestmentOpened}
        onClose={() => setSellInvestmentOpened(false)}
        title="Підтвердити продаж"
        onConfirm={handleSellInvestment}
        confirmLabel="Продати"
        confirmProps={{
          loading: sellInvestment.isPending,
        }}
      >
        <Text>
          Ви впевнені, що хочете продати{' '}
          <Text fw={700} span>
            {deal.card.data.title}
          </Text>
        </Text>
        <Text mt="md" fw={700}>
          Після продажу ви не зможете ніяк взаємодіяти з інвестицією
        </Text>
      </ConfirmModal>
      <InvestmentCardBase
        investment={deal.card.data}
        actions={
          <>
            <Flex direction="column" gap="xl">
              <Flex direction="column" gap="sm">
                {deal.participants.map((participant) => (
                  <Group key={participant.userId} pos="relative">
                    {participant.userId === deal.ownerId && (
                      <Box pos="absolute" left="-34px" top="0px">
                        <Crown color="yellow" />
                      </Box>
                    )}
                    <Text>
                      {participant.displayName}:{' '}
                      <Text fw={700} span>
                        {participant.notes}
                      </Text>
                    </Text>
                  </Group>
                ))}
              </Flex>
              <Button
                variant="default"
                disabled={!permissions.isOwner}
                onClick={() => setSellInvestmentOpened(true)}
              >
                Продати
              </Button>
            </Flex>
          </>
        }
      />
    </>
  );
};
