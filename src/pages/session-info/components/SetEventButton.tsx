import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';

import { useGameSessionId } from '@/features/game-session/hooks';
import { gameStateMutationOptions } from '@/features/game_state/mutation-options';

export const SetEventButton = () => {
  const gameSessionId = useGameSessionId();

  const setEventMutation = useMutation({
    ...gameStateMutationOptions.setEventToNewsList,
  });

  const handleSetEvent = () => {
    setEventMutation.mutate(gameSessionId);
  };

  return (
    <>
      <Button
        variant="default"
        onClick={handleSetEvent}
        disabled={setEventMutation.isPending}
      >
        Подія
      </Button>
    </>
  );
};
