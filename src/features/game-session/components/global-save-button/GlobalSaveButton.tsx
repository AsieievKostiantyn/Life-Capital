import { Save } from 'lucide-react';

import { ActionIcon } from '@mantine/core';

import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { usePlayerFinances } from '@/features/player-state/stores';

import { useSaveHotKey } from '../../hooks/useSaveHotKey';

export const GlobalSaveButton = () => {
  const isDirty = usePlayerFinances((s) => s.isDirty);
  const save = usePlayerFinances((s) => s.save);
  const gameSessionUsersId = useGameSessionUsersId();

  useSaveHotKey();

  return (
    <ActionIcon
      variant="filled"
      size="xl"
      radius="xl"
      component="button"
      color="green"
      onClick={() => save(gameSessionUsersId)}
      hidden={!isDirty}
      pos="fixed"
      right={24}
      bottom={24}
      aria-label="save changes"
    >
      <Save color="White" />
    </ActionIcon>
  );
};
