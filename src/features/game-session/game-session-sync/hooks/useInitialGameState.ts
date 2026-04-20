import { useQuery } from '@tanstack/react-query';

import { gameStateQueryOptions } from '@/features/game_state/query-options';

import { useGameSessionId } from '../../hooks';

export const useInitialGameState = () => {
  const gameSessionId = useGameSessionId();

  const { data } = useQuery({
    ...gameStateQueryOptions.getGameState(gameSessionId),
  });

  return data;
};
