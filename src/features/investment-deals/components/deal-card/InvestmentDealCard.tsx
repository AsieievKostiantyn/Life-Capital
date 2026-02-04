import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ExternalLink } from 'lucide-react';

import {
  Button,
  Card,
  Flex,
  NavLink as MantineNavLink,
  Text,
} from '@mantine/core';

import { InvestmentCardBase } from '@/features/investments';

import { ConfirmModal, showErrorNotification } from '@/shared/ui';

import { useDealMutations, useDealPermissions } from '../../hooks';
import type { InvestmentDealFullView } from '../../types';
import { ParticipantRow } from '../participant-row';

interface InvestmentDealCardProps {
  deal: InvestmentDealFullView;
}

export const InvestmentDealCard = ({ deal }: InvestmentDealCardProps) => {
  const permissions = useDealPermissions(deal);
  const mutations = useDealMutations(deal.dealId);

  const [confirmDealOpened, setConfirmDealOpened] = useState(false);

  const handleConfirmDeal = () => {
    if (!deal.participants.every((value) => value.notes))
      showErrorNotification(
        'Помилка підтвердження угоди',
        'Не всі гравці підтвердили свою частку'
      );

    mutations.confirmDealMutation.mutate(undefined, {
      onSuccess: () => setConfirmDealOpened(false),
    });
  };

  if (deal.status !== 'negotiation')
    return (
      <Card bd="1px solid rgba(221, 146, 6, 0.845)" radius="md" p="md">
        <Flex justify="space-between" align="center">
          <Text fw={800} size="lg">
            {deal.card.data.title}
          </Text>
          <MantineNavLink
            component={Link}
            to={'../my'}
            label="Підписано"
            rightSection={<ExternalLink />}
            color="green"
            variant="subtle"
            active
            w={'fit-content'}
            styles={{
              label: {
                fontSize: '18px',
              },
            }}
          />
        </Flex>
      </Card>
    );

  return (
    <>
      <ConfirmModal
        opened={confirmDealOpened}
        onClose={() => setConfirmDealOpened(false)}
        title="Підтвердити угоду"
        onConfirm={handleConfirmDeal}
        confirmLabel="Підтвердити"
        confirmProps={{
          loading: mutations.setDealOwner.isPending,
        }}
      >
        <Text>Ви впевнені, що хочете підтвердити угоду?</Text>
        <Text mt="md" fw={700}>
          Після підтвердження ви не зможете вносити жодних змін
        </Text>
      </ConfirmModal>

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

              <Button
                variant="default"
                disabled={!permissions.isOwner}
                onClick={() => setConfirmDealOpened(true)}
              >
                Підписати угоду
              </Button>
            </Flex>
          </>
        }
      />
    </>
  );
};
