export const TABLES = {
  cards: 'cards',
  users: 'users',
  gameSessions: 'game_sessions',
  gameSessionUsers: 'game_session_users',
} as const;

export const CARD_TYPES = {
  playerLegend: 'player_legend',
  expense: 'expense',
  bigExpense: 'big_expense',
  investment: 'investment',
  bigInvestment: 'big_investment',
  demand: 'demand',
  event: 'event',
} as const;
