export interface AppUser {
  id: string;
  display_name: string;
  email: string;
  avatar_url: string | null;
  role: 'player' | 'host';
  created_at: string;
}
