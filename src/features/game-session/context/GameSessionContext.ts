import { createContext } from 'react';

import type { PlayerState } from '@/shared/types';

interface GameSessionContextType {
  playerState: PlayerState | null;
}

export const GameSessionContext = createContext<
  GameSessionContextType | undefined
>(undefined);
