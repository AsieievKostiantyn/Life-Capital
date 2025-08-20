import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { AuthProvider } from '@/features/auth';
import { I18nProvider } from '@/features/i18n';

import { RouterGuard } from './RouterGuard';

export const AppProvider = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <I18nProvider>
        <AuthProvider>
          <Notifications position="top-right" autoClose={6000} />
          <RouterGuard />
        </AuthProvider>
      </I18nProvider>
    </MantineProvider>
  );
};
