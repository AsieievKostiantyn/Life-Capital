import { createContext } from 'react';

import type { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
