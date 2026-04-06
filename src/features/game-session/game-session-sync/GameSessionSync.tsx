import { useGameSessionRealtime } from './hooks/useGameSessionRealtime';
import { useSyncInitialState } from './hooks/useSyncInitialState';

interface GameSessionSyncProps {
  children: React.ReactNode;
}

export const GameSessionSync = ({ children }: GameSessionSyncProps) => {
  useSyncInitialState();
  useGameSessionRealtime();

  return <>{children}</>;
};
