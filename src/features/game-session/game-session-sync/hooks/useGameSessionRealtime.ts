import { useEffect } from 'react';

import { useGameSessionId } from '@/features/game-session/hooks';

import { supabase } from '@/shared/supabase';

import { useRealtimeSubscriptions } from './useRealtimeSubscriptions';

export const useGameSessionRealtime = () => {
  const gameSessionId = useGameSessionId();
  const subscriptions = useRealtimeSubscriptions();

  useEffect(() => {
    if (!gameSessionId) return;

    const channel = supabase.channel(`game-session:${gameSessionId}`);

    subscriptions.forEach((subscribe) => {
      subscribe(channel);
    });

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameSessionId, subscriptions]);
};
