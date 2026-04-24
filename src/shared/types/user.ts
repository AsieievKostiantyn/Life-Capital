export interface AppUser {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
  role: 'player' | 'host';
  createdAt: string;
}
