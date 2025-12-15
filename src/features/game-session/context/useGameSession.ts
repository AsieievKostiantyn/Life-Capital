import { useContext } from 'react';

import { GameSessionContext } from './GameSessionContext';

export const useGameSession = () => {
  const context = useContext(GameSessionContext);
  if (!context)
    throw new Error(
      'useGameSession must be used within an GameSessionProvider'
    );
  return context;
};
