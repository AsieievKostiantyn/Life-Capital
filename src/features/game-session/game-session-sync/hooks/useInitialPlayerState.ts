import { useQuery } from '@tanstack/react-query';

import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { useUserGameSessionStatus } from '@/features/game-session/hooks/useUserGameSessionStatus';
import { playerStateQueryOptions } from '@/features/player-state/query-options';

export const useInitialPlayerState = () => {
  const gameSessionUsersId = useGameSessionUsersId();
  const { isPlayer } = useUserGameSessionStatus();

  const { data } = useQuery({
    ...playerStateQueryOptions.getPlayerStateQueryOption(gameSessionUsersId),
    enabled: isPlayer,
  });

  return data;
};
