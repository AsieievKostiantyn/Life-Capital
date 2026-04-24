import type { GameSession } from '@/features/game-session/types';

import type { AppUser } from '@/shared/types';

import type { FinancesState } from './playerState';

export type SetPlayerFinancesPayload = {
  gameSessionUsersId: string;
  finances: FinancesState;
};

export type SetPlayerStateByGameSessionAndUserIdPayload = {
  gameSessionId: GameSession['id'];
  userId: AppUser['id'];
};
