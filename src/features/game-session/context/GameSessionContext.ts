import { createContext } from 'react';

import type { PlayerState } from '@/features/player-state/types';

interface GameSessionContextType {
  playerState: PlayerState;
}

export const GameSessionContext = createContext<
  GameSessionContextType | undefined
>(undefined);
