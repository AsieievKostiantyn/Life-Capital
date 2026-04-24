import { useAuthStrict } from '@/features/auth';
import { useGameSessionUsersId } from '@/features/game-session-users/hooks';
import { useGameState } from '@/features/game_state/stores';
import type { GameState } from '@/features/game_state/types';
import {
  usePlayerFinances,
  usePlayerMeta,
} from '@/features/player-state/stores';
import type { PlayerState } from '@/features/player-state/types';

import { TABLES } from '@/shared/constants';
import { queryClient } from '@/shared/query-client';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import { useGameSessionId } from '../../hooks';
import type { RealtimeSubscription } from '../types';

export const usePlayerSubscriptions = (): RealtimeSubscription[] => {
  const gameSessionUsersId = useGameSessionUsersId();
  const gameSessionId = useGameSessionId();
  const { user } = useAuthStrict();

  const financesStore = usePlayerFinances();
  const metaStore = usePlayerMeta();
  const gameStateStore = useGameState();

  return [
    (channel) => {
      channel.on(
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

          metaStore.setInitial({
            playerLegendId: row.playerLegendId,
            expensesList: row.expensesList,
            metadata: row.metadata,
            investmentDealIds: row.investmentDealIds,
          });

          financesStore.setInitial(row.finances);

          queryClient.invalidateQueries({
            queryKey: ['deals', user.id],
          });
        }
      );
    },

    (channel) => {
      channel.on(
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
      );
    },
  ];
};
