import { useEffect } from 'react';

import { useUserGameSessionStatus } from '@/features/game-session/hooks/useUserGameSessionStatus';
import { useGameState } from '@/features/game_state/stores';
import {
  usePlayerFinances,
  usePlayerMeta,
} from '@/features/player-state/stores';

import { useInitialGameState } from './useInitialGameState';
import { useInitialPlayerState } from './useInitialPlayerState';

export const useSyncInitialState = () => {
  const { isPlayer } = useUserGameSessionStatus();

  const playerState = useInitialPlayerState();
  const gameState = useInitialGameState();

  const financesStore = usePlayerFinances();
  const metaStore = usePlayerMeta();
  const gameStateStore = useGameState();

  useEffect(() => {
    if (!isPlayer || !playerState) return;

    metaStore.setInitial({
      playerLegendId: playerState.playerLegendId,
      expensesList: playerState.expensesList,
      metadata: playerState.metadata,
      investmentDealIds: playerState.investmentDealIds,
    });

    financesStore.setInitial(playerState.finances);
  }, [isPlayer, playerState]);

  useEffect(() => {
    if (!gameState) return;

    gameStateStore.setInitial({
      currentInvestment: gameState.currentInvestment,
      newsList: gameState.newsList,
    });
  }, [gameState]);
};
