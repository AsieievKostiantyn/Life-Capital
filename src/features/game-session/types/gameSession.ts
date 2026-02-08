import type { AppUser } from '@/shared/types';

export type GameSession = {
  id: string;
  sessionName: string;
  hostId: AppUser['id'];
  status: 'active' | 'archive';
  createdAt: string;
};

export type GameSessionOverviewView = {
  gameSessionId: string;
  sessionName: string;
  status: 'active' | 'archive';

  host: {
    userId: string;
    displayName: string;
  };

  participants: {
    userId: string;
    displayName: string;
    avatarUrl: string;
    profession: string | null;
    monthlyFreeFunds: number | null;
  }[];
};
