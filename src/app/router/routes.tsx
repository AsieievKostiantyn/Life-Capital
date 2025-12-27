import { Navigate } from 'react-router-dom';

import {
  GuestPage,
  HomePage,
  LoginPage,
  MyGamesPage,
  PasswordRecoveryPage,
  PlayerAirbagPage,
  PlayerExpensesPage,
  PlayerIncomesPage,
  PlayerLegendPage,
  ProfilePage,
  RegisterPage,
  RulesPage,
  SessionInfoPage,
} from '@/pages';

import { GameSessionSync } from '@/features/game-session/game-session-sync/GameSessionSync';

import { GAME_ROUTES, USER_ROUTES } from '@/shared/router';

import { AppLayout, GuestLayout } from '../layout';

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
    element: (
      <GameSessionSync>
        <AppLayout />
      </GameSessionSync>
    ),
    children: [
      {
        index: true,
        element: <SessionInfoPage />,
      },
      {
        path: GAME_ROUTES.PLAYER_ROUTES.PLAYER_LEGEND,
        element: <PlayerLegendPage />,
      },
      {
        path: GAME_ROUTES.PLAYER_ROUTES.PLAYER_INCOMES,
        element: <PlayerIncomesPage />,
      },
      {
        path: GAME_ROUTES.PLAYER_ROUTES.PLAYER_EXPENSES,
        element: <PlayerExpensesPage />,
      },
      {
        path: GAME_ROUTES.PLAYER_ROUTES.PLAYER_AIRBAG,
        element: <PlayerAirbagPage />,
      },
    ],
  },
  { path: '*', element: <Navigate to={USER_ROUTES.HOME} replace /> },
];
