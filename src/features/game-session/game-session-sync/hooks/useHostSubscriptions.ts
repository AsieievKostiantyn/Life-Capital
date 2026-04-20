import { useGameSessionId } from '@/features/game-session/hooks';
import { useGameState } from '@/features/game_state/stores';
import type { GameState } from '@/features/game_state/types';

import { TABLES } from '@/shared/constants';
import { mapSnakeToCamel } from '@/shared/utils/caseMapper';

import type { RealtimeSubscription } from '../types';

export const useHostSubscriptions = (): RealtimeSubscription[] => {
  const gameSessionId = useGameSessionId();
  const gameStateStore = useGameState();

  return [
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
