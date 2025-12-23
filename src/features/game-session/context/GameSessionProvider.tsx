import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { playerStateQueryOptions } from '@/features/player-state/query-options';
import { usePlayerFinances } from '@/features/player-state/store/playerStateStore';
import type { FinancesState, PlayerState } from '@/features/player-state/types';

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
  const [playerLegendId, setPlayerLegendId] = useState<string | null>(null);
  const { isHost } = useUserGameSessionStatus();
  const store = usePlayerFinances();

  const { data: initialPlayerState } = useQuery({
    ...playerStateQueryOptions.getPlayerStateQueryOption(gameSessionUsersId),
    enabled: !isHost,
  });

  useEffect(() => {
    if (initialPlayerState) {
      setPlayerLegendId(initialPlayerState.playerLegendId);
      store.setInitial(initialPlayerState.finances);
    }

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
          if (payload.new) {
            const row = payload.new as PlayerState;
            setPlayerLegendId(mapSnakeToCamel(row).playerLegendId);
            store.setInitial(row.finances as FinancesState);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameSessionId, gameSessionUsersId, initialPlayerState]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <GameSessionContext.Provider value={{ playerLegendId: playerLegendId! }}>
      {children}
    </GameSessionContext.Provider>
  );
};
