import { useState } from 'react';

import { Check } from 'lucide-react';

import { Button, Flex, Group, TextInput } from '@mantine/core';

import { type DealMutations, type DealPermissions } from '../../hooks';
import type { InvestmentDealFullView } from '../../types';

interface ParticipantRowProps {
  participant: InvestmentDealFullView['participants'][number];
  permissions: DealPermissions;
  mutations: DealMutations;
}

export const ParticipantRow = ({
  participant,
  permissions,
}: ParticipantRowProps) => {
  const [note, setNote] = useState<string>('');

  return (
    <Flex gap="md" justify="space-between" align="flex-end">
      <TextInput
        size="md"
        label={participant.displayName}
        value={participant.note || note}
        onChange={(e) => setNote(e.currentTarget.value)}
        placeholder={`Частка ${participant.displayName}`}
        disabled={
          !permissions.isNoteBelongToUser(participant.userId) ||
          participant.isNoteConfirmed
        }
      />
      <Group>
        {participant.isNoteConfirmed ? (
          <Check />
        ) : (
          <Button size="md" variant="default" disabled={Boolean(!note)}>
            Підписати
          </Button>
        )}
        {permissions.isOwner && <Button color="yellow" />}
        {permissions.isOwner && <Button />}
      </Group>
    </Flex>
  );
};
