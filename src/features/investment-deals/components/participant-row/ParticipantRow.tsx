import { useState } from 'react';

import { Check, Crown, LogOut } from 'lucide-react';

import {
  ActionIcon,
  Badge,
  Blockquote,
  Button,
  Flex,
  Group,
  Text,
  TextInput,
} from '@mantine/core';

import { useAuthStrict } from '@/features/auth';

import { ConfirmModal } from '@/shared/ui';

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
  mutations,
}: ParticipantRowProps) => {
  const { user } = useAuthStrict();
  const [notes, setNotes] = useState<string>('');

  const [confirmNoteOpened, setConfirmNoteOpened] = useState(false);
  const [setOwnerOpened, setSetOwnerOpened] = useState(false);
  const [removeOpened, setRemoveOpened] = useState(false);

  const handleConfirmParticipantNote = () => {
    if (!notes) return;

    mutations.confirmParticipantNoteMutation.mutate(
      {
        userId: participant.userId,
        notes: notes,
      },
      {
        onSuccess: () => setConfirmNoteOpened(false),
      }
    );
  };

  const handleRemoveParticipant = () => {
    mutations.removeParticipantMutation.mutate(
      {
        targetUserId: participant.userId,
      },
      {
        onSuccess: () => setRemoveOpened(false),
      }
    );
  };

  const handleSetDealOwner = () => {
    mutations.setDealOwner.mutate(
      {
        newOwnerId: participant.userId,
      },
      {
        onSuccess: () => setSetOwnerOpened(false),
      }
    );
  };

  const showEditActions =
    !(participant.userId === user.id) && permissions.isOwner;

  return (
    <>
      <ConfirmModal
        opened={confirmNoteOpened}
        onClose={() => setConfirmNoteOpened(false)}
        title="Підтвердіть вашу частку"
        onConfirm={handleConfirmParticipantNote}
        confirmLabel="Підтвердити"
        confirmProps={{
          loading: mutations.confirmParticipantNoteMutation.isPending,
        }}
      >
        <Text>Ви підтверджуєте, що ваша частка в цій угоді звучить так?</Text>
        <Blockquote
          color="blue"
          cite={`- ${participant.displayName}`}
          my="md"
          p="md"
          styles={{
            cite: {
              marginTop: 'var(--mantine-spacing-sm)',
            },
          }}
        >
          {notes}
        </Blockquote>
        <Text>
          Після підтвердження ви більше не зможете редагувати свою частку
        </Text>
      </ConfirmModal>

      <ConfirmModal
        opened={setOwnerOpened}
        onClose={() => setSetOwnerOpened(false)}
        title="Змінити власника угоди"
        onConfirm={handleSetDealOwner}
        confirmLabel="Зробити власником"
        confirmProps={{
          loading: mutations.setDealOwner.isPending,
        }}
      >
        <Text>
          Ви впевнені, що хочете зробити{' '}
          <Text span fw={700}>
            {participant.displayName}
          </Text>{' '}
          власником угоди?
        </Text>
        <Text mt="md" fw={700}>
          Після зміни власника ви втратите можливість підтвердити та
          налаштовувати угоду
        </Text>
      </ConfirmModal>

      <ConfirmModal
        opened={removeOpened}
        onClose={() => setRemoveOpened(false)}
        title="Видалити учасника"
        onConfirm={handleRemoveParticipant}
        confirmLabel="Видалити"
        confirmProps={{
          color: 'red',
          loading: mutations.removeParticipantMutation.isPending,
        }}
      >
        <Text>
          Ви впевнені, що хочете видалити{' '}
          <Text span fw={700}>
            {participant.displayName}
          </Text>{' '}
          з угоди?
        </Text>
      </ConfirmModal>
      <Flex
        gap="md"
        justify="space-between"
        align="flex-end"
        bd={'grey 1px solid'}
        p="xs"
        pos="relative"
      >
        {participant.userId === permissions.ownerId && (
          <Badge pos="absolute" top={-10} right={-10}>
            Власник
          </Badge>
        )}
        <TextInput
          size="md"
          label={participant.displayName}
          value={participant.isNoteConfirmed ? participant.notes : notes}
          onChange={(e) => setNotes(e.currentTarget.value)}
          placeholder={`Частка ${participant.displayName}`}
          disabled={
            !permissions.isNoteBelongToUser(participant.userId) ||
            participant.isNoteConfirmed
          }
          rightSection={
            participant.isNoteConfirmed && <Check color="rgba(0, 255, 0, 1)" />
          }
          styles={{
            input: {
              outline: participant.isNoteConfirmed
                ? '1px solid rgba(0, 255, 0, 1)'
                : undefined,
              outlineOffset: participant.isNoteConfirmed ? 0 : undefined,
            },
          }}
        />
        <Group>
          {participant.isNoteConfirmed || (
            <Button
              size="md"
              variant="default"
              disabled={Boolean(!notes)}
              onClick={() => setConfirmNoteOpened(true)}
            >
              Підписати
            </Button>
          )}
          {showEditActions && (
            <ActionIcon
              variant="subtle"
              size="xl"
              color="rgba(255, 255, 0, 1)"
              onClick={() => setSetOwnerOpened(true)}
            >
              <Crown />
            </ActionIcon>
          )}
          {showEditActions && (
            <ActionIcon
              variant="subtle"
              size="xl"
              color="rgba(255, 0, 0, 1)"
              onClick={() => setRemoveOpened(true)}
            >
              <LogOut />
            </ActionIcon>
          )}
        </Group>
      </Flex>
    </>
  );
};
