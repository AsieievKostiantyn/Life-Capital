import type { RealtimeChannel } from '@supabase/supabase-js';

export type RealtimeSubscription = (channel: RealtimeChannel) => void;
