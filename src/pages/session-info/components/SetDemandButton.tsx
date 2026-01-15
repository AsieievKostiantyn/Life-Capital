import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';

import { useGameSessionId } from '@/features/game-session/hooks';
import { gameStateMutationOptions } from '@/features/game_state/mutation-options';

export const SetDemandButton = () => {
  const gameSessionId = useGameSessionId();

  const setDemandMutation = useMutation({
    ...gameStateMutationOptions.setDemandToNewsList,
  });

  const handleSetDemand = () => {
    setDemandMutation.mutate(gameSessionId);
  };

  return (
    <>
      <Button
        variant="default"
        onClick={handleSetDemand}
        disabled={setDemandMutation.isPending}
      >
        Попит
      </Button>
    </>
  );
};
