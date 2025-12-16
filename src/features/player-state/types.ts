import type { AppUser } from '@/shared/types';

import type { GameSession } from '../game-session/types';

export type PlayerState = {
  id: string;
  gameSessionUsersId: string;
  playerLegendId: string;
};

export type SetPlayerStatePayload = {
  gameSessionId: GameSession['id'];
  userId: AppUser['id'];
};
