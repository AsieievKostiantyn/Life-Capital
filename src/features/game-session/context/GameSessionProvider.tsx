import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { gameSessionUsersQueryOptions } from '@/features/game-session-users/query-options';

import { TABLES } from '@/shared/constants';
import { supabase } from '@/shared/supabase';
import type { PlayerState } from '@/shared/types';
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

  const { data: gameSessionUsersId } = useQuery({
    ...gameSessionUsersQueryOptions.getGameSessionUsersIdQueryOption(
      gameSessionId,
      user.id
    ),
  });

  useEffect(() => {
    if (!gameSessionUsersId) return;

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
  }, [gameSessionId, gameSessionUsersId]);

  return (
    <GameSessionContext.Provider value={{ playerState }}>
      {children}
    </GameSessionContext.Provider>
  );
};
