import { Button } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { cardsQueryOptions } from '@/features/cards/query-options';
import { useGameSession } from '@/features/game-session/context';
import { useGameSessionId } from '@/features/game-session/hooks';
import { playerStateMutationOptions } from '@/features/player-state/mutation-options';

import { ERROR_TITLES } from '@/shared/constants';
import { showErrorNotification } from '@/shared/ui';

export const PlayerLegendPage = () => {
  const gameSessionId = useGameSessionId();
  const { user } = useAuthStrict();
  const { playerState } = useGameSession();

  const { data: playerLegendCardsRow } = useQuery({
    ...cardsQueryOptions.getCardByIdQueryOption(playerState?.playerLegendId),
    enabled: !!playerState.playerLegendId,
  });

  const setPlayerLegendMutation = useMutation({
    ...playerStateMutationOptions.setPlayerLegendMutationOption,
    onError: (error) => {
      showErrorNotification(ERROR_TITLES.SET_PLAYER_LEGEND, error.message);
    },
  });

  const handleGetPlayerLegend = () => {
    setPlayerLegendMutation.mutate({
      gameSessionId,
      userId: user.id,
    });
  };

  return (
    <>
      {playerState.playerLegendId ? (
        playerLegendCardsRow?.data.profession
      ) : (
        <Button variant="default" onClick={handleGetPlayerLegend}>
          Отримати легенду
        </Button>
      )}
    </>
  );
};
