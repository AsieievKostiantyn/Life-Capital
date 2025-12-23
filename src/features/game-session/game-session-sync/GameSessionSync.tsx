import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { playerStateQueryOptions } from '@/features/player-state/query-options';
import { usePlayerMeta } from '@/features/player-state/stores';
import { usePlayerFinances } from '@/features/player-state/stores/playerFinancesStore';
import type { PlayerState } from '@/features/player-state/types';

import { TABLES } from '@/shared/constants';
import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import { useGameSessionId, useUserGameSessionStatus } from '../hooks';

interface GameSessionSyncProps {
  children: React.ReactNode;
}

export const GameSessionSync = ({ children }: GameSessionSyncProps) => {
  const gameSessionId = useGameSessionId();
  const gameSessionUsersId = useGameSessionUsersId();
  const { isHost } = useUserGameSessionStatus();

  const financesStore = usePlayerFinances();
  const metaStore = usePlayerMeta();

  const { data: initialPlayerState } = useQuery({
    ...playerStateQueryOptions.getPlayerStateQueryOption(gameSessionUsersId),
    enabled: !isHost,
  });

  useEffect(() => {
    if (!initialPlayerState) return;
    metaStore.setInitial({ playerLegendId: initialPlayerState.playerLegendId });
    financesStore.setInitial(initialPlayerState.finances);
  }, [initialPlayerState]);

  useEffect(() => {
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
          if (!payload.new) return;
          const row = mapSnakeToCamel(payload.new as PlayerState);
          metaStore.setInitial({
            playerLegendId: row.playerLegendId,
          });
          financesStore.setInitial(row.finances);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameSessionId, gameSessionUsersId]);

  return <>{children}</>;
};
