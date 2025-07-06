import { createBrowserRouter } from 'react-router-dom';

import {
  GuestPage,
  LoginPage,
  PasswordRecoveryPage,
  RegisterPage,
} from '@/pages';

import { ROUTES } from '@/shared/router';

import { AppLayout } from './layout/AppLayout';

export const router = createBrowserRouter([
  {
    path: ROUTES.GUEST_PAGE,
    element: <GuestPage />,
  },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },
  { path: ROUTES.PASSWORD_RECOVERY, element: <PasswordRecoveryPage /> },
  {
    path: ROUTES.APP,
    element: <AppLayout />,
  },
]);
