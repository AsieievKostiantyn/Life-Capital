import { useEffect, useState } from 'react';

import { FirebaseError } from 'firebase/app';
import { type User, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

import { showNotification } from '@mantine/notifications';

import { auth, provider } from '@/shared/firebase';

import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return unSubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        showNotification({
          title: 'Authentication Error',
          message: error.code,
          color: 'red',
        });
      } else {
        showNotification({
          title: 'Unknown Error',
          message: 'Something went wrong',
          color: 'red',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
