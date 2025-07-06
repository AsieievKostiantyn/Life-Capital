import { RouterProvider } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { I18nProvider } from '@/features/i18n';

import { router } from './router';

export const AppProvider = () => {
  return (
    <I18nProvider>
      <MantineProvider defaultColorScheme="dark">
        <Notifications position="top-center" />
        <RouterProvider router={router} />
      </MantineProvider>
    </I18nProvider>
  );
};
