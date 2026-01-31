import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { gameStateQueryOptions } from '@/features/game_state/query-options';
import { useGameState } from '@/features/game_state/stores';
import type { GameState } from '@/features/game_state/types';
import { playerStateQueryOptions } from '@/features/player-state/query-options';
import { usePlayerMeta } from '@/features/player-state/stores';
import { usePlayerFinances } from '@/features/player-state/stores/playerFinancesStore';
import type { PlayerState } from '@/features/player-state/types';

import { TABLES } from '@/shared/constants';
import { queryClient } from '@/shared/query-client';
import { supabase } from '@/shared/supabase';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import { useGameSessionId, useUserGameSessionStatus } from '../hooks';

interface GameSessionSyncProps {
  children: React.ReactNode;
}

export const GameSessionSync = ({ children }: GameSessionSyncProps) => {
  const gameSessionId = useGameSessionId();
  const gameSessionUsersId = useGameSessionUsersId();
  const { user } = useAuthStrict();
  const { isHost } = useUserGameSessionStatus();

  const financesStore = usePlayerFinances();
  const metaStore = usePlayerMeta();
  const gameStateStore = useGameState();

  const { data: initialPlayerState } = useQuery({
    ...playerStateQueryOptions.getPlayerStateQueryOption(gameSessionUsersId),
    enabled: !isHost,
  });

  const { data: initialGameState } = useQuery({
    ...gameStateQueryOptions.getGameState(gameSessionId),
  });

  useEffect(() => {
    if (!initialPlayerState) return;
    metaStore.setInitial({
      playerLegendId: initialPlayerState.playerLegendId,
      expensesList: initialPlayerState.expensesList,
      metadata: initialPlayerState.metadata,
      investmentDealIds: initialPlayerState.investmentDealIds,
    });
    financesStore.setInitial(initialPlayerState.finances);
  }, [initialPlayerState]);

  useEffect(() => {
    if (!initialGameState) return;
    gameStateStore.setInitial({
      currentInvestment: initialGameState.currentInvestment,
      newsList: initialGameState.newsList,
    });
  }, [initialGameState]);

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
          const row = mapSnakeToCamel(payload.new) as PlayerState;
          console.log('updating player state', row.investmentDealIds);
          metaStore.setInitial({
            playerLegendId: row.playerLegendId,
            expensesList: row.expensesList,
            metadata: row.metadata,
            investmentDealIds: row.investmentDealIds,
          });
          queryClient.invalidateQueries({
            queryKey: ['deals', user.id],
          });
          financesStore.setInitial(row.finances);
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLES.gameState,
          filter: `game_session_id=eq.${gameSessionId}`,
        },
        (payload) => {
          if (!payload.new) return;
          const row = mapSnakeToCamel(payload.new) as GameState;
          gameStateStore.setInitial({
            currentInvestment: row.currentInvestment,
            newsList: mapSnakeToCamel(row.newsList),
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameSessionId, gameSessionUsersId]);

  return <>{children}</>;
};
