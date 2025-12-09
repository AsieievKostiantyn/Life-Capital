import type { AppUser } from '@/shared/types';

export type GameSession = {
  id: string;
  sessionName: string;
  hostId: AppUser['id'];
  status: 'active' | 'archive';
  createdAt: string;
};
