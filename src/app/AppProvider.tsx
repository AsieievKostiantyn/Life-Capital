import { I18nProvider } from '@/features/i18n/context/I18nProvider';
import { RouterProvider } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import { router } from './router';

export const AppProvider = () => {
  return (
    <I18nProvider>
      <MantineProvider defaultColorScheme="dark">
        <RouterProvider router={router} />
      </MantineProvider>
    </I18nProvider>
  );
};
