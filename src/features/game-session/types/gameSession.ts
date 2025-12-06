export type PlayerId = string;

export type GameSession = {
  id: string;
  sessionName: string;
  hostId: string;
  status: 'active' | 'archive';
  createdAt: string;
};
