import { createContext } from 'react';

import type { User as SupabaseAuthUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: SupabaseAuthUser | null;
  isLoading: boolean;
  signInWithGoogle: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
