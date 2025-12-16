import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { playerStateQueryOptions } from '@/features/player-state/query-options';
import type { PlayerState } from '@/features/player-state/types';

import { TABLES } from '@/shared/constants';
import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import { useGameSessionId, useUserGameSessionStatus } from '../hooks';
import { GameSessionContext } from './GameSessionContext';

interface GameSessionProviderProps {
  children: React.ReactNode;
}

export const GameSessionProvider = ({ children }: GameSessionProviderProps) => {
  const gameSessionId = useGameSessionId();
  const gameSessionUsersId = useGameSessionUsersId();
  const { isHost } = useUserGameSessionStatus();
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);

  const { data: initialPlayerState } = useQuery({
    ...playerStateQueryOptions.getPlayerStateQueryOption(gameSessionUsersId),
    enabled: !playerState && !isHost,
  });

  useEffect(() => {
    if (initialPlayerState) setPlayerState(mapSnakeToCamel(initialPlayerState));

    const channel = supabase
      .channel(`game-session:${gameSessionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLES.playerState,
          filter: `game_session_users_id=eq.${gameSessionUsersId}`,
        },
        (payload) => {
          if (payload.new) setPlayerState(mapSnakeToCamel(payload.new));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameSessionId, gameSessionUsersId, initialPlayerState]);

  if (!playerState && !isHost) return;

  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <GameSessionContext.Provider value={{ playerState: playerState! }}>
      {children}
    </GameSessionContext.Provider>
  );
};
