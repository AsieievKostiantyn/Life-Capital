import { useParams } from 'react-router-dom';

export const useGameSessionId = () => {
  const { gameSessionId } = useParams();

  if (!gameSessionId)
    throw new Error('Required route param gameSessionId is missing');

  return gameSessionId;
};
