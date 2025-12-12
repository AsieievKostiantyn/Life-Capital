export const USER_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PASSWORD_RECOVERY: '/recovery',
  REGISTER: '/register',
  RULES: '/rules',
  MY_GAMES: '/games',
  PROFILE: '/profile',
  GAME: '/games/:gameSessionId',
} as const;

export const GAME_ROUTES = {
  HOST_ROUTES: {},
  PLAYER_ROUTES: {
    PLAYER_LEGEND: 'legend',
  },
} as const;
