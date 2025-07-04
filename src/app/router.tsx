import { GuestPage } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './layout/AppLayout';
import { ROUTES } from './router/routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.GUEST_PAGE,
    element: <GuestPage />,
  },
  {
    path: ROUTES.APP,
    element: <AppLayout />,
  },
]);
