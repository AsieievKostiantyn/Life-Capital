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

import { USER_ROUTES } from '@/shared/router';

import { AppLayout, GameLayout, GuestLayout } from '../layout';

export const guestRoutes = [
  {
    path: USER_ROUTES.HOME,
    element: <GuestLayout />,
    children: [
      {
        index: true,
        element: <GuestPage />,
      },
      { path: USER_ROUTES.LOGIN, element: <LoginPage /> },
      { path: USER_ROUTES.REGISTER, element: <RegisterPage /> },
      {
        path: USER_ROUTES.PASSWORD_RECOVERY,
        element: <PasswordRecoveryPage />,
      },
    ],
  },
  { path: '*', element: <Navigate to={USER_ROUTES.HOME} replace /> },
];
export const userRoutes = [
  {
    path: USER_ROUTES.HOME,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: USER_ROUTES.RULES,
        element: <RulesPage />,
      },
      {
        path: USER_ROUTES.MY_GAMES,
        element: <MyGamesPage />,
      },
      {
        path: USER_ROUTES.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: USER_ROUTES.GAME,
    element: <GameLayout />,
    children: [
      {
        index: true,
      },
    ],
  },
  { path: '*', element: <Navigate to={USER_ROUTES.HOME} replace /> },
];
