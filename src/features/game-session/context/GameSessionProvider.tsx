import { useEffect, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { gameSessionUsersQueryOptions } from '@/features/game-session-users/query-options';
import { playerStateQueryOptions } from '@/features/player-state/query-options';
import type { PlayerState } from '@/features/player-state/types';

import { TABLES } from '@/shared/constants';
import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import { useGameSessionId } from '../hooks';
import { GameSessionContext } from './GameSessionContext';

interface GameSessionProviderProps {
  children: React.ReactNode;
}

export const GameSessionProvider = ({ children }: GameSessionProviderProps) => {
  const gameSessionId = useGameSessionId();
  const { user } = useAuthStrict();

  const [playerState, setPlayerState] = useState<PlayerState | null>(null);

  const { data: gameSessionUsersId } = useSuspenseQuery(
    gameSessionUsersQueryOptions.getGameSessionUsersIdQueryOption(
      gameSessionId,
      user.id
    )
  );

  const { data: initialPlayerState } = useSuspenseQuery(
    playerStateQueryOptions.getPlayerStateQueryOption(gameSessionUsersId)
  );

  useEffect(() => {
    setPlayerState(initialPlayerState);

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
        (payload) => setPlayerState(mapSnakeToCamel(payload.new))
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameSessionId, gameSessionUsersId, initialPlayerState]);

  if (!playerState) return;

  return (
    <GameSessionContext.Provider value={{ playerState }}>
      {children}
    </GameSessionContext.Provider>
  );
};
