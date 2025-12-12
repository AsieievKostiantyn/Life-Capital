import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { gameSessionQueryOptions } from '@/features/game-session/query-options';

import { GAME_ROUTES, USER_ROUTES } from '@/shared/router';

export const SessionInfoPage = () => {
  const { gameSessionId } = useParams();

  const { user: authUser } = useAuthStrict();

  const { data: gameSession } = useQuery(
    gameSessionQueryOptions.getGameSessionByIdQueryOption(gameSessionId || '')
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (gameSession?.hostId === authUser.id) navigate(USER_ROUTES.PROFILE);
    else navigate(GAME_ROUTES.PLAYER_ROUTES.PLAYER_LEGEND);
  }, []);

  return <>SessionInfo</>;
};
