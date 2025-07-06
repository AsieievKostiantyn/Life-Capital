import { Navigate } from 'react-router-dom';

import {
  GuestPage,
  LoginPage,
  PasswordRecoveryPage,
  RegisterPage,
} from '@/pages';

import { ROUTES } from '@/shared/router';

import { App } from './App';
import { AppLayout } from './layout/AppLayout';
import { GuestLayout } from './layout/GuestLayout';

export const guestRoutes = [
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        index: true,
        element: <GuestPage />,
      },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.PASSWORD_RECOVERY, element: <PasswordRecoveryPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
];
export const userRoutes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
];
