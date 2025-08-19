import { createContext } from 'react';

import type { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
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
