import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '@/features/auth';
import { I18nProvider } from '@/features/i18n';

import { queryClient } from '@/shared/query-client';

import { RouterGuard } from '../router';

export const AppProvider = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <I18nProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Notifications position="top-right" autoClose={6000} />
            <RouterGuard />
          </QueryClientProvider>
        </AuthProvider>
      </I18nProvider>
    </MantineProvider>
  );
};
