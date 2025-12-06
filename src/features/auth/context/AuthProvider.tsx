import { useEffect, useState } from 'react';

import { showNotification } from '@mantine/notifications';

import { supabase } from '@/shared/supabase';
import type { AppUser } from '@/shared/types';

import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAuthError = (errorMessage: string) => {
    showNotification({
      title: 'Authentication Error',
      message: errorMessage,
      color: 'red',
    });
  };

  const loadUserProfile = async (authUserId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUserId)
      .single();

    if (error) throw error;

    return data;
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      const authUser = session?.user ?? null;

      setTimeout(async () => {
        if (authUser) {
          const profile = await loadUserProfile(authUser.id);
          setUser(profile);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }, 0);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      handleAuthError(error.message);
    }
  };

  const register = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: displayName } },
    });

    if (error) {
      handleAuthError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      handleAuthError(error.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        register,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
