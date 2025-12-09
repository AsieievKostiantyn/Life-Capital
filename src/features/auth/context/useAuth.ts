import { useContext } from 'react';

import { AuthContext } from './AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const useAuthStrict = () => {
  const authContext = useAuth();

  if (!authContext.user) {
    throw new Error('useAuthStrict used outside of an authenticated context');
  }

  return {
    ...authContext,
    user: authContext.user,
  };
};
