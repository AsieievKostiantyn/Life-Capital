import { Button, Flex, Text } from '@mantine/core';

import { InvestmentCardBase } from '@/features/investments';

import { useDealMutations, useDealPermissions } from '../../hooks';
import type { InvestmentDealFullView } from '../../types';
import { ParticipantRow } from '../participant-row';

interface InvestmentDealCardProps {
  deal: InvestmentDealFullView;
}

export const InvestmentDealCard = ({ deal }: InvestmentDealCardProps) => {
  const permissions = useDealPermissions(deal);
  const mutations = useDealMutations(deal.dealId);

  return (
    <>
      <InvestmentCardBase
        investment={deal.card.data}
        actions={
          <>
            <Flex direction="column" gap="xl">
              <Flex direction="column" gap="md">
                {deal.participants.map((participant) => (
                  <ParticipantRow
                    key={participant.userId}
                    participant={participant}
                    permissions={permissions}
                    mutations={mutations}
                  />
                ))}
              </Flex>

              {deal.status === 'confirmed' ? (
                <Text>Підписано</Text>
              ) : (
                <Button variant="default" disabled={!permissions.isOwner}>
                  Підписати угоду
                </Button>
              )}
            </Flex>
          </>
        }
      />
    </>
  );
};
