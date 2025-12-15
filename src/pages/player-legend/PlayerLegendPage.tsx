import { Button } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { cardsQueryOptions } from '@/features/cards/query-options';
import { useGameSession } from '@/features/game-session/context';

export const PlayerLegendPage = () => {
  const { playerState } = useGameSession();

  const { data: playerLegendCardsRow } = useQuery({
    ...cardsQueryOptions.getCardByIdQueryOption(playerState?.playerLegendId),
    enabled: !!playerState.playerLegendId,
  });

  return (
    <>
      {playerState.playerLegendId ? (
        playerLegendCardsRow?.data.profession
      ) : (
        <Button variant="default">Отримати легенду</Button>
      )}
    </>
  );
};
