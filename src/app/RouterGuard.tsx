import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import { Loader } from '@mantine/core';

import { useAuth } from '@/features/auth';

import { guestRoutes, userRoutes } from './routes';

export const RouterGuard = () => {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="xl" />
      </div>
    );

  const routes = user ? userRoutes : guestRoutes;
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
