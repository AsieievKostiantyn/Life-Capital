import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { FirebaseError } from 'firebase/app';
import {
  type User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { showNotification } from '@mantine/notifications';

import { auth, db, provider } from '@/shared/firebase';

import { firebaseAuthErrorsHandler } from '../utils';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const intl = useIntl();

  const showErrorNotification = (error: unknown) => {
    if (error instanceof FirebaseError) {
      showNotification({
        title: 'Authentication Error',
        message: intl.formatMessage({
          id: firebaseAuthErrorsHandler(error.code),
        }),
        color: 'red',
      });
    } else {
      showNotification({
        title: 'Unknown Error',
        message: 'Something went wrong',
        color: 'red',
      });
    }
  };

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
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      showErrorNotification(error);
    }
  };

  const signOut = async () => {
    await signOutFirebase(auth);
  };

  const register = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email,
          displayName,
          role: 'player',
          createdAt: serverTimestamp(),
        });
      } catch (dbError) {
        console.error('User created, but profile not saved to DB.', dbError); //
      }
    } catch (authError) {
      showErrorNotification(authError);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signInWithGoogle,
        signIn,
        signOut,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
