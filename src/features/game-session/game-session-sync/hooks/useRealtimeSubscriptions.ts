import { useUserGameSessionStatus } from '@/features/game-session/hooks';

import type { RealtimeSubscription } from '../types';
import { useHostSubscriptions } from './useHostSubscriptions';
import { usePlayerSubscriptions } from './usePlayerSubscriptions';

export const useRealtimeSubscriptions = (): RealtimeSubscription[] => {
  const { isPlayer, isHost } = useUserGameSessionStatus();

  const playerSubs = usePlayerSubscriptions();
  const hostSubs = useHostSubscriptions();

  if (isPlayer) return playerSubs;
  if (isHost) return hostSubs;

  return [];
};
