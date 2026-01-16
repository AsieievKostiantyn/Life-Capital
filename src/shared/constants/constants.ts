export const TABLES = {
  cards: 'cards',
  users: 'users',
  gameSessions: 'game_sessions',
  gameSessionUsers: 'game_session_users',
  playerState: 'player_state',
  gameState: 'game_state',
} as const;

export const ERROR_TITLES = {
  AUTH: 'Authorization error',
  GAME_SESSION_CREATION: 'Failed to create game session',
  SET_PLAYER_LEGEND: 'Failed to set legend',
};
