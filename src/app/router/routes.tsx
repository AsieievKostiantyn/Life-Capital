import { Navigate } from 'react-router-dom';

import {
  GuestPage,
  HomePage,
  LoginPage,
  MyGamesPage,
  PasswordRecoveryPage,
  ProfilePage,
  RegisterPage,
  RulesPage,
} from '@/pages';

import { ROUTES } from '@/shared/router';

import { AppLayout } from '../layout/app-layout/AppLayout';
import { GuestLayout } from '../layout/guest-layout/GuestLayout';

export const guestRoutes = [
  {
    path: ROUTES.HOME,
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
  { path: '*', element: <Navigate to={ROUTES.HOME} replace /> },
];
export const userRoutes = [
  {
    path: ROUTES.HOME,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.RULES,
        element: <RulesPage />,
      },
      {
        path: ROUTES.MY_GAMES,
        element: <MyGamesPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
  { path: '*', element: <Navigate to={ROUTES.HOME} replace /> },
];
