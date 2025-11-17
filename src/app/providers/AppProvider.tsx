import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '@/features/auth';
import { I18nProvider } from '@/features/i18n';

import { RouterGuard } from '../router';

export const AppProvider = () => {
  const queryClient = new QueryClient();

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
