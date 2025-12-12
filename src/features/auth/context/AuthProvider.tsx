import { useEffect, useState } from 'react';

import type { User as SupabaseAuthUser } from '@supabase/supabase-js';

import { ERROR_TITLES } from '@/shared/constants';
import { queryClient } from '@/shared/query-client';
import { supabase } from '@/shared/supabase';
import { showErrorNotification } from '@/shared/ui';

import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<SupabaseAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showErrorNotification(ERROR_TITLES.AUTH, error.message);
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
      showErrorNotification(ERROR_TITLES.AUTH, error.message);
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      showErrorNotification(ERROR_TITLES.AUTH, error.message);
    }
  };

  const signOut = async () => {
    queryClient.removeQueries();
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
