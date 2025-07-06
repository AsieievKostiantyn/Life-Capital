import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { useAuth } from '@/features/auth';
import { I18nProvider } from '@/features/i18n';

import { guestRoutes, userRoutes } from './routes';

export const AppProvider = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  const routes = user ? userRoutes : guestRoutes;
  const router = createBrowserRouter(routes);

  return (
    <I18nProvider>
      <MantineProvider defaultColorScheme="dark">
        <Notifications position="top-center" />
        <RouterProvider router={router} />
      </MantineProvider>
    </I18nProvider>
  );
};
