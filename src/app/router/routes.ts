import 'react-router-dom';

export const ROUTES = {
  GUEST_PAGE: '/',
  APP: '/app',
  LOGIN: '/login',
  REGISTER: '/register',
  GAME_SESSIONS: '/games',
  GAME_SESSION: '/games/:gameId',
} as const;

export type PathParams = {
  [ROUTES.GAME_SESSION]: {
    gameId: string;
  };
};

declare module 'react-router-dom' {
  interface Register {
    params: PathParams;
  }
}
