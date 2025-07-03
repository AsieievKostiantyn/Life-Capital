import { I18nProvider } from '@/features/i18n/context/I18nProvider';

import { MantineProvider } from '@mantine/core';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nProvider>
      <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
    </I18nProvider>
  );
};
