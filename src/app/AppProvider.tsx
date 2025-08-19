import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { AuthProvider } from '@/features/auth';
import { I18nProvider } from '@/features/i18n';

import { RouterGuard } from './RouterGuard';

export const AppProvider = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AuthProvider>
        <I18nProvider>
          <Notifications position="top-center" autoClose={4000} />
          <RouterGuard />
        </I18nProvider>
      </AuthProvider>
    </MantineProvider>
  );
};
