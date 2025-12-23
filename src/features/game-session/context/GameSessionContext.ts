import { createContext } from 'react';

interface GameSessionContextType {
  playerLegendId: string;
}

export const GameSessionContext = createContext<
  GameSessionContextType | undefined
>(undefined);
